import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { gemmaService } from '../services/gemmaService.js';

export const apiRouter = Router();

// GET /api/system/status
apiRouter.get('/system/status', (req: Request, res: Response) => {
  const status = gemmaService.getSystemStatus();
  res.json({ success: true, ...status });
});

// POST /api/gemma/interpret-goal
const InterpretGoalSchema = z.object({
  rawAmbition: z.string().min(2, 'Please enter a goal with at least 2 characters'),
});

apiRouter.post('/gemma/interpret-goal', async (req: Request, res: Response) => {
  try {
    const { rawAmbition } = InterpretGoalSchema.parse(req.body);
    const result = await gemmaService.interpretGoal(rawAmbition);
    res.json({ success: true, data: result });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, error: err.errors[0]?.message || 'Validation error' });
      return;
    }
    console.error('[API] /interpret-goal error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error' });
  }
});

// POST /api/gemma/generate-assessment
const GenerateAssessmentSchema = z.object({
  rawAmbition: z.string(),
  clarifiedGoal: z.string(),
  targetSkill: z.string(),
  currentLevel: z.enum(['absolute_beginner', 'early_learner', 'intermediate', 'advanced']),
  dailyHours: z.number().min(0.25).max(12),
  timeframeWeeks: z.number().min(1).max(52),
  constraints: z.string().optional(),
  learningStyle: z.enum(['hands_on_projects', 'conceptual_first', 'problem_solving_drills']).optional(),
});

apiRouter.post('/gemma/generate-assessment', async (req: Request, res: Response) => {
  try {
    const goalContext = GenerateAssessmentSchema.parse(req.body);
    const assessment = await gemmaService.generateAssessment(goalContext);
    res.json({ success: true, data: assessment });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, error: err.errors[0]?.message || 'Validation error' });
      return;
    }
    console.error('[API] /generate-assessment error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error' });
  }
});

// POST /api/gemma/analyze-assessment
const AnalyzeAssessmentSchema = z.object({
  goalContext: GenerateAssessmentSchema,
  submissions: z.array(z.object({
    questionId: z.string(),
    userAnswer: z.string(),
    selectedOptionIndex: z.number().optional(),
    selfAssessedConfidence: z.enum(['low', 'medium', 'high']),
  })),
});

apiRouter.post('/gemma/analyze-assessment', async (req: Request, res: Response) => {
  try {
    const { goalContext, submissions } = AnalyzeAssessmentSchema.parse(req.body);
    const analysis = await gemmaService.analyzeAssessment(goalContext, submissions);
    res.json({ success: true, data: analysis });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, error: err.errors[0]?.message || 'Validation error' });
      return;
    }
    console.error('[API] /analyze-assessment error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error' });
  }
});

// POST /api/gemma/generate-roadmap
const GenerateRoadmapSchema = z.object({
  goalContext: GenerateAssessmentSchema,
  analysis: z.object({
    demonstratedStrengths: z.array(z.any()),
    identifiedGaps: z.array(z.any()),
    missingPrerequisites: z.array(z.string()),
    overallProficiencyBand: z.string(),
    objectiveScorePercentage: z.number(),
    uncertaintyScore: z.number(),
    qualitativeSummary: z.string(),
    recommendedStartingMilestone: z.string(),
    engineUsed: z.string(),
    evidenceDisclaimer: z.string(),
  }),
});

apiRouter.post('/gemma/generate-roadmap', async (req: Request, res: Response) => {
  try {
    const { goalContext, analysis } = GenerateRoadmapSchema.parse(req.body);
    const roadmap = await gemmaService.generateRoadmap(goalContext, analysis as any);
    res.json({ success: true, data: roadmap });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, error: err.errors[0]?.message || 'Validation error' });
      return;
    }
    console.error('[API] /generate-roadmap error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error' });
  }
});

// POST /api/gemma/evaluate-task
const EvaluateTaskSchema = z.object({
  task: z.any(),
  submissionContent: z.string().min(5, 'Please provide a non-empty submission or reflection'),
  timeSpentMinutes: z.number().min(1),
});

apiRouter.post('/gemma/evaluate-task', async (req: Request, res: Response) => {
  try {
    const { task, submissionContent, timeSpentMinutes } = EvaluateTaskSchema.parse(req.body);
    const evaluation = await gemmaService.evaluateTaskSubmission(task, submissionContent, timeSpentMinutes);
    res.json({ success: true, data: evaluation });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, error: err.errors[0]?.message || 'Validation error' });
      return;
    }
    console.error('[API] /evaluate-task error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error' });
  }
});

// POST /api/gemma/maintenance-schedule
apiRouter.post('/gemma/maintenance-schedule', (req: Request, res: Response) => {
  try {
    const learnedSkills = req.body.learnedSkills || [];
    const plan = gemmaService.generateMaintenancePlan(learnedSkills);
    res.json({ success: true, data: plan });
  } catch (err: any) {
    console.error('[API] /maintenance-schedule error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error' });
  }
});

// POST /api/gemma/adapt-roadmap
const AdaptRoadmapSchema = z.object({
  roadmap: z.any(),
  evaluations: z.array(z.any()),
});

apiRouter.post('/gemma/adapt-roadmap', async (req: Request, res: Response) => {
  try {
    const { roadmap, evaluations } = AdaptRoadmapSchema.parse(req.body);
    const result = await gemmaService.adaptRoadmap(roadmap, evaluations);
    res.json({ success: true, data: result });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, error: err.errors[0]?.message || 'Validation error' });
      return;
    }
    console.error('[API] /adapt-roadmap error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error' });
  }
});

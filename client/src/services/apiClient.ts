import {
  BaselineAssessment,
  AssessmentAnalysisResult,
  Roadmap,
  TaskEvaluationResult,
  UserGoalContext,
  QuestionSubmission,
  MaintenancePlan,
  SystemStatus,
  RoadmapTask
} from '../types';

export const apiClient = {
  async getSystemStatus(): Promise<SystemStatus> {
    try {
      const res = await fetch('/api/system/status');
      if (!res.ok) throw new Error('Status check failed');
      const json = await res.json();
      return json;
    } catch {
      return {
        mode: 'simulation_engine',
        activeModel: 'gemma-2-9b-it',
        hasApiKey: false,
        provider: 'simulation',
        description: 'Running in offline simulation mode.',
      };
    }
  },

  async interpretGoal(rawAmbition: string): Promise<{
    clarifiedGoal: string;
    targetSkill: string;
    proposedTimeframeWeeks: number;
    recommendedDailyMinutes: number;
    foundationalPrerequisites: string[];
    potentialBlockers: string[];
    suggestedMilestonePreview: string[];
    generatedBy: string;
  }> {
    const res = await fetch('/api/gemma/interpret-goal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawAmbition }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to interpret goal');
    return json.data;
  },

  async generateAssessment(goalContext: UserGoalContext): Promise<BaselineAssessment> {
    const res = await fetch('/api/gemma/generate-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalContext),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to generate assessment');
    return json.data;
  },

  async analyzeAssessment(
    goalContext: UserGoalContext,
    submissions: QuestionSubmission[]
  ): Promise<AssessmentAnalysisResult> {
    const res = await fetch('/api/gemma/analyze-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goalContext, submissions }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to analyze assessment');
    return json.data;
  },

  async generateRoadmap(
    goalContext: UserGoalContext,
    analysis: AssessmentAnalysisResult
  ): Promise<Roadmap> {
    const res = await fetch('/api/gemma/generate-roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goalContext, analysis }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to generate roadmap');
    return json.data;
  },

  async evaluateTask(
    task: RoadmapTask,
    submissionContent: string,
    timeSpentMinutes: number
  ): Promise<TaskEvaluationResult> {
    const res = await fetch('/api/gemma/evaluate-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, submissionContent, timeSpentMinutes }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to evaluate task');
    return json.data;
  },

  async getMaintenanceSchedule(learnedSkills?: any[]): Promise<MaintenancePlan> {
    const res = await fetch('/api/gemma/maintenance-schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ learnedSkills: learnedSkills || [] }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to load maintenance schedule');
    return json.data;
  },

  async adaptRoadmap(
    roadmap: Roadmap,
    evaluations: any[]
  ): Promise<{ roadmap: Roadmap; adaptationSummary: string; engineUsed: string }> {
    const res = await fetch('/api/gemma/adapt-roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roadmap, evaluations }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to adapt roadmap');
    return json.data;
  },
};
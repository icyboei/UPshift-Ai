export type EngineAttribution = 'gemma_live' | 'simulation_engine';

export type ConfidenceLevel = 'low' | 'medium' | 'high';
export type TaskDifficulty = 'foundational' | 'intermediate' | 'advanced' | 'stretch';
export type TaskStatus = 'locked' | 'available' | 'in_progress' | 'submitted' | 'completed' | 'needs_review';
export type PrerequisiteStatus = 'mastered' | 'weak' | 'missing' | 'in_progress';

export interface UserGoalContext {
  rawAmbition: string;
  clarifiedGoal: string;
  targetSkill: string;
  currentLevel: 'absolute_beginner' | 'early_learner' | 'intermediate' | 'advanced';
  dailyHours: number;
  timeframeWeeks: number;
  constraints?: string;
  learningStyle?: 'hands_on_projects' | 'conceptual_first' | 'problem_solving_drills';
}

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  category: 'conceptual' | 'code_analysis' | 'practical_scenario' | 'debugging';
  difficulty: TaskDifficulty;
  prerequisiteTested: string;
  options?: string[]; // for multiple choice / diagnostic
  sampleCodeSnippet?: string;
  expectedDeliverable?: string;
  evaluationRubric: string;
}

export interface BaselineAssessment {
  id: string;
  goalSummary: string;
  targetSkill: string;
  estimatedDurationMinutes: number;
  questions: AssessmentQuestion[];
  generatedBy: EngineAttribution;
  disclaimer: string;
}

export interface QuestionSubmission {
  questionId: string;
  userAnswer: string;
  selectedOptionIndex?: number;
  selfAssessedConfidence: ConfidenceLevel;
}

export interface SkillGapItem {
  skillName: string;
  status: PrerequisiteStatus;
  confidenceScore: number; // 0 to 100
  evidenceType: 'demonstrated_test' | 'self_reported' | 'unverified_estimate';
  notes: string;
  isPrerequisiteBlocker: boolean;
}

export interface AssessmentAnalysisResult {
  demonstratedStrengths: SkillGapItem[];
  identifiedGaps: SkillGapItem[];
  missingPrerequisites: string[];
  overallProficiencyBand: string;
  objectiveScorePercentage: number;
  uncertaintyScore: number; // 0-100 (high uncertainty = needs more diagnostic evidence)
  qualitativeSummary: string;
  recommendedStartingMilestone: string;
  engineUsed: EngineAttribution;
  evidenceDisclaimer: string;
}

export interface RoadmapTask {
  id: string;
  milestoneId: string;
  title: string;
  objective: string;
  whyItMatters: string;
  prerequisiteKnowledge: string[];
  estimatedMinutes: number;
  instructions: string[];
  usefulResources: { title: string; url?: string; type: 'documentation' | 'tutorial' | 'interactive' }[];
  expectedDeliverable: string;
  completionCriteria: string[];
  difficulty: TaskDifficulty;
  status: TaskStatus;
  userSubmission?: string;
  followUpAssessment?: string;
}

export interface RoadmapMilestone {
  id: string;
  order: number;
  title: string;
  description: string;
  estimatedHours: number;
  prerequisiteMilestoneIds: string[];
  status: 'locked' | 'ready' | 'in_progress' | 'completed';
  tasks: RoadmapTask[];
}

export interface Roadmap {
  id: string;
  title: string;
  targetSkill: string;
  targetTimeframeWeeks: number;
  weeklyHoursBudget: number;
  totalEstimatedHours: number;
  milestones: RoadmapMilestone[];
  generatedBy: EngineAttribution;
  lastAdaptedAt: string;
  adaptationReason?: string;
}

export interface TaskEvaluationResult {
  taskId: string;
  scorePercentage: number; // 0 - 100
  passed: boolean;
  qualitativeFeedback: string;
  strengthsDemonstrated: string[];
  blindSpotsIdentified: string[];
  recommendedAction: 'advance' | 'repeat' | 'review_prerequisite' | 'increase_difficulty' | 'pivot_strategy';
  actionRationale: string;
  prerequisiteToReview?: string;
  adaptiveRoadmapChanges: {
    description: string;
    affectedMilestoneId?: string;
    injectedRefresherTask?: RoadmapTask;
  };
  engineUsed: EngineAttribution;
}

export interface SpacedRepetitionItem {
  skillId: string;
  skillName: string;
  retentionStrength: number; // 0-100%
  lastPracticedDate: string;
  daysUntilReviewDue: number;
  isDue: boolean;
  quickCheckQuestion: string;
  suggestedAction: string;
}

export interface MaintenancePlan {
  nextReviewDate: string;
  retentionItems: SpacedRepetitionItem[];
  catchUpPlan: {
    isBehindSchedule: boolean;
    missedDaysCount: number;
    recommendedAdjustedPace: string;
    supportiveGuidance: string;
  };
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserGoalContext,
  BaselineAssessment,
  QuestionSubmission,
  AssessmentAnalysisResult,
  Roadmap,
  RoadmapTask,
  TaskEvaluationResult,
  MaintenancePlan,
  SystemStatus,
  CompletedEvaluationRecord,
} from '../types';
import { apiClient } from '../services/apiClient';

export type AppView =
  | 'landing'
  | 'onboarding'
  | 'assessment'
  | 'assessment_results'
  | 'roadmap'
  | 'task_workspace'
  | 'analytics'
  | 'maintenance'
  | 'system_details'
  | 'settings';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  goalContext: UserGoalContext | null;
  setGoalContext: (ctx: UserGoalContext | null) => void;
  baselineAssessment: BaselineAssessment | null;
  setBaselineAssessment: (assessment: BaselineAssessment | null) => void;
  assessmentSubmissions: QuestionSubmission[];
  setAssessmentSubmissions: (subs: QuestionSubmission[]) => void;
  assessmentAnalysis: AssessmentAnalysisResult | null;
  setAssessmentAnalysis: (analysis: AssessmentAnalysisResult | null) => void;
  roadmap: Roadmap | null;
  setRoadmap: (roadmap: Roadmap | null) => void;
  activeTaskId: string | null;
  setActiveTaskId: (taskId: string | null) => void;
  evaluationsHistory: CompletedEvaluationRecord[];
  maintenancePlan: MaintenancePlan | null;
  systemStatus: SystemStatus | null;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (err: string | null) => void;
  // Actions
  startNewGoal: (rawAmbition: string) => Promise<void>;
  submitAssessment: (submissions: QuestionSubmission[]) => Promise<void>;
  generateRoadmapFromResults: () => Promise<void>;
  submitTaskForEvaluation: (task: RoadmapTask, submission: string, timeSpent: number) => Promise<TaskEvaluationResult>;
  refreshMaintenancePlan: () => Promise<void>;
  loadSeedDemo: () => void;
  resetAllData: () => void;
  adaptRoadmapStrategy: () => Promise<void>;
  exportStateJson: () => void;
  importStateJson: (jsonString: string) => boolean;
  refreshSystemStatus: () => Promise<void>;
}

const STORAGE_KEY = 'UPSHIFT_AI_STATE_V1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [goalContext, setGoalContext] = useState<UserGoalContext | null>(null);
  const [baselineAssessment, setBaselineAssessment] = useState<BaselineAssessment | null>(null);
  const [assessmentSubmissions, setAssessmentSubmissions] = useState<QuestionSubmission[]>([]);
  const [assessmentAnalysis, setAssessmentAnalysis] = useState<AssessmentAnalysisResult | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [evaluationsHistory, setEvaluationsHistory] = useState<CompletedEvaluationRecord[]>([]);
  const [maintenancePlan, setMaintenancePlan] = useState<MaintenancePlan | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load state from localStorage on init
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.goalContext) setGoalContext(parsed.goalContext);
        if (parsed.baselineAssessment) setBaselineAssessment(parsed.baselineAssessment);
        if (parsed.assessmentSubmissions) setAssessmentSubmissions(parsed.assessmentSubmissions);
        if (parsed.assessmentAnalysis) setAssessmentAnalysis(parsed.assessmentAnalysis);
        if (parsed.roadmap) setRoadmap(parsed.roadmap);
        if (parsed.activeTaskId) setActiveTaskId(parsed.activeTaskId);
        if (parsed.evaluationsHistory) setEvaluationsHistory(parsed.evaluationsHistory);
        if (parsed.maintenancePlan) setMaintenancePlan(parsed.maintenancePlan);
        if (parsed.currentView && parsed.currentView !== 'landing') {
          setCurrentView(parsed.currentView);
        }
      }
    } catch (e) {
      console.warn('Could not restore saved state:', e);
    }

    refreshSystemStatus();
  }, []);

  // Save to localStorage when state updates
  useEffect(() => {
    try {
      const stateToPersist = {
        goalContext,
        baselineAssessment,
        assessmentSubmissions,
        assessmentAnalysis,
        roadmap,
        activeTaskId,
        evaluationsHistory,
        maintenancePlan,
        currentView: currentView === 'landing' ? 'landing' : currentView,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch (e) {
      console.warn('Failed to persist state:', e);
    }
  }, [
    goalContext,
    baselineAssessment,
    assessmentSubmissions,
    assessmentAnalysis,
    roadmap,
    activeTaskId,
    evaluationsHistory,
    maintenancePlan,
    currentView,
  ]);

  const refreshSystemStatus = async () => {
    try {
      const status = await apiClient.getSystemStatus();
      setSystemStatus(status);
    } catch {
      // ignore
    }
  };

  const startNewGoal = async (rawAmbition: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const interpreted = await apiClient.interpretGoal(rawAmbition);
      const newCtx: UserGoalContext = {
        rawAmbition,
        clarifiedGoal: interpreted.clarifiedGoal,
        targetSkill: interpreted.targetSkill,
        currentLevel: 'early_learner',
        dailyHours: Math.round((interpreted.recommendedDailyMinutes / 60) * 10) / 10 || 1,
        timeframeWeeks: interpreted.proposedTimeframeWeeks || 12,
        constraints: '',
        learningStyle: 'hands_on_projects',
      };
      setGoalContext(newCtx);

      // Generate diagnostic baseline
      const assessment = await apiClient.generateAssessment(newCtx);
      setBaselineAssessment(assessment);
      setAssessmentSubmissions([]);
      setAssessmentAnalysis(null);
      setCurrentView('assessment');
    } catch (err: any) {
      setError(err.message || 'Failed to initialize assessment');
    } finally {
      setIsLoading(false);
    }
  };

  const submitAssessment = async (submissions: QuestionSubmission[]) => {
    if (!goalContext) return;
    setIsLoading(true);
    setError(null);
    try {
      setAssessmentSubmissions(submissions);
      const analysis = await apiClient.analyzeAssessment(goalContext, submissions);
      setAssessmentAnalysis(analysis);
      setCurrentView('assessment_results');
    } catch (err: any) {
      setError(err.message || 'Failed to analyze assessment');
    } finally {
      setIsLoading(false);
    }
  };

  const generateRoadmapFromResults = async () => {
    if (!goalContext || !assessmentAnalysis) return;
    setIsLoading(true);
    setError(null);
    try {
      const generated = await apiClient.generateRoadmap(goalContext, assessmentAnalysis);
      setRoadmap(generated);

      // Find first available task
      const firstAvailable = generated.milestones
        .flatMap(m => m.tasks)
        .find(t => t.status === 'available' || t.status === 'in_progress');

      if (firstAvailable) {
        setActiveTaskId(firstAvailable.id);
      }

      // Generate initial maintenance plan
      const maint = await apiClient.getMaintenanceSchedule([]);
      setMaintenancePlan(maint);

      setCurrentView('roadmap');
    } catch (err: any) {
      setError(err.message || 'Failed to generate roadmap');
    } finally {
      setIsLoading(false);
    }
  };

  const submitTaskForEvaluation = async (
    task: RoadmapTask,
    submission: string,
    timeSpent: number
  ): Promise<TaskEvaluationResult> => {
    setIsLoading(true);
    setError(null);
    try {
      const evalResult = await apiClient.evaluateTask(task, submission, timeSpent);

      // Record evaluation in history
      const record: CompletedEvaluationRecord = {
        id: `eval-${Date.now()}`,
        taskId: task.id,
        taskTitle: task.title,
        evaluatedAt: new Date().toISOString(),
        result: evalResult,
        submissionSnippet: submission.slice(0, 300),
      };
      setEvaluationsHistory(prev => [record, ...prev]);

      // Adapt roadmap state based on evaluation
      if (roadmap) {
        const updatedMilestones = roadmap.milestones.map(m => {
          const updatedTasks = m.tasks.map(t => {
            if (t.id === task.id) {
              return {
                ...t,
                status: evalResult.passed ? ('completed' as const) : ('needs_review' as const),
                userSubmission: submission,
                completedAt: evalResult.passed ? new Date().toISOString() : undefined,
              };
            }
            return t;
          });

          // If passed, unlock next task in milestone if locked
          if (evalResult.passed && m.id === task.milestoneId) {
            const currentIdx = updatedTasks.findIndex(t => t.id === task.id);
            if (currentIdx !== -1 && currentIdx + 1 < updatedTasks.length) {
              if (updatedTasks[currentIdx + 1].status === 'locked') {
                updatedTasks[currentIdx + 1].status = 'available';
              }
            }
          }

          // Check if all milestone tasks completed
          const allCompleted = updatedTasks.every(t => t.status === 'completed');
          return {
            ...m,
            tasks: updatedTasks,
            status: allCompleted ? ('completed' as const) : m.status,
          };
        });

        // If next milestone exists and previous is completed, unlock it
        for (let i = 0; i < updatedMilestones.length - 1; i++) {
          if (updatedMilestones[i].status === 'completed' && updatedMilestones[i + 1].status === 'locked') {
            updatedMilestones[i + 1].status = 'ready';
            if (updatedMilestones[i + 1].tasks.length > 0 && updatedMilestones[i + 1].tasks[0].status === 'locked') {
              updatedMilestones[i + 1].tasks[0].status = 'available';
            }
          }
        }

        setRoadmap({
          ...roadmap,
          milestones: updatedMilestones,
          lastAdaptedAt: new Date().toISOString(),
          adaptationReason: evalResult.actionRationale,
        });
      }

      return evalResult;
    } catch (err: any) {
      setError(err.message || 'Evaluation failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshMaintenancePlan = async () => {
    try {
      const skillsToReview = evaluationsHistory.map((h, i) => ({
        name: h.taskTitle,
        lastPracticedDaysAgo: Math.min(10, Math.max(1, i * 2)),
        masteryScore: h.result.scorePercentage,
      }));
      const plan = await apiClient.getMaintenanceSchedule(skillsToReview);
      setMaintenancePlan(plan);
    } catch {
      // ignore
    }
  };

  const loadSeedDemo = () => {
    const demoGoal: UserGoalContext = {
      rawAmbition: 'Become a Senior Full-Stack Engineer who can design resilient production systems',
      clarifiedGoal: 'Master Full-Stack Software Engineering with verifiable, production-grade deliverables and rigorous prerequisite mastery.',
      targetSkill: 'Full-Stack Software Engineering',
      currentLevel: 'early_learner',
      dailyHours: 1.5,
      timeframeWeeks: 12,
      constraints: 'Balancing 9-to-5 job; prefers concentrated 45-minute focused evening sessions.',
      learningStyle: 'hands_on_projects',
    };

    const demoAssessment: BaselineAssessment = {
      id: 'demo-diag-web-01',
      goalSummary: demoGoal.clarifiedGoal,
      targetSkill: demoGoal.targetSkill,
      estimatedDurationMinutes: 12,
      generatedBy: 'gemma_live',
      disclaimer: 'Diagnostic checks isolate foundational concepts from superficial syntax recall. They identify your ideal starting milestone.',
      questions: [
        {
          id: 'q1',
          category: 'conceptual',
          difficulty: 'foundational',
          prerequisiteTested: 'Asynchronous Event Loop & Execution Order',
          prompt: 'In a modern JavaScript/TypeScript runtime, what is the exact output order of the following console logs?',
          sampleCodeSnippet: `console.log('1: Start');\nsetTimeout(() => console.log('2: Timer'), 0);\nPromise.resolve().then(() => console.log('3: Microtask'));\nconsole.log('4: End');`,
          options: [
            '1: Start, 2: Timer, 3: Microtask, 4: End',
            '1: Start, 4: End, 3: Microtask, 2: Timer',
            '1: Start, 4: End, 2: Timer, 3: Microtask',
            '3: Microtask, 1: Start, 4: End, 2: Timer',
          ],
          evaluationRubric: 'Synchronous code executes first, then microtask queue (Promise), then macrotask queue (setTimeout).',
        },
        {
          id: 'q2',
          category: 'practical_scenario',
          difficulty: 'intermediate',
          prerequisiteTested: 'State Immutability & Reactivity',
          prompt: 'Why does directly mutating an array or object in modern reactive UI frameworks lead to silent rendering bugs?',
          options: [
            'The memory address remains identical, causing shallow equality checks (Object.is) to report no change and skip re-renders.',
            'Mutating objects causes immediate memory leaks and browser crash.',
            'Compilers forbid dot notation on state variables.',
            'Garbage collection freezes state threads.',
          ],
          evaluationRubric: 'Tests understanding of reference equality and reconciliation.',
        },
        {
          id: 'q3',
          category: 'debugging',
          difficulty: 'intermediate',
          prerequisiteTested: 'API Idempotency & Error Handling',
          prompt: 'A payment checkout button triggers POST /charge. Network latency is high. What guarantees single billing?',
          options: [
            'Disabling the button with CSS opacity.',
            'Generating an Idempotency-Key on the client for the transaction and validating it with atomic locking on the server.',
            'Increasing server timeout to 120 seconds.',
            'Storing charges in browser localStorage before sending.',
          ],
          evaluationRubric: 'Correct production idempotency pattern.',
        },
      ],
    };

    const demoAnalysis: AssessmentAnalysisResult = {
      demonstratedStrengths: [
        {
          skillName: 'Runtime Execution & Asynchronous Control Flow',
          status: 'mastered',
          confidenceScore: 88,
          evidenceType: 'demonstrated_test',
          notes: 'Accurately predicted microtask vs macrotask execution order under timed diagnostic conditions.',
          isPrerequisiteBlocker: false,
        },
        {
          skillName: 'State Reactivity & Reference Semantics',
          status: 'mastered',
          confidenceScore: 82,
          evidenceType: 'demonstrated_test',
          notes: 'Strong grasp of shallow equality checks and immutable state preservation.',
          isPrerequisiteBlocker: false,
        },
      ],
      identifiedGaps: [
        {
          skillName: 'Distributed Consistency & Network Fault Tolerance',
          status: 'weak',
          confidenceScore: 45,
          evidenceType: 'demonstrated_test',
          notes: 'Requires practical drills in idempotency keys and exponential backoff retry jitter.',
          isPrerequisiteBlocker: false,
        },
      ],
      missingPrerequisites: [],
      overallProficiencyBand: 'Early Intermediate',
      objectiveScorePercentage: 75,
      uncertaintyScore: 18,
      qualitativeSummary:
        'Demonstrated sound comprehension of asynchronous event loops and reactive state pointers. Cleared to bypass basic syntax drills and focus on resilient system architecture and network fault tolerance.',
      recommendedStartingMilestone: 'Milestone 1: Foundational Mechanics & Memory Lifecycle',
      engineUsed: 'gemma_live',
      evidenceDisclaimer:
        'Distinction enforced: Scores reflect demonstrated performance on specific diagnostic items, not broad or unverified intelligence claims.',
    };

    const demoRoadmap: Roadmap = {
      id: 'demo-roadmap-web-01',
      title: 'Prerequisite-Aware Roadmap: Full-Stack Software Engineering',
      targetSkill: 'Full-Stack Software Engineering',
      targetTimeframeWeeks: 12,
      weeklyHoursBudget: 10.5,
      totalEstimatedHours: 85,
      generatedBy: 'gemma_live',
      lastAdaptedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      adaptationReason: 'Prerequisite check verified. Task 1-1 completed with 92% rubric score.',
      milestones: [
        {
          id: 'ms-1',
          order: 1,
          title: 'Foundational Mechanics & Memory Lifecycle',
          description: 'Master core execution flow, memory references, and asynchronous boundaries before building complex architectures.',
          estimatedHours: 8,
          prerequisiteMilestoneIds: [],
          status: 'in_progress',
          tasks: [
            {
              id: 'task-1-1',
              milestoneId: 'ms-1',
              title: 'Trace Execution Order in Complex Asynchronous Chains',
              objective: 'Predict and verify microtask and macrotask scheduling in real-world scenarios.',
              whyItMatters: 'Writing predictable async code prevents catastrophic race conditions in production APIs and user interfaces.',
              prerequisiteKnowledge: ['Call stack mechanics', 'Promise state transitions'],
              estimatedMinutes: 45,
              instructions: [
                'Create a script with 3 nested asynchronous operations combining setTimeout, Promise.resolve, and queueMicrotask.',
                'Document expected output sequence before executing.',
                'Run the script in Node or browser console to observe exact microtask drain order.',
                'Refactor one operation into async/await and record how the event loop handles the continuation.',
              ],
              usefulResources: [
                { title: 'MDN: In-depth Event Loop and Microtask Queue', type: 'documentation' },
                { title: 'Interactive Event Loop Visualizer', type: 'interactive' },
              ],
              expectedDeliverable: 'A commented code snippet showing predictions vs observed execution order with a 3-sentence explanation of the continuation pause.',
              completionCriteria: [
                'Correct prediction of all 4 lifecycle phases',
                'Clear distinction made between microtasks and timer events',
                'Executable reproduction script submitted',
              ],
              difficulty: 'foundational',
              status: 'completed',
              completedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
              userSubmission: `// Task 1-1 Demo Submission\nfunction demonstrateEventLoop() {\n  console.log('1: Sync call on main thread');\n  setTimeout(() => console.log('4: Macrotask timer executed after microtask drain'), 0);\n  Promise.resolve().then(() => console.log('2: Microtask promise resolved immediately'));\n  queueMicrotask(() => console.log('3: Queued microtask executed before macrotask queue'));\n}\ndemonstrateEventLoop();\n// Verified: Microtasks drain completely before the browser or Node picks up the next timer macrotask.`,
            },
            {
              id: 'task-1-2',
              milestoneId: 'ms-1',
              title: 'Implement Immutable State Updates with Reference Verification',
              objective: 'Construct deep and shallow updates without mutating parent objects.',
              whyItMatters: 'UI reactivity algorithms rely on shallow reference inequality (Object.is) to trigger re-renders efficiently.',
              prerequisiteKnowledge: ['Spread syntax', 'Object reference pointers'],
              estimatedMinutes: 50,
              instructions: [
                'Define a normalized data entity with nested arrays of items.',
                'Write an updater function that modifies an item 2 levels deep while ensuring all unmodified sibling branches retain identical reference identity.',
                'Add assert checks verifying updatedBranch !== oldBranch and untouchedBranch === oldUntouchedBranch.',
              ],
              usefulResources: [
                { title: 'Architectural Guide: Immutable Data Patterns', type: 'documentation' },
              ],
              expectedDeliverable: 'A TypeScript or JavaScript module with pure updater functions and assertion test suite.',
              completionCriteria: [
                'Zero direct mutation of source parameters',
                'Reference preservation verified for unaffected nodes',
                'Handling of empty or undefined child arrays',
              ],
              difficulty: 'intermediate',
              status: 'available',
            },
          ],
        },
        {
          id: 'ms-2',
          order: 2,
          title: 'Resilient Architecture & Network Fault Tolerance',
          description: 'Construct idempotent interfaces, error recovery boundaries, and modular component systems.',
          estimatedHours: 14,
          prerequisiteMilestoneIds: ['ms-1'],
          status: 'locked',
          tasks: [
            {
              id: 'task-2-1',
              milestoneId: 'ms-2',
              title: 'Design an Idempotent HTTP API Client with Exponential Backoff',
              objective: 'Build a network layer resilient to packet drops and repeated submissions.',
              whyItMatters: 'Prevents double billing, duplicate records, and race conditions during high network latency.',
              prerequisiteKnowledge: ['Fetch API', 'HTTP status codes', 'Async retry mechanisms'],
              estimatedMinutes: 60,
              instructions: [
                'Implement an API client class with unique UUIDv4 idempotency keys generated per transactional request.',
                'Configure exponential backoff jitter (e.g. 500ms, 1000ms, 2000ms) for transient 503 and network timeout errors.',
                'Simulate network failure using a mock interceptor and demonstrate graceful recovery.',
              ],
              usefulResources: [
                { title: 'IETF RFC: Idempotency Key Specification for HTTP APIs', type: 'documentation' },
              ],
              expectedDeliverable: 'Clean TypeScript client class with automated test verifying idempotency header preservation on retries.',
              completionCriteria: [
                'Idempotency header sent on all state-mutating requests (POST/PUT/DELETE)',
                'Exponential backoff with randomized jitter',
                'Non-retryable errors (400, 401, 403) fail immediately without useless retries',
              ],
              difficulty: 'intermediate',
              status: 'locked',
            },
          ],
        },
        {
          id: 'ms-3',
          order: 3,
          title: 'Production Engineering & Measurable Delivery',
          description: 'Deploy verifiable applications with telemetry, automated tests, and persistence integrity.',
          estimatedHours: 20,
          prerequisiteMilestoneIds: ['ms-1', 'ms-2'],
          status: 'locked',
          tasks: [
            {
              id: 'task-3-1',
              milestoneId: 'ms-3',
              title: 'Deploy End-to-End Monitored Production Slice',
              objective: 'Wire database persistence, authenticated API routes, and observability.',
              whyItMatters: 'Bridges theoretical knowledge into demonstrable, deployable software evidence.',
              prerequisiteKnowledge: ['Database connection pooling', 'Environment variable security', 'Structured logging'],
              estimatedMinutes: 90,
              instructions: [
                'Build an end-to-end user journey with validated database schemas.',
                'Add structured JSON logging for all failed transactions with correlation IDs.',
                'Deploy to a live staging environment with automated health check route.',
              ],
              usefulResources: [
                { title: 'Production Ready Node.js Checklist', type: 'documentation' },
              ],
              expectedDeliverable: 'Live repository URL or functioning staging link with reproducible logs.',
              completionCriteria: [
                'Zero secrets committed to source control',
                'Deterministic database migrations',
                'Passing integration tests',
              ],
              difficulty: 'advanced',
              status: 'locked',
            },
          ],
        },
      ],
    };

    const demoEvaluation: CompletedEvaluationRecord = {
      id: 'demo-eval-01',
      taskId: 'task-1-1',
      taskTitle: 'Trace Execution Order in Complex Asynchronous Chains',
      evaluatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      result: {
        taskId: 'task-1-1',
        scorePercentage: 92,
        passed: true,
        qualitativeFeedback:
          'Outstanding empirical demonstration. Your executable script accurately validates the microtask drain prior to macrotask timer execution. All completion criteria satisfied.',
        strengthsDemonstrated: [
          'Correct lifecycle phase ordering under execution',
          'Clean queueMicrotask vs setTimeout differentiation',
          'Reproducible code deliverable',
        ],
        blindSpotsIdentified: [
          'Consider testing unhandled promise rejections across worker boundaries.',
        ],
        recommendedAction: 'advance',
        actionRationale:
          'Prerequisite demonstrated with high empirical confidence. Downstream Task 1-2 unlocked.',
        adaptiveRoadmapChanges: {
          description: 'Unlocked Task 1-2 (Immutable State Updates with Reference Verification).',
          affectedMilestoneId: 'ms-1',
        },
        engineUsed: 'gemma_live',
      },
      submissionSnippet:
        '// Task 1-1 Demo Submission\nfunction demonstrateEventLoop() {\n  console.log("1: Sync call on main thread");\n  setTimeout(() => console.log("4: Macrotask timer executed..."), 0);\n...',
    };

    const demoMaintenance: MaintenancePlan = {
      nextReviewDate: new Date(Date.now() + 86400000 * 2).toLocaleDateString(),
      retentionItems: [
        {
          skillId: 'skill-1',
          skillName: 'Asynchronous Event Loop Mechanics',
          retentionStrength: 92,
          lastPracticedDate: '4 hours ago',
          daysUntilReviewDue: 3,
          isDue: false,
          quickCheckQuestion: 'In 2 sentences: Why do microtasks preempt the macrotask timer queue?',
          suggestedAction: 'Retention is high. Next spaced review scheduled in 3 days.',
        },
        {
          skillName: 'State Reactivity & Reference Semantics',
          skillId: 'skill-2',
          retentionStrength: 78,
          lastPracticedDate: '2 days ago',
          daysUntilReviewDue: 1,
          isDue: false,
          quickCheckQuestion: 'What triggers Object.is shallow inequality in array mutations?',
          suggestedAction: 'Active recall drill due tomorrow to reinforce reference preservation.',
        },
        {
          skillName: 'API Idempotency Key Protocols',
          skillId: 'skill-3',
          retentionStrength: 52,
          lastPracticedDate: '5 days ago',
          daysUntilReviewDue: 0,
          isDue: true,
          quickCheckQuestion: 'How does an idempotency header prevent double-debiting on mobile timeouts?',
          suggestedAction: '3-minute active recall drill due today.',
        },
      ],
      catchUpPlan: {
        isBehindSchedule: false,
        missedDaysCount: 0,
        recommendedAdjustedPace: 'Maintain current steady 45-60 min daily rhythm.',
        supportiveGuidance:
          'Consistent short sessions outperform weekend cramming. Never feel guilty about missed days—we simply recalibrate the schedule without creating an impossible backlog.',
      },
    };

    setGoalContext(demoGoal);
    setBaselineAssessment(demoAssessment);
    setAssessmentAnalysis(demoAnalysis);
    setRoadmap(demoRoadmap);
    setActiveTaskId('task-1-2');
    setEvaluationsHistory([demoEvaluation]);
    setMaintenancePlan(demoMaintenance);
    setCurrentView('roadmap');
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGoalContext(null);
    setBaselineAssessment(null);
    setAssessmentSubmissions([]);
    setAssessmentAnalysis(null);
    setRoadmap(null);
    setActiveTaskId(null);
    setEvaluationsHistory([]);
    setMaintenancePlan(null);
    setCurrentView('landing');
  };

  const adaptRoadmapStrategy = async () => {
    if (!roadmap) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiClient.adaptRoadmap(roadmap, evaluationsHistory);
      setRoadmap(res.roadmap);
    } catch (err: any) {
      setError(err.message || 'Failed to adapt roadmap strategy');
    } finally {
      setIsLoading(false);
    }
  };

  const exportStateJson = () => {
    const data = {
      exportTimestamp: new Date().toISOString(),
      goalContext,
      baselineAssessment,
      assessmentSubmissions,
      assessmentAnalysis,
      roadmap,
      activeTaskId,
      evaluationsHistory,
      maintenancePlan,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `upshift-ai-state-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importStateJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.goalContext) setGoalContext(parsed.goalContext);
      if (parsed.baselineAssessment) setBaselineAssessment(parsed.baselineAssessment);
      if (parsed.assessmentSubmissions) setAssessmentSubmissions(parsed.assessmentSubmissions);
      if (parsed.assessmentAnalysis) setAssessmentAnalysis(parsed.assessmentAnalysis);
      if (parsed.roadmap) setRoadmap(parsed.roadmap);
      if (parsed.activeTaskId) setActiveTaskId(parsed.activeTaskId);
      if (parsed.evaluationsHistory) setEvaluationsHistory(parsed.evaluationsHistory);
      if (parsed.maintenancePlan) setMaintenancePlan(parsed.maintenancePlan);
      setCurrentView('roadmap');
      return true;
    } catch (e) {
      console.error('Failed to import JSON state:', e);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        goalContext,
        setGoalContext,
        baselineAssessment,
        setBaselineAssessment,
        assessmentSubmissions,
        setAssessmentSubmissions,
        assessmentAnalysis,
        setAssessmentAnalysis,
        roadmap,
        setRoadmap,
        activeTaskId,
        setActiveTaskId,
        evaluationsHistory,
        maintenancePlan,
        systemStatus,
        isLoading,
        setIsLoading,
        error,
        setError,
        startNewGoal,
        submitAssessment,
        generateRoadmapFromResults,
        submitTaskForEvaluation,
        refreshMaintenancePlan,
        loadSeedDemo,
        resetAllData,
        adaptRoadmapStrategy,
        exportStateJson,
        importStateJson,
        refreshSystemStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

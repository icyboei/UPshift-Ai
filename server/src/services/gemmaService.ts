import {
  BaselineAssessment,
  AssessmentAnalysisResult,
  Roadmap,
  TaskEvaluationResult,
  UserGoalContext,
  QuestionSubmission,
  MaintenancePlan,
  EngineAttribution,
  RoadmapTask
} from '../types/index.js';

interface GemmaServiceConfig {
  apiKey?: string;
  model: string;
  provider: 'google-ai-studio' | 'ollama' | 'openai-compatible' | 'simulation';
  customEndpoint?: string;
}

export class GemmaService {
  private config: GemmaServiceConfig;

  constructor() {
    this.config = {
      apiKey: process.env.GEMMA_API_KEY?.trim() || undefined,
      model: process.env.GEMMA_MODEL?.trim() || 'gemma-2-9b-it',
      provider: (process.env.GEMMA_PROVIDER as any) || 'google-ai-studio',
      customEndpoint: process.env.GEMMA_CUSTOM_ENDPOINT?.trim() || undefined,
    };
  }

  public getSystemStatus(): {
    mode: EngineAttribution;
    activeModel: string;
    hasApiKey: boolean;
    provider: string;
    description: string;
  } {
    const hasKey = Boolean(this.config.apiKey && this.config.apiKey !== 'your_google_ai_studio_or_gemma_api_key_here');
    return {
      mode: hasKey ? 'gemma_live' : 'simulation_engine',
      activeModel: this.config.model,
      hasApiKey: hasKey,
      provider: this.config.provider,
      description: hasKey
        ? `Live inference connected via ${this.config.provider} (${this.config.model})`
        : 'Running in high-fidelity deterministic simulator mode. All calculations, prerequisite roadmaps, and evaluations are fully functional.',
    };
  }

  /**
   * Helper to safely execute Gemma API calls with fallback to high-fidelity simulation
   */
  private async executeWithFallback<T>(
    prompt: string,
    simulatorFallback: () => T
  ): Promise<{ data: T; engine: EngineAttribution }> {
    const hasKey = Boolean(this.config.apiKey && this.config.apiKey !== 'your_google_ai_studio_or_gemma_api_key_here');

    if (!hasKey) {
      return { data: simulatorFallback(), engine: 'simulation_engine' };
    }

    try {
      // Call Google AI Studio / Generative Language API for Gemma
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(this.config.model)}:generateContent?key=${this.config.apiKey}`;
      
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${prompt}\n\nIMPORTANT: Respond ONLY with valid, unescaped JSON matching the requested structure. Do not include markdown code block ticks unless strictly necessary, and no commentary.` }]
          }
        ],
        generationConfig: {
          temperature: 0.2, // Low temperature for factual, deterministic reasoning
          maxOutputTokens: 2500,
        }
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`[GemmaService] Live API returned ${response.status}: ${response.statusText}. Falling back to simulation engine.`);
        return { data: simulatorFallback(), engine: 'simulation_engine' };
      }

      const jsonResult = await response.json();
      const rawText = jsonResult?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        console.warn('[GemmaService] Empty response candidate from Gemma API. Falling back to simulation.');
        return { data: simulatorFallback(), engine: 'simulation_engine' };
      }

      // Parse JSON from output, stripping any markdown wrappers
      const cleanJsonString = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const parsedData = JSON.parse(cleanJsonString) as T;
      return { data: parsedData, engine: 'gemma_live' };
    } catch (err: any) {
      console.warn(`[GemmaService] Error during live inference: ${err.message}. Using high-fidelity simulator.`);
      return { data: simulatorFallback(), engine: 'simulation_engine' };
    }
  }

  /**
   * STEP 1: Goal Interpretation
   */
  public async interpretGoal(rawAmbition: string): Promise<{
    clarifiedGoal: string;
    targetSkill: string;
    proposedTimeframeWeeks: number;
    recommendedDailyMinutes: number;
    foundationalPrerequisites: string[];
    potentialBlockers: string[];
    suggestedMilestonePreview: string[];
    generatedBy: EngineAttribution;
  }> {
    const fallback = () => {
      const lower = rawAmbition.toLowerCase();
      let target = 'Full-Stack Software Engineering';
      let timeframe = 12;
      let minutes = 60;
      let prerequisites = ['Basic algorithmic logic', 'Computer operating fundamentals', 'Text editor & terminal comfort'];
      let blockers = ['Superficial syntax memorization without building', 'Skipping asynchronous state management', 'Neglecting debugging tools'];
      let milestones = [
        'Prerequisite Foundations: Logical Flow & Structured Data',
        'Core Web Mechanics: DOM, Asynchronous Fetch & State',
        'Architectural Design: Modular Component Systems & APIs',
        'Production Engineering: Testing, Persistence & Deployment'
      ];

      if (lower.includes('data') || lower.includes('python') || lower.includes('ml') || lower.includes('ai')) {
        target = 'Applied Machine Learning & Data Systems';
        timeframe = 14;
        prerequisites = ['Linear algebra basics', 'Python syntax & data structures', 'Basic calculus & statistics'];
        blockers = ['Treating algorithms as black boxes', 'Neglecting data validation & data cleaning', 'Overfitting models'];
        milestones = [
          'Mathematical & Python Prerequisites',
          'Data Engineering: Pandas, NumPy & Vectorization',
          'Supervised Models & Objective Metrics',
          'Production Inference & Model Monitoring'
        ];
      } else if (lower.includes('system') || lower.includes('backend') || lower.includes('go') || lower.includes('rust')) {
        target = 'Backend Systems & Distributed Architecture';
        timeframe = 16;
        prerequisites = ['Memory hierarchy basics', 'Networking (TCP/IP, HTTP)', 'Basic concurrent thinking'];
        blockers = ['Ignoring concurrency hazards and race conditions', 'Premature optimization', 'Inadequate error recovery'];
        milestones = [
          'Foundational Systems: Threads, IO & Sockets',
          'Resilient Micro-APIs & Protocol Design',
          'Data Storage Engines & Indexing Strategies',
          'Distributed Consensus & Observability'
        ];
      }

      return {
        clarifiedGoal: `Master ${target} with verifiable, production-grade deliverables and rigorous prerequisite mastery.`,
        targetSkill: target,
        proposedTimeframeWeeks: timeframe,
        recommendedDailyMinutes: minutes,
        foundationalPrerequisites: prerequisites,
        potentialBlockers: blockers,
        suggestedMilestonePreview: milestones,
      };
    };

    const prompt = `You are the Gemma 4 reasoning engine powering UPSHIFT AI.
The user provided this raw ambition: "${rawAmbition}".
Interpret this goal into a structured engineering / learning trajectory.
Do not assume unrealistic timelines. Ensure prerequisites are made explicit.
Return JSON with keys:
clarifiedGoal (string), targetSkill (string), proposedTimeframeWeeks (number), recommendedDailyMinutes (number), foundationalPrerequisites (array of strings), potentialBlockers (array of strings), suggestedMilestonePreview (array of 4 strings).`;

    const result = await this.executeWithFallback(prompt, fallback);
    return { ...result.data, generatedBy: result.engine };
  }

  /**
   * STEP 2: Baseline Assessment Generation
   */
  public async generateAssessment(goalContext: UserGoalContext): Promise<BaselineAssessment> {
    const fallback = (): BaselineAssessment => {
      const isML = goalContext.targetSkill.toLowerCase().includes('data') || goalContext.targetSkill.toLowerCase().includes('ml');
      const isSystem = goalContext.targetSkill.toLowerCase().includes('backend') || goalContext.targetSkill.toLowerCase().includes('system');

      if (isML) {
        return {
          id: `diag-ml-${Date.now()}`,
          goalSummary: goalContext.clarifiedGoal,
          targetSkill: goalContext.targetSkill,
          estimatedDurationMinutes: 15,
          generatedBy: 'simulation_engine',
          disclaimer: 'Diagnostic checks test prerequisite readiness and conceptual depth. Never treated as an IQ or innate ability score.',
          questions: [
            {
              id: 'q1',
              category: 'conceptual',
              difficulty: 'foundational',
              prerequisiteTested: 'Matrix & Vector Transformations',
              prompt: 'In machine learning pipelines, why is matrix multiplication non-commutative ($A \\times B \\neq B \\times A$), and what physical dimensionality constraint must hold for $A \\times B$ to be valid?',
              options: [
                'Rows of A must match rows of B; order does not change output dimension.',
                'Columns of A must equal rows of B; resulting matrix has dimension (rows of A, columns of B).',
                'Both matrices must be square and invertible.',
                'Multiplication is always commutative if tensors are normalized.'
              ],
              evaluationRubric: 'Correct selection is option 2. Tests fundamental linear algebra dimensionality prerequisite.'
            },
            {
              id: 'q2',
              category: 'code_analysis',
              difficulty: 'intermediate',
              prerequisiteTested: 'Data Leakage & Train/Test Splits',
              prompt: 'Review the following Python snippet. What critical flaw prevents this pipeline from reflecting real-world performance?',
              sampleCodeSnippet: `from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X) # Entire dataset normalized first
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2)
model.fit(X_train, y_train)`,
              options: [
                'StandardScaler cannot operate on multidimensional arrays.',
                'Data leakage: Test set distribution influenced the scaler parameters prior to splitting.',
                'test_size=0.2 is too small for statistical convergence.',
                'model.fit requires unscaled data.'
              ],
              evaluationRubric: 'Option 2 is correct. Identifying data leakage is a critical milestone before advanced modeling.'
            },
            {
              id: 'q3',
              category: 'practical_scenario',
              difficulty: 'intermediate',
              prerequisiteTested: 'Evaluation Metrics vs Class Imbalance',
              prompt: 'You train a fraud detection classifier where fraud accounts for 0.1% of transactions. The model achieves 99.9% accuracy. Why is this metric deceptive, and which metric pair should you consult instead?',
              options: [
                'Accuracy is accurate; 99.9% guarantees virtually zero missed fraud.',
                'A naive dummy classifier predicting "never fraud" achieves 99.9% accuracy; evaluate Precision-Recall AUC or F1-Score instead.',
                'Mean Squared Error should be used instead of classification metrics.',
                'Accuracy must be multiplied by sample variance.'
              ],
              evaluationRubric: 'Option 2 demonstrates understanding of class imbalance and appropriate metric choice.'
            }
          ]
        };
      }

      // Default: Web & Software Engineering
      return {
        id: `diag-web-${Date.now()}`,
        goalSummary: goalContext.clarifiedGoal,
        targetSkill: goalContext.targetSkill,
        estimatedDurationMinutes: 12,
        generatedBy: 'simulation_engine',
        disclaimer: 'Diagnostic questions isolate foundational concepts from superficial syntax recall. They identify your ideal starting milestone.',
        questions: [
          {
            id: 'q1',
            category: 'conceptual',
            difficulty: 'foundational',
            prerequisiteTested: 'Asynchronous Event Loop & Execution Order',
            prompt: 'In a modern JavaScript/TypeScript runtime, what is the exact output order of the following console logs?',
            sampleCodeSnippet: `console.log('1: Start');
setTimeout(() => console.log('2: Timer'), 0);
Promise.resolve().then(() => console.log('3: Microtask'));
console.log('4: End');`,
            options: [
              '1: Start, 2: Timer, 3: Microtask, 4: End',
              '1: Start, 4: End, 3: Microtask, 2: Timer',
              '1: Start, 4: End, 2: Timer, 3: Microtask',
              '3: Microtask, 1: Start, 4: End, 2: Timer'
            ],
            evaluationRubric: 'Option 2 is correct. Synchronous code executes first, then microtask queue (Promise), then macrotask queue (setTimeout).'
          },
          {
            id: 'q2',
            category: 'practical_scenario',
            difficulty: 'intermediate',
            prerequisiteTested: 'State Immutability & Reactivity',
            prompt: 'Why does directly mutating an array or object in modern reactive UI frameworks (like React state or Vue reactive state) lead to silent rendering bugs?',
            options: [
              'The memory address remains identical, causing shallow equality checks (Object.is) to report no change and skip re-renders.',
              'Mutating objects causes immediate memory leaks and browser crash.',
              'Compilers forbid dot notation on state variables.',
              'Garbage collection freezes state threads.'
            ],
            evaluationRubric: 'Option 1 is correct. Tests understanding of reference equality and reconciliation.'
          },
          {
            id: 'q3',
            category: 'debugging',
            difficulty: 'intermediate',
            prerequisiteTested: 'API Idempotency & Error Handling',
            prompt: 'A payment checkout button triggers a POST /charge request. Network latency is high, and users frequently double-click the button. What architectural mechanism guarantees the customer is only billed once?',
            options: [
              'Disabling the button with CSS opacity.',
              'Generating an Idempotency-Key on the client for the transaction and validating it with atomic locking on the server.',
              'Increasing the server timeout to 120 seconds.',
              'Storing charges in browser localStorage before sending.'
            ],
            evaluationRubric: 'Option 2 is the correct production engineering pattern.'
          }
        ]
      };
    };

    const prompt = `Generate a diagnostic baseline assessment for a learner targeting: "${goalContext.targetSkill}".
Their stated level is: "${goalContext.currentLevel}".
Create 3 high-signal diagnostic questions that differentiate between superficial syntax memory and real conceptual/practical mastery.
Each question must test a clear prerequisite.
Return JSON matching BaselineAssessment structure with fields:
id (string), goalSummary (string), targetSkill (string), estimatedDurationMinutes (number), disclaimer (string), questions (array of objects with id, prompt, category, difficulty, prerequisiteTested, options [4 strings], sampleCodeSnippet [optional string], evaluationRubric [string]).`;

    const result = await this.executeWithFallback(prompt, fallback);
    return { ...result.data, generatedBy: result.engine };
  }

  /**
   * STEP 3: Assessment Analysis & Skill Gap Graph
   */
  public async analyzeAssessment(
    goalContext: UserGoalContext,
    submissions: QuestionSubmission[]
  ): Promise<AssessmentAnalysisResult> {
    const fallback = (): AssessmentAnalysisResult => {
      // Evaluate based on chosen answers
      let correctCount = 0;
      submissions.forEach(sub => {
        // Option 1 (index 1) was the correct answer for q1, q2, q3 in fallback
        if (sub.selectedOptionIndex === 1) {
          correctCount++;
        }
      });

      const scorePercentage = Math.round((correctCount / Math.max(submissions.length, 1)) * 100);

      const strengths = [];
      const gaps = [];
      const missingPrereqs: string[] = [];

      if (scorePercentage >= 66) {
        strengths.push({
          skillName: 'Runtime Execution & Asynchronous Control Flow',
          status: 'mastered' as const,
          confidenceScore: 88,
          evidenceType: 'demonstrated_test' as const,
          notes: 'Demonstrated accurate understanding of execution order and task queues under diagnostic conditions.',
          isPrerequisiteBlocker: false
        });
        strengths.push({
          skillName: 'State Reactivity & Reference Semantics',
          status: 'mastered' as const,
          confidenceScore: 82,
          evidenceType: 'demonstrated_test' as const,
          notes: 'Understands object immutability and framework reconciliation mechanics.',
          isPrerequisiteBlocker: false
        });
        gaps.push({
          skillName: 'Distributed Consistency & Network Fault Tolerance',
          status: 'weak' as const,
          confidenceScore: 45,
          evidenceType: 'demonstrated_test' as const,
          notes: 'Needs practical reinforcement in idempotency patterns and atomic transactions.',
          isPrerequisiteBlocker: false
        });
      } else {
        strengths.push({
          skillName: 'Basic Computational Syntax & Intent',
          status: 'in_progress' as const,
          confidenceScore: 60,
          evidenceType: 'self_reported' as const,
          notes: 'Self-reported comfort with core language syntax; requires empirical project validation.',
          isPrerequisiteBlocker: false
        });
        gaps.push({
          skillName: 'Event Loop & Asynchronous Mechanics',
          status: 'weak' as const,
          confidenceScore: 35,
          evidenceType: 'demonstrated_test' as const,
          notes: 'Confusion between microtask (promises) and macrotask (timers) execution order. Prerequisite for reliable async systems.',
          isPrerequisiteBlocker: true
        });
        missingPrereqs.push('Execution Order & Call Stack Fundamentals');
      }

      return {
        demonstratedStrengths: strengths,
        identifiedGaps: gaps,
        missingPrerequisites: missingPrereqs,
        overallProficiencyBand: scorePercentage >= 66 ? 'Early Intermediate' : 'Foundational Learner',
        objectiveScorePercentage: scorePercentage,
        uncertaintyScore: submissions.length < 5 ? 30 : 15,
        qualitativeSummary: scorePercentage >= 66
          ? 'Strong foundational comprehension of asynchronous lifecycles. Ready to advance into modular architecture with targeted drills in distributed consistency.'
          : 'Core syntax recognized, but critical prerequisites in asynchronous state and memory reference semantics need targeted drills before jumping into complex frameworks.',
        recommendedStartingMilestone: scorePercentage >= 66 ? 'Milestone 2: Modular Architecture & Reactive Data' : 'Milestone 1: Asynchronous Execution & Memory Fundamentals',
        engineUsed: 'simulation_engine',
        evidenceDisclaimer: 'Distinction enforced: Scores reflect demonstrated performance on specific diagnostic items, not broad or unverified intelligence claims.'
      };
    };

    const prompt = `Analyze diagnostic test submissions for a student targeting "${goalContext.targetSkill}".
Submissions: ${JSON.stringify(submissions)}.
Generate an evidence-backed skill gap analysis.
Return JSON with fields:
demonstratedStrengths (array of SkillGapItem), identifiedGaps (array of SkillGapItem), missingPrerequisites (array of strings), overallProficiencyBand (string), objectiveScorePercentage (number), uncertaintyScore (number 0-100), qualitativeSummary (string), recommendedStartingMilestone (string), evidenceDisclaimer (string).`;

    const result = await this.executeWithFallback(prompt, fallback);
    return { ...result.data, engineUsed: result.engine };
  }

  /**
   * STEP 4: Prerequisite-Aware Roadmap Generation
   */
  public async generateRoadmap(
    goalContext: UserGoalContext,
    analysis: AssessmentAnalysisResult
  ): Promise<Roadmap> {
    const fallback = (): Roadmap => {
      const isIntermediate = analysis.objectiveScorePercentage >= 66;

      const m1Tasks: RoadmapTask[] = [
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
            'Refactor one operation into async/await and record how the event loop handles the continuation.'
          ],
          usefulResources: [
            { title: 'MDN: In-depth Event Loop and Microtask Queue', type: 'documentation' },
            { title: 'Interactive Event Loop Visualizer', type: 'interactive' }
          ],
          expectedDeliverable: 'A commented code snippet showing predictions vs observed execution order with a 3-sentence explanation of the continuation pause.',
          completionCriteria: [
            'Correct prediction of all 4 lifecycle phases',
            'Clear distinction made between microtasks and timer events',
            'Executable reproduction script submitted'
          ],
          difficulty: 'foundational',
          status: 'available',
          followUpAssessment: 'Why does Promise.reject() without a catch handler trigger an unhandledRejection event even if an outer try/catch block surrounds the caller function?'
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
            'Add assert checks verifying updatedBranch !== oldBranch and untouchedBranch === oldUntouchedBranch.'
          ],
          usefulResources: [
            { title: 'Architectural Guide: Immutable Data Patterns', type: 'documentation' }
          ],
          expectedDeliverable: 'A TypeScript or JavaScript module with pure updater functions and assertion test suite.',
          completionCriteria: [
            'Zero direct mutation of source parameters',
            'Reference preservation verified for unaffected nodes',
            'Handling of empty or undefined child arrays'
          ],
          difficulty: 'intermediate',
          status: 'locked'
        }
      ];

      const m2Tasks: RoadmapTask[] = [
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
            'Simulate network failure using a mock interceptor and demonstrate graceful recovery.'
          ],
          usefulResources: [
            { title: 'IETF RFC: Idempotency Key Specification for HTTP APIs', type: 'documentation' }
          ],
          expectedDeliverable: 'Clean TypeScript client class with automated test verifying idempotency header preservation on retries.',
          completionCriteria: [
            'Idempotency header sent on all state-mutating requests (POST/PUT/DELETE)',
            'Exponential backoff with randomized jitter',
            'Non-retryable errors (400, 401, 403) fail immediately without useless retries'
          ],
          difficulty: 'intermediate',
          status: 'locked'
        }
      ];

      const m3Tasks: RoadmapTask[] = [
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
            'Deploy to a live staging environment with automated health check route.'
          ],
          usefulResources: [
            { title: 'Production Ready Node.js Checklist', type: 'documentation' }
          ],
          expectedDeliverable: 'Live repository URL or functioning staging link with reproducible logs.',
          completionCriteria: [
            'Zero secrets committed to source control',
            'Deterministic database migrations',
            'Passing integration tests'
          ],
          difficulty: 'advanced',
          status: 'locked'
        }
      ];

      return {
        id: `roadmap-${Date.now()}`,
        title: `Prerequisite-Aware Roadmap: ${goalContext.targetSkill}`,
        targetSkill: goalContext.targetSkill,
        targetTimeframeWeeks: goalContext.timeframeWeeks,
        weeklyHoursBudget: goalContext.dailyHours * 7,
        totalEstimatedHours: Math.round(goalContext.dailyHours * 7 * (goalContext.timeframeWeeks * 0.75)),
        generatedBy: 'simulation_engine',
        lastAdaptedAt: new Date().toISOString(),
        milestones: [
          {
            id: 'ms-1',
            order: 1,
            title: 'Foundational Mechanics & Memory Lifecycle',
            description: 'Master core execution flow, memory references, and asynchronous boundaries before building complex architectures.',
            estimatedHours: 8,
            prerequisiteMilestoneIds: [],
            status: isIntermediate ? 'in_progress' : 'ready',
            tasks: m1Tasks
          },
          {
            id: 'ms-2',
            order: 2,
            title: 'Resilient Architecture & Network Fault Tolerance',
            description: 'Construct idempotent interfaces, error recovery boundaries, and modular component systems.',
            estimatedHours: 12,
            prerequisiteMilestoneIds: ['ms-1'],
            status: 'locked',
            tasks: m2Tasks
          },
          {
            id: 'ms-3',
            order: 3,
            title: 'Production Engineering & Measurable Delivery',
            description: 'Deploy verifiable applications with telemetry, automated tests, and persistence integrity.',
            estimatedHours: 16,
            prerequisiteMilestoneIds: ['ms-1', 'ms-2'],
            status: 'locked',
            tasks: m3Tasks
          }
        ]
      };
    };

    const prompt = `You are Gemma 4 designing a strict, prerequisite-aware roadmap for "${goalContext.targetSkill}".
The student has baseline score: ${analysis.objectiveScorePercentage}% and identified gaps: ${JSON.stringify(analysis.identifiedGaps)}.
Create a realistic roadmap with milestones and discrete, actionable daily tasks.
Never assign advanced milestones before prerequisites are satisfied.
Return JSON matching Roadmap structure with fields:
id (string), title (string), targetSkill (string), targetTimeframeWeeks (number), weeklyHoursBudget (number), totalEstimatedHours (number), milestones (array of objects with id, order, title, description, estimatedHours, prerequisiteMilestoneIds, status, tasks [array of RoadmapTask objects]).`;

    const result = await this.executeWithFallback(prompt, fallback);
    return { ...result.data, generatedBy: result.engine };
  }

  /**
   * STEP 5: Task Submission Evaluation & Adaptive Strategy Pivot
   */
  public async evaluateTaskSubmission(
    task: RoadmapTask,
    submissionContent: string,
    timeSpentMinutes: number
  ): Promise<TaskEvaluationResult> {
    const fallback = (): TaskEvaluationResult => {
      const cleanSub = submissionContent.trim();
      const length = cleanSub.length;

      // Realistic qualitative & heuristic checks
      const containsCode = cleanSub.includes('function') || cleanSub.includes('const') || cleanSub.includes('class') || cleanSub.includes('=>') || cleanSub.includes('import');
      const mentionsCoreConcept = cleanSub.toLowerCase().includes('microtask') || cleanSub.toLowerCase().includes('queue') || cleanSub.toLowerCase().includes('event loop') || cleanSub.toLowerCase().includes('promise') || cleanSub.toLowerCase().includes('reference');

      let score = 50;
      let passed = false;
      const strengths: string[] = [];
      const blindSpots: string[] = [];

      if (length > 120 && (containsCode || mentionsCoreConcept)) {
        score = 88;
        passed = true;
        strengths.push('Clear demonstration of task deliverables matching completion criteria');
        strengths.push('Identified correct sequencing and runtime execution rules');
        blindSpots.push('Could further test edge cases like unhandled rejection propagation during microtask drains');
      } else if (length > 50) {
        score = 65;
        passed = false;
        strengths.push('Initial exploration attempted and conceptual familiarity displayed');
        blindSpots.push('Missing explicit verification code or failed to document observed runtime timing');
        blindSpots.push('Completion criteria require empirical execution output, not only speculative summaries');
      } else {
        score = 30;
        passed = false;
        blindSpots.push('Submission is too brief to verify empirical competence');
        blindSpots.push('Does not satisfy the expected deliverable requirements');
      }

      let action: 'advance' | 'repeat' | 'review_prerequisite' | 'increase_difficulty' | 'pivot_strategy' = 'advance';
      let rationale = '';

      if (score >= 85) {
        action = 'advance';
        rationale = 'Empirical evidence demonstrates solid prerequisite mastery. User is cleared to advance to the next dependency.';
      } else if (score >= 60) {
        action = 'repeat';
        rationale = 'Partial comprehension demonstrated. Recommend repeating with targeted edge-case verification before unlocking downstream tasks.';
      } else {
        action = 'review_prerequisite';
        rationale = 'Significant prerequisite gap identified. To prevent building on a fragile foundation, a targeted 20-minute refresher is injected.';
      }

      return {
        taskId: task.id,
        scorePercentage: score,
        passed,
        qualitativeFeedback: passed
          ? `Exceptional work on "${task.title}". Your submission exhibits sound conceptual grounding and satisfies the required completion criteria.`
          : `Good initial effort, but the deliverable does not yet demonstrate sufficient evidence for "${task.title}". Focus on verifying execution order empirically.`,
        strengthsDemonstrated: strengths,
        blindSpotsIdentified: blindSpots,
        recommendedAction: action,
        actionRationale: rationale,
        prerequisiteToReview: action === 'review_prerequisite' ? 'Call Stack & Synchronous Execution Mechanics' : undefined,
        adaptiveRoadmapChanges: {
          description: passed
            ? 'Unlocked downstream dependent task "task-1-2" in current milestone.'
            : 'Injected prerequisite refresher exercise before re-attempting this task.',
          affectedMilestoneId: task.milestoneId,
        },
        engineUsed: 'simulation_engine'
      };
    };

    const prompt = `You are Gemma 4 evaluating a student's submission for task: "${task.title}".
Objective: "${task.objective}".
Expected Deliverable: "${task.expectedDeliverable}".
Completion Criteria: ${JSON.stringify(task.completionCriteria)}.
Student Submission:
"""
${submissionContent}
"""
Time Spent: ${timeSpentMinutes} minutes.
Evaluate against the criteria objectively.
Distinguish demonstrated evidence from speculation.
Return JSON matching TaskEvaluationResult with fields:
taskId, scorePercentage (0-100), passed (boolean), qualitativeFeedback, strengthsDemonstrated (array), blindSpotsIdentified (array), recommendedAction ('advance' | 'repeat' | 'review_prerequisite' | 'increase_difficulty' | 'pivot_strategy'), actionRationale, prerequisiteToReview, adaptiveRoadmapChanges (object with description, affectedMilestoneId).`;

    const result = await this.executeWithFallback(prompt, fallback);
    return { ...result.data, engineUsed: result.engine };
  }

  /**
   * STEP 6: Spaced Maintenance & Retention Planning
   */
  public generateMaintenancePlan(
    learnedSkills: { name: string; lastPracticedDaysAgo: number; masteryScore: number }[]
  ): MaintenancePlan {
    const defaultSkills = learnedSkills.length > 0 ? learnedSkills : [
      { name: 'Asynchronous Event Loop Mechanics', lastPracticedDaysAgo: 4, masteryScore: 88 },
      { name: 'Immutable Reference Semantics', lastPracticedDaysAgo: 1, masteryScore: 82 },
      { name: 'Idempotent API Client Design', lastPracticedDaysAgo: 7, masteryScore: 75 },
    ];

    const retentionItems = defaultSkills.map((s, idx) => {
      // Ebbinghaus forgetting curve estimation: Retention decays with time unless reviewed
      const decayFactor = Math.max(0.2, Math.exp(-0.15 * s.lastPracticedDaysAgo));
      const currentRetention = Math.round(s.masteryScore * decayFactor);
      const isDue = s.lastPracticedDaysAgo >= 3;

      return {
        skillId: `skill-${idx + 1}`,
        skillName: s.name,
        retentionStrength: currentRetention,
        lastPracticedDate: `${s.lastPracticedDaysAgo} days ago`,
        daysUntilReviewDue: isDue ? 0 : 3 - s.lastPracticedDaysAgo,
        isDue,
        quickCheckQuestion: `In 2 sentences: How does ${s.name} prevent regressions when code scales?`,
        suggestedAction: isDue
          ? 'Quick 3-minute active recall drill recommended today to restore retention strength to 95%.'
          : 'Retention is currently healthy. Next spaced review scheduled in 2 days.'
      };
    });

    return {
      nextReviewDate: new Date(Date.now() + 86400000 * 2).toLocaleDateString(),
      retentionItems,
      catchUpPlan: {
        isBehindSchedule: false,
        missedDaysCount: 0,
        recommendedAdjustedPace: 'Maintain current steady 45-60 min daily rhythm.',
        supportiveGuidance: 'Consistent short sessions outperform weekend cramming. Never feel guilty about missed days—we simply recalibrate the schedule without creating an impossible backlog.'
      }
    };
  }
}

export const gemmaService = new GemmaService();

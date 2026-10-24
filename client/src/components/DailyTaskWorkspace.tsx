import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { RoadmapTask, TaskEvaluationResult } from '../types';

export const DailyTaskWorkspace: React.FC = () => {
  const {
    roadmap,
    activeTaskId,
    setActiveTaskId,
    submitTaskForEvaluation,
    isLoading,
    error,
    setCurrentView,
  } = useApp();

  const allTasks = roadmap?.milestones.flatMap((m) => m.tasks) || [];
  const currentTask =
    allTasks.find((t) => t.id === activeTaskId) ||
    allTasks.find((t) => t.status === 'available') ||
    allTasks[0];

  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [submissionText, setSubmissionText] = useState<string>(
    currentTask?.userSubmission ||
      `// Deliverable Submission for Task: ${currentTask?.title || 'Implementation'}\n// Objective: ${currentTask?.objective || 'Satisfy all completion criteria'}\n\nfunction executeSolution() {\n  console.log("Executing deliverable verification...");\n  // Write or paste your deliverable solution here\n  return { status: "completed", verified: true };\n}\n\nexecuteSolution();`
  );
  const [submissionType, setSubmissionType] = useState<'code' | 'url' | 'notes'>('code');
  const [evaluationResult, setEvaluationResult] = useState<TaskEvaluationResult | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTask) return;
    const res = await submitTaskForEvaluation(currentTask, submissionText, 25);
    if (res) {
      setEvaluationResult(res);
      setShowEvaluationModal(true);
    }
  };

  if (!currentTask) {
    return (
      <div className="p-space-lg bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000]">
        <p className="font-label-mono uppercase">NO ACTIVE TASK SELECTED.</p>
        <button
          onClick={() => setCurrentView('roadmap')}
          className="mt-space-sm px-space-md py-space-xs bg-primary-container text-on-primary-container font-title uppercase border-[2px] border-[#000000]"
        >
          SELECT FROM ROADMAP
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-space-xl animate-fadeIn">
      {/* Top Strip */}
      <div className="w-full bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md mb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="px-space-sm py-0.5 bg-primary-container text-on-primary-container font-label-mono text-label-mono uppercase border-[2px] border-[#000000] font-bold">
              TASK: #{currentTask.id.toUpperCase()}
            </span>
            <span className="px-space-sm py-0.5 bg-surface-container-high text-on-surface font-label-mono text-label-mono uppercase border-[2px] border-[#000000]">
              DIFFICULTY: {currentTask.difficulty.toUpperCase()}
            </span>
            <span className="px-space-sm py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono uppercase border-[2px] border-[#000000] font-bold">
              EST: {currentTask.estimatedMinutes} MIN
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight m-0">
            {currentTask.title}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0 max-w-2xl">
            {currentTask.objective}
          </p>
        </div>

        {/* Focus Timer Unit */}
        <div className="flex flex-col items-start md:items-end gap-space-xs border-[2px] border-[#000000] bg-surface-container-low p-space-sm shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">timer</span>
            <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface-variant">
              FOCUS SESSION
            </span>
          </div>
          <div className="font-headline-sm text-headline-sm font-black text-on-surface tracking-wider">
            {formatTimer(timerSeconds)}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-space-xs py-0.5 bg-primary-container text-on-primary-container font-label-mono text-[11px] font-bold border border-[#000000] uppercase hover:opacity-90"
            >
              {isTimerRunning ? 'PAUSE' : 'START'}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(25 * 60);
              }}
              className="px-space-xs py-0.5 bg-surface-container-high font-label-mono text-[11px] font-bold border border-[#000000] uppercase hover:bg-surface-container"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Side: Requirements & Instructions (Span 6) */}
        <div className="lg:col-span-6 flex flex-col gap-space-lg">
          {/* Why It Matters */}
          <div className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md">
            <div className="flex items-center gap-space-xs border-b-[2px] border-[#000000] pb-space-xs mb-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
              <h2 className="font-title text-title uppercase m-0 font-bold">
                WHY THIS MATTERS FOR YOUR TARGET ROLE
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant m-0">
              {currentTask.whyItMatters}
            </p>
          </div>

          {/* Prerequisite Checklist */}
          <div className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md">
            <div className="flex items-center justify-between border-b-[2px] border-[#000000] pb-space-xs mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-tertiary text-[20px]">verified</span>
                <h2 className="font-title text-title uppercase m-0 font-bold">
                  PREREQUISITE KNOWLEDGE VERIFIED
                </h2>
              </div>
              <span className="font-label-mono text-label-mono px-space-xs py-0.5 bg-tertiary-fixed text-on-tertiary-fixed border border-[#000000] font-bold">
                {currentTask.prerequisiteKnowledge.length} PREREQS
              </span>
            </div>
            <div className="flex flex-col gap-space-xs">
              {currentTask.prerequisiteKnowledge.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-space-sm p-space-xs bg-surface-container-low border border-[#000000]"
                >
                  <span className="w-2 h-2 bg-tertiary"></span>
                  <span className="font-label-code text-label-code text-on-surface font-bold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md">
            <div className="flex items-center gap-space-xs border-b-[2px] border-[#000000] pb-space-xs mb-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px]">format_list_numbered</span>
              <h2 className="font-title text-title uppercase m-0 font-bold">
                EXECUTION INSTRUCTIONS
              </h2>
            </div>
            <div className="flex flex-col gap-space-sm">
              {currentTask.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-space-sm">
                  <span className="w-6 h-6 bg-surface-container-high border-[2px] border-[#000000] flex items-center justify-center font-label-mono text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="font-body-md text-body-md text-on-surface m-0 pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Deliverable Submission Terminal (Span 6) */}
        <div className="lg:col-span-6 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] flex flex-col">
            {/* Terminal Header */}
            <div className="bg-black text-white p-space-sm flex items-center justify-between border-b-[3px] border-black">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary-container text-[20px]">
                  terminal
                </span>
                <span className="font-title text-title uppercase tracking-wider font-bold">
                  EVIDENCE SUBMISSION TERMINAL
                </span>
              </div>
              <div className="flex items-center gap-1">
                {(['code', 'url', 'notes'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSubmissionType(type)}
                    className={`px-space-xs py-0.5 font-label-mono text-[11px] uppercase font-bold border border-white ${
                      submissionType === type
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-black text-white hover:bg-neutral-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleEvaluate} className="p-space-md flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                    PASTE {submissionType.toUpperCase()} DELIVERABLE
                  </span>
                  <span className="font-label-mono text-body-sm text-on-surface-variant">
                    GEMMA 4 STRICT EVALUATION
                  </span>
                </div>
                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={14}
                  className="w-full bg-[#1b1b1e] text-[#6dfe9c] font-label-code text-label-code p-space-md border-[3px] border-[#000000] focus:outline-none focus:shadow-[4px_4px_0px_#60a5fa] selection:bg-primary selection:text-white"
                  placeholder="Paste benchmark script, commit hash, or architecture notes..."
                  required
                />
              </div>

              {/* Deliverable Expectations */}
              <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] flex flex-col gap-space-xs">
                <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                  DELIVERABLE EXPECTATION:
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant m-0">
                  {currentTask.expectedDeliverable}
                </p>
                <div className="flex flex-wrap gap-space-xs pt-1">
                  {currentTask.completionCriteria.map((crit, idx) => (
                    <span
                      key={idx}
                      className="px-space-xs py-0.5 bg-surface-container text-on-surface font-label-mono text-[10px] border border-[#000000] font-bold uppercase"
                    >
                      ✓ {crit}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-space-sm bg-primary-container text-on-primary-container font-title text-title uppercase tracking-wider border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-space-sm font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">
                  assignment_turned_in
                </span>
                {isLoading ? 'EVALUATING WITH GEMMA 4...' : 'SUBMIT EVIDENCE FOR GEMMA 4 EVALUATION'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Evaluation Results Modal */}
      {showEvaluationModal && evaluationResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[10px_10px_0px_#000000] max-w-2xl w-full p-space-lg flex flex-col gap-space-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-[3px] border-[#000000] pb-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="w-4 h-4 bg-tertiary-fixed border-[2px] border-[#000000]"></span>
                <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface m-0 font-bold">
                  GEMMA 4 EVIDENCE VERIFICATION REPORT
                </h3>
              </div>
              <button
                onClick={() => setShowEvaluationModal(false)}
                className="w-8 h-8 flex items-center justify-center bg-surface-container-high border-[2px] border-[#000000] font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between p-space-sm bg-surface-container-low border-[2px] border-[#000000]">
              <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                EMPIRICAL SCORE & STATUS:
              </span>
              <div className="flex items-center gap-space-sm">
                <span className="font-headline-sm text-headline-sm uppercase font-bold text-tertiary">
                  {evaluationResult.scorePercentage}%
                </span>
                <span className="px-space-sm py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono uppercase font-bold border border-[#000000]">
                  {evaluationResult.passed ? 'PASSED & VERIFIED' : 'NEEDS REVISION'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                QUALITATIVE FEEDBACK:
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant p-space-sm bg-surface-container border border-[#000000] m-0">
                {evaluationResult.qualitativeFeedback}
              </p>
            </div>

            <div className="flex flex-col gap-space-xs">
              <span className="font-label-mono text-label-mono uppercase font-bold text-tertiary">
                DEMONSTRATED STRENGTHS:
              </span>
              <div className="flex flex-col gap-1">
                {evaluationResult.strengthsDemonstrated.map((str, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-on-surface font-body-sm">
                    <span className="w-1.5 h-1.5 bg-tertiary"></span>
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {evaluationResult.blindSpotsIdentified.length > 0 && (
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-mono text-label-mono uppercase font-bold text-secondary">
                  BLIND SPOTS & IMPROVEMENTS:
                </span>
                <div className="flex flex-col gap-1">
                  {evaluationResult.blindSpotsIdentified.map((gap, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-on-surface font-body-sm">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span>{gap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t-[2px] border-[#000000]">
              <button
                onClick={() => setShowEvaluationModal(false)}
                className="px-space-md py-space-xs bg-surface-container-high border-[2px] border-[#000000] font-title uppercase"
              >
                REVISE SUBMISSION
              </button>
              <button
                onClick={() => {
                  setShowEvaluationModal(false);
                  setCurrentView('roadmap');
                }}
                className="px-space-lg py-space-xs bg-primary-container text-on-primary-container font-title uppercase border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]"
              >
                RETURN TO ROADMAP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

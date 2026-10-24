import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Send,
  Calendar,
  AlertTriangle,
  Code2,
  ShieldCheck,
  Check,
  ExternalLink,
} from 'lucide-react';
import { RoadmapTask, TaskEvaluationResult } from '../types';
import confetti from 'canvas-confetti';

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

  // Find active task
  const allTasks = roadmap?.milestones.flatMap((m) => m.tasks) || [];
  const currentTask = allTasks.find((t) => t.id === activeTaskId) || allTasks.find((t) => t.status === 'available');

  // Focus Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Submission State
  const [submissionText, setSubmissionText] = useState<string>(currentTask?.userSubmission || '');
  const [evaluationResult, setEvaluationResult] = useState<TaskEvaluationResult | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState<boolean>(false);

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (!currentTask) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <p className="text-charcoal-600">No active task selected.</p>
        <button
          onClick={() => setCurrentView('roadmap')}
          className="px-4 py-2 bg-emeraldAccent-600 text-white rounded-lg text-sm font-semibold"
        >
          View Roadmap
        </button>
      </div>
    );
  }

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    const timeSpent = Math.max(1, Math.round(timerSeconds / 60));
    try {
      const result = await submitTaskForEvaluation(currentTask, submissionText, timeSpent);
      setEvaluationResult(result);
      setShowEvaluationModal(true);

      if (result.passed) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    } catch {
      // Error handled in AppContext
    }
  };

  const handleInsertSampleSubmission = () => {
    setSubmissionText(
`// Verification Implementation for: ${currentTask.title}
function verifyExecution() {
  console.log('1: Synchronous call started');
  setTimeout(() => console.log('4: Timer macrotask executed after microtask drain'), 0);
  Promise.resolve().then(() => console.log('2: Microtask executed in current tick'));
  queueMicrotask(() => console.log('3: Queued microtask verified'));
}

verifyExecution();
// Deliverable notes:
// Microtasks always drain completely prior to macrotask timer execution.
// This prevents asynchronous race conditions when dealing with pending promise chains.`
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-8 animate-fadeIn">
      {/* Workspace Header & Action Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-200 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emeraldAccent-100 text-emeraldAccent-800 font-semibold">
              Daily Action Workspace
            </span>
            <span className="text-xs font-mono text-charcoal-400">
              Difficulty: {currentTask.difficulty}
            </span>
          </div>
          <h1 className="editorial-title text-2xl sm:text-3xl font-normal text-charcoal-900">
            {currentTask.title}
          </h1>
        </div>

        {/* Focus Timer Widget */}
        <div className="flex items-center space-x-3 bg-white border border-surface-200 rounded-2xl p-2.5 px-4 shadow-subtle flex-shrink-0">
          <div className="text-right">
            <div className="text-xs font-mono text-charcoal-400 uppercase tracking-wider">
              Focus Timer
            </div>
            <div className="text-xl font-mono font-bold text-charcoal-900">
              {formatTimer(timerSeconds)}
            </div>
          </div>
          <div className="flex items-center space-x-1 pl-2 border-l border-surface-200">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`p-2 rounded-xl transition-colors ${
                isTimerRunning
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  : 'bg-emeraldAccent-600 text-white hover:bg-emeraldAccent-700'
              }`}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(0);
              }}
              title="Reset Timer"
              className="p-2 rounded-xl bg-surface-100 text-charcoal-600 hover:bg-surface-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
          {error}
        </div>
      )}

      {/* Task Specification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Objective */}
        <div className="p-5 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-2">
          <span className="text-[10px] font-mono uppercase font-bold text-charcoal-500">
            Today's Objective
          </span>
          <p className="text-xs sm:text-sm text-charcoal-800 font-medium leading-relaxed">
            {currentTask.objective}
          </p>
        </div>

        {/* Why It Matters */}
        <div className="p-5 rounded-2xl bg-emeraldAccent-50/50 border border-emeraldAccent-200 shadow-subtle space-y-2">
          <span className="text-[10px] font-mono uppercase font-bold text-emeraldAccent-800">
            Why This Matters (Prerequisite Defense)
          </span>
          <p className="text-xs text-charcoal-700 leading-relaxed">
            {currentTask.whyItMatters}
          </p>
        </div>
      </div>

      {/* Instructions & Resources */}
      <div className="p-6 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-4">
        <h3 className="text-xs font-bold text-charcoal-900 uppercase tracking-wide flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-emeraldAccent-600" />
          <span>Execution Protocol & References</span>
        </h3>

        <div className="space-y-2">
          <span className="text-xs font-medium text-charcoal-700">Step-by-step deliverable path:</span>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-charcoal-600 pl-1">
            {currentTask.instructions.map((ins, i) => (
              <li key={i} className="leading-relaxed">
                {ins}
              </li>
            ))}
          </ol>
        </div>

        {currentTask.usefulResources && currentTask.usefulResources.length > 0 && (
          <div className="pt-3 border-t border-surface-100">
            <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wide block mb-2">
              Curated Reference Materials:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentTask.usefulResources.map((res, i) => (
                <div
                  key={i}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface-100 border border-surface-200 text-xs text-charcoal-800 font-medium"
                >
                  <span>{res.title}</span>
                  <ExternalLink className="w-3 h-3 text-charcoal-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Deliverable Submission Workbench */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono text-emeraldAccent-700 uppercase tracking-wider font-semibold">
              Evidence Submission
            </span>
            <h3 className="text-lg font-bold text-charcoal-900">
              Submit Your Deliverable for Gemma 4 Evaluation
            </h3>
            <p className="text-xs text-charcoal-500 font-mono mt-0.5">
              Target: <span className="text-charcoal-700 font-semibold">{currentTask.expectedDeliverable}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleInsertSampleSubmission}
            className="text-xs font-mono text-emeraldAccent-700 hover:text-emeraldAccent-800 underline underline-offset-4 self-start sm:self-auto"
          >
            Insert Sample Deliverable
          </button>
        </div>

        <form onSubmit={handleEvaluate} className="space-y-4">
          <div className="relative">
            <textarea
              rows={8}
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              placeholder="Paste executable code, test outputs, architectural reasoning, or reflection notes here..."
              className="w-full p-4 rounded-2xl border border-surface-300 bg-surface-50 text-charcoal-900 font-mono text-xs leading-relaxed placeholder-charcoal-400 focus:outline-none focus:border-emeraldAccent-500 focus:ring-2 focus:ring-emeraldAccent-200"
              required
            />
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-charcoal-400 bg-white/80 px-2 py-0.5 rounded border border-surface-200">
              {submissionText.length} chars
            </div>
          </div>

          {/* Completion Criteria Checklist */}
          <div className="p-4 rounded-xl bg-surface-100 border border-surface-200 space-y-2">
            <span className="text-[10px] font-mono uppercase text-charcoal-600 font-bold block">
              Gemma 4 Verification Rubric (Completion Criteria):
            </span>
            <ul className="space-y-1 text-xs text-charcoal-700">
              {currentTask.completionCriteria.map((c, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent-600 mt-1.5 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setCurrentView('roadmap')}
                className="px-4 py-2.5 rounded-xl border border-surface-300 text-charcoal-700 hover:bg-surface-100 text-xs font-medium transition-colors"
              >
                Back to Roadmap
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || submissionText.trim().length === 0}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-surface-50 text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] disabled:opacity-40"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating Evidence...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emeraldAccent-400" />
                  <span>Submit for Gemma 4 Evaluation</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Evaluation Results Modal */}
      {showEvaluationModal && evaluationResult && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEvaluationModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-surface-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated relative my-8 space-y-6 cursor-default"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-semibold ${
                      evaluationResult.passed
                        ? 'bg-emeraldAccent-100 text-emeraldAccent-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {evaluationResult.passed ? 'Rubric Satisfied' : 'Prerequisite Revision Recommended'}
                  </span>
                  <span className="text-xs font-mono text-charcoal-400">
                    Score: {evaluationResult.scorePercentage}%
                  </span>
                </div>
                <h3 className="editorial-title text-2xl font-normal text-charcoal-900">
                  Evidence Evaluation Report
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEvaluationModal(false)}
                className="p-2 rounded-full text-charcoal-400 hover:text-charcoal-800 hover:bg-surface-100 transition-colors"
                title="Close Report"
              >
                ✕
              </button>
            </div>

            {/* Qualitative Feedback */}
            <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 text-xs sm:text-sm text-charcoal-800 leading-relaxed font-sans">
              {evaluationResult.qualitativeFeedback}
            </div>

            {/* Strengths & Blindspots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-emeraldAccent-50/50 border border-emeraldAccent-200 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-emeraldAccent-800 font-bold block">
                  Demonstrated Competency:
                </span>
                <ul className="space-y-1 text-xs text-charcoal-700">
                  {evaluationResult.strengthsDemonstrated.map((s, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-emeraldAccent-600 font-bold">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-amber-800 font-bold block">
                  Identified Blindspots:
                </span>
                <ul className="space-y-1 text-xs text-charcoal-700">
                  {evaluationResult.blindSpotsIdentified.map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-amber-600 font-bold">⚠</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Adaptive Roadmap Shift Banner */}
            <div className="p-4 rounded-xl bg-charcoal-900 text-surface-50 space-y-1.5">
              <span className="text-[10px] font-mono uppercase font-bold text-emeraldAccent-400">
                Adaptive Roadmap Recalibration:
              </span>
              <p className="text-xs text-surface-200 font-mono">
                {evaluationResult.adaptiveRoadmapChanges.description}
              </p>
              <p className="text-[11px] text-charcoal-400">
                Action Rationale: {evaluationResult.actionRationale}
              </p>
            </div>

            {/* Modal Controls */}
            <div className="flex items-center justify-end space-x-3 pt-2 border-t border-surface-200">
              <button
                type="button"
                onClick={() => {
                  setShowEvaluationModal(false);
                  setCurrentView('roadmap');
                }}
                className="px-5 py-2.5 rounded-xl bg-emeraldAccent-600 hover:bg-emeraldAccent-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105"
              >
                Proceed to Updated Roadmap
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

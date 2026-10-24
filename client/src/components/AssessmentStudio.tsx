import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Code,
  ShieldAlert,
} from 'lucide-react';
import { QuestionSubmission } from '../types';

export const AssessmentStudio: React.FC = () => {
  const { baselineAssessment, submitAssessment, isLoading, error, setCurrentView } = useApp();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [submissions, setSubmissions] = useState<Record<string, QuestionSubmission>>({});

  if (!baselineAssessment || baselineAssessment.questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <p className="text-charcoal-600">No active diagnostic assessment found.</p>
        <button
          onClick={() => setCurrentView('onboarding')}
          className="px-4 py-2 bg-emeraldAccent-600 text-white rounded-lg text-sm font-semibold"
        >
          Start Diagnostic
        </button>
      </div>
    );
  }

  const q = baselineAssessment.questions[currentIdx];
  const total = baselineAssessment.questions.length;
  const currentSub = submissions[q.id] || {
    questionId: q.id,
    userAnswer: '',
    selectedOptionIndex: undefined,
    selfAssessedConfidence: 'medium' as const,
  };

  const handleSelectOption = (index: number, optionText: string) => {
    setSubmissions({
      ...submissions,
      [q.id]: {
        ...currentSub,
        selectedOptionIndex: index,
        userAnswer: optionText,
      },
    });
  };

  const handleConfidenceChange = (level: 'low' | 'medium' | 'high') => {
    setSubmissions({
      ...submissions,
      [q.id]: {
        ...currentSub,
        selfAssessedConfidence: level,
      },
    });
  };

  const isCurrentAnswered = currentSub.selectedOptionIndex !== undefined || currentSub.userAnswer.trim().length > 0;
  const allAnswered = baselineAssessment.questions.every(
    (item) => submissions[item.id]?.selectedOptionIndex !== undefined || (submissions[item.id]?.userAnswer && submissions[item.id].userAnswer.trim().length > 0)
  );

  const handleSubmitAll = async () => {
    const subsArray = baselineAssessment.questions.map((item) => submissions[item.id] || {
      questionId: item.id,
      userAnswer: '',
      selfAssessedConfidence: 'medium',
    });
    await submitAssessment(subsArray);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 space-y-6">
      {/* Progress & Category Banner */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-charcoal-500">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-surface-200 text-charcoal-800 font-semibold uppercase">
              Question {currentIdx + 1} of {total}
            </span>
            <span className="text-charcoal-400">•</span>
            <span className="capitalize text-emeraldAccent-700 font-medium">{q.category.replace('_', ' ')}</span>
          </div>
          <span className="text-[11px] bg-surface-100 px-2 py-0.5 rounded border border-surface-200">
            Prerequisite: {q.prerequisiteTested}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-emeraldAccent-600 h-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
          {error}
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white border border-surface-200 rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
        <div>
          <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wider block mb-1">
            Diagnostic Probe
          </span>
          <h2 className="text-lg sm:text-xl font-medium text-charcoal-900 leading-snug">
            {q.prompt}
          </h2>
        </div>

        {/* Optional Code Snippet */}
        {q.sampleCodeSnippet && (
          <div className="rounded-xl overflow-hidden border border-charcoal-800 bg-charcoal-950 text-surface-100 text-xs font-mono">
            <div className="bg-charcoal-900 px-3.5 py-1.5 border-b border-charcoal-800 text-charcoal-400 text-[11px] flex items-center justify-between">
              <span>Code Reference</span>
              <span className="text-[10px] text-charcoal-500">TypeScript / JS</span>
            </div>
            <pre className="p-4 overflow-x-auto whitespace-pre leading-relaxed">
              <code>{q.sampleCodeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Multiple Choice Options */}
        {q.options && q.options.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-charcoal-600 uppercase tracking-wide block">
              Select Your Answer:
            </span>
            {q.options.map((opt, oIdx) => {
              const isSelected = currentSub.selectedOptionIndex === oIdx;
              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelectOption(oIdx, opt)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start space-x-3 ${
                    isSelected
                      ? 'border-emeraldAccent-600 bg-emeraldAccent-50/70 text-charcoal-900 shadow-sm ring-1 ring-emeraldAccent-300'
                      : 'border-surface-200 bg-surface-50 hover:bg-surface-100 text-charcoal-800'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs font-semibold flex-shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-emeraldAccent-600 text-white'
                        : 'border border-surface-300 bg-white text-charcoal-600'
                    }`}
                  >
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="leading-relaxed flex-1">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Self-Assessed Confidence */}
        <div className="pt-4 border-t border-surface-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-charcoal-600">
            <span className="font-semibold text-charcoal-800">Your Confidence in This Answer:</span>
            <p className="text-[10px] text-charcoal-400">Used to calibrate uncertainty scores vs test results.</p>
          </div>
          <div className="flex items-center space-x-1.5">
            {[
              { level: 'low', label: 'Guessing / Low' },
              { level: 'medium', label: 'Reasonably Sure' },
              { level: 'high', label: '100% Certain' },
            ].map((btn) => (
              <button
                key={btn.level}
                type="button"
                onClick={() => handleConfidenceChange(btn.level as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  currentSub.selfAssessedConfidence === btn.level
                    ? 'bg-charcoal-900 text-white border-charcoal-900'
                    : 'bg-surface-50 border-surface-200 text-charcoal-700 hover:bg-surface-100'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          disabled={currentIdx === 0}
          onClick={() => setCurrentIdx(currentIdx - 1)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-surface-300 text-charcoal-700 hover:bg-surface-100 text-xs font-medium disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous Question</span>
        </button>

        {currentIdx < total - 1 ? (
          <button
            type="button"
            disabled={!isCurrentAnswered}
            onClick={() => setCurrentIdx(currentIdx + 1)}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-surface-50 text-xs font-semibold shadow-sm disabled:opacity-40 transition-all hover:scale-[1.02]"
          >
            <span>Next Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            disabled={!allAnswered || isLoading}
            onClick={handleSubmitAll}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-emeraldAccent-600 hover:bg-emeraldAccent-700 text-white text-xs font-semibold shadow-sm disabled:opacity-40 transition-all hover:scale-[1.02]"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing Skill Gaps...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Submit & Analyze Gaps</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Bottom Ethical Disclaimer */}
      <div className="p-3.5 rounded-xl bg-surface-100 border border-surface-200 text-charcoal-600 text-xs flex items-start space-x-2.5">
        <ShieldAlert className="w-4 h-4 text-emeraldAccent-700 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          {baselineAssessment.disclaimer}
        </p>
      </div>
    </div>
  );
};

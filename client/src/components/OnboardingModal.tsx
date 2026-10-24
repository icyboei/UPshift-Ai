import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  ArrowLeft,
  X,
  Target,
  Clock,
  Calendar,
  Sparkles,
  BookOpen,
  BrainCircuit,
} from 'lucide-react';
import { UserGoalContext } from '../types';

export const OnboardingModal: React.FC = () => {
  const { setCurrentView, startNewGoal, isLoading, error } = useApp();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [rawAmbition, setRawAmbition] = useState('I want to become a proficient Full-Stack Software Engineer who can design resilient production systems.');
  const [currentLevel, setCurrentLevel] = useState<'absolute_beginner' | 'early_learner' | 'intermediate' | 'advanced'>('early_learner');
  const [dailyHours, setDailyHours] = useState<number>(1.5);
  const [timeframeWeeks, setTimeframeWeeks] = useState<number>(12);
  const [constraints, setConstraints] = useState('Working full-time; available primarily on evenings and weekend mornings.');
  const [learningStyle, setLearningStyle] = useState<'hands_on_projects' | 'conceptual_first' | 'problem_solving_drills'>('hands_on_projects');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await startNewGoal(rawAmbition);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-surface-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated relative my-8">
        {/* Close Button */}
        <button
          onClick={() => setCurrentView('landing')}
          className="absolute top-5 right-5 p-2 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-surface-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Step Progress */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emeraldAccent-100 text-emeraldAccent-800 font-semibold">
              Step {step} of 3
            </span>
            <span className="text-xs font-mono text-charcoal-500">
              {step === 1 ? 'Define Your Ambition' : step === 2 ? 'Experience & Commitment' : 'Style & Constraints'}
            </span>
          </div>
          <h2 className="editorial-title text-2xl sm:text-3xl font-normal text-charcoal-900">
            {step === 1
              ? 'What do you want to master?'
              : step === 2
              ? 'Calibrate your schedule & current level'
              : 'Learning style & constraints'}
          </h2>
          <div className="w-full bg-surface-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emeraldAccent-600 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: Ambition */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1.5 uppercase tracking-wide">
                  Your Raw Ambition or Goal
                </label>
                <textarea
                  rows={4}
                  value={rawAmbition}
                  onChange={(e) => setRawAmbition(e.target.value)}
                  placeholder="e.g. I want to build production-grade web applications, master backend concurrency, and deploy full-stack systems..."
                  className="w-full p-3.5 rounded-xl border border-surface-300 bg-surface-50 text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-emeraldAccent-500 focus:ring-2 focus:ring-emeraldAccent-200 text-sm font-sans"
                  required
                />
                <p className="text-[11px] text-charcoal-500 mt-1">
                  Be as candid or specific as possible. Gemma 4 will isolate your core discipline and identify its prerequisite dependencies.
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="pt-2">
                <span className="text-xs font-medium text-charcoal-600 block mb-2">Or select a starting track:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: 'Full-Stack Software Engineering', ambition: 'Master Full-Stack Software Engineering with resilient APIs and production deployments.' },
                    { label: 'Applied AI & ML Systems', ambition: 'Master Machine Learning pipelines, model evaluation, and deployment.' },
                    { label: 'Distributed Backend Systems', ambition: 'Master Distributed Systems, concurrent architecture, and low-latency storage engines.' },
                    { label: 'Computer Science Fundamentals', ambition: 'Excel in core algorithms, memory hierarchy, and formal system design.' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRawAmbition(preset.ambition)}
                      className="p-2.5 rounded-lg border border-surface-200 bg-surface-50 hover:bg-surface-100 text-left text-xs font-medium text-charcoal-800 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Current Level & Time Commitment */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-2 uppercase tracking-wide">
                  Self-Reported Baseline Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'absolute_beginner', label: 'Beginner', desc: 'No prior background' },
                    { key: 'early_learner', label: 'Early Learner', desc: 'Know syntax basics' },
                    { key: 'intermediate', label: 'Intermediate', desc: 'Built simple projects' },
                    { key: 'advanced', label: 'Advanced', desc: 'Seeking mastery' },
                  ].map((lvl) => (
                    <button
                      key={lvl.key}
                      type="button"
                      onClick={() => setCurrentLevel(lvl.key as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        currentLevel === lvl.key
                          ? 'border-emeraldAccent-600 bg-emeraldAccent-50/60 ring-2 ring-emeraldAccent-200'
                          : 'border-surface-200 bg-white hover:bg-surface-50'
                      }`}
                    >
                      <div className="font-semibold text-xs text-charcoal-900">{lvl.label}</div>
                      <div className="text-[10px] text-charcoal-500 mt-0.5">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1.5 uppercase tracking-wide flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Daily Time Available: {dailyHours}h</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.5"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(parseFloat(e.target.value))}
                    className="w-full accent-emeraldAccent-600"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-charcoal-400 mt-1">
                    <span>30m/day</span>
                    <span>1.5h/day</span>
                    <span>4h/day</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1.5 uppercase tracking-wide flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Target Timeframe: {timeframeWeeks} Weeks</span>
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    step="2"
                    value={timeframeWeeks}
                    onChange={(e) => setTimeframeWeeks(parseInt(e.target.value, 10))}
                    className="w-full accent-emeraldAccent-600"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-charcoal-400 mt-1">
                    <span>4 wks</span>
                    <span>12 wks</span>
                    <span>24 wks</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Learning Style & Constraints */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-2 uppercase tracking-wide">
                  Preferred Learning Modality
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { key: 'hands_on_projects', title: 'Hands-on Projects', desc: 'Build concrete, deployable artifacts' },
                    { key: 'conceptual_first', title: 'First Principles', desc: 'Deep theory & mental models before code' },
                    { key: 'problem_solving_drills', title: 'Practical Drills', desc: 'Debugging & timed exercise sprints' },
                  ].map((style) => (
                    <button
                      key={style.key}
                      type="button"
                      onClick={() => setLearningStyle(style.key as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        learningStyle === style.key
                          ? 'border-emeraldAccent-600 bg-emeraldAccent-50/60 ring-2 ring-emeraldAccent-200'
                          : 'border-surface-200 bg-white hover:bg-surface-50'
                      }`}
                    >
                      <div className="font-semibold text-xs text-charcoal-900">{style.title}</div>
                      <div className="text-[10px] text-charcoal-500 mt-0.5">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1.5 uppercase tracking-wide">
                  Schedule Constraints or Context (Optional)
                </label>
                <input
                  type="text"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="e.g. Taking evening classes; prefers weekend mornings; preparing for interview in 3 months"
                  className="w-full p-3 rounded-xl border border-surface-300 bg-surface-50 text-charcoal-900 text-xs font-sans focus:outline-none focus:border-emeraldAccent-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-surface-100 border border-surface-200 text-xs text-charcoal-700 space-y-1">
                <div className="font-semibold text-charcoal-900 flex items-center space-x-1">
                  <BrainCircuit className="w-3.5 h-3.5 text-emeraldAccent-600" />
                  <span>Next: Baseline Diagnostic Assessment</span>
                </div>
                <p className="text-[11px] text-charcoal-500">
                  Gemma 4 will generate 3 targeted diagnostic questions tailored to your goal. This isolates what you demonstrably know from what needs prerequisite reinforcement.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-surface-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-surface-300 text-charcoal-700 hover:bg-surface-100 text-xs font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-surface-50 text-xs font-semibold shadow-sm transition-all hover:scale-[1.02]"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-emeraldAccent-600 hover:bg-emeraldAccent-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Diagnostic...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Diagnostic Assessment</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

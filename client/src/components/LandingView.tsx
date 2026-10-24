import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  Activity,
  Target,
  ShieldCheck,
  BrainCircuit,
  Compass,
  Zap,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setCurrentView, startNewGoal, loadSeedDemo, isLoading } = useApp();
  const [inputGoal, setInputGoal] = useState('');
  const [interpretedPreview, setInterpretedPreview] = useState<{
    target: string;
    prereqs: string[];
    timeframe: string;
  } | null>(null);

  const sampleGoals = [
    'I want to become good at full-stack software engineering.',
    'Master machine learning pipelines and model evaluation.',
    'Build reliable distributed backend systems with Go.',
    'Excel in computer science algorithms and system design.',
  ];

  const handleQuickClarify = (text: string) => {
    setInputGoal(text);
    if (text.toLowerCase().includes('machine') || text.toLowerCase().includes('ml')) {
      setInterpretedPreview({
        target: 'Applied Machine Learning & Data Systems',
        prereqs: ['Linear algebra matrix transformations', 'Python vectorization (NumPy/Pandas)', 'Train/Test split leak prevention'],
        timeframe: '14 Weeks (60 min/day)',
      });
    } else if (text.toLowerCase().includes('backend') || text.toLowerCase().includes('distributed')) {
      setInterpretedPreview({
        target: 'Backend Systems & Distributed Architecture',
        prereqs: ['Memory hierarchy & pointer semantics', 'Idempotent HTTP API protocols', 'Atomic transactions & locking'],
        timeframe: '16 Weeks (75 min/day)',
      });
    } else {
      setInterpretedPreview({
        target: 'Production-Grade Full-Stack Software Engineering',
        prereqs: ['Event loop & microtask drain order', 'Shallow vs deep reference equality', 'Idempotent transactional APIs'],
        timeframe: '12 Weeks (60 min/day)',
      });
    }
  };

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    const goal = inputGoal.trim() || 'Master full-stack software engineering with verified production deliverables';
    await startNewGoal(goal);
  };

  return (
    <div className="space-y-24 py-8 md:py-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-surface-100 border border-surface-300 text-xs font-mono text-charcoal-700">
          <span className="w-2 h-2 rounded-full bg-emeraldAccent-500 animate-pulse" />
          <span>EVIDENCE-DRIVEN PERSONAL DEVELOPMENT PLATFORM</span>
        </div>

        <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-charcoal-900 tracking-tight leading-[1.08]">
          Turn ambitious goals into <span className="italic font-display text-emeraldAccent-700">measurable</span>, sustainable improvement.
        </h1>

        <p className="text-lg md:text-xl text-charcoal-600 max-w-2xl mx-auto font-sans leading-relaxed">
          Never give a user an advanced plan when they have not mastered its prerequisites.
          Never confuse activity with improvement. Never present an estimate as a measured fact.
        </p>

        {/* Interactive Goal Form */}
        <div className="max-w-2xl mx-auto pt-4">
          <form
            onSubmit={handleStart}
            className="p-2 sm:p-2.5 rounded-2xl bg-white border border-surface-300 shadow-elevated focus-within:border-emeraldAccent-500 focus-within:ring-2 focus-within:ring-emeraldAccent-200 transition-all"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={inputGoal}
                onChange={(e) => {
                  setInputGoal(e.target.value);
                  if (e.target.value.length > 5) handleQuickClarify(e.target.value);
                }}
                placeholder="What ambition do you want to master? (e.g., Full-Stack, AI, Systems...)"
                className="flex-1 px-4 py-3 text-sm sm:text-base text-charcoal-900 placeholder-charcoal-400 bg-transparent border-0 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-surface-50 text-sm font-semibold shadow-sm transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-surface-50 border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Start Diagnostic</span>
                    <ArrowRight className="w-4 h-4 text-emeraldAccent-400" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Inspiration Prompts */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 pt-2 text-xs text-charcoal-500">
            <span className="font-mono text-[11px] text-charcoal-400">TRY:</span>
            {sampleGoals.map((g, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickClarify(g)}
                className="px-2.5 py-1 rounded-md bg-surface-100 hover:bg-surface-200 text-charcoal-700 border border-surface-200 transition-colors"
              >
                {g.slice(0, 32)}...
              </button>
            ))}
          </div>

          {/* Real-time Gemma Goal Clarifier Preview Card */}
          {interpretedPreview && (
            <div className="mt-6 p-4 rounded-xl bg-surface-50 border border-emeraldAccent-200 text-left space-y-2 animate-fadeIn shadow-subtle">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emeraldAccent-700 font-semibold flex items-center space-x-1">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>Gemma 4 Real-Time Goal Decomposition</span>
                </span>
                <span className="text-xs font-mono text-charcoal-500">{interpretedPreview.timeframe}</span>
              </div>
              <h4 className="font-semibold text-charcoal-900 text-sm">
                Targeted Discipline: {interpretedPreview.target}
              </h4>
              <div className="text-xs text-charcoal-600 space-y-1">
                <span className="font-medium text-charcoal-700">Verified Prerequisites to Test:</span>
                <ul className="list-disc list-inside space-y-0.5 text-charcoal-600 pl-1">
                  {interpretedPreview.prereqs.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Quick Demo Button */}
        <div className="pt-2">
          <button
            onClick={loadSeedDemo}
            className="inline-flex items-center space-x-2 text-xs font-mono font-medium text-charcoal-600 hover:text-charcoal-900 underline underline-offset-4 decoration-surface-300 hover:decoration-emeraldAccent-500 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-emeraldAccent-600" />
            <span>Or explore instant pre-seeded production journey with complete diagnostic & roadmap</span>
          </button>
        </div>
      </section>

      {/* 2. THE 7-STAGE CONTINUOUS IMPROVEMENT CYCLE */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emeraldAccent-700">
            THE ENGINE ARCHITECTURE
          </span>
          <h2 className="editorial-title text-3xl sm:text-4xl font-normal text-charcoal-900">
            The Continuous Improvement Cycle
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 max-w-xl mx-auto">
            Gemma 4 guides every learner through seven questions that bridge vague intent into verified ability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              num: '01',
              stage: 'Assess',
              question: 'Where am I right now?',
              desc: 'High-signal diagnostic tests differentiate real comprehension from superficial syntax memory.',
              tag: 'Prerequisite Isolation',
            },
            {
              num: '02',
              stage: 'Analyze',
              question: 'What can I demonstrably do?',
              desc: 'Separates verified test performance from self-reported estimates with transparent confidence bars.',
              tag: 'Evidence vs Claim',
            },
            {
              num: '03',
              stage: 'Strategize',
              question: 'What is preventing me from reaching my goal?',
              desc: 'Generates dependency-aware roadmaps where advanced topics unlock only when fundamentals are solid.',
              tag: 'Dependency Graphs',
            },
            {
              num: '04',
              stage: 'Execute',
              question: 'What should I do today?',
              desc: 'A focused daily action workspace with specific deliverables, timing, criteria, and official references.',
              tag: 'Single Focus Mode',
            },
            {
              num: '05',
              stage: 'Evaluate',
              question: 'Is my ability actually improving?',
              desc: 'Objective rubric scoring evaluates submissions against deliverables instead of vanity activity counts.',
              tag: 'Rubric Scoring',
            },
            {
              num: '06',
              stage: 'Adapt',
              question: 'Should the strategy pivot?',
              desc: 'Automatically adjusts the roadmap: injects prerequisite refreshers or unlocks advanced challenges.',
              tag: 'Dynamic Adaptation',
            },
            {
              num: '07',
              stage: 'Maintain',
              question: 'How do I retain progress over time?',
              desc: 'Spaced repetition models retention decay and offers non-shaming catch-up plans for missed days.',
              tag: 'Spaced Retention',
            },
            {
              num: '08',
              stage: 'Verify',
              question: 'Can this evidence be audited?',
              desc: 'All milestones, scores, and code artifacts can be exported as reproducible JSON audit records.',
              tag: 'Audit Integrity',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white border border-surface-200 shadow-subtle hover:border-surface-300 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-charcoal-400 font-bold">{card.num}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-100 text-charcoal-700 border border-surface-200">
                    {card.tag}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-charcoal-900 leading-snug">
                  {card.stage}: <span className="italic font-normal">{card.question}</span>
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE PRINCIPLE COMPARISON: GENERIC AI VS UPSHIFT AI */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 sm:p-10 rounded-3xl bg-charcoal-900 text-surface-50 border border-charcoal-800 space-y-8 shadow-elevated">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-emeraldAccent-400 uppercase tracking-widest font-semibold">
              EVIDENCE OVER SPECULATION
            </span>
            <h3 className="editorial-title text-3xl sm:text-4xl font-normal leading-tight">
              The Architecture of Real Improvement
            </h3>
            <p className="text-sm text-charcoal-400">
              Why generic chatbots and conventional course platforms fail learners, and how UPSHIFT AI fixes it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* The Old Way */}
            <div className="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-700/80 space-y-4">
              <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Generic AI Chatbot / Course Checklist</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-charcoal-300">
                <li className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Assigns advanced full-stack projects before verifying basic asynchronous event loop comprehension.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Confuses "hours spent clicking videos" with verified problem-solving ability.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Invents unverified estimates of user IQ, personality, or readiness without diagnostic evidence.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Piles on shame and impossible backlogs after 3 days of missed practice.</span>
                </li>
              </ul>
            </div>

            {/* The UPSHIFT AI Way */}
            <div className="p-6 rounded-2xl bg-charcoal-800 border border-emeraldAccent-500/40 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emeraldAccent-500/10 rounded-full blur-2xl" />
              <div className="flex items-center space-x-2 text-emeraldAccent-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>UPSHIFT AI with Gemma 4 Reasoning</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-surface-100">
                <li className="flex items-start space-x-2">
                  <span className="text-emeraldAccent-400 font-bold">✓</span>
                  <span>Strict dependency checks: missing prerequisites are detected early and refreshed before advancing.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emeraldAccent-400 font-bold">✓</span>
                  <span>Submissions are audited against tangible deliverables (code snippets, architecture decisions, tests).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emeraldAccent-400 font-bold">✓</span>
                  <span>Clearly separates tested evidence from self-reported claims and unverified estimates.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emeraldAccent-400 font-bold">✓</span>
                  <span>Ebbinghaus retention decay tracking with zero-guilt, non-shaming schedule recovery.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION FOOTER */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <h3 className="editorial-title text-3xl font-normal text-charcoal-900">
          Ready to diagnose your starting point?
        </h3>
        <p className="text-charcoal-600 text-sm max-w-lg mx-auto">
          Take a 10-minute diagnostic baseline assessment to uncover your true prerequisite readiness and generate a custom roadmap.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setCurrentView('onboarding')}
            className="px-6 py-3 rounded-xl bg-emeraldAccent-600 hover:bg-emeraldAccent-700 text-white font-semibold text-sm shadow-sm transition-all hover:scale-105"
          >
            Start Personalized Onboarding
          </button>
          <button
            onClick={loadSeedDemo}
            className="px-5 py-3 rounded-xl bg-surface-100 hover:bg-surface-200 text-charcoal-800 font-medium text-sm border border-surface-300 transition-colors"
          >
            Load Production Demo Profile
          </button>
        </div>
      </section>
    </div>
  );
};

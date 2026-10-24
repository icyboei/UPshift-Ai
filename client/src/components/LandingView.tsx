import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const LandingView: React.FC = () => {
  const { startNewGoal, loadSeedDemo, isLoading, setCurrentView } = useApp();
  const [targetAmbition, setTargetAmbition] = useState('Full-Stack Web Developer');

  const presets = [
    { title: 'Full-Stack Web Dev', role: 'Full-Stack Software Engineer', icon: 'code', time: '12 WEEKS // 1.5 HRS/DAY' },
    { title: 'Cloud & DevOps', role: 'Cloud Platform & Infrastructure Engineer', icon: 'cloud', time: '14 WEEKS // 2 HRS/DAY' },
    { title: 'Machine Learning', role: 'Applied Machine Learning Engineer', icon: 'psychology', time: '16 WEEKS // 2 HRS/DAY' },
    { title: 'Mobile Engineering', role: 'Cross-Platform Mobile Engineer', icon: 'smartphone', time: '10 WEEKS // 1 HR/DAY' },
  ];

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAmbition.trim()) return;
    await startNewGoal(targetAmbition);
  };

  return (
    <div className="flex flex-col w-full pb-space-xl animate-fadeIn max-w-6xl mx-auto">
      {/* Hero Headline Unit */}
      <section className="bg-surface-container-lowest border-[3px] border-black shadow-[8px_8px_0px_#000000] p-space-lg lg:p-space-xl mb-space-xl relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="relative z-10 flex flex-col gap-space-md">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="px-space-sm py-0.5 bg-primary-container text-on-primary-container font-label-mono text-label-mono uppercase font-bold border-[2px] border-black">
              UPSHIFT AI // PERSONAL GROWTH OPERATING SYSTEM
            </span>
            <span className="px-space-sm py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono uppercase font-bold border-[2px] border-black">
              EVIDENCE-DRIVEN &bull; ADAPTIVE &bull; PREREQUISITE-AWARE
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg lg:font-display lg:text-display uppercase tracking-tight text-on-surface font-black m-0 leading-tight">
            TURN AMBITION INTO A MEASURABLE, ADAPTIVE GROWTH STRATEGY.
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed m-0 font-medium">
            Understand your true baseline, discover critical prerequisite gaps before they block your progress, and follow an AI-crafted growth roadmap that recalibrates whenever you submit real evidence of learning.
          </p>

          {/* Quick Start Form */}
          <form onSubmit={handleStart} className="mt-space-sm flex flex-col sm:flex-row items-stretch gap-space-sm max-w-3xl">
            <div className="flex-1 relative">
              <input
                type="text"
                value={targetAmbition}
                onChange={(e) => setTargetAmbition(e.target.value)}
                placeholder="What skill or role do you want to master? (e.g. Full-Stack Web Developer)"
                className="w-full bg-surface-container-lowest border-[3px] border-black p-space-md font-label-code text-label-code text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:shadow-[4px_4px_0px_#60a5fa] transition-shadow"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-space-xl py-space-md bg-primary-container hover:bg-primary hover:text-on-primary text-on-primary-container font-title text-title uppercase font-black border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all whitespace-nowrap shrink-0"
            >
              {isLoading ? 'CALIBRATING...' : 'BUILD MY GROWTH ROADMAP ?'}
            </button>
          </form>

          {/* Alternative Demo Launcher */}
          <div className="flex flex-wrap items-center gap-space-md pt-space-xs text-on-surface-variant font-label-mono text-label-mono">
            <span>OR EXPLORE PRE-CONFIGURED JOURNEY:</span>
            <button
              type="button"
              onClick={loadSeedDemo}
              className="underline font-bold text-primary uppercase hover:text-primary-container transition-colors"
            >
              [LOAD FULL-STACK STUDENT DEMO]
            </button>
          </div>
        </div>
      </section>

      {/* Core 5-Stage Journey Explanation */}
      <section className="mb-space-xl">
        <div className="flex items-center gap-space-xs mb-space-md">
          <span className="w-3.5 h-3.5 bg-primary border-[2px] border-black"></span>
          <h2 className="font-headline-sm text-headline-sm uppercase tracking-wide text-on-surface font-black m-0">
            THE 5-STAGE GROWTH LOOP: HOW UPSHIFT AI WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-space-md">
          {[
            { step: '01', title: 'ASSESS', desc: 'Define your target skill, current level, weekly hours, and real constraints.' },
            { step: '02', title: 'DIAGNOSE', desc: 'Identify foundational strengths, critical prerequisite gaps, and uncertainties.' },
            { step: '03', title: 'PLAN', desc: 'Receive an ordered roadmap with clear dependencies, time estimates, and rubrics.' },
            { step: '04', title: 'EXECUTE', desc: 'Complete daily actionable deliverables using the focus timer and rubric submission.' },
            { step: '05', title: 'ADAPT', desc: 'The AI recalculates your pace, unlocks dependencies, and adjusts milestones based on proof.' },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-surface-container-lowest border-[3px] border-black p-space-md shadow-[4px_4px_0px_#000000] flex flex-col justify-between"
            >
              <div>
                <span className="font-label-mono text-label-mono font-bold text-primary block mb-space-xs">
                  STAGE // {s.step}
                </span>
                <h3 className="font-title text-title uppercase font-black text-on-surface mb-space-xs">
                  {s.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant m-0 leading-snug">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Learning Ambitions Grid */}
      <section className="mb-space-xl">
        <div className="flex items-center justify-between gap-space-sm mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="w-3.5 h-3.5 bg-secondary border-[2px] border-black"></span>
            <h2 className="font-headline-sm text-headline-sm uppercase tracking-wide text-on-surface font-black m-0">
              POPULAR LEARNER TRAJECTORIES
            </h2>
          </div>
          <span className="font-label-mono text-label-mono uppercase text-on-surface-variant font-bold">
            CLICK TO INITIALIZE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {presets.map((p) => (
            <div
              key={p.title}
              onClick={() => {
                setTargetAmbition(p.role);
                startNewGoal(p.role);
              }}
              className="bg-surface-container-lowest hover:bg-surface-container border-[3px] border-black p-space-md shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="material-symbols-outlined text-[28px] text-primary">{p.icon}</span>
                  <span className="font-label-mono text-[10px] uppercase px-1.5 py-0.5 bg-surface-container-high border border-black font-bold">
                    RECOMMENDED
                  </span>
                </div>
                <h3 className="font-title text-title uppercase font-black text-on-surface mb-space-xs">
                  {p.title}
                </h3>
                <p className="font-label-mono text-[11px] text-on-surface-variant font-bold uppercase">
                  {p.time}
                </p>
              </div>
              <div className="pt-space-sm mt-space-sm border-t-[2px] border-black flex items-center justify-between text-primary font-title text-sm font-bold uppercase">
                <span>START PATH</span>
                <span>?</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

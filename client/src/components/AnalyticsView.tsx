import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const {
    roadmap,
    goalContext,
    setCurrentView,
    exportStateJson,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'week' | 'all'>('week');
  const [isAdapted, setIsAdapted] = useState(false);
  const [snapshotSaved, setSnapshotSaved] = useState(false);

  const handleSyncStrategy = () => {
    setIsAdapted(true);
    setTimeout(() => setIsAdapted(false), 800);
  };

  const handleSnapshot = () => {
    setSnapshotSaved(true);
    setTimeout(() => setSnapshotSaved(false), 1200);
  };

  return (
    <div className="flex flex-col w-full pb-space-xl animate-fadeIn">
      {/* Top Control & Status Band */}
      <div className="w-full bg-surface-container-lowest border-[3px] border-[#000000] shadow-[8px_8px_0px_#000000] p-space-lg mb-space-xl relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgb(0, 0, 0) 1.5px, transparent 1.5px)',
            backgroundSize: '14px 14px',
          }}
        />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 bg-secondary text-on-secondary font-label-mono text-label-mono uppercase tracking-wider border-[2px] border-[#000000]">
                <span className="w-2 h-2 bg-background animate-pulse"></span>
                ADAPTIVE EVIDENCE STREAM // REALTIME
              </span>
              <span className="px-space-sm py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono uppercase border-[2px] border-[#000000] font-bold">
                TARGET: {(goalContext?.targetSkill || goalContext?.clarifiedGoal || 'DISTRIBUTED SYSTEMS').toUpperCase()}
              </span>
              <span className="px-space-sm py-0.5 bg-surface-container-high text-on-surface font-label-mono text-label-mono uppercase border-[2px] border-[#000000]">
                LEARNER ID: USR_0X889F
              </span>
            </div>

            <h1 className="font-display text-display uppercase tracking-tight text-on-surface leading-none mt-space-xs">
              EVIDENCE OF YOUR GROWTH
            </h1>
            <p className="font-label-code text-label-code uppercase tracking-wider text-on-surface-variant">
              Turn ambition into measurable progress — Track prerequisites, daily actions, and verified mastery powered by Gemma 4.
            </p>
          </div>

          <div className="flex items-center gap-space-md flex-wrap">
            <div className="hidden sm:flex flex-col items-end border-[2px] border-[#000000] bg-surface-container-low px-space-md py-space-xs shadow-[3px_3px_0px_#000000]">
              <span className="font-label-mono text-label-mono uppercase text-on-surface-variant font-bold">
                SKILL RETENTION RATE
              </span>
              <span className="font-headline-sm text-headline-sm uppercase text-tertiary font-bold">
                98.4%
              </span>
            </div>

            <div className="flex items-center gap-space-sm">
              <button
                onClick={() => setCurrentView('assessment')}
                className="group flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-lowest text-on-surface font-title text-title uppercase tracking-wide border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  assignment_turned_in
                </span>
                <span>START ASSESSMENT</span>
              </button>

              <button
                onClick={handleSyncStrategy}
                className={`group flex items-center gap-space-xs px-space-md py-space-sm text-on-primary-container font-title text-title uppercase tracking-wide border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${
                  isAdapted ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary-container'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-500 ${
                    isAdapted ? 'rotate-180' : ''
                  }`}
                >
                  auto_fix_high
                </span>
                <span>{isAdapted ? 'CALIBRATED!' : 'ADAPT STRATEGY'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid 12-Column Shell */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-xl">
        {/* LEFT WIDE COLUMN (7/12 ~ 58%) */}
        <div className="xl:col-span-7 flex flex-col gap-space-xl">
          {/* WIDGET A: WEEKLY EFFORT (HOURS & EVIDENCE) */}
          <section className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[8px_8px_0px_#000000] flex flex-col">
            <div className="flex items-center justify-between px-space-lg py-space-md bg-surface-container-low border-b-[3px] border-[#000000]">
              <div className="flex items-center gap-space-sm">
                <div className="w-3.5 h-3.5 bg-secondary border-[2px] border-[#000000]"></div>
                <h2 className="font-headline-sm text-headline-sm uppercase tracking-wide text-on-surface font-bold">
                  WEEKLY LEARNING EFFORT (HOURS & EVIDENCE)
                </h2>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="px-space-sm py-0.5 bg-tertiary-container text-on-tertiary-container font-label-mono text-label-mono font-bold uppercase border-[2px] border-[#000000]">
                  +28.4% VS LAST WEEK
                </span>
                <span className="px-space-sm py-0.5 bg-surface-container-highest text-on-surface font-label-mono text-label-mono uppercase border-[2px] border-[#000000]">
                  PEAK: THURSDAY (4.2 HRS)
                </span>
              </div>
            </div>

            <div className="p-space-lg relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
                  backgroundSize: '16px 16px',
                }}
              />

              <div className="relative z-10">
                {/* Bar Graph */}
                <div className="flex items-end justify-between h-56 w-full pt-6 pb-2 px-space-md border-b-[3px] border-[#000000]">
                  {/* Monday */}
                  <div className="group flex flex-col items-center gap-space-xs w-14 sm:w-16 h-full justify-end cursor-pointer">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 bg-on-surface text-surface-container-lowest font-label-mono text-label-mono whitespace-nowrap border-[1px] border-[#000000] shadow-[2px_2px_0px_#000000] -mb-1">
                      2.5 HRS
                    </div>
                    <div
                      className="w-full bg-secondary-container border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] group-hover:shadow-[2px_2px_0px_#000000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all relative overflow-hidden"
                      style={{ height: '45%' }}
                    >
                      <div className="absolute inset-0 bg-secondary opacity-30 [background:repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_8px)]" />
                    </div>
                    <span className="font-label-mono text-label-mono font-bold text-on-surface uppercase mt-space-xs">
                      MON
                    </span>
                  </div>

                  {/* Tuesday */}
                  <div className="group flex flex-col items-center gap-space-xs w-14 sm:w-16 h-full justify-end cursor-pointer">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 bg-on-surface text-surface-container-lowest font-label-mono text-label-mono whitespace-nowrap border-[1px] border-[#000000] shadow-[2px_2px_0px_#000000] -mb-1">
                      3.8 HRS
                    </div>
                    <div
                      className="w-full bg-primary-container border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] group-hover:shadow-[2px_2px_0px_#000000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all relative overflow-hidden"
                      style={{ height: '68%' }}
                    >
                      <div className="absolute inset-0 bg-primary opacity-20 [background:repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_8px)]" />
                    </div>
                    <span className="font-label-mono text-label-mono font-bold text-on-surface uppercase mt-space-xs">
                      TUE
                    </span>
                  </div>

                  {/* Wednesday */}
                  <div className="group flex flex-col items-center gap-space-xs w-14 sm:w-16 h-full justify-end cursor-pointer">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 bg-on-surface text-surface-container-lowest font-label-mono text-label-mono whitespace-nowrap border-[1px] border-[#000000] shadow-[2px_2px_0px_#000000] -mb-1">
                      1.8 HRS
                    </div>
                    <div
                      className="w-full bg-tertiary-fixed-dim border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] group-hover:shadow-[2px_2px_0px_#000000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all relative overflow-hidden"
                      style={{ height: '32%' }}
                    >
                      <div className="absolute inset-0 bg-tertiary opacity-25 [background:repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_8px)]" />
                    </div>
                    <span className="font-label-mono text-label-mono font-bold text-on-surface uppercase mt-space-xs">
                      WED
                    </span>
                  </div>

                  {/* Thursday (Peak) */}
                  <div className="group flex flex-col items-center gap-space-xs w-14 sm:w-16 h-full justify-end cursor-pointer">
                    <div className="opacity-100 px-1.5 py-0.5 bg-on-surface text-surface-container-lowest font-label-mono text-label-mono whitespace-nowrap border-[1px] border-[#000000] shadow-[2px_2px_0px_#000000] -mb-1 font-bold">
                      4.2 HRS PEAK
                    </div>
                    <div
                      className="w-full bg-[#fde047] border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] group-hover:shadow-[2px_2px_0px_#000000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all relative overflow-hidden"
                      style={{ height: '85%' }}
                    >
                      <div className="absolute inset-0 [background:repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_6px)] opacity-20" />
                    </div>
                    <span className="font-label-mono text-label-mono font-bold text-on-surface uppercase mt-space-xs">
                      THU
                    </span>
                  </div>

                  {/* Friday */}
                  <div className="group flex flex-col items-center gap-space-xs w-14 sm:w-16 h-full justify-end cursor-pointer">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 bg-on-surface text-surface-container-lowest font-label-mono text-label-mono whitespace-nowrap border-[1px] border-[#000000] shadow-[2px_2px_0px_#000000] -mb-1">
                      3.2 HRS
                    </div>
                    <div
                      className="w-full bg-[#c084fc] border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] group-hover:shadow-[2px_2px_0px_#000000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all relative overflow-hidden"
                      style={{ height: '60%' }}
                    >
                      <div className="absolute inset-0 [background:repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_6px)] opacity-20" />
                    </div>
                    <span className="font-label-mono text-label-mono font-bold text-on-surface uppercase mt-space-xs">
                      FRI
                    </span>
                  </div>
                </div>

                {/* 4 KPI Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pt-space-md">
                  <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant block font-bold">
                      TOTAL FOCUS
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                      18.5 HRS
                    </span>
                  </div>

                  <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant block font-bold">
                      AVG DAILY TIME
                    </span>
                    <span className="font-headline-sm text-headline-sm text-tertiary font-extrabold">
                      3.7 HRS
                    </span>
                  </div>

                  <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant block font-bold">
                      EVIDENCE SUBMISSIONS
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                      12
                    </span>
                  </div>

                  <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant block font-bold">
                      REVISION ACCURACY
                    </span>
                    <span className="font-headline-sm text-headline-sm text-secondary font-extrabold">
                      94.2%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WIDGET B: SKILL DIMENSIONS (RADAR CHART) */}
          <section className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[8px_8px_0px_#000000] flex flex-col">
            <div className="flex items-center justify-between px-space-lg py-space-md bg-surface-container-low border-b-[3px] border-[#000000]">
              <div className="flex items-center gap-space-sm">
                <div className="w-3.5 h-3.5 bg-tertiary border-[2px] border-[#000000]"></div>
                <h2 className="font-headline-sm text-headline-sm uppercase tracking-wide text-on-surface font-bold">
                  SKILL DIMENSIONS
                </h2>
              </div>
              <span className="px-space-sm py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono font-bold uppercase border-[2px] border-[#000000] flex items-center gap-1 shadow-[2px_2px_0px_#000000]">
                <span className="w-2 h-2 bg-tertiary"></span>
                ALL PREREQUISITES MET
              </span>
            </div>

            <div className="p-space-lg grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
              {/* Radar Chart SVG */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-space-sm bg-surface-container-low border-[2px] border-[#000000] relative">
                <div className="w-full max-w-[280px] aspect-square relative flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 300">
                    <polygon
                      fill="none"
                      opacity="0.4"
                      points="150,30 264,113 220,247 80,247 36,113"
                      stroke="#000000"
                      strokeDasharray="3,3"
                      strokeWidth="1.5"
                    />
                    <polygon
                      fill="none"
                      opacity="0.4"
                      points="150,60 235,122 203,222 97,222 65,122"
                      stroke="#000000"
                      strokeDasharray="3,3"
                      strokeWidth="1.5"
                    />
                    <polygon
                      fill="none"
                      opacity="0.4"
                      points="150,90 207,131 185,198 115,198 93,131"
                      stroke="#000000"
                      strokeDasharray="3,3"
                      strokeWidth="1.5"
                    />
                    <line stroke="#000000" strokeWidth="2" x1="150" x2="150" y1="150" y2="30" />
                    <line stroke="#000000" strokeWidth="2" x1="150" x2="264" y1="150" y2="113" />
                    <line stroke="#000000" strokeWidth="2" x1="150" x2="220" y1="150" y2="247" />
                    <line stroke="#000000" strokeWidth="2" x1="150" x2="80" y1="150" y2="247" />
                    <line stroke="#000000" strokeWidth="2" x1="150" x2="36" y1="150" y2="113" />
                    {/* Data Polygon */}
                    <polygon
                      fill="#60a5fa"
                      fillOpacity="0.45"
                      points="150,48 258,115 202,223 104,213 59,120"
                      stroke="#000000"
                      strokeWidth="3"
                    />
                    {/* Points */}
                    <rect fill="#0060ac" height="8" stroke="#000000" strokeWidth="2" width="8" x="146" y="44" />
                    <rect fill="#0eba61" height="8" stroke="#000000" strokeWidth="2" width="8" x="254" y="111" />
                    <rect fill="#fe7676" height="8" stroke="#000000" strokeWidth="2" width="8" x="198" y="219" />
                    <rect fill="#fde047" height="8" stroke="#000000" strokeWidth="2" width="8" x="100" y="209" />
                    <rect fill="#c084fc" height="8" stroke="#000000" strokeWidth="2" width="8" x="55" y="116" />
                    {/* Axis Labels */}
                    <text fill="#000000" fontFamily="Geist" fontSize="10" fontWeight="700" textAnchor="middle" x="150" y="22">
                      CORE CS (85%)
                    </text>
                    <text fill="#000000" fontFamily="Geist" fontSize="10" fontWeight="700" textAnchor="start" x="266" y="118">
                      SYS DESIGN (95%)
                    </text>
                    <text fill="#000000" fontFamily="Geist" fontSize="10" fontWeight="700" textAnchor="start" x="215" y="265">
                      ALGORITHMS (75%)
                    </text>
                    <text fill="#000000" fontFamily="Geist" fontSize="10" fontWeight="700" textAnchor="end" x="85" y="265">
                      CLOUD OPS (65%)
                    </text>
                    <text fill="#000000" fontFamily="Geist" fontSize="10" fontWeight="700" textAnchor="end" x="30" y="118">
                      RETENTION (80%)
                    </text>
                  </svg>
                </div>
                <div className="mt-space-xs font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider font-bold">
                  EVIDENCE-BACKED MASTERY VECTOR
                </div>
              </div>

              {/* 5 Dimension Rows */}
              <div className="lg:col-span-6 flex flex-col gap-space-sm">
                <div className="p-space-sm bg-surface-container border-[2px] border-[#000000] flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-4 h-4 bg-primary-container border-[2px] border-[#000000]"></div>
                    <div>
                      <div className="font-title text-title uppercase">CORE CS CONCEPTS</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant">MEMORY, CONCURRENCY, OS</div>
                    </div>
                  </div>
                  <span className="px-space-sm py-0.5 bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
                    85%
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container border-[2px] border-[#000000] flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-4 h-4 bg-tertiary-fixed-dim border-[2px] border-[#000000]"></div>
                    <div>
                      <div className="font-title text-title uppercase">SYSTEM DESIGN & ARCH</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant">DISTRIBUTED PATTERNS SLA</div>
                    </div>
                  </div>
                  <span className="px-space-sm py-0.5 bg-surface-container-lowest text-tertiary font-headline-sm text-headline-sm font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
                    95%
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container border-[2px] border-[#000000] flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-4 h-4 bg-secondary-container border-[2px] border-[#000000]"></div>
                    <div>
                      <div className="font-title text-title uppercase">ALGORITHM RIGOR</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant">COMPLEXITY & DP OPTIMIZATION</div>
                    </div>
                  </div>
                  <span className="px-space-sm py-0.5 bg-surface-container-lowest text-secondary font-headline-sm text-headline-sm font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
                    75%
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container border-[2px] border-[#000000] flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-4 h-4 bg-[#fde047] border-[2px] border-[#000000]"></div>
                    <div>
                      <div className="font-title text-title uppercase">CLOUD INFRASTRUCTURE</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant">KUBERNETES & OBSERVABILITY</div>
                    </div>
                  </div>
                  <span className="px-space-sm py-0.5 bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
                    65%
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container border-[2px] border-[#000000] flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-4 h-4 bg-[#c084fc] border-[2px] border-[#000000]"></div>
                    <div>
                      <div className="font-title text-title uppercase">RETENTION & RECALL</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant">SPACED REPETITION CONFIDENCE</div>
                    </div>
                  </div>
                  <span className="px-space-sm py-0.5 bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
                    80%
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT NARROW COLUMN (5/12 ~ 42%) */}
        <div className="xl:col-span-5 flex flex-col gap-space-xl">
          {/* WIDGET C: SYSTEM LOAD (DONUT CHART) */}
          <section className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[8px_8px_0px_#000000] flex flex-col">
            <div className="flex items-center justify-between px-space-lg py-space-md bg-surface-container-low border-b-[3px] border-[#000000]">
              <div className="flex items-center gap-space-sm">
                <div className="w-3.5 h-3.5 bg-primary-container border-[2px] border-[#000000]"></div>
                <h2 className="font-headline-sm text-headline-sm uppercase tracking-wide text-on-surface font-bold">
                  EFFORT ALLOCATION
                </h2>
              </div>
              <span className="px-space-sm py-0.5 bg-surface-container-highest text-on-surface font-label-mono text-label-mono uppercase border-[2px] border-[#000000] font-bold">
                4 TARGET DOMAINS
              </span>
            </div>

            <div className="p-space-lg flex flex-col items-center relative">
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
                  backgroundSize: '14px 14px',
                }}
              />

              {/* Donut Chart SVG */}
              <div className="relative w-64 h-64 my-space-md flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <circle
                    className="transition-all hover:opacity-90"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="60"
                    stroke="#fe7676"
                    strokeDasharray="131.95 377"
                    strokeDashoffset="0"
                    strokeWidth="26"
                  />
                  <circle
                    className="transition-all hover:opacity-90"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="60"
                    stroke="#4ade80"
                    strokeDasharray="94.25 377"
                    strokeDashoffset="-131.95"
                    strokeWidth="26"
                  />
                  <circle
                    className="transition-all hover:opacity-90"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="60"
                    stroke="#60a5fa"
                    strokeDasharray="94.25 377"
                    strokeDashoffset="-226.2"
                    strokeWidth="26"
                  />
                  <circle
                    className="transition-all hover:opacity-90"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="60"
                    stroke="#fbbf24"
                    strokeDasharray="56.55 377"
                    strokeDashoffset="-320.45"
                    strokeWidth="26"
                  />
                  <circle cx="80" cy="80" fill="transparent" r="73" stroke="#000000" strokeWidth="2.5" />
                  <circle cx="80" cy="80" fill="transparent" r="47" stroke="#000000" strokeWidth="2.5" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase font-bold">
                    ALLOCATED
                  </span>
                  <span className="font-headline-md text-headline-md text-on-surface leading-none font-extrabold my-0.5">
                    100%
                  </span>
                  <span className="px-space-xs py-0.2 bg-surface-container-high border-[1px] border-[#000000] font-label-mono text-[9px] uppercase tracking-wider font-bold">
                    BALANCED
                  </span>
                </div>
              </div>

              {/* 4 Allocation Cards */}
              <div className="grid grid-cols-2 gap-space-sm w-full mt-space-sm">
                <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-label-mono text-on-surface uppercase font-bold">
                      ARCHITECTURE
                    </span>
                    <div className="w-3 h-3 bg-[#fe7676] border-[1.5px] border-[#000000]"></div>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                    35%
                  </div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
                    SYSTEM ARCHITECTURE
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-label-mono text-on-surface uppercase font-bold">
                      DISTRIBUTED
                    </span>
                    <div className="w-3 h-3 bg-[#4ade80] border-[1.5px] border-[#000000]"></div>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                    25%
                  </div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
                    DISTRIBUTED SYSTEMS
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-label-mono text-on-surface uppercase font-bold">
                      ALGORITHMS
                    </span>
                    <div className="w-3 h-3 bg-[#60a5fa] border-[1.5px] border-[#000000]"></div>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                    25%
                  </div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
                    ALGORITHMS & DATA
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-label-mono text-on-surface uppercase font-bold">
                      DRILLS
                    </span>
                    <div className="w-3 h-3 bg-[#fbbf24] border-[1.5px] border-[#000000]"></div>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                    15%
                  </div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
                    MAINTENANCE DRILLS
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* WIDGET D: LIVE AUDIT FEED */}
          <section className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[8px_8px_0px_#000000] flex flex-col flex-1">
            <div className="flex items-center justify-between px-space-lg py-space-md bg-surface-container-low border-b-[3px] border-[#000000]">
              <div className="flex items-center gap-space-sm">
                <div className="w-3.5 h-3.5 bg-on-surface border-[2px] border-[#000000]"></div>
                <h2 className="font-headline-sm text-headline-sm uppercase tracking-wide text-on-surface font-bold">
                  GEMMA 4 ADAPTIVE LOG
                </h2>
              </div>
              <span className="font-label-mono text-label-mono uppercase text-on-surface-variant flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                LIVE TRACKING
              </span>
            </div>

            <div className="p-space-md flex flex-col justify-between flex-1 gap-space-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-[2px] border-[#000000] bg-surface-container-high">
                      <th className="py-space-xs px-space-sm font-label-mono text-label-mono uppercase text-on-surface">
                        TIMESTAMP
                      </th>
                      <th className="py-space-xs px-space-sm font-label-mono text-label-mono uppercase text-on-surface">
                        LEVEL
                      </th>
                      <th className="py-space-xs px-space-sm font-label-mono text-label-mono uppercase text-on-surface">
                        ACTION & EVIDENCE
                      </th>
                      <th className="py-space-xs px-space-sm font-label-mono text-label-mono uppercase text-on-surface text-right">
                        CONFIDENCE
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-[2px] divide-[#000000]">
                    <tr className="hover:bg-surface-container transition-colors">
                      <td className="py-space-xs px-space-sm font-label-mono text-label-mono text-on-surface-variant">
                        14:32:08
                      </td>
                      <td className="py-space-xs px-space-sm">
                        <span className="px-1.5 py-0.2 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-[10px] font-bold uppercase border-[1.5px] border-[#000000]">
                          VERIFIED
                        </span>
                      </td>
                      <td className="py-space-xs px-space-sm font-label-code text-label-code uppercase text-on-surface font-bold">
                        EVIDENCE_VERIFIED // GitHub PR for Raft consensus engine merged.
                      </td>
                      <td className="py-space-xs px-space-sm font-label-mono text-label-mono text-right font-bold text-tertiary">
                        99.4%
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container transition-colors">
                      <td className="py-space-xs px-space-sm font-label-mono text-label-mono text-on-surface-variant">
                        14:31:55
                      </td>
                      <td className="py-space-xs px-space-sm">
                        <span className="px-1.5 py-0.2 bg-primary-fixed text-on-primary-fixed-variant font-label-mono text-[10px] font-bold uppercase border-[1.5px] border-[#000000]">
                          ADAPTED
                        </span>
                      </td>
                      <td className="py-space-xs px-space-sm font-label-code text-label-code uppercase text-on-surface font-bold">
                        STRATEGY_ADAPTED // Added 2 prerequisite exercises for vector search.
                      </td>
                      <td className="py-space-xs px-space-sm font-label-mono text-label-mono text-right font-bold text-primary">
                        96.8%
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container transition-colors">
                      <td className="py-space-xs px-space-sm font-label-mono text-label-mono text-on-surface-variant">
                        14:31:12
                      </td>
                      <td className="py-space-xs px-space-sm">
                        <span className="px-1.5 py-0.2 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-[10px] font-bold uppercase border-[1.5px] border-[#000000]">
                          COMPLETE
                        </span>
                      </td>
                      <td className="py-space-xs px-space-sm font-label-code text-label-code uppercase text-on-surface font-bold">
                        ACTION_COMPLETED // Solved dynamic programming optimization drill.
                      </td>
                      <td className="py-space-xs px-space-sm font-label-mono text-label-mono text-right font-bold text-tertiary">
                        98.1%
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container transition-colors">
                      <td className="py-space-xs px-space-sm font-label-mono text-label-mono text-on-surface-variant">
                        14:30:44
                      </td>
                      <td className="py-space-xs px-space-sm">
                        <span className="px-1.5 py-0.2 bg-secondary-container text-on-secondary-container font-label-mono text-[10px] font-bold uppercase border-[1.5px] border-[#000000]">
                          SCHEDULE
                        </span>
                      </td>
                      <td className="py-space-xs px-space-sm font-label-code text-label-code uppercase text-on-surface font-bold">
                        RETENTION_PROMPT // Spaced repetition review scheduled for Day 18.
                      </td>
                      <td className="py-space-xs px-space-sm font-label-mono text-label-mono text-right font-bold text-secondary">
                        92.0%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between pt-space-xs border-t-[2px] border-[#000000]">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">
                  SHOWING 4 OF 1,489 EVENTS
                </span>
                <button
                  onClick={exportStateJson}
                  className="font-title text-[12px] uppercase tracking-wider text-primary hover:underline flex items-center gap-1 font-bold"
                >
                  EXPORT COMPLETE EVIDENCE LOG (.JSON)
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

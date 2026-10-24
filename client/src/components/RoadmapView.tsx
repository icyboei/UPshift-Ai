import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RoadmapTask } from '../types';

export const RoadmapView: React.FC = () => {
  const {
    roadmap,
    goalContext,
    activeTaskId,
    setActiveTaskId,
    setCurrentView,
    loadSeedDemo,
  } = useApp();

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[14:22:01.109] Gemma 4 feedback stream initialized. Prerequisite graph loaded (142 checks passed).',
    '[14:22:04.882] Vector embedding memory consumption verified. Baseline precision within target SLA.',
  ]);
  const [pulseActive, setPulseActive] = useState(false);

  // If no roadmap exists yet, provide a quick launcher
  if (!roadmap) {
    return (
      <div className="flex flex-col items-center justify-center p-space-xl bg-surface-container-lowest border-[3px] border-[#000000] shadow-[8px_8px_0px_#000000] my-space-lg text-center gap-space-md">
        <div className="w-16 h-16 bg-primary-container border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] flex items-center justify-center">
          <span className="material-symbols-outlined text-[32px] text-on-surface">alt_route</span>
        </div>
        <h2 className="font-headline-md text-headline-md uppercase text-on-surface">
          NO ROADMAP IN MEMORY
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Start a new adaptive goal assessment or load the pre-calibrated demo profile to see your prerequisite sequence.
        </p>
        <div className="flex items-center gap-space-sm flex-wrap justify-center">
          <button
            onClick={() => setCurrentView('landing')}
            className="px-space-lg py-space-sm bg-primary-container text-on-primary-container font-title text-title uppercase tracking-wide border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          >
            START ASSESSMENT
          </button>
          <button
            onClick={loadSeedDemo}
            className="px-space-lg py-space-sm bg-surface-container-high text-on-surface font-title text-title uppercase tracking-wide border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          >
            LOAD DEMO PROFILE
          </button>
        </div>
      </div>
    );
  }

  const allTasks = roadmap.milestones.flatMap((m) => m.tasks);
  const completedTasks = allTasks.filter((t) => t.status === 'completed');
  const activeTask = allTasks.find((t) => t.id === activeTaskId) || allTasks.find((t) => t.status === 'available') || allTasks[0];
  const progressPercent = Math.round((completedTasks.length / Math.max(allTasks.length, 1)) * 100);

  const handleLaunchTask = (task: RoadmapTask) => {
    setActiveTaskId(task.id);
    setCurrentView('task_workspace');
  };

  const handleSimulateCheck = () => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const newEntry = `[${timestamp}] EVIDENCE CHECK: Gemma 4 verified prerequisite graph (${activeTask?.title || 'Active Milestone'})`;
    setTerminalLogs((prev) => [...prev.slice(-4), newEntry]);
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 800);
    handleLaunchTask(activeTask);
  };

  return (
    <div className="flex flex-col w-full pb-space-xl animate-fadeIn">
      {/* System Status Strip & Technical Sub-Header */}
      <div className="w-full bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md mb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="px-space-sm py-0.5 bg-primary-container text-on-primary-container font-label-mono text-label-mono uppercase border-[2px] border-[#000000] font-bold">
              TRACK: {(goalContext?.targetSkill || goalContext?.clarifiedGoal || 'DISTRIBUTED AI SYSTEMS').toUpperCase()}
            </span>
            <span className="px-space-sm py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono uppercase border-[2px] border-[#000000] font-bold">
              MODEL: GEMMA 4
            </span>
            <span className="px-space-sm py-0.5 bg-surface-container-high text-on-surface font-label-mono text-label-mono uppercase border-[2px] border-[#000000]">
              ADAPTIVE ENGINE: ACTIVE
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight m-0">
            YOUR NEXT STEP STARTS HERE // ADAPTIVE ROADMAP
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl m-0">
            Assess your current level, identify skill gaps and prerequisites, take the next best action, and maintain long-term improvement.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-col lg:flex-row items-stretch gap-space-sm self-start md:self-auto shrink-0">
          <div className="px-space-md py-space-xs bg-tertiary-fixed text-on-tertiary-fixed border-[2px] border-[#000000] flex flex-col justify-center">
            <span className="font-label-mono text-label-mono uppercase">RETENTION</span>
            <span className="font-headline-sm text-headline-sm uppercase font-bold text-tertiary">
              94.2%
            </span>
          </div>
          <div className="px-space-md py-space-xs bg-surface-container-low border-[2px] border-[#000000] flex flex-col justify-center">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase font-bold">
              ACTIONS DONE
            </span>
            <span className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
              {completedTasks.length} / {allTasks.length}
            </span>
          </div>
          <div className="px-space-md py-space-xs bg-primary-fixed text-on-primary-fixed border-[2px] border-[#000000] flex flex-col justify-center">
            <span className="font-label-mono text-label-mono uppercase">HEARTBEAT</span>
            <span className="font-headline-sm text-headline-sm uppercase text-primary font-bold">
              0.84S
            </span>
          </div>
        </div>
      </div>

      {/* Bento Core Grid */}
      <div className="grid grid-cols-12 gap-space-lg mb-space-lg">
        {/* Box 1: Quick Deploy / Next Best Action (Span 7) */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-lg flex flex-col justify-between relative overflow-hidden">
          <div
            className="absolute -right-12 -top-12 w-48 h-48 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#000000 2px, transparent 2px)',
              backgroundSize: '10px 10px',
            }}
          />

          <div className="flex flex-col gap-space-sm mb-space-lg z-10">
            <div className="flex items-center justify-between border-b-[3px] border-[#000000] pb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 bg-primary border-[1.5px] border-[#000000]"></span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider font-bold">
                  YOUR NEXT BEST ACTION // GEMMA 4 DISPATCH
                </span>
              </div>
              <span className="font-label-mono text-label-mono bg-surface-container-highest px-space-xs py-0.5 border-[1px] border-[#000000] uppercase text-on-surface font-bold">
                TASK: #{activeTask?.id?.toUpperCase() || '9042-B'}
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md pt-space-xs">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface uppercase m-0 leading-tight">
                  {activeTask?.title || 'TRACE ASYNCHRONOUS EVENT LOOP EXECUTION ORDER'}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant m-0 mt-1">
                  {activeTask?.objective || 'Predict and verify microtask and macrotask scheduling in real-world scenarios. Submit executable reproduction script as evidence.'}
                </p>
              </div>

              <button
                onClick={handleSimulateCheck}
                className="px-space-lg py-space-sm bg-primary-container text-on-primary-container font-title text-title uppercase tracking-wider border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-space-sm shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">
                  assignment_turned_in
                </span>
                SUBMIT EVIDENCE // CHECK
              </button>
            </div>
          </div>

          {/* Telemetry Subgrid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm pt-space-sm border-t-[2px] border-[#000000] z-10">
            <div className="bg-surface-container-low p-space-sm border-[2px] border-[#000000]">
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase block font-bold">
                EST TIME
              </span>
              <span className="font-title text-title text-on-surface font-black">
                {activeTask?.estimatedMinutes || 45} MIN
              </span>
              <span className="font-label-mono text-label-mono text-tertiary block font-bold">
                ▲ HIGH PRIORITY
              </span>
            </div>

            <div className="bg-surface-container-low p-space-sm border-[2px] border-[#000000]">
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase block font-bold">
                RETENTION BUFFER
              </span>
              <span className="font-title text-title text-on-surface font-black">
                2.18 GB / 8 GB
              </span>
              <span className="font-label-mono text-label-mono text-on-surface-variant block">
                HEADROOM: 72%
              </span>
            </div>

            <div className="bg-surface-container-low p-space-sm border-[2px] border-[#000000]">
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase block font-bold">
                GEMMA 4 CONFIDENCE
              </span>
              <span className="font-title text-title text-on-surface font-black">
                98.4%
              </span>
              <span className="font-label-mono text-label-mono text-primary block font-bold">
                CALIBRATED
              </span>
            </div>
          </div>

          {/* Live Terminal Simulation Output */}
          <div className="mt-space-md p-space-sm bg-inverse-surface text-inverse-on-surface border-[2px] border-[#000000] font-label-code text-label-code z-10">
            <div className="flex items-center justify-between text-surface-variant border-b border-surface-variant/30 pb-space-xs mb-space-xs font-label-mono">
              <span>STREAM: gemma4/adaptive-feedback</span>
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full transition-colors ${
                  pulseActive ? 'bg-primary-container' : 'bg-tertiary-fixed'
                }`}
              />
            </div>
            <div className="flex flex-col gap-1 text-surface-container-highest">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="leading-snug">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Box 2: Total Mastery & Stepped Graph (Span 5) */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-[3px] border-[#000000] pb-space-sm mb-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  trending_up
                </span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider font-bold">
                  EVIDENCE OF YOUR GROWTH
                </span>
              </div>
              <button
                onClick={() => setCurrentView('analytics')}
                className="font-label-mono text-label-mono text-primary font-bold hover:underline uppercase flex items-center gap-1"
              >
                FULL MATRIX
                <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
              </button>
            </div>

            <div className="flex items-baseline justify-between mb-space-sm">
              <span className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
                TOTAL MASTERY
              </span>
              <span className="font-headline-sm text-headline-sm uppercase text-tertiary font-bold">
                {progressPercent > 0 ? `${progressPercent}% STABLE` : '48.2% STABLE'}
              </span>
            </div>

            {/* Brutalist Stepped SVG Load Chart */}
            <div className="w-full bg-surface-container-low border-[2px] border-[#000000] p-space-sm mb-space-md">
              <div className="flex justify-between items-center text-on-surface-variant font-label-mono text-label-mono mb-2">
                <span>PROGRESS VELOCITY (PREV 12 HR)</span>
                <span>MAX PEAK: 68.4%</span>
              </div>
              <svg className="w-full h-16 text-primary overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 70">
                <line opacity="0.3" stroke="#000000" strokeDasharray="2 2" strokeWidth="1" x1="0" x2="300" y1="18" y2="18" />
                <line opacity="0.3" stroke="#000000" strokeDasharray="2 2" strokeWidth="1" x1="0" x2="300" y1="42" y2="42" />
                <polyline
                  fill="none"
                  points="0,52 30,52 30,44 60,44 60,35 90,35 90,48 120,48 120,28 150,28 150,38 180,38 180,24 210,24 210,40 240,40 240,32 270,32 270,42 300,42"
                  stroke="#000000"
                  strokeWidth="3"
                />
                <polygon
                  fill="#60a5fa"
                  fillOpacity="0.35"
                  points="0,52 30,52 30,44 60,44 60,35 90,35 90,48 120,48 120,28 150,28 150,38 180,38 180,24 210,24 210,40 240,40 240,32 270,32 270,42 300,42 300,70 0,70"
                />
              </svg>
            </div>

            {/* Health Vectors */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between p-space-xs bg-surface-container border-[1.5px] border-[#000000]">
                <span className="font-label-mono text-label-mono uppercase text-on-surface font-bold">
                  PREREQUISITE COVERAGE
                </span>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-mono text-label-mono text-on-surface">18.4 / 32 UNITS</span>
                  <span className="px-space-xs bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono border-[1px] border-[#000000] uppercase font-bold">
                    OPTIMAL
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-space-xs bg-surface-container border-[1.5px] border-[#000000]">
                <span className="font-label-mono text-label-mono uppercase text-on-surface font-bold">
                  VERIFIED SKILLS
                </span>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-mono text-label-mono text-on-surface">
                    {completedTasks.length * 4 + 72} / 88 SKILLS
                  </span>
                  <span className="px-space-xs bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono border-[1px] border-[#000000] uppercase font-bold">
                    HEALTHY
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-space-xs bg-surface-container border-[1.5px] border-[#000000]">
                <span className="font-label-mono text-label-mono uppercase text-on-surface font-bold">
                  RETENTION DRILLS
                </span>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-mono text-label-mono text-on-surface">0.0001% DECAY</span>
                  <span className="px-space-xs bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono border-[1px] border-[#000000] uppercase font-bold">
                    NOMINAL
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-space-md pt-space-sm border-t-[2px] border-[#000000] flex items-center justify-between">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase font-bold">
              ADAPTIVE DIAGNOSTICS: ACTIVE
            </span>
            <button
              onClick={() => setCurrentView('assessment')}
              className="px-space-sm py-1 bg-surface-container-high hover:bg-surface-container border-[2px] border-[#000000] font-label-mono text-label-mono uppercase font-bold text-on-surface shadow-[2px_2px_0px_#000000]"
            >
              RUN RE-ASSESSMENT
            </button>
          </div>
        </div>

        {/* Box 3: Prerequisites & Topology (Span 6) */}
        <div className="col-span-12 lg:col-span-6 bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-[3px] border-[#000000] pb-space-sm mb-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider font-bold">
                  CURRICULUM PREREQUISITES & TOPOLOGY
                </span>
              </div>
              <span className="font-label-mono text-label-mono px-space-xs bg-surface-container-high border-[1px] border-[#000000] uppercase font-bold">
                {roadmap.milestones.length} MILESTONES LOADED
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              {roadmap.milestones.slice(0, 4).map((milestone, idx) => {
                const isCurrent = idx === 0;
                return (
                  <div
                    key={milestone.id}
                    className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer"
                    onClick={() => {
                      if (milestone.tasks[0]) handleLaunchTask(milestone.tasks[0]);
                    }}
                  >
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 bg-surface-container-high border-[2px] border-[#000000] flex items-center justify-center font-title text-title font-bold">
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="font-title text-title uppercase text-on-surface">
                          {milestone.title}
                        </div>
                        <div className="font-label-mono text-label-mono text-on-surface-variant uppercase">
                          {milestone.tasks.length} TASKS // EST {milestone.estimatedHours} HOURS
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-space-sm py-1 font-label-mono text-label-mono font-bold uppercase border-[1.5px] border-[#000000] ${
                        isCurrent
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed'
                      }`}
                    >
                      {isCurrent ? 'RECOMMENDED NEXT' : 'PREREQ VERIFIED'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-space-md pt-space-sm border-t-[2px] border-[#000000] flex items-center justify-between">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
              CURRICULUM SYNCHRONIZED
            </span>
            <button
              onClick={() => setCurrentView('analytics')}
              className="px-space-sm py-1 bg-surface-container-lowest hover:bg-surface-container border-[2px] border-[#000000] font-label-mono text-label-mono uppercase font-bold text-on-surface shadow-[2px_2px_0px_#000000]"
            >
              INSPECT RADAR GRAPH
            </button>
          </div>
        </div>

        {/* Box 4: Gemma 4 Adaptive Log (Span 6) */}
        <div className="col-span-12 lg:col-span-6 bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-[3px] border-[#000000] pb-space-sm mb-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider font-bold">
                  GEMMA 4 ADAPTIVE LOG // TELEMETRY FEED
                </span>
              </div>
              <span className="font-label-mono text-label-mono px-space-xs bg-tertiary-fixed text-on-tertiary-fixed font-bold border-[1px] border-[#000000] uppercase">
                LISTENING
              </span>
            </div>

            <div className="flex flex-col gap-space-xs">
              <div className="p-space-sm bg-surface-container-lowest border-[2px] border-[#000000] flex items-start justify-between gap-space-sm">
                <div className="flex items-start gap-space-sm">
                  <span className="px-space-xs py-0.5 bg-secondary-container text-on-secondary-container font-label-mono text-label-mono font-black border-[1.5px] border-[#000000] shrink-0">
                    ADAPT
                  </span>
                  <div>
                    <div className="font-title text-title uppercase text-on-surface">
                      ADAPTATION // LEVEL ADJUSTMENT
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      Task difficulty adjusted +15% after quick evidence completion.
                    </div>
                  </div>
                </div>
                <span className="font-label-mono text-label-mono text-on-surface-variant whitespace-nowrap shrink-0">
                  14:18:22
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-lowest border-[2px] border-[#000000] flex items-start justify-between gap-space-sm">
                <div className="flex items-start gap-space-sm">
                  <span className="px-space-xs py-0.5 bg-primary-container text-on-primary-container font-label-mono text-label-mono font-black border-[1.5px] border-[#000000] shrink-0">
                    PREREQ
                  </span>
                  <div>
                    <div className="font-title text-title uppercase text-on-surface">
                      PREREQUISITE CLEARED // MESH
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      Vector embeddings baseline verified.
                    </div>
                  </div>
                </div>
                <span className="font-label-mono text-label-mono text-on-surface-variant whitespace-nowrap shrink-0">
                  14:02:11
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-lowest border-[2px] border-[#000000] flex items-start justify-between gap-space-sm">
                <div className="flex items-start gap-space-sm">
                  <span className="px-space-xs py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono font-black border-[1.5px] border-[#000000] shrink-0">
                    SPACE
                  </span>
                  <div>
                    <div className="font-title text-title uppercase text-on-surface">
                      SPACED REPETITION // QUEUED
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      3 maintenance flash-quizzes queued for retention.
                    </div>
                  </div>
                </div>
                <span className="font-label-mono text-label-mono text-on-surface-variant whitespace-nowrap shrink-0">
                  13:45:00
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-lowest border-[2px] border-[#000000] flex items-start justify-between gap-space-sm">
                <div className="flex items-start gap-space-sm">
                  <span className="px-space-xs py-0.5 bg-surface-container-high text-on-surface font-label-mono text-label-mono font-black border-[1.5px] border-[#000000] shrink-0">
                    EVID
                  </span>
                  <div>
                    <div className="font-title text-title uppercase text-on-surface">
                      EVIDENCE LOGGED // REPO PUSH
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      GitHub PR merged for distributed rate limiter.
                    </div>
                  </div>
                </div>
                <span className="font-label-mono text-label-mono text-on-surface-variant whitespace-nowrap shrink-0">
                  12:30:19
                </span>
              </div>
            </div>
          </div>

          <div className="mt-space-md pt-space-sm border-t-[2px] border-[#000000] flex items-center justify-between">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase font-bold">
              FILTER: ALL SEVERITIES
            </span>
            <button
              onClick={() => setCurrentView('analytics')}
              className="px-space-sm py-1 bg-surface-container-high hover:bg-surface-container border-[2px] border-[#000000] font-label-mono text-label-mono uppercase font-bold text-on-surface shadow-[2px_2px_0px_#000000]"
            >
              VIEW FULL LOG
            </button>
          </div>
        </div>

        {/* Box 5: Platform Navigation Shortcuts (Span 12) */}
        <div className="col-span-12 bg-surface-container-high border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider font-bold">
              DIRECTORY DISPATCH // CORE INTERFACES
            </span>
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
              SELECT MODULE TO LAUNCH
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div
              onClick={() => setCurrentView('analytics')}
              className="group p-space-md bg-surface-container-lowest border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] transition-all flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-start justify-between mb-space-sm">
                <span className="w-8 h-8 bg-primary-container text-on-primary-container border-[2px] border-[#000000] flex items-center justify-center font-title text-title font-bold">
                  01
                </span>
                <span className="material-symbols-outlined text-[24px] text-on-surface group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  query_stats
                </span>
              </div>
              <div>
                <h3 className="font-title text-title uppercase text-on-surface m-0 mb-1">
                  SKILL GAPS & EVIDENCE
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant m-0">
                  Inspect throughput heatmaps, radar chart dimensions, and effort allocation.
                </p>
              </div>
              <div className="mt-space-sm pt-space-xs border-t-[1px] border-[#000000] flex items-center justify-between text-primary font-label-mono text-label-mono uppercase font-bold">
                <span>ROUTE: /analytics</span>
                <span>ENTER →</span>
              </div>
            </div>

            <div
              onClick={() => setCurrentView('task_workspace')}
              className="group p-space-md bg-surface-container-lowest border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] transition-all flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-start justify-between mb-space-sm">
                <span className="w-8 h-8 bg-tertiary-fixed text-on-tertiary-fixed border-[2px] border-[#000000] flex items-center justify-center font-title text-title font-bold">
                  02
                </span>
                <span className="material-symbols-outlined text-[24px] text-on-surface group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  terminal
                </span>
              </div>
              <div>
                <h3 className="font-title text-title uppercase text-on-surface m-0 mb-1">
                  DAILY ACTION WORKSPACE
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant m-0">
                  Take the immediate next empirical step with focus timer and code review.
                </p>
              </div>
              <div className="mt-space-sm pt-space-xs border-t-[1px] border-[#000000] flex items-center justify-between text-tertiary font-label-mono text-label-mono uppercase font-bold">
                <span>ROUTE: /task_workspace</span>
                <span>ENTER →</span>
              </div>
            </div>

            <div
              onClick={() => setCurrentView('system_details')}
              className="group p-space-md bg-surface-container-lowest border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] transition-all flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-start justify-between mb-space-sm">
                <span className="w-8 h-8 bg-secondary-fixed text-on-secondary-fixed-variant border-[2px] border-[#000000] flex items-center justify-center font-title text-title font-bold">
                  03
                </span>
                <span className="material-symbols-outlined text-[24px] text-on-surface group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  contact_support
                </span>
              </div>
              <div>
                <h3 className="font-title text-title uppercase text-on-surface m-0 mb-1">
                  SPECS & MENTOR DIRECTORY
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant m-0">
                  Connect with staff engineers and mentors to review complex architectural trade-offs.
                </p>
              </div>
              <div className="mt-space-sm pt-space-xs border-t-[1px] border-[#000000] flex items-center justify-between text-secondary font-label-mono text-label-mono uppercase font-bold">
                <span>ROUTE: /specs</span>
                <span>ENTER →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Milestone Task Matrix */}
      <div className="w-full bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-lg">
        <div className="flex items-center justify-between border-b-[3px] border-[#000000] pb-space-sm mb-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[22px]">format_list_bulleted</span>
            <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold m-0">
              COMPLETE SEQUENCE EXECUTION PLAN ({roadmap.milestones.length} PHASES)
            </h2>
          </div>
          <span className="font-label-mono text-label-mono uppercase px-space-sm py-0.5 bg-surface-container-high border border-[#000000] font-bold">
            {completedTasks.length} OF {allTasks.length} MILESTONES COMPLETED
          </span>
        </div>

        <div className="flex flex-col gap-space-lg">
          {roadmap.milestones.map((milestone, mIdx) => (
            <div
              key={milestone.id}
              className="bg-surface-container-low border-[2px] border-[#000000] p-space-md flex flex-col gap-space-sm shadow-[3px_3px_0px_#000000]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#000000] pb-space-xs">
                <div>
                  <span className="font-label-mono text-label-mono uppercase text-primary font-bold">
                    PHASE 0{mIdx + 1} //
                  </span>
                  <h3 className="font-title text-title uppercase text-on-surface inline-block ml-2 font-bold">
                    {milestone.title}
                  </h3>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
                    EST {milestone.estimatedHours} HOURS
                  </span>
                  <span className="px-space-xs py-0.5 bg-surface-container-highest font-label-mono text-label-mono border border-[#000000] uppercase font-bold">
                    {milestone.tasks.length} ACTIONS
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-xs">
                {milestone.tasks.map((task) => {
                  const isAvailable = task.status === 'available';
                  const isCompleted = task.status === 'completed';
                  const isCurrentActive = task.id === activeTaskId;

                  return (
                    <div
                      key={task.id}
                      onClick={() => handleLaunchTask(task)}
                      className={`p-space-sm bg-surface-container-lowest border-[2px] border-[#000000] flex flex-col justify-between gap-space-xs hover:bg-surface-container transition-all cursor-pointer ${
                        isCurrentActive ? 'shadow-[4px_4px_0px_#60a5fa] border-primary' : 'shadow-[2px_2px_0px_#000000]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-space-xs">
                        <span className="font-label-mono text-[10px] uppercase text-on-surface-variant font-bold">
                          #{task.id}
                        </span>
                        <span
                          className={`px-space-xs py-0.5 font-label-mono text-[10px] font-bold uppercase border border-[#000000] ${
                            isCompleted
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                              : isAvailable
                              ? 'bg-primary-container text-on-primary-container'
                              : 'bg-surface-container-high text-on-surface'
                          }`}
                        >
                          {task.status.toUpperCase()}
                        </span>
                      </div>

                      <h4 className="font-title text-title uppercase text-on-surface font-bold leading-tight">
                        {task.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        {task.objective}
                      </p>

                      <div className="flex items-center justify-between pt-space-xs border-t border-[#000000]/20 font-label-mono text-[11px]">
                        <span className="text-on-surface-variant">⏱ {task.estimatedMinutes} MIN</span>
                        <span className="font-bold text-primary flex items-center gap-1 uppercase">
                          LAUNCH →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

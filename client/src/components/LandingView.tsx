import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const LandingView: React.FC = () => {
  const { setCurrentView, startNewGoal, loadSeedDemo, isLoading } = useApp();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [learnerId, setLearnerId] = useState('learner@domain.edu');
  const [targetAmbition, setTargetAmbition] = useState('Staff Distributed Systems Engineer');
  const [passkey, setPasskey] = useState('••••••••••••••••••••');
  const [showPass, setShowPass] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);

  const presets = [
    { title: 'Distributed Systems', role: 'Staff Distributed Systems Engineer' },
    { title: 'Applied AI & ML', role: 'Applied Machine Learning & Data Systems Engineer' },
    { title: 'Cloud Infrastructure', role: 'Senior SRE / Kubernetes Platform Engineer' },
    { title: 'Full-Stack Engine', role: 'Production-Grade Full-Stack Software Engineer' },
  ];

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'signin') {
      loadSeedDemo();
    } else {
      await startNewGoal(targetAmbition);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-gutter animate-fadeIn">
      <div className="flex flex-col w-full max-w-4xl mx-auto my-auto items-center justify-center relative">
        {/* Floating Top Badge */}
        <div className="absolute -top-12 -left-4 hidden lg:flex items-center gap-2 px-3 py-1 bg-surface-container-lowest border-[3px] border-black shadow-[4px_4px_0px_#000000]">
          <span className="w-2.5 h-2.5 bg-tertiary-container border border-black animate-pulse"></span>
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface font-bold">
            GEMMA 4 RUNTIME // HACKTOBERFEST PWA EDITION
          </span>
        </div>

        {/* Floating Bottom Badge */}
        <div className="absolute -bottom-8 -right-4 hidden lg:flex items-center gap-2 px-3 py-1 bg-primary-container border-[3px] border-black shadow-[4px_4px_0px_#000000]">
          <span className="font-label-mono text-label-mono uppercase text-on-primary-container font-bold">
            UPSHIFT AI // MOBILE-FIRST PWA
          </span>
        </div>

        {/* Main Terminal Window */}
        <div className="w-full bg-surface-container-lowest border-[3px] border-black shadow-[10px_10px_0px_#000000] relative">
          {/* Black Terminal Title Bar */}
          <div className="bg-black text-white px-space-md py-space-sm flex flex-wrap items-center justify-between border-b-[3px] border-black">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container text-xl">
                terminal
              </span>
              <span className="font-title text-title uppercase tracking-wider font-bold">
                UPSHIFT AI // LEARNING TERMINAL
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 sm:mt-0">
              <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 font-label-mono text-label-mono font-bold border border-black">
                POWERED BY GEMMA 4
              </span>
              <span className="bg-tertiary-container text-on-tertiary-container px-2 py-0.5 font-label-mono text-label-mono font-bold border border-black flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                ADAPTIVE ENGINE: ACTIVE
              </span>
            </div>
          </div>

          <div className="p-space-md sm:p-space-lg flex flex-col gap-6">
            {/* Header Description & Tab Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[3px] border-black pb-space-md">
              <div>
                <h1 className="font-headline-md text-headline-md uppercase text-on-surface tracking-tight font-extrabold m-0">
                  TURN YOUR AMBITION INTO MEASURABLE PROGRESS
                </h1>
                <p className="font-label-code text-label-code text-on-surface-variant uppercase mt-1 m-0">
                  Understand where you stand, discover what to improve, and follow an adaptive roadmap built around your goals.
                </p>
              </div>

              {/* Mode Tabs */}
              <div className="inline-flex bg-surface-container-high p-1 border-[3px] border-black shadow-[4px_4px_0px_#000000] self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className={`px-4 py-2 font-label-mono text-label-mono uppercase font-bold tracking-wider transition-all ${
                    activeTab === 'signin'
                      ? 'bg-primary-container text-on-primary-container border-[2px] border-black shadow-[2px_2px_0px_#000000]'
                      : 'bg-transparent text-on-surface border-[2px] border-transparent hover:border-black'
                  }`}
                >
                  [RESUME ROADMAP]
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={`px-4 py-2 font-label-mono text-label-mono uppercase font-bold tracking-wider transition-all ${
                    activeTab === 'signup'
                      ? 'bg-primary-container text-on-primary-container border-[2px] border-black shadow-[2px_2px_0px_#000000]'
                      : 'bg-transparent text-on-surface border-[2px] border-transparent hover:border-black'
                  }`}
                >
                  [START MY ASSESSMENT]
                </button>
              </div>
            </div>

            {/* Presets Row */}
            <div className="flex flex-col gap-1">
              <span className="font-label-mono text-[11px] text-on-surface-variant uppercase font-bold">
                QUICK CALIBRATION PRESETS // SELECT TO INITIALIZE:
              </span>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => {
                      setTargetAmbition(preset.role);
                      setActiveTab('signup');
                    }}
                    className="px-space-sm py-1 bg-surface-container-low hover:bg-surface-container border-[2px] border-black font-label-mono text-[11px] uppercase font-bold shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px]"
                  >
                    + {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Field 1: Learner ID */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="font-label-mono text-label-mono font-bold uppercase text-on-surface flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-primary"></span>
                      LEARNER ID // EMAIL
                    </label>
                    <span className="font-label-mono text-body-sm text-outline font-bold">
                      REQ_FIELD
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      value={learnerId}
                      onChange={(e) => setLearnerId(e.target.value)}
                      className="w-full bg-surface-container-lowest border-[3px] border-black p-3 font-label-code text-label-code text-on-surface placeholder:text-outline-variant focus:outline-none focus:shadow-[4px_4px_0px_#60a5fa] transition-all"
                      placeholder="learner@domain.edu"
                      required
                      type="text"
                    />
                    <span className="absolute right-3 top-3.5 material-symbols-outlined text-outline text-lg">
                      school
                    </span>
                  </div>
                </div>

                {/* Field 2: Target Ambition */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="font-label-mono text-label-mono font-bold uppercase text-on-surface flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-primary"></span>
                      PRIMARY AMBITION // TARGET ROLE
                    </label>
                    <span className="font-label-mono text-body-sm text-outline font-bold">
                      ROADMAP_TARGET
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      value={targetAmbition}
                      onChange={(e) => setTargetAmbition(e.target.value)}
                      className="w-full bg-surface-container-lowest border-[3px] border-black p-3 font-label-code text-label-code text-on-surface placeholder:text-outline-variant focus:outline-none focus:shadow-[4px_4px_0px_#60a5fa] transition-all"
                      placeholder="e.g. Distributed Systems Engineer / AI Researcher"
                      required
                      type="text"
                    />
                    <span className="absolute right-3 top-3.5 material-symbols-outlined text-outline text-lg">
                      rocket_launch
                    </span>
                  </div>
                </div>
              </div>

              {/* Passkey */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="font-label-mono text-label-mono font-bold uppercase text-on-surface flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-primary"></span>
                    SECURITY PASSKEY
                  </label>
                  <a
                    href="#recover"
                    onClick={(e) => {
                      e.preventDefault();
                      loadSeedDemo();
                    }}
                    className="font-label-mono text-body-sm text-primary uppercase underline font-bold hover:text-on-surface"
                  >
                    Use Demo Passkey?
                  </a>
                </div>
                <div className="relative">
                  <input
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="w-full bg-surface-container-lowest border-[3px] border-black p-3 font-label-code text-label-code text-on-surface placeholder:text-outline-variant focus:outline-none focus:shadow-[4px_4px_0px_#60a5fa] transition-all pr-12"
                    placeholder="••••••••••••••••••••"
                    required
                    type={showPass ? 'text' : 'password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-2.5 p-1 hover:bg-surface-container-highest transition-colors"
                  >
                    <span className="material-symbols-outlined text-on-surface text-xl">
                      {showPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Extra Box for Sign Up */}
              {activeTab === 'signup' && (
                <div className="flex flex-col gap-2 bg-surface-container-low p-3 border-[2px] border-black">
                  <div className="flex justify-between items-center">
                    <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                      CLUSTER PERMISSION MATRIX
                    </span>
                    <span className="font-label-mono text-body-sm bg-primary-fixed text-on-primary-fixed px-1 border border-black font-bold">
                      READ_WRITE_EXEC
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant m-0">
                    Default tenant role assigned:{' '}
                    <code className="font-label-code font-bold text-on-surface bg-surface-container-highest px-1 border border-black">
                      OPS_INFRA_ENGINEER_L2
                    </code>
                  </p>
                </div>
              )}

              {/* Options & Action Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none bg-surface-container-low p-3 border-[2px] border-black hover:bg-surface-container transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="mt-0.5 accent-primary h-4 w-4 border-2 border-black rounded-none"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                      TRUST CURRENT BROWSER ENGINE
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Persist offline state in Service Worker cache and IndexedDB.
                    </span>
                  </div>
                </label>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={loadSeedDemo}
                    className="w-full md:w-auto px-4 py-3 bg-surface-container-high hover:bg-surface-container border-[3px] border-black font-title text-title uppercase tracking-wider text-on-surface shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all font-bold"
                  >
                    [DEMO ACCESS]
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-auto px-6 py-3 bg-primary-container hover:bg-primary-fixed border-[3px] border-black font-title text-title uppercase tracking-wider text-on-primary-container shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 font-bold"
                  >
                    <span className="material-symbols-outlined text-lg">
                      login
                    </span>
                    <span>
                      {isLoading
                        ? 'COMPUTING...'
                        : activeTab === 'signin'
                        ? 'RESUME ROADMAP'
                        : 'START ASSESSMENT'}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

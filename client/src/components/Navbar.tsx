import React from 'react';
import { useApp, AppView } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    roadmap,
    systemStatus,
    loadSeedDemo,
    activeTaskId,
  } = useApp();

  const isLiveGemma = systemStatus?.mode === 'gemma_live';

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest z-50 border-b-[3px] border-[#000000]">
      <div className="h-16 w-full px-gutter flex items-center justify-between">
        {/* Left Brand & System Mode Status */}
        <div className="flex items-center gap-space-lg">
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-space-sm cursor-pointer select-none group"
          >
            <div className="w-4 h-4 bg-primary-container border-[2px] border-[#000000] shadow-[1px_1px_0px_#000000] group-hover:scale-110 transition-transform"></div>
            <span className="font-title text-title uppercase tracking-wider text-on-surface">
              UPSHIFT // AI
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-space-sm">
            <div className="flex items-center px-space-sm py-space-xs bg-tertiary-fixed border-[2px] border-[#000000] shadow-[1px_1px_0px_#000000]">
              <span className="font-label-mono text-label-mono text-on-tertiary-fixed font-bold uppercase">
                {isLiveGemma ? 'GEMMA 4: ACTIVE' : 'GEMMA 4: HIGH-FIDELITY'}
              </span>
            </div>
            <div className="flex items-center px-space-sm py-space-xs bg-surface-container-high border-[2px] border-[#000000]">
              <span className="font-label-mono text-label-mono text-on-surface font-bold uppercase">
                MODE: ADAPTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-space-sm">
          <button
            onClick={() => setCurrentView('roadmap')}
            className={`px-space-md py-space-xs font-title text-title uppercase tracking-wide transition-all ${
              currentView === 'roadmap'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            ROADMAP
          </button>

          <button
            onClick={() => setCurrentView('assessment')}
            className={`px-space-md py-space-xs font-title text-title uppercase tracking-wide transition-all ${
              currentView === 'assessment'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            CHAT & ASSESSMENT
          </button>\n\n          <button
            onClick={() => setCurrentView('analytics')}
            className={`px-space-md py-space-xs font-title text-title uppercase tracking-wide transition-all ${
              currentView === 'analytics'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            SKILL GAPS & EVIDENCE
          </button>

          <button
            onClick={() => setCurrentView('task_workspace')}
            className={`relative px-space-md py-space-xs font-title text-title uppercase tracking-wide transition-all ${
              currentView === 'task_workspace'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            DAILY ACTIONS
            {activeTaskId && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary-container border border-[#000000] rounded-full animate-ping" />
            )}
          </button>

          <button
            onClick={() => setCurrentView('maintenance')}
            className={`px-space-md py-space-xs font-title text-title uppercase tracking-wide transition-all ${
              currentView === 'maintenance'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            MAINTENANCE
          </button>

          <button
            onClick={() => setCurrentView('system_details')}
            className={`px-space-md py-space-xs font-title text-title uppercase tracking-wide transition-all ${
              currentView === 'system_details'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            SPECS & DIRECTORY
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-space-md">
          <div className="hidden md:flex items-center px-space-sm py-space-xs bg-surface-container-lowest border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
              LATENCY: 12ms
            </span>
          </div>

          <div className="flex items-center gap-space-sm">
            {/* Quick Demo Seed */}
            <button
              onClick={loadSeedDemo}
              title="Load Seeded Demo Journey"
              className="px-space-sm py-space-xs bg-surface-container-high border-[2px] border-[#000000] font-label-mono text-label-mono uppercase font-bold text-on-surface hover:bg-surface-container transition-all shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              [DEMO JOURNEY]
            </button>

            {/* Start New Goal */}
            <button
              onClick={() => setCurrentView('onboarding')}
              className="px-space-sm py-space-xs bg-primary-container text-on-primary-container border-[2px] border-[#000000] font-label-mono text-label-mono uppercase font-bold hover:bg-primary-fixed transition-all shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              {roadmap ? '[RECALIBRATE]' : '[START GOAL]'}
            </button>

            {/* Settings Modal Toggle */}
            <button
              onClick={() => setCurrentView('settings')}
              aria-label="Settings and System State"
              className="w-8 h-8 flex items-center justify-center bg-surface-container-lowest border-[2px] border-[#000000] hover:bg-surface-container-high transition-colors shadow-[2px_2px_0px_#000000]"
            >
              <span className="material-symbols-outlined text-[18px] text-on-surface">
                tune
              </span>
            </button>

            {/* Profile Avatar */}
            <div
              onClick={() => setCurrentView('landing')}
              title="Learner Access Terminal"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-[2px] border-[#000000] cursor-pointer hover:opacity-90 shadow-[2px_2px_0px_#000000]"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

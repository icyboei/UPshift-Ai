import React from 'react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, roadmap } = useApp();

  const totalTasks = roadmap?.milestones.flatMap((m) => m.tasks).length || 12;
  const completedTasks =
    roadmap?.milestones
      .flatMap((m) => m.tasks)
      .filter((t) => t.status === 'completed').length || 4;
  const retentionPct = roadmap ? Math.round((completedTasks / totalTasks) * 100) : 94.2;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-surface-container-low border-r-[3px] border-[#000000] z-40 hidden lg:flex flex-col justify-between p-space-md">
      <div className="flex flex-col gap-space-md">
        {/* Active Goals Badge */}
        <div className="px-space-sm py-space-xs bg-surface-container border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface-variant block">
            ACTIVE GOALS
          </span>
          <span className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
            03 IN FLIGHT
          </span>
        </div>

        {/* Navigation Item Stack */}
        <nav className="flex flex-col gap-space-xs">
          <button
            onClick={() => setCurrentView('roadmap')}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs transition-all text-left uppercase tracking-wider ${
              currentView === 'roadmap'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">alt_route</span>
            <span className="font-title text-title">ROADMAP OVERVIEW</span>
          </button>

          <button
            onClick={() => setCurrentView('assessment')}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs transition-all text-left uppercase tracking-wider ${
              currentView === 'assessment'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
            <span className="font-title text-title">CHAT & ASSESSMENT</span>
          </button>\n\n          <button
            onClick={() => setCurrentView('analytics')}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs transition-all text-left uppercase tracking-wider ${
              currentView === 'analytics'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span className="font-title text-title">SKILL GAPS & EVIDENCE</span>
          </button>

          <button
            onClick={() => setCurrentView('task_workspace')}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs transition-all text-left uppercase tracking-wider ${
              currentView === 'task_workspace'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">task_alt</span>
            <span className="font-title text-title">DAILY ACTIONS</span>
          </button>

          <button
            onClick={() => setCurrentView('maintenance')}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs transition-all text-left uppercase tracking-wider ${
              currentView === 'maintenance'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">published_with_changes</span>
            <span className="font-title text-title">MAINTENANCE & RETENTION</span>
          </button>

          <button
            onClick={() => setCurrentView('system_details')}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs transition-all text-left uppercase tracking-wider ${
              currentView === 'system_details'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">memory</span>
            <span className="font-title text-title">SPECS & MENTORS</span>
          </button>

          <button
            onClick={() => setCurrentView('settings')}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs transition-all text-left uppercase tracking-wider ${
              currentView === 'settings'
                ? 'bg-primary-container text-on-primary-container font-bold border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-[2px] border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span className="font-title text-title">SYSTEM CONFIG</span>
          </button>
        </nav>
      </div>

      {/* Bottom Retention Box */}
      <div className="p-space-sm bg-surface-container-lowest border-[2px] border-[#000000] shadow-[4px_4px_0px_#000000]">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">
            SKILL RETENTION
          </span>
          <span className="font-label-mono text-label-mono font-bold text-tertiary">
            {retentionPct}%
          </span>
        </div>
        <div className="w-full h-2 bg-surface-container-high border-[1px] border-[#000000]">
          <div
            className="h-full bg-primary-container"
            style={{ width: `${Math.min(retentionPct, 100)}%` }}
          />
        </div>
      </div>
    </aside>
  );
};

import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  BarChart3,
  CalendarCheck,
  Settings,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    roadmap,
    systemStatus,
    loadSeedDemo,
    activeTaskId,
  } = useApp();

  const navItems: { view: AppView; label: string; icon: React.ReactNode; requiresRoadmap?: boolean }[] = [
    { view: 'roadmap', label: 'Roadmap', icon: <Compass className="w-4 h-4" />, requiresRoadmap: true },
    { view: 'task_workspace', label: 'Daily Task', icon: <CheckCircle2 className="w-4 h-4" />, requiresRoadmap: true },
    { view: 'maintenance', label: 'Retention', icon: <RotateCcw className="w-4 h-4" />, requiresRoadmap: true },
    { view: 'analytics', label: 'Evidence & Metrics', icon: <BarChart3 className="w-4 h-4" />, requiresRoadmap: true },
  ];

  const isLiveGemma = systemStatus?.mode === 'gemma_live';

  return (
    <header className="sticky top-0 z-40 bg-surface-50/95 backdrop-blur-md border-b border-surface-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center space-x-2 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-charcoal-900 flex items-center justify-center text-emeraldAccent-400 font-mono font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                ▲
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-display text-xl font-bold tracking-tight text-charcoal-900">
                    UPSHIFT
                  </span>
                  <span className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-emeraldAccent-100 text-emeraldAccent-800 border border-emeraldAccent-200">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-charcoal-500 font-sans tracking-wide uppercase">
                  Powered by Gemma 4
                </p>
              </div>
            </button>

            {/* Inference Badge */}
            <div className="hidden md:flex items-center ml-3 pl-3 border-l border-surface-200">
              <div
                className={`flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-full border ${
                  isLiveGemma
                    ? 'bg-emeraldAccent-50 border-emeraldAccent-200 text-emeraldAccent-800'
                    : 'bg-surface-100 border-surface-300 text-charcoal-700'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isLiveGemma ? 'bg-emeraldAccent-500 animate-pulse' : 'bg-charcoal-400'
                  }`}
                />
                <span className="font-medium font-mono text-[11px]">
                  {isLiveGemma ? 'Gemma 4 Live' : 'High-Fidelity Engine'}
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links (when roadmap exists) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {roadmap && (
              <>
                {navItems.map(item => {
                  const isActive = currentView === item.view;
                  return (
                    <button
                      key={item.view}
                      onClick={() => setCurrentView(item.view)}
                      className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-charcoal-900 text-surface-50 shadow-sm'
                          : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-surface-100'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.view === 'task_workspace' && activeTaskId && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent-400 animate-ping" />
                      )}
                    </button>
                  );
                })}
              </>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2.5">
            {/* Quick Seed Demo Profile Button */}
            <button
              onClick={loadSeedDemo}
              title="Instantly load a complete, realistic learner journey with completed baseline, roadmap, and evaluations"
              className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-surface-300 bg-surface-100 text-charcoal-800 hover:bg-surface-200 hover:border-surface-400 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-emeraldAccent-600" />
              <span className="hidden sm:inline">Load Demo Profile</span>
              <span className="sm:hidden">Demo</span>
            </button>

            {/* New Assessment / Primary CTA */}
            <button
              onClick={() => setCurrentView('onboarding')}
              className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-emeraldAccent-600 hover:bg-emeraldAccent-700 text-white shadow-sm transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{roadmap ? 'New Goal' : 'Start Assessment'}</span>
            </button>

            {/* Settings Modal Button */}
            <button
              onClick={() => setCurrentView('settings')}
              title="Engine status, API configuration, and data export"
              className={`p-2 rounded-lg border transition-colors ${
                currentView === 'settings'
                  ? 'bg-charcoal-900 text-white border-charcoal-900'
                  : 'bg-surface-100 border-surface-200 text-charcoal-600 hover:bg-surface-200'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

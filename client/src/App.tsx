import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { OnboardingModal } from './components/OnboardingModal';
import { AssessmentStudio } from './components/AssessmentStudio';
import { AssessmentResultsView } from './components/AssessmentResultsView';
import { RoadmapView } from './components/RoadmapView';
import { DailyTaskWorkspace } from './components/DailyTaskWorkspace';
import { MaintenanceCenter } from './components/MaintenanceCenter';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsModal } from './components/SettingsModal';
import { ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 text-charcoal-900 selection:bg-emeraldAccent-200">
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && <LandingView />}
        {currentView === 'onboarding' && <OnboardingModal />}
        {currentView === 'assessment' && <AssessmentStudio />}
        {currentView === 'assessment_results' && <AssessmentResultsView />}
        {currentView === 'roadmap' && <RoadmapView />}
        {currentView === 'task_workspace' && <DailyTaskWorkspace />}
        {currentView === 'maintenance' && <MaintenanceCenter />}
        {currentView === 'analytics' && <AnalyticsView />}
        {currentView === 'settings' && <SettingsModal />}
      </main>

      {/* Persistent Editorial Footer */}
      <footer className="border-t border-surface-200 bg-white/70 py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500 font-sans">
          <div className="flex items-center space-x-2">
            <span className="font-display font-bold text-charcoal-900">UPSHIFT AI</span>
            <span>•</span>
            <span>Adaptive Personal Development Engine</span>
            <span>•</span>
            <span className="font-mono text-[11px] text-emeraldAccent-700 font-medium">Powered by Gemma 4</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] font-mono text-charcoal-500">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emeraldAccent-600" />
              <span>Evidence Over Speculation</span>
            </span>
            <button
              onClick={() => setCurrentView('settings')}
              className="hover:text-charcoal-900 transition-colors"
            >
              System Status
            </button>
            <button
              onClick={() => setCurrentView('landing')}
              className="hover:text-charcoal-900 transition-colors"
            >
              Architecture & Vision
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;

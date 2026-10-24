import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingView } from './components/LandingView';
import { OnboardingModal } from './components/OnboardingModal';
import { AssessmentStudio } from './components/AssessmentStudio';
import { AssessmentResultsView } from './components/AssessmentResultsView';
import { RoadmapView } from './components/RoadmapView';
import { DailyTaskWorkspace } from './components/DailyTaskWorkspace';
import { MaintenanceCenter } from './components/MaintenanceCenter';
import { AnalyticsView } from './components/AnalyticsView';
import { SystemDetailsView } from './components/SystemDetailsView';
import { SettingsModal } from './components/SettingsModal';

export const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased flex flex-col">
      {/* Neo-Brutalist Fixed Header */}
      <Navbar />

      {/* Neo-Brutalist Sidebar (Desktop) */}
      <Sidebar />

      {/* Content Canvas */}
      <div className="lg:pl-64 flex-1 flex flex-col">
        <main className="w-full min-h-screen pt-16 bg-background px-gutter py-space-lg flex-1">
          {currentView === 'landing' && <LandingView />}
          {currentView === 'onboarding' && <OnboardingModal />}
          {currentView === 'assessment' && <AssessmentStudio />}
          {currentView === 'assessment_results' && <AssessmentResultsView />}
          {currentView === 'roadmap' && <RoadmapView />}
          {currentView === 'task_workspace' && <DailyTaskWorkspace />}
          {currentView === 'maintenance' && <MaintenanceCenter />}
          {currentView === 'analytics' && <AnalyticsView />}
          {currentView === 'system_details' && <SystemDetailsView />}
          {currentView === 'settings' && <SettingsModal />}
        </main>

        {/* Minimal Technical Footer */}
        <footer className="border-t-[2px] border-[#000000] bg-surface-container-lowest py-space-md px-gutter mt-auto">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-mono text-label-mono">
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-on-surface uppercase">UPSHIFT AI</span>
              <span>//</span>
              <span>EVIDENCE-DRIVEN ADAPTIVE ENGINE</span>
              <span>//</span>
              <span className="text-tertiary font-bold uppercase">GEMMA 4 RUNNING</span>
            </div>

            <div className="flex items-center gap-space-md uppercase">
              <span>LATENCY: 12ms</span>
              <span>RETENTION: 94.2%</span>
              <span>STATUS: NOMINAL</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;

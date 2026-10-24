import React from 'react';
import { useApp } from '../context/AppContext';

export const MaintenanceCenter: React.FC = () => {
  const { maintenancePlan, refreshMaintenancePlan, setCurrentView } = useApp();

  const retentionItems = maintenancePlan?.retentionItems || [
    {
      skillId: 's1',
      skillName: 'Asynchronous Event Loop Mechanics & Microtasks',
      retentionStrength: 94,
      lastPracticedDate: 'Yesterday',
      daysUntilReviewDue: 3,
      isDue: false,
      quickCheckQuestion: 'In 2 sentences: Why do microtasks preempt the macrotask timer queue?',
      suggestedAction: 'Retention is high. Next spaced review in 3 days.',
    },
    {
      skillId: 's2',
      skillName: 'State Reactivity & Reference Semantics',
      retentionStrength: 78,
      lastPracticedDate: '2 days ago',
      daysUntilReviewDue: 1,
      isDue: false,
      quickCheckQuestion: 'What triggers Object.is shallow inequality in array mutations?',
      suggestedAction: 'Active recall drill due tomorrow to reinforce reference preservation.',
    },
    {
      skillId: 's3',
      skillName: 'API Idempotency Key Protocols & Mutex Locking',
      retentionStrength: 52,
      lastPracticedDate: '5 days ago',
      daysUntilReviewDue: 0,
      isDue: true,
      quickCheckQuestion: 'How does an idempotency header prevent double-debiting on mobile timeouts?',
      suggestedAction: '3-minute active recall drill due today.',
    },
  ];

  return (
    <div className="flex flex-col w-full pb-space-xl animate-fadeIn">
      {/* Header */}
      <div className="w-full bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md mb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-sm mb-1">
            <span className="w-3 h-3 bg-tertiary border-[1.5px] border-[#000000]"></span>
            <span className="font-label-mono text-label-mono uppercase text-on-surface-variant font-bold">
              SPACED RETENTION & RECALL PROTOCOL // EBBINGHAUS ENGINE
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md uppercase text-on-surface tracking-tight m-0 font-extrabold">
            SKILL MAINTENANCE & RETENTION STUDIO
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0">
            Prevent skill decay through evidence-calibrated active recall intervals.
          </p>
        </div>

        <button
          onClick={refreshMaintenancePlan}
          className="px-space-md py-space-xs bg-primary-container text-on-primary-container font-title text-title uppercase border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] font-bold"
        >
          RECALCULATE RETENTION
        </button>
      </div>

      {/* Grid of Retention Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg mb-space-lg">
        {retentionItems.map((item) => (
          <div
            key={item.skillId}
            className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md flex flex-col justify-between gap-space-sm"
          >
            <div>
              <div className="flex items-center justify-between border-b-[2px] border-[#000000] pb-space-xs mb-space-xs">
                <span
                  className={`px-space-xs py-0.5 font-label-mono text-[10px] font-bold uppercase border border-[#000000] ${
                    item.isDue
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-tertiary-fixed text-on-tertiary-fixed'
                  }`}
                >
                  {item.isDue ? 'DUE TODAY' : `DUE IN ${item.daysUntilReviewDue} DAYS`}
                </span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {item.retentionStrength}%
                </span>
              </div>

              <h3 className="font-title text-title uppercase text-on-surface font-bold leading-tight mb-space-xs">
                {item.skillName}
              </h3>

              <div className="w-full bg-surface-container-high h-2 border border-[#000000] mb-space-sm">
                <div
                  className="h-full bg-tertiary"
                  style={{ width: `${item.retentionStrength}%` }}
                />
              </div>

              <div className="p-space-xs bg-surface-container-low border border-[#000000] mb-space-sm">
                <span className="font-label-mono text-[10px] uppercase text-on-surface-variant font-bold block mb-0.5">
                  ACTIVE RECALL PROMPT:
                </span>
                <p className="font-body-sm text-body-sm text-on-surface m-0 italic">
                  "{item.quickCheckQuestion}"
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('task_workspace')}
              className="w-full py-space-xs bg-surface-container-high hover:bg-surface-container border-[2px] border-[#000000] font-title text-title uppercase font-bold text-on-surface shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              RUN FLASH DRILL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

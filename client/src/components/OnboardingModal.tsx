import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const OnboardingModal: React.FC = () => {
  const { setCurrentView, startNewGoal, isLoading } = useApp();
  const [ambition, setAmbition] = useState('Staff Distributed Systems Engineer');
  const [weeklyHours, setWeeklyHours] = useState(10);
  const [difficulty, setDifficulty] = useState<'intermediate' | 'advanced'>('advanced');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await startNewGoal(ambition);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[10px_10px_0px_#000000] max-w-xl w-full p-space-lg flex flex-col gap-space-md">
        <div className="flex items-center justify-between border-b-[3px] border-[#000000] pb-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="w-4 h-4 bg-primary-container border-[2px] border-[#000000]"></span>
            <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface m-0 font-bold">
              CALIBRATE NEW ADAPTIVE AMBITION
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('landing')}
            className="w-8 h-8 flex items-center justify-center bg-surface-container-high border-[2px] border-[#000000] font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
              PRIMARY TARGET ROLE / AMBITION <span className="text-secondary">*</span>
            </label>
            <input
              value={ambition}
              onChange={(e) => setAmbition(e.target.value)}
              className="bg-surface-container-lowest text-on-surface font-label-code text-label-code p-space-sm border-[2px] border-[#000000] focus:outline-none focus:shadow-[3px_3px_0px_#000000]"
              placeholder="e.g. Distributed Systems Engineer / AI Researcher"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="flex flex-col gap-space-xs">
              <label className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                WEEKLY TIME COMMITMENT:
              </label>
              <select
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="bg-surface-container-lowest font-label-code p-space-sm border-[2px] border-[#000000]"
              >
                <option value={5}>5 HRS / WEEK</option>
                <option value={10}>10 HRS / WEEK</option>
                <option value={15}>15 HRS / WEEK</option>
                <option value={20}>20+ HRS / WEEK</option>
              </select>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                TARGET LEVEL:
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="bg-surface-container-lowest font-label-code p-space-sm border-[2px] border-[#000000]"
              >
                <option value="intermediate">INTERMEDIATE LEVEL</option>
                <option value="advanced">STAFF / ADVANCED</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t-[2px] border-[#000000]">
            <button
              type="button"
              onClick={() => setCurrentView('landing')}
              className="px-space-md py-space-xs bg-surface-container-high border-[2px] border-[#000000] font-title uppercase font-bold"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-space-lg py-space-xs bg-primary-container text-on-primary-container border-[3px] border-[#000000] shadow-[3px_3px_0px_#000000] font-title uppercase font-bold"
            >
              {isLoading ? 'CALIBRATING...' : 'PROCEED TO DIAGNOSTIC →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

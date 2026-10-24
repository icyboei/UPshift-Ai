import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SettingsModal: React.FC = () => {
  const {
    setCurrentView,
    systemStatus,
    exportStateJson,
    importStateJson,
    resetAllData,
  } = useApp();

  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const ok = importStateJson(importText.trim());
    if (ok) {
      setImportStatus('SUCCESS: STATE RESTORED');
      setTimeout(() => {
        setImportStatus(null);
        setCurrentView('roadmap');
      }, 1000);
    } else {
      setImportStatus('ERROR: INVALID JSON');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[10px_10px_0px_#000000] max-w-2xl w-full p-space-lg flex flex-col gap-space-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b-[3px] border-[#000000] pb-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
            <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface m-0 font-bold">
              SYSTEM CONFIGURATION & STATE BACKUP
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('roadmap')}
            className="w-8 h-8 flex items-center justify-center bg-surface-container-high border-[2px] border-[#000000] font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-space-sm">
          <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000]">
            <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface block mb-1">
              GEMMA 4 RUNTIME STATUS:
            </span>
            <div className="flex items-center justify-between font-label-code text-label-code">
              <span>ENGINE MODE:</span>
              <span className="font-bold text-tertiary">
                {systemStatus?.mode ? systemStatus.mode.toUpperCase() : 'GEMMA_LIVE'}
              </span>
            </div>
            <div className="flex items-center justify-between font-label-code text-label-code">
              <span>LATENCY SLA:</span>
              <span className="font-bold text-primary">&lt; 50ms</span>
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
              EXPORT LEARNER JOURNEY:
            </span>
            <button
              onClick={exportStateJson}
              className="py-space-xs px-space-md bg-surface-container-high hover:bg-surface-container border-[2px] border-[#000000] font-title uppercase font-bold shadow-[2px_2px_0px_#000000]"
            >
              DOWNLOAD STATE BACKUP (.JSON)
            </button>
          </div>

          <form onSubmit={handleImport} className="flex flex-col gap-space-xs pt-space-xs border-t border-[#000000]">
            <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
              RESTORE STATE FROM JSON:
            </span>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={4}
              placeholder="Paste JSON state here..."
              className="w-full bg-surface-container-lowest border-[2px] border-[#000000] p-space-sm font-label-code text-label-code"
            />
            <div className="flex items-center justify-between mt-1">
              {importStatus && (
                <span className="font-label-mono text-label-mono font-bold text-primary">
                  {importStatus}
                </span>
              )}
              <button
                type="submit"
                className="ml-auto py-space-xs px-space-md bg-primary-container text-on-primary-container border-[2px] border-[#000000] font-title uppercase font-bold shadow-[2px_2px_0px_#000000]"
              >
                RESTORE JOURNEY
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between pt-space-sm border-t-[2px] border-[#000000]">
            <button
              onClick={resetAllData}
              className="px-space-md py-space-xs bg-error-container text-on-error-container border-[2px] border-[#000000] font-label-mono uppercase font-bold"
            >
              PURGE LOCAL DATA
            </button>

            <button
              onClick={() => setCurrentView('roadmap')}
              className="px-space-lg py-space-xs bg-surface-container-high border-[2px] border-[#000000] font-title uppercase font-bold"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

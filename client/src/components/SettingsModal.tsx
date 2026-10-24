import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Shield,
  Download,
  Upload,
  Trash2,
  X,
  Check,
  Server,
  Key,
  Lock,
} from 'lucide-react';

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
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const success = importStateJson(importText.trim());
    if (success) {
      setImportStatus('State successfully restored!');
      setTimeout(() => {
        setImportStatus(null);
        setCurrentView('roadmap');
      }, 1500);
    } else {
      setImportStatus('Invalid JSON state format.');
    }
  };

  const isLive = systemStatus?.mode === 'gemma_live';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-surface-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated relative my-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-surface-100 text-charcoal-700 font-semibold">
              Configuration & Persistence
            </span>
            <h2 className="editorial-title text-2xl font-normal text-charcoal-900">
              System Settings & Privacy
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('roadmap')}
            className="p-1.5 rounded-full text-charcoal-400 hover:text-charcoal-800 hover:bg-surface-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inference Status Card */}
        <div className="p-5 rounded-2xl bg-surface-50 border border-surface-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-charcoal-700 uppercase tracking-wide flex items-center space-x-1.5">
              <Server className="w-4 h-4 text-emeraldAccent-600" />
              <span>Inference Reasoning Engine</span>
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                isLive
                  ? 'bg-emeraldAccent-100 text-emeraldAccent-800'
                  : 'bg-surface-200 text-charcoal-700'
              }`}
            >
              {isLive ? 'Gemma 4 Live Inference' : 'High-Fidelity Simulation'}
            </span>
          </div>

          <div className="text-xs text-charcoal-600 space-y-1">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-charcoal-400">Active Model:</span>
              <span className="font-semibold text-charcoal-800">{systemStatus?.activeModel || 'gemma-2-9b-it'}</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-charcoal-400">Provider:</span>
              <span className="font-semibold text-charcoal-800">{systemStatus?.provider || 'Google AI Studio / Builtin'}</span>
            </div>
          </div>

          <p className="text-[11px] text-charcoal-500 leading-snug pt-1">
            {systemStatus?.description || 'All core features (diagnostic assessment, roadmap generation, rubric evaluations) run deterministically without dependencies.'}
          </p>
        </div>

        {/* Security & Secret Protection Guarantee */}
        <div className="p-4 rounded-xl bg-emeraldAccent-50/50 border border-emeraldAccent-200 text-xs text-charcoal-700 space-y-1">
          <div className="flex items-center space-x-1.5 font-semibold text-emeraldAccent-900">
            <Shield className="w-4 h-4 text-emeraldAccent-700" />
            <span>Strict Client-Server Isolation</span>
          </div>
          <p className="text-[11px] text-charcoal-600 leading-relaxed">
            API secrets remain securely on the Node.js backend. No credentials, tokens, or private learner submissions are ever exposed in browser bundles, Git history, or client network requests.
          </p>
        </div>

        {/* State Persistence: Export & Import */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-charcoal-900 uppercase tracking-wide">
            Persistence & Portability
          </h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={exportStateJson}
              className="flex-1 inline-flex items-center justify-center space-x-2 p-3 rounded-xl border border-surface-300 bg-white hover:bg-surface-100 text-charcoal-800 text-xs font-semibold shadow-subtle transition-all"
            >
              <Download className="w-4 h-4 text-emeraldAccent-600" />
              <span>Export Full State (JSON)</span>
            </button>
          </div>

          {/* Import JSON input */}
          <form onSubmit={handleImport} className="space-y-2 pt-2">
            <label className="block text-[11px] font-mono text-charcoal-500">
              Restore State from JSON:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste exported JSON string here..."
                className="flex-1 p-2.5 rounded-xl border border-surface-300 text-xs font-mono focus:outline-none focus:border-emeraldAccent-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-surface-50 text-xs font-semibold shadow-sm transition-all"
              >
                Restore
              </button>
            </div>
            {importStatus && (
              <div className="text-[11px] font-mono text-emeraldAccent-700 font-semibold">
                {importStatus}
              </div>
            )}
          </form>
        </div>

        {/* Destructive Reset */}
        <div className="pt-4 border-t border-surface-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-rose-800">Clear Workspace Data</div>
            <div className="text-[10px] text-charcoal-500">Resets goals, assessments, and roadmap history.</div>
          </div>

          {!resetConfirm ? (
            <button
              onClick={() => setResetConfirm(true)}
              className="px-3.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors"
            >
              Reset Data
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={resetAllData}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm"
              >
                Confirm Reset
              </button>
              <button
                onClick={() => setResetConfirm(false)}
                className="px-2 py-1.5 text-xs text-charcoal-500 hover:text-charcoal-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

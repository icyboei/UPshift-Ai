import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Calendar,
  HeartHandshake,
  Check,
  Send,
} from 'lucide-react';

export const MaintenanceCenter: React.FC = () => {
  const { maintenancePlan, refreshMaintenancePlan } = useApp();
  const [selectedSkillCheck, setSelectedSkillCheck] = useState<string | null>(null);
  const [drillAnswer, setDrillAnswer] = useState<string>('');
  const [drillSubmitted, setDrillSubmitted] = useState<boolean>(false);
  const [missedDaysInput, setMissedDaysInput] = useState<number>(0);
  const [recalibrationSuccess, setRecalibrationSuccess] = useState<boolean>(false);

  const items = maintenancePlan?.retentionItems || [
    {
      skillId: 's1',
      skillName: 'Asynchronous Event Loop Mechanics',
      retentionStrength: 92,
      lastPracticedDate: '1 day ago',
      daysUntilReviewDue: 3,
      isDue: false,
      quickCheckQuestion: 'In 2 sentences: Why do microtasks preempt the macrotask timer queue?',
      suggestedAction: 'Retention is high. Next spaced review scheduled in 3 days.',
    },
    {
      skillId: 's2',
      skillName: 'State Reactivity & Reference Semantics',
      retentionStrength: 68,
      lastPracticedDate: '4 days ago',
      daysUntilReviewDue: 0,
      isDue: true,
      quickCheckQuestion: 'What triggers Object.is shallow inequality in array mutations?',
      suggestedAction: 'Active recall drill due today to restore retention strength to 95%.',
    },
    {
      skillId: 's3',
      skillName: 'API Idempotency Key Protocols',
      retentionStrength: 48,
      lastPracticedDate: '7 days ago',
      daysUntilReviewDue: 0,
      isDue: true,
      quickCheckQuestion: 'How does an idempotency header prevent double-debiting on mobile timeouts?',
      suggestedAction: '3-minute active recall drill due today.',
    },
  ];

  const handleRunDrill = (skillId: string) => {
    setSelectedSkillCheck(skillId);
    setDrillAnswer('');
    setDrillSubmitted(false);
  };

  const handleCompleteDrill = (e: React.FormEvent) => {
    e.preventDefault();
    setDrillSubmitted(true);
  };

  const handleRecalibrateSchedule = () => {
    setRecalibrationSuccess(true);
    setTimeout(() => setRecalibrationSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emeraldAccent-100 text-emeraldAccent-800 font-semibold">
            Spaced Retention & Maintenance
          </span>
          <span className="text-xs font-mono text-charcoal-400">
            Ebbinghaus Decay Protection
          </span>
        </div>
        <h1 className="editorial-title text-3xl sm:text-4xl font-normal text-charcoal-900">
          Knowledge Retention & Recovery Center
        </h1>
        <p className="text-sm text-charcoal-600">
          Skills decay if left unpracticed. Spaced 3-minute active recall checks preserve your verified foundation over time.
        </p>
      </div>

      {/* Retention Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => {
          const isDecayed = item.retentionStrength < 65;
          return (
            <div
              key={item.skillId}
              className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                isDecayed
                  ? 'bg-amber-50/40 border-amber-200'
                  : 'bg-white border-surface-200 shadow-subtle'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-charcoal-400">
                    Practiced: {item.lastPracticedDate}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      item.isDue
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emeraldAccent-100 text-emeraldAccent-800'
                    }`}
                  >
                    {item.isDue ? 'Review Due' : 'Healthy'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-charcoal-900 leading-snug">
                  {item.skillName}
                </h3>

                {/* Retention Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-mono text-charcoal-500">
                    <span>Retention Strength</span>
                    <span className="font-semibold">{item.retentionStrength}%</span>
                  </div>
                  <div className="w-full bg-surface-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.retentionStrength > 75
                          ? 'bg-emeraldAccent-600'
                          : item.retentionStrength > 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${item.retentionStrength}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-charcoal-600 pt-1 leading-snug">
                  {item.suggestedAction}
                </p>
              </div>

              <div className="pt-3 border-t border-surface-100">
                <button
                  type="button"
                  onClick={() => handleRunDrill(item.skillId)}
                  className="w-full py-2 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-surface-50 text-xs font-semibold shadow-sm transition-all"
                >
                  Start 3-Min Recall Drill
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Recall Drill Card */}
      {selectedSkillCheck && (
        <div className="p-6 rounded-3xl bg-white border border-surface-200 shadow-subtle space-y-4 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emeraldAccent-700 font-semibold">
                Active Recall Drill
              </span>
              <h3 className="text-base font-bold text-charcoal-900">
                {items.find((i) => i.skillId === selectedSkillCheck)?.quickCheckQuestion}
              </h3>
            </div>
            <button
              onClick={() => setSelectedSkillCheck(null)}
              className="text-charcoal-400 hover:text-charcoal-700 text-xs font-mono"
            >
              ✕ Close
            </button>
          </div>

          {!drillSubmitted ? (
            <form onSubmit={handleCompleteDrill} className="space-y-3">
              <textarea
                rows={3}
                value={drillAnswer}
                onChange={(e) => setDrillAnswer(e.target.value)}
                placeholder="Explain in 2-3 sentences from memory..."
                className="w-full p-3 rounded-xl border border-surface-300 text-xs font-sans text-charcoal-900 focus:outline-none focus:border-emeraldAccent-500"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emeraldAccent-600 hover:bg-emeraldAccent-700 text-white text-xs font-semibold shadow-sm"
              >
                Submit Recall Verification
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emeraldAccent-50 border border-emeraldAccent-200 space-y-2">
              <div className="flex items-center space-x-2 text-emeraldAccent-800 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emeraldAccent-600" />
                <span>Retention Restored to 95%!</span>
              </div>
              <p className="text-xs text-charcoal-700">
                Active retrieval strengthens synaptic memory pathways far more effectively than passive re-reading. Next review scheduled in 7 days.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Non-Shaming Schedule Recovery Planner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-100 border border-surface-200 space-y-6">
        <div className="flex items-center space-x-2.5 text-charcoal-900">
          <HeartHandshake className="w-5 h-5 text-emeraldAccent-700" />
          <h3 className="text-lg font-bold">
            Zero-Guilt Schedule Recovery
          </h3>
        </div>

        <div className="text-xs text-charcoal-600 space-y-2 max-w-2xl leading-relaxed">
          <p>
            Life happens. Sick days, project crunches, and unexpected commitments are normal.
            Conventional apps generate a crushing 15-hour backlog that induces burnout and quitting.
          </p>
          <p className="font-semibold text-charcoal-800">
            UPSHIFT AI never shames you. We simply adjust upcoming milestone pacing to match your real-world rhythm.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-charcoal-700">Missed days:</span>
            <input
              type="number"
              min="0"
              max="30"
              value={missedDaysInput}
              onChange={(e) => setMissedDaysInput(parseInt(e.target.value, 10) || 0)}
              className="w-16 p-2 rounded-lg border border-surface-300 text-xs font-mono text-center"
            />
          </div>

          <button
            type="button"
            onClick={handleRecalibrateSchedule}
            className="px-5 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-surface-50 text-xs font-semibold shadow-sm transition-all hover:scale-[1.02]"
          >
            Recalibrate Target Timeframe
          </button>

          {recalibrationSuccess && (
            <span className="text-xs text-emeraldAccent-700 font-semibold flex items-center space-x-1 animate-fadeIn">
              <Check className="w-4 h-4" />
              <span>Pacing smoothed out. Backlog neutralized!</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

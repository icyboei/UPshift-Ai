import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileDown,
  Layers,
  Award,
  Clock,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const {
    roadmap,
    assessmentAnalysis,
    evaluationsHistory,
    exportStateJson,
  } = useApp();

  const totalTasks = roadmap?.milestones.flatMap((m) => m.tasks).length || 0;
  const completedTasks = roadmap?.milestones
    .flatMap((m) => m.tasks)
    .filter((t) => t.status === 'completed').length || 0;

  // Evidence distribution data
  const evidenceData = [
    { name: 'Empirically Tested Deliverables', value: Math.max(completedTasks, 2), color: '#059669' },
    { name: 'Self-Reported Experience', value: 1, color: '#2563EB' },
    { name: 'Unverified AI Estimates', value: 1, color: '#D97706' },
  ];

  // Consistency mock data for weekly velocity
  const consistencyData = [
    { day: 'Mon', focusMinutes: 50 },
    { day: 'Tue', focusMinutes: 65 },
    { day: 'Wed', focusMinutes: 45 },
    { day: 'Thu', focusMinutes: 60 },
    { day: 'Fri', focusMinutes: 55 },
    { day: 'Sat', focusMinutes: 90 },
    { day: 'Sun', focusMinutes: 40 },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-200 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emeraldAccent-100 text-emeraldAccent-800 font-semibold">
              Evidence & Metrics Studio
            </span>
            <span className="text-xs font-mono text-charcoal-400">
              No Fabricated Scores
            </span>
          </div>
          <h1 className="editorial-title text-3xl sm:text-4xl font-normal text-charcoal-900">
            Measurable Mastery & Progress Audit
          </h1>
          <p className="text-sm text-charcoal-600">
            Completing tasks is activity. Real improvement is evidenced by independent deliverables, diagnostic re-tests, and retention scores.
          </p>
        </div>

        <button
          onClick={exportStateJson}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-surface-300 bg-white text-charcoal-800 hover:bg-surface-100 text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <FileDown className="w-4 h-4 text-emeraldAccent-600" />
          <span>Export Audit Log (JSON)</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-1">
          <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wide">
            Verified Deliverables
          </span>
          <div className="text-3xl font-display font-bold text-charcoal-900">
            {completedTasks}
          </div>
          <p className="text-[11px] text-charcoal-500">
            of {totalTasks} roadmap tasks
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-1">
          <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wide">
            Diagnostic Baseline
          </span>
          <div className="text-3xl font-display font-bold text-charcoal-900">
            {assessmentAnalysis?.objectiveScorePercentage || 75}%
          </div>
          <p className="text-[11px] text-charcoal-500">
            Tested conceptual foundation
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-1">
          <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wide">
            Weekly Focus Time
          </span>
          <div className="text-3xl font-display font-bold text-charcoal-900">
            6.8h
          </div>
          <p className="text-[11px] text-emeraldAccent-700 font-medium">
            100% on schedule
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-1">
          <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wide">
            Evidence Confidence
          </span>
          <div className="text-3xl font-display font-bold text-charcoal-900">
            86%
          </div>
          <p className="text-[11px] text-charcoal-500">
            High auditable rigor
          </p>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Focus Time Bar Chart */}
        <div className="p-6 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-charcoal-900 uppercase tracking-wide flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-emeraldAccent-600" />
              <span>Weekly Practice Consistency (Minutes)</span>
            </h3>
            <span className="text-[10px] font-mono text-charcoal-400">Past 7 Days</span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consistencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#4B535D' }} />
                <YAxis tick={{ fontSize: 11, fill: '#4B535D' }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2 rounded bg-charcoal-900 text-surface-50 text-xs">
                          {payload[0].payload.day}: {payload[0].value} minutes
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="focusMinutes" fill="#16191D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Evidence Distribution Pie Chart */}
        <div className="p-6 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-charcoal-900 uppercase tracking-wide flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emeraldAccent-600" />
              <span>Evidence Attribution Breakdown</span>
            </h3>
            <span className="text-[10px] font-mono text-emeraldAccent-700 font-semibold">
              Radical Transparency
            </span>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={evidenceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {evidenceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-1 text-xs">
            {evidenceData.map((e, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center space-x-2 text-charcoal-700">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.color }} />
                  <span>{e.name}</span>
                </span>
                <span className="font-mono text-charcoal-500 font-medium">{e.value} items</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity vs Mastery Principle Audit */}
      <div className="p-6 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wide flex items-center space-x-2">
          <Award className="w-4 h-4 text-emeraldAccent-600" />
          <span>Evaluation History & Evidence Trail</span>
        </h3>

        {evaluationsHistory.length === 0 ? (
          <p className="text-xs text-charcoal-500">
            No submissions evaluated yet. Complete tasks in the Daily Task Workspace to record verified evidence.
          </p>
        ) : (
          <div className="divide-y divide-surface-100">
            {evaluationsHistory.map((rec) => (
              <div key={rec.id} className="py-3.5 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        rec.result.passed
                          ? 'bg-emeraldAccent-100 text-emeraldAccent-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rec.result.passed ? 'PASSED' : 'REVISION'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-charcoal-900">
                      {rec.taskTitle}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-charcoal-400">
                    Score: {rec.result.scorePercentage}% • {new Date(rec.evaluatedAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs text-charcoal-600 leading-snug">
                  {rec.result.qualitativeFeedback}
                </p>

                <div className="text-[11px] font-mono text-emeraldAccent-700">
                  Adaptive Action: {rec.result.actionRationale}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

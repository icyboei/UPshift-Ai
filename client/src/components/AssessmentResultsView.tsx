import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  Sparkles,
  BarChart,
  Layers,
  Lock,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

export const AssessmentResultsView: React.FC = () => {
  const {
    assessmentAnalysis,
    goalContext,
    generateRoadmapFromResults,
    isLoading,
    error,
    setCurrentView,
  } = useApp();

  if (!assessmentAnalysis) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <p className="text-charcoal-600">No diagnostic assessment results found.</p>
        <button
          onClick={() => setCurrentView('onboarding')}
          className="px-4 py-2 bg-emeraldAccent-600 text-white rounded-lg text-sm font-semibold"
        >
          Take Baseline Assessment
        </button>
      </div>
    );
  }

  // Prepare chart data
  const chartData = [
    ...assessmentAnalysis.demonstratedStrengths.map(s => ({
      name: s.skillName.length > 22 ? s.skillName.slice(0, 20) + '...' : s.skillName,
      fullName: s.skillName,
      score: s.confidenceScore,
      status: 'Mastered',
      color: '#059669', // Emerald
    })),
    ...assessmentAnalysis.identifiedGaps.map(g => ({
      name: g.skillName.length > 22 ? g.skillName.slice(0, 20) + '...' : g.skillName,
      fullName: g.skillName,
      score: g.confidenceScore,
      status: g.isPrerequisiteBlocker ? 'Blocker Gap' : 'Target Gap',
      color: g.isPrerequisiteBlocker ? '#DC2626' : '#D97706', // Red or Amber
    })),
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emeraldAccent-100 text-emeraldAccent-800 font-semibold">
            Diagnostic Baseline Analysis
          </span>
          <span className="text-xs font-mono text-charcoal-500">
            Engine: {assessmentAnalysis.engineUsed === 'gemma_live' ? 'Gemma 4 Live' : 'High-Fidelity Engine'}
          </span>
        </div>
        <h1 className="editorial-title text-3xl sm:text-4xl font-normal text-charcoal-900">
          Your Empirical Skill Map & Prerequisite Health
        </h1>
        <p className="text-sm text-charcoal-600">
          Evaluated against: <span className="font-semibold text-charcoal-800">{goalContext?.targetSkill || 'Target Skill'}</span>
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
          {error}
        </div>
      )}

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-1">
          <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wide">
            Objective Diagnostic Score
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-display font-bold text-charcoal-900">
              {assessmentAnalysis.objectiveScorePercentage}%
            </span>
            <span className="text-xs text-charcoal-500 font-mono">
              ({assessmentAnalysis.overallProficiencyBand})
            </span>
          </div>
          <p className="text-[11px] text-charcoal-500 pt-1">
            Empirical score based on tested questions.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-1">
          <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wide">
            Diagnostic Uncertainty
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-display font-bold text-charcoal-900">
              {assessmentAnalysis.uncertaintyScore}%
            </span>
            <span className="text-xs text-emeraldAccent-700 font-mono font-medium">
              (Low Variance)
            </span>
          </div>
          <p className="text-[11px] text-charcoal-500 pt-1">
            Uncertainty shrinks as more daily deliverables are verified.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-1">
          <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wide">
            Recommended Starting Point
          </span>
          <div className="text-sm font-semibold text-charcoal-900 pt-1 leading-snug">
            {assessmentAnalysis.recommendedStartingMilestone}
          </div>
          <p className="text-[11px] text-emeraldAccent-700 font-medium pt-1">
            Prerequisite sequence calibrated.
          </p>
        </div>
      </div>

      {/* Chart: Empirical Skill Proficiency Distribution */}
      <div className="p-6 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wide flex items-center space-x-2">
            <BarChart className="w-4 h-4 text-emeraldAccent-600" />
            <span>Demonstrated Proficiency by Prerequisite</span>
          </h3>
          <div className="flex items-center space-x-3 text-[11px] font-mono text-charcoal-500">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emeraldAccent-600" />
              <span>Mastered</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-600" />
              <span>Gap</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-600" />
              <span>Blocker</span>
            </span>
          </div>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#4B535D' }}
                interval={0}
                angle={-10}
                textAnchor="end"
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#4B535D' }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2.5 rounded-lg bg-charcoal-900 text-surface-50 text-xs shadow-elevated">
                        <div className="font-semibold">{data.fullName}</div>
                        <div className="text-emeraldAccent-400 font-mono mt-0.5">
                          Score: {data.score}% ({data.status})
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gemma 4 Qualitative Diagnostic Summary */}
      <div className="p-6 rounded-2xl bg-surface-50 border border-emeraldAccent-200/80 shadow-subtle space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-emeraldAccent-800">
          <BrainCircuit className="w-4 h-4 text-emeraldAccent-600" />
          <span>GEMMA 4 QUALITATIVE DIAGNOSTIC EVALUATION</span>
        </div>
        <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-sans">
          {assessmentAnalysis.qualitativeSummary}
        </p>
      </div>

      {/* Detailed Strengths & Gaps Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Demonstrated Strengths */}
        <div className="p-5 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-3">
          <div className="flex items-center space-x-2 text-emeraldAccent-800 font-semibold text-xs uppercase tracking-wide">
            <CheckCircle2 className="w-4 h-4 text-emeraldAccent-600" />
            <span>Demonstrated Strengths ({assessmentAnalysis.demonstratedStrengths.length})</span>
          </div>
          <div className="space-y-2.5">
            {assessmentAnalysis.demonstratedStrengths.map((str, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-surface-50 border border-surface-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-charcoal-900">{str.skillName}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emeraldAccent-100 text-emeraldAccent-800">
                    {str.confidenceScore}% Verified
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-600 leading-snug">{str.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Identified Gaps & Missing Prerequisites */}
        <div className="p-5 rounded-2xl bg-white border border-surface-200 shadow-subtle space-y-3">
          <div className="flex items-center space-x-2 text-amber-800 font-semibold text-xs uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Prerequisite Gaps to Reinforce ({assessmentAnalysis.identifiedGaps.length})</span>
          </div>
          <div className="space-y-2.5">
            {assessmentAnalysis.identifiedGaps.map((gap, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border space-y-1 ${
                  gap.isPrerequisiteBlocker
                    ? 'bg-rose-50/50 border-rose-200'
                    : 'bg-amber-50/50 border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-charcoal-900 flex items-center space-x-1.5">
                    {gap.isPrerequisiteBlocker && <Lock className="w-3 h-3 text-rose-600" />}
                    <span>{gap.skillName}</span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-charcoal-700 border border-surface-200">
                    {gap.confidenceScore}% Mastery
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-600 leading-snug">{gap.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA to Generate Roadmap */}
      <div className="p-6 rounded-2xl bg-charcoal-900 text-surface-50 border border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-display text-lg font-semibold text-surface-50">
            Generate Dependency-Aware Roadmap
          </h4>
          <p className="text-xs text-charcoal-400">
            Gemma 4 will sequence your milestones so all prerequisite gaps are resolved before complex topics.
          </p>
        </div>

        <button
          onClick={generateRoadmapFromResults}
          disabled={isLoading}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emeraldAccent-600 hover:bg-emeraldAccent-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105 disabled:opacity-50 flex-shrink-0"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Synthesizing Roadmap...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Ethical Transparency Disclaimer */}
      <div className="text-center text-[11px] font-mono text-charcoal-400">
        {assessmentAnalysis.evidenceDisclaimer}
      </div>
    </div>
  );
};

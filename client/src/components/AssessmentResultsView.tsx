import React from 'react';
import { useApp } from '../context/AppContext';

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
      <div className="max-w-2xl mx-auto p-space-lg bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] text-center my-space-lg">
        <p className="font-label-mono uppercase font-bold text-on-surface mb-space-sm">
          NO DIAGNOSTIC ASSESSMENT RESULTS FOUND.
        </p>
        <button
          onClick={() => setCurrentView('landing')}
          className="px-space-lg py-space-sm bg-primary-container text-on-primary-container font-title uppercase font-bold border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]"
        >
          START ASSESSMENT
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-space-xl animate-fadeIn">
      {/* Top Banner */}
      <div className="w-full bg-surface-container-lowest border-[3px] border-[#000000] shadow-[8px_8px_0px_#000000] p-space-md mb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-sm mb-1">
            <span className="w-3 h-3 bg-tertiary-fixed border-[1.5px] border-[#000000]"></span>
            <span className="font-label-mono text-label-mono uppercase text-on-surface-variant font-bold">
              DIAGNOSTIC MATRIX // GEMMA 4 CALIBRATION COMPLETE
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md uppercase text-on-surface tracking-tight m-0 font-extrabold">
            YOUR EMPIRICAL BASELINE & GAP ANALYSIS
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0">
            Target Ambition: <span className="font-bold text-on-surface">{goalContext?.targetSkill || goalContext?.clarifiedGoal || 'Distributed Systems Engineer'}</span>
          </p>
        </div>

        <button
          onClick={generateRoadmapFromResults}
          disabled={isLoading}
          className="px-space-lg py-space-sm bg-primary-container text-on-primary-container border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] font-title text-title uppercase font-bold hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] transition-all shrink-0"
        >
          {isLoading ? 'BUILDING ROADMAP...' : 'BUILD ADAPTIVE ROADMAP →'}
        </button>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-lg">
        {/* Identified Gaps */}
        <div className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md flex flex-col gap-space-sm">
          <div className="flex items-center justify-between border-b-[2px] border-[#000000] pb-space-xs">
            <span className="font-title text-title uppercase font-bold text-secondary">
              IDENTIFIED SKILL GAPS (CRITICAL PREREQUISITES)
            </span>
            <span className="px-space-xs py-0.5 bg-secondary-container text-on-secondary-container font-label-mono text-[10px] font-bold border border-[#000000]">
              {assessmentAnalysis.identifiedGaps.length} GAPS
            </span>
          </div>
          <div className="flex flex-col gap-space-xs">
            {assessmentAnalysis.identifiedGaps.map((gap, idx) => (
              <div
                key={idx}
                className="p-space-xs bg-surface-container-low border border-[#000000] flex items-center gap-space-sm"
              >
                <span className="w-2.5 h-2.5 bg-secondary"></span>
                <span className="font-label-code text-label-code font-bold text-on-surface">
                  {gap.skillName}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Demonstrated Strengths */}
        <div className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md flex flex-col gap-space-sm">
          <div className="flex items-center justify-between border-b-[2px] border-[#000000] pb-space-xs">
            <span className="font-title text-title uppercase font-bold text-tertiary">
              VERIFIED STRENGTHS
            </span>
            <span className="px-space-xs py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-[10px] font-bold border border-[#000000]">
              {assessmentAnalysis.demonstratedStrengths.length} VERIFIED
            </span>
          </div>
          <div className="flex flex-col gap-space-xs">
            {assessmentAnalysis.demonstratedStrengths.map((str, idx) => (
              <div
                key={idx}
                className="p-space-xs bg-surface-container-low border border-[#000000] flex items-center gap-space-sm"
              >
                <span className="w-2.5 h-2.5 bg-tertiary"></span>
                <span className="font-label-code text-label-code font-bold text-on-surface">
                  {str.skillName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Synthesis */}
      <div className="bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] p-space-md flex flex-col gap-space-xs mb-space-lg">
        <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
          GEMMA 4 PREREQUISITE SYNTHESIS:
        </span>
        <p className="font-body-md text-body-md text-on-surface-variant m-0">
          {assessmentAnalysis.qualitativeSummary}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={generateRoadmapFromResults}
          disabled={isLoading}
          className="px-space-xl py-space-sm bg-primary-container text-on-primary-container border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] font-title text-title uppercase font-bold hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000000] transition-all"
        >
          {isLoading ? 'GENERATING SEQUENCE...' : 'CONTINUE TO ADAPTIVE ROADMAP →'}
        </button>
      </div>
    </div>
  );
};

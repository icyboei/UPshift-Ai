import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionSubmission } from '../types';

export const AssessmentStudio: React.FC = () => {
  const {
    setCurrentView,
    goalContext,
    baselineAssessment,
    submitAssessment,
    isLoading,
  } = useApp();

  const questions = baselineAssessment?.questions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { optionIdx?: number; text: string; confidence: 'low' | 'medium' | 'high' }>>({});
  const [artifacts, setArtifacts] = useState<Array<{ name: string; tag: string }>>([
    { name: 'github_profile_evidence.json', tag: 'SELF-REPORTED' },
  ]);

  const currentQ = questions[currentIdx] || {
    id: 'q1',
    category: 'conceptual',
    difficulty: 'foundational',
    prerequisiteTested: 'Asynchronous Event Loop & Call Stack',
    prompt: 'In a modern JavaScript/TypeScript runtime, what is the exact execution order of synchronous tasks, microtasks (Promises), and macrotasks (setTimeout)?',
    sampleCodeSnippet: `console.log('1: Start');
setTimeout(() => console.log('2: Timer'), 0);
Promise.resolve().then(() => console.log('3: Microtask'));
console.log('4: End');`,
    options: [
      '1: Start, 2: Timer, 3: Microtask, 4: End',
      '1: Start, 4: End, 3: Microtask, 2: Timer',
      '1: Start, 4: End, 2: Timer, 3: Microtask',
      '3: Microtask, 1: Start, 4: End, 2: Timer',
    ],
    evaluationRubric: 'Synchronous executes first, then microtask queue drains, then macrotask timer runs.',
  };

  const handleSelectOption = (optIdx: number, optText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...(prev[currentQ.id] || {}),
        optionIdx: optIdx,
        text: optText,
        confidence: prev[currentQ.id]?.confidence || 'high',
      },
    }));
  };

  const handleSetConfidence = (conf: 'low' | 'medium' | 'high') => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...(prev[currentQ.id] || { text: '' }),
        confidence: conf,
      },
    }));
  };

  const handleUploadArtifact = () => {
    const name = 'project_repo_' + Math.floor(Math.random() * 900 + 100) + '.git';
    setArtifacts((prev) => [...prev, { name, tag: 'VERIFIED EVIDENCE' }]);
  };

  const handleSubmitAll = async () => {
    const activeQuestions = questions.length > 0 ? questions : [currentQ];
    const submissions: QuestionSubmission[] = activeQuestions.map((q) => {
      const ans = answers[q.id];
      return {
        questionId: q.id,
        userAnswer: ans?.text || (q.options ? q.options[ans?.optionIdx ?? 1] : 'Completed'),
        selectedOptionIndex: ans?.optionIdx ?? 1,
        selfAssessedConfidence: ans?.confidence || 'medium',
      };
    });

    await submitAssessment(submissions);
  };

  const selectedOptIdx = answers[currentQ.id]?.optionIdx;
  const currentConfidence = answers[currentQ.id]?.confidence || 'high';

  return (
    <div className="flex flex-col w-full pb-space-xl animate-fadeIn max-w-6xl mx-auto">
      {/* Top Banner / Assessment Identity Strip */}
      <section className="w-full bg-surface-container-lowest border-[3px] border-black p-space-md lg:p-space-lg mb-space-lg shadow-[6px_6px_0px_#000000]">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-[2px] border-black pb-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-primary border-[2px] border-black"></span>
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface font-bold">
                TRACK: {goalContext?.targetSkill ? goalContext.targetSkill.toUpperCase() : 'FULL-STACK SOFTWARE ENGINEERING'} // DIAGNOSTIC BASELINE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-mono text-label-mono uppercase px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed border-[2px] border-black font-bold">
                STAGE: PREREQUISITE DIAGNOSTIC
              </span>
              <span className="font-label-mono text-label-mono uppercase px-2 py-0.5 bg-surface-container-high text-on-surface border-[2px] border-black font-bold">
                BUDGET: {goalContext?.dailyHours ? `${goalContext.dailyHours * 7} HRS/WK` : '10 HRS/WK'}
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="inline-block px-2 py-0.5 bg-secondary-container text-on-secondary-container font-label-mono text-label-mono uppercase border-[2px] border-black mb-2 shadow-[2px_2px_0px_#000000] font-bold">
                EMPIRICAL CAPABILITY PROBE
              </div>
              <h1 className="font-headline-md text-headline-md lg:font-headline-lg lg:text-headline-lg uppercase text-on-surface tracking-tight font-black m-0">
                FOUNDATIONAL SKILLS & PREREQUISITE ASSESSMENT
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1 m-0">
                Test your conceptual understanding and code reasoning against real prerequisites. Your responses isolate exactly where your roadmap should begin.
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-2 shrink-0">
              <div className="border-[2px] border-black bg-surface-container-lowest p-2 shadow-[3px_3px_0px_#000000]">
                <p className="font-label-mono text-label-mono text-on-surface-variant uppercase text-[10px] font-bold m-0">
                  ASSESSMENT PROGRESS
                </p>
                <p className="font-title text-title uppercase text-primary font-black m-0">
                  {questions.length > 0 ? `${currentIdx + 1} OF ${questions.length}` : '1 OF 3'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual-Column Bento Workspace */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT COLUMN: Diagnostic Question Console (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="border-[3px] border-black bg-surface-container-lowest shadow-[6px_6px_0px_#000000] flex flex-col">
            {/* Question Header */}
            <div className="p-space-md border-b-[3px] border-black bg-surface-container-low flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-primary border-[2px] border-black"></span>
                <span className="font-title text-title uppercase font-bold text-on-surface">
                  PROBE #{currentIdx + 1} // {currentQ.category.toUpperCase()}
                </span>
              </div>
              <span className="px-2 py-0.5 border-[2px] border-black bg-primary-container text-on-primary-container font-label-mono text-label-mono uppercase font-bold">
                DIFFICULTY: {currentQ.difficulty.toUpperCase()}
              </span>
            </div>

            <div className="p-space-lg flex flex-col gap-space-md bg-surface-bright">
              {/* Prerequisite Tested Banner */}
              <div className="flex items-center gap-2 p-2 bg-surface-container-low border-[2px] border-black">
                <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                  PREREQUISITE PROBED:
                </span>
                <span className="font-label-code text-label-code font-bold text-secondary">
                  {currentQ.prerequisiteTested}
                </span>
              </div>

              {/* Prompt */}
              <div className="p-space-md border-[2px] border-black bg-surface-container-lowest shadow-[3px_3px_0px_#000000]">
                <p className="font-body-lg text-body-lg text-on-surface font-semibold leading-relaxed m-0">
                  {currentQ.prompt}
                </p>
              </div>

              {/* Code Snippet Box */}
              {currentQ.sampleCodeSnippet && (
                <div className="border-[2px] border-black bg-surface-container-highest shadow-[3px_3px_0px_#000000]">
                  <div className="flex items-center justify-between border-b-[2px] border-black bg-surface-container px-3 py-1 font-label-mono text-label-mono font-bold">
                    <span>CODE INSPECTION TARGET</span>
                    <span>JAVASCRIPT / TYPESCRIPT</span>
                  </div>
                  <pre className="p-3 font-label-code text-label-code text-on-surface overflow-x-auto leading-5 select-text m-0 whitespace-pre">
                    {currentQ.sampleCodeSnippet}
                  </pre>
                </div>
              )}

              {/* Multiple Choice Options */}
              {currentQ.options && (
                <div className="flex flex-col gap-2.5">
                  <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                    SELECT YOUR ANSWER:
                  </span>
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOptIdx === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(optIdx, opt)}
                        className={`p-space-sm border-[2px] border-black text-left flex items-start gap-3 transition-all ${
                          isSelected
                            ? 'bg-primary-container text-on-primary-container shadow-[4px_4px_0px_#000000] translate-x-[2px]'
                            : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high shadow-[2px_2px_0px_#000000]'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 flex items-center justify-center border-[2px] border-black shrink-0 font-bold font-label-mono text-xs ${
                            isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="font-body-md text-body-md font-medium leading-relaxed">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Confidence Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-space-xs border-t-[2px] border-black">
                <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                  HOW CONFIDENT ARE YOU IN THIS ANSWER?
                </span>
                <div className="flex items-center gap-2">
                  {(['low', 'medium', 'high'] as const).map((conf) => (
                    <button
                      key={conf}
                      type="button"
                      onClick={() => handleSetConfidence(conf)}
                      className={`px-3 py-1 font-label-mono text-label-mono uppercase font-bold border-[2px] border-black transition-all ${
                        currentConfidence === conf
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed shadow-[2px_2px_0px_#000000]'
                          : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      {conf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-space-sm border-t-[2px] border-black">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                  className="px-space-md py-space-xs border-[2px] border-black bg-surface-container-high disabled:opacity-40 font-title uppercase font-bold text-on-surface"
                >
                  ? PREVIOUS
                </button>

                <div className="flex items-center gap-2">
                  {currentIdx < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentIdx((p) => p + 1)}
                      className="px-space-lg py-space-xs border-[3px] border-black bg-primary-container text-on-primary-container shadow-[3px_3px_0px_#000000] font-title uppercase font-bold hover:translate-x-[1px] hover:translate-y-[1px]"
                    >
                      NEXT PROBE ?
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitAll}
                      disabled={isLoading}
                      className="px-space-xl py-space-xs border-[3px] border-black bg-secondary-container text-on-secondary-container shadow-[4px_4px_0px_#000000] font-title uppercase font-black hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                      {isLoading ? 'ANALYZING MATRIX...' : 'SUBMIT DIAGNOSTIC & ANALYZE GAPS ?'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Diagnostic Matrix Preview & Evidence Dock (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* CARD 01: CAPABILITY RADAR PREVIEW */}
          <div className="border-[3px] border-black bg-surface-container-lowest shadow-[6px_6px_0px_#000000] flex flex-col">
            <div className="p-space-md border-b-[3px] border-black bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-tertiary border-[2px] border-black"></span>
                <span className="font-title text-title uppercase font-bold text-on-surface">
                  DIAGNOSTIC CRITERIA
                </span>
              </div>
              <span className="font-label-mono text-label-mono uppercase px-2 py-0.5 bg-surface-container border-[2px] border-black text-on-surface font-bold">
                PREREQUISITE MATRIX
              </span>
            </div>

            <div className="p-space-md flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center font-label-mono text-label-mono uppercase font-bold">
                  <span className="text-on-surface">RUNTIME EXECUTION & CONTROL FLOW</span>
                  <span className="text-tertiary">EVALUATING</span>
                </div>
                <div className="w-full h-3 bg-surface-container-high border-[2px] border-black">
                  <div className="h-full bg-tertiary-container w-[75%] border-r-[2px] border-black" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center font-label-mono text-label-mono uppercase font-bold">
                  <span className="text-on-surface">STATE REACTIVITY & IMMUTABILITY</span>
                  <span className="text-primary font-bold">EVALUATING</span>
                </div>
                <div className="w-full h-3 bg-surface-container-high border-[2px] border-black">
                  <div className="h-full bg-primary-container w-[60%] border-r-[2px] border-black" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center font-label-mono text-label-mono uppercase font-bold">
                  <span className="text-on-surface">NETWORK RESILIENCY & IDEMPOTENCY</span>
                  <span className="text-on-surface-variant font-bold">EVALUATING</span>
                </div>
                <div className="w-full h-3 bg-surface-container-high border-[2px] border-black">
                  <div className="h-full bg-outline w-[40%] border-r-[2px] border-black" />
                </div>
              </div>

              <div className="mt-1 border-[2px] border-black bg-surface-container-high p-2.5">
                <p className="font-label-mono text-label-mono uppercase text-on-surface font-bold m-0 leading-tight">
                  <span className="bg-primary text-on-primary px-1 mr-1">NOTE</span>
                  Diagnostic scores reflect observed code comprehension, not general innate intelligence.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 02: EVIDENCE DOCK */}
          <div className="border-[3px] border-black bg-surface-container-lowest shadow-[6px_6px_0px_#000000] flex flex-col">
            <div className="p-space-md border-b-[3px] border-black bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-primary-container border-[2px] border-black"></span>
                <span className="font-title text-title uppercase font-bold text-on-surface">
                  SUPPORTING EVIDENCE
                </span>
              </div>
              <span className="font-label-mono text-label-mono uppercase px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed border-[2px] border-black font-bold">
                OPTIONAL
              </span>
            </div>

            <div className="p-space-md flex flex-col gap-3">
              <div
                onClick={handleUploadArtifact}
                className="border-[3px] border-dashed border-black bg-surface-container-low p-4 text-center cursor-pointer hover:bg-surface-container transition-colors flex flex-col items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[28px] text-on-surface">
                  cloud_upload
                </span>
                <p className="font-title text-title uppercase font-bold text-on-surface m-0">
                  ATTACH GITHUB REPO OR CODE SAMPLE
                </p>
                <p className="font-label-mono text-label-mono uppercase text-on-surface-variant m-0 text-xs">
                  SUPPORTS CODE COMMITS, REPOSITORY URLS, OR CODE SNIPPETS
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {artifacts.map((art, idx) => (
                  <div
                    key={idx}
                    className="border-[2px] border-black bg-surface-container-lowest p-2 shadow-[2px_2px_0px_#000000] flex items-center justify-between"
                  >
                    <span className="font-label-code text-label-code text-on-surface font-semibold truncate">
                      {art.name}
                    </span>
                    <span className="font-label-mono text-[10px] uppercase px-1.5 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed border border-black font-bold">
                      {art.tag}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSubmitAll}
                disabled={isLoading}
                className="w-full mt-2 py-2.5 bg-secondary-container text-on-secondary-container font-headline-sm text-headline-sm uppercase font-black border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                {isLoading ? 'ANALYZING MATRIX...' : 'FINISH & VIEW GAP MATRIX ?'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

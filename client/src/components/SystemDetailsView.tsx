import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SystemDetailsView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    subject: '',
    nodeId: '',
    severity: 'TUNEUP',
    email: '',
    message: '',
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ subject: '', nodeId: '', severity: 'TUNEUP', email: '', message: '' });
  };

  return (
    <div className="w-full pb-space-xl animate-fadeIn">
      {/* Top Banner / Headline Unit */}
      <section className="flex flex-col mb-space-lg">
        <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-block w-3 h-3 bg-primary-container border border-[#000000]"></span>
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant font-bold">
              LEARNING FRAMEWORK // GEMMA 2 REASONING
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="px-space-sm py-space-xs bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono font-bold uppercase border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
              MODEL: GEMMA 2
            </span>
            <span className="px-space-sm py-space-xs bg-surface-container-highest text-on-surface font-label-mono text-label-mono font-bold uppercase border-[2px] border-[#000000]">
              PWA: OFFLINE-READY
            </span>
          </div>
        </div>

        <div className="flex flex-col bg-surface-container-lowest p-space-md border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] relative overflow-hidden">
          <div className="flex flex-col z-10">
            <h1 className="font-headline-lg text-headline-lg uppercase text-on-surface tracking-tight leading-none mb-space-xs">
              YOUR PERSONAL GROWTH ROADMAP & ADAPTIVE SPECS
            </h1>
            <p className="font-title text-title uppercase tracking-wide text-on-surface-variant">
              PREREQUISITE-AWARE PLANNING, EVIDENCE-BASED VALIDATION & MENTOR DIRECTORY
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 pointer-events-none hidden md:flex flex-col justify-around text-on-surface select-none font-label-mono text-[9px] uppercase leading-tight pr-space-md text-right">
            <span>[UPSHIFT_AI]</span>
            <span>GEMMA4_E2B</span>
            <span>PREREQ_GRAPH</span>
            <span>HACKTOBER_PWA</span>
          </div>
        </div>
      </section>

      {/* Thank You Callout */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md p-space-lg mb-space-lg bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000] relative overflow-hidden">
        <div className="flex items-start gap-space-md z-10">
          <div className="w-12 h-12 bg-primary-container border-[2px] border-[#000000] shadow-[3px_3px_0px_#000000] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px] text-on-surface">
              military_tech
            </span>
          </div>
          <div className="flex flex-col gap-space-xs">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="px-space-xs py-[2px] bg-tertiary-fixed border-[2px] border-[#000000] font-label-mono text-label-mono text-on-tertiary-fixed font-bold uppercase">
                [COMMUNITY COMMITMENT]
              </span>
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider font-bold">
                MEASURABLE OUTCOMES & MASTERY
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface tracking-tight font-bold">
              THANK YOU FOR COMMITTING TO YOUR GROWTH
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              UPSHIFT AI helps millions of learners turn ambition into measurable progress with Gemma 4, structured roadmaps, and daily actionable steps.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-col items-start md:items-end justify-between gap-space-xs z-10 shrink-0 border-t md:border-t-0 md:border-l md:pl-space-md border-[#000000] pt-space-sm md:pt-0">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-tertiary text-[16px]">
              verified
            </span>
            <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
              ADAPTIVE ENGINE: READY
            </span>
          </div>
          <span className="font-label-code text-label-code text-on-surface-variant">
            LATENCY: OPTIMAL // &lt; 50MS
          </span>
          <div className="flex items-center gap-space-xs mt-space-xs">
            <span className="px-space-xs py-[1px] bg-surface-container-high border-[1px] border-[#000000] font-label-mono text-label-mono font-bold uppercase text-on-surface">
              HACKTOBERFEST PWA
            </span>
            <span className="px-space-xs py-[1px] bg-primary-fixed border-[1px] border-[#000000] font-label-mono text-label-mono font-bold uppercase text-on-primary-fixed">
              GEMMA 2 ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* 12-Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        {/* LEFT COLUMN: System Specs (Span 7) */}
        <div className="xl:col-span-7 flex flex-col gap-space-lg">
          {/* CARD 1: Specs */}
          <section className="flex flex-col bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000]">
            <div className="bg-surface-container p-space-md flex items-center justify-between border-b-[2px] border-[#000000]">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">memory</span>
                <h2 className="font-title text-title uppercase text-on-surface tracking-wider">
                  01 // GEMMA 4 ADAPTIVE ENGINE SPECS
                </h2>
              </div>
              <span className="font-label-mono text-label-mono uppercase px-space-xs py-[2px] bg-primary text-on-primary font-bold border border-[#000000]">
                VERIFIED
              </span>
            </div>

            <div className="p-space-lg flex flex-col gap-space-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="bg-surface-container-low p-space-md flex flex-col justify-between border-[2px] border-[#000000]">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-space-xs block">
                    PRIMARY REASONING MODEL
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface uppercase">
                    GEMMA 2 (9B / 27B INSTRUCTION-TUNED)
                  </span>
                  <div className="mt-space-sm flex items-center gap-space-xs text-tertiary">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span className="font-label-mono text-label-mono uppercase font-bold">
                      PREREQUISITE REASONING CHAIN
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-md flex flex-col justify-between border-[2px] border-[#000000]">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-space-xs block">
                    ON-DEVICE RUNTIME
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface uppercase">
                    GEMMA 2 / DETERMINISTIC ENGINE
                  </span>
                  <div className="mt-space-sm flex items-center gap-space-xs text-on-surface-variant">
                    <span className="font-label-mono text-label-mono uppercase">
                      LOCAL OFFLINE PWA ACCELERATION
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-md flex flex-col justify-between border-[2px] border-[#000000]">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-space-xs block">
                    EVALUATION RIGOR
                  </span>
                  <div className="flex flex-col gap-space-xs">
                    <span className="font-headline-sm text-headline-sm text-on-surface uppercase">
                      EVIDENCE-DRIVEN
                    </span>
                    <span className="font-label-mono text-label-mono uppercase px-space-xs py-[1px] bg-surface-container-highest text-on-surface w-fit font-bold border border-[#000000]">
                      NO ARBITRARY SCORES
                    </span>
                  </div>
                  <div className="mt-space-sm flex items-center gap-space-xs text-on-surface-variant">
                    <span className="font-label-mono text-label-mono uppercase">
                      REAL CODE & ARTIFACTS
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-md flex flex-col justify-between border-[2px] border-[#000000]">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-space-xs block">
                    ADAPTIVE LATENCY
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="font-headline-sm text-headline-sm text-tertiary uppercase font-bold">
                      &lt; 50MS
                    </span>
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">
                      REAL-TIME: 21.4MS
                    </span>
                  </div>
                  <div className="mt-space-sm flex items-center gap-space-xs text-on-surface-variant">
                    <span className="font-label-mono text-label-mono uppercase font-bold">
                      REAL-TIME ROADMAP ADJUSTMENT
                    </span>
                  </div>
                  <div className="mt-space-sm w-full bg-surface-container-highest h-2 relative border border-[#000000]">
                    <div className="h-full bg-tertiary-container w-[42%]"></div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="flex flex-col bg-surface-container-low p-space-md border-[2px] border-[#000000]">
                <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface tracking-wider mb-space-sm block">
                  ENGINE ARCHITECTURE & EVALUATION CRITERIA
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-body-sm text-body-sm">
                    <thead>
                      <tr className="bg-surface-container text-on-surface-variant font-label-mono text-label-mono uppercase border-b border-[#000000]">
                        <th className="p-space-sm">MODULE COMPONENT</th>
                        <th className="p-space-sm">METHODOLOGY & ENGINE</th>
                        <th className="p-space-sm">CRITERIA</th>
                        <th className="p-space-sm text-right">TELEMETRY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#000000]/20">
                      <tr className="hover:bg-surface-container transition-colors">
                        <td className="p-space-sm font-label-code text-label-code font-bold text-on-surface">
                          PREREQUISITE_PARSER
                        </td>
                        <td className="p-space-sm text-on-surface-variant font-label-code text-label-code">
                          Gemma 4 Structured Chain
                        </td>
                        <td className="p-space-sm">
                          <span className="px-space-xs py-[2px] bg-primary-fixed text-on-primary-fixed font-label-mono text-label-mono font-bold uppercase border border-[#000000]">
                            FULL COVERAGE
                          </span>
                        </td>
                        <td className="p-space-sm text-right font-label-mono text-label-mono text-tertiary font-bold">
                          ACTIVE
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container transition-colors">
                        <td className="p-space-sm font-label-code text-label-code font-bold text-on-surface">
                          EVIDENCE_VALIDATOR
                        </td>
                        <td className="p-space-sm text-on-surface-variant font-label-code text-label-code">
                          Automated Test & PR Analyzer
                        </td>
                        <td className="p-space-sm">
                          <span className="px-space-xs py-[2px] bg-primary-fixed text-on-primary-fixed font-label-mono text-label-mono font-bold uppercase border border-[#000000]">
                            STRICT
                          </span>
                        </td>
                        <td className="p-space-sm text-right font-label-mono text-label-mono text-tertiary font-bold">
                          OPTIMAL
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container transition-colors">
                        <td className="p-space-sm font-label-code text-label-code font-bold text-on-surface">
                          SPACED_REPETITION
                        </td>
                        <td className="p-space-sm text-on-surface-variant font-label-code text-label-code">
                          Ebbinghaus Forgetting Curve
                        </td>
                        <td className="p-space-sm">
                          <span className="px-space-xs py-[2px] bg-primary-fixed text-on-primary-fixed font-label-mono text-label-mono font-bold uppercase border border-[#000000]">
                            30-DAY CYCLES
                          </span>
                        </td>
                        <td className="p-space-sm text-right font-label-mono text-label-mono text-tertiary font-bold">
                          MONITORING
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container transition-colors">
                        <td className="p-space-sm font-label-code text-label-code font-bold text-on-surface">
                          OFFLINE_SYNC
                        </td>
                        <td className="p-space-sm text-on-surface-variant font-label-code text-label-code">
                          Service Worker + IndexedDB
                        </td>
                        <td className="p-space-sm">
                          <span className="px-space-xs py-[2px] bg-primary-fixed text-on-primary-fixed font-label-mono text-label-mono font-bold uppercase border border-[#000000]">
                            STANDALONE
                          </span>
                        </td>
                        <td className="p-space-sm text-right font-label-mono text-label-mono text-tertiary font-bold">
                          NOMINAL
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* CARD 2: Form */}
          <section className="flex flex-col bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000]">
            <div className="bg-surface-container p-space-md flex items-center justify-between border-b-[2px] border-[#000000]">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  supervised_user_circle
                </span>
                <h2 className="font-title text-title uppercase text-on-surface tracking-wider">
                  02 // REQUEST HUMAN MENTOR REVIEW / CUSTOM ROADMAP
                </h2>
              </div>
              <span className="font-label-mono text-label-mono uppercase px-space-xs py-[2px] bg-secondary text-on-secondary font-bold border border-[#000000]">
                SRE & DEV TRACKS
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-space-lg flex flex-col gap-space-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                    LEARNER GOAL / TARGET ROLE <span className="text-error">*</span>
                  </label>
                  <input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-surface-container-lowest text-on-surface font-label-code text-label-code p-space-sm border-[2px] border-[#000000] focus:outline-none focus:shadow-[3px_3px_0px_#000000] transition-all"
                    placeholder="e.g. Full-Stack Web Developer"
                    required
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                    CURRENT BOTTLENECK / UNMET PREREQUISITE <span className="text-error">*</span>
                  </label>
                  <input
                    value={formData.nodeId}
                    onChange={(e) => setFormData({ ...formData, nodeId: e.target.value })}
                    className="bg-surface-container-lowest text-on-surface font-label-code text-label-code p-space-sm border-[2px] border-[#000000] focus:outline-none focus:shadow-[3px_3px_0px_#000000] transition-all"
                    placeholder="e.g. Distributed consensus algorithms"
                    required
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                    ADAPTATION URGENCY <span className="text-error">*</span>
                  </label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="bg-surface-container-lowest text-on-surface font-label-code text-label-code p-space-sm border-[2px] border-[#000000] focus:outline-none focus:shadow-[3px_3px_0px_#000000] transition-all"
                  >
                    <option value="TUNEUP">ROUTINE ROADMAP TUNE-UP</option>
                    <option value="BLOCKED">BLOCKED ON PREREQUISITE CONCEPT</option>
                    <option value="TRANSITION">URGENT CAREER TRANSITION</option>
                  </select>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                    LEARNER EMAIL / CONTACT <span className="text-error">*</span>
                  </label>
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-surface-container-lowest text-on-surface font-label-code text-label-code p-space-sm border-[2px] border-[#000000] focus:outline-none focus:shadow-[3px_3px_0px_#000000] transition-all"
                    placeholder="learner@domain.edu"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                  PROJECT EVIDENCE / CODE REPO / DETAILED NOTES <span className="text-error">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-surface-container-lowest text-on-surface font-label-code text-label-code p-space-sm border-[2px] border-[#000000] focus:outline-none focus:shadow-[3px_3px_0px_#000000] transition-all"
                  placeholder="Attach GitHub URL, project deliverable link, or challenge logs..."
                  required
                  rows={4}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 bg-primary"></span>
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">
                    Auto-share Gemma 4 progress evaluation with mentor
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-space-lg py-space-sm bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-title text-title uppercase tracking-wider flex items-center gap-space-sm transition-all border-[2px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                >
                  <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                  SUBMIT ADAPTIVE CONSULTATION REQUEST
                </button>
              </div>

              {showSuccess && (
                <div className="p-space-sm bg-tertiary-fixed text-on-tertiary-fixed font-label-code text-label-code font-bold uppercase flex items-center justify-between border-[2px] border-[#000000] shadow-[2px_2px_0px_#000000]">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>REQUEST DISPATCHED. SRE MENTOR REVIEW TICKET #9481-RC LOGGED.</span>
                  </div>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="font-label-mono text-label-mono underline uppercase hover:opacity-80"
                    type="button"
                  >
                    DISMISS
                  </button>
                </div>
              )}
            </form>
          </section>
        </div>

        {/* RIGHT COLUMN: Docs & Directory (Span 5) */}
        <div className="xl:col-span-5 flex flex-col gap-space-lg">
          {/* CARD 3: Documentation */}
          <section className="flex flex-col bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000]">
            <div className="bg-surface-container p-space-md flex items-center justify-between border-b-[2px] border-[#000000]">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">auto_stories</span>
                <h2 className="font-title text-title uppercase text-on-surface tracking-wider">
                  03 // DOCUMENTATION & CURRICULUM GUIDES
                </h2>
              </div>
              <span className="font-label-mono text-label-mono uppercase px-space-xs py-[2px] bg-surface-container-highest text-on-surface font-bold border border-[#000000]">
                v4.0 PWA
              </span>
            </div>

            <div className="p-space-md flex flex-col gap-space-sm">
              <a
                href="#whitepaper"
                className="p-space-md bg-surface-container-low hover:bg-surface-container border-[2px] border-[#000000] transition-all flex items-center justify-between group shadow-[2px_2px_0px_#000000]"
              >
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title text-title uppercase text-on-surface group-hover:text-primary transition-colors">
                      PREREQUISITE REASONING WHITEPAPER
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    How Gemma 4 generates dependency trees and adaptive learning graphs.
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-[2px] bg-primary-fixed text-on-primary-fixed font-label-mono text-label-mono uppercase font-bold border border-[#000000]">
                    SPEC
                  </span>
                  <span className="material-symbols-outlined text-on-surface group-hover:text-primary transition-colors text-[20px]">
                    open_in_new
                  </span>
                </div>
              </a>

              <a
                href="#assessment-spec"
                className="p-space-md bg-surface-container-low hover:bg-surface-container border-[2px] border-[#000000] transition-all flex items-center justify-between group shadow-[2px_2px_0px_#000000]"
              >
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title text-title uppercase text-on-surface group-hover:text-primary transition-colors">
                      EVIDENCE-BASED ASSESSMENT SPECIFICATION
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Clear metrics over vague scores via unit tests and project reviews.
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-[2px] bg-surface-container-highest text-on-surface font-label-mono text-label-mono uppercase font-bold border border-[#000000]">
                    FRAMEWORK
                  </span>
                  <span className="material-symbols-outlined text-on-surface group-hover:text-primary transition-colors text-[20px]">
                    arrow_forward
                  </span>
                </div>
              </a>

              <a
                href="#playbook"
                className="p-space-md bg-surface-container-low hover:bg-surface-container border-[2px] border-[#000000] transition-all flex items-center justify-between group shadow-[2px_2px_0px_#000000]"
              >
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title text-title uppercase text-on-surface group-hover:text-primary transition-colors">
                      DAILY BEST ACTION PLAYBOOK
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Designing bite-sized daily milestones with adaptive difficulty tuning.
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-[2px] bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono uppercase font-bold border border-[#000000]">
                    ACTIVE
                  </span>
                  <span className="material-symbols-outlined text-on-surface group-hover:text-primary transition-colors text-[20px]">
                    schedule
                  </span>
                </div>
              </a>

              <a
                href="#retention-framework"
                className="p-space-md bg-surface-container-low hover:bg-surface-container border-[2px] border-[#000000] transition-all flex items-center justify-between group shadow-[2px_2px_0px_#000000]"
              >
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title text-title uppercase text-on-surface group-hover:text-primary transition-colors">
                      RETENTION & MAINTENANCE FRAMEWORK
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Spaced repetition algorithms calibrated against Ebbinghaus curves.
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-[2px] bg-secondary-fixed text-on-secondary-fixed font-label-mono text-label-mono uppercase font-bold border border-[#000000]">
                    RETENTION
                  </span>
                  <span className="material-symbols-outlined text-on-surface group-hover:text-primary transition-colors text-[20px]">
                    published_with_changes
                  </span>
                </div>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-space-md bg-surface-container-low hover:bg-surface-container border-[2px] border-[#000000] transition-all flex items-center justify-between group shadow-[2px_2px_0px_#000000]"
              >
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title text-title uppercase text-on-surface group-hover:text-primary transition-colors">
                      HACKTOBERFEST PWA OPEN SOURCE REPO
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Contribute roadmaps, offline transformers, and client UI on GitHub.
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-[2px] bg-surface-container-highest text-on-surface font-label-mono text-label-mono uppercase font-bold border border-[#000000]">
                    GITHUB
                  </span>
                  <span className="material-symbols-outlined text-on-surface group-hover:text-primary transition-colors text-[20px]">
                    code
                  </span>
                </div>
              </a>
            </div>
          </section>

          {/* CARD 4: Directory */}
          <section className="flex flex-col bg-surface-container-lowest border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000]">
            <div className="bg-surface-container p-space-md flex items-center justify-between border-b-[2px] border-[#000000]">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
                <h2 className="font-title text-title uppercase text-on-surface tracking-wider">
                  04 // COMMUNITY & ADVISORY DIRECTORY
                </h2>
              </div>
              <span className="font-label-mono text-label-mono uppercase px-space-xs py-[2px] bg-surface-container-highest text-on-surface font-bold border border-[#000000]">
                GLOBAL COMMUNITY
              </span>
            </div>

            <div className="p-space-lg flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-sm">
                <div className="p-space-md bg-surface-container-low border-[2px] border-[#000000] flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface-variant">
                      GLOBAL FOUNDATION HEADQUARTERS
                    </span>
                    <span className="font-label-mono text-label-mono uppercase px-space-xs py-[1px] bg-surface-container text-on-surface border border-[#000000]">
                      UPSHIFT_HQ
                    </span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface font-bold">
                    UPSHIFT AI Foundation
                  </p>
                  <p className="font-label-code text-label-code text-on-surface-variant">
                    548 Market St, Suite 79214, San Francisco, CA 94104, USA
                  </p>
                </div>

                <div className="p-space-md bg-surface-container-low border-[2px] border-[#000000] flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface-variant">
                      AI RESEARCH & ADAPTIVE LAB
                    </span>
                    <span className="font-label-mono text-label-mono uppercase px-space-xs py-[1px] bg-primary-fixed text-on-primary-fixed font-bold border border-[#000000]">
                      GEMMA-LAB
                    </span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface font-bold">
                    Gemma 4 Applied Learning Lab
                  </p>
                  <p className="font-label-code text-label-code text-on-surface-variant">
                    Kendall Square Innovation Hub, Cambridge, MA 02142
                  </p>
                </div>
              </div>

              {/* Mentorship Channels */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface tracking-wider block mb-space-xs">
                  DIRECT LEARNING & MENTORSHIP CHANNELS
                </span>

                <div className="p-space-sm bg-secondary-fixed text-on-secondary-fixed flex items-center justify-between border-[2px] border-[#000000]">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                    <div className="flex flex-col">
                      <span className="font-label-mono text-label-mono uppercase font-bold">
                        ACADEMIC & HACKATHON HOTLINE
                      </span>
                      <span className="font-label-code text-label-code font-bold">
                        +1 (415) 890-SHIFT
                      </span>
                    </div>
                  </div>
                  <span className="px-space-xs py-[2px] bg-secondary text-on-secondary font-label-mono text-label-mono font-bold uppercase border border-[#000000]">
                    HOTLINE
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">school</span>
                    <div className="flex flex-col">
                      <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface-variant">
                        CURRICULUM SUPPORT
                      </span>
                      <span className="font-label-code text-label-code font-bold text-on-surface">
                        support@upshift.ai
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('support@upshift.ai')}
                    className="px-space-xs py-[2px] bg-surface-container-highest hover:bg-surface-container text-on-surface font-label-mono text-label-mono uppercase font-bold border border-[#000000]"
                  >
                    {copiedText === 'support@upshift.ai' ? 'COPIED' : 'COPY'}
                  </button>
                </div>

                <div className="p-space-sm bg-surface-container-low border-[2px] border-[#000000] flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">forum</span>
                    <div className="flex flex-col">
                      <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface-variant">
                        MENTOR NETWORK
                      </span>
                      <span className="font-label-code text-label-code font-bold text-on-surface">
                        mentors@upshift.ai
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('mentors@upshift.ai')}
                    className="px-space-xs py-[2px] bg-surface-container-highest hover:bg-surface-container text-on-surface font-label-mono text-label-mono uppercase font-bold border border-[#000000]"
                  >
                    {copiedText === 'mentors@upshift.ai' ? 'COPIED' : 'COPY'}
                  </button>
                </div>
              </div>

              {/* PGP Fingerprint */}
              <div className="bg-surface-container p-space-sm flex flex-col gap-space-xs border-[2px] border-[#000000]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px] text-on-surface">vpn_key</span>
                    <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
                      OFFICIAL SRE PGP FINGERPRINT
                    </span>
                  </div>
                  <span className="font-label-mono text-label-mono text-tertiary font-bold uppercase">
                    4096R/UPSHIFT2025
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container-lowest border border-[#000000] overflow-x-auto">
                  <pre className="font-label-mono text-label-mono text-on-surface leading-snug whitespace-pre select-all">
94A1 88CF D041 BENTO 2025  
E87B 1042 UPSHIFT 0048 C7D2  
KEY-ID: 0x94A1UPSHIFT2025
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'gemma' | 'learner';
  timestamp: string;
  content: string;
  challengeBox?: {
    title: string;
    description: string;
  };
  codeBox?: {
    filename: string;
    meta: string;
    code: string;
  };
  verificationBox?: {
    title: string;
    confidence: string;
    description: string;
  };
}

export const AssessmentStudio: React.FC = () => {
  const { setCurrentView, setActiveTaskId, goalContext } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'gemma',
      timestamp: '10:42:04.182',
      content:
        'Greetings Learner. We are evaluating prerequisite mastery for "Distributed Vector Retrieval & Latency SLAs". Before assigning hands-on HNSW benchmarks, let\'s probe your memory hierarchy foundations.',
      challengeBox: {
        title: 'PROBE CHALLENGE #1:',
        description:
          'How do you mitigate cache thrashing when indexing 10M high-dimensional embeddings with frequent query churn and strict p99 < 8ms SLAs?',
      },
    },
    {
      id: 'm2',
      sender: 'learner',
      timestamp: '10:43:11.004',
      content:
        'We implement a tiered caching strategy with Valkey as L1 for hot vectors, partition HNSW graph layers across SSD-backed memory-mapped files (mmap), and use batch SIMD-accelerated AVX-512 dot products to avoid CPU cache eviction during continuous top-k graph traversal.',
    },
    {
      id: 'm3',
      sender: 'gemma',
      timestamp: '10:43:18.910',
      content: '',
      verificationBox: {
        title: 'DIAGNOSTIC VERIFICATION: STRONG CONCEPTUAL GRASP',
        confidence: 'EVIDENCE CONFIDENCE: 92% (HIGH)',
        description:
          'Demonstrated solid understanding of memory-mapped paging (mmap), hot-tier separation via Valkey, and CPU SIMD register saturation. Foundational prerequisite "L1/L2 Cache Mechanics & Vector Alignment" marked verified.',
      },
    },
    {
      id: 'm4',
      sender: 'gemma',
      timestamp: '10:43:30.910',
      content:
        'Code inspection challenge: Review the C++/Python tensor buffer binding snippet below for memory leak vectors during bulk PyTorch tensor serialization. What is missing in the buffer unpinning lifecycle?',
      codeBox: {
        filename: 'RUNTIME_MEMORY_BINDING.CPP',
        meta: 'CPP17 / TORCH_CAPI',
        code: `01  void* serialize_bulk_vectors(const at::Tensor& tensor, size_t batch_sz) {
02      TORCH_CHECK(tensor.is_contiguous(), "Buffer must be contiguous");
03      void* pinned_ptr = c10::cuda::pin_memory(tensor.data_ptr(), tensor.nbytes());
04      // Zero-copy DMA dispatch across PCIe lane
05      runtime_dma_enqueue(pinned_ptr, tensor.nbytes(), batch_sz);
06      /* <-- INSPECTION TARGET: IDENTIFY DEALLOCATION HAZARD --> */
07      return pinned_ptr;
08  }`,
      },
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [hnswSkill, setHnswSkill] = useState(45);
  const [artifacts, setArtifacts] = useState<Array<{ name: string; tag: string }>>([
    { name: 'pr-104-valkey-sharding.patch', tag: '+14.2% SPEEDUP' },
    { name: 'hnsw_benchmark_1m.log', tag: 'MET PREREQUISITE' },
  ]);

  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages, isEvaluating]);

  const handleTransmit = () => {
    const text = inputVal.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'learner',
      timestamp: timeStr,
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsEvaluating(true);

    setTimeout(() => {
      const gemmaTime = new Date().toTimeString().split(' ')[0] + '.' + String(new Date().getMilliseconds()).padStart(3, '0');
      const gemmaMsg: ChatMessage = {
        id: 'gem_' + Date.now(),
        sender: 'gemma',
        timestamp: gemmaTime,
        content:
          'EVALUATION CONFIRMED: Correct assessment. Pinned memory buffers must explicitly call c10::cuda::unpin_memory() or bind within a custom deleter to prevent persistent page-locked host memory leaks during continuous ingest.',
        verificationBox: {
          title: 'DEEP MEMORY PROBE CLEARED',
          confidence: 'CONFIDENCE: 96% (+5% BOOST)',
          description:
            'Host pinned memory deallocation hazard correctly isolated. Prerequisite vector serialization verified against production crash scenarios.',
        },
      };
      setMessages((prev) => [...prev, gemmaMsg]);
      setIsEvaluating(false);
      setHnswSkill((prev) => Math.min(prev + 15, 85));
    }, 900);
  };

  const handleUploadArtifact = () => {
    const name = 'benchmark_run_' + Math.floor(Math.random() * 9000 + 1000) + '.log';
    setArtifacts((prev) => [...prev, { name, tag: 'VERIFIED REPO' }]);
    setHnswSkill((prev) => Math.min(prev + 10, 95));
  };

  const handleStartDailyAction = () => {
    setActiveTaskId('task-1-2');
    setCurrentView('task_workspace');
  };

  return (
    <div className="flex flex-col w-full pb-space-xl animate-fadeIn">
      {/* Top Banner / Context Strip */}
      <section className="w-full bg-surface-container-lowest border-b-[3px] border-black p-space-md lg:p-space-lg mb-space-lg shadow-[4px_4px_0px_#000000]">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-[2px] border-black pb-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-primary border-[2px] border-black"></span>
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface font-bold">
                TRACK: {goalContext?.targetSkill ? goalContext.targetSkill.toUpperCase() : 'DISTRIBUTED AI SYSTEMS'} // STAGE: PREREQUISITE DIAGNOSTIC
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-label-mono text-label-mono uppercase px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed border-[2px] border-black font-bold">
                SESSION ID: EVAL-8849-GEMMA4
              </span>
              <span className="font-label-mono text-label-mono uppercase px-2 py-0.5 bg-surface-container-high text-on-surface border-[2px] border-black font-bold">
                LATENCY: 11MS
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="inline-block px-2 py-0.5 bg-secondary-container text-on-secondary-container font-label-mono text-label-mono uppercase border-[2px] border-black mb-2 shadow-[2px_2px_0px_#000000] font-bold">
                REALTIME ADAPTIVE RUNTIME
              </div>
              <h1 className="font-headline-md text-headline-md lg:font-headline-lg lg:text-headline-lg uppercase text-on-surface tracking-tight font-black m-0">
                ADAPTIVE ASSESSMENT & AI TUTOR // GEMMA 4 REASONING ENGINE
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1 m-0">
                Assess current architectural mastery, probe foundational distributed memory prerequisites, and submit benchmark telemetry to adapt your personalized curriculum in real-time.
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-2 shrink-0">
              <div className="border-[2px] border-black bg-surface-container-lowest p-2 shadow-[3px_3px_0px_#000000]">
                <p className="font-label-mono text-label-mono text-on-surface-variant uppercase text-[10px] font-bold m-0">
                  CURRENT LEVEL
                </p>
                <p className="font-title text-title uppercase text-primary font-bold m-0">
                  INTERMEDIATE (3/6)
                </p>
              </div>
              <div className="border-[2px] border-black bg-surface-container-lowest p-2 shadow-[3px_3px_0px_#000000]">
                <p className="font-label-mono text-label-mono text-on-surface-variant uppercase text-[10px] font-bold m-0">
                  CONFIDENCE INDEX
                </p>
                <p className="font-title text-title uppercase text-tertiary font-bold m-0">
                  88.4% STABLE
                </p>
              </div>
              <div className="border-[2px] border-black bg-primary-container p-2 text-on-primary-container shadow-[3px_3px_0px_#000000]">
                <p className="font-label-mono text-label-mono uppercase text-[10px] text-on-primary-container font-bold m-0">
                  ACTIVE PROBE
                </p>
                <p className="font-title text-title uppercase font-black truncate max-w-[210px] m-0">
                  KV CACHING & LOCALITY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual-Column Bento Workspace */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT COLUMN: Interactive AI Assessment & Tutor Chat (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="border-[3px] border-black bg-surface-container-lowest shadow-[6px_6px_0px_#000000] flex flex-col">
            {/* Card Header */}
            <div className="p-space-md border-b-[3px] border-black bg-surface-container-low flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-primary border-[2px] border-black"></span>
                <span className="font-title text-title uppercase font-bold text-on-surface">
                  01 // GEMMA 4 INTERACTIVE DIAGNOSTIC STREAM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 border-[2px] border-black bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono uppercase font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-ping"></span>
                  [REALTIME SOCKET]
                </span>
                <span className="px-2 py-0.5 border-[2px] border-black bg-surface-container-high font-label-mono text-label-mono uppercase text-on-surface font-semibold">
                  MODEL: GEMMA 4 (MULTIMODAL)
                </span>
              </div>
            </div>

            {/* Chat Transcript Stream */}
            <div
              ref={transcriptRef}
              className="p-space-md flex flex-col gap-4 max-h-[640px] overflow-y-auto bg-surface-bright"
            >
              {/* System Context Indicator */}
              <div className="border-[2px] border-black border-dashed bg-surface-container-low p-2 text-center">
                <p className="font-label-mono text-label-mono uppercase text-on-surface-variant font-bold m-0">
                  // TELEMETRY HANDSHAKE INITIALIZED • RUNTIME AGENT: GEMMA-4-REASONING-V4.2 • ZERO LATENCY PROBE ACTIVE //
                </p>
              </div>

              {messages.map((m) => {
                if (m.sender === 'learner') {
                  return (
                    <div key={m.id} className="flex flex-col items-end self-end max-w-[92%] animate-fadeIn">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-label-mono text-label-mono text-on-surface-variant">
                          {m.timestamp}
                        </span>
                        <span className="border-[2px] border-black bg-surface-container-highest text-on-surface px-1.5 py-0.2 font-label-mono text-label-mono font-bold uppercase">
                          LEARNER // [LOCAL DEV]
                        </span>
                      </div>
                      <div className="border-[3px] border-black bg-primary-fixed text-on-primary-fixed-variant p-space-md shadow-[4px_4px_0px_#000000]">
                        <p className="font-body-md text-body-md text-on-surface font-medium leading-relaxed m-0">
                          {m.content}
                        </p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={m.id} className="flex flex-col items-start max-w-[95%] animate-fadeIn">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="border-[2px] border-black bg-primary text-on-primary px-1.5 py-0.2 font-label-mono text-label-mono font-bold uppercase">
                        GEMMA 4 // AGENT
                      </span>
                      <span className="font-label-mono text-label-mono text-on-surface-variant">
                        {m.timestamp}
                      </span>
                    </div>

                    {m.content && (
                      <div className="border-[3px] border-black bg-surface-container-lowest p-space-md shadow-[4px_4px_0px_#000000] mb-2 w-full">
                        <p className="font-body-md text-body-md text-on-surface font-medium leading-relaxed m-0">
                          {m.content}
                        </p>

                        {m.challengeBox && (
                          <div className="mt-3 p-3 bg-surface-container border-[2px] border-black">
                            <p className="font-title text-title uppercase text-on-surface font-black mb-1">
                              {m.challengeBox.title}
                            </p>
                            <p className="font-body-md text-body-md text-on-surface m-0">
                              {m.challengeBox.description}
                            </p>
                          </div>
                        )}

                        {m.codeBox && (
                          <div className="mt-3 border-[2px] border-black bg-surface-container-highest">
                            <div className="flex items-center justify-between border-b-[2px] border-black bg-surface-container px-3 py-1 text-on-surface font-label-mono text-label-mono font-bold">
                              <span>{m.codeBox.filename}</span>
                              <span className="text-on-surface-variant">{m.codeBox.meta}</span>
                            </div>
                            <pre className="p-3 font-label-code text-label-code text-on-surface overflow-x-auto leading-5 select-text m-0 whitespace-pre">
                              {m.codeBox.code}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {m.verificationBox && (
                      <div className="border-[3px] border-black bg-tertiary-fixed text-on-tertiary-fixed p-space-md shadow-[4px_4px_0px_#000000] w-full">
                        <div className="flex items-center justify-between border-b-[2px] border-black pb-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] font-bold text-tertiary">
                              check_circle
                            </span>
                            <span className="font-title text-title uppercase font-black">
                              {m.verificationBox.title}
                            </span>
                          </div>
                          <span className="font-label-mono text-label-mono uppercase px-2 py-0.5 bg-surface-container-lowest border border-black text-on-surface font-bold">
                            {m.verificationBox.confidence}
                          </span>
                        </div>
                        <p className="font-body-md text-body-md leading-relaxed text-on-tertiary-fixed-variant m-0">
                          {m.verificationBox.description}
                        </p>
                        <div className="mt-3 pt-2 border-t border-black flex items-center justify-between">
                          <span className="font-label-mono text-[10px] uppercase font-bold">
                            DIAGNOSTIC EVIDENCE RECORDED
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentView('assessment_results')}
                            className="px-2.5 py-1 bg-surface-container-lowest text-on-surface border-[2px] border-black font-label-mono text-xs uppercase font-bold shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-1"
                          >
                            <span>VIEW GAP ANALYSIS & ROADMAP</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {isEvaluating && (
                <div className="flex items-center gap-2 p-2 bg-surface-container-high border-[2px] border-black font-label-mono text-label-mono uppercase">
                  <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                  <span>GEMMA 4 EVALUATING REASONING LOGIC & RUNTIME BOUNDS...</span>
                </div>
              )}
            </div>

            {/* Terminal Input Interface */}
            <div className="p-space-md border-t-[3px] border-black bg-surface-container-low flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-label-mono uppercase text-on-surface font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">terminal</span>
                  RESPONSE CONSOLE // STDIN
                </span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
                  MARKDOWN & CODE HIGHLIGHTING ENABLED
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                      handleTransmit();
                    }
                  }}
                  rows={3}
                  className="w-full bg-surface-container-lowest border-[3px] border-black p-3 font-label-code text-label-code text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:shadow-[4px_4px_0px_#60a5fa] transition-shadow resize-none"
                  placeholder="Type your technical response, inspect buffer pinning safety, paste code snippet, or explain architectural trade-offs... (Ctrl+Enter to transmit)"
                />
              </div>

              {/* Bottom Action Buttons Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleUploadArtifact}
                    className="px-3 py-1.5 border-[2px] border-black bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-title text-title uppercase shadow-[2px_2px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-1.5 text-xs font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">attach_file</span>
                    [ATTACH REPO / EVIDENCE]
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputVal('c10::cuda::unpin_memory(pinned_ptr) is missing before return!')}
                    className="px-3 py-1.5 border-[2px] border-black bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-title text-title uppercase shadow-[2px_2px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-1.5 text-xs font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    [INSERT INSPECTION FIX]
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleTransmit}
                  disabled={isEvaluating}
                  className="px-4 py-2 border-[3px] border-black bg-primary-container hover:bg-primary hover:text-on-primary text-on-primary-container font-headline-sm text-headline-sm uppercase shadow-[4px_4px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-2 font-bold"
                >
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  [TRANSMIT RESPONSE // EVALUATE]
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Adaptive Telemetry, Matrix & Evidence Dock (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* CARD 02: LIVE SKILL GAP MATRIX */}
          <div className="border-[3px] border-black bg-surface-container-lowest shadow-[6px_6px_0px_#000000] flex flex-col">
            <div className="p-space-md border-b-[3px] border-black bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-tertiary border-[2px] border-black"></span>
                <span className="font-title text-title uppercase font-bold text-on-surface">
                  02 // LIVE SKILL GAP MATRIX
                </span>
              </div>
              <span className="font-label-mono text-label-mono uppercase px-2 py-0.5 bg-surface-container border-[2px] border-black text-on-surface font-bold">
                ADAPTIVE
              </span>
            </div>

            <div className="p-space-md flex flex-col gap-3.5">
              {/* Skill Bar 1: Memory Hierarchy */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center font-label-mono text-label-mono uppercase font-bold">
                  <span className="text-on-surface">MEMORY HIERARCHY & CACHING</span>
                  <span className="text-tertiary">92% // VERIFIED</span>
                </div>
                <div className="w-full h-3.5 bg-surface-container-high border-[2px] border-black relative">
                  <div className="h-full bg-tertiary-container border-r-[2px] border-black w-[92%]"></div>
                </div>
              </div>

              {/* Skill Bar 2: Async Event Pipelines */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center font-label-mono text-label-mono uppercase font-bold">
                  <span className="text-on-surface">ASYNC EVENT PIPELINES (EPOLL/IOCP)</span>
                  <span className="text-primary font-bold">78% // IN PROGRESS</span>
                </div>
                <div className="w-full h-3.5 bg-surface-container-high border-[2px] border-black relative">
                  <div className="h-full bg-primary-container border-r-[2px] border-black w-[78%]"></div>
                </div>
              </div>

              {/* Skill Bar 3: Graph-Based Vector Indexing (GAP) */}
              <div className="flex flex-col gap-1 bg-secondary-fixed/30 p-2 border-[2px] border-black">
                <div className="flex justify-between items-center font-label-mono text-label-mono uppercase font-bold">
                  <span className="text-secondary font-black">GRAPH VECTOR INDEXING (HNSW)</span>
                  <span className="text-secondary font-black">{hnswSkill}% // {hnswSkill > 70 ? 'STABLE' : 'SKILL GAP'}</span>
                </div>
                <div className="w-full h-3.5 bg-surface-container-lowest border-[2px] border-black relative">
                  <div
                    className={`h-full border-r-[2px] border-black transition-all duration-500 ${
                      hnswSkill > 70 ? 'bg-tertiary-container' : 'bg-secondary'
                    }`}
                    style={{ width: `${hnswSkill}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] font-label-mono text-on-secondary-container font-bold">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  {hnswSkill > 70 ? 'REMEDIATION VERIFIED IN BENCHMARK' : 'NEEDS REMEDIATION BEFORE SHARDING RUNTIMES'}
                </div>
              </div>

              {/* Skill Bar 4: Distributed Consistency */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center font-label-mono text-label-mono uppercase font-bold">
                  <span className="text-on-surface">CONSISTENCY & RAFT PROTOCOLS</span>
                  <span className="text-on-surface-variant font-bold">60% // PROBING</span>
                </div>
                <div className="w-full h-3.5 bg-surface-container-high border-[2px] border-black relative">
                  <div className="h-full bg-outline border-r-[2px] border-black w-[60%]"></div>
                </div>
              </div>

              {/* Recommendation Pill Box */}
              <div className="mt-1 border-[2px] border-black bg-surface-container-high p-2.5">
                <p className="font-label-mono text-label-mono uppercase text-on-surface font-bold m-0">
                  <span className="bg-primary text-on-primary px-1 mr-1">ADAPTIVE RECOM</span>
                  Complete 1 hands-on drill in HNSW heuristic pruning before proceeding to Raft consensus state machine evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 03: EVIDENCE SUBMISSION & BENCHMARK DOCK */}
          <div className="border-[3px] border-black bg-surface-container-lowest shadow-[6px_6px_0px_#000000] flex flex-col">
            <div className="p-space-md border-b-[3px] border-black bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-primary-container border-[2px] border-black"></span>
                <span className="font-title text-title uppercase font-bold text-on-surface">
                  03 // EVIDENCE SUBMISSION & BENCHMARK DOCK
                </span>
              </div>
              <span className="font-label-mono text-label-mono uppercase px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed border-[2px] border-black font-bold">
                VERIFIED SYNC
              </span>
            </div>

            <div className="p-space-md flex flex-col gap-3">
              {/* Drop Area */}
              <div
                onClick={handleUploadArtifact}
                className="border-[3px] border-dashed border-black bg-surface-container-low p-4 text-center cursor-pointer hover:bg-surface-container transition-colors flex flex-col items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[28px] text-on-surface">
                  cloud_upload
                </span>
                <p className="font-title text-title uppercase font-bold text-on-surface m-0">
                  SUBMIT GITHUB PR / BENCHMARK LOG
                </p>
                <p className="font-label-mono text-label-mono uppercase text-on-surface-variant m-0">
                  FORMATS: .JSON, .LOG, OR GIT COMMIT SHA (CLICK TO ATTACH)
                </p>
              </div>

              {/* Verified Submissions List */}
              <div className="flex flex-col gap-2">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant font-bold">
                  PROVEN EVIDENCE ARTIFACTS ({artifacts.length})
                </span>
                {artifacts.map((art, idx) => (
                  <div
                    key={idx}
                    className="border-[2px] border-black bg-surface-container-lowest p-2.5 shadow-[2px_2px_0px_#000000] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-tertiary text-[18px]">
                        verified
                      </span>
                      <span className="font-label-code text-label-code text-on-surface truncate font-semibold">
                        {art.name}
                      </span>
                    </div>
                    <span className="font-label-mono text-label-mono uppercase px-1.5 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed border border-black font-bold shrink-0">
                      {art.tag}
                    </span>
                  </div>
                ))}
              </div>

              {/* Benchmark Trigger CTA */}
              <button
                type="button"
                onClick={handleUploadArtifact}
                className="w-full py-2.5 border-[3px] border-black bg-surface-container-highest hover:bg-surface-container text-on-surface font-title text-title uppercase shadow-[3px_3px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                [RUN DIAGNOSTIC BENCHMARK NOW]
              </button>
            </div>
          </div>

          {/* CARD 04: NEXT BEST ACTION RECOMMENDED */}
          <div className="border-[3px] border-black bg-primary-container text-on-primary-container shadow-[6px_6px_0px_#000000] p-space-md flex flex-col gap-3">
            <div className="flex items-center justify-between border-b-[2px] border-black pb-2">
              <span className="font-label-mono text-label-mono uppercase font-black text-on-primary-container flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-black inline-block"></span>
                04 // NEXT BEST ACTION RECOMMENDED
              </span>
              <span className="font-label-mono text-label-mono uppercase px-2 py-0.5 bg-black text-white font-bold">
                HIGH VALUE
              </span>
            </div>

            <div>
              <h2 className="font-headline-sm text-headline-sm uppercase font-black text-on-primary-container leading-tight m-0">
                HNSW HEURISTIC PRUNING & LOCALITY DRILL
              </h2>
              <p className="font-body-md text-body-md text-on-primary-container font-medium mt-1 m-0">
                Resolve your identified {hnswSkill}% skill gap. Benchmark node neighbor bounding heuristics under heavy synthetic query loads.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-label-mono text-label-mono uppercase font-bold text-on-primary-container">
              <span className="border border-black px-2 py-0.5 bg-surface-container-lowest text-black">
                EST. TIME: 15 MIN
              </span>
              <span className="border border-black px-2 py-0.5 bg-surface-container-lowest text-black">
                RETENTION: +8.5%
              </span>
              <span className="border border-black px-2 py-0.5 bg-surface-container-lowest text-black">
                DIFFICULTY: MEDIUM
              </span>
            </div>

            <button
              type="button"
              onClick={handleStartDailyAction}
              className="w-full mt-1 py-3 border-[3px] border-black bg-surface-container-lowest hover:bg-black hover:text-white text-on-surface font-title text-title uppercase shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 font-black"
            >
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              [START DAILY ACTION // DRILL 03]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

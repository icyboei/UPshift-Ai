import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CheckCircle2,
  Lock,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Calendar,
  Layers,
  Check,
} from 'lucide-react';
import { RoadmapMilestone, RoadmapTask } from '../types';

export const RoadmapView: React.FC = () => {
  const { roadmap, activeTaskId, setActiveTaskId, setCurrentView } = useApp();
  const [selectedTask, setSelectedTask] = useState<RoadmapTask | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'completed'>('all');

  if (!roadmap) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <p className="text-charcoal-600">No active roadmap available yet.</p>
        <button
          onClick={() => setCurrentView('onboarding')}
          className="px-4 py-2 bg-emeraldAccent-600 text-white rounded-lg text-sm font-semibold"
        >
          Create Your Roadmap
        </button>
      </div>
    );
  }

  const handleLaunchTask = (task: RoadmapTask) => {
    setActiveTaskId(task.id);
    setSelectedTask(null);
    setCurrentView('task_workspace');
  };

  const totalTasks = roadmap.milestones.flatMap((m) => m.tasks).length;
  const completedTasks = roadmap.milestones
    .flatMap((m) => m.tasks)
    .filter((t) => t.status === 'completed').length;
  const progressPercent = Math.round((completedTasks / Math.max(totalTasks, 1)) * 100);

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 space-y-8 animate-fadeIn">
      {/* Roadmap Header Summary */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emeraldAccent-100 text-emeraldAccent-800 font-semibold">
                Prerequisite-Aware Sequence
              </span>
              <span className="text-xs font-mono text-charcoal-400">
                Total Budget: ~{roadmap.totalEstimatedHours}h over {roadmap.targetTimeframeWeeks}w
              </span>
            </div>
            <h1 className="editorial-title text-2xl sm:text-3xl font-normal text-charcoal-900">
              {roadmap.title}
            </h1>
          </div>

          {/* Overall Completion Progress */}
          <div className="sm:text-right flex-shrink-0">
            <div className="text-2xl font-bold font-display text-charcoal-900">
              {progressPercent}%
            </div>
            <div className="text-xs text-charcoal-500 font-mono">
              {completedTasks} of {totalTasks} Tasks Completed
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emeraldAccent-600 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Adaptation banner if adapted */}
        {roadmap.adaptationReason && (
          <div className="p-3 rounded-xl bg-surface-50 border border-emeraldAccent-200 text-xs text-charcoal-700 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-emeraldAccent-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-charcoal-900">Latest Adaptation: </span>
              {roadmap.adaptationReason}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 pt-2 border-t border-surface-100">
          <span className="text-xs font-mono text-charcoal-400 mr-2">FILTER:</span>
          {[
            { key: 'all', label: `All Tasks (${totalTasks})` },
            { key: 'available', label: 'Actionable Now' },
            { key: 'completed', label: `Completed (${completedTasks})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key as any)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                statusFilter === tab.key
                  ? 'bg-charcoal-900 text-surface-50 border-charcoal-900'
                  : 'bg-surface-50 border-surface-200 text-charcoal-600 hover:bg-surface-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Milestones & Tasks Timeline */}
      <div className="space-y-8">
        {roadmap.milestones.map((milestone, mIdx) => {
          const filteredTasks = milestone.tasks.filter((t) => {
            if (statusFilter === 'available') return t.status === 'available' || t.status === 'in_progress';
            if (statusFilter === 'completed') return t.status === 'completed';
            return true;
          });

          if (filteredTasks.length === 0 && statusFilter !== 'all') return null;

          const isMilestoneLocked = milestone.status === 'locked';

          return (
            <div
              key={milestone.id}
              className={`rounded-3xl border transition-all ${
                isMilestoneLocked
                  ? 'bg-surface-100/60 border-surface-200 opacity-75'
                  : 'bg-white border-surface-200 shadow-subtle'
              }`}
            >
              {/* Milestone Header */}
              <div className="p-6 border-b border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-emeraldAccent-700 uppercase tracking-wider">
                      Milestone {milestone.order}
                    </span>
                    <span className="text-charcoal-400">•</span>
                    <span className="text-xs text-charcoal-500 font-mono">
                      ~{milestone.estimatedHours} Hours
                    </span>
                    {isMilestoneLocked && (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-mono px-2 py-0.5 rounded bg-surface-200 text-charcoal-600">
                        <Lock className="w-3 h-3" />
                        <span>Prerequisites Required</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-display text-charcoal-900">
                    {milestone.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 max-w-2xl leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Tasks List */}
              <div className="p-4 sm:p-6 divide-y divide-surface-100 space-y-3">
                {filteredTasks.map((task) => {
                  const isTaskCompleted = task.status === 'completed';
                  const isTaskLocked = task.status === 'locked';
                  const isCurrentActive = activeTaskId === task.id;

                  return (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all hover:border-surface-400 ${
                        isCurrentActive
                          ? 'border-emeraldAccent-500 bg-emeraldAccent-50/40 ring-2 ring-emeraldAccent-200'
                          : isTaskCompleted
                          ? 'border-surface-200 bg-surface-50'
                          : isTaskLocked
                          ? 'border-surface-200 bg-surface-100/50 cursor-not-allowed opacity-60'
                          : 'border-surface-200 bg-white hover:bg-surface-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center space-x-2">
                            {isTaskCompleted ? (
                              <span className="flex items-center space-x-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emeraldAccent-100 text-emeraldAccent-800">
                                <Check className="w-3 h-3 text-emeraldAccent-700" />
                                <span>Completed & Verified</span>
                              </span>
                            ) : isTaskLocked ? (
                              <span className="flex items-center space-x-1 text-[11px] font-mono px-2 py-0.5 rounded bg-surface-200 text-charcoal-600">
                                <Lock className="w-3 h-3" />
                                <span>Prerequisite Locked</span>
                              </span>
                            ) : (
                              <span className="flex items-center space-x-1 text-[11px] font-mono px-2 py-0.5 rounded bg-charcoal-100 text-charcoal-800 font-semibold">
                                <span>Actionable</span>
                              </span>
                            )}

                            <span className="text-[11px] font-mono text-charcoal-400">
                              ~{task.estimatedMinutes}m
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded uppercase border border-surface-200 text-charcoal-500">
                              {task.difficulty}
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-semibold text-charcoal-900">
                            {task.title}
                          </h4>

                          <p className="text-xs text-charcoal-600 line-clamp-2">
                            {task.objective}
                          </p>

                          <div className="text-[11px] text-charcoal-500 font-mono">
                            Deliverable: <span className="text-charcoal-700">{task.expectedDeliverable}</span>
                          </div>
                        </div>

                        {/* Action CTA */}
                        <div className="flex flex-col items-end justify-center space-y-1 flex-shrink-0 pt-1">
                          {!isTaskLocked && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLaunchTask(task);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                                isCurrentActive
                                  ? 'bg-emeraldAccent-600 text-white'
                                  : 'bg-charcoal-900 text-surface-50 hover:bg-charcoal-800'
                              }`}
                            >
                              <span>{isTaskCompleted ? 'Review Submission' : 'Launch Workspace'}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Inspection Drawer / Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-surface-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated relative my-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emeraldAccent-100 text-emeraldAccent-800 font-semibold">
                    Task Specification
                  </span>
                  <span className="text-xs font-mono text-charcoal-400">
                    Est. Duration: {selectedTask.estimatedMinutes} min
                  </span>
                </div>
                <h3 className="editorial-title text-2xl font-normal text-charcoal-900">
                  {selectedTask.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-1.5 rounded-full text-charcoal-400 hover:text-charcoal-800 hover:bg-surface-100"
              >
                ✕
              </button>
            </div>

            {/* Objective & Why It Matters */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-surface-50 border border-surface-200 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-charcoal-500">
                  Core Objective
                </span>
                <p className="text-xs sm:text-sm text-charcoal-800 font-medium leading-relaxed">
                  {selectedTask.objective}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emeraldAccent-50/50 border border-emeraldAccent-200 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-emeraldAccent-800">
                  Why This Matters (Prerequisite Context)
                </span>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {selectedTask.whyItMatters}
                </p>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-charcoal-800 uppercase tracking-wide block">
                Execution Steps:
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-charcoal-600 pl-1">
                {selectedTask.instructions.map((ins, i) => (
                  <li key={i} className="leading-relaxed">
                    {ins}
                  </li>
                ))}
              </ol>
            </div>

            {/* Expected Deliverable & Completion Criteria */}
            <div className="p-4 rounded-xl bg-charcoal-900 text-surface-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-emeraldAccent-400">
                  Expected Deliverable
                </span>
                <span className="text-[10px] font-mono text-charcoal-400">Auditable Evidence</span>
              </div>
              <p className="text-xs text-surface-200 font-mono">
                {selectedTask.expectedDeliverable}
              </p>
              <div className="pt-2 border-t border-charcoal-800">
                <span className="text-[10px] font-mono uppercase text-charcoal-400 block mb-1">
                  Evaluation Criteria:
                </span>
                <ul className="space-y-1 text-xs text-charcoal-300">
                  {selectedTask.completionCriteria.map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-emeraldAccent-400 font-bold">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Launch Button */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-charcoal-700 hover:bg-surface-100"
              >
                Close
              </button>
              {selectedTask.status !== 'locked' && (
                <button
                  type="button"
                  onClick={() => handleLaunchTask(selectedTask)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emeraldAccent-600 hover:bg-emeraldAccent-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105"
                >
                  <span>Launch Task Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

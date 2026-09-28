import React from 'react';
import { LeaderboardLearner } from '../types';

interface LeaderboardStatsProps {
  learners: LeaderboardLearner[];
  scopeLabel: string;
}

export const LeaderboardStats: React.FC<LeaderboardStatsProps> = ({ learners, scopeLabel }) => {
  const topLearner = learners[0];
  const totalCount = learners.length;
  const topScore = topLearner ? topLearner.filteredScore : 0;
  const avgScore =
    totalCount > 0
      ? learners.reduce((acc, curr) => acc + curr.filteredScore, 0) / totalCount
      : 0;
  const avgProgress =
    totalCount > 0
      ? Math.round(learners.reduce((acc, curr) => acc + curr.progress, 0) / totalCount)
      : 0;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI 1: Top Performer */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle-card flex items-center justify-between hover:border-slate-300 transition-colors">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Top Performer</div>
          <div className="text-lg font-bold text-slate-900 truncate max-w-[150px]">
            {topLearner ? topLearner.name : 'N/A'}
          </div>
          <div className="text-xs font-medium text-amber-600 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {topLearner ? `${topLearner.filteredScore} accumulated` : '0 accumulated'}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
          <svg className="w-6 h-6 fill-amber-400 stroke-amber-600" strokeWidth="1.8" viewBox="0 0 24 24">
            <path
              d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004-9.375a3 3 0 10-6 0v.75h6v-.75z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 9.75V6.375A2.625 2.625 0 018.625 3.75h6.75A2.625 2.625 0 0118 6.375V9.75m-12 0A2.25 2.25 0 003.75 12v.75a4.5 4.5 0 004.5 4.5h.75m9-7.5A2.25 2.25 0 0120.25 12v.75a4.5 4.5 0 01-4.5 4.5h-.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* KPI 2: Highest Score */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle-card flex items-center justify-between hover:border-slate-300 transition-colors">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Highest Score</div>
          <div className="text-2xl font-extrabold text-slate-900">{topScore}</div>
          <div className="text-xs font-medium text-slate-500">
            {scopeLabel === 'Whole Course' ? 'Whole Course Record' : `${scopeLabel} Record`}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-600 shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* KPI 3: Average Score */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle-card flex items-center justify-between hover:border-slate-300 transition-colors">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Score</div>
          <div className="text-2xl font-extrabold text-slate-900">{avgScore.toFixed(1)}</div>
          <div className="text-xs font-medium text-teal-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Across {totalCount} {totalCount === 1 ? 'learner' : 'learners'}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* KPI 4: Avg Completion */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle-card flex items-center justify-between hover:border-slate-300 transition-colors">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg. Completion</div>
          <div className="text-2xl font-extrabold text-slate-900">{avgProgress}%</div>
          <div className="text-xs font-medium text-slate-500">
            {totalCount} active participants
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

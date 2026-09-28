import React, { useState, useMemo } from 'react';
import { LeaderboardLearner } from '../types';

interface LeaderboardTableProps {
  learners: LeaderboardLearner[];
  scopeLabel: string;
}

type Order = 'asc' | 'desc';
type OrderBy = 'rank' | 'name' | 'filteredScore' | 'progress';

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ learners, scopeLabel }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('rank');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedLearners = useMemo(() => {
    const comparator = (a: LeaderboardLearner, b: LeaderboardLearner) => {
      if (orderBy === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (orderBy === 'filteredScore') {
        return order === 'asc' ? a.filteredScore - b.filteredScore : b.filteredScore - a.filteredScore;
      }
      if (orderBy === 'progress') {
        return order === 'asc' ? a.progress - b.progress : b.progress - a.progress;
      }
      return order === 'asc' ? a.rank - b.rank : b.rank - a.rank;
    };

    return [...learners].sort(comparator);
  }, [learners, order, orderBy]);

  const totalCount = sortedLearners.length;
  const paginatedLearners = useMemo(() => {
    return sortedLearners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedLearners, page, rowsPerPage]);

  const startRecord = totalCount === 0 ? 0 : page * rowsPerPage + 1;
  const endRecord = Math.min((page + 1) * rowsPerPage, totalCount);
  const isFirstPage = page === 0;
  const isLastPage = (page + 1) * rowsPerPage >= totalCount;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-subtle-card overflow-hidden">
      {/* Table Header Bar */}
      <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900">Leaderboard Standings</h2>
          <p className="text-xs text-slate-500">Individual performance and verified badge progress</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200 self-start sm:self-auto">
          Scope: {scopeLabel}
        </span>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th
                className="py-3.5 pl-6 pr-3 cursor-pointer select-none"
                scope="col"
                onClick={() => handleRequestSort('rank')}
              >
                <div className="flex items-center gap-1">
                  <span>Rank</span>
                  <svg
                    className={`w-3.5 h-3.5 text-brand-600 transition-transform ${
                      orderBy === 'rank' && order === 'desc' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </th>
              <th
                className="py-3.5 px-4 cursor-pointer select-none"
                scope="col"
                onClick={() => handleRequestSort('name')}
              >
                <div className="flex items-center gap-1">
                  <span>Learner</span>
                  {orderBy === 'name' && (
                    <svg
                      className={`w-3.5 h-3.5 text-brand-600 transition-transform ${
                        order === 'desc' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </th>
              <th
                className="py-3.5 px-4 cursor-pointer select-none"
                scope="col"
                onClick={() => handleRequestSort('filteredScore')}
              >
                <div className="flex items-center gap-1">
                  <span>Score</span>
                  {orderBy === 'filteredScore' && (
                    <svg
                      className={`w-3.5 h-3.5 text-brand-600 transition-transform ${
                        order === 'desc' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </th>
              <th
                className="py-3.5 px-4 min-w-[220px] cursor-pointer select-none"
                scope="col"
                onClick={() => handleRequestSort('progress')}
              >
                <div className="flex items-center gap-1">
                  <span>Progress</span>
                  {orderBy === 'progress' && (
                    <svg
                      className={`w-3.5 h-3.5 text-brand-600 transition-transform ${
                        order === 'desc' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </th>
              <th className="py-3.5 pr-6 pl-4" scope="col">
                Status & Badge
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {paginatedLearners.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="font-semibold text-slate-700">No learners match the current filter or search criteria.</p>
                    <p className="text-xs text-slate-400">Try selecting "All Chapters" or clearing the search query.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedLearners.map((learner) => {
                const rank = learner.rank;
                const isTop3 = rank <= 3;

                // Rank Badge UI
                let rankBadgeNode;
                if (rank === 1) {
                  rankBadgeNode = (
                    <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 font-extrabold text-xs shadow-sm">
                      🥇
                    </div>
                  );
                } else if (rank === 2) {
                  rankBadgeNode = (
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-extrabold text-xs shadow-sm">
                      🥈
                    </div>
                  );
                } else if (rank === 3) {
                  rankBadgeNode = (
                    <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-700 font-extrabold text-xs shadow-sm">
                      🥉
                    </div>
                  );
                } else {
                  rankBadgeNode = (
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                      #{rank}
                    </div>
                  );
                }

                // Avatar background & text UI
                let avatarClass = 'w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center overflow-hidden';
                if (rank === 1) {
                  avatarClass += ' bg-amber-100 text-amber-900 border border-amber-300';
                } else if (rank === 2) {
                  avatarClass += ' bg-slate-200 text-slate-800 border border-slate-300';
                } else if (rank === 3) {
                  avatarClass += ' bg-orange-100 text-orange-800 border border-orange-300';
                } else {
                  avatarClass += ' bg-indigo-100 text-brand-700 border border-indigo-200';
                }

                // Score pill UI
                const scorePillClass = isTop3
                  ? 'inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                  : 'inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-slate-100 text-slate-700 border border-slate-200';

                // Progress colors
                let progressTextClass = 'font-bold text-emerald-600';
                let progressBarClass = 'bg-emerald-500 h-2 rounded-full';
                if (learner.progress >= 100) {
                  progressTextClass = 'font-bold text-emerald-600';
                  progressBarClass = 'bg-emerald-500 h-2 rounded-full';
                } else if (learner.progress < 25) {
                  progressTextClass = 'font-bold text-orange-600';
                  progressBarClass = 'bg-orange-500 h-2 rounded-full';
                } else {
                  progressTextClass = 'font-bold text-amber-600';
                  progressBarClass = 'bg-amber-500 h-2 rounded-full';
                }

                // Badge pill UI
                let badgeClass = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold';
                if (rank === 1 || (learner.badge && learner.badge.includes('Grandmaster'))) {
                  badgeClass += ' bg-amber-50 text-amber-800 border border-amber-200';
                } else if (rank === 2 || (learner.badge && learner.badge.includes('Gold'))) {
                  badgeClass += ' bg-amber-50 text-amber-800 border border-amber-200';
                } else if (rank === 3 || (learner.badge && learner.badge.includes('Silver'))) {
                  badgeClass += ' bg-slate-100 text-slate-700 border border-slate-200';
                } else {
                  badgeClass += ' bg-indigo-50 text-indigo-700 border border-indigo-200';
                }

                return (
                  <tr key={learner.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 pl-6 pr-3 whitespace-nowrap">{rankBadgeNode}</td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={avatarClass}>
                          {learner.avatar ? (
                            <img src={learner.avatar} alt={learner.name} className="w-full h-full object-cover" />
                          ) : (
                            learner.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{learner.name}</div>
                          <div className="text-xs text-slate-500 font-medium">{learner.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={scorePillClass}>{learner.filteredScore}</span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="space-y-1.5 max-w-[260px]">
                        <div className="flex items-center justify-between text-xs">
                          <span className={progressTextClass}>{learner.progress}%</span>
                          <span className="text-slate-400 font-medium">
                            {learner.completedUnits}/{learner.totalUnits} units
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={progressBarClass}
                            style={{ width: `${Math.min(100, Math.max(0, learner.progress))}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 pr-6 pl-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={badgeClass}>{learner.badge || 'Explorer 🧭'}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {learner.status || 'Active'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-3.5 bg-slate-50/60 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0);
            }}
            className="bg-white border border-slate-200 rounded-md py-1 px-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-slate-600">
            {totalCount === 0 ? '0 of 0' : `${startRecord}–${endRecord} of ${totalCount}`}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={isFirstPage}
              className="p-1 rounded-md text-slate-600 hover:bg-slate-200/60 disabled:text-slate-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition"
              type="button"
              aria-label="Previous page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={isLastPage}
              className="p-1 rounded-md text-slate-600 hover:bg-slate-200/60 disabled:text-slate-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition"
              type="button"
              aria-label="Next page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

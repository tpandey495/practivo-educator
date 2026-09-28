import React from 'react';
import { ChapterOption, ContentTypeItem, LeaderboardFilterState } from '../types';

interface LeaderboardFiltersProps {
  filter: LeaderboardFilterState;
  onFilterChange: (newFilter: Partial<LeaderboardFilterState>) => void;
  onReset: () => void;
  onExport: () => void;
  chapters: ChapterOption[];
  contentTypes: ContentTypeItem[];
  totalFilteredCount: number;
  scopeLabel: string;
}

export const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
  filter,
  onFilterChange,
  onReset,
  onExport,
  chapters,
  contentTypes,
  totalFilteredCount,
  scopeLabel,
}) => {
  const selectedChapter = chapters.find((c) => String(c.id) === String(filter.chapterId));
  const availableLessons = selectedChapter
    ? selectedChapter.lessons
    : chapters.flatMap((c) => c.lessons);

  const isFiltered =
    filter.chapterId !== 'all' ||
    filter.lessonId !== 'all' ||
    filter.contentType !== 'all' ||
    Boolean(filter.searchQuery);

  const handleChapterChange = (chapterId: string) => {
    onFilterChange({
      chapterId,
      lessonId: 'all',
    });
  };

  const handleLessonChange = (lessonId: string) => {
    onFilterChange({ lessonId });
  };

  const handleContentTypeChange = (contentType: string) => {
    onFilterChange({ contentType });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchQuery: e.target.value });
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle-card space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Filter Leaderboard</h3>
            <p className="text-xs text-slate-500">Cascade by Chapter → Lesson → Content Type</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition"
              type="button"
            >
              Reset Filters
            </button>
          )}
          <button
            onClick={onExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition"
            type="button"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
        {/* Chapter Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Chapter
          </label>
          <div className="relative">
            <select
              value={filter.chapterId}
              onChange={(e) => handleChapterChange(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pr-8 focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition appearance-none cursor-pointer"
            >
              <option value="all">📖 🌐 All Chapters (Whole Course)</option>
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Lesson Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Lesson
          </label>
          <div className="relative">
            <select
              value={filter.lessonId}
              onChange={(e) => handleLessonChange(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pr-8 focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition appearance-none cursor-pointer"
            >
              <option value="all">📖 📖 All Lessons</option>
              {availableLessons.map((ls) => (
                <option key={ls.id} value={ls.id}>
                  {ls.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Type Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Content Type
          </label>
          <div className="relative">
            <select
              value={filter.contentType}
              onChange={(e) => handleContentTypeChange(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pr-8 focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition appearance-none cursor-pointer"
            >
              <option value="all">🕹️ 🧩 All Content Types</option>
              {contentTypes.map((ct) => (
                <option key={ct.id} value={ct.id}>
                  {ct.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Search Learner
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              value={filter.searchQuery}
              onChange={handleSearchChange}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition placeholder-slate-400"
              placeholder="Search learner..."
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Active Scope & Count Summary Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
            Active Scope:
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-brand-700 font-semibold border border-slate-200">
            {scopeLabel}
          </span>
        </div>
        <div className="font-medium">
          Showing <span className="font-bold text-slate-800">{totalFilteredCount} {totalFilteredCount === 1 ? 'learner' : 'learners'}</span>
        </div>
      </div>
    </section>
  );
};

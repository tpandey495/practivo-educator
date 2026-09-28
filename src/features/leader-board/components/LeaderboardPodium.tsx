import React from 'react';
import { LeaderboardLearner } from '../types';

interface LeaderboardPodiumProps {
  learners: LeaderboardLearner[];
}

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({ learners }) => {
  if (!learners || learners.length === 0) return null;

  const first = learners[0];
  const second = learners[1];
  const third = learners[2];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-bold text-slate-900">Top Performers Podium</h2>
        <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-brand-100 text-brand-700">Top 3</span>
      </div>

      {/* Podium Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-3">
        {/* PODIUM #2: Second Place (Silver) */}
        {second && (
          <div className="silver-radial order-2 md:order-1 rounded-2xl border border-slate-200 p-6 shadow-subtle-card relative flex flex-col items-center text-center transition-all hover:-translate-y-1">
            {/* Rank Pill Badge */}
            <div className="absolute -top-3.5 px-3 py-1 bg-slate-100 border border-slate-300/80 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm">
              <span>🥈</span>
              <span>2nd Place</span>
            </div>
            {/* Avatar */}
            <div className="relative mt-2 mb-3">
              <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-slate-700 font-bold text-xl shadow-inner overflow-hidden">
                {second.avatar ? (
                  <img src={second.avatar} alt={second.name} className="w-full h-full object-cover" />
                ) : (
                  second.name.charAt(0)
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white shadow">
                2
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{second.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4 truncate max-w-full">{second.email}</p>
            {/* Score Highlight Pill */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-600 text-white font-extrabold text-sm tracking-wide shadow-sm shadow-brand-500/30 mb-3">
              {second.filteredScore}
            </div>
            {/* Stats & Badge Footer */}
            <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 pt-2 border-t border-slate-200/70 w-full justify-center">
              <span>{second.progress}% Complete</span>
              <span className="text-slate-300">•</span>
              <span className="text-amber-700 flex items-center gap-1">
                {second.badge || 'Gold Elite 🥇'}
              </span>
            </div>
          </div>
        )}

        {/* PODIUM #1: Champion (Gold - Center & Elevated) */}
        {first && (
          <div className="gold-radial order-1 md:order-2 rounded-2xl border-2 border-amber-300 p-7 shadow-glow-gold relative flex flex-col items-center text-center transition-all md:-translate-y-2 hover:-translate-y-3">
            {/* Champion Badge */}
            <div className="absolute -top-4 px-4 py-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full text-xs font-extrabold text-amber-950 flex items-center gap-1.5 shadow-md shadow-amber-500/20">
              <span>🏆</span>
              <span>1st Champion</span>
            </div>
            {/* Avatar with Glow */}
            <div className="relative mt-2 mb-3">
              <div className="w-20 h-20 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-800 font-extrabold text-2xl shadow-inner overflow-hidden">
                {first.avatar ? (
                  <img src={first.avatar} alt={first.name} className="w-full h-full object-cover" />
                ) : (
                  first.name.charAt(0)
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-amber-950 font-black text-xs flex items-center justify-center ring-2 ring-white shadow">
                1
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">{first.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4 truncate max-w-full">{first.email}</p>
            {/* Score Highlight Pill */}
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-brand-600 text-white font-extrabold text-base tracking-wide shadow-md shadow-brand-500/30 mb-3">
              {first.filteredScore}
            </div>
            {/* Stats & Badge Footer */}
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 pt-2 border-t border-amber-200/80 w-full justify-center">
              <span>{first.progress}% Complete</span>
              <span className="text-slate-300">•</span>
              <span className="text-amber-800 flex items-center gap-1">
                {first.badge || 'Grandmaster 🏆'}
              </span>
            </div>
          </div>
        )}

        {/* PODIUM #3: Third Place (Bronze) */}
        {third && (
          <div className="bronze-radial order-3 md:order-3 rounded-2xl border border-orange-200/80 p-6 shadow-subtle-card relative flex flex-col items-center text-center transition-all hover:-translate-y-1">
            {/* Rank Pill Badge */}
            <div className="absolute -top-3.5 px-3 py-1 bg-orange-100 border border-orange-300/80 rounded-full text-xs font-bold text-orange-900 flex items-center gap-1.5 shadow-sm">
              <span>🥉</span>
              <span>3rd Place</span>
            </div>
            {/* Avatar */}
            <div className="relative mt-2 mb-3">
              <div className="w-16 h-16 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-orange-800 font-bold text-xl shadow-inner overflow-hidden">
                {third.avatar ? (
                  <img src={third.avatar} alt={third.name} className="w-full h-full object-cover" />
                ) : (
                  third.name.charAt(0)
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white shadow">
                3
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{third.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4 truncate max-w-full">{third.email}</p>
            {/* Score Highlight Pill */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-800 text-white font-extrabold text-sm tracking-wide shadow-sm mb-3">
              {third.filteredScore}
            </div>
            {/* Stats & Badge Footer */}
            <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 pt-2 border-t border-orange-200/70 w-full justify-center">
              <span>{third.progress}% Complete</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700 flex items-center gap-1">
                {third.badge || 'Silver Ace 🥈'}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

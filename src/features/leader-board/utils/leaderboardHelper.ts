import { LeaderboardLearner, LeaderboardFilterState } from '../types';

// Deterministic pseudo-random weight generator based on seed string
function hashStringToNumber(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Calculate realistic filtered score for a student given chapter, lesson, and content type
export function calculateFilteredScore(
  baseTotalScore: number,
  studentId: string | number,
  filter: LeaderboardFilterState,
  totalChaptersCount: number = 1
): number {
  const { chapterId, lessonId, contentType } = filter;

  // 1. Whole course: return total course score
  if (chapterId === 'all' && lessonId === 'all' && contentType === 'all') {
    return Math.max(0, baseTotalScore);
  }

  let currentScore = baseTotalScore;

  // 2. Chapter filter
  if (chapterId !== 'all') {
    const chapterHash = hashStringToNumber(`c_${chapterId}_s_${studentId}`);
    // Normalized ratio between 15% and 35% of total course score
    const safeChapters = Math.max(totalChaptersCount, 3);
    const expectedPortion = 1 / safeChapters;
    const variation = ((chapterHash % 40) - 20) / 100; // -0.20 to +0.20
    const ratio = Math.max(0.1, Math.min(0.5, expectedPortion * (1 + variation)));
    currentScore = Math.round(currentScore * ratio);
  } else {
    // If all chapters but specific content type is picked
    currentScore = baseTotalScore;
  }

  // 3. Lesson filter
  if (lessonId !== 'all') {
    const lessonHash = hashStringToNumber(`l_${lessonId}_s_${studentId}`);
    // Portion of chapter score (between 25% and 55%)
    const lessonRatio = 0.25 + (lessonHash % 31) / 100;
    currentScore = Math.round(currentScore * lessonRatio);
  }

  // 4. Content type filter
  if (contentType !== 'all') {
    const typeHash = hashStringToNumber(`t_${contentType}_s_${studentId}`);
    // Content type weight based on category
    let typeBase = 0.35;
    if (contentType.toLowerCase().includes('quiz')) typeBase = 0.45;
    if (contentType.toLowerCase().includes('code')) typeBase = 0.50;
    if (contentType.toLowerCase().includes('assignment')) typeBase = 0.40;
    if (contentType.toLowerCase().includes('video')) typeBase = 0.25;

    const typeVariation = ((typeHash % 20) - 10) / 100;
    const typeRatio = Math.max(0.15, Math.min(0.7, typeBase + typeVariation));
    currentScore = Math.round(currentScore * typeRatio);
  }

  return Math.max(0, currentScore);
}

// Calculate score metrics for a learner based on current filter state
export function getLearnerScoreMetrics(
  l: Omit<LeaderboardLearner, 'rank' | 'filteredScore' | 'badge'>,
  filter: LeaderboardFilterState,
  totalChaptersCount: number = 1
): {
  filteredScore: number;
  maxScore: number;
  progress: number;
  attempted: number;
  correct: number;
  totalQuestions: number;
} {
  const { chapterId, lessonId, contentType } = filter;

  // 1. If lessonId filter is active
  if (lessonId !== 'all' && l.lessonWiseScore && l.lessonWiseScore.length > 0) {
    const ls = l.lessonWiseScore.find((item) => String(item.lessonId) === String(lessonId));
    if (ls) {
      return {
        filteredScore: ls.obtained,
        maxScore: ls.max,
        progress: ls.percentage ?? (ls.max > 0 ? Math.round((ls.obtained / ls.max) * 100) : 0),
        attempted: ls.attempted,
        correct: ls.correct,
        totalQuestions: ls.totalQuestions,
      };
    }
  }

  // 2. If chapterId filter is active
  if (chapterId !== 'all' && l.chapterWiseScore && l.chapterWiseScore.length > 0) {
    const ch = l.chapterWiseScore.find((item) => String(item.chapterId) === String(chapterId));
    if (ch) {
      return {
        filteredScore: ch.obtained,
        maxScore: ch.max,
        progress: ch.percentage ?? (ch.max > 0 ? Math.round((ch.obtained / ch.max) * 100) : 0),
        attempted: ch.attempted,
        correct: ch.correct,
        totalQuestions: ch.totalQuestions,
      };
    }
  }

  // 3. If contentType filter is active
  if (contentType !== 'all' && l.contentTypeWiseScore && l.contentTypeWiseScore.length > 0) {
    const ct = l.contentTypeWiseScore.find(
      (item) =>
        String(item.contentTypeId) === String(contentType) ||
        item.contentTypeName.toLowerCase() === String(contentType).toLowerCase()
    );
    if (ct) {
      return {
        filteredScore: ct.obtained,
        maxScore: ct.max,
        progress: ct.percentage ?? (ct.max > 0 ? Math.round((ct.obtained / ct.max) * 100) : 0),
        attempted: ct.attempted,
        correct: ct.correct,
        totalQuestions: ct.totalQuestions,
      };
    }
  }

  // 4. Fallback for specific filters if API data has arrays but no match was found (learner didn't attempt)
  const isFilterActive = chapterId !== 'all' || lessonId !== 'all' || contentType !== 'all';
  const hasApiArrays = Boolean(l.chapterWiseScore?.length || l.lessonWiseScore?.length || l.contentTypeWiseScore?.length);

  if (isFilterActive && hasApiArrays) {
    return {
      filteredScore: 0,
      maxScore: 0,
      progress: 0,
      attempted: 0,
      correct: 0,
      totalQuestions: 0,
    };
  }

  // 5. Whole Course / Default
  const filteredScore = calculateFilteredScore(l.totalScore, l.id, filter, totalChaptersCount);
  return {
    filteredScore,
    maxScore: l.maxScore || 500,
    progress: l.progress,
    attempted: l.attempted || 0,
    correct: l.correct || 0,
    totalQuestions: l.totalQuestions || 0,
  };
}

// Compute rank and badges for learners
export function rankAndBadgeLearners(
  learners: Array<Omit<LeaderboardLearner, 'rank' | 'filteredScore' | 'badge'>>,
  filter: LeaderboardFilterState,
  totalChaptersCount: number = 1
): LeaderboardLearner[] {
  // Compute filtered score for each
  const withScores = learners.map((l) => {
    const metrics = getLearnerScoreMetrics(l, filter, totalChaptersCount);

    return {
      ...l,
      filteredScore: metrics.filteredScore,
      maxScore: metrics.maxScore,
      progress: metrics.progress,
      attempted: metrics.attempted,
      correct: metrics.correct,
      totalQuestions: metrics.totalQuestions,
    };
  });

  // Sort descending by filtered score, then by progress
  withScores.sort((a, b) => {
    if (b.filteredScore !== a.filteredScore) {
      return b.filteredScore - a.filteredScore;
    }
    return b.progress - a.progress;
  });

  // Assign ranks and badges
  const total = withScores.length;
  return withScores.map((learner, index) => {
    const rank = index + 1;
    let badge = 'Explorer 🧭';

    if (rank === 1) {
      badge = 'Grandmaster 🏆';
    } else if (rank === 2) {
      badge = 'Gold Elite 🥇';
    } else if (rank === 3) {
      badge = 'Silver Ace 🥈';
    } else if (total > 6 && rank <= Math.ceil(total * 0.15)) {
      badge = 'Master Scholar 🌟';
    } else if (total > 6 && rank <= Math.ceil(total * 0.4)) {
      badge = 'Expert Performer ⚡';
    } else if (total > 6 && rank <= Math.ceil(total * 0.7)) {
      badge = 'Rising Star 🚀';
    } else {
      badge = 'Explorer 🧭';
    }

    return {
      ...learner,
      rank,
      badge,
    };
  });
}

// High quality fallback sample data matching reference design
export const sampleLeaderboardLearners: Array<Omit<LeaderboardLearner, 'rank' | 'filteredScore' | 'badge'>> = [
  // {
  //   id: 'demo-1',
  //   name: 'test test',
  //   email: 'test@gmail.com',
  //   avatar: '',
  //   totalScore: 10,
  //   progress: 105,
  //   completedUnits: 37,
  //   totalUnits: 35,
  //   status: 'Active',
  //   lastActive: 'Just now',
  // },
  // {
  //   id: 'demo-2',
  //   name: 'check check',
  //   email: 'check@gmail.com',
  //   avatar: '',
  //   totalScore: 10,
  //   progress: 100,
  //   completedUnits: 35,
  //   totalUnits: 35,
  //   status: 'Active',
  //   lastActive: '10 mins ago',
  // },
  {
    id: 'demo-3',
    name: 'Tarun Pandey',
    email: 'tpandey495@gmail.com',
    avatar: '',
    totalScore: 3,
    progress: 24,
    completedUnits: 8,
    totalUnits: 35,
    status: 'Active',
    lastActive: '1 hour ago',
  },
  {
    id: 'demo-4',
    name: 'arun prashant',
    email: 'arun@gmail.com',
    avatar: '',
    totalScore: 2,
    progress: 29,
    completedUnits: 10,
    totalUnits: 35,
    status: 'Active',
    lastActive: 'Yesterday',
  },
];

// Helper to export CSV
export function exportLeaderboardCSV(
  rows: LeaderboardLearner[],
  scopeLabel: string
): void {
  const header = ['Rank', 'Name', 'Email', 'Score', 'Progress (%)', 'Status', 'Badge', 'Scope'];
  const lines = rows.map((l) =>
    [
      l.rank,
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      l.filteredScore,
      `${l.progress}%`,
      l.status,
      `"${(l.badge || '').replace(/"/g, '""')}"`,
      `"${scopeLabel.replace(/"/g, '""')}"`,
    ].join(',')
  );
  const csv = [header.join(','), ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leaderboard_${scopeLabel.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

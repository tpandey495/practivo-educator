import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Button,
  Switch,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { useGetCourseLearnersQuery } from '../learner-management/api/api';
import { useGetChaptersQuery, useGetContentTypesQuery } from '../chapter-management/api/chapterApi';
import { useGetCourseLeaderboardQuery } from './api/leaderboardApi';
import {
  LeaderboardFilterState,
  ChapterOption,
  ContentTypeItem,
  LeaderboardLearner,
  ApiLeaderboardItem,
} from './types';
import {
  rankAndBadgeLearners,
  sampleLeaderboardLearners,
  exportLeaderboardCSV,
} from './utils/leaderboardHelper';
import { LeaderboardStats } from './components/LeaderboardStats';
import { LeaderboardPodium } from './components/LeaderboardPodium';
import { LeaderboardFilters } from './components/LeaderboardFilters';
import { LeaderboardTable } from './components/LeaderboardTable';

export const LeaderBoard: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  // Filter state (Chapter -> Lesson -> Content Type)
  const [filter, setFilter] = useState<LeaderboardFilterState>({
    chapterId: 'all',
    lessonId: 'all',
    contentType: 'all',
    searchQuery: '',
  });

  // State to toggle sample demo data if course has 0 actual enrollments
  const [useSampleData, setUseSampleData] = useState(false);

  // 1. Fetch practice course leaderboard API (/practice/course/:courseId/leaderboard)
  const {
    data: leaderboardResponse,
    isLoading: isLeaderboardLoading,
    refetch: refetchLeaderboard,
  } = useGetCourseLeaderboardQuery(
    {
      courseId: courseId!,
      chapterId: filter.chapterId,
      lessonId: filter.lessonId,
      contentType: filter.contentType,
    },
    {
      skip: !courseId,
    }
  );

  // 2. Fetch course learners (legacy/fallback API)
  const {
    data: learnersData,
    isLoading: isLearnersLoading,
    refetch: refetchLearners,
  } = useGetCourseLearnersQuery(courseId!, {
    skip: !courseId,
  });

  // 3. Fetch course chapters & lessons
  const {
    data: chaptersDataResponse,
    isLoading: isChaptersLoading,
    refetch: refetchChapters,
  } = useGetChaptersQuery(
    {
      id: courseId || '',
      page: 1,
      limit: 100,
    },
    {
      skip: !courseId,
    }
  );

  // 4. Fetch content types
  const { data: rawContentTypes = [] } = useGetContentTypesQuery();

  // Normalize chapters data (merge from chapters API and leaderboard breakdown)
  const chapters: ChapterOption[] = useMemo(() => {
    let rawList: any[] = [];
    if (chaptersDataResponse) {
      if (Array.isArray(chaptersDataResponse)) {
        rawList = chaptersDataResponse;
      } else if (chaptersDataResponse.chapters && Array.isArray(chaptersDataResponse.chapters)) {
        rawList = chaptersDataResponse.chapters;
      } else if (chaptersDataResponse.data && Array.isArray(chaptersDataResponse.data)) {
        rawList = chaptersDataResponse.data;
      } else if (
        chaptersDataResponse.data?.chapters &&
        Array.isArray(chaptersDataResponse.data.chapters)
      ) {
        rawList = chaptersDataResponse.data.chapters;
      }
    }

    const chapterMap = new Map<string, ChapterOption>();

    // Add chapters from curriculum API
    rawList.forEach((ch: any) => {
      const chId = String(ch.id);
      chapterMap.set(chId, {
        id: ch.id,
        title: ch.title || `Chapter ${ch.id}`,
        lessons: (ch.lessons || []).map((ls: any) => ({
          id: ls.id,
          title: ls.title || `Lesson ${ls.id}`,
          chapterId: ch.id,
          types: ls.types || (ls.type ? [ls.type] : []),
        })),
      });
    });

    // Supplement from Leaderboard API response
    const apiLeaderboard = leaderboardResponse?.data?.leaderboard;
    if (Array.isArray(apiLeaderboard)) {
      apiLeaderboard.forEach((item) => {
        item.chapterWiseScore?.forEach((ch) => {
          const chId = String(ch.chapterId);
          if (!chapterMap.has(chId)) {
            chapterMap.set(chId, {
              id: ch.chapterId,
              title: ch.chapterTitle || `Chapter ${ch.chapterId}`,
              lessons: [],
            });
          }
        });

        item.lessonWiseScore?.forEach((ls) => {
          const chId = String(ls.chapterId);
          const chObj = chapterMap.get(chId) || {
            id: ls.chapterId,
            title: ls.chapterTitle || `Chapter ${ls.chapterId}`,
            lessons: [],
          };

          const lsId = String(ls.lessonId);
          if (!chObj.lessons.some((l) => String(l.id) === lsId)) {
            chObj.lessons.push({
              id: ls.lessonId,
              title: ls.lessonTitle || `Lesson ${ls.lessonId}`,
              chapterId: ls.chapterId,
            });
          }

          chapterMap.set(chId, chObj);
        });
      });
    }

    return Array.from(chapterMap.values());
  }, [chaptersDataResponse, leaderboardResponse]);

  // Normalize content types
  const contentTypes: ContentTypeItem[] = useMemo(() => {
    const defaultTypes: ContentTypeItem[] = [
      { id: 'quiz', label: 'Quiz / Tests' },
      { id: 'video', label: 'Video Lessons' },
      { id: 'assignment', label: 'Assignments' },
      { id: 'code', label: 'Coding Problems' },
      { id: 'blog', label: 'Reading Articles' },
    ];

    const map = new Map<string, ContentTypeItem>();

    defaultTypes.forEach((t) => map.set(t.id.toLowerCase(), t));

    if (Array.isArray(rawContentTypes)) {
      rawContentTypes.forEach((c: any) => {
        const idStr = String(c.name || c.id || c.value).toLowerCase();
        map.set(idStr, {
          id: idStr,
          label: c.name || c.label || String(c.id),
          iconName: c.icon,
        });
      });
    }

    const apiLeaderboard = leaderboardResponse?.data?.leaderboard;
    if (Array.isArray(apiLeaderboard)) {
      apiLeaderboard.forEach((item) => {
        item.contentTypeWiseScore?.forEach((ct) => {
          const idStr = String(ct.contentTypeId || ct.contentTypeName).toLowerCase();
          if (!map.has(idStr)) {
            map.set(idStr, {
              id: String(ct.contentTypeId),
              label: ct.contentTypeName || `Type ${ct.contentTypeId}`,
            });
          }
        });
      });
    }

    return Array.from(map.values());
  }, [rawContentTypes, leaderboardResponse]);

  // Normalize learners from API
  const realLearners: Array<Omit<LeaderboardLearner, 'rank' | 'filteredScore' | 'badge'>> =
    useMemo(() => {
      const apiItems = leaderboardResponse?.data?.leaderboard;
      if (Array.isArray(apiItems) && apiItems.length > 0) {
        return apiItems.map((item: ApiLeaderboardItem, idx: number) => {
          const lUser = item.learner || {};
          const fullName =
            [lUser.firstName, lUser.lastName].filter(Boolean).join(' ') ||
            lUser.username ||
            `Learner ${lUser.id || idx + 1}`;
          const totScore = item.totalScore?.obtained ?? 0;
          const totMax = item.totalScore?.max ?? 500;
          const pct = item.totalScore?.percentage ?? (totMax > 0 ? Math.round((totScore / totMax) * 100) : 0);

          return {
            id: lUser.id || idx + 1,
            name: fullName,
            email: lUser.email || `learner${lUser.id || idx + 1}@example.com`,
            avatar: '',
            totalScore: totScore,
            maxScore: totMax,
            progress: pct,
            completedUnits: item.totalScore?.correct ?? Math.round((pct / 100) * 35),
            totalUnits: item.totalScore?.totalQuestions ?? 35,
            attempted: item.totalScore?.attempted,
            correct: item.totalScore?.correct,
            totalQuestions: item.totalScore?.totalQuestions,
            status: 'Active',
            lastActive: 'Recently',
            chapterWiseScore: item.chapterWiseScore || [],
            lessonWiseScore: item.lessonWiseScore || [],
            contentTypeWiseScore: item.contentTypeWiseScore || [],
          };
        });
      }

      // Legacy fallback
      const studentsList = learnersData?.data?.students || learnersData?.students || [];
      if (!Array.isArray(studentsList)) return [];

      return studentsList.map((item: any, idx: number) => {
        const rawScore = Number(item.totalScore || item.score || 0);
        const progress = Number(item.progressPercent || item.progress || 0);
        return {
          id: item.userId || item.id || `learner-${idx + 1}`,
          name: item.userName || item.name || `Learner ${idx + 1}`,
          email: item.userEmail || item.email || 'learner@practivo.net',
          avatar: item.userAvatar || item.avatar || '',
          totalScore: rawScore > 0 ? rawScore : Math.round(progress * 10),
          progress,
          completedUnits: Math.round((progress / 100) * 35),
          totalUnits: 35,
          status: item.completionStatus === 'pending' ? 'Inactive' : 'Active',
          lastActive: item.lastActive || 'Recently',
        };
      });
    }, [leaderboardResponse, learnersData]);

  // Determine active dataset (use real if available, else sample demo data)
  const isRealDataEmpty = realLearners.length === 0;
  const isDemoActive = isRealDataEmpty || useSampleData;
  const baseLearners = isDemoActive ? sampleLeaderboardLearners : realLearners;

  // Rank learners based on active cascade filter (Chapter -> Lesson -> Content Type)
  const rankedLearners = useMemo(() => {
    return rankAndBadgeLearners(baseLearners, filter, Math.max(1, chapters.length));
  }, [baseLearners, filter, chapters.length]);

  // Filter by search query (name or email)
  const filteredLearners = useMemo(() => {
    if (!filter.searchQuery.trim()) {
      return rankedLearners;
    }
    const query = filter.searchQuery.toLowerCase().trim();
    return rankedLearners.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        l.email.toLowerCase().includes(query)
    );
  }, [rankedLearners, filter.searchQuery]);

  // Compute Human-Readable Scope Label
  const scopeLabel = useMemo(() => {
    const parts: string[] = [];

    if (filter.chapterId === 'all') {
      parts.push('Whole Course');
    } else {
      const ch = chapters.find((c) => String(c.id) === String(filter.chapterId));
      parts.push(ch ? ch.title : 'Chapter');
    }

    if (filter.lessonId !== 'all') {
      const allLessons = chapters.flatMap((c) => c.lessons);
      const ls = allLessons.find((l) => String(l.id) === String(filter.lessonId));
      parts.push(ls ? ls.title : 'Lesson');
    }

    if (filter.contentType !== 'all') {
      const ct = contentTypes.find((t) => t.id === filter.contentType);
      parts.push(ct ? ct.label : filter.contentType);
    }

    return parts.join(' ➔ ');
  }, [filter, chapters, contentTypes]);

  // Filter updates
  const handleFilterChange = (newValues: Partial<LeaderboardFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newValues }));
  };

  const handleResetFilters = () => {
    setFilter({
      chapterId: 'all',
      lessonId: 'all',
      contentType: 'all',
      searchQuery: '',
    });
  };

  const handleExportCSV = () => {
    exportLeaderboardCSV(filteredLearners, scopeLabel);
  };

  const isLoading = (isLeaderboardLoading || isLearnersLoading || isChaptersLoading) && !leaderboardResponse;

  if (isLoading && !learnersData && !chaptersDataResponse && !leaderboardResponse) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '380px',
          gap: 2,
        }}
      >
        <CircularProgress size={42} sx={{ color: '#4F39F6' }} />
        <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
          Loading course leaderboard data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2.5, md: 3 }, width: '100%', maxWidth: '1440px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Title & Header Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Course Leaderboard
            </Typography>
            <Chip
              label={filter.chapterId === 'all' && filter.lessonId === 'all' && filter.contentType === 'all' ? 'Whole Course View' : 'Filtered Score View'}
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: '0.72rem',
                backgroundColor: filter.chapterId === 'all' ? '#EEF2FF' : '#FEF3C7',
                color: filter.chapterId === 'all' ? '#4F39F6' : '#B45309',
                borderRadius: '8px',
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Learner performance rankings. Filter by Chapter, Lesson, and Content Type.
          </Typography>
        </Box>

        {/* Demo preview mode switch if course has no learners yet */}
        {isRealDataEmpty && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: '6px 12px',
              borderRadius: '12px',
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#92400E' }}>
              Preview Mode (Sample Learners)
            </Typography>
            <Switch
              size="small"
              checked={useSampleData}
              onChange={(e) => setUseSampleData(e.target.checked)}
              color="warning"
            />
          </Box>
        )}
      </Box>

      {/* Notice banner for empty course with demo fallback */}
      {isRealDataEmpty && (
        <Alert
          severity="info"
          sx={{
            mb: 3,
            borderRadius: '12px',
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            color: '#1E40AF',
            '& .MuiAlert-icon': {
              color: '#3B82F6',
            },
          }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                refetchLeaderboard();
                refetchLearners();
                refetchChapters();
              }}
              startIcon={<RefreshRoundedIcon />}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Refresh
            </Button>
          }
        >
          No students have enrolled in this course yet. Displaying interactive preview data so you can test filtering by chapter, lesson, and content type.
        </Alert>
      )}

      {/* Cascading Filter Bar (Chapter -> Lesson -> Content Type) */}
      <LeaderboardFilters
        filter={filter}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        onExport={handleExportCSV}
        chapters={chapters}
        contentTypes={contentTypes}
        totalFilteredCount={filteredLearners.length}
        scopeLabel={scopeLabel}
      />

      {/* Stats Cards Overview */}
      <LeaderboardStats learners={rankedLearners} scopeLabel={scopeLabel} />

      {/* Top 3 Performers Podium */}
      {rankedLearners.length >= 3 && (
        <LeaderboardPodium learners={rankedLearners.slice(0, 3)} />
      )}

      {/* Detailed Standings Table */}
      <LeaderboardTable
        learners={filteredLearners}
        scopeLabel={scopeLabel}
      />
    </Box>
  );
};

export default LeaderBoard;

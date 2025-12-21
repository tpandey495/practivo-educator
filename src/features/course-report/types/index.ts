export interface ReportCardData {
  id: number;
  value: number | string | React.ReactElement;
  label: string;
  icon: React.ReactElement;
  bgColor: string;
}

export interface LessonReportData {
  id: number;
  lessonName: string;
  yetToStart: number;
  inProgress: number;
  completed: number;
  timeSpent: string;
}

export interface ReportFilters {
  timeRange: 'all' | 'week' | 'month' | 'quarter';
  lessonType: 'all' | 'video' | 'quiz' | 'assignment';
  status: 'all' | 'yetToStart' | 'inProgress' | 'completed';
}



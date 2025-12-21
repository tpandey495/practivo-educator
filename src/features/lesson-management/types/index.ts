export interface Chapter {
  id: string;
  title: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  title: string;
  type?: 'video' | 'quiz' | 'assignment' | 'code' | 'blog';
  content?: any;
}

export interface ContentType {
  value: 'video' | 'quiz' | 'assignment' | 'code' | 'blog';
  label: string;
  icon: React.ComponentType<any>;
}

export interface CourseData {
  id?: string;
  name?: string;
  description?: string;
  chapters?: Chapter[];
  isLoading?: boolean;
}

export interface ChaptersData {
  data?: Chapter[];
  isLoading?: boolean;
}

export interface Chapter {
  id: string | number;
  title: string;
  lessons: Unit[];
}

export interface Unit {
  id: string | number;
  title: string;
  type?: 'video' | 'quiz' | 'assignment' | 'code' | 'blog';
  content?: any;
}

export interface ContentTypeConfig {
  id: number;
  name: string;
  icon?: string;
}

export interface ContentType {
  value: 'video' | 'quiz' | 'assignment' | 'code' | 'blog';
  label: string;
  icon: React.ComponentType<any>;
}

export interface CourseData {
  id?: string | number;
  name?: string;
  description?: string;
  chapters?: Chapter[];
  isLoading?: boolean;
}

export interface ChaptersData {
  data?: Chapter[];
  isLoading?: boolean;
}


interface ICreateCourse {
  level: string | Blob;
  title: string;
  description: string;
  tags?: string[];
  image?: File;
  price: number;
  isFree?: boolean;
}

interface ICourse {
  id: number;
  title: string;
  description: string;
  permaLink: string;
  tags?: string[];
  image: string;
  duration: number;
  price: number;
  createdAt: string; // or Date if you're parsing it
  updatedAt: string; // or Date
  orgCode: string;
  _count: {
    chapters: number;
  };
  createdBy: string;
  totalChapters: number;
}

interface ICourseCardProps {
  thumbnailSrc?: string;
  tags?: string[];
  title: string;
  chapters?: number;
  rating?: number;
  id: number;
  price?: number;
  instructor?: string;
  reviewCount?: number;
  progress?: number; // 0-100 percentage
  learnerRating?: number; // Rating given by learner
  variant?: "browse" | "my-course"; // Card variant
}
export type { ICreateCourse, ICourse, ICourseCardProps };

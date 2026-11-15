interface ICreateCourse {
  level: string | Blob;
  title: string;
  description: string;
  tags?: string[];
  image?: File;
  price: number;
  isFree?: boolean;
  category?: string;
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
// JSON body for POST /course
interface ICreateCoursePayload {
  title: string;
  description: string;
  price: number;
  level: string;
  language: string;
  objective: string[];
  // id of a listed category (from GET /course/categories)
  categoryId?: number;
  // custom name when "Other" is chosen (send instead of categoryId)
  otherCategory?: string;
}

interface ICourseCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
}

export type { ICourseCategory, ICreateCourse, ICreateCoursePayload, ICourse, ICourseCardProps };

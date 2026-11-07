export interface CourseHeader {
  title: string;
  id: string;
  category: string;
  instructor: string;
  rating: number;
  reviews: number;
  completionOverall: number; // 0-100
}

export interface KPI {
  label: string;
  value: number | string;
  suffix?: string;
}

export type LearnerStatus = "Active" | "Completed" | "Inactive";

export interface Learner {
  id: string;
  name: string;
  email?: string;
  enrolled: string; // ISO date
  progress: number; // 0-100
  status: LearnerStatus;
  lastActive: string; // ISO date
}

export interface DistributionSlice {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface Analytics {
  avgProgress: number;
  active: number;
  inactive: number;
  checkouts?: number;
  enrolled?: number;
  distribution: DistributionSlice[];
  rating: { value: number; reviews: number };
  dropoff: { lesson: string; value: number }[];
}

export interface EnrollmentPoint { 
  date: string; 
  value: number; 
}

export interface Enrollments {
  total: number;
  unique: number;
  series: EnrollmentPoint[];
}

export type DashboardGranularity = "daily" | "monthly";

export interface CourseDashboardData {
  course: {
    id: number | string;
    title: string;
    category: string;
    instructor: string;
    rating: number;
    reviewsCount: number;
  };
  kpis: {
    totalEnrolled: number;
    completedLearners: number;
    completionRate: number; // 0-100
    revenue: number;
    currency: string;
  };
  analytics: {
    checkouts: number;
    enrolled: number;
  };
  enrollments: Enrollments;
}

export interface CourseDashboardResponse {
  success: boolean;
  message: string;
  data: CourseDashboardData;
}

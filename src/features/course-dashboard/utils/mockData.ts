import { CourseHeader, KPI, Learner, Analytics, Enrollments, LearnerStatus } from '../types';

export const header: CourseHeader = {
  title: "Complete JavaScript Mastery",
  id: "CS101",
  category: "Web Development",
  instructor: "Sarah Johnson",
  rating: 4.6,
  reviews: 89,
  completionOverall: 68,
};

export const kpis: KPI[] = [
  { label: "Total Enrolled", value: 245, suffix: "learners" },
  { label: "Completion Rate", value: "68%", suffix: "overall" },
  { label: "Revenue Generated", value: "$12,450", suffix: "to date" },
  { label: "Completed Learners", value: 20, suffix: "finished" },
];

export const initialLearners: Learner[] = [
  { id: "1", name: "Arvind Baweja", enrolled: "2023-04-04", progress: 85, status: "Active", lastActive: "2023-04-09" },
  { id: "2", name: "Pragya Singh", enrolled: "2023-04-04", progress: 70, status: "Active", lastActive: "2023-04-08" },
  { id: "3", name: "Abhay Shah", enrolled: "2023-04-04", progress: 40, status: "Active", lastActive: "2023-04-06" },
  { id: "4", name: "Rajeev Choudhary", enrolled: "2023-04-04", progress: 100, status: "Completed", lastActive: "2023-04-07" },
];

export const analytics: Analytics = {
  avgProgress: 65,
  active: 180,
  inactive: 45,
  distribution: [
    { name: "Completed", value: 20 },
    { name: "Active", value: 180 },
    { name: "Dropped", value: 45 },
  ],
  rating: { value: 4.6, reviews: 89 },
  dropoff: [
    { lesson: "Lesson 3: Functions", value: 15 },
    { lesson: "Lesson 7: Async Programming", value: 25 },
    { lesson: "Lesson 12: Advanced Concepts", value: 18 },
  ],
};

export const enrollments: Enrollments = {
  total: 20550,
  unique: 15331,
  series: [
    { date: "2023-02-26", value: 9000 },
    { date: "2023-03-05", value: 10800 },
    { date: "2023-03-12", value: 11500 },
    { date: "2023-03-19", value: 13400 },
    { date: "2023-03-26", value: 15800 },
    { date: "2023-04-02", value: 14900 },
  ],
};

export const STATUS_COLOR: Record<LearnerStatus, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
  Active: "success",
  Completed: "info",
  Inactive: "warning",
};

export interface Learner {
  id: number;
  name: string;
  role: string;
  email: string;
  completion: string;
  status: 'ONGOING' | 'COMPLETED' | 'INACTIVE';
  avatar: string;
}

export interface LearnerFilters {
  searchQuery: string;
  learnerType: 'direct' | 'invited' | 'all';
  status: 'all' | 'ONGOING' | 'COMPLETED' | 'INACTIVE';
}

export interface AddLearnerData {
  name: string;
  email: string;
  role: string;
  status: 'ONGOING' | 'COMPLETED' | 'INACTIVE';
}

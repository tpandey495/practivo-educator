export interface QuestionBank {
  id: string;
  title: string;
  description?: string;
  questionCount: number;
  createdAt: string;
  updatedAt: string;
  topics?: string[];
}

export interface QuestionBankFilters {
  searchQuery: string;
  sortBy: 'title' | 'createdAt' | 'questionCount';
  sortOrder: 'asc' | 'desc';
}

export interface CreateQuestionBankData {
  title: string;
  description?: string;
  topics?: string[];
}

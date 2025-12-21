export interface Question {
  questionId: number;
  question: string;
  score: number;
  questionType: "Multiple Choice" | "Fill in the blank" | string;
  answerOptions: AnswerOption[] | null;
  correctOptionId: number;
  id?: string;
  title?: string;
  type?: 'mcq' | 'subjective' | 'fillup' | 'video' | 'blog';
  content?: any;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  topicId?: string;
  questionBankId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Topic {
  id: string;
  name: string;
  description?: string;
  questionCount: number;
  questionBankId: string;
}

export interface QuestionFilters {
  searchQuery: string;
  type?: Question['type'];
  difficulty?: Question['difficulty'];
  topicId?: string;
}

export interface CreateQuestionData {
  title: string;
  type: Question['type'];
  content: any;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  difficulty: Question['difficulty'];
  tags: string[];
  topicId: string;
}

export interface AnswerOption {
  optionId: number;
  option: string;
}

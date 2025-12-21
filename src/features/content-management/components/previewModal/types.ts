

export type ContentType =
  | "multiple_choice"
  | "single_choice"
  | "fill_up"
  | "subjective"
  | "blog"
  | "video";

export interface GeneratedQuestion {
  id: string;
  type: ContentType;
  text: string;
  description?: string;
  options?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  correctAnswer?: string;
  score?: number;
}

export interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (questions: GeneratedQuestion[]) => void;
  contentType: ContentType;
}

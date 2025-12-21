interface ICreateQuestion {
    text: string;
    type: "multiple_choice" | "single_choice" | "fill_up";
    score: number;
    unit: number;
    options: Array<{
        text: string;
        isCorrect: boolean;
    }>;
    correctAnswer?: string;
    courseId: number;
}
export type { ICreateQuestion }
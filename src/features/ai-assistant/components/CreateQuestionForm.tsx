import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMessage } from "../store/aiContext.slice";
import { useAssistantContext } from "../hooks/useAssistantContext";
import { createQuestion } from "../services/aiAssistant.api";
import { useCreditCost, perBlock } from "../../billing/hooks/useCredits";
import CreditCostHint from "../../billing/components/CreditCostHint";
import { baseApi } from "../../../api/api.routes";
import {
  AIQuestionType,
  CreateQuestionPayload,
  CreateQuestionResponse,
} from "../types/aiAssistant.types";

interface CreateQuestionFormProps {
  onCancel: () => void;
  onResetResult?: () => void;
}

export const MIN_QUESTIONS = 1;
export const MAX_QUESTIONS = 10;
const DEFAULT_QUESTION_COUNT = 2;
const DEFAULT_QUESTION_TYPE: AIQuestionType = "multiple_choice";

const QUESTION_TYPE_OPTIONS: { id: AIQuestionType; label: string }[] = [
  { id: "multiple_choice", label: "Multiple Choice" },
  { id: "single_choice", label: "Single Choice" },
  { id: "fill_up", label: "Fill in the Blank" },
  { id: "subjective", label: "Subjective" },
  { id: "code", label: "Coding Problem" },
];

type QuestionFormErrors = {
  questionCount?: string;
};

type QuestionsPageState = {
  contentTypeId?: number | string;
  type?: string;
  parentContentType?: string;
} | null;

const toPositiveInt = (value: unknown): number | null => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
};

export const CreateQuestionForm: React.FC<CreateQuestionFormProps> = ({
  onCancel,
  onResetResult,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { lessonId, searchParams } = useAssistantContext();

  // Lesson and content type come from the questions page the user opened:
  // lessonId from ?lessonId=, contentTypeId from router state set by AddContentMenu (or ?contentTypeId=)
  const pageState = location.state as QuestionsPageState;
  const pageLessonId = toPositiveInt(lessonId);
  const pageContentTypeId = toPositiveInt(pageState?.contentTypeId ?? searchParams.contentTypeId);
  const contentTypeName = pageState?.type || pageState?.parentContentType;
  const hasTarget = pageLessonId !== null && pageContentTypeId !== null;

  const [questionType, setQuestionType] = useState<AIQuestionType>(DEFAULT_QUESTION_TYPE);
  const [questionCount, setQuestionCount] = useState<number>(DEFAULT_QUESTION_COUNT);

  // Backend charges FIVE_MCQS per 5 questions
  const credit = useCreditCost("FIVE_MCQS", perBlock(questionCount, 5));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateQuestionResponse | null>(null);
  const [errors, setErrors] = useState<QuestionFormErrors>({});

  const targetLabel = contentTypeName || `content type #${pageContentTypeId}`;
  const typeLabel = QUESTION_TYPE_OPTIONS.find((t) => t.id === questionType)?.label ?? questionType;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !hasTarget || !credit.canAfford) return;

    const newErrors: QuestionFormErrors = {};
    if (
      !Number.isInteger(questionCount) ||
      questionCount < MIN_QUESTIONS ||
      questionCount > MAX_QUESTIONS
    ) {
      newErrors.questionCount = `Number of questions must be between ${MIN_QUESTIONS} and ${MAX_QUESTIONS}.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setError(null);

    const payload: CreateQuestionPayload = {
      lessonId: pageLessonId,
      contentTypeId: pageContentTypeId,
      type: questionType,
      questionCount,
    };

    try {
      const response = await createQuestion(payload);
      setResult(response);

      // Refresh the question list on the questions page
      dispatch(baseApi.util.invalidateTags(["Unit", "Lesson", "Question"]));

      dispatch(
        addMessage({
          id: `msg-question-${Date.now()}`,
          sender: "assistant",
          text: `Generated ${questionCount} ${typeLabel} question${
            questionCount === 1 ? "" : "s"
          } for ${targetLabel} in lesson #${payload.lessonId}.`,
          timestamp: Date.now(),
          status: "success",
          data: response,
        })
      );
    } catch (err: any) {
      setError(err?.message || "Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }} data-testid="create-question-success">
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: "12px",
            border: "1px solid #bbf7d0",
            background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "#22c55e",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1.5,
            }}
          >
            <CheckCircle2 size={26} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#14532d", fontSize: "16px" }}>
            Questions Generated!
          </Typography>
          <Typography variant="body2" sx={{ color: "#166534", mt: 0.5, fontSize: "13px" }}>
            {result.message ||
              `${typeLabel} questions were added to ${targetLabel} and are ready for review.`}
          </Typography>
        </Paper>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={onCancel}
            sx={{ borderColor: "#cbd5e1", color: "#475569", textTransform: "none", borderRadius: "8px" }}
          >
            Back to Actions
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              // Keep the question type so more questions can be added quickly
              setError(null);
              setResult(null);
              if (onResetResult) onResetResult();
            }}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
            }}
          >
            Create Another
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
      data-testid="create-question-form"
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "14px" }}>
            Generate Questions with AI
          </Typography>
          <Chip
            label="Assessment"
            size="small"
            sx={{ height: 18, fontSize: "10px", fontWeight: 600, bgcolor: "#d1fae5", color: "#065f46" }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "12px" }}>
          AI writes questions from this lesson's material and adds them to the chosen content.
        </Typography>
      </Box>

      {hasTarget ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }} data-testid="question-target">
          <Typography variant="caption" sx={{ color: "#475569", fontWeight: 600 }}>
            Adding to:
          </Typography>
          <Chip
            label={`Lesson #${pageLessonId}`}
            size="small"
            sx={{ height: 20, fontSize: "11px", bgcolor: "#f1f5f9", color: "#334155" }}
          />
          <Chip
            label={contentTypeName || `Content type #${pageContentTypeId}`}
            size="small"
            sx={{ height: 20, fontSize: "11px", fontWeight: 600, bgcolor: "#d1fae5", color: "#065f46" }}
          />
        </Box>
      ) : (
        <Alert severity="warning" sx={{ borderRadius: "8px", fontSize: "12px" }} data-testid="question-missing-target">
          Open a lesson and choose a content type (e.g. Quiz or Code) to generate questions for it.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: "8px", fontSize: "12px" }} data-testid="question-api-error">
          {error}
        </Alert>
      )}

      <Box data-testid="question-type-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Question Type <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {QUESTION_TYPE_OPTIONS.map((type) => {
            const isSelected = questionType === type.id;
            return (
              <Chip
                key={type.id}
                label={type.label}
                clickable
                onClick={() => setQuestionType(type.id)}
                disabled={isLoading}
                size="small"
                data-testid={`question-type-${type.id}`}
                aria-pressed={isSelected}
                sx={{
                  fontSize: "11px",
                  fontWeight: isSelected ? 600 : 500,
                  bgcolor: isSelected ? "#059669" : "#ffffff",
                  color: isSelected ? "#ffffff" : "#475569",
                  border: "1px solid",
                  borderColor: isSelected ? "#059669" : "#cbd5e1",
                  "&:hover": { bgcolor: isSelected ? "#047857" : "#f1f5f9" },
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Box data-testid="question-count-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Number of Questions <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <TextField
          type="number"
          fullWidth
          size="small"
          value={Number.isNaN(questionCount) ? "" : questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
          error={Boolean(errors.questionCount)}
          helperText={errors.questionCount || `Between ${MIN_QUESTIONS} and ${MAX_QUESTIONS} questions`}
          disabled={isLoading}
          inputProps={{ min: MIN_QUESTIONS, max: MAX_QUESTIONS, "aria-label": "Number of Questions" }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#ffffff" } }}
        />
      </Box>

      <CreditCostHint {...credit} />

      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isLoading}
          sx={{ flex: 1, borderColor: "#cbd5e1", color: "#475569", textTransform: "none", borderRadius: "8px" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || !hasTarget || !credit.canAfford}
          data-testid="submit-question-btn"
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Sparkles size={16} />}
          sx={{
            flex: 2,
            py: 1,
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
            background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
            boxShadow: "0 4px 12px rgba(5, 150, 105, 0.25)",
            "&:hover": { background: "linear-gradient(135deg, #047857 0%, #059669 100%)" },
          }}
        >
          {isLoading ? "Generating Questions..." : "Generate Questions"}
        </Button>
      </Box>
    </Box>
  );
};

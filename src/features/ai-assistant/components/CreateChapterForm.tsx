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
import { addMessage } from "../store/aiContext.slice";
import { useAssistantContext } from "../hooks/useAssistantContext";
import { createChapter } from "../services/aiAssistant.api";
import { baseApi } from "../../../api/api.routes";
import { CONTENT_TYPE_OPTIONS, DEFAULT_CONTENT_TYPES } from "../constants/actions";
import {
  ChapterContentType,
  CreateChapterPayload,
  CreateChapterResponse,
} from "../types/aiAssistant.types";

export const MIN_LESSONS = 1;
export const MAX_LESSONS = 10;
const DEFAULT_LESSONS = 3;

type ChapterFormErrors = {
  title?: string;
  description?: string;
  noOfLessons?: string;
  contentTypes?: string;
};

interface CreateChapterFormProps {
  onCancel: () => void;
  onResetResult?: () => void;
}

export const CreateChapterForm: React.FC<CreateChapterFormProps> = ({
  onCancel,
  onResetResult,
}) => {
  const dispatch = useDispatch();
  const { courseId } = useAssistantContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noOfLessons, setNoOfLessons] = useState<number>(DEFAULT_LESSONS);
  const [contentTypes, setContentTypes] = useState<ChapterContentType[]>(DEFAULT_CONTENT_TYPES);
  const [result, setResult] = useState<CreateChapterResponse | null>(null);
  const [errors, setErrors] = useState<ChapterFormErrors>({});

  const numericCourseId = Number(courseId);
  const hasValidCourseId = Number.isInteger(numericCourseId) && numericCourseId > 0;

  const toggleContentType = (type: ChapterContentType) => {
    setContentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!hasValidCourseId) {
      setError("Open a course before creating a chapter.");
      return;
    }

    const newErrors: ChapterFormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Chapter title is required.";
    }
    if (!description.trim()) {
      newErrors.description = "Chapter description is required.";
    }
    if (!Number.isInteger(noOfLessons) || noOfLessons < MIN_LESSONS || noOfLessons > MAX_LESSONS) {
      newErrors.noOfLessons = `Number of lessons must be between ${MIN_LESSONS} and ${MAX_LESSONS}.`;
    }
    if (contentTypes.length === 0) {
      newErrors.contentTypes = "Select at least one content type.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setError(null);

    const payload: CreateChapterPayload = {
      courseId: numericCourseId,
      title: title.trim(),
      description: description.trim(),
      noOfLessons,
      contentTypes,
    };

    try {
      const response = await createChapter(payload);
      setResult(response);

      // Refresh chapter/lesson lists on the course edit page
      dispatch(baseApi.util.invalidateTags(["Chapter", "Lesson", "Course"]));

      const lessonCount = response?.data?.lessons?.length ?? noOfLessons;
      dispatch(
        addMessage({
          id: `msg-chap-${Date.now()}`,
          sender: "assistant",
          text: `Chapter "${payload.title}" was generated with ${lessonCount} lesson${
            lessonCount === 1 ? "" : "s"
          } and added to course #${numericCourseId}.`,
          timestamp: Date.now(),
          status: "success",
          data: response,
        })
      );
    } catch (err: any) {
      setError(err?.message || "Failed to generate chapter. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    const generatedLessons = result.data?.lessons ?? [];
    return (
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }} data-testid="create-chapter-success">
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
            Chapter Created!
          </Typography>
          <Typography variant="body2" sx={{ color: "#166534", mt: 0.5, fontSize: "13px" }}>
            {result.message || `Chapter "${title.trim()}" has been created and added to your course curriculum.`}
          </Typography>
          {generatedLessons.length > 0 && (
            <Chip
              label={`${generatedLessons.length} Lessons Generated`}
              size="small"
              sx={{ mt: 1.5, bgcolor: "#dcfce7", color: "#15803d", fontWeight: 600, fontSize: "11px" }}
            />
          )}
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
              setTitle("");
              setDescription("");
              setNoOfLessons(DEFAULT_LESSONS);
              setContentTypes(DEFAULT_CONTENT_TYPES);
              setError(null);
              setResult(null);
              if (onResetResult) onResetResult();
            }}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
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
      data-testid="create-chapter-form"
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "14px" }}>
            Create Chapter with AI
          </Typography>
          <Chip
            label="Curriculum"
            size="small"
            sx={{ height: 18, fontSize: "10px", fontWeight: 600, bgcolor: "#fef3c7", color: "#92400e" }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "12px" }}>
          Generate a new chapter structure with learning objectives and outcomes.
        </Typography>
      </Box>

      {!hasValidCourseId && (
        <Alert severity="warning" sx={{ borderRadius: "8px", fontSize: "12px" }} data-testid="chapter-missing-course">
          Open a course to add a chapter to it.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: "8px", fontSize: "12px" }} data-testid="chapter-api-error">
          {error}
        </Alert>
      )}

      <Box data-testid="chapter-title-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Chapter Title <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="e.g. Asynchronous JavaScript & Promises"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={Boolean(errors.title)}
          helperText={errors.title}
          disabled={isLoading}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#ffffff" } }}
        />
      </Box>

      <Box data-testid="chapter-description-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Learning Objectives / Topics <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          size="small"
          placeholder="e.g. Understand callback queues, event loop, Promise chaining, and async/await syntax."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={Boolean(errors.description)}
          helperText={errors.description}
          disabled={isLoading}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#ffffff" } }}
        />
      </Box>

      <Box data-testid="chapter-lessons-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Number of Lessons <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <TextField
          type="number"
          fullWidth
          size="small"
          value={Number.isNaN(noOfLessons) ? "" : noOfLessons}
          onChange={(e) => setNoOfLessons(parseInt(e.target.value, 10))}
          error={Boolean(errors.noOfLessons)}
          helperText={errors.noOfLessons || `Between ${MIN_LESSONS} and ${MAX_LESSONS} lessons`}
          disabled={isLoading}
          inputProps={{ min: MIN_LESSONS, max: MAX_LESSONS, "aria-label": "Number of Lessons" }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#ffffff" } }}
        />
      </Box>

      <Box data-testid="chapter-content-types-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Content Types <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {CONTENT_TYPE_OPTIONS.map((type) => {
            const isSelected = contentTypes.includes(type.id);
            return (
              <Chip
                key={type.id}
                label={type.label}
                clickable
                onClick={() => toggleContentType(type.id)}
                disabled={isLoading}
                size="small"
                data-testid={`chapter-content-type-${type.id}`}
                aria-pressed={isSelected}
                sx={{
                  fontSize: "11px",
                  fontWeight: isSelected ? 600 : 500,
                  bgcolor: isSelected ? "#d97706" : "#ffffff",
                  color: isSelected ? "#ffffff" : "#475569",
                  border: "1px solid",
                  borderColor: isSelected ? "#d97706" : "#cbd5e1",
                  "&:hover": { bgcolor: isSelected ? "#b45309" : "#f1f5f9" },
                }}
              />
            );
          })}
        </Box>
        {errors.contentTypes && (
          <Typography variant="caption" sx={{ color: "#d32f2f", mt: 0.5, display: "block" }}>
            {errors.contentTypes}
          </Typography>
        )}
      </Box>

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
          disabled={isLoading || !hasValidCourseId}
          data-testid="submit-chapter-btn"
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Sparkles size={16} />}
          sx={{
            flex: 2,
            py: 1,
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
            background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
            boxShadow: "0 4px 12px rgba(217, 119, 6, 0.25)",
            "&:hover": { background: "linear-gradient(135deg, #b45309 0%, #d97706 100%)" },
          }}
        >
          {isLoading ? "Generating Chapter..." : "Create Chapter"}
        </Button>
      </Box>
    </Box>
  );
};


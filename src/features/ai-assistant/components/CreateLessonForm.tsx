import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  MenuItem,
} from "@mui/material";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/aiContext.slice";
import { useAssistantContext } from "../hooks/useAssistantContext";
import { createLesson } from "../services/aiAssistant.api";
import { baseApi } from "../../../api/api.routes";
import { useGetChaptersQuery } from "../../chapter-management/api/chapterApi";
import { CONTENT_TYPE_OPTIONS, DEFAULT_CONTENT_TYPES } from "../constants/actions";
import {
  ChapterContentType,
  CreateLessonPayload,
  CreateLessonResponse,
} from "../types/aiAssistant.types";

interface CreateLessonFormProps {
  onCancel: () => void;
  onResetResult?: () => void;
}

type ChapterOption = { id: number; title: string };

type LessonFormErrors = {
  chapterId?: string;
  title?: string;
  description?: string;
  contentTypes?: string;
};

/** The chapter list endpoint has returned several shapes; normalise to {id, title}[]. */
const extractChapters = (data: any): ChapterOption[] => {
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.chapters)
      ? data.chapters
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.chapters)
          ? data.data.chapters
          : [];
  return list
    .filter((c: any) => c && c.id != null)
    .map((c: any) => ({ id: Number(c.id), title: c.title || c.name || `Chapter ${c.id}` }));
};

export const CreateLessonForm: React.FC<CreateLessonFormProps> = ({
  onCancel,
  onResetResult,
}) => {
  const dispatch = useDispatch();
  const { courseId } = useAssistantContext();

  const {
    data: chaptersResponse,
    isLoading: isChaptersLoading,
    isError: isChaptersError,
  } = useGetChaptersQuery(
    { id: courseId || "", page: 1, limit: 100 },
    { skip: !courseId }
  );
  const chapters = useMemo(() => extractChapters(chaptersResponse), [chaptersResponse]);

  const [chapterId, setChapterId] = useState<number | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentTypes, setContentTypes] = useState<ChapterContentType[]>(DEFAULT_CONTENT_TYPES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateLessonResponse | null>(null);
  const [errors, setErrors] = useState<LessonFormErrors>({});

  const selectedChapter = chapters.find((c) => c.id === chapterId);

  const toggleContentType = (type: ChapterContentType) => {
    setContentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const newErrors: LessonFormErrors = {};
    if (chapterId === "") {
      newErrors.chapterId = "Select the chapter to add this lesson to.";
    }
    if (!title.trim()) {
      newErrors.title = "Lesson title is required.";
    }
    if (!description.trim()) {
      newErrors.description = "Lesson description is required.";
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

    const payload: CreateLessonPayload = {
      chapterId: chapterId as number,
      title: title.trim(),
      description: description.trim(),
      contentTypes,
    };

    try {
      const response = await createLesson(payload);
      setResult(response);

      // Refresh chapter/lesson lists on the course edit page
      dispatch(baseApi.util.invalidateTags(["Lesson", "Chapter"]));

      dispatch(
        addMessage({
          id: `msg-lesson-${Date.now()}`,
          sender: "assistant",
          text: `Lesson "${payload.title}" was generated and added to chapter "${
            selectedChapter?.title ?? `#${payload.chapterId}`
          }".`,
          timestamp: Date.now(),
          status: "success",
          data: response,
        })
      );
    } catch (err: any) {
      setError(err?.message || "Failed to generate lesson. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }} data-testid="create-lesson-success">
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
            Lesson Created!
          </Typography>
          <Typography variant="body2" sx={{ color: "#166534", mt: 0.5, fontSize: "13px" }}>
            {result.message ||
              `Lesson "${title.trim()}" has been added to chapter "${selectedChapter?.title ?? ""}".`}
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
              // Keep the chosen chapter so several lessons can be added in a row
              setTitle("");
              setDescription("");
              setContentTypes(DEFAULT_CONTENT_TYPES);
              setError(null);
              setResult(null);
              if (onResetResult) onResetResult();
            }}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
            }}
          >
            Create Another
          </Button>
        </Box>
      </Box>
    );
  }

  const noChapters = !isChaptersLoading && !isChaptersError && Boolean(courseId) && chapters.length === 0;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
      data-testid="create-lesson-form"
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "14px" }}>
            Create Lesson with AI
          </Typography>
          <Chip
            label="Lesson"
            size="small"
            sx={{ height: 18, fontSize: "10px", fontWeight: 600, bgcolor: "#e0f2fe", color: "#0369a1" }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "12px" }}>
          Pick a chapter and describe the lesson; AI generates its content.
        </Typography>
      </Box>

      {!courseId && (
        <Alert severity="warning" sx={{ borderRadius: "8px", fontSize: "12px" }} data-testid="lesson-missing-course">
          Open a course to add a lesson to one of its chapters.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: "8px", fontSize: "12px" }} data-testid="lesson-api-error">
          {error}
        </Alert>
      )}

      <Box data-testid="lesson-chapter-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Chapter <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <TextField
          select
          fullWidth
          size="small"
          value={chapterId}
          onChange={(e) => setChapterId(e.target.value === "" ? "" : Number(e.target.value))}
          error={Boolean(errors.chapterId) || isChaptersError}
          helperText={
            errors.chapterId ||
            (isChaptersError
              ? "Could not load chapters. Close and reopen the assistant to retry."
              : noChapters
                ? "This course has no chapters yet. Create a chapter first."
                : undefined)
          }
          disabled={isLoading || isChaptersLoading || !courseId || chapters.length === 0}
          SelectProps={{
            displayEmpty: true,
            inputProps: { "aria-label": "Chapter", "data-testid": "lesson-chapter-select" },
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#ffffff" } }}
        >
          <MenuItem value="" disabled>
            {isChaptersLoading ? "Loading chapters..." : "Select a chapter"}
          </MenuItem>
          {chapters.map((chapter) => (
            <MenuItem key={chapter.id} value={chapter.id}>
              {chapter.title}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box data-testid="lesson-title-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Lesson Title <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="e.g. Python Control Flow"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={Boolean(errors.title)}
          helperText={errors.title}
          disabled={isLoading}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#ffffff" } }}
        />
      </Box>

      <Box data-testid="lesson-content-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Description <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          size="small"
          placeholder="e.g. Understanding if-else statements and while/for loops."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={Boolean(errors.description)}
          helperText={errors.description}
          disabled={isLoading}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#ffffff" } }}
        />
      </Box>

      <Box data-testid="lesson-content-types-field">
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
                data-testid={`lesson-content-type-${type.id}`}
                aria-pressed={isSelected}
                sx={{
                  fontSize: "11px",
                  fontWeight: isSelected ? 600 : 500,
                  bgcolor: isSelected ? "#0284c7" : "#ffffff",
                  color: isSelected ? "#ffffff" : "#475569",
                  border: "1px solid",
                  borderColor: isSelected ? "#0284c7" : "#cbd5e1",
                  "&:hover": { bgcolor: isSelected ? "#0369a1" : "#f1f5f9" },
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
          disabled={isLoading || !courseId}
          data-testid="submit-lesson-btn"
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Sparkles size={16} />}
          sx={{
            flex: 2,
            py: 1,
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
            background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
            boxShadow: "0 4px 12px rgba(2, 132, 199, 0.25)",
            "&:hover": { background: "linear-gradient(135deg, #0369a1 0%, #0284c7 100%)" },
          }}
        >
          {isLoading ? "Generating Lesson..." : "Create Lesson"}
        </Button>
      </Box>
    </Box>
  );
};

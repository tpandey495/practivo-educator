import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  CircularProgress,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Chip,
} from "@mui/material";
import {
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Youtube,
  Layers,
  ListChecks,
} from "lucide-react";
import {
  AssistantAction,
  CourseGenerationMode,
  CreateCourseInput,
  CreateCoursePayload,
  PlaylistCoursePayload,
  ValidationErrors,
} from "../types/aiAssistant.types";
import {
  validateCreateCourseForm,
  MAX_COURSE_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MIN_PLAYLIST_VIDEOS,
  MAX_PLAYLIST_VIDEOS,
} from "../utils/validateCreateCourseForm";
import { useCreditCost } from "../../billing/hooks/useCredits";
import CreditCostHint from "../../billing/components/CreditCostHint";

const DEFAULT_MAX_VIDEOS = 5;

const EMPTY_VALUES: CreateCourseInput = {
  courseName: "",
  description: "",
  difficulty: "beginner",
  playlistUrl: "",
  maxVideos: DEFAULT_MAX_VIDEOS,
};

interface CreateCourseFormProps {
  initialMode?: CourseGenerationMode;
  selectedAction?: AssistantAction;
  isLoading: boolean;
  error: string | null;
  result: any | null;
  /** Receives a PlaylistCoursePayload in the YouTube flow, a CreateCoursePayload otherwise. */
  onSubmit: (payload: CreateCoursePayload | PlaylistCoursePayload) => Promise<void> | void;
  onCancel: () => void;
  onResetResult?: () => void;
}

export const CreateCourseForm: React.FC<CreateCourseFormProps> = ({
  initialMode = "structure_only",
  selectedAction,
  isLoading,
  error,
  result,
  onSubmit,
  onCancel,
  onResetResult,
}) => {
  // CREATE_COURSE_STRUCTURE is "Create Course from YouTube" - the only flow with YouTube playlist URL
  const isYouTubeFlow = selectedAction === "CREATE_COURSE_STRUCTURE";
  const isWorkflowFlow = selectedAction === "CREATE_COURSE_WORKFLOW";

  const [mode, setMode] = useState<CourseGenerationMode>(
    isWorkflowFlow || selectedAction === "CREATE_COURSE_WITH_QUESTIONS"
      ? "structure_with_questions"
      : initialMode
  );

  // Local form state - preserved across errors
  const [values, setValues] = useState<CreateCourseInput>(EMPTY_VALUES);
  const validate = (v: CreateCourseInput) => validateCreateCourseForm(v, { isYouTubeFlow });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Same operation the backend charges for this request (flat price per course)
  const withQuestions = mode === "structure_with_questions";
  const credit = useCreditCost(
    isYouTubeFlow
      ? withQuestions
        ? "PLAYLIST_WITH_QUESTIONS"
        : "PLAYLIST_WITHOUT_QUESTIONS"
      : withQuestions
        ? "COURSE_WITH_QUESTIONS"
        : "COURSE_OUTLINE"
  );

  const handleModeChange = (newMode: CourseGenerationMode) => {
    setMode(newMode);
  };

  const handleChange = (field: keyof CreateCourseInput, val: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: val,
    }));

    // Revalidate if touched
    if (touched[field]) {
      const updated = { ...values, [field]: val };
      const currentErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [field]: currentErrors[field],
      }));
    }
  };

  const handleBlur = (field: keyof CreateCourseInput) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate(values);
    setErrors((prev) => ({
      ...prev,
      [field]: currentErrors[field],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !credit.canAfford) return;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched(
      isYouTubeFlow
        ? { playlistUrl: true, difficulty: true, maxVideos: true }
        : { courseName: true, description: true, difficulty: true }
    );

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // questionGeneration: false => course structure only, true => along with questions
    const questionGeneration = mode === "structure_with_questions";

    if (isYouTubeFlow) {
      const playlistPayload: PlaylistCoursePayload = {
        playlistUrl: (values.playlistUrl || "").trim(),
        difficulty: values.difficulty,
        questionGeneration,
        maxVideos: values.maxVideos as number,
      };
      onSubmit(playlistPayload);
      return;
    }

    const payload: CreateCoursePayload = {
      courseName: values.courseName.trim(),
      description: values.description.trim(),
      difficulty: values.difficulty,
      questionGeneration,
    };

    onSubmit(payload);
  };

  // If succeeded and result exists, show success state with option to create another
  if (result) {
    const r = result as any;
    const chapters =
      r?.data?.savedCourse?.chapters ||
      r?.courseStructure?.chapters ||
      r?.chapters ||
      [];
    const isWithQuestions =
      mode === "structure_with_questions" ||
      Boolean(r?.totalQuestions) ||
      Boolean(r?.hasQuestions) ||
      Boolean(r?.data?.questionSummary?.total);
    const playlistInfo = r?.data?.playlist;
    const playlistQuestionTotal: number | undefined = r?.data?.questionSummary?.total;
    const createdCourseName =
      r?.data?.savedCourse?.title || playlistInfo?.title || values.courseName;

    return (
      <Box
        sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
        data-testid="create-course-success"
      >
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
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#14532d", fontSize: "16px" }}
          >
            {isWithQuestions
              ? "Course Structure & Questions Generated!"
              : "Course Structure Generated!"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#166534", mt: 0.5, fontSize: "13px" }}
          >
            {r?.message || `Successfully generated course for "${createdCourseName}".`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 1.5,
              flexWrap: "wrap",
            }}
          >
            {chapters.length > 0 && (
              <Chip
                label={`${chapters.length} Chapters Generated`}
                size="small"
                sx={{
                  bgcolor: "#dcfce7",
                  color: "#15803d",
                  fontWeight: 600,
                  fontSize: "11px",
                }}
              />
            )}
            {isWithQuestions && (
              <Chip
                label={
                  playlistQuestionTotal
                    ? `${playlistQuestionTotal} Questions Generated`
                    : "Interactive Quizzes Included"
                }
                size="small"
                sx={{
                  bgcolor: "#fef3c7",
                  color: "#92400e",
                  fontWeight: 600,
                  fontSize: "11px",
                }}
              />
            )}
            {isYouTubeFlow && values.playlistUrl && (
              <Chip
                icon={<Youtube size={12} color="#dc2626" />}
                label={playlistInfo?.title ? `Playlist: ${playlistInfo.title}` : "YouTube Playlist Linked"}
                size="small"
                sx={{
                  bgcolor: "#fee2e2",
                  color: "#991b1b",
                  fontWeight: 600,
                  fontSize: "11px",
                  "& .MuiChip-icon": { ml: "4px" },
                }}
              />
            )}
          </Box>
        </Paper>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={onCancel}
            sx={{
              borderColor: "#cbd5e1",
              color: "#475569",
              textTransform: "none",
              borderRadius: "8px",
              fontSize: "13px",
              "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" },
            }}
          >
            Back to Actions
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setValues(EMPTY_VALUES);
              setErrors({});
              setTouched({});
              if (onResetResult) onResetResult();
            }}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "13px",
              background: "linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)",
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
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      data-testid="create-course-form"
    >
      {/* Title & Description Header */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, color: "#0f172a", fontSize: "14px" }}
          >
            {isYouTubeFlow
              ? "Create Course from YouTube"
              : mode === "structure_with_questions"
                ? "Create Course along with Questions"
                : "Create Course"}
          </Typography>
          <Chip
            label={
              isYouTubeFlow
                ? "YouTube Playlist"
                : mode === "structure_with_questions"
                  ? "Structure + Quizzes"
                  : "Structure Only"
            }
            size="small"
            sx={{
              height: 18,
              fontSize: "10px",
              fontWeight: 600,
              bgcolor:
                isYouTubeFlow
                  ? "#fee2e2"
                  : mode === "structure_with_questions"
                    ? "#f3e8ff"
                    : "#fee2e2",
              color:
                isYouTubeFlow
                  ? "#b91c1c"
                  : mode === "structure_with_questions"
                    ? "#7e22ce"
                    : "#b91c1c",
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "12px" }}>
          {isYouTubeFlow
            ? "Generate course structure and lessons automatically from a YouTube playlist."
            : mode === "structure_with_questions"
              ? "Generate complete course chapters and lessons with integrated quiz and practice questions."
              : "Generate course curriculum with structured chapters and lessons using AI prompt."}
        </Typography>
      </Box>

      {/* Mode Switcher Tabs */}
      <Box
        sx={{
          display: "flex",
          gap: 0.75,
          p: 0.5,
          bgcolor: "#f1f5f9",
          borderRadius: "10px",
        }}
        data-testid="generation-mode-switcher"
      >
        <Button
          size="small"
          onClick={() => handleModeChange("structure_only")}
          variant={mode === "structure_only" ? "contained" : "text"}
          startIcon={<Layers size={14} />}
          data-testid="mode-tab-structure"
          sx={{
            flex: 1,
            textTransform: "none",
            fontSize: "12px",
            fontWeight: 600,
            borderRadius: "8px",
            boxShadow:
              mode === "structure_only" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
            bgcolor: mode === "structure_only" ? "#ffffff" : "transparent",
            color: mode === "structure_only" ? "#dc2626" : "#64748b",
            "&:hover": {
              bgcolor: mode === "structure_only" ? "#ffffff" : "#e2e8f0",
            },
          }}
        >
          Course Structure
        </Button>
        <Button
          size="small"
          onClick={() => handleModeChange("structure_with_questions")}
          variant={mode === "structure_with_questions" ? "contained" : "text"}
          startIcon={<ListChecks size={14} />}
          data-testid="mode-tab-questions"
          sx={{
            flex: 1,
            textTransform: "none",
            fontSize: "12px",
            fontWeight: 600,
            borderRadius: "8px",
            boxShadow:
              mode === "structure_with_questions"
                ? "0 2px 6px rgba(0,0,0,0.08)"
                : "none",
            bgcolor:
              mode === "structure_with_questions" ? "#ffffff" : "transparent",
            color:
              mode === "structure_with_questions" ? "#7c3aed" : "#64748b",
            "&:hover": {
              bgcolor:
                mode === "structure_with_questions" ? "#ffffff" : "#e2e8f0",
            },
          }}
        >
          Along with Questions
        </Button>
      </Box>

      {/* Recoverable API Error Banner */}
      {error && (
        <Alert
          severity="error"
          data-testid="form-api-error"
          sx={{
            borderRadius: "8px",
            fontSize: "12px",
            "& .MuiAlert-message": { width: "100%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{error}</span>
            <Button
              size="small"
              color="inherit"
              onClick={handleSubmit}
              disabled={isLoading}
              startIcon={<RefreshCw size={12} />}
              sx={{
                minWidth: 0,
                textTransform: "none",
                fontSize: "11px",
                ml: 1,
                p: 0.5,
              }}
            >
              Retry
            </Button>
          </Box>
        </Alert>
      )}

      {/* YouTube Playlist URL Field (Only visible when creating from YouTube) */}
      {isYouTubeFlow && (
        <Box data-testid="playlist-url-field">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 0.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Youtube size={15} color="#dc2626" />
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: "#334155" }}
              >
                YouTube Playlist URL <span style={{ color: "#ef4444" }}>*</span>
              </Typography>
            </Box>
            <Chip
              label="YouTube"
              size="small"
              sx={{
                height: 16,
                fontSize: "9px",
                bgcolor: "#fee2e2",
                color: "#991b1b",
                fontWeight: 600,
              }}
            />
          </Box>
          <TextField
            id="playlist-url-input"
            fullWidth
            size="small"
            placeholder="https://www.youtube.com/playlist?list=..."
            value={values.playlistUrl || ""}
            onChange={(e) => handleChange("playlistUrl", e.target.value)}
            onBlur={() => handleBlur("playlistUrl")}
            error={Boolean(errors.playlistUrl)}
            helperText={
              errors.playlistUrl ||
              "Each video becomes a lesson; the course name comes from the playlist."
            }
            disabled={isLoading}
            inputProps={{
              "aria-label": "YouTube Playlist URL",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                bgcolor: "#ffffff",
              },
            }}
          />
        </Box>
      )}

      {/* Course name & prompt are derived from the playlist in the YouTube flow */}
      {!isYouTubeFlow && (
        <>
          {/* Course Name Field */}
          <Box data-testid="course-name-field">
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}
            >
              Course Name <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
            <TextField
              id="course-name-input"
              fullWidth
              size="small"
              placeholder="e.g. Java Concurrency and Multithreading"
              value={values.courseName}
              onChange={(e) => handleChange("courseName", e.target.value)}
              onBlur={() => handleBlur("courseName")}
              error={Boolean(errors.courseName)}
              helperText={
                errors.courseName ||
                `${values.courseName.length}/${MAX_COURSE_NAME_LENGTH} characters`
              }
              disabled={isLoading}
              inputProps={{
                maxLength: MAX_COURSE_NAME_LENGTH,
                "aria-label": "Course Name",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  bgcolor: "#ffffff",
                },
              }}
            />
          </Box>

          {/* Description Field (Natural Language Prompt) */}
          <Box data-testid="description-field">
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}
            >
              Prompt / Instructions <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
            <TextField
              id="course-description-input"
              fullWidth
              multiline
              rows={3}
              size="small"
              placeholder={
                mode === "structure_with_questions"
                  ? "e.g. Create course on Java threading with 5 chapters and quizzes after each chapter assessing multi-threading concepts."
                  : "e.g. Create course on Java threading with 5 chapters and 2 to 3 lessons in each chapter covering locks, executor framework, and deadlock prevention."
              }
              value={values.description}
              onChange={(e) => handleChange("description", e.target.value)}
              onBlur={() => handleBlur("description")}
              error={Boolean(errors.description)}
              helperText={
                errors.description ||
                `${values.description.length}/${MAX_DESCRIPTION_LENGTH} characters (supports natural language instructions)`
              }
              disabled={isLoading}
              inputProps={{
                maxLength: MAX_DESCRIPTION_LENGTH,
                "aria-label": "Course Description",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  bgcolor: "#ffffff",
                },
              }}
            />
          </Box>

        </>
      )}

      {/* Difficulty Field */}
      <Box data-testid="difficulty-field">
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}
        >
          Target Difficulty <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <FormControl fullWidth error={Boolean(errors.difficulty)}>
          <RadioGroup
            row
            value={values.difficulty}
            onChange={(e) => handleChange("difficulty", e.target.value)}
            sx={{ display: "flex", gap: 1 }}
          >
            {["beginner", "intermediate", "advanced"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#818cf8",
                      "&.Mui-checked": { color: "#4F39F6" },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "13px", textTransform: "capitalize" }}
                  >
                    {level}
                  </Typography>
                }
                disabled={isLoading}
                sx={{
                  flex: 1,
                  m: 0,
                  p: "4px 8px",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    values.difficulty === level ? "#818cf8" : "#e2e8f0",
                  bgcolor:
                    values.difficulty === level ? "#eef2ff" : "#ffffff",
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Max videos (YouTube flow only) */}
      {isYouTubeFlow && (
        <Box data-testid="max-videos-field">
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}
          >
            Number of Videos <span style={{ color: "#ef4444" }}>*</span>
          </Typography>
          <TextField
            type="number"
            fullWidth
            size="small"
            value={values.maxVideos === undefined || Number.isNaN(values.maxVideos) ? "" : values.maxVideos}
            onChange={(e) => handleChange("maxVideos", parseInt(e.target.value, 10))}
            onBlur={() => handleBlur("maxVideos")}
            error={Boolean(errors.maxVideos)}
            helperText={
              errors.maxVideos ||
              `The first N videos of the playlist are used (${MIN_PLAYLIST_VIDEOS}–${MAX_PLAYLIST_VIDEOS}).`
            }
            disabled={isLoading}
            inputProps={{
              min: MIN_PLAYLIST_VIDEOS,
              max: MAX_PLAYLIST_VIDEOS,
              "aria-label": "Number of Videos",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                bgcolor: "#ffffff",
              },
            }}
          />
        </Box>
      )}

      <CreditCostHint {...credit} />

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isLoading}
          sx={{
            flex: 1,
            borderColor: "#cbd5e1",
            color: "#475569",
            textTransform: "none",
            borderRadius: "8px",
            fontSize: "13px",
            "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || !credit.canAfford}
          data-testid="submit-course-btn"
          startIcon={
            isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <Sparkles size={16} />
            )
          }
          sx={{
            flex: 2,
            py: 1,
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "13px",
            background:
              mode === "structure_with_questions"
                ? "linear-gradient(135deg, #7c3aed 0%, #4F39F6 100%)"
                : "linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)",
            boxShadow: "0 4px 12px rgba(79, 57, 246, 0.3)",
            "&:hover": {
              background:
                mode === "structure_with_questions"
                  ? "linear-gradient(135deg, #6d28d9 0%, #4338ca 100%)"
                  : "linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)",
            },
          }}
        >
          {isLoading
            ? mode === "structure_with_questions"
              ? "Generating Structure & Questions..."
              : "Generating Structure..."
            : mode === "structure_with_questions"
              ? "Generate Course & Questions"
              : "Generate Course Structure"}
        </Button>
      </Box>
    </Box>
  );
};

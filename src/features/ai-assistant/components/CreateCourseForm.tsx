import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  CircularProgress,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import { Sparkles, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";
import {
  CreateCourseInput,
  DifficultyLevel,
  ValidationErrors,
} from "../types/aiAssistant.types";
import {
  validateCreateCourseForm,
  MAX_COURSE_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
} from "../utils/validateCreateCourseForm";

interface CreateCourseFormProps {
  isLoading: boolean;
  error: string | null;
  result: any | null;
  onSubmit: (values: CreateCourseInput) => Promise<void> | void;
  onCancel: () => void;
  onResetResult?: () => void;
}

export const CreateCourseForm: React.FC<CreateCourseFormProps> = ({
  isLoading,
  error,
  result,
  onSubmit,
  onCancel,
  onResetResult,
}) => {
  // Local form state - preserved across errors
  const [values, setValues] = useState<CreateCourseInput>({
    courseName: "",
    description: "",
    difficulty: "beginner",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof CreateCourseInput, val: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: val,
    }));

    // Revalidate if touched
    if (touched[field]) {
      const updated = { ...values, [field]: val };
      const currentErrors = validateCreateCourseForm(updated);
      setErrors((prev) => ({
        ...prev,
        [field]: currentErrors[field],
      }));
    }
  };

  const handleBlur = (field: keyof CreateCourseInput) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validateCreateCourseForm(values);
    setErrors((prev) => ({
      ...prev,
      [field]: currentErrors[field],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const validationErrors = validateCreateCourseForm(values);
    setErrors(validationErrors);
    setTouched({
      courseName: true,
      description: true,
      difficulty: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit(values);
  };

  // If succeeded and result exists, show success state with option to create another
  if (result) {
    const chapters = (result as any)?.courseStructure?.chapters || (result as any)?.chapters || [];
    return (
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }} data-testid="create-course-success">
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
            Course Structure Generated!
          </Typography>
          <Typography variant="body2" sx={{ color: "#166534", mt: 0.5, fontSize: "13px" }}>
            {(result as any)?.message || `Successfully created structure for "${values.courseName}".`}
          </Typography>
          {chapters.length > 0 && (
            <Typography variant="caption" sx={{ display: "block", color: "#15803d", mt: 1, fontWeight: 600 }}>
              {chapters.length} chapters generated ready in curriculum
            </Typography>
          )}
        </Paper>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={onCancel}
            sx={{
              borderColor: "#cbd5e1",
              color: "#475569",
              "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" },
            }}
          >
            Back to Actions
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setValues({ courseName: "", description: "", difficulty: "beginner" });
              setErrors({});
              setTouched({});
              if (onResetResult) onResetResult();
            }}
            sx={{
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
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "14px" }}>
          Create Course with AI
        </Typography>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "12px" }}>
          Describe your course requirements and AI will generate chapters and lessons automatically.
        </Typography>
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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{error}</span>
            <Button
              size="small"
              color="inherit"
              onClick={handleSubmit}
              disabled={isLoading}
              startIcon={<RefreshCw size={12} />}
              sx={{ minWidth: 0, textTransform: "none", fontSize: "11px", ml: 1, p: 0.5 }}
            >
              Retry
            </Button>
          </Box>
        </Alert>
      )}

      {/* Course Name Field */}
      <Box data-testid="course-name-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
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
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Prompt / Instructions <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <TextField
          id="course-description-input"
          fullWidth
          multiline
          rows={4}
          size="small"
          placeholder="e.g. Create course on Java threading with 5 chapters and 2 to 3 lessons in each chapter covering locks, executor framework, and deadlock prevention."
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

      {/* Difficulty Field (Segmented Control / Radio Group) */}
      <Box data-testid="difficulty-field">
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
          Target Difficulty <span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <FormControl fullWidth error={Boolean(errors.difficulty)}>
          <RadioGroup
            row
            value={values.difficulty}
            onChange={(e) =>
              handleChange("difficulty", e.target.value as DifficultyLevel)
            }
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 1,
            }}
          >
            {[
              { id: "beginner", label: "Beginner" },
              { id: "intermediate", label: "Intermediate" },
              { id: "advanced", label: "Advanced" },
            ].map((lvl) => {
              const isSelected = values.difficulty === lvl.id;
              return (
                <Paper
                  key={lvl.id}
                  elevation={0}
                  component="label"
                  sx={{
                    p: 1,
                    borderRadius: "8px",
                    border: isSelected ? "1.5px solid #4F39F6" : "1px solid #e2e8f0",
                    bgcolor: isSelected ? "#f5f3ff" : "#ffffff",
                    textAlign: "center",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s ease",
                  }}
                >
                  <FormControlLabel
                    value={lvl.id}
                    control={<Radio size="small" sx={{ display: "none" }} disabled={isLoading} />}
                    label={
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? "#4F39F6" : "#475569",
                          fontSize: "12px",
                        }}
                      >
                        {lvl.label}
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                </Paper>
              );
            })}
          </RadioGroup>
          {errors.difficulty && (
            <FormHelperText sx={{ ml: 0.5 }}>{errors.difficulty}</FormHelperText>
          )}
        </FormControl>
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: "flex", gap: 1.5, mt: 1 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={onCancel}
          disabled={isLoading}
          sx={{
            flex: 1,
            borderRadius: "8px",
            borderColor: "#cbd5e1",
            color: "#475569",
            textTransform: "none",
            "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" },
          }}
          startIcon={<ArrowLeft size={16} />}
        >
          Cancel
        </Button>
        <Button
          id="create-course-submit-btn"
          type="submit"
          variant="contained"
          disabled={isLoading}
          data-testid="submit-course-btn"
          sx={{
            flex: 2,
            borderRadius: "8px",
            background: "linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(79, 57, 246, 0.25)",
            "&:hover": {
              background: "linear-gradient(135deg, #3E2DC4 0%, #7C3AED 100%)",
            },
          }}
          startIcon={
            isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <Sparkles size={16} />
            )
          }
        >
          {isLoading ? "Generating Structure..." : "Generate Course"}
        </Button>
      </Box>
    </Box>
  );
};

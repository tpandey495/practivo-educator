/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Modal, useSnackbar } from "@components/ui";
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useUpdateCourseMutation } from "../api/courseApi";
import { Controller, useForm } from "react-hook-form";
import { ICreateCourse } from "../../../types/course.types";

interface ICourse extends ICreateCourse {
  id: string | number;
  language: string[];
  objective: string[];
  active?: boolean;
}

export function EditModal({
  isOpen,
  onClose,
  courseData,
}: {
  isOpen: boolean;
  onClose: () => void;
  courseData?: ICourse;
}) {
  const { showSnackbar } = useSnackbar();
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ICreateCourse>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      level: "",
    },
  });

  // ---------------- STATES ----------------
  const [isFree, setIsFree] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [language, setLanguage] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [objectiveInput, setObjectiveInput] = useState("");

  // ---------------- DATA SET ----------------
  useEffect(() => {
    if (isOpen && courseData) {
      reset({
        title: courseData.title || "",
        description: courseData.description || "",
        price: courseData.price || 0,
        level: courseData.level || "",
      });

      setIsFree(courseData.isFree || Number(courseData.price) === 0);
      setIsActive(courseData.active ?? true);
      setLanguage(Array.isArray(courseData.language) ? [...courseData.language] : []);
      setObjectives(Array.isArray(courseData.objective) ? [...courseData.objective] : []);
    }
  }, [courseData, isOpen, reset]);

  // ---------------- HANDLERS ----------------
  const handleAddLanguage = () => {
    const trimmed = languageInput.trim();
    if (trimmed && !language.includes(trimmed)) {
      setLanguage((prev) => [...prev, trimmed]);
    }
    setLanguageInput("");
  };

  const handleAddObjective = () => {
    const trimmed = objectiveInput.trim();
    if (trimmed && !objectives.includes(trimmed)) {
      setObjectives((prev) => [...prev, trimmed]);
    }
    setObjectiveInput("");
  };

  // ---------------- SUBMIT ----------------
  const onSubmit = async (data: ICreateCourse) => {
    console.log("🔥 FORM SUBMITTED", data);

    if (!courseData?.id) return;

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", isFree ? "0" : String(data.price ?? 0));
      formData.append("isFree", String(isFree));
      formData.append("active", String(isActive));
      formData.append("level", data.level);

      language.forEach((lang) => formData.append("language", lang));
      objectives.forEach((obj) => formData.append("objective", obj));

      if (data.image) {
        formData.append("image", data.image as any);
      }

      console.log("🚀 API CALLING...");

      const res = await updateCourse({
        id: courseData.id,
        body: formData,
      }).unwrap();

      console.log("✅ API SUCCESS", res);

      showSnackbar({
        message: res?.message || "Course updated successfully!",
        severity: "success",
      });

      onClose();
    } catch (error: any) {
      console.error("❌ API ERROR:", error);

      showSnackbar({
        message: error?.data?.message || "Update failed!",
        severity: "error",
      });
    }
  };

  return (
    <Modal onClose={onClose} open={isOpen}>
      {/* 🔥 IMPORTANT: STOP PROPAGATION */}
      <Box onClick={(e) => e.stopPropagation()}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Edit Course: {courseData?.title}
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ maxHeight: "75vh", overflowY: "auto", px: 1 }}
        >
          <TextField
            fullWidth
            label="Course Name"
            margin="normal"
            {...register("title", { required: "Course title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isFree}
                  onChange={(e) => {
                    setIsFree(e.target.checked);
                    if (e.target.checked) setValue("price", 0);
                  }}
                />
              }
              label="Free Course"
            />

            <TextField
              fullWidth
              type="number"
              label="Price"
              disabled={isFree}
              {...register("price", {
                valueAsNumber: true,
                validate: (val) => {
                  if (isFree) return true;
                  if (val === undefined || val === null) return "Price is required";
                  if (val < 0) return "Price cannot be negative";
                  return true;
                },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
              InputLabelProps={{ shrink: true }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              }
              label="Active"
            />
          </Box>

          <TextField
            fullWidth
            label="Course Description"
            margin="normal"
            multiline
            rows={3}
            {...register("description", { required: "Description is required" })}
            error={!!errors.description}
            helperText={errors.description?.message}
            InputLabelProps={{ shrink: true }}
          />

          {/* LANGUAGE */}
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Add Language"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddLanguage();
                }
              }}
              InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
              {language.map((lang) => (
                <Chip
                  key={lang}
                  label={lang}
                  onDelete={() => setLanguage((p) => p.filter((l) => l !== lang))}
                  size="small"
                />
              ))}
            </Box>
          </Box>

          {/* OBJECTIVES */}
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Learning Objectives"
              value={objectiveInput}
              onChange={(e) => setObjectiveInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddObjective();
                }
              }}
              InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
              {objectives.map((obj) => (
                <Chip
                  key={obj}
                  label={obj}
                  onDelete={() => setObjectives((p) => p.filter((o) => o !== obj))}
                  size="small"
                  color="primary"
                />
              ))}
            </Box>
          </Box>

          {/* IMAGE */}
          <Box sx={{ my: 3, p: 2, border: "1px dashed #ccc", borderRadius: 1 }}>
            <Typography variant="caption">Update Image</Typography>

            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                />
              )}
            />
          </Box>

          <TextField
            fullWidth
            label="Difficulty Level"
            margin="normal"
            {...register("level", { required: "Level is required" })}
            error={!!errors.level}
            helperText={errors.level?.message}
            InputLabelProps={{ shrink: true }}
          />

          <Box display="flex" justifyContent="end" gap={2} mt={4} mb={2}>
            <Button onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)} // 🔥 FINAL FIX
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={20} />}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
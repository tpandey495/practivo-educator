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

  // ---------------- LOCAL STATES ----------------
  const [isFree, setIsFree] = useState(false);
  const [language, setLanguage] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [objectiveInput, setObjectiveInput] = useState("");

  // ✨ DATA POPULATION
  useEffect(() => {
    if (isOpen && courseData) {
      reset({
        title: courseData.title || "",
        description: courseData.description || "",
        price: courseData.price || 0,
        level: courseData.level || "",
      });

      setIsFree(courseData.isFree || Number(courseData.price) === 0);
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

  const onSubmit = async (data: ICreateCourse) => {
    if (!courseData?.id) return;

    try {
      const formData = new FormData();
      
      // Append basic fields
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", isFree ? "0" : (data.price || 0).toString());
      formData.append("isFree", String(isFree));
      formData.append("level", data.level);

      // Append Arrays (standard way for multipart)
      language.forEach((lang) => formData.append("language", lang));
      objectives.forEach((point) => formData.append("objective", point));

      // Append Image if it exists
      if (data.image) {
        formData.append("image", data.image);
      }

      // API Call
      const response = await updateCourse({
        id: courseData.id,
        body: formData,
      }).unwrap();

      showSnackbar({
        message: response?.message || "Course updated successfully!",
        severity: "success",
      });
      
      onClose(); 
    } catch (error: any) {
      console.error("API Error:", error);
      const errorMessage = error?.data?.message || "Update failed!";
      showSnackbar({ message: errorMessage, severity: "error" });
    }
  };

  return (
    <Modal onClose={onClose} open={isOpen}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Edit Course: {courseData?.title}
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
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
              validate: (val) => isFree || (val !== undefined && val >= 0) || "Price is required",
            })}
            error={!!errors.price}
            sx={{ flexGrow: 1 }}
            InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
        />

        {/* --- Language Section --- */}
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
            placeholder="Press Enter to add"
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
            {language.map((lang) => (
              <Chip key={lang} label={lang} onDelete={() => setLanguage((p) => p.filter(l => l !== lang))} size="small" />
            ))}
          </Box>
        </Box>

        {/* --- Objectives Section --- */}
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
            placeholder="Press Enter to add"
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
            {objectives.map((point) => (
              <Chip key={point} label={point} onDelete={() => setObjectives((p) => p.filter(o => o !== point))} color="primary" size="small" />
            ))}
          </Box>
        </Box>

        {/* Image Upload FIX */}
        <Box sx={{ my: 3, p: 2, border: '1px dashed #ccc', borderRadius: 1 }}>
          <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
            Update Image (Optional)
          </Typography>
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
          InputLabelProps={{ shrink: true }}
        />

        <Box display="flex" justifyContent="end" gap={2} mt={4} mb={2}>
          <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button 
            variant="contained" 
            type="submit" 
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
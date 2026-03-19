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
  console.log(updateCourse);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ICreateCourse>({
    mode: "onBlur",
  });

  // ---------------- LOCAL STATES ----------------
  const [isFree, setIsFree] = useState(false);
  const [language, setLanguage] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [objectiveInput, setObjectiveInput] = useState("");

  // Populate data when modal opens or courseData changes
  useEffect(() => {
    if (courseData && isOpen) {
      reset({
        title: courseData.title,
        description: courseData.description,
        price: courseData.price,
        level: courseData.level,
      });
      setIsFree(courseData.isFree || courseData.price === 0);
      setLanguage(courseData.language || []);
      setObjectives(courseData.objective || []);
    }
  }, [courseData, isOpen, reset]);
  console.log(courseData)
  // ---------------- HANDLERS ----------------
  const handleAddLanguage = () => {
    const trimmed = languageInput.trim();
    if (trimmed && !language.includes(trimmed)) {
      setLanguage((prev) => [...prev, trimmed]);
    }
    setLanguageInput("");
  };

  const handleRemoveLanguage = (target: string) => {
    setLanguage((prev) => prev.filter((l) => l !== target));
  };

  const handleAddObjective = () => {
    const trimmed = objectiveInput.trim();
    if (trimmed && !objectives.includes(trimmed)) {
      setObjectives((prev) => [...prev, trimmed]);
    }
    setObjectiveInput("");
  };

  const handleRemoveObjective = (target: string) => {
    setObjectives((prev) => prev.filter((o) => o !== target));
  };

  const onSubmit = async (data: ICreateCourse) => {
    if (!courseData?.id) return;

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", isFree ? "0" : data.price.toString());
      formData.append("isFree", isFree ? "true" : "false");
      formData.append("level", data.level);

      // Append arrays for FormData
      language.forEach((lang) => formData.append("language", lang));
      objectives.forEach((point) => formData.append("objective", point));

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await updateCourse({
        id: courseData.id,
        body: formData,
      }).unwrap();

      showSnackbar({
        message: response?.message || "Course updated successfully!",
        severity: "success",
      });
      
      onClose(); // Close on success
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || 
        error?.data?.errors?.[0]?.message || 
        "Update failed!";
      
      showSnackbar({ message: errorMessage, severity: "error" });
    }
  };

  return (
    <Modal onClose={onClose} open={isOpen}>
      <Typography variant="h6" sx={{ mb: 2 }}>Edit Course</Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          fullWidth
          label="Course Name"
          margin="normal"
          {...register("title", { required: "Required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isFree}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsFree(checked);
                if (checked) setValue("price", 0);
              }}
            />
          }
          label="Free Course"
        />

        <TextField
          fullWidth
          type="number"
          label="Price"
          margin="normal"
          disabled={isFree}
          {...register("price", {
            valueAsNumber: true,
            validate: (value) =>
              isFree || value > 0 || "Price must be greater than 0",
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <TextField
          fullWidth
          label="Course Description"
          margin="normal"
          multiline
          rows={3}
          {...register("description", { required: "Required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          fullWidth
          label="Add Language"
          margin="normal"
          value={languageInput}
          onChange={(e) => setLanguageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              handleAddLanguage();
            }
          }}
          placeholder="Press Enter or comma to add"
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
          {language.map((lang) => (
            <Chip key={lang} label={lang} onDelete={() => handleRemoveLanguage(lang)} color="secondary" />
          ))}
        </Box>

        <TextField
          fullWidth
          label="Objective"
          margin="normal"
          value={objectiveInput}
          onChange={(e) => setObjectiveInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              handleAddObjective();
            }
          }}
          placeholder="Press Enter or comma to add"
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {objectives.map((point) => (
            <Chip key={point} label={point} onDelete={() => handleRemoveObjective(point)} color="primary" />
          ))}
        </Box>

        <Typography variant="caption" display="block">
          Update Course Image (Leave empty to keep current)
        </Typography>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
          )}
        />

        <TextField
          fullWidth
          label="Level"
          margin="normal"
          {...register("level", { required: "Required" })}
          error={!!errors.level}
          helperText={errors.level?.message}
        />

        <Box display="flex" justifyContent="end" gap="10px" mt={3}>
          <Button variant="outlined" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Course"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
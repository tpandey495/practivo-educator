/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useCreateCourseMutation } from "../api/courseApi";
import { Controller, useForm } from "react-hook-form";
import { ICreateCourse } from "../../../types/course.types";
import { useState } from "react";
import { Modal, useSnackbar } from "@components/ui";

export function AddNewCourseModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { showSnackbar } = useSnackbar();

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ICreateCourse>({
    mode: "onBlur",
    defaultValues: {
      price: 0,
    },
  });

  // ---------------- STATES ----------------

  const [isFree, setIsFree] = useState(false);

  // 🔹 Single Language
  const [language, setLanguage] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  // 🔹 Multiple WhatYouWillLearn
  const [learnPoints, setLearnPoints] = useState<string[]>([]);
  const [learnInput, setLearnInput] = useState("");

  // ---------------- LANGUAGE FUNCTIONS ----------------

  const handleAddLanguage = () => {
    const trimmed = languageInput.trim();
    if (trimmed) {
      setLanguage(trimmed); // Only 1 language allowed
    }
    setLanguageInput("");
  };

  const handleRemoveLanguage = () => {
    setLanguage("");
  };

  // ---------------- WHAT YOU WILL LEARN ----------------

  const handleAddLearnPoint = () => {
    const trimmed = learnInput.trim();
    if (trimmed && !learnPoints.includes(trimmed)) {
      setLearnPoints((prev) => [...prev, trimmed]);
    }
    setLearnInput("");
  };

  const handleRemoveLearnPoint = (point: string) => {
    setLearnPoints((prev) => prev.filter((p) => p !== point));
  };

  // ---------------- FREE COURSE ----------------

  const handleFreeCourseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setIsFree(checked);
    if (checked) {
      setValue("price", 0, { shouldValidate: true });
    }
  };

  // ---------------- SUBMIT ----------------

  const onSubmit = async (data: ICreateCourse) => {
    try {
      if (!language) {
        showSnackbar({
          message: "Language is required",
          severity: "error",
        });
        return;
      }

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", isFree ? "0" : data.price.toString());
      formData.append("isFree", isFree ? "true" : "false");

      // ✅ Single string
      formData.append("language", language);

      // ✅ Multiple array
      learnPoints.forEach((point) => {
        formData.append("whatYouWillLearn", point);
      });

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await createCourse({ body: formData }).unwrap();

      showSnackbar({
        message: response?.message || "Course created successfully",
        severity: "success",
      });

      // reset
      setLanguage("");
      setLearnPoints([]);
      setIsFree(false);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Something went wrong!";
      showSnackbar({ message: errorMessage, severity: "error" });
    }
  };

  return (
    <Modal onClose={onClose} open={isOpen}>
      <Typography variant="h6">Add Course</Typography>

      <Box
        component="form"
        sx={{ mt: 2 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* TITLE */}
        <TextField
          fullWidth
          label="Course Name"
          margin="normal"
          {...register("title", {
            required: "Course name is required",
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        {/* FREE COURSE */}
        <FormControlLabel
          control={
            <Checkbox
              checked={isFree}
              onChange={handleFreeCourseChange}
            />
          }
          label="Free Course"
        />

        {/* PRICE */}
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

        {/* DESCRIPTION */}
        <TextField
          fullWidth
          label="Course Description"
          margin="normal"
          multiline
          rows={4}
          {...register("description", {
            required: "Description is required",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        {/* LANGUAGE (Single Chip) */}
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
          placeholder="Press Enter or , to add"
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {language && (
            <Chip
              label={language}
              onDelete={handleRemoveLanguage}
              color="secondary"
            />
          )}
        </Box>

        {/* WHAT YOU WILL LEARN */}
        <TextField
          fullWidth
          label="Add What You Will Learn"
          margin="normal"
          value={learnInput}
          onChange={(e) => setLearnInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              handleAddLearnPoint();
            }
          }}
          placeholder="Press Enter or , to add"
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {learnPoints.map((point) => (
            <Chip
              key={point}
              label={point}
              onDelete={() => handleRemoveLearnPoint(point)}
              color="primary"
            />
          ))}
        </Box>

        {/* IMAGE */}
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) =>
                field.onChange(e.target.files?.[0])
              }
              style={{ marginTop: 16 }}
            />
          )}
        />

        <Box display="flex" justifyContent="end" gap="10px" mt={3}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
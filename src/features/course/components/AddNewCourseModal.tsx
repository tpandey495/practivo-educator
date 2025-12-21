/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Chip, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
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
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isFree, setIsFree] = useState(false);
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

  const handleAddTag = (): void => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string): void => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleFreeCourseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsFree(checked);
    if (checked) {
      setValue("price", 0, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: ICreateCourse) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", isFree ? "0" : data.price.toString());
      
      // Append isFree - some backends parse FormData string "true"/"false" to boolean
      // Only append when true, or always append as string representation
      if (isFree) {
        formData.append("isFree", "true");
      } else {
        formData.append("isFree", "false");
      }

      // Append image only if present
      if (data.image) {
        formData.append("image", data.image);
      }

      // Append each tag
      tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      // 🔥 Send data to server via RTK hook
      const response = await createCourse({ body: formData }).unwrap();
      showSnackbar({ message: response?.message, severity: "success" });
      // ✅ Success handler
      setIsFree(false);
      onClose();
      console.log("Course created successfully:", response);
    } catch (error: any) {
      // ❌ Error handler
      console.error("Error creating course:", error);
      const errorMessage =
        error?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Something went wrong!";
      showSnackbar({ message: errorMessage, severity: "error" });
    }
  };
  return (
    <Modal onClose={onClose} open={isOpen}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Courses
      </Typography>

      <Box
        component="form"
        sx={{ mt: 2 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          fullWidth
          label="Course Name"
          variant="outlined"
          margin="normal"
          {...register("title", {
            required: "Course name is required",
            minLength: { value: 2, message: "Minimum 2 characters required" },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isFree}
              onChange={handleFreeCourseChange}
              color="primary"
            />
          }
          label="Free Course"
          sx={{ mt: 1 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Price"
          variant="outlined"
          margin="normal"
          disabled={isFree}
          {...register("price", {
            valueAsNumber: true,
            validate: (value) => {
              if (isFree) return true;
              return typeof value === "number" && value > 0 || "Price must be greater than 0";
            },
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <TextField
          fullWidth
          label="Course Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          {...register("description", {
            required: "Description is required",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <Controller
          name="image"
          control={control}
          rules={{
            validate: {
              acceptedFormats: (file) => {
                if (!file) return true;
                const isValid =
                  file.type === "image/png" || file.type === "image/jpeg";
                return isValid || "Only JPG/PNG files are allowed";
              },
            },
          }}
          render={({ field }) => (
            <>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file); // Send single File, not FileList
                }}
                style={{ marginTop: 16 }}
              />
              {errors.image && (
                <Typography variant="body2" color="error" mt={1}>
                  {errors.image.message}
                </Typography>
              )}
            </>
          )}
        />

        <TextField
          fullWidth
          label="Add Tag"
          variant="outlined"
          margin="normal"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Press Enter or , to add"
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              color="primary"
            />
          ))}
        </Box>

        <Box display="flex" justifyContent="end" gap="10px" mt={3}>
          <Button variant="outlined" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  useCreateCourseMutation,
  useGetCourseCategoriesQuery,
} from "../api/courseApi";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ICreateCoursePayload } from "../../../types/course.types";
import { useSnackbar } from "@components/ui";

const OTHER_CATEGORY = "Other";
// "all" is a browse filter, not a real course category.
// "other" is replaced by our own Other option, which asks for a custom name.
const EXCLUDED_CATEGORY_SLUGS = ["all", "other"];

type CourseFormValues = Omit<ICreateCoursePayload, "objective" | "categoryId" | "otherCategory"> & {
  // selected category id (as string) or OTHER_CATEGORY
  category: string;
  objectives: { value: string }[];
  customCategory: string;
  isFree: boolean;
};

const DEFAULT_VALUES: CourseFormValues = {
  title: "",
  description: "",
  price: 0,
  level: "",
  language: "",
  objectives: [{ value: "" }],
  category: "",
  customCategory: "",
  isFree: false,
};

export function AddNewCourseModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCourseCategoriesQuery(undefined, { skip: !isOpen });

  const categoryOptions = categories.filter(
    (c) => !EXCLUDED_CATEGORY_SLUGS.includes(c.slug)
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CourseFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
  });

  const {
    fields: objectiveFields,
    append: appendObjective,
    remove: removeObjective,
  } = useFieldArray({ control, name: "objectives" });

  const selectedCategory = watch("category");
  const isFree = watch("isFree");

  // ---------------- SUBMIT ----------------

  const onSubmit = async (data: CourseFormValues) => {
    const payload: ICreateCoursePayload = {
      title: data.title.trim(),
      description: data.description.trim(),
      price: data.isFree ? 0 : Number(data.price),
      level: data.level.trim(),
      language: data.language.trim(),
      objective: data.objectives
        .map((o) => o.value.trim())
        .filter((o, i, arr) => o && arr.indexOf(o) === i),
      // listed category -> categoryId; "Other" -> otherCategory (backend files it under Other)
      ...(data.category === OTHER_CATEGORY
        ? { otherCategory: data.customCategory.trim() }
        : { categoryId: Number(data.category) }),
    };

    try {
      const response = await createCourse({ body: payload }).unwrap();

      showSnackbar({
        message: response?.message || "Course created successfully",
        severity: "success",
      });

      reset(DEFAULT_VALUES);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error?.data?.errors?.map((e: any) => e.message).join(", ") ||
        error?.data?.message ||
        "Something went wrong!";

      showSnackbar({
        message: errorMessage,
        severity: "error",
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      fullScreen={isSmallScreen}
      PaperProps={{
        component: "form",
        noValidate: true,
        autoComplete: "off",
        onSubmit: handleSubmit(onSubmit),
        sx: { borderRadius: isSmallScreen ? 0 : "12px" },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1.5,
        }}
      >
        Add Course
        <IconButton aria-label="Close" onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            columnGap: 2,
            rowGap: 2,
          }}
        >
          {/* TITLE */}
          <TextField
            fullWidth
            size="small"
            label="Course Name"
            sx={{ gridColumn: "1 / -1" }}
            {...register("title", {
              required: "Course name is required",
              validate: (v) => !!v.trim() || "Course name is required",
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          {/* CATEGORY */}
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                size="small"
                label="Category"
                error={!!errors.category || isCategoriesError}
                helperText={
                  errors.category?.message ||
                  (isCategoriesError
                    ? "Couldn't load categories. Choose Other to enter one."
                    : undefined)
                }
              >
                {isCategoriesLoading && (
                  <MenuItem disabled value="">
                    Loading categories...
                  </MenuItem>
                )}
                {categoryOptions.map((category) => (
                  <MenuItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </MenuItem>
                ))}
                <MenuItem value={OTHER_CATEGORY}>{OTHER_CATEGORY}</MenuItem>
              </TextField>
            )}
          />

          {/* LEVEL */}
          <TextField
            fullWidth
            size="small"
            label="Level"
            placeholder="e.g. Beginner"
            {...register("level", {
              required: "Level is required",
              validate: (v) => !!v.trim() || "Level is required",
            })}
            error={!!errors.level}
            helperText={errors.level?.message}
          />

          {selectedCategory === OTHER_CATEGORY && (
            <TextField
              fullWidth
              size="small"
              label="Enter Category"
              sx={{ gridColumn: "1 / -1" }}
              {...register("customCategory", {
                validate: (value) =>
                  watch("category") !== OTHER_CATEGORY ||
                  !!value.trim() ||
                  "Please enter a category",
              })}
              error={!!errors.customCategory}
              helperText={errors.customCategory?.message}
            />
          )}

          {/* LANGUAGE */}
          <TextField
            fullWidth
            size="small"
            label="Language"
            placeholder="e.g. English"
            {...register("language", {
              required: "Language is required",
              validate: (v) => !!v.trim() || "Language is required",
            })}
            error={!!errors.language}
            helperText={errors.language?.message}
          />

          {/* PRICE + FREE COURSE */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            {!isFree && (
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Price"
                {...register("price", {
                  valueAsNumber: true,
                  validate: (value) =>
                    watch("isFree") ||
                    value > 0 ||
                    "Price must be greater than 0",
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
            <FormControlLabel
              sx={{ whiteSpace: "nowrap", mr: 0, height: 40 }}
              control={
                <Checkbox
                  checked={isFree}
                  onChange={(e) => {
                    setValue("isFree", e.target.checked);
                    if (e.target.checked) {
                      setValue("price", 0, { shouldValidate: true });
                    }
                  }}
                />
              }
              label="Free Course"
            />
          </Box>

          {/* DESCRIPTION */}
          <TextField
            fullWidth
            size="small"
            label="Course Description"
            multiline
            minRows={3}
            maxRows={6}
            sx={{ gridColumn: "1 / -1" }}
            {...register("description", {
              required: "Description is required",
              validate: (v) => !!v.trim() || "Description is required",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          {/* OBJECTIVES */}
          <Box sx={{ gridColumn: "1 / -1" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Objectives
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {objectiveFields.map((field, index) => (
                <Box
                  key={field.id}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    placeholder={`Objective ${index + 1}`}
                    {...register(`objectives.${index}.value` as const, {
                      validate: (_v, values) =>
                        index > 0 ||
                        values.objectives.some((o) => o.value.trim()) ||
                        "At least one objective is required",
                    })}
                    error={!!errors.objectives?.[index]?.value}
                    helperText={errors.objectives?.[index]?.value?.message}
                  />
                  <IconButton
                    size="small"
                    aria-label="Remove objective"
                    disabled={objectiveFields.length === 1}
                    onClick={() => removeObjective(index)}
                    sx={{ mt: 0.5 }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => appendObjective({ value: "" })}
              sx={{ mt: 1 }}
            >
              Add Objective
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 1.5 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

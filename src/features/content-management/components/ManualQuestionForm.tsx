/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import RichTextEditor from "@components/ui/RichTextEditor";
import { getContentTypeComponent } from "../components/getContentTypeComponent";

type ContentType =
  | "multiple_choice"
  | "single_choice"
  | "fill_up"
  | "subjective"
  | "blog"
  | "video";

interface ICreateCourseContent {
  text: string;
  score: number;
  description?: string;
  correctAnswer?: string;
  options?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  blogTags?: string[];
  videoUrl?: string;
  videoFileName?: string;
  duration?: number;
}

interface IManualQuestionFormProps {
  type: ContentType;
  unitId: number;
  onClose: () => void;
  onSubmit: (data: ICreateCourseContent) => Promise<void>;
  isLoading: boolean;
}

export function ManualQuestionForm({
  type,
  onClose,
  onSubmit: handleFormSubmit,
  isLoading,
}: IManualQuestionFormProps) {

  const effectiveType: ContentType = ((): ContentType => {
    if ((type as string) === "code" || (type as string) === "mcq")
      return "multiple_choice";
    return type;
  })();

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<ICreateCourseContent>({
    defaultValues: {
      text: "",
      score: 1,
      description: "",
      correctAnswer: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      blogTags: [],
      videoUrl: "",
      videoFileName: "",
      duration: 0,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const watchedOptions = useWatch({ control, name: "options" });

  useEffect(() => {
    if (effectiveType === "single_choice") {
      const index = watchedOptions.findIndex((op: any) => op.isCorrect);
      if (index > -1) {
        watchedOptions.forEach((op: any, i: number) => {
          op.isCorrect = i === index;
        });
      }
    }
  }, [watchedOptions, effectiveType]);

  // ✅ Validate at least one correct answer
  const validateAtLeastOneCorrect = () => {
    if (
      effectiveType === "multiple_choice" ||
      effectiveType === "single_choice"
    ) {
      const isCorrect = watchedOptions.some((o: any) => o.isCorrect);
      if (!isCorrect) {
        watchedOptions.forEach((_, idx) =>
          setError(`options.${idx}.isCorrect`, {
            type: "custom",
            message: "Mark at least one as correct",
          })
        );
        return false;
      }
    }
    return true;
  };

  // ✅ Handle Submit
  const onSubmit: SubmitHandler<ICreateCourseContent> = async (data) => {
    console.log("🚀 Manual form data:", data);

    if (!validateAtLeastOneCorrect()) return;

    try {
      await handleFormSubmit(data);
    } catch (error) {
      console.error("❌ Manual form submission error:", error);
    }
  };

  // ✅ JSX
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          maxWidth: "100%",
        }}
      >
        {/* Basic Information Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 3,
            backgroundColor: "#FAFBFC",
            borderRadius: "12px",
            border: "1px solid #EAECF0",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#101828",
              mb: 1,
            }}
          >
            Basic Information
          </Typography>

          {/* Title */}
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#344054",
                mb: 1,
              }}
            >
              Question Title <span style={{ color: "#D92D20" }}>*</span>
            </Typography>
            <Controller
              name="text"
              control={control}
              rules={{ required: "Question title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter the question title"
                  error={!!errors.text}
                  helperText={errors.text?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: errors.text ? "#D92D20" : "#D0D5DD",
                      },
                      "&:hover fieldset": {
                        borderColor: errors.text ? "#D92D20" : "#98A2B3",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errors.text ? "#D92D20" : "#4F39F6",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                      padding: "10px 14px",
                    },
                  }}
                />
              )}
            />
          </Box>

          {/* Description */}
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#344054",
                mb: 1,
              }}
            >
              Description
            </Typography>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Box
                  sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                    "&:hover": {
                      borderColor: "#98A2B3",
                    },
                    "&:focus-within": {
                      borderColor: "#4F39F6",
                      borderWidth: "2px",
                    },
                  }}
                >
                  <RichTextEditor
                    value={field.value}
                    onChange={(value) => {
                      clearErrors("description");
                      field.onChange(value);
                    }}
                    placeholder="Add a detailed description or instructions for this question..."
                  />
                </Box>
              )}
            />
          </Box>

          {/* Score */}
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#344054",
                mb: 1,
              }}
            >
              Points/Score <span style={{ color: "#D92D20" }}>*</span>
            </Typography>
            <Controller
              name="score"
              control={control}
              rules={{
                required: "Score is required",
                min: { value: 1, message: "Score must be at least 1" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  placeholder="Enter points for this question"
                  error={!!errors.score}
                  inputProps={{ min: 1 }}
                  sx={{
                    maxWidth: "200px",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: errors.score ? "#D92D20" : "#D0D5DD",
                      },
                      "&:hover fieldset": {
                        borderColor: errors.score ? "#D92D20" : "#98A2B3",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errors.score ? "#D92D20" : "#4F39F6",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                      padding: "10px 14px",
                    },
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? "" : Number(value));
                  }}
                />
              )}
            />
          </Box>
        </Box>

        {/* Dynamic Fields Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 3,
            backgroundColor: "#FAFBFC",
            borderRadius: "12px",
            border: "1px solid #EAECF0",
          }}
        >
          {(() => {
            const FieldsComponent = getContentTypeComponent(effectiveType);
            if (!FieldsComponent) return null;

            return (
              <FieldsComponent
                control={control}
                errors={errors}
                clearErrors={clearErrors}
                watch={watch}
                fields={fields}
                append={append}
                remove={remove}
                setValue={setValue}
              />
            );
          })()}
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            pt: 2,
            borderTop: "1px solid #EAECF0",
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            disabled={isLoading}
            sx={{
              minWidth: "120px",
              height: "44px",
              borderRadius: "8px",
              borderColor: "#D0D5DD",
              color: "#344054",
              fontWeight: 500,
              fontSize: "14px",
              textTransform: "none",
              "&:hover": {
                borderColor: "#98A2B3",
                backgroundColor: "#F9FAFB",
              },
              "&:disabled": {
                borderColor: "#D0D5DD",
                color: "#98A2B3",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              minWidth: "140px",
              height: "44px",
              borderRadius: "8px",
              backgroundColor: "#4F39F6",
              fontWeight: 500,
              fontSize: "14px",
              textTransform: "none",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
              "&:hover": {
                backgroundColor: "#4330D9",
                boxShadow: "0px 4px 8px rgba(79, 57, 246, 0.2)",
              },
              "&:disabled": {
                backgroundColor: "#D0D5DD",
                color: "#98A2B3",
              },
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
                <span>Saving...</span>
              </Box>
            ) : (
              "Save Question"
            )}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Problem from "./Problem";
import Example from "./Description";
import TestCases from "./TestCases";
import CodeTemplate from "./CodeTemplate";

interface ICodeQuestionFormProps {
  lessonId: number;
  onClose: () => void;
  onSubmit: (data: ICodeQuestionData) => Promise<void>;
  isLoading: boolean;
  editData?: any;
}

export interface ICodeQuestionData {
  title: string;
  description: string;
  score: number;
  codeTemplate: {
    template: {
      javascript?: string;
      python?: string;
      java?: string;
    };
  };
  allowedLanguage: number[];
  testCases: Array<{
    input: string;
    expectedOutput: string;
    sampleTestCase: boolean;
  }>;
}

const STEPS = ["Problem", "Description", "Test Cases", "Code Template"];

export function CodeQuestionForm({
  onClose,
  onSubmit: handleFormSubmit,
  isLoading,
  editData,
}: ICodeQuestionFormProps) {
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
    trigger,
    watch,
  } = useForm<ICodeQuestionData>({
    defaultValues: {
      title: editData?.title || editData?.content?.question || "",
      description: typeof editData?.description === "string" ? editData.description : "",
      score: editData?.score ?? 10,
      codeTemplate: {
        template: {},
      },
      allowedLanguage: [],
      testCases: [
        {
          input: "",
          expectedOutput: "",
          sampleTestCase: false,
        },
      ],
    },
    mode: "onChange",
  });

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];

    switch (activeStep) {
      case 0:
        fieldsToValidate = ["title", "score"];
        break;
      case 1:
        fieldsToValidate = ["description"];
        break;
      case 2:
        fieldsToValidate = ["testCases"];
        break;
      case 3:
        fieldsToValidate = [
          "codeTemplate.template",
          "allowedLanguage",
        ];
        break;
    }

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit: SubmitHandler<ICodeQuestionData> = async (data) => {

    try {
      await handleFormSubmit(data);
    } catch (error) {
      return error;
    }
  };

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
        {/* Stepper */}
        <Box sx={{ width: "100%", mb: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step Content */}
        <Box
          sx={{
            minHeight: "400px",
            p: 3,
            backgroundColor: "#FAFBFC",
            borderRadius: "12px",
            border: "1px solid #EAECF0",
          }}
        >
          {activeStep === 0 && (
            <Problem
              control={control}
              errors={errors}
              clearErrors={clearErrors}
            />
          )}

          {activeStep === 1 && (
            <Example
              control={control}
              errors={errors}
              clearErrors={clearErrors}
            />
          )}

          {activeStep === 2 && (
            <TestCases
              control={control}
              errors={errors}
              clearErrors={clearErrors}
              watch={watch}
            />
          )}

          {activeStep === 3 && (
            <CodeTemplate
              control={control}
              errors={errors}
              clearErrors={clearErrors}
              watch={watch}
            />
          )}
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            pt: 2,
            borderTop: "1px solid #EAECF0",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
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
              }}
            >
              Cancel
            </Button>

            {activeStep > 0 && (
              <Button
                onClick={handleBack}
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
                }}
              >
                Back
              </Button>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {activeStep < STEPS.length - 1 ? (
              <Button
                onClick={handleNext}
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
                }}
              >
                Next
              </Button>
            ) : (
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
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
                    <span>{editData ? "Updating..." : "Saving..."}</span>
                  </Box>
                ) : (
                  editData ? "Update Question" : "Save Question"
                )}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </form>
  );
}


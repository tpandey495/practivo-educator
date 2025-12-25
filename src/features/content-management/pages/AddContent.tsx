/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Box, Button, Snackbar, Alert, Tabs, Tab } from "@mui/material";
import { Visibility as VisibilityIcon, AutoAwesome as AutoAwesomeIcon, Edit as EditIcon } from "@mui/icons-material";
import { CustomTabs } from "@components/ui";
import QuestionConfigurator from "../components/QuestionAI";
import { ManualQuestionForm } from "../components/ManualQuestionForm";
import { PreviewModal } from "../components/previewModal/PreviewModal";

import {
  useCreateVideoContentMutation,
  useCreateMcqContentMutation,
  useCreateFillUpContentMutation,
  useCreateBlogContentMutation,
  useCreateSubjectiveContentMutation,
} from "../api/contentApi";

// -------- Types ----------
type ContentType =
  | "multiple_choice"
  | "single_choice"
  | "fill_up"
  | "subjective"
  | "blog"
  | "video";

interface IAddCourseContentFormProps {
  type: ContentType;
  unitId: number;
  courseId?: number;
  onClose: () => void;
  parentContentType?: string; // "video", "quiz", "assignment", "code", "blog"
}

export interface ICreateCourseContent {
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

interface GeneratedQuestion {
  id: string;
  type: ContentType;
  text: string;
  description?: string;
  options?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  correctAnswer?: string;
  score?: number;
}

// Mock data for testing
const getMockQuestions = (type: ContentType): GeneratedQuestion[] => {
  switch (type) {
    case "multiple_choice":
      return [
        {
          id: "1",
          type: "multiple_choice",
          text: "What is GitHub primarily used for?",
          description:
            "<p>Select all correct answers about GitHub's main purposes.</p>",
          score: 5,
          options: [
            { text: "Version control", isCorrect: true },
            { text: "Code hosting", isCorrect: true },
            { text: "Video streaming", isCorrect: false },
            { text: "Collaboration", isCorrect: true },
          ],
        },
        {
          id: "2",
          type: "multiple_choice",
          text: "Which company acquired GitHub?",
          score: 3,
          options: [
            { text: "Google", isCorrect: false },
            { text: "Microsoft", isCorrect: true },
            { text: "Amazon", isCorrect: false },
            { text: "Meta", isCorrect: false },
          ],
        },
      ];

    case "single_choice":
      return [
        {
          id: "1",
          type: "single_choice",
          text: "What does CI/CD stand for?",
          score: 4,
          options: [
            {
              text: "Continuous Integration/Continuous Delivery",
              isCorrect: true,
            },
            { text: "Code Integration/Code Delivery", isCorrect: false },
            {
              text: "Computer Integration/Computer Delivery",
              isCorrect: false,
            },
            { text: "Cloud Integration/Cloud Delivery", isCorrect: false },
          ],
        },
      ];

    case "fill_up":
      return [
        {
          id: "1",
          type: "fill_up",
          text: "GitHub Actions is used for _____ automation.",
          description: "<p>Fill in the blank with the correct term.</p>",
          correctAnswer: "CI/CD",
          score: 3,
        },
      ];

    case "subjective":
      return [
        {
          id: "1",
          type: "subjective",
          text: "Explain how GitHub has transformed software development collaboration.",
          description: "<p>Provide a detailed answer with examples.</p>",
          score: 10,
        },
      ];

    case "blog":
      return [
        {
          id: "1",
          type: "blog",
          text: "<h2>The Evolution of GitHub</h2><p>GitHub has revolutionized how developers collaborate on code. Since its inception, it has become the world's leading platform for version control and collaborative software development...</p>",
        },
      ];

    case "video":
      return [
        {
          id: "1",
          type: "video",
          text: "Introduction to GitHub Actions",
          description:
            "<p>A comprehensive guide to CI/CD automation using GitHub Actions.</p>",
        },
      ];

    default:
      return [];
  }
};

// Map parent content types from Add Content popup to contentTypeId
const getParentContentTypeId = (parentType?: string): number | null => {
  if (!parentType) return null;
  const mapping: Record<string, number> = {
    video: 1,
    quiz: 2,
    assignment: 3,
    code: 2, // Code maps to Quiz content type
    blog: 5,
  };
  return mapping[parentType.toLowerCase()] || null;
};

// Map question types to quesTypeId
const getQuestionTypeId = (questionType: ContentType): number => {
  const mapping: Record<string, number> = {
    multiple_choice: 1,
    single_choice: 2,
    fill_up: 3,
    subjective: 4,
    blog: 5,
    video: 6,
  };
  return mapping[questionType] || 1;
};

// -------- Main Component ----------
export function AddCourseContentForm({
  type,
  unitId,
  onClose,
  parentContentType,
}: IAddCourseContentFormProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [generatedQuestions, setGeneratedQuestions] = useState<
    GeneratedQuestion[]
  >([]);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Normalize legacy types
  const effectiveType: ContentType = ((): ContentType => {
    if ((type as string) === "code" || (type as string) === "mcq")
      return "multiple_choice";
    return type;
  })();

  // API mutation hooks
  const [createVideoContent, { isLoading: isVideoLoading }] =
    useCreateVideoContentMutation();
  const [createMcqContent, { isLoading: isMcqLoading }] =
    useCreateMcqContentMutation();
  const [createFillUpContent, { isLoading: isFillUpLoading }] =
    useCreateFillUpContentMutation();
  const [createBlogContent, { isLoading: isBlogLoading }] =
    useCreateBlogContentMutation();
  const [createSubjectiveContent, { isLoading: isSubjectiveLoading }] =
    useCreateSubjectiveContentMutation();

  const isLoading =
    isVideoLoading ||
    isMcqLoading ||
    isFillUpLoading ||
    isBlogLoading ||
    isSubjectiveLoading;

  // Handle preview
  const handlePreview = () => {
    // Check if we have generated questions, otherwise show mock data
    if (generatedQuestions.length > 0) {
      setPreviewOpen(true);
    } else {
      // Show mock questions for testing
      const mockQuestions = getMockQuestions(effectiveType);
      setGeneratedQuestions(mockQuestions);
      setPreviewOpen(true);
    }
  };

  const handleSavePreview = async (questions: GeneratedQuestion[]) => {
    console.log("💾 Saving questions:", questions);

    try {
      // Loop through questions and save each one
      for (const question of questions) {
        const data: ICreateCourseContent = {
          text: question.text,
          score: question.score || 0,
          description: question.description,
          correctAnswer: question.correctAnswer,
          options: question.options,
        };
        await handleContentSubmit(data);
      }

      // Clear generated questions and close modal
      setGeneratedQuestions([]);
      setPreviewOpen(false);
      onClose();
    } catch (error) {
      console.error("❌ Error saving questions:", error);
    }
  };

  // ---- Submit handler (shared by both AI and Manual forms) ----
  const handleContentSubmit = async (data: ICreateCourseContent) => {
    console.log("🚀 Submitting content:", data);
    console.log("📌 Parent content type:", parentContentType);
    console.log("📌 Effective question type:", effectiveType);

    // Get parent contentTypeId if available, otherwise use question type's default
    const parentContentTypeId = getParentContentTypeId(parentContentType);
    const quesTypeId = getQuestionTypeId(effectiveType);

    try {
      let response;

      // If we have a parent content type, use its contentTypeId for all questions
      // Otherwise, fall back to the original logic
      if (parentContentTypeId !== null) {
        // We're creating questions inside a parent content type
        // All questions should use the parent's contentTypeId
        switch (effectiveType) {
          case "video":
            response = await createVideoContent({
              body: {
                unitId,
                quesTypeId,
                contentTypeId: parentContentTypeId, // Use parent's contentTypeId
                title: data.text,
                description: data.description || "",
                score: data.score,
                url: data.videoUrl || "",
                duration: data.duration ?? 0,
              },
            }).unwrap();
            break;

          case "multiple_choice":
          case "single_choice":
            response = await createMcqContent({
              body: {
                unitId,
                quesTypeId,
                contentTypeId: parentContentTypeId, // Use parent's contentTypeId
                title: data.text,
                description: data.description || "",
                score: data.score,
                options: data.options || [],
              },
            }).unwrap();
            break;

          case "fill_up":
            response = await createFillUpContent({
              body: {
                unitId,
                quesTypeId,
                contentTypeId: parentContentTypeId, // Use parent's contentTypeId
                title: data.text,
                description: data.description || "",
                score: data.score,
                text: data.text,
                correctAnswer: data.correctAnswer || "",
              },
            }).unwrap();
            break;

          case "blog":
            response = await createBlogContent({
              body: {
                unitId,
                quesTypeId,
                contentTypeId: parentContentTypeId, // Use parent's contentTypeId
                description: {
                  html: data.description || "",
                  tags: data.blogTags || [],
                },
                html: data.text,
              },
            }).unwrap();
            break;

          case "subjective":
            response = await createSubjectiveContent({
              body: {
                unitId,
                quesTypeId,
                contentTypeId: parentContentTypeId, // Use parent's contentTypeId
                title: data.text,
                description: data.description || "",
                score: data.score,
                question: data.text,
              },
            }).unwrap();
            break;

          default:
            throw new Error(`Unsupported question type: ${effectiveType}`);
        }
      } else {
        // Original logic: use question type's default contentTypeId
        switch (effectiveType) {
          case "video":
            response = await createVideoContent({
              body: {
                unitId,
                quesTypeId: 6,
                contentTypeId: 1,
                title: data.text,
                description: data.description || "",
                score: data.score,
                url: data.videoUrl || "",
                duration: data.duration ?? 0,
              },
            }).unwrap();
            break;

          case "multiple_choice":
          case "single_choice":
            response = await createMcqContent({
              body: {
                unitId,
                quesTypeId: effectiveType === "multiple_choice" ? 1 : 2,
                contentTypeId: 2,
                title: data.text,
                description: data.description || "",
                score: data.score,
                options: data.options || [],
              },
            }).unwrap();
            break;

          case "fill_up":
            response = await createFillUpContent({
              body: {
                unitId,
                quesTypeId: 3,
                contentTypeId: 4,
                title: data.text,
                description: data.description || "",
                score: data.score,
                text: data.text,
                correctAnswer: data.correctAnswer || "",
              },
            }).unwrap();
            break;

          case "blog":
            response = await createBlogContent({
              body: {
                unitId,
                quesTypeId: 5,
                contentTypeId: 5,
                description: {
                  html: data.description || "",
                  tags: data.blogTags || [],
                },
                html: data.text,
              },
            }).unwrap();
            break;

          case "subjective":
            response = await createSubjectiveContent({
              body: {
                unitId,
                quesTypeId: 4,
                contentTypeId: 3,
                title: data.text,
                description: data.description || "",
                score: data.score,
                question: data.text,
              },
            }).unwrap();
            break;

          default:
            throw new Error(`Unsupported content type: ${type}`);
        }
      }

      console.log("✅ Content created successfully:", response);

      // Show success notification
      setNotification({
        open: true,
        message: "Question saved successfully!",
        severity: "success",
      });

      // Close the modal after a short delay to show the success message
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error("❌ Error creating content:", error);
      console.error("❌ Error details:", {
        message: error.message,
        status: error.status,
        data: error.data,
      });

      // Show error notification
      setNotification({
        open: true,
        message: error?.data?.message || "Failed to save question. Please try again.",
        severity: "error",
      });

      throw error;
    }
  };

  // Handle AI generation - this should be called from QuestionConfigurator
  const handleAIGenerate = async (data: ICreateCourseContent) => {
    console.log("🤖 Generating questions with AI:", data);

    try {
      // TODO: Replace this with actual AI API call
      // For now, generate mock questions based on the config
      const mockQuestions = getMockQuestions(effectiveType);

      console.log("📝 Generated questions:", mockQuestions);

      // Update state first
      setGeneratedQuestions(mockQuestions);

      // Then open preview
      setPreviewOpen(true);
    } catch (error) {
      console.error("❌ Error generating questions:", error);
    }
  };

  // ---- Render ----
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          p: 4,
          border: "1px solid #EAECF0",
          boxShadow:
            "0px 1px 3px rgba(16,24,40,0.10), 0px 1px 2px rgba(16,24,40,0.06)",
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Section with Tabs and Preview Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 0,
            flexWrap: "wrap",
            gap: 2,
            pb: 2,
            borderBottom: "1px solid #EAECF0",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              "& .MuiTabs-indicator": {
                height: "3px",
                borderRadius: "3px 3px 0 0",
                backgroundColor: "#4F39F6",
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
                minHeight: "48px",
                padding: "12px 24px",
                color: "#667085",
                "&.Mui-selected": {
                  color: "#4F39F6",
                  fontWeight: 600,
                },
                "&:hover": {
                  color: "#4F39F6",
                  backgroundColor: "rgba(79, 57, 246, 0.04)",
                },
              },
            }}
          >
            <Tab
              icon={
                <AutoAwesomeIcon
                  sx={{
                    fontSize: "18px",
                    color: activeTab === 0 ? "#10B981" : "#667085",
                    transition: "all 0.2s ease",
                  }}
                />
              }
              iconPosition="start"
              label="Generate using AI"
              sx={{
                "&.Mui-selected": {
                  "& .MuiSvgIcon-root": {
                    color: "#10B981",
                  },
                },
                "&:hover": {
                  "& .MuiSvgIcon-root": {
                    color: "#10B981",
                  },
                },
                "& .MuiTab-iconWrapper": {
                  marginRight: "8px",
                },
              }}
            />
            <Tab
              icon={
                <EditIcon
                  sx={{
                    fontSize: "18px",
                    color: activeTab === 1 ? "#4F39F6" : "#667085",
                    transition: "all 0.2s ease",
                  }}
                />
              }
              iconPosition="start"
              label="Create Manually"
              sx={{
                "&.Mui-selected": {
                  "& .MuiSvgIcon-root": {
                    color: "#4F39F6",
                  },
                },
                "&:hover": {
                  "& .MuiSvgIcon-root": {
                    color: "#4F39F6",
                  },
                },
                "& .MuiTab-iconWrapper": {
                  marginRight: "8px",
                },
              }}
            />
          </Tabs>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={handlePreview}
            disabled={isLoading}
            sx={{
              minWidth: "220px",
              height: "48px",
              borderRadius: "12px",
              borderColor: "#D0D5DD",
              color: "#344054",
              fontWeight: 500,
              fontSize: "14px",
              textTransform: "none",
              whiteSpace: "nowrap",
              "&:hover": {
                borderColor: "#4F39F6",
                backgroundColor: "#F9FAFB",
                color: "#4F39F6",
              },
              "&:disabled": {
                borderColor: "#D0D5DD",
                color: "#98A2B3",
              },
            }}
          >
            Preview Generated Questions
          </Button>
        </Box>

        {/* Content Area - No extra spacing */}
        <Box sx={{ flex: 1, mt: 3, overflow: "auto" }}>
          {activeTab === 0 ? (
            <QuestionConfigurator
              type={effectiveType}
              unitId={unitId}
              onClose={onClose}
              onSubmit={handleAIGenerate}
              isLoading={isLoading}
            />
          ) : (
            <ManualQuestionForm
              type={effectiveType}
              unitId={unitId}
              onClose={onClose}
              onSubmit={handleContentSubmit}
              isLoading={isLoading}
            />
          )}
        </Box>
      </Box>
      <PreviewModal
        contentType={effectiveType}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onSave={handleSavePreview}
        key={generatedQuestions.length} // Force re-render when questions change
      />

      {/* Success/Error Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}

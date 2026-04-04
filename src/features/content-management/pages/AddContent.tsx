/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Box, Button, Snackbar, Alert, Tabs, Tab } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  AutoAwesome as AutoAwesomeIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
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
  useCreateCodeContentMutation,
  useGetCodeLanguagesQuery,
} from "../api/contentApi";
import { CodeQuestionForm, ICodeQuestionData } from "../components/CodeQuestionForm";

// -------- Types ----------
type ContentType =
  | "multiple_choice"
  | "single_choice"
  | "fill_up"
  | "subjective"
  | "blog"
  | "video";


interface IAddCourseContentFormProps {
  type: ContentType | "code";
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
  const isCodeType = type === "code";
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

  // Normalize legacy types (but keep code as code)
  const effectiveType: ContentType = ((): ContentType => {
    if ((type as string) === "mcq") return "multiple_choice";
    return type as ContentType;
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
  const [createCodeContent, { isLoading: isCodeLoading }] =
    useCreateCodeContentMutation();
  const { data: languagesData } = useGetCodeLanguagesQuery();

  const isLoading =
    isVideoLoading ||
    isMcqLoading ||
    isFillUpLoading ||
    isBlogLoading ||
    isSubjectiveLoading ||
    isCodeLoading;

  // Extract languages from API response
  const programmingLanguages: Array<{ id: number; name: string; value: string }> = 
    Array.isArray(languagesData)
      ? languagesData
      : (languagesData as any)?.data && Array.isArray((languagesData as any).data)
      ? (languagesData as any).data
      : [];

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
     
    }
  };

  // ---- Submit handler for code questions ----
  const handleCodeSubmit = async (data: ICodeQuestionData) => {
    

    try {
      // Transform codeTemplate from object format to array format with languageId
      const codeTemplateArray = data.allowedLanguage
        .map((langId) => {
          const language = programmingLanguages.find((lang) => lang.id === langId);
          if (!language) return null;
          
          const code = data.codeTemplate.template[language.value as keyof typeof data.codeTemplate.template];
          if (!code) return null;

          return {
            languageId: langId,
            code: code,
          };
        })
        .filter((item): item is { languageId: number; code: string } => item !== null);

      await createCodeContent({
        body: {
          unitId,
          quesTypeId: 7,
          contentTypeId: 2,
          title: data.title,
          description: data.description,
          score: data.score,
          codeTemplate: codeTemplateArray,
          allowedLanguage: data.allowedLanguage,
          testCases: data.testCases.map((tc) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            description: tc.description,
          })),
        },
      }).unwrap();

      

      // Show success notification
      setNotification({
        open: true,
        message: "Code question saved successfully!",
        severity: "success",
      });

      // Close the modal after a short delay to show the success message
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      

      // Show error notification
      setNotification({
        open: true,
        message:
          error?.data?.message || "Failed to save code question. Please try again.",
        severity: "error",
      });

      throw error;
    }
  };

  // ---- Submit handler (shared by both AI and Manual forms) ----
  const handleContentSubmit = async (data: ICreateCourseContent) => {
    

    // Get parent contentTypeId if available, otherwise use question type's default
    const parentContentTypeId = getParentContentTypeId(parentContentType);
    const quesTypeId = getQuestionTypeId(effectiveType);

    try {
      if (parentContentTypeId !== null) {
        // We're creating questions inside a parent content type
        // All questions should use the parent's contentTypeId
        switch (effectiveType) {
          case "video":
            await createVideoContent({
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
            await createMcqContent({
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
            await createFillUpContent({
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
            await createBlogContent({
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
            await createSubjectiveContent({
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
            await createVideoContent({
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
            await createMcqContent({
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
            await createFillUpContent({
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
            await createBlogContent({
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
            await createSubjectiveContent({
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

      // Show error notification
      setNotification({
        open: true,
        message:
          error?.data?.message || "Failed to save question. Please try again.",
        severity: "error",
      });

      throw error;
    }
  };

  // Handle AI generation - this should be called from QuestionConfigurator
  const handleAIGenerate = async (_data: ICreateCourseContent) => {
    

    try {
      // TODO: Replace this with actual AI API call
      // For now, generate mock questions based on the config
      const mockQuestions = getMockQuestions(effectiveType);

      

      // Update state first
      setGeneratedQuestions(mockQuestions);

      // Then open preview
      setPreviewOpen(true);
    } catch (error) {
      
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
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
            borderBottom: "1px solid #EAECF0",
          }}
        >
          {!isCodeType && (
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
            >
              <Tab
                icon={<AutoAwesomeIcon />}
                iconPosition="start"
                label="Generate using AI"
              />
              <Tab
                icon={<EditIcon />}
                iconPosition="start"
                label="Create Manually"
              />
            </Tabs>
          )}

          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={() => setPreviewOpen(true)}
            disabled={isLoading}
          >
            Preview
          </Button>
        </Box>

        {/* Content Area - No extra spacing */}
         <Box sx={{ flex: 1, mt: 3, overflow: "auto" }}>
          {isCodeType ? (
            <CodeQuestionForm
              unitId={unitId}
              onClose={onClose}
              onSubmit={handleCodeSubmit}
              isLoading={isLoading}
            />
          ) : (
            <>
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
            </>
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

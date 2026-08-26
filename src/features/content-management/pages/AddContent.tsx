/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { ManualQuestionForm } from "../components/ManualQuestionForm";

import {
  useCreateVideoContentMutation,
  useCreateMcqContentMutation,
  useCreateFillUpContentMutation,
  useCreateBlogContentMutation,
  useCreateSubjectiveContentMutation,
  useCreateCodeContentMutation,
  useGetCodeLanguagesQuery,
} from "../api/contentApi";
import { CodeQuestionForm, ICodeQuestionData } from "../components/question-templates/code/CodeQuestionForm";
import { useParams } from "react-router-dom";

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
  lessonId: number;
  courseId?: number;
  contentTypeId?: number;
  onClose: () => void;
  ContentType?: string; // "video", "quiz", "assignment", "code", "blog"
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
  timtimestamp?: number;
}



const getContentTypeId = (parentType?: string): number | null => {
  if (!parentType) return null;
  const mapping: Record<string, number> = {
    video: 1,
    quiz: 2,
    assignment: 3,
    code: 4,
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
  lessonId,
  contentTypeId,
  onClose,
  ContentType,
}: IAddCourseContentFormProps) {
  const params = useParams();
  const ContentTypeIdFromParams = params.contentTypeId;

  // Resolve the actual contentTypeId (from props, params, parent type, or fallback based on type)
  const resolvedContentTypeId: number =
    (contentTypeId !== undefined && !isNaN(Number(contentTypeId)) ? Number(contentTypeId) : undefined) ??
    (ContentTypeIdFromParams && !isNaN(Number(ContentTypeIdFromParams)) ? Number(ContentTypeIdFromParams) : undefined) ??
    (ContentType ? getContentTypeId(ContentType) : undefined) ??
    (typeof type === "string" ? getContentTypeId(type) : undefined) ??
    (type === "code" ? 4 : type === "video" ? 1 : type === "blog" ? 5 : type === "subjective" ? 3 : 2);

  const isCodeType = String(type).toLowerCase() === "code";
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
  const extractLanguages = (res: any): Array<{ id: number; name: string; value: string }> => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.languages)) return res.languages;
    if (res?.data && Array.isArray(res.data.languages)) return res.data.languages;
    return [];
  };

  const programmingLanguages = extractLanguages(languagesData);



  // ---- Submit handler for code questions ----
  const handleCodeSubmit = async (data: ICodeQuestionData) => {
    try {
      const availableLangs = extractLanguages(languagesData);

      // Extract allowed languages (ensure array of numbers)
      const rawAllowed =
        data.allowedLanguage ||
        (data as any).alllowedLangauge ||
        [];

      let normalizedAllowedLanguage: number[] = Array.isArray(rawAllowed)
        ? rawAllowed.map((id: any) => Number(id)).filter((id: number) => !isNaN(id) && id > 0)
        : [];

      // Fallback 1: If empty, extract IDs from active templates in codeTemplate.template
      if (normalizedAllowedLanguage.length === 0 && data.codeTemplate?.template) {
        const activeTemplateKeys = Object.keys(data.codeTemplate.template).filter(
          (key) => !!(data.codeTemplate.template as any)[key]
        );
        normalizedAllowedLanguage = availableLangs
          .filter((lang) => activeTemplateKeys.includes(lang.value?.toLowerCase()))
          .map((lang) => Number(lang.id));
      }

      // Fallback 2: If still empty, use available programming languages
      if (normalizedAllowedLanguage.length === 0 && availableLangs.length > 0) {
        normalizedAllowedLanguage = availableLangs.map((lang) => Number(lang.id));
      }

      // Transform codeTemplate from object format to array format with languageId
      const codeTemplateArray = normalizedAllowedLanguage
        .map((langId) => {
          const language = availableLangs.find((lang) => Number(lang.id) === Number(langId));
          if (!language) return null;

          const code = data.codeTemplate?.template?.[language.value as keyof typeof data.codeTemplate.template];
          if (!code) return null;

          return {
            languageId: Number(langId),
            code: code,
          };
        })
        .filter((item): item is { languageId: number; code: string } => item !== null);

      await createCodeContent({
        body: {
          lessonId,
          quesTypeId: 7,
          contentTypeId: resolvedContentTypeId,
          title: data.title,
          description: data.description,
          score: data.score,
          codeTemplate: codeTemplateArray,
          allowedLanguage: normalizedAllowedLanguage,
          testCases: (data.testCases || []).map((tc) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            sampleTestCase: tc.sampleTestCase,
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
    const quesTypeId = getQuestionTypeId(effectiveType);

    try {
      switch (effectiveType) {
        case "video":
          await createVideoContent({
            body: {
              lessonId,
              quesTypeId,
              contentTypeId: resolvedContentTypeId,
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
              lessonId,
              quesTypeId,
              contentTypeId: resolvedContentTypeId,
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
              lessonId,
              quesTypeId,
              contentTypeId: resolvedContentTypeId,
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
              lessonId,
              quesTypeId,
              contentTypeId: resolvedContentTypeId,
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
              lessonId,
              quesTypeId,
              contentTypeId: resolvedContentTypeId,
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
        {/* Content Area - No extra spacing */}
        <Box sx={{ flex: 1, mt: 3, overflow: "auto" }}>
          {isCodeType ? (
            <CodeQuestionForm
              lessonId={lessonId}
              onClose={onClose}
              onSubmit={handleCodeSubmit}
              isLoading={isLoading}
            />
          ) : (
            <ManualQuestionForm
              type={effectiveType}
              lessonId={lessonId}
              onClose={onClose}
              onSubmit={handleContentSubmit}
              isLoading={isLoading}
            />
          )}
        </Box>
      </Box>


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

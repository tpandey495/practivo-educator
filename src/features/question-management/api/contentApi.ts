import { baseApi } from '../../../api/api.routes';

export interface VideoContentDescription {
  html?: string;
  css?: string;
  title?: string;
  difficulty?: string;
  // Allow additional metadata keys if backend adds more
  [key: string]: unknown;
}

export interface CreateVideoContentPayload {
  lessonId: number;
  quesTypeId: number; // e.g., 6 for Video
  contentTypeId: number; // e.g., 1
  title: string;
  description: string;
  score: number;
  url: string; // video url (e.g., YouTube)
  duration: number; // seconds
}

export interface McqOptionPayload {
  text: string;
  isCorrect: boolean;
}

export interface CreateMcqContentPayload {
  lessonId: number;
  quesTypeId: number; // e.g., 1 for MCQ
  contentTypeId: number; // e.g., 2
  title: string;
  description: string;
  score: number;
  options: McqOptionPayload[];
}

export interface CreateFillUpContentPayload {
  lessonId: number;
  quesTypeId: number; // e.g., 3 for Fill Up
  contentTypeId: number; // e.g., 4
  title: string;
  description: string;
  score: number;
  text: string;
  correctAnswer: string;
}

export interface CreateBlogContentPayload {
  lessonId: number;
  quesTypeId: number; // e.g., 5 for Blog
  contentTypeId: number; // e.g., 5
  description: VideoContentDescription; // metadata like title, tags, author
  html: string; // full HTML content
}

export interface CreateSubjectiveContentPayload {
  lessonId: number;
  quesTypeId: number; // e.g., 4 for Subjective/Assignment
  contentTypeId: number; // e.g., 3
  title: string;
  description: string;
  score: number;
  question: string;
}

export interface CodeTemplateItem {
  languageId: number;
  code: string;
}

export type CodeTemplatePayload = CodeTemplateItem[];

export interface TestCasePayload {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface CreateCodeContentPayload {
  lessonId: number;
  quesTypeId: number; // e.g., 7 for Code
  contentTypeId: number; // e.g., 4
  title: string;
  description: string;
  score: number;
  codeTemplate: CodeTemplatePayload;
  alllowedLangauge: number[]; // Array of language IDs (1: JavaScript, 2: Python, 3: Java)
  testCases: TestCasePayload[];
}

export interface CodeLanguage {
  id: number;
  name: string;
  value: string; // e.g., "javascript", "python", "java"
}

// Content API endpoints for course/unit content (not question bank)
export const contentApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create content for a unit (video content)
    createVideoContent: builder.mutation<
      unknown,
      { body: CreateVideoContentPayload; questionId?: number | string }
    >({
      query: ({ body, questionId }) => {
        if (questionId) {
          return {
            url: `/question/${questionId}`,
            method: 'PUT',
            body,
          };
        }
        return {
          url: '/question',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (MCQ content)
    createMcqContent: builder.mutation<
      unknown,
      { body: CreateMcqContentPayload; questionId?: number | string }
    >({
      query: ({ body, questionId }) => {
        if (questionId) {
          return {
            url: `/question/${questionId}`,
            method: 'PUT',
            body,
          };
        }
        return {
          url: '/question',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (Fill-Up content)
    createFillUpContent: builder.mutation<
      unknown,
      { body: CreateFillUpContentPayload; questionId?: number | string }
    >({
      query: ({ body, questionId }) => {
        if (questionId) {
          return {
            url: `/question/${questionId}`,
            method: 'PUT',
            body,
          };
        }
        return {
          url: '/question',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (Blog content)
    createBlogContent: builder.mutation<
      unknown,
      { body: CreateBlogContentPayload; questionId?: number | string }
    >({
      query: ({ body, questionId }) => {
        if (questionId) {
          return {
            url: `/question/${questionId}`,
            method: 'PUT',
            body,
          };
        }
        return {
          url: '/question',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (Subjective/Assignment content)
    createSubjectiveContent: builder.mutation<
      unknown,
      { body: CreateSubjectiveContentPayload; questionId?: number | string }
    >({
      query: ({ body, questionId }) => {
        if (questionId) {
          return {
            url: `/question/${questionId}`,
            method: 'PUT',
            body,
          };
        }
        return {
          url: '/question',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (Code content)
    createCodeContent: builder.mutation<
      unknown,
      { body: CreateCodeContentPayload; questionId?: number | string }
    >({
      query: ({ body, questionId }) => {
        if (questionId) {
          return {
            url: `/question/${questionId}`,
            method: 'PUT',
            body,
          };
        }
        return {
          url: '/question',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Get available programming languages for code questions
    getCodeLanguages: builder.query<CodeLanguage[], void>({
      query: () => ({
        url: '/question/code/languages',
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (Array.isArray(response)) return response;
        if (Array.isArray(response?.data)) return response.data;
        if (Array.isArray(response?.languages)) return response.languages;
        if (Array.isArray(response?.data?.languages)) return response.data.languages;
        return [];
      },
    }),
  }),
});

export const {
  useCreateVideoContentMutation,
  useCreateMcqContentMutation,
  useCreateFillUpContentMutation,
  useCreateBlogContentMutation,
  useCreateSubjectiveContentMutation,
  useCreateCodeContentMutation,
  useGetCodeLanguagesQuery,
} = contentApiSlice;



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
  unitId: number;
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
  unitId: number;
  quesTypeId: number; // e.g., 1 for MCQ
  contentTypeId: number; // e.g., 2
  title: string;
  description: string;
  score: number;
  options: McqOptionPayload[];
}

export interface CreateFillUpContentPayload {
  unitId: number;
  quesTypeId: number; // e.g., 3 for Fill Up
  contentTypeId: number; // e.g., 4
  title: string;
  description: string;
  score: number;
  text: string;
  correctAnswer: string;
}

export interface CreateBlogContentPayload {
  unitId: number;
  quesTypeId: number; // e.g., 5 for Blog
  contentTypeId: number; // e.g., 5
  description: VideoContentDescription; // metadata like title, tags, author
  html: string; // full HTML content
}

export interface CreateSubjectiveContentPayload {
  unitId: number;
  quesTypeId: number; // e.g., 4 for Subjective/Assignment
  contentTypeId: number; // e.g., 3
  title: string;
  description: string;
  score: number;
  question: string;
}

export interface CodeTemplatePayload {
  template: {
    javascript?: string;
    python?: string;
    java?: string;
  };
}

export interface TestCasePayload {
  input: Record<string, any>;
  expectedOutput: string;
  description: string;
}

export interface CreateCodeContentPayload {
  unitId: number;
  quesTypeId: number; // e.g., 7 for Code
  contentTypeId: number; // e.g., 4
  title: string;
  description: string;
  score: number;
  codeTemplate: CodeTemplatePayload;
  alllowedLanguage: number[]; // Array of language IDs (1: JavaScript, 2: Python, 3: Java)
  testCases: TestCasePayload[];
}

// Content API endpoints for course/unit content (not question bank)
export const contentApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create content for a unit (video content)
    createVideoContent: builder.mutation<
      unknown,
      { body: CreateVideoContentPayload }
    >({
      query: ({ body }) => {
        console.log("🌐 API Call: Creating video content", body);
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
      { body: CreateMcqContentPayload }
    >({
      query: ({ body }) => {
        console.log("🌐 API Call: Creating MCQ content", body);
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
      { body: CreateFillUpContentPayload }
    >({
      query: ({ body }) => ({
        url: '/question',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (Blog content)
    createBlogContent: builder.mutation<
      unknown,
      { body: CreateBlogContentPayload }
    >({
      query: ({ body }) => ({
        url: '/question',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (Subjective/Assignment content)
    createSubjectiveContent: builder.mutation<
      unknown,
      { body: CreateSubjectiveContentPayload }
    >({
      query: ({ body }) => ({
        url: '/question',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (Code content)
    createCodeContent: builder.mutation<
      unknown,
      { body: CreateCodeContentPayload }
    >({
      query: ({ body }) => {
        console.log("🌐 API Call: Creating code content", body);
        return {
          url: '/question',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Question', 'Unit'],
    }),
  }),
});

export const {
  useCreateVideoContentMutation,
  useCreateMcqContentMutation,
  useCreateFillUpContentMutation,
  useCreateBlogContentMutation,
  useCreateSubjectiveContentMutation,
  useCreateCodeContentMutation
} = contentApiSlice;



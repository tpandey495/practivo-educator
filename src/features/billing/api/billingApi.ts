import { baseApi } from "../../../api/api.routes";

// ---------------------------------------------------------------------------
// AI credits (live): /v1/ai-credits/*
// ---------------------------------------------------------------------------

/** Every /ai-credits response is wrapped as { success, data } */
interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export interface CreditWallet {
  /** Credits available to spend right now */
  balance: number;
  /** Lifetime credits granted (initial grant + purchases + refunds) */
  totalCredited: number;
  /** Lifetime credits spent on AI operations */
  totalConsumed: number;
}

/** Operation keys the backend prices (see ai-credit-pricing.config.ts) */
export type AiOperation =
  | "COURSE_OUTLINE"
  | "COURSE_WITH_QUESTIONS"
  | "PLAYLIST_WITHOUT_QUESTIONS"
  | "PLAYLIST_WITH_QUESTIONS"
  | "CHAPTER_GENERATION"
  | "LESSON_GENERATION"
  | "CONTENT_TYPE_QUIZ"
  | "SINGLE_QUESTION"
  | "FIVE_MCQS"
  | "QUESTION_GENERATION";

/** Credits per unit, keyed by operation */
export type CreditPricing = Partial<Record<AiOperation, number>>;

export type CreditTransactionType = "CREDIT" | "DEBIT" | "REFUND";

export interface CreditTransaction {
  id: number;
  type: CreditTransactionType;
  amount: number;
  /** AiOperation key, or a ledger label such as INITIAL_GRANT */
  operation: string;
  referenceId?: string | null;
  balanceAfter: number;
  createdAt: string;
}

export interface CreditTransactionsPage {
  items: CreditTransaction[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ---------------------------------------------------------------------------
// Credit packs / purchase: no backend yet, served from a mock.
// ---------------------------------------------------------------------------
export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  popular?: boolean;
  description?: string;
}

export interface PurchaseCreditsResponse {
  success: boolean;
  /** When set, redirect the user to this hosted checkout page */
  checkoutUrl?: string;
}

const mockPacks: CreditPack[] = [
  { id: "starter", name: "Starter", credits: 1000, price: 199, currency: "INR", description: "A few chapters and lessons" },
  { id: "pro", name: "Pro", credits: 5000, price: 799, currency: "INR", popular: true, description: "Generate full courses" },
  { id: "max", name: "Max", credits: 15000, price: 1999, currency: "INR", description: "Best value for teams" },
];

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------
export const billingApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCreditWallet: builder.query<CreditWallet, void>({
      query: () => ({ url: "/ai-credits/wallet", method: "GET" }),
      transformResponse: (res: ApiEnvelope<CreditWallet>) => res.data,
      providesTags: ["Credits"],
    }),

    getCreditPricing: builder.query<CreditPricing, void>({
      query: () => ({ url: "/ai-credits/pricing", method: "GET" }),
      transformResponse: (res: ApiEnvelope<CreditPricing>) => res.data,
    }),

    getCreditTransactions: builder.query<CreditTransactionsPage, { page?: number; limit?: number } | void>({
      query: (args) => ({
        url: "/ai-credits/transactions",
        method: "GET",
        params: { page: args?.page ?? 1, limit: Math.min(100, args?.limit ?? 20) },
      }),
      transformResponse: (res: ApiEnvelope<CreditTransactionsPage>) => res.data,
      providesTags: ["Credits"],
    }),

    getCreditPacks: builder.query<CreditPack[], void>({
      queryFn: async () => ({ data: mockPacks }),
    }),

    purchaseCredits: builder.mutation<PurchaseCreditsResponse, { packId: string }>({
      queryFn: async () => ({
        error: { status: 501, data: { message: "Buying credits isn't available yet." } },
      }),
      invalidatesTags: ["Credits"],
    }),
  }),
});

export const {
  useGetCreditWalletQuery,
  useGetCreditPricingQuery,
  useGetCreditTransactionsQuery,
  useGetCreditPacksQuery,
  usePurchaseCreditsMutation,
} = billingApiSlice;

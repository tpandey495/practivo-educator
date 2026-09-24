import { authApi, baseApi } from '../../../api/api.routes';
import { TAuth } from '../../../types/auth.types';
import { IOrganisationRegister } from '../../../types/user.types';

// Auth API endpoints
export const authApiSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<any, TAuth>({
      query: (body) => ({
        url: '/signin/user',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Register organization endpoint
    registerOrganization: builder.mutation({
      query: (body: Omit<IOrganisationRegister, 'confirmPassword'> & {
        confirmPassword?: string;
      }) => ({
        url: '/register/organization',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Register user endpoint
    registerUser: builder.mutation({
      query: (body: Omit<IOrganisationRegister, 'confirmPassword'> & {
        confirmPassword?: string;
      }) => ({
        url: '/register/user',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Forgot password — always 200 (anti-enumeration)
    forgotPassword: builder.mutation<{ success: boolean; message: string }, { email: string }>({
      query: (body) => ({
        url: '/forgot-password',
        method: 'POST',
        body,
      }),
    }),

    // Reset password — 200 on success, 400 on bad/expired token
    resetPassword: builder.mutation<{ success: boolean; message: string }, { token: string; newPassword: string }>({
      query: (body) => ({
        url: '/reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Profile API endpoints (using baseApi for SERVER_URL)
export const profileApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile
    getProfile: builder.query<any, void>({
      query: () => ({
        url: '/profile/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterOrganizationMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;

export const {
  useGetProfileQuery,
} = profileApiSlice;

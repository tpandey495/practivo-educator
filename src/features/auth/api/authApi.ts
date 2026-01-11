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

    // Firebase token verification removed - only JWT auth supported
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
} = authApiSlice;

export const {
  useGetProfileQuery,
} = profileApiSlice;

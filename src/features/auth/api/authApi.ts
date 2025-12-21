import { authApi } from '../../../api/api.routes';
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
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data?.user?.token) {
            localStorage.setItem('token', data?.user?.token);
          } else {
            throw new Error(data.message || 'Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      },
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

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterOrganizationMutation,
  useRegisterUserMutation,
} = authApiSlice;

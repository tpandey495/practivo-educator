import { baseApi } from '../../../api/api.routes';

export interface UserProfile {
  id: number;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  headline: string | null;
  biography: string | null;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  twitter: string | null;
  youtube: string | null;
  language: string | null;
  picture: string | null;
  displayName: string | null;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  headline?: string;
  biography?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  language?: string;
}

// User API endpoints
export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile
    getProfile: builder.query<{ success: boolean; user: UserProfile }, void>({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),

    // Update user profile
    updateProfile: builder.mutation<{ success: boolean; message: string; user: UserProfile }, UpdateProfileRequest>({
      query: (body) => ({
        url: '/user/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
} = userApiSlice;


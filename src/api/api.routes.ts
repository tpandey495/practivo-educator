/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_URL, SERVER_URL } from '../constants/constants';

// Base query with authentication and error handling
const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  credentials: 'include'
});

// Enhanced base query with error handling
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

// Base API configuration
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Course', 'Chapter', 'Question', 'QuestionBank', 'Unit', 'Auth', 'Cart', 'Enrollment','PracticeSession'],
  endpoints: (builder) => ({}),
});

// Export hooks for usage in components
export const {
} = baseApi;

// Auth API configuration
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_URL,
    credentials: 'include', 
  }),
  tagTypes: ['Auth'],
  endpoints: () => ({}),
});

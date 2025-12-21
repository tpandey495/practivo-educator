/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_URL, SERVER_URL } from '../constants/constants';

// Base query with authentication and error handling
const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Enhanced base query with error handling
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  console.log("🌐 Base API Request:", {
    url: args.url,
    method: args.method,
    body: args.body
  });
  
  const result = await baseQuery(args, api, extraOptions);
  
  console.log("🌐 Base API Response:", {
    status: result.meta?.response?.status,
    data: result.data,
    error: result.error
  });
  
  // Handle invalid token (401 response)
  if (result.error?.status === 401) {
    const errorData = result.error.data as { message: string };
    
    // Check if the error response contains the "Invalid token" message
    if (errorData?.message === "Invalid token.") {
      // Handle the invalid token case
      localStorage.removeItem("token");
      
      // Redirect user to the login page
      window.location.href = "/login";
      
      // Return a custom error message
      return { error: new Error("Session expired. Please log in again.") };
    }
    
    // Optionally handle other 401 scenarios here
    return { error: new Error("Unauthorized access. Please log in again.") };
  }
  
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
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: () => ({}),
});

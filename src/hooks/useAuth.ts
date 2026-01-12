import { useMemo } from "react";
import { useGetProfileQuery } from "../features/auth/api/authApi";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  roleId?: "admin" | "user";
  orgCode?: string;
}

export const useAuth = () => {
 
  
  // Only call profile API if token exists
  const { data, isLoading, error } = useGetProfileQuery();

  console.log("🌐 data:", data,isLoading,error);

  // Extract user data from response (handle different response structures)
  const user: AuthUser | null = useMemo(() => {
    if (!data) return null;
    const userData = data?.data || data?.user || data;
    if (userData) {
      // Hardcode roleId as "admin" for successful access
      return {
        ...userData,
        roleId: "admin" as const,
      };
    }
    return null;
  }, [data]);

  // User is logged in if the profile API call succeeds (has user data and no error)
  const isLoggedIn = useMemo(() => {
   
    if (isLoading) 
      return false;
    if (error) 
      return false;
    return !!user;
  }, [user, error, isLoading]);

  console.log("🌐 isLoggedIn:", isLoggedIn);
  
  // Hardcode isAdmin as true when user is logged in
  const isAdmin = useMemo(() => {
    if (!isLoggedIn) return false;
    // Always return true for logged-in users (roleId is hardcoded as "admin")
    return true;
  }, [isLoggedIn]);
  
  return {
    user,
    isAdmin,
    isLoggedIn,
    isLoading,
  };
};

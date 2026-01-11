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
  const { data, isLoading, error } = useGetProfileQuery();

  console.log("🌐 data:", data,isLoading,error);

  // Extract user data from response (handle different response structures)
  const user: AuthUser | null = useMemo(() => {
    if (!data) return null;
    const userData = data?.data || data?.user || data;
    return userData || null;
  }, [data]);

  // User is logged in if the profile API call succeeds (has data and no error)
  const isLoggedIn = useMemo(() => {
   
    if (isLoading) 
      return false;
    if (error) 
      return false;
    return !!data;
  }, [data, error, isLoading]);

  return {
    user,
    isAdmin: user?.roleId === "admin",
    isLoggedIn,
    isLoading,
  };
};

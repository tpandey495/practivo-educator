import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  roleId?: "admin" | "user";
  orgCode?: string;
}

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decodedUser: AuthUser = jwtDecode(storedToken);

        setToken(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
      }
    } else {
      setToken(null);
      setUser(null);
    }
  }, []);

  // Check if user is logged in
  const isLoggedIn = !!token;

  return {
    token,
    user,
    isAdmin: user?.roleId === "admin",
    isLoggedIn,
  };
};

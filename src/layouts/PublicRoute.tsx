import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Box, CircularProgress } from "@mui/material";

interface PublicRouteProps {
  children: ReactNode;
}

/**
 * PublicRoute - Redirects logged-in users away from public pages (login, home)
 * If user is logged in, redirect to /courses
 */
export default function PublicRoute({ children }: PublicRouteProps) {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect when isLoggedIn becomes true
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate("/courses", { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ✅ User is logged in - don't render children (redirect is handled by useEffect)
  if (isLoggedIn) {
    return null;
  }

  // ✅ User is not logged in - show public page
  return <>{children}</>;
}


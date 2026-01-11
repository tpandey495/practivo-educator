import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
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

  // ✅ User is logged in - redirect to courses page
  if (isLoggedIn) {
    return <Navigate to="/courses" replace />;
  }

  // ✅ User is not logged in - show public page
  return <>{children}</>;
}


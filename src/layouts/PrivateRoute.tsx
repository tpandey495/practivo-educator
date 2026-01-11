import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Box, CircularProgress } from "@mui/material";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // optional
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const location = useLocation();
  const { user, isLoggedIn, isLoading } = useAuth();

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

  // ❌ Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ❌ Role not allowed
  if (allowedRoles && user?.roleId && !allowedRoles.includes(user.roleId)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return <>{children}</>;
}

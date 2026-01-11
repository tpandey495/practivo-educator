import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, CircularProgress } from "@mui/material";

const AdminGuard = () => {
  const { user, isAdmin, isLoading, isLoggedIn } = useAuth();

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

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // User is logged in and is admin
  return <Outlet />;
};
export default AdminGuard;
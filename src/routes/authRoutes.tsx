import type { Route } from "../types/routes";
import {
  Login,
  OrganizationSignup,
  ForgotPassword,
  ResetPassword,
} from "../features";
import PublicRoute from "../layouts/PublicRoute";

export const authRoutes: Route[] = [
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/organization/create-account",
    element: <OrganizationSignup />,
  },
];


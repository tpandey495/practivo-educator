import type { Route } from "../types/routes";
import { Login, OrganizationSignup } from "../features";
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
    path: "/organization/create-account",
    element: <OrganizationSignup />,
  },
];


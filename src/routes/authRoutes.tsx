import type { Route } from "../types/routes";
import { Login, OrganizationSignup } from "../features";
import PublicRoute from "../layouts/PublicRoute";

export const authRoutes: Route[] = [
  {
    path: "/tiiron-admin",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  // {
  //   path: "/sign-up",
  //   element: <Signup />,
  // },
  {
    path: "/organization/create-account",
    element: <OrganizationSignup />,
  },
];


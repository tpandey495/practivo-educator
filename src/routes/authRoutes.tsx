import type { Route } from "../types/routes";
import { Login, Signup, OrganizationSignup } from "../features";

export const authRoutes: Route[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/organization/create-account",
    element: <OrganizationSignup />,
  },
];


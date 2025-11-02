import { ReactNode } from "react";

export interface Route {
  path?: string;
  element?: ReactNode;
  children?: Route[];
}

// This matches React Router's RouteObject type structure

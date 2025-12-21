import React from "react";
import type { JSX } from "react";
export interface Route {
  label?: string;
  icon?: React.ReactNode | React.ComponentType;
  path?: string;
  element?: React.ReactNode | JSX.Element;
  children?: Route[];
  onClick?:()=>void;
}

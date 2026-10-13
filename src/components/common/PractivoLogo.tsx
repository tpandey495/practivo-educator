import React from "react";
import Brand from "./Brand";

export interface PractivoLogoProps {
  variant?: "full" | "mark";
  height?: number | string;
  width?: number | string;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export const PractivoLogo: React.FC<PractivoLogoProps> = ({
  variant = "full",
  className = "",
  href = "/",
  style = {},
}) => {
  return (
    <Brand
      size="md"
      markOnly={variant === "mark"}
      to={href}
      className={className}
      style={style}
    />
  );
};

export default PractivoLogo;

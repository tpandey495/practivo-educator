import React from "react";
import { Link } from "react-router-dom";

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
  height = 36,
  width = "auto",
  className = "",
  href,
  style = {},
  alt = "Practivo",
}) => {
  const imgSrc = variant === "mark" ? "/practivo-logo-mark.png" : "/practivo-logo.png";

  const imgElement = (
    <img
      src={imgSrc}
      alt={alt}
      className={`object-contain transition-transform duration-200 ${className}`}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        width: typeof width === "number" ? `${width}px` : width,
        ...style,
      }}
    />
  );

  if (href) {
    return (
      <Link to={href} className="inline-flex items-center">
        {imgElement}
      </Link>
    );
  }

  return imgElement;
};

export default PractivoLogo;

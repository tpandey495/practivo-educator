import React from "react";

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  variant?: "full" | "mark";
}

const Logo: React.FC<LogoProps> = ({ width = "auto", height = 40, className = "", variant = "full" }) => {
  const imgSrc = variant === "mark" ? "/practivo-logo-mark.png" : "/practivo-logo.png";
  return (
    <img
      width={width}
      height={height}
      src={imgSrc}
      alt="Practivo Logo"
      className={className}
      style={{ height: typeof height === "number" ? `${height}px` : height, objectFit: "contain" }}
    />
  );
};

export default Logo;


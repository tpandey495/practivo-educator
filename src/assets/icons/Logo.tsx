import React from "react";
import Brand from "../../components/common/Brand";

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  variant?: "full" | "mark";
}

const Logo: React.FC<LogoProps> = ({ className = "", variant = "full" }) => {
  return (
    <Brand
      size="md"
      markOnly={variant === "mark"}
      className={className}
      to={null}
    />
  );
};

export default Logo;

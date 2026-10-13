import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export interface BrandProps {
  size?: "sm" | "md" | "lg";
  markOnly?: boolean;
  to?: string | null;
  subtitle?: string;
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const sizeConfig = {
  sm: {
    markSize: 26,
    iconSize: 15,
    borderRadius: 7,
    fontSize: 20,
    gap: 8,
  },
  md: {
    markSize: 31,
    iconSize: 18,
    borderRadius: 8,
    fontSize: 24,
    gap: 9,
  },
  lg: {
    markSize: 38,
    iconSize: 22,
    borderRadius: 10,
    fontSize: 28,
    gap: 11,
  },
};

export const Brand: React.FC<BrandProps> = ({
  size = "md",
  markOnly = false,
  to = "/",
  subtitle,
  textColor,
  className = "",
  style = {},
  onClick,
}) => {
  const cfg = sizeConfig[size] || sizeConfig.md;

  const content = (
    <span
      className={`brand inline-flex items-center text-decoration-none select-none ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${cfg.gap}px`,
        textDecoration: "none",
        fontFamily: "var(--font-display, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        ...style,
      }}
      onClick={onClick}
    >
      <span
        className="brand-mark"
        style={{
          width: `${cfg.markSize}px`,
          height: `${cfg.markSize}px`,
          display: "grid",
          placeItems: "center",
          backgroundColor: "var(--primary, #e74230)",
          color: "var(--primary-foreground, #ffffff)",
          borderRadius: `${cfg.borderRadius}px`,
          transform: "rotate(-5deg)",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(231, 66, 48, 0.25)",
          transition: "transform 0.2s ease",
        }}
      >
        <BookOpen size={cfg.iconSize} strokeWidth={2.5} />
      </span>

      {!markOnly && (
        <span
          className="brand-title"
          style={{
            fontSize: `${cfg.fontSize}px`,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: textColor || "var(--primary, #e74230)",
            lineHeight: 1,
            display: "inline-flex",
            alignItems: "baseline",
          }}
        >
          practivo<span className="text-primary" style={{ color: "var(--primary, #e74230)" }}>.</span>
        </span>
      )}

      {subtitle && !markOnly && (
        <span
          style={{
            marginLeft: "8px",
            borderLeft: "1px solid #e5e7eb",
            paddingLeft: "12px",
            color: "#6b7280",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          {subtitle}
        </span>
      )}
    </span>
  );

  if (to) {
    return (
      <Link
        to={to}
        style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Brand;

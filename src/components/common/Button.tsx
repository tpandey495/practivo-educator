import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2, LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: LucideIcon | null;
  rightIcon?: LucideIcon | null;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      type = "button",
      variant = "primary",
      size = "md",
      className = "",
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon: LeftIcon = null,
      rightIcon: RightIcon = null,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center rounded-xl font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };
    const variants = {
      primary:
        "bg-gradient-to-r from-cyan-500 to-sky-500 text-white hover:from-cyan-600 hover:to-sky-600 focus:ring-sky-300",
      secondary: "bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-400",
      outline:
        "bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white focus:ring-cyan-200",
      ghost:
        "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-200",
    };

    const isDisabled = disabled || loading;
    const disabledClasses = isDisabled
      ? "opacity-60 cursor-not-allowed pointer-events-none"
      : "hover:shadow-md";
    const widthClass = fullWidth ? "w-full" : "inline-block";

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={`${base} ${sizes[size]} ${variants[variant] ?? variants.primary
          } ${disabledClasses} ${widthClass} ${className}`}
        {...props}
      >
        {/* Left icon or spinner */}
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
        ) : (
          LeftIcon && <LeftIcon className="w-4 h-4 mr-2" aria-hidden="true" />
        )}

        <span className="leading-none">{children}</span>

        {/* Right icon */}
        {!loading && RightIcon && (
          <RightIcon className="w-4 h-4 ml-2" aria-hidden="true" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;


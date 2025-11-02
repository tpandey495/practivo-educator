import React, { forwardRef, ReactNode, HTMLAttributes, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

interface CardAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "secondary";
}

interface BaseCardProps {
  title?: string;
  description?: string;
  icon?: ReactNode | React.ComponentType<{ className?: string }>;
  image?: string;
  badge?: string;
  footer?: ReactNode;
  actions?: CardAction[];
  variant?: "elevated" | "outlined" | "glass";
  children?: ReactNode;
  className?: string;
}

type CardProps = BaseCardProps & {
  href?: string;
  onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<any, CardProps>(
  (
    {
      title,
      description,
      icon,
      image,
      badge,
      footer,
      actions = [],
      href,
      onClick,
      variant = "elevated",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    // pick tag depending on interactivity
    const isLink = Boolean(href);
    const isButton = Boolean(onClick) && !href;
    const Tag = isLink ? "a" : isButton ? "button" : "div";

    const base =
      "group block rounded-2xl overflow-hidden transition-shadow duration-200 focus:outline-none";
    const variants = {
      elevated:
        "bg-white border border-gray-100 shadow-sm hover:shadow-lg focus:shadow-lg",
      outlined: "bg-white border border-gray-200 hover:border-gray-300",
      glass:
        "bg-white/60 backdrop-blur-md border border-white/10 hover:bg-white/70 shadow-none",
    };

    const contentPadding = "p-6";

    return (
      <Tag
        ref={ref}
        href={href}
        onClick={onClick}
        className={`${base} ${variants[variant] ?? variants.elevated
          } ${contentPadding} ${className}`}
        {...(isButton ? { type: "button" } : {})}
        {...(props as any)}
      >
        {/* image (optional) */}
        {image && (
          <div className="mb-4 -mx-6">
            <img
              src={image}
              alt={title ?? "card image"}
              className="w-full h-44 object-cover rounded-t-2xl"
            />
          </div>
        )}

        <div className="relative">
          {/* badge */}
          {badge && (
            <div className="absolute right-0 -translate-y-6 translate-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 shadow-sm">
                {badge}
              </span>
            </div>
          )}

          {/* header */}
          <div className="flex items-start gap-4">
            {icon && (
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-cyan-500 text-lg">
                {/* If icon is a component, render it; if it's node, render directly */}
                {typeof icon === "function"
                  ? React.createElement(icon, { className: "w-6 h-6" })
                  : icon}
              </div>
            )}

            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
          </div>

          {/* body */}
          {children && (
            <div className="mt-4 text-sm text-gray-700">{children}</div>
          )}

          {/* actions */}
          {actions.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {actions.map((act: CardAction, i: number) => {
                const {
                  label,
                  href: aHref,
                  onClick: aClick,
                  variant: actVar = "primary",
                } = act;
                const ActTag = aHref ? "a" : aClick ? "button" : "div";
                const actBase =
                  "inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition";
                const actStyles =
                  actVar === "primary"
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white hover:opacity-95"
                    : actVar === "ghost"
                      ? "bg-transparent text-cyan-600 hover:bg-gray-50 border border-transparent"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200";

                return (
                  <ActTag
                    key={i}
                    href={aHref}
                    onClick={aClick}
                    type={ActTag === "button" ? "button" : undefined}
                    className={`${actBase} ${actStyles}`}
                  >
                    {label}
                  </ActTag>
                );
              })}
            </div>
          )}
        </div>

        {/* footer */}
        {footer && (
          <div className="mt-6 border-t border-gray-100 pt-4">{footer}</div>
        )}
      </Tag>
    );
  }
);

Card.displayName = "Card";
export default Card;


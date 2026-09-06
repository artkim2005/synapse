import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "text";
type Size = "lg" | "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-500 text-white hover:brightness-95 disabled:bg-primary-200 disabled:text-white",
  secondary:
    "bg-white text-primary-500 border border-primary-500 hover:bg-primary-100 disabled:border-neutral-300 disabled:text-neutral-300",
  tertiary:
    "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100 disabled:text-neutral-300",
  text: "bg-transparent text-primary-500 hover:text-primary-500/80 disabled:text-neutral-300",
};

const sizeClasses: Record<Size, string> = {
  lg: "h-12 px-4 text-base gap-2",
  md: "h-10 px-3 text-sm gap-1.5",
  sm: "h-8 px-2 text-xs gap-1",
};

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const isText = variant === "text";
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-small font-medium transition-colors disabled:cursor-not-allowed ${
        isText ? "px-0 h-auto" : ""
      } ${variantClasses[variant]} ${isText ? "" : sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
      {withArrow && <ArrowRight className="size-4" strokeWidth={2} />}
    </button>
  );
}

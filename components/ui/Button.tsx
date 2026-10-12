import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-600",
  secondary: "bg-white border border-line text-ink hover:bg-black/[0.03]",
  ghost: "text-mute hover:bg-black/5",
  danger: "bg-white border border-line text-red-600 hover:bg-red-50",
};
const SIZES: Record<Size, string> = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm" };

// Link ya da başka elemanlara da aynı görünümü vermek için.
export function buttonClass(variant: Variant = "secondary", size: Size = "md") {
  return `inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]}`;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "secondary", size = "md", className = "", type = "button", ...rest },
  ref
) {
  return <button ref={ref} type={type} className={`${buttonClass(variant, size)} ${className}`} {...rest} />;
});

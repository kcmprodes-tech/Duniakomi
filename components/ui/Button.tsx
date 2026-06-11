import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary: "bg-orange text-white shadow-md shadow-orange/30 hover:brightness-105",
  secondary: "bg-navy text-white hover:brightness-110",
  outline: "border-2 border-navy/15 bg-white text-navy hover:border-navy/30",
  ghost: "text-navy hover:bg-navy/5",
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-bold transition hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:hover:translate-y-0 disabled:active:scale-100",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

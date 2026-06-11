import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

// Kartu bergaya "sticker badge": sudut membulat, outline lembut, sedikit shadow.
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border-2 border-navy/10 bg-white/90 p-4 shadow-lg shadow-navy/5 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

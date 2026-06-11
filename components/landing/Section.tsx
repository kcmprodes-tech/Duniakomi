import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// Pembungkus section konsisten: lebar maksimum, padding, offset untuk navbar sticky.
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20",
        className
      )}
    >
      {children}
    </section>
  );
}

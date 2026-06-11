"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SpeechBubble({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      key={typeof children === "string" ? children : undefined}
      className={cn(
        "relative max-w-xs rounded-2xl rounded-bl-sm border-2 border-navy/10 bg-white px-4 py-2.5 text-center font-body text-sm font-medium text-navy shadow-md",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

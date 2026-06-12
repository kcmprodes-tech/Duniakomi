"use client";

import { motion } from "framer-motion";
import { Flame, Coins, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToastInfo } from "@/lib/kolom-komi/types";

const STYLE = {
  checkin: "bg-orange text-white",
  bonus: "bg-kompas text-white",
  sudah: "bg-navy text-white",
} as const;

export function Toast({ info }: { info: ToastInfo }) {
  const Icon = info.tipe === "checkin" ? Flame : info.tipe === "bonus" ? Coins : Info;
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="fixed left-1/2 top-4 z-[90] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2"
    >
      <div
        className={cn(
          "flex items-center gap-2 rounded-2xl px-4 py-3 font-body text-sm font-bold shadow-xl",
          STYLE[info.tipe]
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span>{info.pesan}</span>
      </div>
    </motion.div>
  );
}

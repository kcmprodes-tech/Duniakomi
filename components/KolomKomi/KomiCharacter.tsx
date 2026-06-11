"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { cn } from "@/lib/utils";

interface Props {
  src?: string;
  /** Emoji aksesori kostum (placeholder sebelum art kostum asli tersedia). */
  accessory?: string;
  size?: number;
  className?: string;
  /** "bob" = mengambang pelan, "happy" = lebih lincah, "none" = diam */
  mood?: "bob" | "happy" | "none";
}

export function KomiCharacter({
  src = KOMI_IMG.base,
  accessory,
  size = 220,
  mood = "bob",
  className,
}: Props) {
  const anim =
    mood === "none"
      ? undefined
      : mood === "happy"
        ? { y: [0, -18, 0], rotate: [0, -3, 3, 0] }
        : { y: [0, -12, 0] };

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      animate={anim}
      transition={{ duration: mood === "happy" ? 1.1 : 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src={src}
        alt="Komi"
        fill
        priority
        sizes="240px"
        className="object-contain drop-shadow-xl"
      />
      {accessory ? (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-3xl drop-shadow">
          {accessory}
        </span>
      ) : null}
    </motion.div>
  );
}

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";

// Layar cover + loading (tema mancing) sebelum masuk game.
// Layer: latar kolam + logo + Komi mancing + bar loading beranimasi + logo KOMPAS.
export function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="absolute inset-0 z-[60] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Latar kolam */}
      <Image src={KOMI_IMG.coverBg} alt="" fill priority sizes="460px" className="object-cover" />

      {/* Logo Kolom Komi */}
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute left-1/2 top-[3%] h-[17%] w-[66%] -translate-x-1/2"
      >
        <Image
          src={KOMI_IMG.logo}
          alt="Kolom Komi"
          fill
          priority
          sizes="320px"
          className="object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Komi sedang mancing */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[18%] left-1/2 h-[60%] w-[92%] -translate-x-1/2"
      >
        <Image
          src={KOMI_IMG.mancing}
          alt="Komi mancing"
          fill
          priority
          sizes="420px"
          className="object-contain object-bottom drop-shadow-xl"
        />
      </motion.div>

      {/* Bar loading */}
      <div className="absolute bottom-[11.5%] left-1/2 w-[62%] -translate-x-1/2">
        <div className="h-4 w-full overflow-hidden rounded-full border-[3px] border-[#7c4f2a] bg-[#caa06f] p-[2px] shadow-inner">
          <motion.div
            initial={{ width: "6%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.3, ease: "easeInOut" }}
            className="h-full rounded-full bg-gradient-to-b from-[#b6e85f] to-[#5da82c]"
          />
        </div>
      </div>

      {/* Logo KOMPAS.com (putih) */}
      <div className="absolute bottom-[4.5%] left-1/2 h-[4.5%] w-[46%] -translate-x-1/2">
        <Image
          src={KOMI_IMG.kompasPutih}
          alt="KOMPAS.com"
          fill
          priority
          sizes="220px"
          className="object-contain drop-shadow"
        />
      </div>
    </motion.div>
  );
}

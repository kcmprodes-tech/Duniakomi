"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";

// Layar cover + loading sebelum masuk game. Bar loading beranimasi,
// lalu memanggil onDone untuk masuk ke game.
export function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="absolute inset-0 z-[60] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Latar ruangan (menutupi game di belakang) */}
      <Image src={KOMI_IMG.room} alt="" fill priority sizes="460px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-cream/50" />

      {/* Isi splash */}
      <div className="relative flex h-full flex-col items-center justify-between px-8 py-12">
        {/* Logo Kolom Komi */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mt-4 h-28 w-60"
        >
          <Image
            src={KOMI_IMG.logo}
            alt="Kolom Komi"
            fill
            priority
            sizes="260px"
            className="object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* Karakter Komi */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-[280px] w-[280px]"
        >
          <Image
            src={KOMI_IMG.base}
            alt="Komi"
            fill
            priority
            sizes="320px"
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Bar loading + KOMPAS.com */}
        <div className="flex w-full flex-col items-center gap-4">
          <div className="h-4 w-64 max-w-full overflow-hidden rounded-full border-2 border-navy/15 bg-white/70 p-[3px] shadow-inner">
            <motion.div
              initial={{ width: "8%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.1, ease: "easeInOut" }}
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
            />
          </div>
          <p className="font-serif text-lg italic tracking-wide text-navy">
            <span className="font-bold not-italic">KOMPAS</span>.com
          </p>
        </div>
      </div>
    </motion.div>
  );
}

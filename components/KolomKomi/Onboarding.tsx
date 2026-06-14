"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { GameButton } from "@/components/ui/kit";

const KEY = "kolom-komi-onboarded";

export function sudahOnboarding(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return true;
  }
}

export function resetOnboarding() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* abaikan */
  }
}

const STEPS = [
  {
    judul: "Kenalin, ini Komi!",
    teks: "Kucing necis yang nemenin kamu baca berita tiap hari. Makin sering mampir, makin akrab.",
  },
  {
    judul: "Rawat Komi",
    teks: "Kasih makan, colek badannya (dia geli, lho!), dan tidurin kalau ngantuk biar Komi selalu happy.",
  },
  {
    judul: "Baca berita = dapat Koin",
    teks: "Baca berita bareng Komi & check-in tiap hari buat ngumpulin Koin.",
  },
  {
    judul: "Belanja & main bareng",
    teks: "Pakai Koin buat dandanin Komi, plus main mini-game seru bareng dia. Yuk mulai!",
  },
];

export function Onboarding() {
  const [tampil, setTampil] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!sudahOnboarding()) setTampil(true);
  }, []);

  if (!tampil) return null;

  const last = i === STEPS.length - 1;
  const step = STEPS[i];
  const selesai = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* abaikan */
    }
    setTampil(false);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-navy/70 px-6 backdrop-blur-sm">
      <button
        onClick={selesai}
        className="absolute right-4 top-4 font-body text-sm font-bold text-white/70 transition active:scale-95"
      >
        Lewati
      </button>

      <div className="relative h-40 w-40">
        <Image src={KOMI_IMG.base} alt="Komi" fill unoptimized className="object-contain drop-shadow-xl" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
          className="mt-4 w-full max-w-xs rounded-3xl border-2 border-white/15 bg-white/95 p-5 text-center shadow-xl"
        >
          <h2 className="font-display text-xl font-extrabold text-navy">{step.judul}</h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-gray-text">{step.teks}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex gap-1.5">
        {STEPS.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full transition-colors ${idx === i ? "bg-orange" : "bg-white/40"}`}
          />
        ))}
      </div>

      <GameButton className="mt-5 w-full max-w-xs" onClick={() => (last ? selesai() : setI(i + 1))}>
        {last ? "Mulai main 🎉" : "Lanjut"}
      </GameButton>
    </div>
  );
}

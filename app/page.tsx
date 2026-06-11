"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Halaman tes Hari 1 — bukan halaman final.
// Tujuannya membuktikan fondasi jalan: logo, animasi (Framer Motion),
// ikon (Lucide), font (Baloo 2 + Plus Jakarta Sans), dan warna brand.

const warnaBrand: [string, string][] = [
  ["Navy", "bg-navy"],
  ["Orange", "bg-orange"],
  ["Blush", "bg-blush"],
  ["Cream", "bg-cream"],
  ["Kompas", "bg-kompas"],
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 bg-cream px-6 py-16 text-center">
      {/* Logo Komi dengan animasi mengambang */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/komi.png"
          alt="Logo Dunia Komi"
          width={260}
          height={260}
          priority
          className="h-auto w-[200px] drop-shadow-xl sm:w-[260px]"
        />
      </motion.div>

      <div className="flex flex-col items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange/15 px-4 py-1 font-body text-sm font-semibold text-orange">
          <Sparkles className="h-4 w-4" />
          Hari 1 — Fondasi siap
        </span>

        <h1 className="font-display text-5xl font-extrabold text-navy sm:text-6xl">
          Halo, Komi!
        </h1>

        <p className="max-w-md font-body text-lg text-gray-text">
          Kamu &amp; Komi — sahabat baca berita tiap hari. Mesin, warna, font,
          dan logo sudah siap untuk dibangun lebih lanjut.
        </p>
      </div>

      {/* Bukti palet warna brand */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {warnaBrand.map(([label, klass]) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <div
              className={`h-12 w-12 rounded-2xl border-2 border-navy/10 ${klass}`}
            />
            <span className="font-body text-xs text-gray-text">{label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

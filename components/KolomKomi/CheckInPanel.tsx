"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Flame, Check } from "lucide-react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import {
  HADIAH_CHECKIN,
  sudahBacaHariIni,
  sudahCheckinHariIni,
  indexSiklus,
} from "@/lib/kolom-komi/checkin";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CheckInPanel({ onClose }: { onClose: () => void }) {
  const { state, claimCheckin } = useKolomKomi();
  const [pesan, setPesan] = useState<string | null>(null);

  if (!state) return null;

  const sudahBaca = sudahBacaHariIni(state);
  const sudahCheckin = sudahCheckinHariIni(state);
  const target = indexSiklus(state); // 0–6: sel "hari ini" sebelum klaim

  const claim = () => setPesan(claimCheckin().pesan ?? null);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-sm rounded-3xl border-2 border-navy/10 bg-cream p-5 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-navy/50 transition hover:bg-navy/5"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-orange" />
          <h2 className="font-display text-2xl font-extrabold text-navy">Check-in Harian</h2>
        </div>
        <p className="mt-1 font-body text-sm text-gray-text">
          Baca berita tiap hari bareng Komi, kumpulin Koin Ikan! Streak{" "}
          <span className="font-bold text-navy">{state.streak} hari</span> 🔥
        </p>

        {/* Papan 7 hari */}
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {HADIAH_CHECKIN.map((h, i) => {
            const claimed = i < target;
            const isToday = i === target && !sudahCheckin;
            const isJackpot = i === 6;
            return (
              <div
                key={i}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border-2 py-2",
                  claimed
                    ? "border-emerald-300 bg-emerald-50"
                    : isToday
                      ? "border-orange bg-orange/10"
                      : "border-navy/10 bg-white/60"
                )}
              >
                <span className="font-body text-[9px] font-bold text-navy/50">H{i + 1}</span>
                {claimed ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <span className={isJackpot ? "text-base" : "text-sm"}>
                    {isJackpot ? "🎁" : "🐟"}
                  </span>
                )}
                <span className="font-body text-[9px] font-bold text-navy/70">{h}</span>
              </div>
            );
          })}
        </div>

        {/* Status / aksi */}
        <div className="mt-4">
          {sudahCheckin ? (
            <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-center font-body text-sm font-semibold text-emerald-600">
              ✓ Sudah check-in hari ini. Sampai jumpa besok! 🐟
            </p>
          ) : sudahBaca ? (
            <Button onClick={claim} className="w-full py-3 text-base">
              🐟 Klaim Hari ke-{target + 1} (+{HADIAH_CHECKIN[target]} Koin)
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-center font-body text-sm text-gray-text">
                Baca minimal 1 berita dulu buat check-in hari ini.
              </p>
              <Link href="/kolom-komi/baca" onClick={onClose}>
                <Button variant="outline" className="w-full py-2.5">
                  📰 Baca Bareng dulu
                </Button>
              </Link>
            </div>
          )}
          {pesan ? (
            <p className="mt-2 text-center font-body text-xs font-semibold text-orange">{pesan}</p>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

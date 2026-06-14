"use client";

import { useEffect, useRef, useState } from "react";
import type { HasilAksi } from "@/lib/kolom-komi/types";
import { GameIntro, GameResult } from "./GamePanels";

// Mini-game "Bersih-bersih": kotoran tersebar di rumah Komi. Tap semua secepat
// mungkin — makin cepat selesai, makin banyak Koin.

type Fase = "intro" | "main" | "habis";

interface Kotor {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const JUMLAH = 14;
const KOTORAN = ["💨", "🍂", "🕸️", "🧦", "🍃", "🗑️"];

export function BersihBersih({ onSelesai }: { onSelesai: (skor: number) => HasilAksi }) {
  const [fase, setFase] = useState<Fase>("intro");
  const [kotor, setKotor] = useState<Kotor[]>([]);
  const [waktu, setWaktu] = useState(0);
  const [waktuAkhir, setWaktuAkhir] = useState(0);
  const [skorAkhir, setSkorAkhir] = useState(0);
  const [hasilPesan, setHasilPesan] = useState("");

  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const startRef = useRef(0);
  const sudahReward = useRef(false);

  const mulai = () => {
    sudahReward.current = false;
    const items: Kotor[] = Array.from({ length: JUMLAH }, (_, i) => ({
      id: i,
      x: 8 + Math.random() * 82,
      y: 14 + Math.random() * 70,
      emoji: KOTORAN[Math.floor(Math.random() * KOTORAN.length)],
    }));
    setKotor(items);
    setWaktu(0);
    setFase("main");
  };

  // Stopwatch.
  useEffect(() => {
    if (fase !== "main") return;
    startRef.current = Date.now();
    setWaktu(0);
    intervalRef.current = setInterval(() => setWaktu((w) => +(w + 0.1).toFixed(1)), 100);
    return () => clearInterval(intervalRef.current);
  }, [fase]);

  // Semua kotoran bersih → hitung skor (makin cepat makin tinggi).
  useEffect(() => {
    if (fase === "main" && kotor.length === 0 && !sudahReward.current) {
      sudahReward.current = true;
      clearInterval(intervalRef.current);
      const elapsed = (Date.now() - startRef.current) / 1000;
      const skor = Math.max(8, Math.round(60 - elapsed * 3));
      setWaktuAkhir(+elapsed.toFixed(1));
      setSkorAkhir(skor);
      const r = onSelesai(skor);
      setHasilPesan(r.pesan ?? "");
      setFase("habis");
    }
  }, [kotor, fase, onSelesai]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const bersih = (id: number) => setKotor((arr) => arr.filter((k) => k.id !== id));

  if (fase === "intro")
    return (
      <GameIntro
        emoji="🧹"
        title="Bersih-bersih"
        desc="Rumah Komi berantakan! Tap semua kotoran secepat mungkin. Makin cepat beres, makin banyak Koin."
        mulaiLabel="Mulai Bersih-bersih 🧹"
        onMulai={mulai}
      />
    );

  if (fase === "habis")
    return (
      <GameResult
        emoji="✨"
        judul="Bersih!"
        skorLabel={`Selesai dalam ${waktuAkhir}s`}
        skor={skorAkhir}
        satuan="poin"
        pesan={hasilPesan}
        onUlang={mulai}
      />
    );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between font-display font-extrabold text-navy">
        <span className="text-base">🧹 {kotor.length} tersisa</span>
        <span className="text-base">⏱️ {waktu.toFixed(1)}s</span>
      </div>

      <div className="relative h-[380px] w-full overflow-hidden rounded-[2rem] border-[3px] border-[#c2641a]/30 bg-white/40 shadow-inner">
        {kotor.map((k) => (
          <button
            key={k.id}
            type="button"
            onPointerDown={() => bersih(k.id)}
            style={{ left: `${k.x}%`, top: `${k.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none text-3xl drop-shadow transition-transform active:scale-90"
            aria-label="Bersihkan"
          >
            {k.emoji}
          </button>
        ))}
      </div>

      <p className="text-center font-body text-xs font-semibold text-navy/60">
        Tap semua kotoran secepat mungkin! 🧼
      </p>
    </div>
  );
}

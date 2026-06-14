"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HasilAksi } from "@/lib/kolom-komi/types";
import { GameButton, Panel, ProgressBar, Badge } from "@/components/ui/kit";

// Mini-game "Tangkap Ikan": ikan muncul acak di kolam, tap untuk menangkap
// dalam batas waktu. Skor → reward Koin Ikan (lewat onSelesai). Tanpa engine game.

type Fase = "intro" | "main" | "habis";
type Jenis = "ikan" | "emas" | "sampah";

interface Ikan {
  id: number;
  x: number; // posisi % horizontal
  y: number; // posisi % vertikal
  jenis: Jenis;
}

const DURASI = 25; // detik
const MAKS_DI_LAYAR = 6;
const NILAI: Record<Jenis, number> = { ikan: 1, emas: 3, sampah: -2 };
const EMOJI: Record<Jenis, string> = { ikan: "🐟", emas: "🐠", sampah: "🥾" };

export function TangkapIkan({
  onSelesai,
}: {
  onSelesai: (skor: number) => HasilAksi;
}) {
  const [fase, setFase] = useState<Fase>("intro");
  const [skor, setSkor] = useState(0);
  const [sisa, setSisa] = useState(DURASI);
  const [ikan, setIkan] = useState<Ikan[]>([]);
  const [hasilPesan, setHasilPesan] = useState("");

  const idRef = useRef(0);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const sudahReward = useRef(false);

  const bersihkan = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current.clear();
  }, []);

  const mulai = () => {
    bersihkan();
    sudahReward.current = false;
    setSkor(0);
    setSisa(DURASI);
    setIkan([]);
    setFase("main");
  };

  // Hitung mundur + pemunculan ikan selama fase main.
  useEffect(() => {
    if (fase !== "main") return;

    const tick = setInterval(() => {
      setSisa((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);

    const spawn = () => {
      setIkan((arr) => {
        if (arr.length >= MAKS_DI_LAYAR) return arr;
        const id = ++idRef.current;
        const r = Math.random();
        const jenis: Jenis = r > 0.9 ? "sampah" : r > 0.74 ? "emas" : "ikan";
        const x = 8 + Math.random() * 78;
        const y = 14 + Math.random() * 68;
        // Hilang sendiri kalau tidak ditangkap.
        const to = setTimeout(() => {
          setIkan((a) => a.filter((f) => f.id !== id));
          timers.current.delete(to);
        }, 1700 + Math.random() * 800);
        timers.current.add(to);
        return [...arr, { id, x, y, jenis }];
      });
      const next = setTimeout(spawn, 460 + Math.random() * 360);
      timers.current.add(next);
    };
    spawn();

    return () => {
      clearInterval(tick);
      bersihkan();
    };
  }, [fase, bersihkan]);

  // Waktu habis → reward sekali + tampilkan hasil.
  useEffect(() => {
    if (fase === "main" && sisa === 0 && !sudahReward.current) {
      sudahReward.current = true;
      setIkan([]);
      const r = onSelesai(skor);
      setHasilPesan(r.pesan ?? "");
      setFase("habis");
    }
  }, [sisa, fase, skor, onSelesai]);

  // Bersihkan timer saat komponen dilepas.
  useEffect(() => () => bersihkan(), [bersihkan]);

  const tangkap = (f: Ikan) => {
    setIkan((arr) => arr.filter((x) => x.id !== f.id));
    setSkor((s) => Math.max(0, s + NILAI[f.jenis]));
  };

  // ---- Layar intro ----
  if (fase === "intro") {
    return (
      <Panel className="flex flex-col items-center gap-3 text-center">
        <span className="text-5xl">🎣</span>
        <h2 className="font-display text-xl font-extrabold text-navy">Tangkap Ikan</h2>
        <p className="font-body text-sm leading-relaxed text-gray-text">
          Tap ikan sebanyak mungkin dalam <b>{DURASI} detik</b>. Tiap ikan jadi
          Koin Ikan buat Komi!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 font-body text-xs font-semibold text-navy">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 shadow-sm">
            🐟 +1
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 shadow-sm">
            🐠 +3
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 shadow-sm">
            🥾 −2 (hindari!)
          </span>
        </div>
        <GameButton onClick={mulai} size="lg" className="mt-1 w-full">
          Mulai Mancing 🎣
        </GameButton>
      </Panel>
    );
  }

  // ---- Layar hasil ----
  if (fase === "habis") {
    return (
      <Panel className="flex flex-col items-center gap-3 text-center">
        <span className="text-5xl">🏆</span>
        <h2 className="font-display text-xl font-extrabold text-navy">Selesai!</h2>
        <p className="font-body text-sm text-gray-text">Kamu menangkap</p>
        <p className="font-display text-5xl font-extrabold text-orange [text-shadow:0_2px_0_rgba(0,0,0,0.1)]">
          {skor} <span className="text-2xl">poin</span>
        </p>
        {hasilPesan ? (
          <Badge tone="vip" className="text-sm">
            {hasilPesan}
          </Badge>
        ) : null}
        <GameButton onClick={mulai} size="lg" className="mt-1 w-full">
          Main Lagi 🔁
        </GameButton>
      </Panel>
    );
  }

  // ---- Layar bermain ----
  return (
    <div className="flex flex-col gap-3">
      {/* HUD: skor + waktu */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#e6951b] bg-gradient-to-b from-[#ffd34d] to-[#ffb01f] px-3 py-1 shadow-md">
          <span className="text-base leading-none">🐟</span>
          <span className="font-display text-lg font-extrabold leading-none text-white [text-shadow:0_1px_0_#d98512]">
            {skor}
          </span>
        </span>
        <div className="flex-1">
          <ProgressBar
            value={sisa}
            max={DURASI}
            showValue={false}
            color={sisa <= 5 ? "from-[#ff8080] to-[#e03131]" : "from-[#5bbcf2] to-[#0e6bb3]"}
          />
        </div>
        <span className="w-9 text-right font-display text-lg font-extrabold text-navy">
          {sisa}s
        </span>
      </div>

      {/* Kolam */}
      <div className="relative h-[380px] w-full overflow-hidden rounded-[2rem] border-[3px] border-[#0a4f86]/40 bg-gradient-to-b from-[#cdeeff] via-[#8fd3f4] to-[#4aa6d8] shadow-inner">
        {/* Riak air dekoratif */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-6 top-10 h-10 w-20 rounded-full border-2 border-white/60" />
          <div className="absolute right-8 top-28 h-8 w-16 rounded-full border-2 border-white/50" />
          <div className="absolute bottom-16 left-1/3 h-9 w-24 rounded-full border-2 border-white/40" />
        </div>

        <AnimatePresence>
          {ikan.map((f) => (
            <motion.button
              key={f.id}
              type="button"
              onPointerDown={() => tangkap(f)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ left: `${f.x}%`, top: `${f.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 select-none text-[2.6rem] leading-none drop-shadow-md transition-transform active:scale-90"
              aria-label="Tangkap"
            >
              {EMOJI[f.jenis]}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <p className="text-center font-body text-xs font-semibold text-navy/60">
        Tap ikannya sebelum nyelam lagi! 🐟
      </p>
    </div>
  );
}

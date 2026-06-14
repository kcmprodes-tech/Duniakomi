"use client";

import { useEffect, useRef, useState } from "react";
import type { HasilAksi } from "@/lib/kolom-komi/types";
import { GameIntro, GameResult } from "./GamePanels";

// Mini-game "Sembunyi Komi": Komi ngintip dari salah satu kotak sebentar,
// lalu semua kotak tertutup — tap kotak tempat Komi tadi. Ronde makin susah.

type Fase = "intro" | "main" | "habis";
type Tahap = "lihat" | "tebak";

const NILAI_RONDE = 5; // Koin per ronde benar

export function SembunyiKomi({ onSelesai }: { onSelesai: (skor: number) => HasilAksi }) {
  const [fase, setFase] = useState<Fase>("intro");
  const [tahap, setTahap] = useState<Tahap>("lihat");
  const [ronde, setRonde] = useState(1);
  const [jumlah, setJumlah] = useState(4);
  const [target, setTarget] = useState(0);
  const [skor, setSkor] = useState(0);
  const [hasilPesan, setHasilPesan] = useState("");

  const skorRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const sudahReward = useRef(false);

  const setupRonde = (r: number) => {
    const jml = Math.min(9, 4 + Math.floor((r - 1) / 2));
    const peek = Math.max(550, 1200 - (r - 1) * 110);
    const t = Math.floor(Math.random() * jml);
    setJumlah(jml);
    setTarget(t);
    setTahap("lihat");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setTahap("tebak"), peek);
  };

  const mulai = () => {
    sudahReward.current = false;
    skorRef.current = 0;
    setSkor(0);
    setRonde(1);
    setupRonde(1);
    setFase("main");
  };

  const selesai = () => {
    if (sudahReward.current) return;
    sudahReward.current = true;
    clearTimeout(timeoutRef.current);
    const r = onSelesai(skorRef.current);
    setHasilPesan(r.pesan ?? "");
    setFase("habis");
  };

  const tebak = (idx: number) => {
    if (tahap !== "tebak") return;
    if (idx === target) {
      skorRef.current += NILAI_RONDE;
      setSkor(skorRef.current);
      const r2 = ronde + 1;
      setRonde(r2);
      setupRonde(r2);
    } else {
      selesai();
    }
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  if (fase === "intro")
    return (
      <GameIntro
        emoji="🙈"
        title="Sembunyi Komi"
        desc="Komi ngintip dari salah satu kotak sebentar. Inget posisinya, lalu tap kotaknya pas udah tertutup. Salah = selesai!"
        mulaiLabel="Mulai Cari 🙈"
        onMulai={mulai}
      />
    );

  if (fase === "habis")
    return (
      <GameResult
        emoji="🐱"
        skorLabel={`Bertahan ${ronde - 1} ronde`}
        skor={skor}
        satuan="poin"
        pesan={hasilPesan}
        onUlang={mulai}
      />
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between font-display font-extrabold text-navy">
        <span className="text-base">Ronde {ronde}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#e6951b] bg-gradient-to-b from-[#ffd34d] to-[#ffb01f] px-3 py-1 text-white shadow-md [text-shadow:0_1px_0_#d98512]">
          <span>🐟</span> {skor}
        </span>
      </div>

      <p className="text-center font-body text-sm font-semibold text-navy/70">
        {tahap === "lihat" ? "Lihat Komi ngintip di mana… 👀" : "Komi sembunyi! Tap kotak tempat dia tadi."}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 py-2">
        {Array.from({ length: jumlah }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => tebak(i)}
            disabled={tahap !== "tebak"}
            className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border-2 border-[#c2641a]/40 bg-gradient-to-b from-[#fff3e0] to-[#ffe0bd] text-4xl shadow-md transition active:scale-95 disabled:active:scale-100"
          >
            {tahap === "lihat" && i === target ? "🐱" : "📦"}
          </button>
        ))}
      </div>
    </div>
  );
}

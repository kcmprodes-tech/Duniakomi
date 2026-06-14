"use client";

import { useEffect, useRef, useState } from "react";
import type { HasilAksi } from "@/lib/kolom-komi/types";
import { Badge, GameButton } from "@/components/ui/kit";
import { GameIntro, GameResult } from "./GamePanels";

// Mini-game "Lempar Ikan": penanda menyapu kiri-kanan, tap "Lempar" pas penanda
// di zona hijau supaya Komi menangkap ikannya. Catch beruntun = combo (poin lebih).

type Fase = "intro" | "main" | "habis";

const MAKS = 10; // jumlah lemparan
const ZW = 20; // lebar zona hijau (%)
const PERIODE = 2.8; // detik untuk satu sapuan bolak-balik penuh

export function LemparIkan({ onSelesai }: { onSelesai: (skor: number) => HasilAksi }) {
  const [fase, setFase] = useState<Fase>("intro");
  const [skor, setSkor] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lempar, setLempar] = useState(0);
  const [pos, setPos] = useState(0);
  const [zonaStart, setZonaStart] = useState(40);
  const [feedback, setFeedback] = useState("");
  const [hasilPesan, setHasilPesan] = useState("");

  const posRef = useRef(0);
  const startRef = useRef(0);
  const skorRef = useRef(0);
  const comboRef = useRef(0);
  const lemparRef = useRef(0);
  const sudahReward = useRef(false);

  const acakZona = () => setZonaStart(8 + Math.floor(Math.random() * 64));

  const mulai = () => {
    sudahReward.current = false;
    skorRef.current = 0;
    comboRef.current = 0;
    lemparRef.current = 0;
    posRef.current = 0;
    setSkor(0);
    setCombo(0);
    setLempar(0);
    setPos(0);
    setFeedback("");
    acakZona();
    setFase("main");
  };

  // Penanda menyapu kiri-kanan (berbasis waktu — tetap jalan walau tab tidak fokus).
  useEffect(() => {
    if (fase !== "main") return;
    startRef.current = Date.now();
    const id = setInterval(() => {
      const t = ((Date.now() - startRef.current) / 1000) % PERIODE;
      const phase = t / PERIODE; // 0..1
      const tri = phase < 0.5 ? phase * 2 : 2 - phase * 2; // 0 → 1 → 0
      posRef.current = tri * 100;
      setPos(posRef.current);
    }, 16);
    return () => clearInterval(id);
  }, [fase]);

  const lemparIkan = () => {
    if (lemparRef.current >= MAKS) return;
    const p = posRef.current;
    const kena = p >= zonaStart && p <= zonaStart + ZW;
    if (kena) {
      comboRef.current += 1;
      skorRef.current += comboRef.current;
      setCombo(comboRef.current);
      setSkor(skorRef.current);
      setFeedback(`Nangkep! +${comboRef.current} 🐱`);
    } else {
      comboRef.current = 0;
      setCombo(0);
      setFeedback("Meleset 😿");
    }
    acakZona();

    lemparRef.current += 1;
    setLempar(lemparRef.current);
    if (lemparRef.current >= MAKS && !sudahReward.current) {
      sudahReward.current = true;
      const r = onSelesai(skorRef.current);
      setHasilPesan(r.pesan ?? "");
      setTimeout(() => setFase("habis"), 650);
    }
  };

  if (fase === "intro")
    return (
      <GameIntro
        emoji="🐟"
        title="Lempar Ikan"
        desc="Penanda gerak kiri-kanan. Tap Lempar pas penanda di zona hijau biar Komi nangkep ikannya. Nangkep beruntun = poin makin gede!"
        mulaiLabel="Mulai Lempar 🐟"
        onMulai={mulai}
      />
    );

  if (fase === "habis")
    return (
      <GameResult skorLabel="Total tangkapan" skor={skor} satuan="poin" pesan={hasilPesan} onUlang={mulai} />
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between font-display font-extrabold text-navy">
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#e6951b] bg-gradient-to-b from-[#ffd34d] to-[#ffb01f] px-3 py-1 text-white shadow-md [text-shadow:0_1px_0_#d98512]">
          <span>🐟</span> {skor}
        </span>
        <span className="text-base">Lemparan: {MAKS - lempar}</span>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-3xl border-[3px] border-[#0a4f86]/30 bg-gradient-to-b from-[#eaf6ff] to-[#cdeeff] p-5">
        <span className="text-6xl">🐱</span>
        <p className="h-5 font-body text-sm font-bold text-navy">{feedback || "Timing-nya pas ya!"}</p>
        {combo > 1 ? <Badge tone="hot">Combo x{combo}</Badge> : <span className="h-6" />}
        <div className="relative mt-2 h-10 w-full overflow-hidden rounded-full border-2 border-navy/15 bg-cream">
          <div
            className="absolute top-0 h-full bg-gradient-to-b from-[#8ed863] to-[#4ea62e]"
            style={{ left: `${zonaStart}%`, width: `${ZW}%` }}
          />
          <div
            className="absolute top-0 h-full w-[4px] -translate-x-1/2 rounded bg-navy"
            style={{ left: `${pos}%` }}
          />
        </div>
      </div>

      <GameButton onClick={lemparIkan} size="lg" className="w-full" disabled={lempar >= MAKS}>
        Lempar 🐟
      </GameButton>
    </div>
  );
}

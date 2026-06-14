"use client";

import { useState } from "react";
import type { HasilAksi } from "@/lib/kolom-komi/types";
import { BERITA } from "@/lib/kolom-komi/berita";
import { GameButton } from "@/components/ui/kit";
import { GameIntro, GameResult } from "./GamePanels";

// Mini-game kuis "Tebak Berita": dari ringkasan berita, tebak judul yang benar.
// Mendorong pembaca mengenali konten Kompas. Jawaban benar = Koin.

type Fase = "intro" | "main" | "habis";
interface Soal {
  emoji: string;
  kategori: string;
  ringkasan: string;
  opsi: string[];
  benarIdx: number;
  komiSays: string;
}

const KOIN_PER_BENAR = 4;

function acak<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buatSoal(): Soal[] {
  return acak(BERITA).map((a) => {
    const distractor = acak(BERITA.filter((b) => b.id !== a.id))
      .slice(0, 3)
      .map((b) => b.judul);
    const opsi = acak([a.judul, ...distractor]);
    return {
      emoji: a.emoji,
      kategori: a.kategori,
      ringkasan: a.ringkasan,
      opsi,
      benarIdx: opsi.indexOf(a.judul),
      komiSays: a.komiSays,
    };
  });
}

export function TebakBerita({ onSelesai }: { onSelesai: (skor: number) => HasilAksi }) {
  const [fase, setFase] = useState<Fase>("intro");
  const [soal, setSoal] = useState<Soal[]>([]);
  const [idx, setIdx] = useState(0);
  const [pilih, setPilih] = useState<number | null>(null);
  const [benar, setBenar] = useState(0);
  const [hasilPesan, setHasilPesan] = useState("");

  const mulai = () => {
    setSoal(buatSoal());
    setIdx(0);
    setPilih(null);
    setBenar(0);
    setFase("main");
  };

  const jawab = (i: number) => {
    if (pilih !== null) return;
    setPilih(i);
    if (i === soal[idx].benarIdx) setBenar((b) => b + 1);
  };

  const lanjut = () => {
    if (idx + 1 < soal.length) {
      setIdx(idx + 1);
      setPilih(null);
    } else {
      const r = onSelesai(benar * KOIN_PER_BENAR);
      setHasilPesan(r.pesan ?? "");
      setFase("habis");
    }
  };

  if (fase === "intro")
    return (
      <GameIntro
        emoji="🧠"
        title="Tebak Berita"
        desc={`Komi kasih ${BERITA.length} ringkasan berita. Tebak judul yang benar buat dapat Koin!`}
        mulaiLabel="Mulai Kuis 🧠"
        onMulai={mulai}
      />
    );

  if (fase === "habis")
    return (
      <GameResult
        emoji="🧠"
        judul="Selesai!"
        skorLabel={`${benar} dari ${soal.length} jawaban benar`}
        skor={benar * KOIN_PER_BENAR}
        satuan="Koin"
        pesan={hasilPesan}
        onUlang={mulai}
      />
    );

  const s = soal[idx];
  const terjawab = pilih !== null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between font-display font-extrabold text-navy">
        <span className="text-base">
          Soal {idx + 1}/{soal.length}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#3a7e20] bg-gradient-to-b from-[#8ed863] to-[#4ea62e] px-3 py-1 text-white shadow-md [text-shadow:0_1px_0_#2f6618]">
          ✓ {benar}
        </span>
      </div>

      <div className="rounded-3xl border-[3px] border-[#0a4f86]/20 bg-white/80 p-4 text-center">
        <span className="text-3xl">{s.emoji}</span>
        <p className="mt-1 font-body text-[11px] font-bold uppercase tracking-wide text-orange">
          {s.kategori}
        </p>
        <p className="mt-1 font-body text-sm text-navy">{s.ringkasan}</p>
        <p className="mt-2 font-display text-sm font-extrabold text-navy/70">Ini berita yang mana?</p>
      </div>

      <div className="flex flex-col gap-2">
        {s.opsi.map((o, i) => {
          const benarOpsi = i === s.benarIdx;
          const dipilih = pilih === i;
          let cls = "border-navy/10 bg-white/90 text-navy";
          if (terjawab && benarOpsi) cls = "border-emerald-400 bg-emerald-50 text-emerald-700";
          else if (terjawab && dipilih) cls = "border-red-400 bg-red-50 text-red-600";
          return (
            <button
              key={i}
              onClick={() => jawab(i)}
              disabled={terjawab}
              className={`rounded-2xl border-2 px-4 py-2.5 text-left font-body text-sm font-bold shadow-sm transition active:scale-95 disabled:active:scale-100 ${cls}`}
            >
              {o}
            </button>
          );
        })}
      </div>

      {terjawab ? (
        <div className="flex flex-col gap-2">
          <p className="rounded-2xl bg-cream px-4 py-2 text-center font-body text-xs italic text-gray-text">
            “{s.komiSays}”
          </p>
          <GameButton className="w-full" onClick={lanjut}>
            {idx + 1 < soal.length ? "Lanjut" : "Lihat hasil"}
          </GameButton>
        </div>
      ) : null}
    </div>
  );
}

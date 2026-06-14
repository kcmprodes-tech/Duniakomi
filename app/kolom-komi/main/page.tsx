"use client";

import { useState } from "react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { ActionScreen } from "@/components/KolomKomi/ActionScreen";
import { TangkapIkan } from "@/components/KolomKomi/TangkapIkan";
import { LemparIkan } from "@/components/KolomKomi/LemparIkan";
import { SembunyiKomi } from "@/components/KolomKomi/SembunyiKomi";
import { BersihBersih } from "@/components/KolomKomi/BersihBersih";
import { TebakBerita } from "@/components/KolomKomi/TebakBerita";
import { Loader } from "@/components/KolomKomi/Loader";

const GAMES = [
  { id: "tangkap", emoji: "🎣", nama: "Tangkap Ikan", desc: "Tap ikan sebanyak mungkin!", Comp: TangkapIkan },
  { id: "lempar", emoji: "🐟", nama: "Lempar Ikan", desc: "Timing-nya pas, Komi nangkep!", Comp: LemparIkan },
  { id: "sembunyi", emoji: "🙈", nama: "Sembunyi Komi", desc: "Inget Komi ngintip di mana.", Comp: SembunyiKomi },
  { id: "bersih", emoji: "🧹", nama: "Bersih-bersih", desc: "Rapikan rumah Komi cepat!", Comp: BersihBersih },
  { id: "kuis", emoji: "🧠", nama: "Tebak Berita", desc: "Kuis dari berita hari ini.", Comp: TebakBerita },
] as const;

export default function MainPage() {
  const { state, selesaiMain } = useKolomKomi();
  const [pilih, setPilih] = useState<string | null>(null);

  if (!state) return <Loader />;

  const game = GAMES.find((g) => g.id === pilih);

  if (game) {
    const Comp = game.Comp;
    return (
      <ActionScreen title={game.nama} koin={state.koin}>
        <button
          onClick={() => setPilih(null)}
          className="-mt-1 self-start font-body text-sm font-bold text-navy/60 transition active:scale-95"
        >
          ‹ Semua game
        </button>
        <Comp onSelesai={selesaiMain} />
      </ActionScreen>
    );
  }

  return (
    <ActionScreen title="Main Bareng" koin={state.koin}>
      <p className="font-body text-sm font-semibold text-navy/70">
        Pilih permainan buat main bareng Komi! 🎮
      </p>
      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((g) => (
          <button
            key={g.id}
            onClick={() => setPilih(g.id)}
            className="flex flex-col items-center gap-1.5 rounded-3xl border-2 border-navy/10 bg-white/90 p-4 text-center shadow-md transition hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-lg active:translate-y-0 active:scale-95"
          >
            <span className="text-4xl">{g.emoji}</span>
            <p className="font-display text-sm font-extrabold text-navy">{g.nama}</p>
            <p className="font-body text-[11px] leading-snug text-gray-text">{g.desc}</p>
          </button>
        ))}
      </div>
    </ActionScreen>
  );
}

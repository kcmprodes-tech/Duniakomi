"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { ActionScreen } from "@/components/KolomKomi/ActionScreen";
import { TangkapIkan } from "@/components/KolomKomi/TangkapIkan";
import { LemparIkan } from "@/components/KolomKomi/LemparIkan";
import { SembunyiKomi } from "@/components/KolomKomi/SembunyiKomi";
import { BersihBersih } from "@/components/KolomKomi/BersihBersih";
import { TebakBerita } from "@/components/KolomKomi/TebakBerita";
import { Loader } from "@/components/KolomKomi/Loader";
import { SceneOverlay } from "@/components/KolomKomi/SceneOverlay";
import { playSfx } from "@/lib/kolom-komi/sound";

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
  const [bgLoaded, setBgLoaded] = useState(false);

  if (!state) return <Loader />;

  const game = GAMES.find((g) => g.id === pilih);

  // Layar main game terpilih.
  if (game) {
    const Comp = game.Comp;
    return (
      <ActionScreen title={game.nama} koin={state.koin} onBack={() => setPilih(null)}>
        <Comp onSelesai={selesaiMain} />
      </ActionScreen>
    );
  }

  // Selector: scene Komi main + panel carousel game (scroll horizontal).
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={KOMI_IMG.gamePlayAnim}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
        onLoad={() => setBgLoaded(true)}
        onError={() => setBgLoaded(true)}
      />
      <SceneOverlay show={!bgLoaded} />

      <Link
        href="/kolom-komi"
        aria-label="Kembali"
        className="absolute left-2.5 top-2.5 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-navy/70 text-white shadow-md backdrop-blur-sm transition active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <div className="absolute inset-x-0 bottom-0 z-20 rounded-t-[2rem] bg-[#3a2417] pb-5 pt-4 shadow-[0_-8px_30px_rgba(0,0,0,0.4)]">
        <p className="px-6 text-center font-display text-base font-extrabold text-white">
          Pilih permainan buat main bareng Komi! 🎮
        </p>
        <div className="mt-3 flex gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GAMES.map((g) => (
            <button
              key={g.id}
              onClick={() => { playSfx("select"); setPilih(g.id); }}
              className="flex w-[150px] shrink-0 flex-col items-center gap-1 rounded-3xl border border-white/70 bg-gradient-to-b from-[#eaf4ff] to-white p-3 text-center shadow-md transition active:scale-95"
            >
              <span className="text-[40px] leading-none drop-shadow-sm">{g.emoji}</span>
              <p className="mt-1 font-display text-sm font-extrabold text-navy">{g.nama}</p>
              <p className="font-body text-[11px] leading-snug text-gray-text">{g.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

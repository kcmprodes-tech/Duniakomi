"use client";

import { useRouter } from "next/navigation";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { ActionScreen } from "@/components/KolomKomi/ActionScreen";
import { Loader } from "@/components/KolomKomi/Loader";
import { GameButton, Panel } from "@/components/ui/kit";

// Cara mendapatkan Koin Ikan (selaras dengan logika di lib/kolom-komi/state.tsx).
const CARA = [
  { emoji: "📰", judul: "Baca berita bareng", detail: "+5 Koin tiap artikel baru (sekali per hari)" },
  { emoji: "📅", judul: "Check-in harian", detail: "+5 sampai +50 Koin — makin panjang streak, makin besar" },
  { emoji: "🎮", judul: "Main mini-game", detail: "Koin sesuai skor di Main Bareng" },
];

export default function PoinPage() {
  const { state } = useKolomKomi();
  const router = useRouter();

  if (!state) return <Loader />;

  return (
    <ActionScreen title="Koin Ikan" koin={state.koin}>
      {/* Total koin */}
      <Panel className="flex flex-col items-center gap-1 text-center">
        <span className="text-5xl">🐟</span>
        <p className="font-display text-5xl font-extrabold text-orange [text-shadow:0_2px_0_rgba(0,0,0,0.1)]">
          {state.koin}
        </p>
        <p className="font-body text-sm font-semibold text-gray-text">Koin Ikan kamu</p>
        <p className="font-body text-xs text-navy/50">Streak {state.streak} hari beruntun 🔥</p>
      </Panel>

      <div className="pt-3" />

      {/* Cara dapat koin */}
      <Panel title="Cara Dapat Koin">
        <div className="flex flex-col gap-3">
          {CARA.map((c) => (
            <div key={c.judul} className="flex items-start gap-3">
              <span className="text-2xl">{c.emoji}</span>
              <div>
                <p className="font-display text-sm font-extrabold text-navy">{c.judul}</p>
                <p className="font-body text-[11px] leading-snug text-gray-text">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="pt-3" />

      {/* Dipakai buat apa */}
      <Panel title="Dipakai Buat">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-body text-sm text-gray-text">
            <span className="text-xl">👒</span> Beli kostum buat dandanin Komi!
          </p>
          <GameButton className="w-full" onClick={() => router.push("/kolom-komi/dandanin")}>
            Ke Dandanin Komi
          </GameButton>
        </div>
      </Panel>
    </ActionScreen>
  );
}

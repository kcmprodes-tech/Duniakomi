"use client";

import { useKolomKomi } from "@/lib/kolom-komi/state";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";

// Mockup mini-game interaktif "Main Bareng" — belum fungsional.
const GAMES = [
  { emoji: "🎣", nama: "Mancing Bareng", desc: "Mancing ikan santai bareng Komi." },
  { emoji: "🐟", nama: "Lempar Ikan", desc: "Lempar ikan, Komi tangkap!" },
  { emoji: "🙈", nama: "Sembunyi Komi", desc: "Komi sembunyi, kamu cari." },
  { emoji: "🧹", nama: "Bersih-bersih", desc: "Rapikan rumah Komi." },
];

export default function MainPage() {
  const { state } = useKolomKomi();
  if (!state) return <Loader />;
  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      <ScreenHeader title="Main Bareng" />

      <div className="flex flex-col items-center gap-2 pt-1">
        <SpeechBubble>Main bareng Komi yuk! Pilih permainannya. 🎮</SpeechBubble>
        <KomiCharacter mood="happy" size={140} accessory={equipped?.emoji} />
      </div>

      <p className="font-body text-xs font-semibold text-navy/60">
        Mini-game interaktif — segera hadir ✨
      </p>

      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((g) => (
          <Card key={g.nama} className="relative flex flex-col items-center gap-1 text-center">
            <span className="absolute right-2 top-2 rounded-full bg-orange/15 px-2 py-0.5 font-body text-[9px] font-bold uppercase text-orange">
              Segera
            </span>
            <span className="text-3xl">{g.emoji}</span>
            <p className="font-display text-sm font-extrabold text-navy">{g.nama}</p>
            <p className="font-body text-[11px] leading-snug text-gray-text">{g.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

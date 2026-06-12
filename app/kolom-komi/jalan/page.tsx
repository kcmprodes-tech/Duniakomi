"use client";

import { useKolomKomi } from "@/lib/kolom-komi/state";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";

// Mockup mekanik "Komi Berkunjung" (travel) — belum fungsional.
const DESTINASI = [
  { emoji: "🏖️", nama: "Pantai", daerah: "Bali" },
  { emoji: "⛰️", nama: "Gunung", daerah: "Bromo" },
  { emoji: "🏙️", nama: "Kota", daerah: "Jakarta" },
  { emoji: "🏛️", nama: "Candi", daerah: "Yogyakarta" },
  { emoji: "🌊", nama: "Danau", daerah: "Toba" },
  { emoji: "🐠", nama: "Laut", daerah: "Raja Ampat" },
];

export default function JalanPage() {
  const { state } = useKolomKomi();
  if (!state) return <Loader />;
  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      <ScreenHeader title="Ajak Jalan" />

      <div className="flex flex-col items-center gap-2 pt-1">
        <SpeechBubble>
          Komi mau jalan-jalan keliling Indonesia! Mau ke mana dulu? 🗺️
        </SpeechBubble>
        <KomiCharacter mood="happy" size={140} accessory={equipped?.emoji} />
      </div>

      <p className="font-body text-xs font-semibold text-navy/60">
        Komi Berkunjung — segera hadir ✨
      </p>

      <div className="grid grid-cols-2 gap-3">
        {DESTINASI.map((d) => (
          <Card key={d.nama} className="relative flex flex-col items-center gap-1 text-center">
            <span className="absolute right-2 top-2 rounded-full bg-navy/5 px-2 py-0.5 font-body text-[9px] font-bold uppercase text-navy/50">
              Segera
            </span>
            <span className="text-3xl">{d.emoji}</span>
            <p className="font-display text-sm font-extrabold text-navy">{d.nama}</p>
            <p className="font-body text-[11px] text-gray-text">{d.daerah}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { FOODS } from "@/lib/kolom-komi/foods";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { StatusBars } from "@/components/KolomKomi/StatusBars";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";

export default function MakanPage() {
  const { state, beriMakan } = useKolomKomi();
  const [pesan, setPesan] = useState("Pilih makanan buat Komi, Pak/Bu! 🐟");

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;
  const pilih = (id: string) => setPesan(beriMakan(id).pesan ?? "");

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      <ScreenHeader title="Kasih Makan" />

      <div className="flex flex-col items-center gap-3 pt-1">
        <SpeechBubble>{pesan}</SpeechBubble>
        <KomiCharacter mood="happy" size={170} accessory={equipped?.emoji} />
      </div>

      <Card>
        <StatusBars
          kenyang={state.kenyang}
          mood={state.mood}
          energy={state.energy}
          update={state.update}
        />
      </Card>

      <div className="grid grid-cols-2 gap-3">
        {FOODS.map((f) => (
          <button
            key={f.id}
            onClick={() => pilih(f.id)}
            className="relative flex items-center gap-3 rounded-2xl border-2 border-navy/10 bg-white/90 p-3 text-left shadow-md transition hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-lg active:translate-y-0 active:scale-95"
          >
            {f.badge ? (
              <span className="absolute right-2 top-2 rounded-full bg-orange/15 px-2 py-0.5 font-body text-[9px] font-bold uppercase text-orange">
                {f.badge}
              </span>
            ) : null}
            <span className="text-3xl">{f.emoji}</span>
            <div>
              <p className="font-display text-sm font-extrabold text-navy">{f.nama}</p>
              <p className="font-body text-[11px] text-gray-text">
                +{f.efek.kenyang} kenyang{f.efek.mood ? `, +${f.efek.mood} mood` : ""}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

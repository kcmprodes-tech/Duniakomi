"use client";

import { useState } from "react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { FOODS } from "@/lib/kolom-komi/foods";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { ActionScreen } from "@/components/KolomKomi/ActionScreen";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { StatusBars } from "@/components/KolomKomi/StatusBars";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { Loader } from "@/components/KolomKomi/Loader";
import { Badge, Panel } from "@/components/ui/kit";

export default function MakanPage() {
  const { state, beriMakan } = useKolomKomi();
  const [pesan, setPesan] = useState("Pilih makanan buat Komi, Pak/Bu! 🐟");

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;
  const pilih = (id: string) => setPesan(beriMakan(id).pesan ?? "");

  return (
    <ActionScreen title="Kasih Makan" koin={state.koin}>
      <div className="flex flex-col items-center gap-3">
        <SpeechBubble>{pesan}</SpeechBubble>
        <KomiCharacter mood="happy" size={170} accessory={equipped?.emoji} />
      </div>

      <Panel>
        <StatusBars
          kenyang={state.kenyang}
          mood={state.mood}
          energy={state.energy}
          update={state.update}
        />
      </Panel>

      <div className="grid grid-cols-2 gap-3">
        {FOODS.map((f) => (
          <button
            key={f.id}
            onClick={() => pilih(f.id)}
            className="relative flex items-center gap-3 rounded-2xl border-2 border-navy/10 bg-white/90 p-3 text-left shadow-md transition hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-lg active:translate-y-0 active:scale-95"
          >
            {f.badge ? (
              <Badge tone="sale" className="absolute right-2 top-2 px-2 py-0 text-[9px]">
                {f.badge}
              </Badge>
            ) : null}
            <span className="text-3xl">{f.emoji}</span>
            <div className={f.badge ? "min-w-0 pr-12" : "min-w-0"}>
              <p className="font-display text-sm font-extrabold leading-tight text-navy">{f.nama}</p>
              <p className="font-body text-[11px] text-gray-text">
                +{f.efek.kenyang} kenyang{f.efek.mood ? `, +${f.efek.mood} mood` : ""}
              </p>
            </div>
          </button>
        ))}
      </div>
    </ActionScreen>
  );
}

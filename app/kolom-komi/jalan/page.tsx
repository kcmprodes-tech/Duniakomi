"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { KANAL, type Kanal } from "@/lib/kolom-komi/kanal";
import { ActionScreen } from "@/components/KolomKomi/ActionScreen";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { InAppBrowser } from "@/components/KolomKomi/InAppBrowser";
import { Loader } from "@/components/KolomKomi/Loader";
import { Badge } from "@/components/ui/kit";

export default function JalanPage() {
  const { state } = useKolomKomi();
  const [aktif, setAktif] = useState<Kanal | null>(null);

  if (!state) return <Loader />;
  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;

  return (
    <ActionScreen title="Ajak Jalan" koin={state.koin}>
      <div className="flex flex-col items-center gap-2">
        <SpeechBubble>
          Komi mau jalan-jalan! Mau nemenin ke mana? Tiap tempat ada cerita dari Kompas. 🗺️
        </SpeechBubble>
        <KomiCharacter mood="happy" size={140} accessory={equipped?.emoji} />
      </div>

      <p className="font-body text-xs font-semibold text-navy/60">
        Tiap tempat → buka kanal Kompas.com
      </p>

      <div className="grid grid-cols-2 gap-3">
        {KANAL.map((k) => (
          <button
            key={k.id}
            onClick={() => setAktif(k)}
            className={`relative flex flex-col items-center gap-1.5 rounded-3xl border-2 border-navy/10 bg-gradient-to-br ${k.warna} p-4 text-center shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95`}
          >
            <span className="text-4xl">{k.tempatEmoji}</span>
            <p className="font-display text-sm font-extrabold text-navy">{k.tempat}</p>
            <Badge tone="best" className="px-2 py-0 text-[9px]">
              {k.kanal}
            </Badge>
          </button>
        ))}
      </div>

      {/* Buka kanal Kompas di in-app browser */}
      <AnimatePresence>
        {aktif ? (
          <InAppBrowser key={aktif.id} halaman={aktif} onClose={() => setAktif(null)} />
        ) : null}
      </AnimatePresence>
    </ActionScreen>
  );
}

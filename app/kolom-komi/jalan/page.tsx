"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { KANAL, type Kanal } from "@/lib/kolom-komi/kanal";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { InAppBrowser } from "@/components/KolomKomi/InAppBrowser";
import { Loader } from "@/components/KolomKomi/Loader";

export default function JalanPage() {
  const { state } = useKolomKomi();
  const [aktif, setAktif] = useState<Kanal | null>(null);

  if (!state) return <Loader />;
  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      <ScreenHeader title="Ajak Jalan" />

      <div className="flex flex-col items-center gap-2 pt-1">
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
            <span className="rounded-full bg-white/80 px-2 py-0.5 font-body text-[10px] font-bold text-kompas">
              Kanal {k.kanal}
            </span>
          </button>
        ))}
      </div>

      {/* Buka kanal Kompas di in-app browser */}
      <AnimatePresence>
        {aktif ? (
          <InAppBrowser key={aktif.id} halaman={aktif} onClose={() => setAktif(null)} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

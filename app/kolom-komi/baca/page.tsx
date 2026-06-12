"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { BERITA, type Berita } from "@/lib/kolom-komi/berita";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { StatusBars } from "@/components/KolomKomi/StatusBars";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { KoinBadge } from "@/components/KolomKomi/KoinBadge";
import { InAppBrowser } from "@/components/KolomKomi/InAppBrowser";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function BacaPage() {
  const { state, bacaBerita } = useKolomKomi();
  const [pesan, setPesan] = useState("Yuk baca berita bareng, biar makin update! 📰");
  const [aktif, setAktif] = useState<Berita | null>(null);

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;
  const today = todayStr();

  // Buka in-app browser + beri reward (sekali per hari).
  const buka = (b: Berita) => {
    setAktif(b);
    const r = bacaBerita(b.id);
    setPesan(r.sukses ? b.komiSays : r.pesan ?? "");
  };

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      <ScreenHeader title="Baca Bareng" />

      <div className="flex flex-col items-center gap-2">
        <SpeechBubble>{pesan}</SpeechBubble>
        <KomiCharacter mood="bob" size={150} accessory={equipped?.emoji} />
      </div>

      <div className="flex items-center justify-between">
        <span className="font-body text-xs font-semibold text-navy/70">
          Baca → +Update & dapat 🐟
        </span>
        <KoinBadge koin={state.koin} />
      </div>

      <div className="flex flex-col gap-3">
        {BERITA.map((b) => {
          const sudah = state.lastReadDates[b.id] === today;
          return (
            <Card key={b.id} className="flex items-start gap-3">
              <span className="text-2xl">{b.emoji}</span>
              <div className="flex-1">
                <span className="font-body text-[11px] font-bold uppercase tracking-wide text-orange">
                  {b.kategori}
                </span>
                <h3 className="font-display text-base font-extrabold leading-tight text-navy">
                  {b.judul}
                </h3>
                <p className="mt-0.5 font-body text-xs text-gray-text">{b.ringkasan}</p>
                <Button
                  onClick={() => buka(b)}
                  variant={sudah ? "outline" : "primary"}
                  className="mt-2 px-4 py-1.5 text-xs"
                >
                  {sudah ? "Baca lagi" : "Baca (+22 Update)"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <StatusBars
          kenyang={state.kenyang}
          mood={state.mood}
          energy={state.energy}
          update={state.update}
        />
      </Card>

      {/* In-app browser membuka "halaman Kompas.com" */}
      <AnimatePresence>
        {aktif ? <InAppBrowser berita={aktif} onClose={() => setAktif(null)} /> : null}
      </AnimatePresence>
    </div>
  );
}

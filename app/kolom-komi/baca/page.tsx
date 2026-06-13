"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { BERITA, type Berita } from "@/lib/kolom-komi/berita";
import { cariOutfit } from "@/lib/kolom-komi/items";
import type { ToastInfo } from "@/lib/kolom-komi/types";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { StatusBars } from "@/components/KolomKomi/StatusBars";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { KoinBadge } from "@/components/KolomKomi/KoinBadge";
import { InAppBrowser } from "@/components/KolomKomi/InAppBrowser";
import { Toast } from "@/components/KolomKomi/Toast";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";
import { GameButton } from "@/components/ui/kit";

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function BacaPage() {
  const { state, selesaiBaca } = useKolomKomi();
  const [pesan, setPesan] = useState("Yuk baca berita bareng, biar makin update! 📰");
  const [aktif, setAktif] = useState<Berita | null>(null);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  // Toast hilang otomatis setelah beberapa detik.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(t);
  }, [toast]);

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;
  const today = todayStr();

  // Selesai baca (scroll sampai habis) → reward + toast.
  const selesai = (b: Berita) => {
    const info = selesaiBaca(b.id);
    if (info.pesan) setToast(info);
    setPesan(b.komiSays);
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
          Baca sampai habis → check-in & dapat 🐟
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
                <GameButton
                  onClick={() => setAktif(b)}
                  variant={sudah ? "secondary" : "primary"}
                  size="sm"
                  className="mt-2"
                >
                  {sudah ? "Baca lagi" : "Baca artikel"}
                </GameButton>
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

      {/* In-app browser + toast */}
      <AnimatePresence>
        {aktif ? (
          <InAppBrowser
            key={aktif.id}
            halaman={aktif}
            onClose={() => setAktif(null)}
            onSelesai={() => selesai(aktif)}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>{toast ? <Toast info={toast} /> : null}</AnimatePresence>
    </div>
  );
}

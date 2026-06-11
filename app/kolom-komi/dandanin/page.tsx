"use client";

import { useState } from "react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { OUTFITS, cariOutfit } from "@/lib/kolom-komi/items";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { KoinBadge } from "@/components/KolomKomi/KoinBadge";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DandaninPage() {
  const { state, beliItem, pakaiItem } = useKolomKomi();
  const [pesan, setPesan] = useState("Yuk dandanin Komi pakai Koin Ikan! 👒");

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;

  const beli = (id: (typeof OUTFITS)[number]["id"]) => {
    const r = beliItem(id);
    setPesan(r.pesan ?? "");
  };

  const pakai = (id: (typeof OUTFITS)[number]["id"]) => {
    pakaiItem(state.equippedItem === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      <ScreenHeader title="Dandanin Komi" />

      <div className="flex flex-col items-center gap-2">
        <SpeechBubble>{pesan}</SpeechBubble>
        <KomiCharacter mood="bob" size={180} accessory={equipped?.emoji} />
        <KoinBadge koin={state.koin} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {OUTFITS.map((o) => {
          const owned = state.ownedItems.includes(o.id);
          const dipakai = state.equippedItem === o.id;
          return (
            <Card key={o.id} className="relative flex flex-col items-center gap-1.5 text-center">
              {o.badge ? (
                <span className="absolute right-2 top-2 rounded-full bg-orange/15 px-2 py-0.5 font-body text-[9px] font-bold uppercase text-orange">
                  {o.badge}
                </span>
              ) : null}
              <span className="text-4xl">{o.emoji}</span>
              <h3 className="font-display text-sm font-extrabold text-navy">{o.nama}</h3>
              <p className="font-body text-[11px] leading-snug text-gray-text">{o.deskripsi}</p>

              {o.comingSoon ? (
                <Button variant="outline" disabled className="mt-1 w-full text-xs">
                  Coming Soon
                </Button>
              ) : owned ? (
                <Button
                  variant={dipakai ? "secondary" : "outline"}
                  className="mt-1 w-full text-xs"
                  onClick={() => pakai(o.id)}
                >
                  {dipakai ? "✓ Dipakai" : "Pakai"}
                </Button>
              ) : (
                <Button className="mt-1 w-full text-xs" onClick={() => beli(o.id)}>
                  Beli · {o.harga} 🐟
                </Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

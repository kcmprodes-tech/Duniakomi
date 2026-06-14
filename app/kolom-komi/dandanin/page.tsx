"use client";

import { useState } from "react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { OUTFITS, cariOutfit } from "@/lib/kolom-komi/items";
import { ActionScreen } from "@/components/KolomKomi/ActionScreen";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";
import { Badge, GameButton } from "@/components/ui/kit";
import { KoinIcon } from "@/components/KolomKomi/KoinIcon";

export default function DandaninPage() {
  const { state, beliItem, pakaiItem } = useKolomKomi();
  const [pesan, setPesan] = useState("Yuk dandanin Komi pakai Koin! 👒");

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
    <ActionScreen title="Dandanin Komi" koin={state.koin}>
      <div className="flex flex-col items-center gap-2">
        <SpeechBubble>{pesan}</SpeechBubble>
        <KomiCharacter mood="bob" size={180} accessory={equipped?.emoji} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {OUTFITS.map((o) => {
          const owned = state.ownedItems.includes(o.id);
          const dipakai = state.equippedItem === o.id;
          return (
            <Card key={o.id} className="relative flex flex-col items-center gap-1.5 text-center">
              {o.badge ? (
                <Badge tone="sale" className="absolute right-2 top-2 px-2 py-0 text-[9px]">
                  {o.badge}
                </Badge>
              ) : null}
              <span className="text-4xl">{o.emoji}</span>
              <h3 className="font-display text-sm font-extrabold text-navy">{o.nama}</h3>
              <p className="font-body text-[11px] leading-snug text-gray-text">{o.deskripsi}</p>

              {o.comingSoon ? (
                <GameButton variant="secondary" disabled size="sm" className="mt-1 w-full">
                  Coming Soon
                </GameButton>
              ) : owned ? (
                <GameButton
                  variant={dipakai ? "secondary" : "success"}
                  size="sm"
                  className="mt-1 w-full"
                  onClick={() => pakai(o.id)}
                >
                  {dipakai ? "✓ Dipakai" : "Pakai"}
                </GameButton>
              ) : (
                <GameButton
                  variant="primary"
                  size="sm"
                  className="mt-1 w-full"
                  onClick={() => beli(o.id)}
                >
                  Beli · {o.harga} <KoinIcon size={14} />
                </GameButton>
              )}
            </Card>
          );
        })}
      </div>
    </ActionScreen>
  );
}

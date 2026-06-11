"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Flame, Shirt } from "lucide-react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { SAPAAN, acak } from "@/lib/kolom-komi/dialog";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { StatusBars } from "@/components/KolomKomi/StatusBars";
import { KoinBadge } from "@/components/KolomKomi/KoinBadge";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { ActionTile } from "@/components/KolomKomi/ActionTile";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";

export default function HubPage() {
  const { state } = useKolomKomi();
  const sapaan = useMemo(() => acak(SAPAAN), []);

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      {/* Koin + streak */}
      <div className="flex items-center justify-between">
        <KoinBadge koin={state.koin} />
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-orange/20 bg-white/90 px-3 py-1.5 font-body text-sm font-extrabold text-navy shadow">
          <Flame className="h-4 w-4 text-orange" /> {state.streak} hari
        </span>
      </div>

      {/* Komi + sapaan */}
      <div className="flex flex-col items-center gap-2 pt-1">
        <SpeechBubble>{sapaan}</SpeechBubble>
        <KomiCharacter accessory={equipped?.emoji} mood="bob" size={230} />
      </div>

      {/* Bar status */}
      <Card>
        <StatusBars kenyang={state.kenyang} mood={state.mood} update={state.update} />
      </Card>

      {/* Tombol aksi */}
      <div className="grid grid-cols-4 gap-2.5">
        <ActionTile href="/kolom-komi/makan" emoji="🐟" label="Kasih Makan" />
        <ActionTile href="/kolom-komi/elus" emoji="✋" label="Elus" />
        <ActionTile href="/kolom-komi/ngobrol" emoji="💬" label="Ngobrol" />
        <ActionTile href="/kolom-komi/baca" emoji="📰" label="Baca Bareng" />
      </div>

      {/* Dandanin */}
      <Link
        href="/kolom-komi/dandanin"
        className="flex items-center justify-center gap-2 rounded-full bg-navy py-3 font-body text-sm font-bold text-white shadow-md transition active:scale-95 hover:brightness-110"
      >
        <Shirt className="h-4 w-4" /> Dandanin Komi
      </Link>
    </div>
  );
}

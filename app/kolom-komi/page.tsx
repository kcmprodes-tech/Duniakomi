"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, Shirt } from "lucide-react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { SAPAAN, acak } from "@/lib/kolom-komi/dialog";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { GestureLayer } from "@/components/KolomKomi/GestureLayer";
import { StatusBars } from "@/components/KolomKomi/StatusBars";
import { KoinBadge } from "@/components/KolomKomi/KoinBadge";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { ActionTile } from "@/components/KolomKomi/ActionTile";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";

export default function HubPage() {
  const { state } = useKolomKomi();
  const [pesan, setPesan] = useState(() => acak(SAPAAN));

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;

  // 5 aksi utama; Tidurin memberi peringatan saat Energy rendah.
  const actions = [
    { href: "/kolom-komi/makan", emoji: "🐟", label: "Kasih Makan", alert: false },
    { href: "/kolom-komi/baca", emoji: "📰", label: "Baca Bareng", alert: false },
    { href: "/kolom-komi/jalan", emoji: "🗺️", label: "Ajak Jalan", alert: false },
    { href: "/kolom-komi/main", emoji: "🎮", label: "Main Bareng", alert: false },
    { href: "/kolom-komi/tidur", emoji: "🛏️", label: "Tidurin", alert: state.energy < 30 },
  ];

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      {/* Koin + streak */}
      <div className="flex items-center justify-between">
        <KoinBadge koin={state.koin} />
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-orange/20 bg-white/90 px-3 py-1.5 font-body text-sm font-extrabold text-navy shadow">
          <Flame className="h-4 w-4 text-orange" /> {state.streak} hari
        </span>
      </div>

      {/* Komi + sapaan; badan Komi bisa disentuh (gesture) */}
      <div className="flex flex-col items-center gap-2 pt-1">
        <SpeechBubble>{pesan}</SpeechBubble>
        <GestureLayer accessory={equipped?.emoji} size={230} onReaksi={setPesan} />
        <p className="font-body text-[11px] font-medium text-navy/50">
          ✋ Coba sentuh badan Komi
        </p>
      </div>

      {/* Bar status */}
      <Card>
        <StatusBars
          kenyang={state.kenyang}
          mood={state.mood}
          energy={state.energy}
          update={state.update}
        />
      </Card>

      {/* 5 tombol aksi */}
      <div className="grid grid-cols-5 gap-2">
        {actions.map((a) => (
          <ActionTile
            key={a.href}
            href={a.href}
            emoji={a.emoji}
            label={a.label}
            alert={a.alert}
          />
        ))}
      </div>

      {/* Dandanin (sekunder) */}
      <Link
        href="/kolom-komi/dandanin"
        className="flex items-center justify-center gap-2 rounded-full bg-navy py-3 font-body text-sm font-bold text-white shadow-md transition hover:brightness-110 active:scale-95"
      >
        <Shirt className="h-4 w-4" /> Dandanin Komi
      </Link>
    </div>
  );
}

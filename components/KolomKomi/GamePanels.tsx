"use client";

import type { ReactNode } from "react";
import { Badge, GameButton, Panel } from "@/components/ui/kit";

// Panel intro & hasil yang dipakai semua mini-game (biar konsisten).

export function GameIntro({
  emoji,
  title,
  desc,
  info,
  mulaiLabel = "Mulai",
  onMulai,
}: {
  emoji: string;
  title: string;
  desc: string;
  info?: ReactNode;
  mulaiLabel?: string;
  onMulai: () => void;
}) {
  return (
    <Panel className="flex flex-col items-center gap-3 text-center">
      <span className="text-5xl">{emoji}</span>
      <h2 className="font-display text-xl font-extrabold text-navy">{title}</h2>
      <p className="font-body text-sm leading-relaxed text-gray-text">{desc}</p>
      {info}
      <GameButton onClick={onMulai} size="lg" className="mt-1 w-full">
        {mulaiLabel}
      </GameButton>
    </Panel>
  );
}

export function GameResult({
  emoji = "🏆",
  judul = "Selesai!",
  skorLabel,
  skor,
  satuan = "poin",
  pesan,
  onUlang,
}: {
  emoji?: string;
  judul?: string;
  skorLabel?: string;
  skor: number | string;
  satuan?: string;
  pesan?: string;
  onUlang: () => void;
}) {
  return (
    <Panel className="flex flex-col items-center gap-3 text-center">
      <span className="text-5xl">{emoji}</span>
      <h2 className="font-display text-xl font-extrabold text-navy">{judul}</h2>
      {skorLabel ? <p className="font-body text-sm text-gray-text">{skorLabel}</p> : null}
      <p className="font-display text-5xl font-extrabold text-orange [text-shadow:0_2px_0_rgba(0,0,0,0.1)]">
        {skor} <span className="text-2xl">{satuan}</span>
      </p>
      {pesan ? (
        <Badge tone="vip" className="text-sm">
          {pesan}
        </Badge>
      ) : null}
      <GameButton onClick={onUlang} size="lg" className="mt-1 w-full">
        Main Lagi 🔁
      </GameButton>
    </Panel>
  );
}

"use client";

import { useKolomKomi } from "@/lib/kolom-komi/state";
import { REAKSI, type AreaKomi } from "@/lib/kolom-komi/reactions";
import { KomiCharacter } from "./KomiCharacter";

// Zona tap di atas Komi (perkiraan posisi pada gambar komi-base.png).
const ZONES: { id: AreaKomi; className: string }[] = [
  { id: "kepala", className: "left-1/2 top-0 h-[26%] w-[42%] -translate-x-1/2" },
  { id: "hidung", className: "left-1/2 top-[24%] h-[16%] w-[28%] -translate-x-1/2" },
  { id: "perut", className: "left-1/2 top-[42%] h-[34%] w-[52%] -translate-x-1/2" },
  { id: "kaki", className: "bottom-0 left-1/2 h-[22%] w-[58%] -translate-x-1/2" },
];

export function GestureLayer({
  accessory,
  size = 230,
  onReaksi,
}: {
  accessory?: string;
  size?: number;
  /** Dipanggil dengan teks reaksi saat Komi disentuh. */
  onReaksi?: (teks: string) => void;
}) {
  const { elus } = useKolomKomi();

  const tap = (id: AreaKomi) => {
    elus();
    onReaksi?.(REAKSI[id]);
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <KomiCharacter accessory={accessory} size={size} mood="bob" />
      {/* Zona sentuh transparan di atas Komi */}
      {ZONES.map((z) => (
        <button
          key={z.id}
          type="button"
          aria-label={`Sentuh ${z.id} Komi`}
          onClick={() => tap(z.id)}
          className={`absolute ${z.className} cursor-pointer rounded-full`}
        />
      ))}
    </div>
  );
}

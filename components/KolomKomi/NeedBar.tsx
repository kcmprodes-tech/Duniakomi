import type { ReactNode } from "react";

// Posisi 2 bar kebutuhan (% tinggi layar) — dipakai di layar Kasih Makan & Tidurin.
export const BAR_TOP_1 = 10.0;
export const BAR_TOP_2 = 15.4;

// Bar kebutuhan: ikon dalam badge + isi berwarna + persen. Warna disamakan dengan home.
export function NeedBar({
  icon,
  value,
  top,
  fill,
  badge,
}: {
  icon: ReactNode;
  value: number;
  top: number;
  fill: string;
  badge: string;
}) {
  const pct = Math.round(Math.max(0, Math.min(100, value)));
  return (
    <div className="absolute left-1.5 right-2 z-20 flex items-center gap-1.5" style={{ top: `${top}%` }}>
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-white text-white shadow"
        style={{ background: badge }}
      >
        {icon}
      </span>
      <div className="relative h-[22px] flex-1 overflow-hidden rounded-full border-2 border-white shadow" style={{ background: "rgba(28,16,22,0.5)" }}>
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500"
          style={{ width: `${pct}%`, background: fill }}
        />
        <span className="absolute inset-0 flex items-center justify-end pr-2.5 font-display text-[11px] font-extrabold text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.55)]">
          {pct}%
        </span>
      </div>
    </div>
  );
}

"use client";

import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* =========================================================================
   Design System "Kolom Komi" — gaya glossy/chunky (mengacu ui set.png),
   warna brand navy/oranye/cream. Semua komponen reusable.
   ========================================================================= */

type Variant = "primary" | "secondary" | "success" | "info" | "danger" | "pink";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, { grad: string; edge: string }> = {
  primary: { grad: "from-[#ffbe57] to-[#f08020]", edge: "#c2641a" },
  secondary: { grad: "from-[#3a4d7a] to-[#1a2845]", edge: "#0d1428" },
  success: { grad: "from-[#8ed863] to-[#4ea62e]", edge: "#3a7e20" },
  info: { grad: "from-[#5bbcf2] to-[#0e6bb3]", edge: "#0a4f86" },
  danger: { grad: "from-[#ff8080] to-[#e03131]", edge: "#b02323" },
  pink: { grad: "from-[#ff9ccb] to-[#ff3d92]", edge: "#cc2c72" },
};

const SIZE: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm rounded-xl",
  md: "px-6 py-2.5 text-base rounded-2xl",
  lg: "px-8 py-3.5 text-lg rounded-2xl",
};

/* ---- Tombol 3D glossy ---- */
export function GameButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  const v = VARIANT[variant];
  return (
    <button
      style={{ ["--edge" as string]: v.edge }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 bg-gradient-to-b font-display font-extrabold text-white transition-[transform,box-shadow]",
        "shadow-[0_5px_0_0_var(--edge),inset_0_2px_2px_rgba(255,255,255,0.45)]",
        "active:translate-y-[3px] active:shadow-[0_2px_0_0_var(--edge),inset_0_2px_2px_rgba(255,255,255,0.45)]",
        "[text-shadow:0_1px_1px_rgba(0,0,0,0.22)] disabled:translate-y-0 disabled:opacity-50 disabled:shadow-[0_5px_0_0_var(--edge)]",
        v.grad,
        SIZE[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---- Tombol bulat glossy ---- */
export function CircleButton({
  variant = "primary",
  size = 56,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: number }) {
  const v = VARIANT[variant];
  return (
    <button
      style={{ ["--edge" as string]: v.edge, width: size, height: size }}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gradient-to-b text-white transition-[transform,box-shadow]",
        "shadow-[0_5px_0_0_var(--edge),inset_0_3px_3px_rgba(255,255,255,0.5)]",
        "active:translate-y-[3px] active:shadow-[0_2px_0_0_var(--edge),inset_0_3px_3px_rgba(255,255,255,0.5)]",
        "disabled:opacity-50",
        v.grad,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---- Badge / Label ---- */
const BADGE: Record<string, string> = {
  new: "bg-gradient-to-b from-[#8ed863] to-[#4ea62e]",
  hot: "bg-gradient-to-b from-[#ff8080] to-[#e03131]",
  sale: "bg-gradient-to-b from-[#ffbe57] to-[#f08020]",
  best: "bg-gradient-to-b from-[#5bbcf2] to-[#0e6bb3]",
  vip: "bg-gradient-to-b from-[#ffd34d] to-[#ffb01f]",
  neutral: "bg-gradient-to-b from-[#3a4d7a] to-[#1a2845]",
};
export function Badge({
  tone = "new",
  children,
  className,
}: {
  tone?: keyof typeof BADGE;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 border-white/70 px-2.5 py-0.5 font-display text-xs font-extrabold uppercase tracking-wide text-white shadow [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]",
        BADGE[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---- Progress bar ---- */
export function ProgressBar({
  value,
  max = 100,
  color = "from-[#8ed863] to-[#4ea62e]",
  showValue = true,
  className,
}: {
  value: number;
  max?: number;
  color?: string;
  showValue?: boolean;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={cn(
        "relative h-5 w-full overflow-hidden rounded-full border-2 border-navy/15 bg-cream p-[2px] shadow-inner",
        className
      )}
    >
      <div
        className={cn("h-full rounded-full bg-gradient-to-b transition-all duration-500", color)}
        style={{ width: `${pct}%` }}
      />
      {showValue ? (
        <span className="absolute inset-0 flex items-center justify-center font-display text-[11px] font-extrabold text-navy [text-shadow:0_1px_0_rgba(255,255,255,0.6)]">
          {Math.round(value)}/{max}
        </span>
      ) : null}
    </div>
  );
}

/* ---- Progress ring (lingkaran) ---- */
export function ProgressRing({
  value,
  icon,
  fill = "radial-gradient(circle at 35% 25%, #ffd27a, #f08020)",
  ring = "#ffe08a",
  size = 64,
}: {
  value: number;
  icon: ReactNode;
  fill?: string;
  ring?: string;
  size?: number;
}) {
  const pct = Math.round(Math.max(0, Math.min(100, value)));
  return (
    <div className="drop-shadow-md" style={{ width: size, height: size }}>
      <div
        className="h-full w-full rounded-full p-[3px]"
        style={{ background: `conic-gradient(${ring} ${pct}%, rgba(255,255,255,0.55) ${pct}%)` }}
      >
        <div
          className="flex h-full w-full flex-col items-center justify-center rounded-full text-white shadow-[inset_0_2px_5px_rgba(255,255,255,0.6),inset_0_-3px_6px_rgba(0,0,0,0.18)]"
          style={{ background: fill }}
        >
          <span className="-mb-0.5">{icon}</span>
          <span className="font-display text-[11px] font-extrabold leading-none">{pct}%</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Toggle ON/OFF ---- */
export function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((o) => !o)}
      className={cn(
        "relative flex h-8 w-[68px] items-center rounded-full border-2 px-1 font-display text-[10px] font-extrabold uppercase text-white transition-colors",
        on ? "justify-start border-[#3a7e20] bg-gradient-to-b from-[#8ed863] to-[#4ea62e]" : "justify-end border-navy/20 bg-navy/20"
      )}
    >
      <span className="px-1">{on ? "On" : "Off"}</span>
      <span
        className={cn(
          "absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow transition-all",
          on ? "right-1" : "left-1"
        )}
      />
    </button>
  );
}

/* ---- Slider ---- */
export function Slider({ defaultValue = 60, color = "#f08020" }: { defaultValue?: number; color?: string }) {
  const [val, setVal] = useState(defaultValue);
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-3 flex-1 rounded-full bg-navy/15">
        <div className="h-full rounded-full" style={{ width: `${val}%`, background: color }} />
        <span
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow"
          style={{ left: `${val}%`, boxShadow: `0 0 0 3px ${color}` }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
      <span className="w-8 text-right font-display text-sm font-extrabold text-navy">{val}</span>
    </div>
  );
}

/* ---- Segmented / Tabs ---- */
export function Segmented({ options, defaultIndex = 0 }: { options: string[]; defaultIndex?: number }) {
  const [idx, setIdx] = useState(defaultIndex);
  return (
    <div className="inline-flex rounded-full border-2 border-navy/10 bg-cream p-1 shadow-inner">
      {options.map((o, i) => (
        <button
          key={o}
          onClick={() => setIdx(i)}
          className={cn(
            "rounded-full px-4 py-1.5 font-body text-sm font-bold transition",
            i === idx ? "bg-gradient-to-b from-[#ffbe57] to-[#f08020] text-white shadow" : "text-navy/60 hover:text-navy"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* ---- Counter / currency pill ---- */
export function Counter({
  icon,
  value,
  withButtons = false,
}: {
  icon: ReactNode;
  value: ReactNode;
  withButtons?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#e6951b] bg-gradient-to-b from-[#ffd34d] to-[#ffb01f] py-1 pl-1.5 pr-3 shadow-md">
      <span className="text-lg">{icon}</span>
      <span className="font-display text-lg font-extrabold text-white [text-shadow:0_1px_0_#d98512]">{value}</span>
      {withButtons ? (
        <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 font-display text-base font-extrabold text-[#f08020] shadow">
          +
        </span>
      ) : null}
    </span>
  );
}

/* ---- Slot / frame item ---- */
export function Slot({
  state = "empty",
  children,
}: {
  state?: "empty" | "locked" | "add" | "filled";
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex h-16 w-16 items-center justify-center rounded-2xl border-2 text-2xl",
        state === "filled"
          ? "border-[#c2641a] bg-gradient-to-b from-[#fff3e0] to-[#ffe0bd] shadow-inner"
          : state === "add"
            ? "border-dashed border-navy/30 bg-cream text-navy/40"
            : state === "locked"
              ? "border-navy/15 bg-navy/10 text-navy/40"
              : "border-navy/15 bg-cream shadow-inner"
      )}
    >
      {state === "add" ? "＋" : state === "locked" ? "🔒" : children}
    </div>
  );
}

/* ---- Panel ---- */
export function Panel({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl border-[3px] border-[#c2641a]/40 bg-cream p-5 shadow-xl", className)}>
      {title ? (
        <div className="mx-auto mb-3 -mt-9 w-fit rounded-full border-2 border-white bg-gradient-to-b from-[#ffbe57] to-[#f08020] px-5 py-1.5 font-display text-base font-extrabold text-white shadow-md [text-shadow:0_1px_1px_rgba(0,0,0,0.22)]">
          {title}
        </div>
      ) : null}
      {children}
    </div>
  );
}

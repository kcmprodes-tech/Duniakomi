"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { KoinIcon } from "./KoinIcon";

// Shell seragam untuk semua layar aksi Kolom Komi:
// header glossy (tombol kembali + judul + counter Koin) + area konten.
export function ActionScreen({
  title,
  koin,
  children,
}: {
  title: string;
  /** Tampilkan counter Koin di kanan header (opsional). */
  koin?: number;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-gradient-to-b from-white/90 via-white/70 to-transparent px-4 pb-5 pt-5 backdrop-blur-[2px]">
        <Link
          href="/kolom-komi"
          aria-label="Kembali"
          style={{ ["--edge" as string]: "#0d1428" }}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#3a4d7a] to-[#1a2845] text-white shadow-[0_4px_0_0_var(--edge),inset_0_2px_2px_rgba(255,255,255,0.4)] transition-[transform,box-shadow] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--edge)]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="flex-1 truncate font-display text-2xl font-extrabold text-navy [text-shadow:0_1px_0_rgba(255,255,255,0.7)]">
          {title}
        </h1>
        {koin != null ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-[#e6951b] bg-gradient-to-b from-[#ffd34d] to-[#ffb01f] px-3 py-1 shadow-md">
            <KoinIcon size={18} />
            <span className="font-display text-base font-extrabold leading-none text-white [text-shadow:0_1px_0_#d98512]">
              {koin}
            </span>
          </span>
        ) : null}
      </header>

      <div className="flex flex-1 flex-col gap-4 px-5 pb-10 pt-1">{children}</div>
    </div>
  );
}

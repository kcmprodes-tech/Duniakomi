"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { BERITA, type Berita } from "@/lib/kolom-komi/berita";
import type { ToastInfo } from "@/lib/kolom-komi/types";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { InAppBrowser } from "@/components/KolomKomi/InAppBrowser";
import { Toast } from "@/components/KolomKomi/Toast";
import { Loader } from "@/components/KolomKomi/Loader";
import { SceneOverlay } from "@/components/KolomKomi/SceneOverlay";
import { KoinIcon } from "@/components/KolomKomi/KoinIcon";
import { playSfx } from "@/lib/kolom-komi/sound";

// Warna thumbnail per kategori berita.
const WARNA: Record<string, string> = {
  Tips: "linear-gradient(135deg,#ffd98a,#f08020)",
  Kuliner: "linear-gradient(135deg,#ffc9a3,#d8743a)",
  Kesehatan: "linear-gradient(135deg,#9be3c8,#2fa37a)",
  Sains: "linear-gradient(135deg,#9fd3ff,#2d7fd6)",
  Inspiratif: "linear-gradient(135deg,#d6b3ff,#8a5cff)",
};

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const COLLAPSED = 54; // % tinggi bottom sheet (default)
const EXPANDED = 92;

export default function BacaPage() {
  const { state, selesaiBaca } = useKolomKomi();
  const [aktif, setAktif] = useState<Berita | null>(null);
  const [toast, setToast] = useState<ToastInfo | null>(null);
  const [pct, setPct] = useState(COLLAPSED);
  const [dragging, setDragging] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const start = useRef({ y: 0, pct: COLLAPSED, h: 0 });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(t);
  }, [toast]);

  if (!state) return <Loader />;
  const today = todayStr();

  const selesai = (b: Berita) => {
    const info = selesaiBaca(b.id);
    if (info.pesan) setToast(info);
  };

  // Drag handle bottom sheet.
  const onDown = (e: React.PointerEvent) => {
    const h = containerRef.current?.getBoundingClientRect().height || window.innerHeight;
    start.current = { y: e.clientY, pct, h };
    setDragging(true);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* abaikan */
    }
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dpct = ((e.clientY - start.current.y) / start.current.h) * 100;
    setPct(Math.max(42, Math.min(EXPANDED, start.current.pct - dpct)));
  };
  const onUp = () => {
    setDragging(false);
    setPct((p) => (p > (COLLAPSED + EXPANDED) / 2 ? EXPANDED : COLLAPSED));
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <Image
        src={KOMI_IMG.bacaBg}
        alt=""
        fill
        priority
        sizes="460px"
        className="object-cover object-top"
        onLoad={() => setBgLoaded(true)}
        onError={() => setBgLoaded(true)}
      />
      <SceneOverlay show={!bgLoaded} />

      <Link
        href="/kolom-komi"
        aria-label="Kembali"
        className="absolute left-2.5 top-2.5 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-navy/70 text-white shadow-md backdrop-blur-sm transition active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <span className="absolute right-3 top-3 z-30 inline-flex items-center gap-1.5 rounded-full border-2 border-[#e6951b] bg-gradient-to-b from-[#ffd34d] to-[#ffb01f] px-3 py-1 shadow-md">
        <KoinIcon size={18} />
        <span className="font-display text-base font-extrabold text-white [text-shadow:0_1px_0_#d98512]">{state.koin}</span>
      </span>

      {/* Bottom sheet */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col rounded-t-[2rem] bg-[#3a2417] shadow-[0_-8px_30px_rgba(0,0,0,0.4)]"
        style={{ height: `${pct}%`, transition: dragging ? "none" : "height .32s cubic-bezier(.4,0,.2,1)" }}
      >
        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          className="shrink-0 cursor-grab touch-none pb-2 pt-3 active:cursor-grabbing"
        >
          <div className="mx-auto h-1.5 w-12 rounded-full bg-white/45" />
          <p className="mt-2 text-center font-display text-base font-extrabold text-white">Baca Bareng Komi 📰</p>
          <p className="text-center font-body text-[11px] text-white/55">Baca artikel Kompas, dapat Koin tiap hari</p>
        </div>

        <div className="flex-1 overflow-y-auto px-3.5 pb-6 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col gap-3">
            {BERITA.map((b) => {
              const sudah = state.lastReadDates[b.id] === today;
              return (
                <div key={b.id} className="flex gap-3 rounded-3xl bg-cream p-2.5 shadow-md">
                  <div
                    className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-2xl text-4xl shadow-inner"
                    style={{ background: WARNA[b.kategori] ?? WARNA.Tips }}
                  >
                    <span className="drop-shadow-sm">{b.emoji}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-body text-[10px] font-extrabold uppercase tracking-wide text-orange">
                      {b.kategori}
                    </span>
                    <h3 className="font-display text-[15px] font-extrabold leading-tight text-navy">{b.judul}</h3>
                    <p className="mt-0.5 line-clamp-2 font-body text-[11px] leading-snug text-gray-text">{b.ringkasan}</p>
                    <button
                      onClick={() => { playSfx("open"); setAktif(b); }}
                      className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-b from-[#ffbe57] to-[#f08020] py-1.5 pl-3 pr-2.5 font-display text-[12px] font-extrabold text-white shadow [text-shadow:0_1px_1px_rgba(0,0,0,0.22)] transition active:scale-95"
                    >
                      {sudah ? (
                        <span>Baca lagi</span>
                      ) : (
                        <>
                          <span>Baca</span>
                          <span className="opacity-70">·</span>
                          <span>+5</span>
                          <KoinIcon size={13} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {aktif ? (
          <InAppBrowser key={aktif.id} halaman={aktif} onClose={() => setAktif(null)} onSelesai={() => selesai(aktif)} />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>{toast ? <Toast info={toast} /> : null}</AnimatePresence>
    </div>
  );
}

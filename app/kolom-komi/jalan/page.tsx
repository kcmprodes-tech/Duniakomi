"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { KANAL, type Kanal } from "@/lib/kolom-komi/kanal";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { InAppBrowser } from "@/components/KolomKomi/InAppBrowser";
import { Loader } from "@/components/KolomKomi/Loader";

export default function JalanPage() {
  const { state } = useKolomKomi();
  const [aktif, setAktif] = useState<Kanal | null>(null);

  if (!state) return <Loader />;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image src={KOMI_IMG.jalanBg} alt="" fill priority sizes="460px" className="object-cover object-top" />

      <Link
        href="/kolom-komi"
        aria-label="Kembali"
        className="absolute left-2.5 top-2.5 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-navy/70 text-white shadow-md backdrop-blur-sm transition active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      {/* Panel bawah: pilih tujuan (scroll horizontal) */}
      <div className="absolute inset-x-0 bottom-0 z-20 rounded-t-[2rem] bg-[#3a2417] pb-5 pt-4 shadow-[0_-8px_30px_rgba(0,0,0,0.4)]">
        <p className="px-6 text-center font-display text-[15px] font-extrabold leading-snug text-white">
          Komi mau jalan-jalan! Mau nemenin ke mana?
        </p>
        <p className="px-6 text-center font-body text-[12px] text-white/65">
          Tiap tempat ada cerita dari Kompas.com
        </p>
        <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {KANAL.map((k) => (
            <button
              key={k.id}
              onClick={() => setAktif(k)}
              className="flex w-[140px] shrink-0 flex-col items-center gap-1 rounded-3xl border border-white/60 bg-gradient-to-b from-[#c7f5e3] to-[#9fe7cf] p-3 text-center shadow-md transition active:scale-95"
            >
              <span className="text-[38px] leading-none drop-shadow-sm">{k.tempatEmoji}</span>
              <p className="font-display text-sm font-extrabold text-navy">{k.tempat}</p>
              <span className="rounded-full bg-gradient-to-b from-[#5bbcf2] to-[#0e6bb3] px-2.5 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-wide text-white shadow [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]">
                {k.kanal}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* In-app browser kanal Kompas */}
      <AnimatePresence>
        {aktif ? <InAppBrowser key={aktif.id} halaman={aktif} onClose={() => setAktif(null)} /> : null}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Ban, Lock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { OUTFITS, type Outfit } from "@/lib/kolom-komi/items";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { Loader } from "@/components/KolomKomi/Loader";
import { KoinIcon } from "@/components/KolomKomi/KoinIcon";
import { playSfx } from "@/lib/kolom-komi/sound";

export default function DandaninPage() {
  const { state, beliItem, pakaiItem } = useKolomKomi();
  const [pesan, setPesan] = useState<string | null>(null);

  if (!state) return <Loader />;

  const equipped = state.equippedItem;
  const equippedOutfit = equipped ? OUTFITS.find((o) => o.id === equipped) : null;

  const flash = (m: string) => {
    setPesan(m);
    setTimeout(() => setPesan(null), 1800);
  };

  const pilih = (o: Outfit) => {
    if (o.comingSoon) {
      flash("Kostum ini segera hadir 🙂");
      return;
    }
    const owned = state.ownedItems.includes(o.id);
    if (!owned) {
      const r = beliItem(o.id);
      flash(r.pesan ?? "");
      if (r.sukses) {
        playSfx("buy");
        pakaiItem(o.id); // langsung dipakai setelah dibeli
      }
      return;
    }
    playSfx("pop");
    pakaiItem(equipped === o.id ? null : o.id); // toggle pakai/lepas
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image src={KOMI_IMG.dandaniBg} alt="" fill priority sizes="460px" className="object-cover object-top" />

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

      {/* Kostum yang dipakai → emoji di atas Komi (placeholder sebelum art asli) */}
      <AnimatePresence>
        {equippedOutfit ? (
          <motion.span
            key={equippedOutfit.id}
            initial={{ scale: 0, y: 6 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            className="absolute left-1/2 top-[14%] z-10 -translate-x-1/2 text-5xl drop-shadow-lg"
          >
            {equippedOutfit.emoji}
          </motion.span>
        ) : null}
      </AnimatePresence>

      {/* Pesan */}
      <AnimatePresence>
        {pesan ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-[8%] z-30 w-[80%] max-w-xs -translate-x-1/2 rounded-2xl border-2 border-navy/10 bg-white/95 px-4 py-2 text-center font-body text-sm font-medium text-navy shadow-md"
          >
            {pesan}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Panel bawah: pilih kostum */}
      <div className="absolute inset-x-0 bottom-0 z-20 rounded-t-[2rem] bg-cream pb-5 pt-4 shadow-[0_-8px_30px_rgba(0,0,0,0.25)]">
        <p className="px-5 font-display text-base font-extrabold text-navy">Kostum Komi 🎩</p>
        <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Opsi lepas kostum */}
          <button onClick={() => { playSfx("select"); pakaiItem(null); }} className="flex w-[84px] shrink-0 flex-col items-center gap-1 active:scale-95">
            <div
              className={`relative flex h-[76px] w-[76px] items-center justify-center rounded-2xl border-2 shadow-sm ${
                !equipped ? "border-emerald-400 bg-emerald-50" : "border-navy/10 bg-white"
              }`}
            >
              <Ban className="h-7 w-7 text-navy/40" />
              {!equipped ? (
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
                  <Check className="h-4 w-4" />
                </span>
              ) : null}
            </div>
            <p className="text-center font-display text-[11px] font-extrabold leading-tight text-navy">Lepas</p>
          </button>

          {OUTFITS.map((o) => {
            const owned = state.ownedItems.includes(o.id);
            const dipakai = equipped === o.id;
            return (
              <button key={o.id} onClick={() => pilih(o)} className="flex w-[84px] shrink-0 flex-col items-center gap-1 active:scale-95">
                <div
                  className={`relative flex h-[76px] w-[76px] items-center justify-center rounded-2xl border-2 shadow-sm ${
                    dipakai
                      ? "border-emerald-400 bg-emerald-50"
                      : o.comingSoon
                        ? "border-navy/10 bg-navy/5 opacity-70"
                        : "border-navy/10 bg-white"
                  }`}
                >
                  <span className="text-4xl">{o.emoji}</span>
                  {dipakai ? (
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : o.comingSoon ? (
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy/60 text-white shadow">
                      <Lock className="h-3.5 w-3.5" />
                    </span>
                  ) : null}
                </div>
                <p className="text-center font-display text-[11px] font-extrabold leading-tight text-navy">{o.nama}</p>
                {o.comingSoon ? (
                  <span className="rounded-full bg-navy/10 px-2 py-0.5 font-body text-[10px] font-bold text-navy/50">Segera</span>
                ) : owned ? (
                  <span className={`rounded-full px-2 py-0.5 font-body text-[10px] font-bold ${dipakai ? "text-emerald-600" : "bg-orange/15 text-orange"}`}>
                    {dipakai ? "Dipakai" : "Pakai"}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-b from-[#ffd34d] to-[#ffb01f] px-2 py-0.5 font-display text-[10px] font-extrabold text-white shadow-sm">
                    {o.harga === 0 ? "Gratis" : o.harga}
                    {o.harga === 0 ? null : <KoinIcon size={11} />}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

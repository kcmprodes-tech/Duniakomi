"use client";

import Link from "next/link";
import { Fish, Hand, MessageCircle, Newspaper } from "lucide-react";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBars } from "@/components/KolomKomi/StatusBars";

const aksi = [
  { icon: <Fish className="h-5 w-5" />, label: "Kasih Makan" },
  { icon: <Hand className="h-5 w-5" />, label: "Elus" },
  { icon: <MessageCircle className="h-5 w-5" />, label: "Ngobrol" },
  { icon: <Newspaper className="h-5 w-5" />, label: "Baca" },
];

const loop = [
  { emoji: "☀️", text: "Mampir tiap pagi" },
  { emoji: "📰", text: "Baca berita bareng Komi" },
  { emoji: "🐟", text: "Komi dapat Koin Ikan" },
  { emoji: "😸", text: "Komi senang, kamu makin update" },
];

export function KolomKomiShowcase() {
  return (
    <section id="kolom-komi" className="scroll-mt-24 bg-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="font-body text-sm font-bold uppercase tracking-widest text-orange-soft">
            Fitur utama
          </p>
          <h2 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Kolom Komi</h2>
          <p className="mt-3 max-w-xl font-body text-lg text-white/70">
            Komi bukan sekadar maskot — dia sahabat yang nungguin kamu tiap hari.
            Kasih makan, elus, ngobrol, dan baca berita bareng. Makin sering mampir,
            makin akrab.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="bg-white">
              <p className="font-body text-xs font-bold uppercase tracking-wide text-gray-text">
                Kondisi Komi
              </p>
              <div className="mt-3">
                <StatusBars kenyang={80} mood={65} update={90} />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {aksi.map((a) => (
                  <div
                    key={a.label}
                    className="flex flex-col items-center gap-1 rounded-2xl border-2 border-navy/10 bg-cream/60 p-2 text-center"
                  >
                    <span className="text-orange">{a.icon}</span>
                    <span className="font-body text-[10px] font-bold text-navy">{a.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              <p className="font-body text-sm font-bold uppercase tracking-wide text-white/50">
                Cara kerjanya
              </p>
              {loop.map((l) => (
                <div
                  key={l.text}
                  className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3"
                >
                  <span className="text-2xl">{l.emoji}</span>
                  <span className="font-body text-sm font-semibold text-white/90">{l.text}</span>
                </div>
              ))}
              <Link href="/kolom-komi" className="mt-2">
                <Button className="w-full px-6 py-3 text-base">
                  Coba Kolom Komi sekarang →
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

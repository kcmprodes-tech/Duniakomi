import Image from "next/image";
import { BookOpenText, Lightbulb } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Card } from "@/components/ui/Card";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";

// Mockup 3 panel komik strip (pakai emoji sebagai placeholder sebelum art asli).
const panelKomik = [
  { emoji: "📰", bubble: "Ada kabar baru nih…" },
  { emoji: "🤔", bubble: "Wah, menarik juga." },
  { emoji: "😹", bubble: "Yaudah, ngopi dulu!" },
];

// Poin ringkas gaya "Komi Jelasin".
const poinJelasin = [
  "Pakai bahasa sehari-hari",
  "Singkat & to the point",
  "Selalu netral & aman",
];

// Section teaser konten non-game: Komik Strip & Komi Jelasin (keduanya "Segera").
export function KontenTeaser() {
  return (
    <Section id="konten">
      <Reveal>
        <p className="font-body text-sm font-bold uppercase tracking-widest text-orange">
          Segera hadir
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Lebih dari sekadar main
        </h2>
        <p className="mt-3 max-w-xl font-body text-lg text-gray-text">
          Komi juga bakal nemenin kamu lewat cerita dan penjelasan ringan — dua cara baru
          menikmati kabar harian bareng Komi.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Komik Strip */}
        <Reveal>
          <Card className="flex h-full flex-col transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/15 text-orange">
                <BookOpenText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-extrabold text-navy">Komik Strip</h3>
                <span className="mt-0.5 inline-block rounded-full bg-navy/5 px-2 py-0.5 font-body text-[10px] font-bold text-navy/50">
                  Segera
                </span>
              </div>
            </div>

            {/* Mockup 3 panel */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {panelKomik.map((p, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-navy/10 bg-gradient-to-b from-cream to-white"
                >
                  <span className="absolute inset-x-1.5 top-1.5 rounded-lg bg-white px-1.5 py-1 text-center font-body text-[8px] font-semibold leading-tight text-navy shadow-sm">
                    {p.bubble}
                  </span>
                  <span className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 text-3xl drop-shadow-sm">
                    {p.emoji}
                  </span>
                  <span className="absolute bottom-1 right-1.5 font-display text-[10px] font-extrabold text-navy/25">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 font-body text-sm text-gray-text">
              Cerita lucu Komi & tetangga, terinspirasi kabar ringan hari ini. Tiga panel,
              sekali baca langsung senyum.
            </p>
          </Card>
        </Reveal>

        {/* Komi Jelasin */}
        <Reveal delay={0.1}>
          <Card className="flex h-full flex-col transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-kompas/15 text-kompas">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-extrabold text-navy">Komi Jelasin</h3>
                <span className="mt-0.5 inline-block rounded-full bg-navy/5 px-2 py-0.5 font-body text-[10px] font-bold text-navy/50">
                  Segera
                </span>
              </div>
            </div>

            {/* Mockup obrolan penjelasan */}
            <div className="mt-4 flex gap-3 rounded-2xl bg-cream/70 p-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white bg-white shadow">
                <Image
                  src={KOMI_IMG.base}
                  alt="Komi"
                  fill
                  sizes="48px"
                  className="scale-110 object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
                  <p className="font-body text-xs font-semibold text-navy">
                    “Jadi gini, Pak/Bu… aku ringkasin biar gampang ya 👇”
                  </p>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {poinJelasin.map((t, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange text-[9px] font-extrabold text-white">
                        {i + 1}
                      </span>
                      <span className="font-body text-[11px] font-medium text-navy/80">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-4 font-body text-sm text-gray-text">
              Topik yang lagi rame, dijelasin Komi pakai bahasa santai bapak-bapak — yang
              ribet jadi gampang dicerna.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

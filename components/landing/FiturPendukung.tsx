import { HelpCircle, Type, Brain, Shuffle } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Card } from "@/components/ui/Card";

// Mini-game "knowledge-based" (level Dunia Komi) — mendorong pembaca konsumsi berita Kompas.
const games = [
  {
    icon: <HelpCircle className="h-6 w-6" />,
    judul: "Tebak Berita Komi",
    desc: "Kuis seru dari artikel hari ini.",
  },
  {
    icon: <Type className="h-6 w-6" />,
    judul: "Katla-nya Komi",
    desc: "Tebak kata harian ala Wordle.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    judul: "Trivia Indonesia",
    desc: "Uji pengetahuan dari arsip Kompas.",
  },
  {
    icon: <Shuffle className="h-6 w-6" />,
    judul: "Headline Match",
    desc: "Cocokkan headline dengan kategorinya.",
  },
];

export function FiturPendukung() {
  return (
    <Section id="fitur">
      <Reveal>
        <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Main sambil makin update
        </h2>
        <p className="mt-3 max-w-xl font-body text-lg text-gray-text">
          Game ringan bareng Komi yang bikin baca berita Kompas jadi nagih.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((g, i) => (
          <Reveal key={g.judul} delay={i * 0.08}>
            <Card className="h-full transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/15 text-orange">
                {g.icon}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <h3 className="font-display text-lg font-extrabold text-navy">{g.judul}</h3>
              </div>
              <p className="mt-1 font-body text-sm text-gray-text">{g.desc}</p>
              <span className="mt-3 inline-block rounded-full bg-navy/5 px-2 py-0.5 font-body text-[10px] font-bold text-navy/50">
                Segera
              </span>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

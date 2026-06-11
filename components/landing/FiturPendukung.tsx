import { BookOpen, Coins, Gamepad2 } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Card } from "@/components/ui/Card";

const fitur = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    judul: "Komik Strip",
    desc: "Cerita harian Komi & tetangga — receh tapi nagih.",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    judul: "Komi Poin",
    desc: "Kumpulkan poin dari aktivitas, tukar jadi hadiah seru.",
  },
  {
    icon: <Gamepad2 className="h-6 w-6" />,
    judul: "Mini Game",
    desc: "Game ringan bareng Komi di sela baca berita.",
  },
];

export function FiturPendukung() {
  return (
    <Section id="fitur">
      <Reveal>
        <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Lebih dari sekadar maskot
        </h2>
        <p className="mt-3 max-w-xl font-body text-lg text-gray-text">
          Dunia Komi tumbuh dengan banyak cara seru buat nemenin kamu.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {fitur.map((f, i) => (
          <Reveal key={f.judul} delay={i * 0.08}>
            <Card className="h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/15 text-orange">
                {f.icon}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <h3 className="font-display text-lg font-extrabold text-navy">{f.judul}</h3>
                <span className="rounded-full bg-navy/5 px-2 py-0.5 font-body text-[10px] font-bold text-navy/50">
                  Segera
                </span>
              </div>
              <p className="mt-1 font-body text-sm text-gray-text">{f.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

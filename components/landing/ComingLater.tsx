import { Reveal } from "./Reveal";
import { UNIVERSE } from "@/lib/landing/universe";

export function ComingLater() {
  return (
    <section id="universe" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-body text-sm font-bold uppercase tracking-widest text-orange">
            Universe
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Dunia Komi baru dimulai…
          </h2>
          <p className="mt-3 max-w-xl font-body text-lg text-gray-text">
            Sebentar lagi, tetangga-tetangga Komi ikut nimbrung — tiap satu mewakili
            rubrik berita favoritmu.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {UNIVERSE.map((k, i) => (
            <Reveal key={k.nama} delay={i * 0.06}>
              <div className="flex h-full flex-col items-center gap-2 rounded-3xl border-2 border-navy/10 bg-cream/50 p-4 text-center">
                <div
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${k.warna}`}
                >
                  <span className="text-3xl opacity-30 grayscale">{k.emoji}</span>
                  <span className="absolute font-display text-2xl font-extrabold text-navy/40">
                    ?
                  </span>
                </div>
                <h3 className="font-display text-sm font-extrabold text-navy">{k.nama}</h3>
                <p className="font-body text-[11px] leading-snug text-gray-text">{k.kategori}</p>
                <span className="mt-auto rounded-full bg-navy/5 px-2 py-0.5 font-body text-[10px] font-bold text-navy/50">
                  {k.fase}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

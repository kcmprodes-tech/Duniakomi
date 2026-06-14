"use client";

import { useKolomKomi } from "@/lib/kolom-komi/state";
import { ActionScreen } from "@/components/KolomKomi/ActionScreen";
import { TangkapIkan } from "@/components/KolomKomi/TangkapIkan";
import { Loader } from "@/components/KolomKomi/Loader";

// Game lain yang menyusul (mockup) — ditampilkan kecil sebagai roadmap.
const SEGERA = [
  { emoji: "🎯", nama: "Lempar Ikan" },
  { emoji: "🙈", nama: "Sembunyi Komi" },
  { emoji: "🧹", nama: "Bersih-bersih" },
];

export default function MainPage() {
  const { state, selesaiMain } = useKolomKomi();
  if (!state) return <Loader />;

  return (
    <ActionScreen title="Main Bareng" koin={state.koin}>
      <TangkapIkan onSelesai={selesaiMain} />

      <div className="mt-1 flex flex-col gap-2">
        <p className="font-body text-xs font-semibold text-navy/60">
          Game lain segera hadir ✨
        </p>
        <div className="flex flex-wrap gap-2">
          {SEGERA.map((g) => (
            <span
              key={g.nama}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-navy/10 bg-white/70 px-3 py-1.5 font-body text-xs font-semibold text-navy/50"
            >
              <span className="text-base">{g.emoji}</span>
              {g.nama}
              <span className="rounded-full bg-navy/10 px-1.5 py-0.5 text-[9px] font-bold uppercase">
                Segera
              </span>
            </span>
          ))}
        </div>
      </div>
    </ActionScreen>
  );
}

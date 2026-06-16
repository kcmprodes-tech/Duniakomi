"use client";

import { useRouter } from "next/navigation";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { ActionScreen } from "@/components/KolomKomi/ActionScreen";
import { Loader } from "@/components/KolomKomi/Loader";
import { GameButton, Panel } from "@/components/ui/kit";
import { KoinIcon } from "@/components/KolomKomi/KoinIcon";

// Cara mendapatkan Koin (selaras dengan logika di lib/kolom-komi/state.tsx).
const CARA = [
  { emoji: "📰", judul: "Baca berita bareng", detail: "+10 Koin tiap artikel baru (sekali per hari)" },
  { emoji: "📅", judul: "Check-in harian", detail: "+5 sampai +50 Koin — makin panjang streak, makin besar" },
  { emoji: "🎮", judul: "Main mini-game", detail: "Koin sesuai skor di Main Bareng" },
];

function fmtWaktu(iso: string): string {
  try {
    const d = new Date(iso);
    return (
      d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }) +
      " · " +
      d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    );
  } catch {
    return "";
  }
}

export default function PoinPage() {
  const { state } = useKolomKomi();
  const router = useRouter();

  if (!state) return <Loader />;

  const riwayat = state.riwayat ?? [];

  return (
    <ActionScreen title="Koin" koin={state.koin}>
      {/* Total koin + ringkasan diperoleh/dibelanjakan */}
      <Panel className="flex flex-col items-center gap-1 text-center">
        <KoinIcon size={48} />
        <p className="font-display text-5xl font-extrabold text-orange [text-shadow:0_2px_0_rgba(0,0,0,0.1)]">
          {state.koin}
        </p>
        <p className="font-body text-sm font-semibold text-gray-text">Koin kamu</p>
        <p className="font-body text-xs text-navy/50">Streak {state.streak} hari beruntun 🔥</p>

        <div className="mt-3 flex w-full gap-2">
          <div className="flex-1 rounded-2xl bg-white/70 py-2">
            <p className="font-body text-[11px] font-semibold text-gray-text">Diperoleh</p>
            <p className="flex items-center justify-center gap-1 font-display text-lg font-extrabold" style={{ color: "#4ea62e" }}>
              +{state.totalDapat ?? 0} <KoinIcon size={15} />
            </p>
          </div>
          <div className="flex-1 rounded-2xl bg-white/70 py-2">
            <p className="font-body text-[11px] font-semibold text-gray-text">Dibelanjakan</p>
            <p className="flex items-center justify-center gap-1 font-display text-lg font-extrabold" style={{ color: "#e03131" }}>
              −{state.totalBelanja ?? 0} <KoinIcon size={15} />
            </p>
          </div>
        </div>
      </Panel>

      <div className="pt-3" />

      {/* Riwayat transaksi */}
      <Panel title="Riwayat">
        {riwayat.length === 0 ? (
          <p className="py-2 text-center font-body text-sm text-gray-text">
            Belum ada transaksi. Yuk baca berita atau main game!
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-navy/5">
            {riwayat.slice(0, 12).map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-extrabold text-navy">{r.label}</p>
                  <p className="font-body text-[11px] text-gray-text">{fmtWaktu(r.t)}</p>
                </div>
                <span
                  className="inline-flex shrink-0 items-center gap-1 font-display text-sm font-extrabold"
                  style={{ color: r.jumlah > 0 ? "#4ea62e" : "#e03131" }}
                >
                  {r.jumlah > 0 ? `+${r.jumlah}` : r.jumlah} <KoinIcon size={14} />
                </span>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <div className="pt-3" />

      {/* Cara dapat koin */}
      <Panel title="Cara Dapat Koin">
        <div className="flex flex-col gap-3">
          {CARA.map((c) => (
            <div key={c.judul} className="flex items-start gap-3">
              <span className="text-2xl">{c.emoji}</span>
              <div>
                <p className="font-display text-sm font-extrabold text-navy">{c.judul}</p>
                <p className="font-body text-[11px] leading-snug text-gray-text">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="pt-3" />

      {/* Dipakai buat apa */}
      <Panel title="Dipakai Buat">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-body text-sm text-gray-text">
            <span className="text-xl">👒</span> Beli kostum buat dandanin Komi!
          </p>
          <GameButton className="w-full" onClick={() => router.push("/kolom-komi/dandanin")}>
            Ke Dandanin Komi
          </GameButton>
        </div>
      </Panel>
    </ActionScreen>
  );
}

import type { ReactNode } from "react";
import type { Metadata } from "next";
import { KolomKomiProvider } from "@/lib/kolom-komi/state";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { SplashGate } from "@/components/KolomKomi/SplashGate";

export const metadata: Metadata = {
  title: "Kolom Komi — Temani Komi tiap hari",
};

export default function KolomKomiLayout({ children }: { children: ReactNode }) {
  return (
    <KolomKomiProvider>
      <div className="flex min-h-dvh justify-center bg-navy sm:items-center sm:py-6">
        {/* Bingkai game: full-screen di HP; di tablet/desktop jadi rasio 9:16 yang mengisi tinggi layar */}
        <div
          className="relative min-h-dvh w-full max-w-[460px] overflow-hidden bg-cream bg-cover bg-center sm:aspect-[9/16] sm:h-[calc(100dvh-3rem)] sm:min-h-0 sm:w-auto sm:max-w-[calc(100vw-3rem)] sm:rounded-[2.5rem] sm:shadow-2xl"
          style={{ backgroundImage: `url(${KOMI_IMG.room})` }}
        >
          {/* Scrim lembut agar UI tetap terbaca di atas latar */}
          <div className="relative min-h-dvh bg-gradient-to-b from-white/10 via-transparent to-white/50 sm:h-full sm:min-h-0">
            <SplashGate>{children}</SplashGate>
          </div>
        </div>
      </div>
    </KolomKomiProvider>
  );
}

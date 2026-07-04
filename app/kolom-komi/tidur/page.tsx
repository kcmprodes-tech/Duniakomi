"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Smile, Zap } from "lucide-react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { Loader } from "@/components/KolomKomi/Loader";
import { SceneOverlay } from "@/components/KolomKomi/SceneOverlay";
import { NeedBar, BAR_TOP_1, BAR_TOP_2 } from "@/components/KolomKomi/NeedBar";
import { playSfx } from "@/lib/kolom-komi/sound";

// Durasi webp transisi (sekali jalan) — untuk pindah fase.
const TRANSISI_MS = 5084; // ngantuk → tidur
const BANGUN_MS = 5084; // tidur → bangun

type Phase = "ngantuk" | "transisi" | "tidur" | "bangun" | "segar";

export default function TidurPage() {
  const { state, pulihTidur } = useKolomKomi();
  const [phase, setPhase] = useState<Phase>("ngantuk");
  const [cycle, setCycle] = useState(0); // paksa webp transisi replay dari frame 0
  const [bgLoaded, setBgLoaded] = useState(false);

  const pulihRef = useRef(pulihTidur);
  pulihRef.current = pulihTidur;
  const stateRef = useRef(state);
  stateRef.current = state;

  // Prefetch semua webp transisi biar tidak nge-flash saat pindah fase.
  useEffect(() => {
    [KOMI_IMG.tidurTransisi, KOMI_IMG.tidurSedang, KOMI_IMG.tidurBangun, KOMI_IMG.tidurSegar].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Transisi ngantuk → tidur (sekali jalan), lalu masuk fase "tidur".
  useEffect(() => {
    if (phase !== "transisi") return;
    const t = setTimeout(() => setPhase("tidur"), TRANSISI_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Selama tidur: isi Energy & Mood perlahan (+1 per 200ms ≈ ~20 detik) → bar penuh → transisi bangun.
  useEffect(() => {
    if (phase !== "tidur") return;
    const id = setInterval(() => {
      const s = stateRef.current;
      if (s && s.energy >= 100 && s.mood >= 100) {
        clearInterval(id);
        setCycle((c) => c + 1);
        setPhase("bangun"); // penuh → Komi bangun
        return;
      }
      pulihRef.current(1, 1);
    }, 200);
    return () => clearInterval(id);
  }, [phase]);

  // Transisi bangun (sekali jalan) → kalau mood & energy sudah ≥ 60% lanjut ke "segar" (loop),
  // kalau masih kurang balik ke "ngantuk".
  useEffect(() => {
    if (phase !== "bangun") return;
    const t = setTimeout(() => {
      const s = stateRef.current;
      if (s && s.mood >= 60 && s.energy >= 60) {
        setPhase("segar");
      } else {
        setPhase("ngantuk");
      }
    }, BANGUN_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (!state) return <Loader />;

  const klikLampu = () => {
    if (phase === "ngantuk") {
      playSfx("pop");
      setCycle((c) => c + 1);
      setPhase("transisi"); // matikan lampu → tidur
    } else if (phase === "tidur") {
      playSfx("pop");
      setCycle((c) => c + 1);
      setPhase("bangun"); // nyalakan lampu → bangunkan Komi
    }
    // phase "transisi" / "bangun": abaikan klik sampai selesai
  };

  const hint =
    phase === "tidur"
      ? "Komi tidur… klik lampu lagi buat bangunin 😴"
      : phase === "transisi"
        ? "Komi mulai terlelap… 💤"
        : phase === "bangun"
          ? "Komi bangun… 🌅"
          : phase === "segar"
            ? "Komi udah segar & bugar! 🌟"
            : "Klik lampu di nakas buat matiin & tidurin Komi 💡";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Scene per fase: ngantuk(loop) / transisi(sekali) / sedang tidur(loop) / bangun(sekali) */}
      {phase === "ngantuk" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key="ngantuk"
          src={KOMI_IMG.tidurNgantukScene}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
        />
      ) : phase === "transisi" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`transisi-${cycle}`}
          src={KOMI_IMG.tidurTransisi}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
        />
      ) : phase === "tidur" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key="sedang-tidur"
          src={KOMI_IMG.tidurSedang}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
        />
      ) : phase === "bangun" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`bangun-${cycle}`}
          src={KOMI_IMG.tidurBangun}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key="segar"
          src={KOMI_IMG.tidurSegar}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
        />
      )}
      <SceneOverlay show={!bgLoaded} />

      <Link
        href="/kolom-komi"
        aria-label="Kembali"
        className="absolute left-2.5 top-2.5 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-navy/70 text-white shadow-md backdrop-blur-sm transition active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      {/* Bar Mood (pink) & Energy (biru) */}
      <NeedBar
        icon={<Smile className="h-4 w-4" />}
        value={state.mood}
        top={BAR_TOP_1}
        fill="linear-gradient(to bottom, #ff9ecb, #ff3d92)"
        badge="linear-gradient(to bottom, #ff9ecb, #ff3d92)"
      />
      <NeedBar
        icon={<Zap className="h-4 w-4" />}
        value={state.energy}
        top={BAR_TOP_2}
        fill="linear-gradient(to bottom, #8fd3ff, #2d9cdb)"
        badge="linear-gradient(to bottom, #5bbcf2, #2d9cdb)"
      />

      {/* Zona lampu (nakas kiri) — klik untuk tidurin / bangunin Komi */}
      <button
        onClick={klikLampu}
        aria-label={phase === "tidur" ? "Nyalakan lampu & bangunkan Komi" : "Matikan lampu & tidurin Komi"}
        className="absolute left-[3%] top-[24%] z-20 h-[26%] w-[30%] rounded-2xl"
      />

      {/* Hint / status */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-6">
        <p className="rounded-full bg-navy/55 px-4 py-2 text-center font-body text-sm font-semibold text-white shadow-md backdrop-blur-sm">
          {hint}
        </p>
      </div>
    </div>
  );
}

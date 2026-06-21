"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Utensils, Smile, Zap, Newspaper } from "lucide-react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { KomiStage } from "@/components/KolomKomi/KomiStage";
import { CheckInPanel } from "@/components/KolomKomi/CheckInPanel";
import { Loader } from "@/components/KolomKomi/Loader";
import { SceneOverlay } from "@/components/KolomKomi/SceneOverlay";
import { KoinIcon } from "@/components/KolomKomi/KoinIcon";
import { Onboarding } from "@/components/KolomKomi/Onboarding";
import { playSfx } from "@/lib/kolom-komi/sound";

// Lingkaran progres (dinamis): ring conic-gradient + bola glossy + ikon + %.
function StatCircle({
  icon,
  value,
  fill,
  ring,
}: {
  icon: ReactNode;
  value: number;
  fill: string;
  ring: string;
}) {
  const pct = Math.round(value);
  return (
    <div className="h-[58px] w-[58px] drop-shadow-md">
      <div
        className="h-full w-full rounded-full p-[3px]"
        style={{ background: `conic-gradient(${ring} ${pct}%, rgba(255,255,255,0.55) ${pct}%)` }}
      >
        <div
          className="flex h-full w-full flex-col items-center justify-center rounded-full text-white shadow-[inset_0_2px_5px_rgba(255,255,255,0.6),inset_0_-3px_6px_rgba(0,0,0,0.18)]"
          style={{ background: fill }}
        >
          <span className="-mb-0.5">{icon}</span>
          <span className="font-display text-[11px] font-extrabold leading-none">{pct}%</span>
        </div>
      </div>
    </div>
  );
}

const AKSI = [
  { src: "/komi/makan.png", href: "/kolom-komi/makan", label: "Kasih Makan" },
  { src: "/komi/baca.png", href: "/kolom-komi/baca", label: "Baca Bareng" },
  { src: "/komi/jalan.png", href: "/kolom-komi/jalan", label: "Ajak Jalan" },
  { src: "/komi/game.png", href: "/kolom-komi/main", label: "Main Bareng" },
  { src: "/komi/tidur.png", href: "/kolom-komi/tidur", label: "Tidurin" },
];

export default function HubPage() {
  const { state } = useKolomKomi();
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [pesan, setPesan] = useState<string | null>(null);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    if (!pesan) return;
    const t = setTimeout(() => setPesan(null), 2200);
    return () => clearTimeout(t);
  }, [pesan]);

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;
  const energyLow = state.energy < 30;

  const stats = [
    { icon: <Utensils className="h-4 w-4" />, value: state.kenyang, fill: "radial-gradient(circle at 35% 25%, #ffd27a, #f08020)", ring: "#ffe08a" },
    { icon: <Smile className="h-4 w-4" />, value: state.mood, fill: "radial-gradient(circle at 35% 25%, #ff9ecb, #ff3d92)", ring: "#ffc2e0" },
    { icon: <Zap className="h-4 w-4" />, value: state.energy, fill: "radial-gradient(circle at 35% 25%, #8fd3ff, #2d9cdb)", ring: "#c2e8ff" },
    { icon: <Newspaper className="h-4 w-4" />, value: state.update, fill: "radial-gradient(circle at 35% 25%, #6fe0d0, #16b8a6)", ring: "#bff3ec" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Latar ruang */}
      <Image
        src={KOMI_IMG.homeBg}
        alt=""
        fill
        priority
        sizes="460px"
        className="object-cover"
        onLoad={() => setBgLoaded(true)}
        onError={() => setBgLoaded(true)}
      />
      <SceneOverlay show={!bgLoaded} />

      {/* Badge Koin (kiri atas) → detail poin */}
      <Link
        href="/kolom-komi/poin"
        aria-label="Detail Koin"
        onClick={() => playSfx("select")}
        className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full border-2 border-[#e6951b] bg-gradient-to-b from-[#ffd34d] to-[#ffb01f] px-3 py-1 shadow-md transition active:scale-95"
      >
        <KoinIcon size={20} />
        <span className="font-display text-lg font-extrabold text-white [text-shadow:0_1px_0_#d98512]">
          {state.koin}
        </span>
      </Link>

      {/* Badge DAY (kanan atas) → buka check-in */}
      <button
        onClick={() => { playSfx("select"); setCheckinOpen(true); }}
        aria-label="Check-in harian"
        className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border-2 border-[#6b32c9] bg-gradient-to-b from-[#9b5cff] to-[#7a2ff0] px-3 py-1 shadow-md transition active:scale-95"
      >
        <CalendarCheck className="h-5 w-5 text-white" />
        <span className="font-display text-base font-extrabold text-white">DAY {state.streak}</span>
      </button>

      {/* Lingkaran progres (kiri) */}
      <div className="absolute left-2 top-[19%] z-10 flex flex-col gap-2.5">
        {stats.map((s, i) => (
          <StatCircle key={i} icon={s.icon} value={s.value} fill={s.fill} ring={s.ring} />
        ))}
      </div>

      {/* Tombol kanan: Dandani + Setting */}
      <div className="absolute right-2 top-[19%] z-10 flex flex-col gap-3">
        <Link
          href="/kolom-komi/dandanin"
          aria-label="Dandani Komi"
          onClick={() => playSfx("select")}
          className="block transition active:scale-95"
        >
          <Image src="/komi/dandan.png" alt="Dandani Komi" width={56} height={56} className="drop-shadow-md" />
        </Link>
        <Link
          href="/kolom-komi/setting"
          aria-label="Pengaturan"
          onClick={() => playSfx("select")}
          className="block transition active:scale-95"
        >
          <Image src="/komi/setting.png" alt="Pengaturan" width={56} height={56} className="drop-shadow-md" />
        </Link>
      </div>

      {/* Komi di tengah (diam, melambai tiap 5 detik, bisa di-sentuh) */}
      <div className="absolute bottom-[10%] left-1/2 z-0 -translate-x-1/2 -translate-y-[70px]">
        <KomiStage size={378} accessory={equipped?.emoji} onReaksi={setPesan} />
      </div>

      {/* Balon reaksi sementara */}
      <AnimatePresence>
        {pesan ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-[14%] z-30 w-[78%] max-w-xs -translate-x-1/2 rounded-2xl border-2 border-navy/10 bg-white/95 px-4 py-2 text-center font-body text-sm font-medium text-navy shadow-md"
          >
            {pesan}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* 5 tombol aksi (bawah) di atas panel kayu */}
      <div className="absolute inset-x-5 bottom-8 z-20">
        <Image
          src="/komi/background-button.png"
          alt=""
          width={1000}
          height={260}
          priority
          className="h-auto w-full drop-shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-[2%] px-[3.5%]">
          {AKSI.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              aria-label={a.label}
              onClick={() => playSfx("select")}
              className={`relative h-[82%] flex-1 ${
                a.href === "/kolom-komi/tidur" && energyLow ? "animate-pulse" : ""
              }`}
            >
              <Image src={a.src} alt={a.label} fill sizes="20vw" className="object-contain drop-shadow-md" />
            </Link>
          ))}
        </div>
      </div>

      {/* Panel check-in */}
      <AnimatePresence>
        {checkinOpen ? <CheckInPanel onClose={() => setCheckinOpen(false)} /> : null}
      </AnimatePresence>

      <Onboarding />
    </div>
  );
}

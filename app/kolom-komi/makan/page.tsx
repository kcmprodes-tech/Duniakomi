"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Utensils, Smile } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { FOODS, type Food } from "@/lib/kolom-komi/foods";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { Loader } from "@/components/KolomKomi/Loader";
import { SceneOverlay } from "@/components/KolomKomi/SceneOverlay";
import { NeedBar, BAR_TOP_1, BAR_TOP_2 } from "@/components/KolomKomi/NeedBar";
import { playSfx } from "@/lib/kolom-komi/sound";

export default function MakanPage() {
  const { state, beriMakan } = useKolomKomi();
  const [pesan, setPesan] = useState<string | null>(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [drag, setDrag] = useState<{ food: Food; x: number; y: number } | null>(null);
  const [nyam, setNyam] = useState<{ teks: string } | null>(null);
  const mouthRef = useRef<HTMLDivElement>(null);
  const info = useRef<{ food: Food | null; sx: number; sy: number; active: boolean }>({
    food: null,
    sx: 0,
    sy: 0,
    active: false,
  });

  if (!state) return <Loader />;

  const beri = (food: Food) => {
    const r = beriMakan(food.id);
    setPesan(r.pesan ?? null);
    setTimeout(() => setPesan(null), 1800);
    if (r.sukses) {
      playSfx("pop");
      setNyam({ teks: `+${food.efek.kenyang} 🍴` });
      setTimeout(() => setNyam(null), 900);
    }
  };

  const onDown = (e: React.PointerEvent, food: Food) => {
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* abaikan (mis. saat disimulasikan) */
    }
    info.current = { food, sx: e.clientX, sy: e.clientY, active: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = info.current;
    if (!d.food) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.active) {
      if (dy < -14 && Math.abs(dy) > Math.abs(dx)) d.active = true;
      else return;
    }
    e.preventDefault();
    setDrag({ food: d.food, x: e.clientX, y: e.clientY });
  };
  const onUp = (e: React.PointerEvent) => {
    const d = info.current;
    if (d.active && d.food) {
      const m = mouthRef.current?.getBoundingClientRect();
      if (m && e.clientX >= m.left && e.clientX <= m.right && e.clientY >= m.top && e.clientY <= m.bottom) {
        beri(d.food);
      }
    }
    info.current = { food: null, sx: 0, sy: 0, active: false };
    setDrag(null);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={KOMI_IMG.makanBg}
        alt=""
        fill
        priority
        sizes="460px"
        className="object-cover object-top"
        onLoad={() => setBgLoaded(true)}
        onError={() => setBgLoaded(true)}
      />
      <SceneOverlay show={!bgLoaded} />

      <Link
        href="/kolom-komi"
        aria-label="Kembali"
        className="absolute left-2.5 top-2.5 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-navy/70 text-white shadow-md backdrop-blur-sm transition active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      {/* Bar Kenyang (oranye) & Mood (pink) — sama seperti home */}
      <NeedBar
        icon={<Utensils className="h-4 w-4" />}
        value={state.kenyang}
        top={BAR_TOP_1}
        fill="linear-gradient(to bottom, #ffd27a, #f08020)"
        badge="linear-gradient(to bottom, #ffbe57, #f08020)"
      />
      <NeedBar
        icon={<Smile className="h-4 w-4" />}
        value={state.mood}
        top={BAR_TOP_2}
        fill="linear-gradient(to bottom, #ff9ecb, #ff3d92)"
        badge="linear-gradient(to bottom, #ff9ecb, #ff3d92)"
      />

      {/* Zona mulut (target) */}
      <div
        ref={mouthRef}
        className={`absolute left-[33%] top-[43%] z-10 h-[12%] w-[34%] rounded-full transition ${
          drag ? "bg-white/20 ring-4 ring-white/60" : ""
        }`}
      />

      {/* Efek "nyam" */}
      <AnimatePresence>
        {nyam ? (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-[42%] z-30 -translate-x-1/2 rounded-full bg-white/95 px-3 py-1 font-display text-sm font-extrabold text-orange shadow-md"
          >
            {nyam.teks}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Balon pesan */}
      <AnimatePresence>
        {pesan ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-[21%] z-30 w-[80%] max-w-xs -translate-x-1/2 rounded-2xl border-2 border-navy/10 bg-white/95 px-4 py-2 text-center font-body text-sm font-medium text-navy shadow-md"
          >
            {pesan}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Carousel makanan — langsung di atas meja */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[37%]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/25 to-transparent" />
        <p className="absolute left-0 right-0 top-1.5 z-10 text-center font-body text-[12px] font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
          Geser & tarik makanan ke mulut Komi 👆
        </p>
        <div className="absolute inset-x-0 bottom-2 top-9 flex touch-pan-x items-center gap-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FOODS.map((f) => (
            <div
              key={f.id}
              onPointerDown={(e) => onDown(e, f)}
              onPointerMove={onMove}
              onPointerUp={onUp}
              className="relative flex w-[140px] shrink-0 cursor-grab touch-pan-x flex-col items-center active:cursor-grabbing"
            >
              {f.badge ? (
                <span className="absolute -top-1 right-2 z-10 rounded-full border border-white bg-gradient-to-b from-[#ffbe57] to-[#f08020] px-1.5 py-0.5 font-display text-[8px] font-extrabold uppercase text-white shadow">
                  {f.badge}
                </span>
              ) : null}
              <Image
                src={f.img!}
                alt={f.nama}
                width={140}
                height={117}
                draggable={false}
                className="pointer-events-none drop-shadow-xl"
              />
              <span className="mt-0.5 font-display text-[12px] font-extrabold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">
                {f.nama}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Makanan melayang saat diseret */}
      {drag ? (
        <Image
          src={drag.food.img!}
          alt=""
          width={170}
          height={142}
          draggable={false}
          style={{ position: "fixed", left: drag.x, top: drag.y, transform: "translate(-50%,-50%)", zIndex: 60, pointerEvents: "none" }}
          className="drop-shadow-2xl"
        />
      ) : null}
    </div>
  );
}

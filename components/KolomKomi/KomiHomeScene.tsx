"use client";

import { useEffect, useRef, useState } from "react";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { SceneOverlay } from "./SceneOverlay";
import { playSfx } from "@/lib/kolom-komi/sound";

// Timing loop scene home.
const IDLE_FIRST = 3000; // jeda diam pertama
const IDLE_LOOP = 5000; // jeda diam berikutnya
const ANIM_MS = 5084; // durasi komi-home.webp
const TERTAWA_MS = 5084; // durasi komi-tertawa.webp

type Phase = "idle" | "anim" | "tertawa";

// Scene home: idle (komi-beranda) 3s → animasi (komi-home) → idle 5s → loop.
// Tap perut Komi → mainkan komi-tertawa sekali → balik ke loop idle.
export function KomiHomeScene() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0); // paksa webp replay dari frame 0
  const [bgLoaded, setBgLoaded] = useState(false);
  const firstIdle = useRef(true);

  // Prefetch animasi biar mulus.
  useEffect(() => {
    [KOMI_IMG.homeAnim, KOMI_IMG.homeTertawa].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Pengatur durasi tiap fase.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "idle") {
      const dur = firstIdle.current ? IDLE_FIRST : IDLE_LOOP;
      firstIdle.current = false;
      t = setTimeout(() => {
        setCycle((c) => c + 1);
        setPhase("anim");
      }, dur);
    } else if (phase === "anim") {
      t = setTimeout(() => setPhase("idle"), ANIM_MS);
    } else {
      // tertawa → selesai → balik idle (lanjut loop normal)
      t = setTimeout(() => setPhase("idle"), TERTAWA_MS);
    }
    return () => clearTimeout(t);
  }, [phase]);

  const tapPerut = () => {
    if (phase === "tertawa") return;
    playSfx("giggle");
    setCycle((c) => c + 1);
    setPhase("tertawa");
  };

  const src =
    phase === "anim" ? KOMI_IMG.homeAnim : phase === "tertawa" ? KOMI_IMG.homeTertawa : KOMI_IMG.homeBeranda;
  const imgKey = phase === "idle" ? "idle" : `${phase}-${cycle}`;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={imgKey}
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
        onLoad={() => setBgLoaded(true)}
        onError={() => setBgLoaded(true)}
      />

      {/* Zona tap perut Komi → tertawa */}
      <button
        type="button"
        aria-label="Sentuh perut Komi"
        onClick={tapPerut}
        className="absolute left-1/2 top-[46%] z-10 h-[24%] w-[42%] -translate-x-1/2 rounded-[40%]"
      />

      <SceneOverlay show={!bgLoaded} />
    </>
  );
}

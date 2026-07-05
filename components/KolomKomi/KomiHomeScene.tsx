"use client";

import { useEffect, useRef, useState } from "react";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";
import { SceneOverlay } from "./SceneOverlay";

// Timing loop scene home: idle statis lalu mainkan animasi, berulang.
const IDLE_FIRST = 3000; // jeda diam pertama
const IDLE_LOOP = 5000; // jeda diam berikutnya
const ANIM_MS = 5084; // durasi komi-home.webp (sekali jalan)

// Scene home: idle (komi-beranda) 3 detik → animasi (komi-home) → idle 5 detik → animasi → loop.
export function KomiHomeScene() {
  const [phase, setPhase] = useState<"idle" | "anim">("idle");
  const [cycle, setCycle] = useState(0); // paksa animasi replay dari frame 0
  const [bgLoaded, setBgLoaded] = useState(false);
  const firstIdle = useRef(true);

  // Prefetch animasi biar mulus.
  useEffect(() => {
    const img = new window.Image();
    img.src = KOMI_IMG.homeAnim;
  }, []);

  // Loop bergantian idle ↔ anim.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "idle") {
      const dur = firstIdle.current ? IDLE_FIRST : IDLE_LOOP;
      firstIdle.current = false;
      t = setTimeout(() => {
        setCycle((c) => c + 1);
        setPhase("anim");
      }, dur);
    } else {
      t = setTimeout(() => setPhase("idle"), ANIM_MS);
    }
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <>
      {phase === "idle" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key="idle"
          src={KOMI_IMG.homeBeranda}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`anim-${cycle}`}
          src={KOMI_IMG.homeAnim}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
        />
      )}
      <SceneOverlay show={!bgLoaded} />
    </>
  );
}

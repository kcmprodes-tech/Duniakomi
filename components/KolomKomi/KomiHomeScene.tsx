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
const FADE_MS = 450; // lama cross-fade antar scene

type Phase = "idle" | "anim" | "tertawa";

function srcFor(phase: Phase) {
  return phase === "anim" ? KOMI_IMG.homeAnim : phase === "tertawa" ? KOMI_IMG.homeTertawa : KOMI_IMG.homeBeranda;
}

// Scene home: idle (komi-beranda) 3s → animasi (komi-home) → idle 5s → loop.
// Tap perut Komi → komi-tertawa sekali → balik loop. Pergantian scene di-cross-fade
// (image lama tetap tampil sampai yang baru muncul) supaya tidak ngeblink.
export function KomiHomeScene() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [bgLoaded, setBgLoaded] = useState(false);
  const firstIdle = useRef(true);

  // Tumpukan layer untuk cross-fade: layer terakhir = paling atas (fade-in).
  const idRef = useRef(0);
  const [layers, setLayers] = useState<{ id: number; src: string }[]>([{ id: 0, src: KOMI_IMG.homeBeranda }]);
  const mounted = useRef(false);

  // Prefetch animasi biar mulus.
  useEffect(() => {
    [KOMI_IMG.homeAnim, KOMI_IMG.homeTertawa].forEach((s) => {
      const img = new window.Image();
      img.src = s;
    });
  }, []);

  // Pengatur durasi tiap fase.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "idle") {
      const dur = firstIdle.current ? IDLE_FIRST : IDLE_LOOP;
      firstIdle.current = false;
      t = setTimeout(() => setPhase("anim"), dur);
    } else if (phase === "anim") {
      t = setTimeout(() => setPhase("idle"), ANIM_MS);
    } else {
      t = setTimeout(() => setPhase("idle"), TERTAWA_MS);
    }
    return () => clearTimeout(t);
  }, [phase]);

  // Tiap ganti fase, dorong layer baru (fade-in) di atas yang lama → cross-fade.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return; // layer awal (beranda) sudah ada
    }
    idRef.current += 1;
    const layer = { id: idRef.current, src: srcFor(phase) };
    setLayers((prev) => [...prev, layer].slice(-2));
  }, [phase]);

  const tapPerut = () => {
    if (phase === "tertawa") return;
    playSfx("giggle");
    setPhase("tertawa");
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes kkSceneFade{from{opacity:0}to{opacity:1}} .kk-scene-fade{animation:kkSceneFade ${FADE_MS}ms ease both}`,
        }}
      />

      {layers.map((l) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={l.id}
          src={l.src}
          alt=""
          className="kk-scene-fade absolute inset-0 h-full w-full object-cover object-top"
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
        />
      ))}

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

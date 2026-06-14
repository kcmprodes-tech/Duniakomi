"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { REAKSI, type AreaKomi } from "@/lib/kolom-komi/reactions";
import { playSfx } from "@/lib/kolom-komi/sound";

// Frame melambai (1.png = diam, 3.png = puncak lambai, 6.png = balik diam).
const WAVE_FRAMES = [1, 2, 3, 4, 5, 6].map((n) => `/komi/spritsheet_lambai/${n}.png`);
// Frame tertawa geli (dipakai saat perut/kaki Komi disentuh).
const LAUGH_FRAMES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
  (n) => `/komi/spritsheet_tertawa/tertawa-${n}.png`
);

// Urutan lambaian: angkat → kibas cakar (wiggle) → turun.
const WAVE_SEQ = [0, 1, 2, 3, 2, 3, 4, 5];
// Urutan tertawa: maju penuh lalu beberapa kali "ngakak" di tengah, lalu reda.
const LAUGH_SEQ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9];

// Zona tap di atas Komi (perkiraan posisi pada pose berdiri).
const ZONES: { id: AreaKomi; className: string }[] = [
  { id: "kepala", className: "left-1/2 top-[6%] h-[24%] w-[42%] -translate-x-1/2" },
  { id: "hidung", className: "left-1/2 top-[28%] h-[14%] w-[26%] -translate-x-1/2" },
  { id: "perut", className: "left-1/2 top-[44%] h-[30%] w-[50%] -translate-x-1/2" },
  { id: "kaki", className: "bottom-[2%] left-1/2 h-[20%] w-[54%] -translate-x-1/2" },
];

type Active = { set: "wave" | "laugh"; frame: number };

export function KomiWave({
  size = 378,
  accessory,
  onReaksi,
}: {
  size?: number;
  accessory?: string;
  onReaksi?: (teks: string) => void;
}) {
  const { elus } = useKolomKomi();
  const [active, setActive] = useState<Active>({ set: "wave", frame: 0 });
  const laughingRef = useRef(false);
  const laughTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Idle diam; tiap beberapa detik mainkan satu lambaian. Loop SELALU dijadwalkan
  // ulang (termasuk saat di-interupsi tertawa) supaya lambaian tak pernah berhenti.
  useEffect(() => {
    let mounted = true;
    let stepT: ReturnType<typeof setTimeout>;
    let loopT: ReturnType<typeof setTimeout>;

    const jadwalkan = (delay: number) => {
      loopT = setTimeout(mainkan, delay);
    };

    const mainkan = () => {
      if (!mounted) return;
      if (laughingRef.current) {
        jadwalkan(2000); // sedang tertawa → coba lagi nanti, jangan matikan loop
        return;
      }
      let i = 0;
      const step = () => {
        if (!mounted) return;
        if (laughingRef.current) {
          jadwalkan(2000); // tertawa menyela di tengah lambai → reschedule, bukan berhenti
          return;
        }
        if (i < WAVE_SEQ.length) {
          setActive({ set: "wave", frame: WAVE_SEQ[i] });
          i += 1;
          stepT = setTimeout(step, 120);
        } else {
          setActive({ set: "wave", frame: 0 });
          jadwalkan(5000);
        }
      };
      step();
    };

    jadwalkan(3000);
    return () => {
      mounted = false;
      clearTimeout(stepT);
      clearTimeout(loopT);
    };
  }, []);

  // Bersihkan timer tawa saat unmount.
  useEffect(() => () => clearTimeout(laughTimer.current), []);

  // Mainkan animasi tertawa sekali, lalu kembali ke pose diam.
  const tertawa = () => {
    clearTimeout(laughTimer.current);
    laughingRef.current = true;
    let i = 0;
    const run = () => {
      if (i < LAUGH_SEQ.length) {
        setActive({ set: "laugh", frame: LAUGH_SEQ[i] });
        i += 1;
        laughTimer.current = setTimeout(run, 90);
      } else {
        laughingRef.current = false;
        setActive({ set: "wave", frame: 0 });
      }
    };
    run();
  };

  const tap = (id: AreaKomi) => {
    elus();
    onReaksi?.(REAKSI[id]);
    // Perut & kaki = titik geli → Komi tertawa.
    if (id === "perut" || id === "kaki") {
      tertawa();
      playSfx("giggle");
    } else {
      playSfx("pop");
    }
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {WAVE_FRAMES.map((src, i) => (
        <Image
          key={`w${i}`}
          src={src}
          alt="Komi"
          fill
          unoptimized
          priority={i === 0}
          sizes="420px"
          className={`object-contain object-bottom drop-shadow-xl ${
            active.set === "wave" && active.frame === i ? "" : "invisible"
          }`}
        />
      ))}

      {LAUGH_FRAMES.map((src, i) => (
        <Image
          key={`l${i}`}
          src={src}
          alt=""
          fill
          unoptimized
          sizes="420px"
          className={`object-contain object-bottom drop-shadow-xl ${
            active.set === "laugh" && active.frame === i ? "" : "invisible"
          }`}
        />
      ))}

      {accessory ? (
        <span className="absolute left-1/2 top-[2%] -translate-x-1/2 text-3xl drop-shadow">
          {accessory}
        </span>
      ) : null}

      {ZONES.map((z) => (
        <button
          key={z.id}
          type="button"
          aria-label={`Sentuh ${z.id} Komi`}
          onClick={() => tap(z.id)}
          className={`absolute ${z.className} cursor-pointer rounded-full`}
        />
      ))}
    </div>
  );
}

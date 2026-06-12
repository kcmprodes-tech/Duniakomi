"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { REAKSI, type AreaKomi } from "@/lib/kolom-komi/reactions";

// Frame melambai dari folder spritsheet_lambai (1.png = diam, 3.png = puncak lambai, 6.png = balik diam).
const FRAMES = [1, 2, 3, 4, 5, 6].map((n) => `/komi/spritsheet_lambai/${n}.png`);

// Zona tap di atas Komi (perkiraan posisi pada pose berdiri).
const ZONES: { id: AreaKomi; className: string }[] = [
  { id: "kepala", className: "left-1/2 top-[6%] h-[24%] w-[42%] -translate-x-1/2" },
  { id: "hidung", className: "left-1/2 top-[28%] h-[14%] w-[26%] -translate-x-1/2" },
  { id: "perut", className: "left-1/2 top-[44%] h-[30%] w-[50%] -translate-x-1/2" },
  { id: "kaki", className: "bottom-[2%] left-1/2 h-[20%] w-[54%] -translate-x-1/2" },
];

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
  const [frame, setFrame] = useState(0); // 0 = diam (frame 1)

  // Diam; tiap 5 detik mainkan satu lambaian (frame 1→6) lalu kembali diam.
  useEffect(() => {
    let mounted = true;
    let stepT: ReturnType<typeof setTimeout>;
    let loopT: ReturnType<typeof setTimeout>;

    const lambai = () => {
      let i = 0;
      const run = () => {
        if (!mounted) return;
        if (i < FRAMES.length) {
          setFrame(i);
          i += 1;
          stepT = setTimeout(run, 110);
        } else {
          setFrame(0); // kembali ke pose diam
          loopT = setTimeout(lambai, 5000);
        }
      };
      run();
    };

    loopT = setTimeout(lambai, 5000); // lambaian pertama setelah 5 detik idle
    return () => {
      mounted = false;
      clearTimeout(stepT);
      clearTimeout(loopT);
    };
  }, []);

  const tap = (id: AreaKomi) => {
    elus();
    onReaksi?.(REAKSI[id]);
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Semua frame ditumpuk (preload); hanya frame aktif yang terlihat */}
      {FRAMES.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt="Komi"
          fill
          unoptimized
          priority={i === 0}
          sizes="420px"
          className={`object-contain object-bottom drop-shadow-xl ${
            i === frame ? "" : "invisible"
          }`}
        />
      ))}

      {accessory ? (
        <span className="absolute left-1/2 top-[2%] -translate-x-1/2 text-3xl drop-shadow">
          {accessory}
        </span>
      ) : null}

      {/* Zona sentuh */}
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

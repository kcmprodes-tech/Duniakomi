"use client";

import { useEffect, useState } from "react";
import { KomiWave } from "./KomiWave";
import { KomiRive } from "./KomiRive";

type Props = { size?: number; accessory?: string; onReaksi?: (teks: string) => void };

// Pakai animasi Rive kalau public/komi/komi.riv tersedia.
// Selama belum ada, fallback ke animasi frame (KomiWave) — jadi home tetap aman.
export function KomiStage(props: Props) {
  const [hasRiv, setHasRiv] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("/komi/komi.riv", { method: "HEAD" })
      .then((r) => {
        if (mounted) setHasRiv(r.ok);
      })
      .catch(() => {
        if (mounted) setHasRiv(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return hasRiv ? <KomiRive {...props} /> : <KomiWave {...props} />;
}

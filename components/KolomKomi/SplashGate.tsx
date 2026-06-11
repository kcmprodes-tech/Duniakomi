"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { Splash } from "./Splash";

// Tampilkan splash sekali saat masuk area game, lalu tampilkan isi game.
export function SplashGate({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {children}
      <AnimatePresence>
        {loading ? <Splash key="splash" onDone={() => setLoading(false)} /> : null}
      </AnimatePresence>
    </>
  );
}

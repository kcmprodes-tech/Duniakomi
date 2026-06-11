"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { StatusBars } from "@/components/KolomKomi/StatusBars";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ElusPage() {
  const { state, elus } = useKolomKomi();
  const [pesan, setPesan] = useState("Komi pengin dielus nih. Ayo dong~ 💗");
  // Tiap elus, tambah satu hati melayang (pakai id unik untuk animasi).
  const [hearts, setHearts] = useState<number[]>([]);

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;

  const handle = () => {
    elus();
    setPesan("Hehe, Komi seneng banget dielus. Makasih ya! 💗");
    setHearts((h) => [...h, h.length]);
  };

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      <ScreenHeader title="Elus Komi" />

      <div className="relative flex flex-col items-center gap-3 pt-2">
        <SpeechBubble>{pesan}</SpeechBubble>
        <KomiCharacter mood="happy" size={220} accessory={equipped?.emoji} />

        {/* Hati melayang */}
        <AnimatePresence>
          {hearts.map((id) => (
            <motion.span
              key={id}
              initial={{ opacity: 0, y: 40, scale: 0.5 }}
              animate={{ opacity: 1, y: -60, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              onAnimationComplete={() => setHearts((h) => h.filter((x) => x !== id))}
              className="pointer-events-none absolute bottom-16 text-3xl"
            >
              💗
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <Card>
        <StatusBars kenyang={state.kenyang} mood={state.mood} update={state.update} />
      </Card>

      <Button onClick={handle} className="w-full py-3 text-base">
        ✋ Elus Komi
      </Button>
    </div>
  );
}

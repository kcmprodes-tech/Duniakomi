"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { StatusBars } from "@/components/KolomKomi/StatusBars";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";
import { GameButton } from "@/components/ui/kit";

export default function TidurPage() {
  const { state, tidurin } = useKolomKomi();
  const [pesan, setPesan] = useState(
    "Komi agak ngantuk… ajak tidur yuk biar energinya pulih. 🛏️"
  );

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;
  const handle = () => setPesan(tidurin().pesan ?? "");

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      <ScreenHeader title="Tidurin Komi" />

      <div className="flex flex-col items-center gap-3 pt-1">
        <SpeechBubble>{pesan}</SpeechBubble>
        <div className="relative">
          <KomiCharacter mood="none" size={190} accessory={equipped?.emoji} />
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute right-0 top-2 font-display text-2xl font-extrabold text-kompas"
              animate={{ y: [-2, -30], opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
            >
              z
            </motion.span>
          ))}
        </div>
      </div>

      <Card>
        <StatusBars
          kenyang={state.kenyang}
          mood={state.mood}
          energy={state.energy}
          update={state.update}
        />
      </Card>

      <GameButton onClick={handle} className="w-full">
        🛏️ Tidurin Komi
      </GameButton>
    </div>
  );
}

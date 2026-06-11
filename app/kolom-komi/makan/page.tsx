"use client";

import { useState } from "react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { StatusBars } from "@/components/KolomKomi/StatusBars";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function MakanPage() {
  const { state, beriMakan } = useKolomKomi();
  const [pesan, setPesan] = useState("Komi laper nih, kasih ikan dong, Pak/Bu!");

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;

  const handle = () => {
    if (state.kenyang >= 95) {
      setPesan("Komi udah kenyang banget, makasih ya! 😸");
      return;
    }
    beriMakan();
    setPesan("Nyam nyam! Makasih, jadi semangat nih. 🐟");
  };

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      <ScreenHeader title="Kasih Makan" />

      <div className="flex flex-col items-center gap-3 pt-2">
        <SpeechBubble>{pesan}</SpeechBubble>
        <KomiCharacter mood="happy" size={220} accessory={equipped?.emoji} />
      </div>

      <Card>
        <StatusBars kenyang={state.kenyang} mood={state.mood} update={state.update} />
      </Card>

      <Button onClick={handle} className="w-full py-3 text-base">
        🐟 Kasih Makan Komi
      </Button>
    </div>
  );
}

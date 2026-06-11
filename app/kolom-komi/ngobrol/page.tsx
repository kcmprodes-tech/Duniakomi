"use client";

import { useState } from "react";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { NGOBROL, BALASAN_KOMI, acak } from "@/lib/kolom-komi/dialog";
import { cariOutfit } from "@/lib/kolom-komi/items";
import { ScreenHeader } from "@/components/KolomKomi/ScreenHeader";
import { KomiCharacter } from "@/components/KolomKomi/KomiCharacter";
import { SpeechBubble } from "@/components/KolomKomi/SpeechBubble";
import { Loader } from "@/components/KolomKomi/Loader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NgobrolPage() {
  const { state, ngobrol } = useKolomKomi();
  const [dlg, setDlg] = useState(() => acak(NGOBROL));
  const [balas, setBalas] = useState<string | null>(null);

  if (!state) return <Loader />;

  const equipped = state.equippedItem ? cariOutfit(state.equippedItem) : undefined;

  const pilih = () => {
    if (balas) return;
    ngobrol();
    setBalas(acak(BALASAN_KOMI));
  };

  const lagi = () => {
    setDlg(acak(NGOBROL));
    setBalas(null);
  };

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-6">
      <ScreenHeader title="Ngobrol" />

      <div className="flex flex-col items-center gap-3 pt-2">
        <SpeechBubble>{balas ?? dlg.komi}</SpeechBubble>
        <KomiCharacter mood={balas ? "happy" : "bob"} size={210} accessory={equipped?.emoji} />
      </div>

      <Card>
        {!balas ? (
          <div className="flex flex-col gap-2">
            {dlg.pilihan.map((p) => (
              <Button key={p} variant="outline" className="w-full justify-start" onClick={pilih}>
                {p}
              </Button>
            ))}
          </div>
        ) : (
          <Button className="w-full" onClick={lagi}>
            💬 Ngobrol lagi
          </Button>
        )}
      </Card>
    </div>
  );
}

"use client";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { REAKSI } from "@/lib/kolom-komi/reactions";

// KONTRAK file rig (yang dibuat di editor Rive, taruh di public/komi/komi.riv):
// - State Machine bernama "State Machine 1" (default Rive) berisi animasi idle/napas + lambai.
// - (Opsional) trigger input bernama "tap" → dipicu saat Komi disentuh (mis. animasi senang).
const STATE_MACHINE = "State Machine 1";

export function KomiRive({
  size = 378,
  accessory,
  onReaksi,
}: {
  size?: number;
  accessory?: string;
  onReaksi?: (teks: string) => void;
}) {
  const { elus } = useKolomKomi();
  const { rive, RiveComponent } = useRive({
    src: "/komi/komi.riv",
    stateMachines: STATE_MACHINE,
    autoplay: true,
  });
  const tapInput = useStateMachineInput(rive, STATE_MACHINE, "tap");

  const handleTap = () => {
    elus();
    onReaksi?.(REAKSI.kepala);
    tapInput?.fire();
  };

  return (
    <div
      className="relative cursor-pointer"
      style={{ width: size, height: size }}
      onClick={handleTap}
      role="button"
      aria-label="Sentuh Komi"
    >
      <RiveComponent />
      {accessory ? (
        <span className="pointer-events-none absolute left-1/2 top-[2%] -translate-x-1/2 text-3xl drop-shadow">
          {accessory}
        </span>
      ) : null}
    </div>
  );
}

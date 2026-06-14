"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useKolomKomi } from "@/lib/kolom-komi/state";
import { ActionScreen } from "@/components/KolomKomi/ActionScreen";
import { Loader } from "@/components/KolomKomi/Loader";
import { GameButton, Panel, Toggle } from "@/components/ui/kit";
import { getAudio, setMusic, setSfx } from "@/lib/kolom-komi/sound";
import { resetOnboarding } from "@/components/KolomKomi/Onboarding";

export default function SettingPage() {
  const { state, reset } = useKolomKomi();
  const router = useRouter();
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [pesan, setPesan] = useState("");
  const [sfx, setSfxOn] = useState(true);
  const [musik, setMusikOn] = useState(false);

  // Sinkronkan posisi toggle dengan setting audio tersimpan (setelah mount).
  useEffect(() => {
    const a = getAudio();
    setSfxOn(a.sfx);
    setMusikOn(a.musik);
  }, []);

  if (!state) return <Loader />;

  const lakukanReset = () => {
    reset();
    setKonfirmasi(false);
    setPesan("Progres Komi sudah direset. 🔄");
  };

  return (
    <ActionScreen title="Pengaturan" koin={state.koin}>
      <div className="pt-5" />

      <Panel title="Suara">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm font-semibold text-navy">Efek Suara</span>
            <Toggle on={sfx} onChange={(v) => { setSfxOn(v); setSfx(v); }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm font-semibold text-navy">Musik Latar</span>
            <Toggle on={musik} onChange={(v) => { setMusikOn(v); setMusic(v); }} />
          </div>
          <p className="font-body text-[11px] text-gray-text">
            Suara dibuat sederhana langsung dari aplikasi (belum pakai musik/efek asli).
          </p>
        </div>
      </Panel>

      <div className="pt-3" />

      <Panel title="Lainnya">
        <GameButton variant="info" className="w-full" onClick={() => { resetOnboarding(); router.push("/kolom-komi"); }}>
          Lihat ulang perkenalan
        </GameButton>
      </Panel>

      <div className="pt-3" />

      <Panel title="Progres">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-body text-sm font-semibold text-navy">
            Streak {state.streak} hari · {state.koin} Koin
          </p>

          {konfirmasi ? (
            <>
              <p className="font-body text-sm text-gray-text">
                Yakin reset semua progres Komi? Tindakan ini tidak bisa dibatalkan.
              </p>
              <div className="flex w-full gap-2">
                <GameButton variant="danger" className="flex-1" onClick={lakukanReset}>
                  Ya, reset
                </GameButton>
                <GameButton variant="secondary" className="flex-1" onClick={() => setKonfirmasi(false)}>
                  Batal
                </GameButton>
              </div>
            </>
          ) : (
            <GameButton variant="danger" className="w-full" onClick={() => setKonfirmasi(true)}>
              Reset Progres
            </GameButton>
          )}

          {pesan ? (
            <p className="font-body text-sm font-bold" style={{ color: "#4ea62e" }}>
              {pesan}
            </p>
          ) : null}
        </div>
      </Panel>

      <p className="mt-2 text-center font-body text-xs text-navy/40">Kolom Komi · prototipe v1</p>
    </ActionScreen>
  );
}

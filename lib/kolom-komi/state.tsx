"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { HasilAksi, KomiState, OutfitId } from "./types";
import { cariOutfit } from "./items";

const STORAGE_KEY = "kolom-komi-v1";

/** Batasi angka ke rentang 0–100. */
const clamp = (n: number) => Math.max(0, Math.min(100, n));

/** Tanggal lokal dalam format YYYY-MM-DD. */
function tanggalStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function stateAwal(now: Date): KomiState {
  return {
    kenyang: 70,
    mood: 70,
    update: 45,
    koin: 10,
    ownedItems: [],
    equippedItem: null,
    streak: 1,
    lastVisitISO: now.toISOString(),
    lastReadDates: {},
  };
}

// Terapkan peluruhan (decay) berdasar waktu yang berlalu sejak kunjungan terakhir,
// lalu perbarui streak harian. Inilah yang bikin Komi "butuh" dikunjungi tiap hari.
function terapkanWaktuBerlalu(state: KomiState, now: Date): KomiState {
  const last = new Date(state.lastVisitISO);
  const jam = Math.max(0, (now.getTime() - last.getTime()) / 3_600_000);

  const hasil: KomiState = {
    ...state,
    kenyang: clamp(state.kenyang - jam * 2),
    mood: clamp(state.mood - jam * 1.5),
    update: clamp(state.update - jam * 2.5),
    lastVisitISO: now.toISOString(),
  };

  // Streak: bandingkan tanggal kalender kunjungan terakhir vs sekarang.
  const hariLalu = tanggalStr(last);
  const hariIni = tanggalStr(now);
  if (hariLalu !== hariIni) {
    const selisihHari = Math.round(
      (new Date(hariIni).getTime() - new Date(hariLalu).getTime()) / 86_400_000
    );
    hasil.streak = selisihHari === 1 ? state.streak + 1 : 1;
  }
  return hasil;
}

interface KomiContextValue {
  /** null selama belum di-hydrate dari localStorage (render awal di server/klien). */
  state: KomiState | null;
  beriMakan: () => void;
  elus: () => void;
  ngobrol: () => void;
  bacaBerita: (beritaId: string) => HasilAksi;
  beliItem: (id: OutfitId) => HasilAksi;
  pakaiItem: (id: OutfitId | null) => void;
  reset: () => void;
}

const KomiContext = createContext<KomiContextValue | null>(null);

export function KolomKomiProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<KomiState | null>(null);

  // Muat dari localStorage saat komponen mount (hanya di browser).
  useEffect(() => {
    const now = new Date();
    let loaded: KomiState;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      loaded = raw
        ? terapkanWaktuBerlalu(JSON.parse(raw) as KomiState, now)
        : stateAwal(now);
    } catch {
      loaded = stateAwal(now);
    }
    setState(loaded);
  }, []);

  // Simpan setiap kali state berubah.
  useEffect(() => {
    if (!state) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* abaikan kalau kuota penuh / mode privat */
    }
  }, [state]);

  const beriMakan = () =>
    setState((s) =>
      s ? { ...s, kenyang: clamp(s.kenyang + 18), mood: clamp(s.mood + 4) } : s
    );

  const elus = () =>
    setState((s) => (s ? { ...s, mood: clamp(s.mood + 12) } : s));

  const ngobrol = () =>
    setState((s) => (s ? { ...s, mood: clamp(s.mood + 8) } : s));

  const bacaBerita = (beritaId: string): HasilAksi => {
    if (!state) return { sukses: false };
    const hariIni = tanggalStr(new Date());
    if (state.lastReadDates[beritaId] === hariIni) {
      return { sukses: false, pesan: "Berita ini sudah dibaca hari ini. Besok lagi ya!" };
    }
    setState((s) =>
      s
        ? {
            ...s,
            update: clamp(s.update + 22),
            koin: s.koin + 5,
            lastReadDates: { ...s.lastReadDates, [beritaId]: hariIni },
          }
        : s
    );
    return { sukses: true, pesan: "+22 Update, dapat 5 Koin Ikan! 🐟" };
  };

  const beliItem = (id: OutfitId): HasilAksi => {
    if (!state) return { sukses: false };
    const outfit = cariOutfit(id);
    if (!outfit) return { sukses: false, pesan: "Item tidak ditemukan." };
    if (outfit.comingSoon)
      return { sukses: false, pesan: "Item ini belum tersedia. Coming soon!" };
    if (state.ownedItems.includes(id))
      return { sukses: false, pesan: "Kostum ini sudah dimiliki." };
    if (state.koin < outfit.harga)
      return { sukses: false, pesan: "Koin Ikan belum cukup. Baca berita dulu yuk!" };

    setState((s) =>
      s ? { ...s, koin: s.koin - outfit.harga, ownedItems: [...s.ownedItems, id] } : s
    );
    return { sukses: true, pesan: `${outfit.nama} berhasil dibeli! 🎉` };
  };

  const pakaiItem = (id: OutfitId | null) =>
    setState((s) => (s ? { ...s, equippedItem: id } : s));

  const reset = () => setState(stateAwal(new Date()));

  return (
    <KomiContext.Provider
      value={{ state, beriMakan, elus, ngobrol, bacaBerita, beliItem, pakaiItem, reset }}
    >
      {children}
    </KomiContext.Provider>
  );
}

export function useKolomKomi(): KomiContextValue {
  const ctx = useContext(KomiContext);
  if (!ctx) {
    throw new Error("useKolomKomi harus dipakai di dalam <KolomKomiProvider>");
  }
  return ctx;
}

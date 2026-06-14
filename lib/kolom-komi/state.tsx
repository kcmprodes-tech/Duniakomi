"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { HasilAksi, KomiState, OutfitId, ToastInfo, Transaksi } from "./types";
import { cariOutfit } from "./items";
import { cariFood } from "./foods";
import { HADIAH_CHECKIN } from "./checkin";
import { playSfx, ensureMusic } from "./sound";

const STORAGE_KEY = "kolom-komi-v1";

/** Batasi angka ke rentang 0–100. */
const clamp = (n: number) => Math.max(0, Math.min(100, n));

/** Tanggal lokal dalam format YYYY-MM-DD. */
function tanggalStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

// Catat satu transaksi koin: kembalikan field riwayat + total yang terupdate.
function transaksiBaru(
  s: KomiState,
  jumlah: number,
  label: string
): Pick<KomiState, "riwayat" | "totalDapat" | "totalBelanja"> {
  const entri: Transaksi = { t: new Date().toISOString(), jumlah, label };
  return {
    riwayat: [entri, ...(s.riwayat ?? [])].slice(0, 50),
    totalDapat: (s.totalDapat ?? 0) + (jumlah > 0 ? jumlah : 0),
    totalBelanja: (s.totalBelanja ?? 0) + (jumlah < 0 ? -jumlah : 0),
  };
}

function stateAwal(now: Date): KomiState {
  return {
    kenyang: 70,
    mood: 70,
    update: 45,
    energy: 70,
    koin: 10,
    ownedItems: [],
    equippedItem: null,
    streak: 1,
    lastVisitISO: now.toISOString(),
    lastReadDates: {},
    checkins: [],
    totalDapat: 0,
    totalBelanja: 0,
    riwayat: [],
  };
}

// Terapkan peluruhan (decay) berdasar waktu sejak kunjungan terakhir,
// lalu perbarui streak harian. Inilah yang bikin Komi "butuh" dikunjungi tiap hari.
function terapkanWaktuBerlalu(state: KomiState, now: Date): KomiState {
  const last = new Date(state.lastVisitISO);
  const jam = Math.max(0, (now.getTime() - last.getTime()) / 3_600_000);

  const hasil: KomiState = {
    ...state,
    kenyang: clamp(state.kenyang - jam * 2),
    mood: clamp(state.mood - jam * 1.5),
    update: clamp(state.update - jam * 2.5),
    energy: clamp((state.energy ?? 70) - jam * 1.8),
    checkins: state.checkins ?? [],
    totalDapat: state.totalDapat ?? 0,
    totalBelanja: state.totalBelanja ?? 0,
    riwayat: state.riwayat ?? [],
    lastVisitISO: now.toISOString(),
  };

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
  /** null selama belum di-hydrate dari localStorage. */
  state: KomiState | null;
  /** Beri makan dengan makanan tertentu (efek beda per makanan). */
  beriMakan: (foodId: string) => HasilAksi;
  /** Elus Komi (dipakai Gesture System) — Mood naik sedikit. */
  elus: () => void;
  /** Tidurin Komi — pulihkan Energy. */
  tidurin: () => HasilAksi;
  /** Reward setelah main mini-game: koin sesuai skor + mood naik. */
  selesaiMain: (skor: number) => HasilAksi;
  bacaBerita: (beritaId: string) => HasilAksi;
  /** Dipanggil saat user selesai baca artikel (scroll sampai habis di in-app browser).
   *  Memberi reward artikel + auto check-in harian (kalau belum), lalu kembalikan info toast. */
  selesaiBaca: (beritaId: string) => ToastInfo;
  claimCheckin: () => HasilAksi;
  beliItem: (id: OutfitId) => HasilAksi;
  pakaiItem: (id: OutfitId | null) => void;
  reset: () => void;
}

const KomiContext = createContext<KomiContextValue | null>(null);

export function KolomKomiProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<KomiState | null>(null);

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

  useEffect(() => {
    if (!state) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* abaikan kalau kuota penuh / mode privat */
    }
  }, [state]);

  // Nyalakan musik latar (kalau di-set on) setelah interaksi pertama user.
  useEffect(() => {
    const handler = () => ensureMusic();
    window.addEventListener("pointerdown", handler, { once: true });
    return () => window.removeEventListener("pointerdown", handler);
  }, []);

  const beriMakan = (foodId: string): HasilAksi => {
    if (!state) return { sukses: false };
    const food = cariFood(foodId);
    if (!food) return { sukses: false, pesan: "Makanan tidak ditemukan." };
    if (state.kenyang >= 98) {
      return { sukses: false, pesan: "Komi udah kenyang banget, makasih ya! 😸" };
    }
    setState((s) =>
      s
        ? {
            ...s,
            kenyang: clamp(s.kenyang + food.efek.kenyang),
            mood: clamp(s.mood + food.efek.mood),
          }
        : s
    );
    return { sukses: true, pesan: `Nyam! ${food.nama} enak banget. 😋` };
  };

  const elus = () =>
    setState((s) => (s ? { ...s, mood: clamp(s.mood + 6) } : s));

  const tidurin = (): HasilAksi => {
    if (!state) return { sukses: false };
    if (state.energy >= 98) {
      return { sukses: false, pesan: "Komi udah segar bugar, nggak ngantuk. 😺" };
    }
    setState((s) =>
      s ? { ...s, energy: clamp(s.energy + 55), mood: clamp(s.mood + 4) } : s
    );
    return { sukses: true, pesan: "Zzz… Komi tidur nyenyak. Energy pulih! 🛏️" };
  };

  const selesaiMain = (skor: number): HasilAksi => {
    if (!state) return { sukses: false };
    const koinDapat = Math.max(0, Math.round(skor));
    if (koinDapat > 0) playSfx("win");
    setState((s) => {
      if (!s) return s;
      const tambahan = koinDapat > 0 ? transaksiBaru(s, koinDapat, "Main mini-game") : {};
      return {
        ...s,
        koin: s.koin + koinDapat,
        mood: clamp(s.mood + Math.min(12, 4 + skor / 4)),
        ...tambahan,
      };
    });
    return {
      sukses: true,
      pesan:
        koinDapat > 0
          ? `Seru! Dapat ${koinDapat} Koin`
          : "Yah, belum dapat koin. Coba lagi ya!",
    };
  };

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
            ...transaksiBaru(s, 5, "Baca berita"),
          }
        : s
    );
    playSfx("coin");
    return { sukses: true, pesan: "+22 Update, dapat 5 Koin!" };
  };

  const claimCheckin = (): HasilAksi => {
    if (!state) return { sukses: false };
    const today = tanggalStr(new Date());
    if (state.checkins.includes(today)) {
      return { sukses: false, pesan: "Sudah check-in hari ini. Besok lagi ya!" };
    }
    const sudahBaca = Object.values(state.lastReadDates).includes(today);
    if (!sudahBaca) {
      return { sukses: false, pesan: "Baca minimal 1 berita dulu buat check-in hari ini." };
    }
    const pos = state.checkins.length % 7;
    const hadiah = HADIAH_CHECKIN[pos];
    setState((s) =>
      s
        ? {
            ...s,
            checkins: [...s.checkins, today],
            koin: s.koin + hadiah,
            mood: clamp(s.mood + 4),
            ...transaksiBaru(s, hadiah, "Check-in harian"),
          }
        : s
    );
    playSfx("success");
    return { sukses: true, pesan: `Check-in Hari ke-${pos + 1}! +${hadiah} Koin` };
  };

  const selesaiBaca = (beritaId: string): ToastInfo => {
    if (!state) return { tipe: "sudah", pesan: "" };
    const today = tanggalStr(new Date());
    const sudahArtikel = state.lastReadDates[beritaId] === today;
    const sudahCheckin = state.checkins.includes(today);

    let info: ToastInfo;
    if (!sudahCheckin) {
      const pos = state.checkins.length % 7;
      const koinTotal = HADIAH_CHECKIN[pos] + (sudahArtikel ? 0 : 5);
      info = {
        tipe: "checkin",
        pesan: `Daily check-in Hari ke-${pos + 1} berhasil! +${koinTotal} Koin 🔥`,
      };
    } else if (!sudahArtikel) {
      info = { tipe: "bonus", pesan: "Mantap, +22 Update & +5 Koin!" };
    } else {
      info = { tipe: "sudah", pesan: "Artikel ini sudah kamu baca hari ini 😉" };
    }

    setState((s) => {
      if (!s) return s;
      let next = s;
      let riwayat = s.riwayat ?? [];
      let totalDapat = s.totalDapat ?? 0;
      const nowIso = new Date().toISOString();

      if (!sudahArtikel) {
        next = {
          ...next,
          update: clamp(next.update + 22),
          koin: next.koin + 5,
          lastReadDates: { ...next.lastReadDates, [beritaId]: today },
        };
        riwayat = [{ t: nowIso, jumlah: 5, label: "Baca berita" }, ...riwayat];
        totalDapat += 5;
      }
      if (!sudahCheckin) {
        const pos = next.checkins.length % 7;
        const hadiah = HADIAH_CHECKIN[pos];
        next = {
          ...next,
          checkins: [...next.checkins, today],
          koin: next.koin + hadiah,
          mood: clamp(next.mood + 4),
        };
        riwayat = [{ t: nowIso, jumlah: hadiah, label: `Check-in hari ke-${pos + 1}` }, ...riwayat];
        totalDapat += hadiah;
      }
      next = { ...next, riwayat: riwayat.slice(0, 50), totalDapat };
      return next;
    });

    if (info.tipe !== "sudah") playSfx("success");
    return info;
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
      return { sukses: false, pesan: "Koin belum cukup. Baca berita dulu yuk!" };

    setState((s) =>
      s
        ? {
            ...s,
            koin: s.koin - outfit.harga,
            ownedItems: [...s.ownedItems, id],
            ...transaksiBaru(s, -outfit.harga, `Beli ${outfit.nama}`),
          }
        : s
    );
    return { sukses: true, pesan: `${outfit.nama} berhasil dibeli! 🎉` };
  };

  const pakaiItem = (id: OutfitId | null) =>
    setState((s) => (s ? { ...s, equippedItem: id } : s));

  const reset = () => setState(stateAwal(new Date()));

  return (
    <KomiContext.Provider
      value={{
        state,
        beriMakan,
        elus,
        tidurin,
        selesaiMain,
        bacaBerita,
        selesaiBaca,
        claimCheckin,
        beliItem,
        pakaiItem,
        reset,
      }}
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

import type { KomiState } from "./types";

// Hadiah Koin untuk check-in Hari ke-1 sampai ke-7 (naik bertahap, hari ke-7 jackpot).
export const HADIAH_CHECKIN = [5, 8, 10, 12, 15, 25, 50];

/** Tanggal hari ini (lokal) format YYYY-MM-DD. */
export function tanggalHariIni(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/** Apakah user sudah baca minimal 1 berita hari ini? (syarat check-in) */
export function sudahBacaHariIni(state: KomiState): boolean {
  return Object.values(state.lastReadDates).includes(tanggalHariIni());
}

/** Apakah hari ini sudah check-in? */
export function sudahCheckinHariIni(state: KomiState): boolean {
  return state.checkins.includes(tanggalHariIni());
}

/** Index (0–6) sel "Hari ke-N" yang jadi target hari ini dalam siklus 7 hari. */
export function indexSiklus(state: KomiState): number {
  return state.checkins.length % 7;
}

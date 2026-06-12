// Tipe data game "Kolom Komi" — disimpan di localStorage browser (tanpa server).

export type OutfitId = "peci" | "jas" | "agustusan" | "ramadan";

export interface KomiState {
  /** Tingkat kenyang Komi, 0–100 */
  kenyang: number;
  /** Suasana hati Komi, 0–100 */
  mood: number;
  /** Seberapa update Komi soal berita, 0–100 — fitur signature (naik dengan Baca Bareng) */
  update: number;
  /** Energi Komi, 0–100 — turun seiring waktu, dipulihkan dengan Tidurin */
  energy: number;
  /** Koin Ikan — didapat dari baca berita, dipakai beli kostum */
  koin: number;
  /** Daftar id kostum yang sudah dimiliki */
  ownedItems: OutfitId[];
  /** Kostum yang sedang dipakai (null = tanpa kostum) */
  equippedItem: OutfitId | null;
  /** Jumlah hari kunjungan berturut-turut */
  streak: number;
  /** Waktu kunjungan terakhir (ISO string) — dasar perhitungan peluruhan & streak */
  lastVisitISO: string;
  /** Tanggal terakhir tiap berita dibaca: { [beritaId]: "YYYY-MM-DD" } */
  lastReadDates: Record<string, string>;
  /** Tanggal-tanggal (YYYY-MM-DD) yang sudah check-in harian (klaim hadiah) */
  checkins: string[];
}

/** Hasil sebuah aksi yang bisa gagal (mis. beli item, baca berita). */
export interface HasilAksi {
  sukses: boolean;
  pesan?: string;
}

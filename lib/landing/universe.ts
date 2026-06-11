// Data teaser karakter universe untuk section "Coming Later".
// Diambil dari docs/karakter-universe.md. Belum ada art → tampil sebagai siluet.

export interface KarakterTeaser {
  nama: string;
  kategori: string;
  fase: string;
  /** emoji sementara (ditampilkan samar sebagai siluet) */
  emoji: string;
  /** gradient latar lingkaran siluet (Tailwind) */
  warna: string;
}

export const UNIVERSE: KarakterTeaser[] = [
  { nama: "Bu Mia", kategori: "Lifestyle · Kuliner · Keluarga", fase: "Fase 2", emoji: "🐈", warna: "from-rose-200 to-rose-100" },
  { nama: "Bang Jeka", kategori: "Olahraga · Tekno · Gaming", fase: "Fase 3", emoji: "🐱", warna: "from-amber-200 to-amber-100" },
  { nama: "Prof. Whisker", kategori: "Sains · Politik · Ekonomi", fase: "Fase 3", emoji: "🐈‍⬛", warna: "from-slate-200 to-slate-100" },
  { nama: "Si Emeng", kategori: "Daerah · Viral · Hiburan", fase: "Fase 4", emoji: "🐈‍⬛", warna: "from-zinc-200 to-zinc-100" },
  { nama: "Anju", kategori: "Travel · Inspiratif", fase: "Fase 4+", emoji: "🐶", warna: "from-sky-200 to-sky-100" },
];

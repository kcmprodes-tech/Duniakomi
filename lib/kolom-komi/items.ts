import type { OutfitId } from "./types";

export interface Outfit {
  id: OutfitId;
  nama: string;
  /** Harga dalam Koin (0 = gratis) */
  harga: number;
  /** Path gambar Komi memakai kostum ini (di public/komi/).
   *  Diselaraskan dengan nama file asli saat aset masuk. */
  image: string;
  /** Emoji cadangan kalau gambar kostum belum tersedia */
  emoji: string;
  deskripsi: string;
  /** Label khusus di kartu item */
  badge?: "Item Langka" | "Coming Soon";
  /** true = belum bisa dibeli (sekadar teaser) */
  comingSoon?: boolean;
}

// Katalog kostum Komi. Harga & gambar bisa disesuaikan.
export const OUTFITS: Outfit[] = [
  {
    id: "peci",
    nama: "Peci Hitam",
    harga: 20,
    image: "/komi/komi-peci.png",
    emoji: "🧢",
    deskripsi: "Necis ala bapak-bapak Indonesia.",
  },
  {
    id: "jas",
    nama: "Jas Necis",
    harga: 40,
    image: "/komi/komi-jas.png",
    emoji: "🤵",
    deskripsi: "Biar Komi makin berwibawa.",
    badge: "Item Langka",
  },
  {
    id: "agustusan",
    nama: "Kostum 17-an",
    harga: 60,
    image: "/komi/komi-agustusan.png",
    emoji: "🎉",
    deskripsi: "Semangat merah putih!",
    badge: "Item Langka",
  },
  {
    id: "ramadan",
    nama: "Mode Ramadan",
    harga: 0,
    image: "/komi/komi-ramadan.png",
    emoji: "🌙",
    deskripsi: "Segera hadir menyambut bulan suci.",
    badge: "Coming Soon",
    comingSoon: true,
  },
];

export function cariOutfit(id: OutfitId): Outfit | undefined {
  return OUTFITS.find((o) => o.id === id);
}

// Pilihan makanan untuk aksi "Kasih Makan" — varian di carousel.
// Tiap makanan beda efek ke Kenyang & Mood.

export interface Food {
  id: string;
  nama: string;
  emoji: string;
  /** Gambar piring/mangkok (di public/). */
  img?: string;
  /** Efek ke bar saat diberikan */
  efek: { kenyang: number; mood: number };
  badge?: string;
}

export const FOODS: Food[] = [
  { id: "nasi-goreng", nama: "Nasi Goreng", emoji: "🍳", img: "/komi/food_nasigoreng.png", efek: { kenyang: 26, mood: 8 }, badge: "Favorit" },
  { id: "sate-ayam", nama: "Sate Ayam", emoji: "🍢", img: "/komi/food_sateayam.png", efek: { kenyang: 20, mood: 12 } },
  { id: "mie-ayam", nama: "Mie Ayam", emoji: "🍜", img: "/komi/food_mie.png", efek: { kenyang: 22, mood: 9 } },
  { id: "siomay", nama: "Siomay", emoji: "🥟", img: "/komi/food_siomay.png", efek: { kenyang: 16, mood: 11 } },
  { id: "tahu-bulat", nama: "Tahu Bulat", emoji: "🟤", img: "/komi/food_tahubulat.png", efek: { kenyang: 12, mood: 14 } },
];

export function cariFood(id: string): Food | undefined {
  return FOODS.find((f) => f.id === id);
}

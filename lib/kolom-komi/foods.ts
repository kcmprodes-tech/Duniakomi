// Pilihan makanan untuk aksi "Kasih Makan" — mangkok mie di carousel.
// Tiap makanan beda efek ke Kenyang & Mood.

export interface Food {
  id: string;
  nama: string;
  emoji: string;
  /** Gambar mangkok (di public/). */
  img?: string;
  /** Efek ke bar saat diberikan */
  efek: { kenyang: number; mood: number };
  badge?: string;
}

const MIE = "/komi/food_mie.png";

export const FOODS: Food[] = [
  { id: "mie-ayam", nama: "Mie Ayam", emoji: "🍜", img: MIE, efek: { kenyang: 18, mood: 6 } },
  { id: "mie-bakso", nama: "Mie Bakso", emoji: "🍜", img: MIE, efek: { kenyang: 20, mood: 8 } },
  { id: "mie-spesial", nama: "Mie Spesial", emoji: "🍜", img: MIE, efek: { kenyang: 24, mood: 12 }, badge: "Spesial" },
  { id: "mie-komplit", nama: "Mie Komplit", emoji: "🍜", img: MIE, efek: { kenyang: 22, mood: 10 } },
  { id: "mie-jumbo", nama: "Mie Jumbo", emoji: "🍜", img: MIE, efek: { kenyang: 28, mood: 7 }, badge: "Jumbo" },
];

export function cariFood(id: string): Food | undefined {
  return FOODS.find((f) => f.id === id);
}

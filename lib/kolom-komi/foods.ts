// Pilihan makanan untuk aksi "Kasih Makan". Tiap makanan beda efek.

export interface Food {
  id: string;
  nama: string;
  emoji: string;
  /** Efek ke bar saat diberikan */
  efek: { kenyang: number; mood: number };
  badge?: string;
}

export const FOODS: Food[] = [
  { id: "ikan", nama: "Ikan Biasa", emoji: "🐟", efek: { kenyang: 14, mood: 2 } },
  { id: "ikan-bakar", nama: "Ikan Bakar", emoji: "🍢", efek: { kenyang: 22, mood: 6 } },
  { id: "susu", nama: "Susu Hangat", emoji: "🥛", efek: { kenyang: 8, mood: 10 } },
  {
    id: "kue",
    nama: "Kue Spesial",
    emoji: "🎂",
    efek: { kenyang: 18, mood: 14 },
    badge: "Langka",
  },
];

export function cariFood(id: string): Food | undefined {
  return FOODS.find((f) => f.id === id);
}

// Celetukan & dialog Komi. Gaya: hangat, percaya diri, sedikit necis, "bapak-bapak".
// Sapaan "Pak/Bu/Kamu". HINDARI: sarcasm pedas, gaul ekstrem, menggurui.

/** Sapaan acak saat user membuka halaman utama. */
export const SAPAAN: string[] = [
  "Eh, baru dateng nih. Sudah baca berita pagi belum?",
  "Halo! Dari tadi Komi nungguin kamu loh.",
  "Selamat datang lagi. Hari ini mau ngapain bareng Komi?",
  "Mampir lagi nih. Mantap, Komi jadi semangat!",
];

export interface DialogNgobrol {
  komi: string;
  pilihan: string[];
}

/** Dialog untuk layar Ngobrol — Komi menyapa, user pilih balasan. */
export const NGOBROL: DialogNgobrol[] = [
  {
    komi: "Lagi sibuk apa hari ini, Pak/Bu?",
    pilihan: ["Lagi santai kok", "Sibuk banget nih", "Lagi nemenin Komi 😺"],
  },
  {
    komi: "Komi lagi semangat baca berita. Kamu paling suka kategori apa?",
    pilihan: ["Kuliner dong", "Sains & teknologi", "Yang inspiratif"],
  },
  {
    komi: "Streak kita lumayan ya. Besok mampir lagi kan?",
    pilihan: ["Pasti dong!", "InsyaAllah", "Kalau nggak, Komi ngambek? 😆"],
  },
];

/** Balasan hangat Komi setelah user memilih (acak). */
export const BALASAN_KOMI: string[] = [
  "Mantap! Komi jadi ikut semangat.",
  "Sip, yang penting kita ketemu tiap hari ya.",
  "Hehe, Komi seneng banget ngobrol sama kamu.",
];

/** Pilih elemen acak dari sebuah array. */
export function acak<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

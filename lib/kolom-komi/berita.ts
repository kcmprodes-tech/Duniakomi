// Berita dummy untuk fitur "Baca Bareng".
// PENTING (pagar editorial): hanya topik aman & positif — TIDAK ada berita duka,
// konflik, kekerasan, politik partisan, SARA, atau medis sensitif.

export interface Berita {
  id: string;
  kategori: string;
  emoji: string;
  judul: string;
  ringkasan: string;
  /** Celetukan Komi soal berita ini (gaya bapak-bapak yang hangat) */
  komiSays: string;
}

export const BERITA: Berita[] = [
  {
    id: "hemat-listrik",
    kategori: "Tips",
    emoji: "💡",
    judul: "5 Cara Hemat Listrik di Rumah",
    ringkasan:
      "Mulai dari cabut charger yang nganggur sampai ganti lampu LED — tagihan bulanan bisa turun lumayan.",
    komiSays: "Lumayan nih, Pak. Komi juga mau ngiritin biar bisa beli ikan lebih banyak.",
  },
  {
    id: "kopi-nusantara",
    kategori: "Kuliner",
    emoji: "☕",
    judul: "Mengenal Ragam Kopi Nusantara",
    ringkasan:
      "Dari Gayo sampai Toraja, tiap daerah punya cita rasa khas yang sudah mendunia.",
    komiSays: "Wah, Komi paling suka topik ini. Ngopi dulu, baru lanjut baca.",
  },
  {
    id: "tidur-cukup",
    kategori: "Kesehatan",
    emoji: "😴",
    judul: "Kenapa Tidur Cukup Itu Penting",
    ringkasan:
      "Tidur 7–8 jam bantu konsentrasi, suasana hati, dan daya tahan tubuh tetap prima.",
    komiSays: "Bener banget. Jangan begadang ya, ntar nggak sempet baca berita pagi sama Komi.",
  },
  {
    id: "energi-surya",
    kategori: "Sains",
    emoji: "☀️",
    judul: "Bagaimana Panel Surya Bekerja",
    ringkasan:
      "Cahaya matahari diubah jadi listrik lewat sel fotovoltaik — energi bersih untuk masa depan.",
    komiSays: "Pinter ya teknologinya. Komi jadi pengin pasang di atap rumah.",
  },
  {
    id: "umkm-digital",
    kategori: "Inspiratif",
    emoji: "🚀",
    judul: "Kisah UMKM Naik Kelas lewat Digital",
    ringkasan:
      "Warung kecil bisa go online dan menjangkau pembeli dari seluruh penjuru negeri.",
    komiSays: "Mantap! Usaha kecil juga bisa besar. Semangat terus, Pak, Bu!",
  },
];

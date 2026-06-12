// Berita dummy untuk fitur "Baca Bareng".
// PENTING (pagar editorial): hanya topik aman & positif — TIDAK ada berita duka,
// konflik, kekerasan, politik partisan, SARA, atau medis sensitif.

export interface Berita {
  id: string;
  kategori: string;
  emoji: string;
  judul: string;
  ringkasan: string;
  /** Isi artikel (paragraf) untuk ditampilkan di in-app browser (mockup). */
  isi: string[];
  /** Tautan ke Kompas.com (dibuka di tab baru dari in-app browser). */
  url: string;
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
    isi: [
      "Langkah paling gampang: cabut charger dan peralatan yang tidak dipakai. Daya 'siluman' dari alat yang dibiarkan standby ternyata menyumbang tagihan lumayan tiap bulan.",
      "Beralih ke lampu LED dan mengatur suhu AC di 24–25°C juga terbukti hemat. Kebiasaan kecil yang konsisten bisa menurunkan tagihan listrik rumah tangga cukup signifikan.",
    ],
    url: "https://www.kompas.com/tren",
    komiSays: "Lumayan nih, Pak. Komi juga mau ngiritin biar bisa beli ikan lebih banyak.",
  },
  {
    id: "kopi-nusantara",
    kategori: "Kuliner",
    emoji: "☕",
    judul: "Mengenal Ragam Kopi Nusantara",
    ringkasan:
      "Dari Gayo sampai Toraja, tiap daerah punya cita rasa khas yang sudah mendunia.",
    isi: [
      "Tiap daerah punya karakter rasa sendiri: Gayo dikenal bertubuh tebal dengan keasaman seimbang, sementara Toraja punya cita rasa earthy yang khas.",
      "Bukan cuma soal rasa, kopi juga jadi bagian budaya dan penghidupan jutaan petani di Nusantara. Tak heran kopi Indonesia makin dikenal di pasar dunia.",
    ],
    url: "https://www.kompas.com/food",
    komiSays: "Wah, Komi paling suka topik ini. Ngopi dulu, baru lanjut baca.",
  },
  {
    id: "tidur-cukup",
    kategori: "Kesehatan",
    emoji: "😴",
    judul: "Kenapa Tidur Cukup Itu Penting",
    ringkasan:
      "Tidur 7–8 jam bantu konsentrasi, suasana hati, dan daya tahan tubuh tetap prima.",
    isi: [
      "Saat tidur, tubuh memperbaiki sel dan otak menata ingatan. Kurang tidur bikin konsentrasi turun dan gampang bad mood keesokan harinya.",
      "Para ahli menyarankan orang dewasa tidur 7–8 jam. Tipsnya: jadwal tidur teratur, kurangi layar sebelum tidur, dan jaga kamar tetap gelap serta sejuk.",
    ],
    url: "https://health.kompas.com",
    komiSays: "Bener banget. Jangan begadang ya, ntar nggak sempet baca berita pagi sama Komi.",
  },
  {
    id: "energi-surya",
    kategori: "Sains",
    emoji: "☀️",
    judul: "Bagaimana Panel Surya Bekerja",
    ringkasan:
      "Cahaya matahari diubah jadi listrik lewat sel fotovoltaik — energi bersih untuk masa depan.",
    isi: [
      "Panel surya bekerja lewat sel fotovoltaik yang mengubah cahaya matahari menjadi arus listrik. Makin terang sinarnya, makin besar listrik yang dihasilkan.",
      "Sebagai sumber energi bersih dan terbarukan, panel surya makin banyak dipakai di rumah maupun industri untuk menekan biaya listrik dalam jangka panjang.",
    ],
    url: "https://www.kompas.com/sains",
    komiSays: "Pinter ya teknologinya. Komi jadi pengin pasang di atap rumah.",
  },
  {
    id: "umkm-digital",
    kategori: "Inspiratif",
    emoji: "🚀",
    judul: "Kisah UMKM Naik Kelas lewat Digital",
    ringkasan:
      "Warung kecil bisa go online dan menjangkau pembeli dari seluruh penjuru negeri.",
    isi: [
      "Banyak warung kecil kini naik kelas setelah jualan online: jangkauan pembeli meluas, dan promosi bisa lewat media sosial tanpa biaya besar.",
      "Kuncinya konsisten dan berani belajar hal baru — dari foto produk yang menarik sampai melayani pesanan dengan ramah. Hasilnya, omzet pun ikut tumbuh.",
    ],
    url: "https://www.kompas.com/tren",
    komiSays: "Mantap! Usaha kecil juga bisa besar. Semangat terus, Pak, Bu!",
  },
];

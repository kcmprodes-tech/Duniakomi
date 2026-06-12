// "Ajak Jalan": tiap tempat yang dikunjungi Komi terhubung ke sebuah kanal Kompas.com.
// Dibuka lewat in-app browser (lihat InAppBrowser).

/** Bentuk minimal halaman yang bisa dibuka in-app browser (dipenuhi juga oleh Berita). */
export interface HalamanKompas {
  kategori: string;
  judul: string;
  ringkasan: string;
  isi: string[];
  emoji: string;
  url: string;
}

export interface Kanal extends HalamanKompas {
  id: string;
  /** Tempat yang dikunjungi Komi */
  tempat: string;
  tempatEmoji: string;
  /** Nama kanal Kompas */
  kanal: string;
  /** Gradient warna kartu */
  warna: string;
}

export const KANAL: Kanal[] = [
  {
    id: "mal",
    tempat: "Mal / Pasar",
    tempatEmoji: "🛍️",
    kanal: "Money",
    warna: "from-emerald-200 to-emerald-100",
    kategori: "KOMPAS Money",
    judul: "Kanal Money — Ekonomi & Keuangan",
    emoji: "🛍️",
    url: "https://money.kompas.com",
    ringkasan: "Komi mampir ke mal & pasar — ngobrolin harga, belanja, dan tips keuangan.",
    isi: [
      "Dari harga kebutuhan pokok sampai tips atur duit, kanal Money mengupas hal-hal ekonomi yang dekat dengan keseharian.",
      "Pas banget buat kamu yang mau makin melek finansial sambil jalan-jalan bareng Komi.",
    ],
  },
  {
    id: "resto",
    tempat: "Resto",
    tempatEmoji: "🍽️",
    kanal: "Food",
    warna: "from-orange-200 to-orange-100",
    kategori: "KOMPAS Food",
    judul: "Kanal Food — Kuliner Nusantara",
    emoji: "🍽️",
    url: "https://www.kompas.com/food",
    ringkasan: "Komi laper, mampir resto! Yuk lihat resep & kuliner di kanal Food.",
    isi: [
      "Resep praktis, rekomendasi tempat makan, sampai cerita di balik kuliner Nusantara ada di sini.",
      "Temani Komi cari makan enak sambil baca-baca di kanal Food.",
    ],
  },
  {
    id: "bioskop",
    tempat: "Bioskop",
    tempatEmoji: "🎬",
    kanal: "Hype",
    warna: "from-fuchsia-200 to-fuchsia-100",
    kategori: "KOMPAS Hype",
    judul: "Kanal Hype — Hiburan & Selebriti",
    emoji: "🎬",
    url: "https://www.kompas.com/hype",
    ringkasan: "Nonton bareng Komi! Berita film, musik, dan hiburan ada di kanal Hype.",
    isi: [
      "Update film terbaru, kabar musik, dan dunia hiburan dikemas ringan di kanal Hype.",
      "Pas buat selingan seru setelah baca berita yang serius.",
    ],
  },
  {
    id: "pantai",
    tempat: "Pantai",
    tempatEmoji: "🏖️",
    kanal: "Travel",
    warna: "from-sky-200 to-sky-100",
    kategori: "KOMPAS Travel",
    judul: "Kanal Travel — Jalan-Jalan & Wisata",
    emoji: "🏖️",
    url: "https://travel.kompas.com",
    ringkasan: "Komi pengin liburan! Inspirasi wisata & tips jalan-jalan di kanal Travel.",
    isi: [
      "Destinasi wisata, tips perjalanan, sampai kuliner khas daerah ada di kanal Travel.",
      "Yuk rencanakan liburan seru bareng Komi.",
    ],
  },
  {
    id: "gym",
    tempat: "Gym",
    tempatEmoji: "🏋️",
    kanal: "Health",
    warna: "from-rose-200 to-rose-100",
    kategori: "KOMPAS Health",
    judul: "Kanal Health — Kesehatan & Kebugaran",
    emoji: "🏋️",
    url: "https://health.kompas.com",
    ringkasan: "Komi olahraga biar bugar! Tips sehat & kebugaran di kanal Health.",
    isi: [
      "Info kesehatan, gaya hidup sehat, dan kebugaran yang mudah dipraktikkan sehari-hari.",
      "Jaga kesehatan bareng Komi, mulai dari kebiasaan kecil.",
    ],
  },
  {
    id: "stadion",
    tempat: "Stadion",
    tempatEmoji: "🏟️",
    kanal: "Bola",
    warna: "from-amber-200 to-amber-100",
    kategori: "KOMPAS Bola",
    judul: "Kanal Bola — Sepak Bola & Olahraga",
    emoji: "🏟️",
    url: "https://www.kompas.com/sports",
    ringkasan: "Komi nonton bola! Skor, jadwal, dan kabar olahraga di kanal Bola.",
    isi: [
      "Berita sepak bola dalam & luar negeri, hasil pertandingan, sampai analisis ada di sini.",
      "Dukung tim favoritmu bareng Komi.",
    ],
  },
];

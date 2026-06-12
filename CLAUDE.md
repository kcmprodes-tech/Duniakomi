# Panduan Proyek: Dunia Komi

> File ini dibaca otomatis oleh Claude Code di setiap sesi. Isinya adalah konteks lengkap proyek.

## Tentang Proyek

**Dunia Komi** adalah halaman engagement interaktif untuk Kompas.com — portal berita terbesar di Indonesia. Halaman ini menampilkan maskot bernama **KOMI**, seekor kucing putih gendut dengan kumis tebal hitam dan rambut klimis disisir ke belakang — karakter "bapak-bapak necis" yang ikonik.

**Tujuan bisnis:**
- Meningkatkan engagement & retensi pembaca Kompas.com
- Menambah pageview lewat game & konten interaktif
- Mendorong konversi ke subscription Kompas.com
- Menarik audiens muda tanpa merusak kredibilitas Kompas

**Positioning Komi:** Komi adalah "penerjemah" berita serius menjadi pengalaman yang ramah dan menyenangkan. Komi BUKAN hiburan terpisah — dia adalah jembatan antara pembaca dan konten Kompas.

**Visi jangka panjang:** Dunia Komi adalah **IP universe** — tidak berhenti di Komi, tapi akan tumbuh jadi "lingkungan RT-RW" karakter lain yang masing-masing mewakili kategori berita Kompas. Lihat section "Universe Roadmap" di bawah.

---

## Status Proyek

**Tahap saat ini:** PROTOTIPE LANDING PAGE untuk presentasi internal.

**Strategi:** Fokus membangun landing page yang menjual visi Dunia Komi, dengan **fitur "Kamu & Komi" (virtual companion) sebagai bintang utama showcase**. Virtual companion TIDAK dibangun fungsional di fase ini, tapi divisualisasikan dengan mockup yang sangat meyakinkan.

**Yang dibangun di prototipe ini:**
1. Landing page Dunia Komi (lengkap, polished, production-grade)
2. Section showcase "Kamu & Komi" yang sangat detail & meyakinkan
3. Section pendukung: Game (mockup), Komik strip, Newsletter, Komi Poin
4. Section "Coming Later" — teaser karakter pendukung (Universe roadmap)
5. Section pagar editorial

**Yang TIDAK dibangun di prototipe ini:**
- Backend, database, autentikasi
- Logic virtual pet sungguhan
- Game engine (Phaser)
- Game fungsional — cukup mockup visual
- Integrasi API Kompas.com
- Karakter pendukung lain (hanya teaser silhouette/icon)

---

## Fitur Utama: "Kamu & Komi"

Ini adalah **bintang utama** Dunia Komi.

### Filosofi nama

"Kamu & Komi" memposisikan user dan Komi sebagai **dua sahabat yang setara**, bukan owner & pet. Lebih hangat, lebih dewasa, lebih cocok untuk persona Komi yang sudah bapak-bapak.

### Tagline utama

> **"Kamu & Komi — sahabat baca berita tiap hari."**

### Headline section utama (di landing page)

> **"Setiap pagi, ada Komi yang nungguin kamu."**

### Konsep yang ditampilkan di landing page (mockup visual)

**Panel utama "Kamu & Komi":**
- Komi di tengah, animasi floating/bobbing dengan Framer Motion
- 4 bar kebutuhan: **Kenyang**, **Mood**, **Energy**, **Update** (Update = signature feature, naik dengan baca berita; Energy = turun seiring waktu, dipulihkan dengan Tidurin)
- **5 tombol aksi utama** (lihat detail di bawah):
  1. **🐟 Kasih Makan** — pilih makanan, beda makanan beda efek
  2. **📰 Baca Bareng** — link ke artikel Kompas (signature)
  3. **🗺️ Ajak Jalan** — masuk ke "Komi Berkunjung" (travel mechanic)
  4. **🎮 Main Bareng** — masuk ke mini-game Kamu & Komi
  5. **🛏️ Tidurin** — tombol selalu ada, warna berubah saat Energy rendah; ajak Komi tidur
- **Elus BUKAN tombol lagi** — sekarang gesture tap langsung di badan Komi (lihat section "Gesture System")
- Counter "Koin Ikan" di pojok
- Hint dialog: *"Eh, baru dateng nih. Sudah baca berita pagi?"*

**Detail 5 aksi utama:**
1. **🐟 Kasih Makan** — buka pilihan makanan; tiap makanan beri efek berbeda (mis. ikan biasa naik Kenyang sedikit, makanan langka naik Mood + Kenyang).
2. **📰 Baca Bareng** — aksi signature, mengarahkan ke artikel Kompas; menaikkan bar Update.
3. **🗺️ Ajak Jalan** — masuk ke mode "Komi Berkunjung", mekanik travel (Komi mengunjungi tempat/daerah).
4. **🎮 Main Bareng** — masuk ke mini-game interaktif Kamu & Komi (lihat section "Mini-game").
5. **🛏️ Tidurin** — tombol **selalu tampil**; warnanya **berubah saat bar Energy rendah** (jadi penanda visual bahwa Komi butuh tidur). Mengajak Komi tidur untuk memulihkan Energy.

**Loop visualization "Cara Kamu & Komi bekerja":**
1. ☀️ Kamu mampir tiap pagi
2. 📰 Baca berita bareng Komi
3. 🐟 Kasih makan Komi
4. 😊 Komi seneng, kamu jadi update
5. 🎩 Buka item langka untuk dandanin Komi
6. 🔁 Besok ketemu lagi

**Showcase item & kustomisasi:**
- 3-4 outfit Komi: peci, jas, kostum 17 Agustus, mode Ramadan
- Label "Coming Soon" / "Item Langka"

**Social proof:**
- Counter: "Sudah X pembaca yang nungguin Kamu & Komi"
- Testimoni fiktif

**CTA utama:**
- "Daftar dapat akses awal" → newsletter signup

---

## Gesture System (Tap-to-Interact dengan Komi)

**Konsep:** "Elus" tidak lagi jadi tombol. Sebagai gantinya, user bisa **menyentuh langsung badan Komi** (direct manipulation), persis seperti Talking Tom — lebih natural, intuitif, dan memorable. Tiap area tubuh memberi reaksi berbeda.

**Reaksi Komi berdasarkan area yang disentuh:**

| Area disentuh | Reaksi Komi |
|---------------|-------------|
| 🐱 **Kepala** | Komi senang, mata tertutup nikmat, ada efek *purr* (mendengkur) |
| 😆 **Perut** | Komi tertawa geli (ticklish), goyang-goyang, ada efek "hihi" |
| 🐾 **Kaki/Cakar** | Komi kaget pelan, narik kaki, lucu malu-malu |
| 💢 **Ekor** | Komi sedikit ngambek, ekor kibas-kibas |
| 👃 **Hidung** | Komi bersin pelan, lucu |

**Efek interaksi:**
- Bar **Mood** naik sedikit tiap sentuhan
- Selalu ada feedback visual + animasi yang memorable (Framer Motion)
- Reaksi harus terasa hidup & responsif (instant feedback)

> Catatan: di fase prototipe ini gesture cukup divisualisasikan sebagai mockup/demo, belum perlu logika penuh.

---

## Mini-game (Dua Tipe Berbeda Fungsi)

Mini-game dipisah jadi dua kelompok dengan tujuan berbeda:

### A. Mini-game di "Dunia Komi" (knowledge-based → drive pageview berita)

Tujuan: mendorong pembaca konsumsi konten Kompas.

- **Tebak Berita Komi** — kuis dari artikel hari ini
- **Katla-nya Komi** — tebak kata (ala Wordle)
- **Trivia Indonesia** — pengetahuan umum dari arsip Kompas
- **Headline Match** — cocokkan headline dengan kategori

### B. Mini-game di "Kamu & Komi" (interaktif → perdalam afeksi)

Tujuan: memperkuat ikatan emosional user dengan Komi. Diakses lewat aksi **🎮 Main Bareng**.

- **Lempar Ikan** — tap untuk lempar ikan ke Komi
- **Sembunyi Komi** — Komi sembunyi, user tebak
- **Mancing Bareng Komi** — idle catching game
- **Bersih-bersih Rumah Komi** — tap game

> Catatan: di fase prototipe ini semua mini-game cukup mockup visual, belum fungsional.

---

## Universe Roadmap (Visi Jangka Panjang)

Dunia Komi akan tumbuh dari satu karakter jadi *cast lengkap* lingkungan RT-RW kucing. Setiap karakter mewakili kategori berita Kompas. **Karakter tambahan TIDAK dibangun di MVP** — hanya teaser di section khusus landing page.

### Fase 1 (sekarang — 6 bulan): Hanya Komi

Fokus penuh membangun karakter Komi. Karakter lain hanya muncul sebagai *silhouette teaser* di landing page dengan label "Coming Later". Tujuan fase ini: bikin orang **cinta sama Komi dulu**.

### Fase 2 (bulan 6-12): Perkenalkan Bu Mia

Karakter pertama yang masuk. Awalnya hanya di komik strip — bukan langsung jadi fitur utama. Pantau reaksi audiens.

### Fase 3 (tahun 2): Bang Jeka & Prof. Whisker

Ekspansi cast lengkap. Di titik ini Dunia Komi sudah punya brand recognition, karakter baru memperkaya bukan membingungkan.

### Fase 4+ (tahun 3+): Si Emeng, Anju, dan karakter lain sesuai kebutuhan editorial.

### Karakter Universe Komi (untuk teaser silhouette di landing page)

Lihat file `docs/karakter-universe.md` untuk detail lengkap setiap karakter. Singkatnya:

| Karakter | Peran Editorial | Fase |
|----------|----------------|------|
| **Pak Komi** | Berita umum, host utama | Sekarang |
| **Bu Mia** | Lifestyle, Kuliner, Keluarga, Kesehatan | Fase 2 |
| **Bang Jeka** | Olahraga, Tekno, Otomotif, Gaming | Fase 3 |
| **Prof. Whisker** | Sains, Politik, Ekonomi, Sejarah | Fase 3 |
| **Si Emeng** | Berita Daerah, Viral, Hiburan | Fase 4 |
| **Anju** | Travel, Inspiratif, Konten Positif | Fase 4+ |

### Tampilan section "Coming Later" di landing page

Di bagian bawah landing page, sebelum footer, taruh section dengan:
- Headline: *"Dunia Komi baru dimulai..."*
- Sub-headline: *"Sebentar lagi, tetangga-tetangga Komi akan ikut nimbrung."*
- 3-5 silhouette/ikon karakter dengan label nama + kategori
- Mood: misterius tapi mengundang, bukan spoiler penuh
- CTA: "Daftar buat dapat info duluan saat mereka datang"

---

## Karakter Komi (Detail Visual & Personality)

### Visual Komi

- **Spesies**: Kucing putih berbulu lebat (gaya Persia/Anggora)
- **Ciri ikonik**: 
  - Kumis (mustache) hitam tebal melengkung — *signature*
  - Rambut klimis hitam disisir ke belakang dengan jambul
  - Hidung pink kecil
  - Pipi merah blush
- **Pose default**: melambai dengan kedipan satu mata + acungan jempol
- **Asset**: 
  - `public/komi.png` — logo "Dunia Komi" utama
  - `public/kamu-dan-komi.png` — logo fitur "Kamu & Komi"

### Kepribadian Komi

- **Tone**: hangat, percaya diri, sedikit necis, *bapak-bapak Indonesia*
- **Sikap**: suka kasih jempol & dukungan, sedikit *flexing* tapi menggemaskan
- **Gaya bicara**: bahasa Indonesia santai, sapaan "Pak/Bu/Kamu"
- **Vibe**: *cool uncle yang sahabatan dengan kamu*
- **Contoh celetukan**:
  - *"Eits, sudah baca berita pagi belum? Komi nungguin loh."*
  - *"Mantap kalau itu! Streak 7 hari, gas terus!"*
  - *"Waduh, harga cabai naik lagi. Komi mau ngiritin ikan deh."*
- **Yang DIHINDARI**: sarcasm pedas, bahasa gaul ekstrem (gw, kek, anjir), politik partisan, nada menggurui

### Tone shift untuk Kamu & Komi (persahabatan, bukan kepemilikan)

- ❌ "Pelihara Komi" → ✅ "Temani Komi"
- ❌ "Pet kamu lapar" → ✅ "Komi lapar nih"
- ❌ "Karaktermu naik level" → ✅ "Kamu & Komi naik level"

---

## Brand Identity & Design System

### Warna Brand (CSS variables)

**Warna utama:**
- `--navy`: #1A2845 (warna primer, teks utama, outline)
- `--orange`: #F08020 (aksen utama, CTA, highlight)
- `--white`: #FFFFFF (background utama, badan Komi)
- `--black`: #000000 (kumis, rambut Komi)

**Warna pendukung:**
- `--navy-soft`: #2D3A5F
- `--orange-soft`: #FFB87A
- `--blush`: #FFC9C9 (pipi Komi, heart accent)
- `--cream`: #FFF8EE (bg alternatif hangat)
- `--gray-text`: #5A6B8A
- `--kompas`: #0E6BB3 (warna brand Kompas, sedikit)

### Tipografi

- **Display**: `Baloo 2` (Google Fonts) — rounded, friendly
- **Body**: `Plus Jakarta Sans` (Google Fonts) — font Indonesia

### Aesthetic

**"Sticker badge — playful, premium, Indonesia"** — warna bold (navy + orange), kontras kuat, rounded shapes, sticker outline style, sparkle & heart accent. Premium tapi ramah.

---

## Stack Teknis

- **Framework**: Next.js (App Router, versi terbaru)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Animasi**: Framer Motion
- **Icon**: Lucide React
- **Hosting**: Vercel
- **Database/Backend**: TIDAK ADA di fase ini

---

## Aturan Penting

### Pagar Editorial (KRITIS)

Komi & karakter lain TIDAK BOLEH muncul atau berkomentar dalam konteks:
- Berita duka, kematian, kecelakaan, bencana
- Konflik, perang, kekerasan
- Isu SARA, politik partisan
- Topik medis sensitif

### Konvensi Kode

- Pakai TypeScript, hindari `any`
- Komponen pakai PascalCase
- File utility pakai camelCase
- Pakai Tailwind utility classes
- Komponen kecil & reusable (< 150 baris)
- Komentar bahasa Indonesia untuk logika non-obvious
- Mobile-first

---

## Cara Kerja Sama dengan User

User adalah **product owner**, BUKAN developer:

1. Jelaskan dengan bahasa awam — hindari jargon
2. Diskusi rencana SEBELUM coding besar
3. Tunjukkan hasil sesering mungkin
4. Pecah jadi langkah kecil
5. Sabar menjelaskan hal dasar
6. Commit ke Git tiap milestone
7. Default-nya: pause & tanya, jangan asumsi

---

## Roadmap Pengerjaan Prototipe (1 minggu, ~3-4 jam/hari)

**Hari 1**: Setup Next.js, dependencies, struktur folder, design system dasar
**Hari 2**: Navbar + Hero section dengan animasi Komi
**Hari 3**: Section "Kamu & Komi" — bintang utama (mockup virtual companion, loop)
**Hari 4**: Section pendukung — Game, Komik, Newsletter, Komi Poin
**Hari 5**: Section "Coming Later" (Universe teaser) + Pagar Editorial + Footer + responsive
**Hari 6**: Polish animasi, copy editing, hover states
**Hari 7**: Deploy ke Vercel

---

## Struktur Folder Target

```
dunia-komi/
├── CLAUDE.md
├── docs/
│   └── karakter-universe.md   ← profil lengkap semua karakter
├── package.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── KamuDanKomi/
│   │   ├── index.tsx
│   │   ├── CompanionMockup.tsx     ← panel utama (4 bar + 5 aksi)
│   │   ├── GestureLayer.tsx        ← tap-to-interact di badan Komi
│   │   ├── ActionButtons.tsx       ← 5 aksi: Makan/Baca/Jalan/Main/Tidurin
│   │   ├── KamuKomiGames.tsx       ← mini-game interaktif (mockup)
│   │   ├── LoopVisualization.tsx
│   │   └── ItemShowcase.tsx
│   ├── Games.tsx                   ← mini-game knowledge-based (mockup)
│   ├── Comic.tsx
│   ├── Newsletter.tsx
│   ├── KomiPoin.tsx
│   ├── ComingLater.tsx        ← Universe teaser
│   ├── EditorialGuard.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Card.tsx
├── lib/
│   └── utils.ts
└── public/
    ├── komi.png
    └── kamu-dan-komi.png
```

---

## Metrik Sukses Prototipe

Demo dianggap berhasil jika:
- ✅ Bisa dibuka di browser (link Vercel)
- ✅ Responsif HP & desktop
- ✅ Karakter Komi konsisten di seluruh halaman
- ✅ Section Kamu & Komi terlihat hidup & meyakinkan
- ✅ Section "Coming Later" menjual visi jangka panjang
- ✅ Pagar editorial jelas terlihat
- ✅ Tone & copy konsisten dengan kepribadian Komi
- ✅ Tidak ada bug visual yang mencolok

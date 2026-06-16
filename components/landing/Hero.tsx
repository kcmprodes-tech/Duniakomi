import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";

// Hero full-width banner dengan teks di depannya.
// Gambar banner beda untuk mobile (potret) & desktop (lebar).
export function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden">
      {/* Banner mobile */}
      <Image
        src={KOMI_IMG.heroBannerMobile}
        alt="Dunia Komi"
        width={800}
        height={1000}
        priority
        sizes="100vw"
        className="block h-auto w-full md:hidden"
      />
      {/* Banner desktop */}
      <Image
        src={KOMI_IMG.heroBanner}
        alt="Dunia Komi"
        width={1920}
        height={720}
        priority
        sizes="100vw"
        className="hidden h-auto w-full md:block"
      />

      {/* Scrim biar teks terbaca (bawah di mobile, kiri di desktop) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent md:bg-gradient-to-r md:from-black/55 md:via-black/15 md:to-transparent" />

      {/* Teks di depan banner */}
      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="mx-auto w-full max-w-6xl px-5 pb-7 sm:px-8 md:pb-0">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 font-body text-sm font-bold text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" /> Dunia Komi
            </span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-white drop-shadow-lg sm:text-6xl">
              Kenalin, ini <span className="text-orange-soft">Komi</span>.
            </h1>
            <p className="mt-3 max-w-md font-body text-base text-white/90 drop-shadow sm:text-lg">
              Sahabat berkumis yang bikin baca berita jadi lebih asik — nemenin kamu update tiap hari.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/kolom-komi">
                <Button className="px-6 py-3 text-base">🐟 Main Kolom Komi</Button>
              </Link>
              <a href="#daftar">
                <Button variant="outline" className="px-6 py-3 text-base">
                  Daftar akses awal
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

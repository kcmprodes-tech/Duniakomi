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
      {/* Banner mobile (potret 9:16) */}
      <Image
        src={KOMI_IMG.heroBannerMobile}
        alt="Dunia Komi"
        width={645}
        height={1146}
        priority
        sizes="100vw"
        className="block aspect-[9/16] w-full object-cover md:hidden"
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

      {/* Teks di depan banner, dibungkus frame kotak rounded biar gak tabrakan dengan latar.
          Mobile: kotak di atas (Komi ada di bawah). Desktop: kotak di kiri, vertikal tengah. */}
      <div className="absolute inset-0 flex items-start md:items-center">
        <div className="mx-auto w-full max-w-6xl px-4 pt-5 sm:px-8 md:pt-0">
          <div className="w-full max-w-xl rounded-[1.75rem] border border-white/15 bg-navy/60 p-5 shadow-2xl backdrop-blur-md sm:p-7 md:w-fit md:max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 font-body text-sm font-bold text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" /> Dunia Komi
            </span>
            <h1 className="mt-3 whitespace-nowrap font-display text-[1.7rem] font-extrabold leading-[1.1] text-white drop-shadow-lg md:text-5xl">
              Kenalin, ini <span className="text-orange-soft">Komi</span>.
            </h1>
            <p className="mt-2.5 max-w-md font-body text-sm text-white/90 md:mt-3 md:text-lg">
              Sahabat berkumis yang bikin baca berita jadi lebih asik — nemenin kamu update tiap hari.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5 md:mt-5 md:flex md:flex-nowrap md:gap-3">
              <Link href="/kolom-komi" className="block">
                <Button className="w-full whitespace-nowrap px-2 py-2.5 text-[13px] leading-tight md:w-auto md:px-5 md:py-3 md:text-base">
                  🐟 Main Kolom Komi
                </Button>
              </Link>
              <a href="#daftar" className="block">
                <Button variant="outline" className="w-full whitespace-nowrap px-2 py-2.5 text-[13px] leading-tight md:w-auto md:px-5 md:py-3 md:text-base">
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

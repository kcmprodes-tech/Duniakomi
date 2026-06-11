"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { KOMI_IMG } from "@/lib/kolom-komi/assets";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* dekor lembut */}
      <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-44 h-72 w-72 rounded-full bg-kompas/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-20 md:grid-cols-2">
        <div className="flex flex-col items-start gap-5 text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange/15 px-4 py-1.5 font-body text-sm font-bold text-orange">
            <Sparkles className="h-4 w-4" /> Dunia Komi
          </span>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-navy sm:text-6xl">
            Kenalin, <br /> ini <span className="text-orange">Komi</span>.
          </h1>
          <p className="max-w-md font-body text-lg text-gray-text">
            Sahabat berkumis yang bikin baca berita jadi lebih asik — nemenin
            kamu update tiap hari.
          </p>
          <div className="flex flex-wrap gap-3">
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

        <motion.div
          className="relative mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]"
          >
            <Image
              src={KOMI_IMG.base}
              alt="Komi"
              fill
              priority
              sizes="400px"
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

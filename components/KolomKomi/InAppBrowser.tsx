"use client";

import { motion } from "framer-motion";
import { X, Lock, ExternalLink } from "lucide-react";
import type { Berita } from "@/lib/kolom-komi/berita";

// In-app browser (mockup) untuk "membuka" artikel Kompas.com.
// Catatan: situs berita umumnya tidak bisa di-embed (X-Frame-Options),
// jadi isi ditampilkan sebagai halaman artikel bergaya Kompas + tautan asli.
export function InAppBrowser({
  berita,
  onClose,
}: {
  berita: Berita;
  onClose: () => void;
}) {
  const tampilUrl = berita.url.replace(/^https?:\/\//, "");

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col bg-white"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
    >
      {/* Bar browser */}
      <div className="flex items-center gap-2 border-b border-navy/10 bg-cream px-3 py-2.5">
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-navy transition hover:bg-navy/10"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full border border-navy/10 bg-white px-3 py-1.5">
          <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
          <span className="truncate font-body text-xs text-navy/70">{tampilUrl}</span>
        </div>
        <a
          href={berita.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buka di browser"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-navy transition hover:bg-navy/10"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Isi artikel (mockup gaya Kompas.com) */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-5 py-6">
          <p className="font-serif text-xl font-extrabold tracking-tight text-kompas">
            KOMPAS<span className="text-navy">.com</span>
          </p>

          <span className="mt-5 inline-block rounded bg-kompas/10 px-2 py-0.5 font-body text-[11px] font-bold uppercase tracking-wide text-kompas">
            {berita.kategori}
          </span>
          <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight text-navy sm:text-3xl">
            {berita.judul}
          </h1>
          <p className="mt-1 font-body text-xs text-gray-text">Tim Redaksi · Kompas.com</p>

          {/* Placeholder gambar artikel */}
          <div className="mt-4 flex aspect-[16/9] items-center justify-center rounded-2xl bg-gradient-to-br from-kompas/10 to-orange/10 text-5xl">
            {berita.emoji}
          </div>

          <div className="mt-4 flex flex-col gap-3 font-body text-[15px] leading-relaxed text-navy/80">
            <p className="font-semibold text-navy">{berita.ringkasan}</p>
            {berita.isi.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <a
            href={berita.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-kompas px-5 py-2.5 font-body text-sm font-bold text-white transition hover:brightness-110 active:scale-95"
          >
            Buka selengkapnya di Kompas.com <ExternalLink className="h-4 w-4" />
          </a>

          <p className="mt-4 font-body text-[11px] text-gray-text/70">
            Prototipe — artikel contoh. Tautan menuju Kompas.com.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

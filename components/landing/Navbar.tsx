"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#kolom-komi", label: "Kolom Komi" },
  { href: "#fitur", label: "Fitur" },
  { href: "#universe", label: "Universe" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-cream/80 backdrop-blur-md transition-shadow",
        scrolled ? "border-navy/10 shadow-md" : "border-navy/5"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center">
          <Image src="/komi.png" alt="Dunia Komi" width={130} height={44} priority className="h-10 w-auto" />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm font-semibold text-navy/70 transition hover:text-navy"
            >
              {l.label}
            </a>
          ))}
          <Link href="/kolom-komi">
            <Button>🐟 Main Kolom Komi</Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition active:scale-95 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="flex flex-col gap-1 border-t border-navy/5 bg-cream px-5 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 font-body text-sm font-semibold text-navy/80 hover:bg-navy/5"
            >
              {l.label}
            </a>
          ))}
          <Link href="/kolom-komi" className="mt-1" onClick={() => setOpen(false)}>
            <Button className="w-full">🐟 Main Kolom Komi</Button>
          </Link>
        </div>
      ) : null}
    </header>
  );
}

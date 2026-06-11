import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center sm:px-8">
        <Image src="/komi.png" alt="Dunia Komi" width={130} height={44} className="h-12 w-auto" />
        <p className="font-body text-sm text-gray-text">Teman barumu di Kompas.com.</p>
        <p className="font-body text-xs text-gray-text/70">
          Prototipe internal — Dunia Komi © 2026. Bukan untuk publik.
        </p>
      </div>
    </footer>
  );
}

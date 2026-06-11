import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ScreenHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/kolom-komi"
        aria-label="Kembali"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-navy/10 bg-white/90 text-navy shadow transition active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <h1 className="font-display text-2xl font-extrabold text-navy">{title}</h1>
    </div>
  );
}

import { Loader2 } from "lucide-react";

// Spinner kecil reusable (ikon berputar + label).
export function Spinner({ label = "Memuat…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="h-9 w-9 animate-spin text-orange" />
      <p className="font-body text-sm font-semibold text-navy/60">{label}</p>
    </div>
  );
}

// Loader layar penuh (dipakai saat state Komi belum siap di awal).
export function Loader() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream">
      <Spinner label="Memuat Komi…" />
    </div>
  );
}

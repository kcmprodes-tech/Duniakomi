import Link from "next/link";
import { cn } from "@/lib/utils";

export function ActionTile({
  href,
  emoji,
  label,
  alert,
  className,
}: {
  href: string;
  emoji: string;
  label: string;
  /** Mode peringatan (mis. Tidurin saat Energy rendah) — berubah warna + denyut. */
  alert?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-2xl border-2 p-2.5 text-center shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95",
        alert
          ? "animate-pulse border-red-300 bg-red-50 hover:border-red-400"
          : "border-navy/10 bg-white/90 hover:border-orange/40",
        className
      )}
    >
      <span className="text-2xl">{emoji}</span>
      <span
        className={cn(
          "font-body text-[10px] font-bold leading-tight",
          alert ? "text-red-500" : "text-navy"
        )}
      >
        {label}
      </span>
    </Link>
  );
}

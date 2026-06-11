import Link from "next/link";
import { cn } from "@/lib/utils";

export function ActionTile({
  href,
  emoji,
  label,
  className,
}: {
  href: string;
  emoji: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-navy/10 bg-white/90 p-3 text-center shadow-md transition hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-lg active:translate-y-0 active:scale-95",
        className
      )}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="font-body text-xs font-bold text-navy">{label}</span>
    </Link>
  );
}

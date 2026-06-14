import { cn } from "@/lib/utils";

export function KoinBadge({ koin, className }: { koin: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-orange/20 bg-white/90 px-3 py-1.5 font-body text-sm font-extrabold text-navy shadow",
        className
      )}
    >
      <span className="text-base">🪙</span>
      {koin}
      <span className="text-[10px] font-semibold text-gray-text">Koin</span>
    </span>
  );
}

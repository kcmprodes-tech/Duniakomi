import { Drumstick, Smile, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

function StatBar({
  icon,
  label,
  value,
  color,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white",
          color
        )}
      >
        {icon}
      </span>
      <div className="flex-1">
        <div className="mb-0.5 flex justify-between font-body text-[11px] font-semibold text-navy/70">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-navy/10">
          <div
            className={cn("h-full rounded-full transition-all duration-500", color)}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function StatusBars({
  kenyang,
  mood,
  update,
}: {
  kenyang: number;
  mood: number;
  update: number;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <StatBar icon={<Drumstick className="h-4 w-4" />} label="Kenyang" value={kenyang} color="bg-orange" />
      <StatBar icon={<Smile className="h-4 w-4" />} label="Mood" value={mood} color="bg-rose-400" />
      <StatBar icon={<Newspaper className="h-4 w-4" />} label="Update" value={update} color="bg-kompas" />
    </div>
  );
}

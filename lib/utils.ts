import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Gabungkan className Tailwind dengan aman: clsx menyusun, twMerge menyelesaikan konflik
// (mis. "px-2" + "px-4" → "px-4"). Dipakai di seluruh komponen.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

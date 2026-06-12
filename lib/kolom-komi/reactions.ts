// Reaksi Komi saat badannya disentuh (Gesture System). Tiap area beda reaksi.
// Di fase prototipe ini cukup mockup/demo: tiap sentuhan menaikkan Mood sedikit.

export type AreaKomi = "kepala" | "hidung" | "perut" | "kaki";

export const REAKSI: Record<AreaKomi, string> = {
  kepala: "Mmm~ enak banget dielus kepalanya. *purr* 😌",
  hidung: "Hatchii! Idung Komi gatel nih 🤧",
  perut: "Hihi, geli! Komi jadi ketawa 😆",
  kaki: "Eh eh, kakinya jangan~ Komi malu 😳",
};

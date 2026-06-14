// Sound manager Kolom Komi — efek suara & musik latar disintesis via Web Audio
// (tanpa file aset). Aman dipanggil di server (semua di-guard `window`).

type AudioSettings = { sfx: boolean; musik: boolean };
const KEY = "kolom-komi-audio";

let ctx: AudioContext | null = null;
let musicTimer: ReturnType<typeof setInterval> | null = null;
let musicStep = 0;

function baca(): AudioSettings {
  if (typeof window === "undefined") return { sfx: true, musik: false };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { sfx: true, musik: false, ...JSON.parse(raw) };
  } catch {
    /* abaikan */
  }
  return { sfx: true, musik: false };
}

let settings: AudioSettings = baca();

function simpan() {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    /* abaikan */
  }
}

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

// Nada pendek (efek suara).
function blip(freq: number, dur: number, type: OscillatorType, vol: number, delay = 0) {
  const c = ac();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export type SfxName = "tap" | "pop" | "coin" | "success" | "win" | "giggle";

export function playSfx(name: SfxName) {
  if (!settings.sfx) return;
  switch (name) {
    case "tap":
      blip(520, 0.07, "triangle", 0.13);
      break;
    case "pop":
      blip(360, 0.09, "sine", 0.18);
      blip(560, 0.08, "sine", 0.12, 0.04);
      break;
    case "coin":
      blip(880, 0.08, "triangle", 0.16);
      blip(1320, 0.12, "triangle", 0.16, 0.07);
      break;
    case "success":
      [523, 659, 784].forEach((f, i) => blip(f, 0.18, "triangle", 0.14, i * 0.09));
      break;
    case "win":
      [523, 659, 784, 1047].forEach((f, i) => blip(f, 0.2, "triangle", 0.15, i * 0.1));
      break;
    case "giggle":
      [700, 900, 800, 1000].forEach((f, i) => blip(f, 0.07, "sine", 0.12, i * 0.06));
      break;
  }
}

// Musik latar: nada lembut (pad) yang berulang pelan & senyap.
const MUSIK = [392, 440, 523, 587, 659, 587, 523, 440];
function padNote(freq: number, dur: number, vol: number) {
  const c = ac();
  if (!c) return;
  const t0 = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  const lp = c.createBiquadFilter();
  osc.type = "sine";
  osc.frequency.value = freq;
  lp.type = "lowpass";
  lp.frequency.value = 900;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.5);
  g.gain.linearRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(lp).connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

export function startMusic() {
  if (typeof window === "undefined" || musicTimer) return;
  const tick = () => {
    padNote(MUSIK[musicStep % MUSIK.length], 2.4, 0.05);
    musicStep++;
  };
  tick();
  musicTimer = setInterval(tick, 1400);
}

export function stopMusic() {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
}

export function getAudio(): AudioSettings {
  return { ...settings };
}

export function setSfx(on: boolean) {
  settings = { ...settings, sfx: on };
  simpan();
  if (on) playSfx("tap");
}

export function setMusic(on: boolean) {
  settings = { ...settings, musik: on };
  simpan();
  if (on) startMusic();
  else stopMusic();
}

// Dipanggil setelah gesture pertama user: nyalakan musik kalau setting-nya on.
export function ensureMusic() {
  if (settings.musik) startMusic();
}

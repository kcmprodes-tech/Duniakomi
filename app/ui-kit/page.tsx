"use client";

import type { ReactNode } from "react";
import {
  Play,
  Pause,
  RefreshCw,
  X,
  Menu,
  Check,
  Home,
  Volume2,
  Music,
  Info,
  Settings,
  ShoppingBag,
  Heart,
  Zap,
  Gift,
  Star,
  Bell,
  Trophy,
  Crown,
  Drumstick,
  Smile,
  Newspaper,
} from "lucide-react";
import {
  GameButton,
  CircleButton,
  Badge,
  ProgressBar,
  ProgressRing,
  Toggle,
  Slider,
  Segmented,
  Counter,
  Slot,
  Panel,
} from "@/components/ui/kit";

function Section({
  title,
  wide = false,
  children,
}: {
  title: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`flex flex-col gap-3 ${wide ? "md:col-span-2" : ""}`}>
      <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-b from-[#ffbe57] to-[#f08020] px-4 py-1 font-display text-sm font-extrabold uppercase tracking-wide text-white shadow [text-shadow:0_1px_1px_rgba(0,0,0,0.22)]">
        {title}
      </span>
      <div className="rounded-3xl border-2 border-white/10 bg-cream p-5 shadow-lg">{children}</div>
    </section>
  );
}

function IconTile({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-navy/10 bg-white text-navy shadow-sm transition hover:-translate-y-0.5 hover:text-orange">
      {children}
    </div>
  );
}

function Medallion({ grad, edge, children }: { grad: string; edge: string; children: ReactNode }) {
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-full border-4 text-white shadow-md drop-shadow"
      style={{ background: grad, borderColor: edge }}
    >
      {children}
    </div>
  );
}

function GameStat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex min-w-[88px] flex-col items-center rounded-2xl border-2 border-navy/10 bg-white px-4 py-2 shadow">
      <span className="font-body text-[10px] font-bold uppercase tracking-wide text-gray-text">{label}</span>
      <span className="font-display text-2xl font-extrabold text-navy">{value}</span>
    </div>
  );
}

export default function UiKitPage() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-navy to-navy-soft px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
            Kolom Komi — UI Kit
          </h1>
          <p className="mt-1 font-body text-white/60">
            Design system komponen game · brand navy / oranye / cream
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* BUTTONS */}
          <Section title="Buttons" wide>
            <div className="flex flex-wrap gap-3">
              <GameButton variant="primary">Primary</GameButton>
              <GameButton variant="secondary">Secondary</GameButton>
              <GameButton variant="success">Success</GameButton>
              <GameButton variant="info">Info</GameButton>
              <GameButton variant="danger">Danger</GameButton>
              <GameButton variant="pink">Pink</GameButton>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <GameButton size="sm">Small</GameButton>
              <GameButton size="md">Medium</GameButton>
              <GameButton size="lg">Large</GameButton>
              <GameButton disabled>Disabled</GameButton>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <GameButton variant="success">
                <Play className="h-4 w-4 fill-white" /> Play
              </GameButton>
              <GameButton variant="info">
                <ShoppingBag className="h-4 w-4" /> Shop
              </GameButton>
              <GameButton variant="primary">
                <Zap className="h-4 w-4 fill-white" /> Boost
              </GameButton>
              <GameButton variant="pink">
                <Gift className="h-4 w-4" /> Claim
              </GameButton>
            </div>
          </Section>

          {/* CIRCULAR BUTTONS */}
          <Section title="Circular Buttons">
            <div className="flex flex-wrap gap-3">
              <CircleButton variant="success"><Play className="h-6 w-6 fill-white" /></CircleButton>
              <CircleButton variant="primary"><Pause className="h-6 w-6 fill-white" /></CircleButton>
              <CircleButton variant="info"><RefreshCw className="h-6 w-6" /></CircleButton>
              <CircleButton variant="danger"><X className="h-6 w-6" /></CircleButton>
              <CircleButton variant="secondary"><Menu className="h-6 w-6" /></CircleButton>
              <CircleButton variant="success"><Check className="h-6 w-6" /></CircleButton>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <CircleButton variant="primary" size={44}><Home className="h-5 w-5" /></CircleButton>
              <CircleButton variant="info" size={44}><Volume2 className="h-5 w-5" /></CircleButton>
              <CircleButton variant="pink" size={44}><Music className="h-5 w-5" /></CircleButton>
              <CircleButton variant="secondary" size={44}><Info className="h-5 w-5" /></CircleButton>
              <CircleButton variant="primary" size={44}><Settings className="h-5 w-5" /></CircleButton>
              <CircleButton variant="danger" size={44}><Heart className="h-5 w-5 fill-white" /></CircleButton>
            </div>
          </Section>

          {/* TOGGLES & SLIDERS */}
          <Section title="Toggles & Sliders">
            <div className="flex items-center gap-4">
              <Toggle defaultOn />
              <Toggle />
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <Slider defaultValue={70} color="#4ea62e" />
              <Slider defaultValue={40} color="#0e6bb3" />
            </div>
          </Section>

          {/* TABS & SEGMENTED */}
          <Section title="Tabs & Segmented">
            <div className="flex flex-col items-start gap-3">
              <Segmented options={["Home", "Events", "Shop"]} />
              <Segmented options={["All", "Active", "Selesai", "Favorit"]} />
            </div>
          </Section>

          {/* PROGRESS */}
          <Section title="Progress Bars & Rings" wide>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <ProgressBar value={75} max={100} color="from-[#8ed863] to-[#4ea62e]" />
                <ProgressBar value={45} max={60} color="from-[#ffbe57] to-[#f08020]" />
                <ProgressBar value={30} max={50} color="from-[#ff8080] to-[#e03131]" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <ProgressRing value={82} icon={<Drumstick className="h-4 w-4" />} fill="radial-gradient(circle at 35% 25%, #ffd27a, #f08020)" ring="#ffe08a" />
                <ProgressRing value={67} icon={<Smile className="h-4 w-4" />} fill="radial-gradient(circle at 35% 25%, #ff9ecb, #ff3d92)" ring="#ffc2e0" />
                <ProgressRing value={91} icon={<Zap className="h-4 w-4" />} fill="radial-gradient(circle at 35% 25%, #8fd3ff, #2d9cdb)" ring="#c2e8ff" />
                <ProgressRing value={45} icon={<Newspaper className="h-4 w-4" />} fill="radial-gradient(circle at 35% 25%, #6fe0d0, #16b8a6)" ring="#bff3ec" />
              </div>
            </div>
          </Section>

          {/* BADGES & LABELS */}
          <Section title="Badges & Labels">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="new">New</Badge>
              <Badge tone="hot">Hot</Badge>
              <Badge tone="sale">Sale</Badge>
              <Badge tone="best">Best</Badge>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge tone="neutral">Level 12</Badge>
              <Badge tone="vip" className="text-[#7a4a00]">
                <Crown className="mr-1 h-3.5 w-3.5" /> VIP
              </Badge>
              <Badge tone="hot">Limited Time</Badge>
            </div>
          </Section>

          {/* ICON SET */}
          <Section title="Icon Set">
            <div className="flex flex-wrap gap-2.5">
              <IconTile><Home className="h-5 w-5" /></IconTile>
              <IconTile><Settings className="h-5 w-5" /></IconTile>
              <IconTile><Star className="h-5 w-5" /></IconTile>
              <IconTile><Heart className="h-5 w-5" /></IconTile>
              <IconTile><Bell className="h-5 w-5" /></IconTile>
              <IconTile><Gift className="h-5 w-5" /></IconTile>
              <IconTile><ShoppingBag className="h-5 w-5" /></IconTile>
              <IconTile><Music className="h-5 w-5" /></IconTile>
              <IconTile><Volume2 className="h-5 w-5" /></IconTile>
              <IconTile><Trophy className="h-5 w-5" /></IconTile>
              <IconTile><Info className="h-5 w-5" /></IconTile>
              <IconTile><Zap className="h-5 w-5" /></IconTile>
            </div>
          </Section>

          {/* CURRENCIES & ITEMS */}
          <Section title="Currencies & Items">
            <div className="flex flex-wrap items-center gap-3">
              <Counter icon="🪙" value="250" />
              <Counter icon="💎" value="1.350" withButtons />
              <Counter icon="🐟" value="86" />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Slot state="filled">🎁</Slot>
              <Slot state="filled">⭐</Slot>
              <Slot state="add" />
              <Slot state="locked" />
            </div>
          </Section>

          {/* ACHIEVEMENTS & RANKS */}
          <Section title="Achievements & Ranks">
            <div className="flex flex-wrap items-center gap-4">
              <Medallion grad="linear-gradient(180deg,#e7b178,#b5743a)" edge="#8a5526">
                <Star className="h-7 w-7 fill-white" />
              </Medallion>
              <Medallion grad="linear-gradient(180deg,#eef0f6,#b8bcc8)" edge="#9398a8">
                <Trophy className="h-7 w-7" />
              </Medallion>
              <Medallion grad="linear-gradient(180deg,#ffe27a,#f0a81f)" edge="#cf8c12">
                <Crown className="h-7 w-7 fill-white" />
              </Medallion>
            </div>
          </Section>

          {/* PANELS & DIALOGS */}
          <Section title="Panels & Dialogs" wide>
            <div className="grid gap-6 pt-6 sm:grid-cols-2">
              <Panel title="Are you sure?">
                <p className="text-center font-body text-sm text-gray-text">
                  Mau keluar dari level ini? Progres bisa hilang.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <GameButton variant="secondary" size="sm">Batal</GameButton>
                  <GameButton variant="danger" size="sm">Keluar</GameButton>
                </div>
              </Panel>
              <Panel title="Reward!">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 text-4xl">
                    💎
                  </div>
                  <p className="font-display text-lg font-extrabold text-navy">x50</p>
                  <GameButton variant="success" size="sm">
                    <Check className="h-4 w-4" /> Klaim
                  </GameButton>
                </div>
              </Panel>
            </div>
          </Section>

          {/* GAMEPLAY UI */}
          <Section title="Gameplay UI">
            <div className="flex flex-wrap gap-3">
              <GameStat label="Moves" value="25" />
              <GameStat label="Goal" value="🎯" />
              <GameStat label="Score" value="23.560" />
            </div>
          </Section>

          {/* FRAMES & SLOTS */}
          <Section title="Frames & Slots">
            <div className="flex flex-wrap gap-3">
              <Slot state="filled">🐟</Slot>
              <Slot state="filled">🎩</Slot>
              <Slot state="empty" />
              <Slot state="add" />
              <Slot state="locked" />
            </div>
          </Section>
        </div>

        <p className="mt-10 text-center font-body text-sm text-white/40">
          Kolom Komi Design System · prototipe internal
        </p>
      </div>
    </main>
  );
}

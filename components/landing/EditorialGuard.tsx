import { ShieldCheck } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

const hindari = [
  "Berita duka & musibah",
  "Konflik & kekerasan",
  "Isu SARA & politik partisan",
  "Topik medis sensitif",
];

export function EditorialGuard() {
  return (
    <Section>
      <Reveal>
        <div className="rounded-3xl border-2 border-navy/10 bg-gradient-to-br from-white to-cream p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-kompas/10 text-kompas">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
              Komi tahu kapan harus serius
            </h2>
          </div>
          <p className="mt-4 max-w-2xl font-body text-gray-text">
            Komi hadir untuk bikin berita lebih ramah — bukan menggampangkan. Komi &
            teman-temannya <span className="font-bold text-navy">tidak pernah</span>{" "}
            muncul di konteks:
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {hindari.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 font-body text-sm font-semibold text-navy"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                {h}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-body text-sm text-gray-text">
            Kredibilitas Kompas tetap nomor satu. 🤝
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "./Reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <section id="daftar" className="scroll-mt-24 bg-orange">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            Mau jadi yang pertama nemenin Komi?
          </h2>
          <p className="mt-3 font-body text-white/85">
            Daftar buat dapat akses awal & kabar saat tetangga Komi datang.
          </p>

          {!done ? (
            <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email kamu"
                className="flex-1 rounded-full border-2 border-white/40 bg-white px-5 py-3 font-body text-navy outline-none focus:border-navy/30"
              />
              <Button variant="secondary" className="py-3">
                Daftar
              </Button>
            </form>
          ) : (
            <p className="mx-auto mt-6 max-w-md rounded-2xl bg-white/15 px-5 py-4 font-body font-semibold text-white">
              Makasih ya! Komi bakal kabarin kamu duluan. 🐟{" "}
              <span className="text-xs font-normal opacity-80">(demo — belum tersimpan)</span>
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

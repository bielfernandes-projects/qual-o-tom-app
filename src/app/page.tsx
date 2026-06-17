"use client";

import { useState } from "react";
import { notes, accidentals, modes, progressionPatterns, type Note } from "@/lib/mockData";
import { getHarmonicField, getProgressions } from "@/lib/harmonicField";

const btnBase =
  "h-12 w-12 rounded-lg text-base font-semibold transition-colors duration-150";

const AdSkyscraper = ({ side }: { side: "left" | "right" }) => (
  <aside className="hidden min-w-[160px] lg:sticky lg:top-8 lg:block lg:self-start">
    <div className="flex h-[600px] w-[160px] items-center justify-center rounded-lg bg-zinc-800 text-sm text-zinc-500">
      Espaço para Anúncio ({side === "left" ? "AdSense" : "AdSense"})
    </div>
  </aside>
);

const AdBanner = () => (
  <div className="flex min-h-[90px] w-full max-w-[728px] items-center justify-center rounded-lg bg-zinc-800 text-sm text-zinc-500 lg:hidden">
    Espaço para Anúncio (AdSense)
  </div>
);

export default function Home() {
  const [selectedNote, setSelectedNote] = useState<Note>("C");
  const [selectedAccidental, setSelectedAccidental] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  const field = getHarmonicField(selectedNote, selectedAccidental, selectedMode);
  const progressions = getProgressions(progressionPatterns, field);

  return (
    <div className="mx-auto flex min-h-dvh max-w-7xl items-start justify-center gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <AdSkyscraper side="left" />

      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Toca de Ouvido App
          </h1>
          <p className="mt-1 text-sm text-zinc-400 sm:text-base">
            Campo Harmônico na sua tela
          </p>
        </header>

        <AdBanner />

        <section className="flex w-full flex-col items-center gap-6">
          <p className="text-sm text-zinc-400">Selecione o tom abaixo</p>

          <div className="flex flex-wrap justify-center gap-2">
            {notes.map((n) => (
              <button
                key={n}
                onClick={() => setSelectedNote(n)}
                className={`${btnBase} ${
                  selectedNote === n
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {accidentals.map((a) => (
              <button
                key={a}
                onClick={() =>
                  setSelectedAccidental(selectedAccidental === a ? "" : a)
                }
                className={`${btnBase} w-14 ${
                  selectedAccidental === a
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {modes.map((m) => (
              <button
                key={m.value}
                onClick={() => setSelectedMode(m.value)}
                className={`h-12 rounded-lg px-6 text-base font-semibold transition-colors duration-150 ${
                  selectedMode === m.value
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        <section className="flex min-h-[140px] w-full flex-col items-center justify-center gap-3 rounded-xl bg-zinc-900 p-6">
          <div className="flex w-full flex-wrap justify-center gap-x-4 gap-y-1">
            {field.numerals.map((num, i) => (
              <span key={i} className="text-xs font-medium text-zinc-500">
                {num}
              </span>
            ))}
          </div>
          <div className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2">
            {field.chords.map((chord, i) => (
              <span key={i} className="text-xl font-bold text-zinc-100">
                {chord}
              </span>
            ))}
          </div>
        </section>

        {progressions.length > 0 && (
          <section className="flex w-full flex-col gap-4">
            <h2 className="text-lg font-semibold text-zinc-300">Progressões</h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              {progressions.map((prog) => (
                <div
                  key={prog.name}
                  className="flex flex-1 flex-col gap-4 rounded-xl bg-zinc-900 p-5"
                >
                  <h3 className="text-base font-semibold text-zinc-200">
                    {prog.name}
                  </h3>
                  <p className="text-xs text-zinc-500">{prog.numerals}</p>
                  <div className="flex flex-wrap gap-3">
                    {prog.chords.map((chord, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <span className="text-sm font-bold text-zinc-100">
                          {chord}
                        </span>
                        <div className="flex h-32 w-24 items-center justify-center rounded-md border border-zinc-300 bg-white text-xs text-black">
                          {chord}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <AdBanner />
      </div>

      <AdSkyscraper side="right" />
    </div>
  );
}

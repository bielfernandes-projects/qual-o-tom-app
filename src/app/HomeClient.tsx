"use client";

import { useState, useMemo } from "react";
import { notes, accidentals, modes, progressionPatterns, type Note } from "@/lib/mockData";
import { getHarmonicField, getProgressionChords } from "@/lib/musicEngine";
import ChordDiagram from "@/components/ChordDiagram";

const btnBase = "h-12 w-12 rounded-lg text-base font-semibold transition-colors duration-150";

export default function HomeClient() {
  const [selectedNote, setSelectedNote] = useState<Note>("C");
  const [selectedAccidental, setSelectedAccidental] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [instrument, setInstrument] = useState<"guitar" | "cavaco">("guitar");
  const [showDiagrams, setShowDiagrams] = useState(true);

  const field = useMemo(
    () => getHarmonicField(selectedNote, selectedAccidental, selectedMode),
    [selectedNote, selectedAccidental, selectedMode],
  );
  const progressions = useMemo(
    () => progressionPatterns.map(p => ({
      name: p.name,
      numerals: p.numerals.join(' - '),
      chords: getProgressionChords(field, p.numerals),
    })),
    [field],
  );

  return (
    <>
      <section className="flex w-full flex-col items-center gap-6">
        <p className="text-sm text-zinc-400">Instrumento</p>
        <div className="flex justify-center gap-2">
          {(["guitar", "cavaco"] as const).map((inst) => (
            <button
              key={inst}
              onClick={() => setInstrument(inst)}
              className={`h-12 rounded-lg px-6 text-base font-semibold transition-colors duration-150 ${
                instrument === inst
                  ? "bg-orange-500 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {inst === "guitar" ? "Violão" : "Cavaco"}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setShowDiagrams((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              showDiagrams ? "bg-orange-500" : "bg-zinc-700"
            }`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                showDiagrams ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm text-zinc-400">Mostrar Diagramas</span>
        </div>

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
        <section className="flex w-full flex-col gap-10">
          <h2 className="text-lg font-semibold text-zinc-300">Progressões</h2>
          <div className="flex w-full flex-col gap-8">
            {progressions.map((prog) => (
              <div
                key={prog.name}
                className="flex w-full flex-col gap-4 rounded-xl bg-zinc-900 p-5"
              >
                <h3 className="text-base font-semibold text-zinc-200">
                  {prog.name}
                </h3>
                <p className="text-xs text-zinc-500">{prog.numerals}</p>
                <div className="flex flex-row flex-wrap md:flex-nowrap gap-4 md:gap-8 items-start justify-start">
                  {prog.chords.map((chord, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      {showDiagrams ? (
                        <>
                          <span className="text-sm font-bold text-zinc-100">
                            {chord}
                          </span>
                          <ChordDiagram
                            instrument={instrument}
                            chordName={chord}
                          />
                        </>
                      ) : (
                        <span className="text-lg font-bold text-zinc-100">
                          {chord}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

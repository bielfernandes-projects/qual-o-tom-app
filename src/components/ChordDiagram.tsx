"use client";

import { getChordShape } from "@/lib/chordDb";

interface Props {
  instrument: string
  chordName: string
  light?: boolean
}

const STRING_COUNT: Record<string, number> = { guitar: 6, cavaco: 4 }
const W = 100
const H = 120
const PAD = 10
const TOP = 18
const FRET_H = 22
const FRET_COUNT = 4

export default function ChordDiagram({ instrument, chordName, light }: Props) {
  const shape = getChordShape(instrument, chordName)

  const c = light
    ? {
        bg: "#e4e4e7",
        nut: "#52525b",
        fret: "#a1a1aa",
        string: "#d4d4d8",
        xMark: "#a1a1aa",
        oStroke: "#52525b",
        dot: "#c2410c",
        label: "#52525b",
        fallbackBg: "bg-zinc-100",
        fallbackBorder: "border-zinc-300",
        fallbackText: "text-zinc-500",
        fallbackChord: "text-zinc-900",
      }
    : {
        bg: "#27272a",
        nut: "#a1a1aa",
        fret: "#3f3f46",
        string: "#52525b",
        xMark: "#71717a",
        oStroke: "#a1a1aa",
        dot: "#f97316",
        label: "#a1a1aa",
        fallbackBg: "bg-zinc-900",
        fallbackBorder: "border-zinc-700",
        fallbackText: "text-zinc-500",
        fallbackChord: "text-white",
      }

  if (!shape) {
    return (
      <div className={`w-24 h-32 ${c.fallbackBg} border ${c.fallbackBorder} flex flex-col items-center justify-center text-center p-2 rounded-md`}>
        <span className={`${c.fallbackText} text-xs mb-1`}>Diagrama não mapeado</span>
        <span className={`font-bold ${c.fallbackChord}`}>{chordName}</span>
      </div>
    )
  }

  const frets = shape.split(",")
  const stringCount = STRING_COUNT[instrument] ?? 6
  const stringSpacing = (W - PAD * 2) / (stringCount - 1)

  const stringX = Array.from({ length: stringCount }, (_, i) =>
    Math.round(PAD + i * stringSpacing),
  )

  const frettedNotes = frets.filter((f) => f !== "x" && f !== "0").map(Number)

  const minFret = frettedNotes.length > 0 ? Math.min(...frettedNotes) : 1
  const maxFret = frettedNotes.length > 0 ? Math.max(...frettedNotes) : 1
  const startFret = maxFret > FRET_COUNT ? minFret : 1

  const getYDot = (fret: number) => {
    const rel = fret - startFret + 1
    return TOP + (rel - 1) * FRET_H + FRET_H / 2
  }

  const label = `Diagrama de acorde ${chordName} para ${instrument === "guitar" ? "violão" : "cavaco"}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-24 h-32 shrink-0"
      role="img"
      aria-label={label}
    >
      <rect
        x={PAD}
        y={TOP}
        width={W - PAD * 2}
        height={FRET_H * FRET_COUNT}
        fill={c.bg}
        rx={2}
      />

      {startFret > 1 && (
        <text
          x={PAD - 3}
          y={TOP + FRET_H * 0.65}
          textAnchor="end"
          fontSize={9}
          fontWeight={600}
          fill={c.label}
        >
          {startFret}
        </text>
      )}

      {Array.from({ length: FRET_COUNT + 1 }, (_, i) => (
        <line
          key={`fret-${i}`}
          x1={PAD}
          y1={TOP + i * FRET_H}
          x2={W - PAD}
          y2={TOP + i * FRET_H}
          stroke={i === 0 ? c.nut : c.fret}
          strokeWidth={i === 0 ? 2.5 : 1}
        />
      ))}

      {stringX.map((x) => (
        <line
          key={`str-${x}`}
          x1={x}
          y1={TOP}
          x2={x}
          y2={TOP + FRET_H * FRET_COUNT}
          stroke={c.string}
          strokeWidth={0.7}
        />
      ))}

      {frets.map((fret, i) => {
        const x = stringX[i]

        if (fret === "x") {
          return (
            <text
              key={`m-${i}`}
              x={x}
              y={TOP - 4}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={c.xMark}
            >
              X
            </text>
          )
        }

        const num = Number.parseInt(fret, 10)

        if (num === 0) {
          return (
            <circle
              key={`m-${i}`}
              cx={x}
              cy={TOP - 5}
              r={4.5}
              fill="none"
              stroke={c.oStroke}
              strokeWidth={1.5}
            />
          )
        }

        if (num > 0) {
          const y = getYDot(num)
          return (
            <circle
              key={`m-${i}`}
              cx={x}
              cy={y}
              r={5.5}
              fill={c.dot}
            />
          )
        }

        return null
      })}
    </svg>
  )
}

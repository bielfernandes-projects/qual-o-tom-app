"use client";

interface Props {
  instrument: "guitar" | "cavaco"
  chordName: string
  frets: number[] | null
}

const STRING_COUNT = { guitar: 6, cavaco: 4 }
const W = 96
const H = 120
const PAD = 8
const TOP = 18
const FRET_H = 24

export default function ChordDiagram({ instrument, chordName, frets }: Props) {
  const stringCount = STRING_COUNT[instrument]
  const stringSpacing = (W - PAD * 2) / (stringCount - 1)

  const stringX = Array.from({ length: stringCount }, (_, i) =>
    Math.round(PAD + i * stringSpacing),
  )

  if (!frets || frets.length === 0) {
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="shrink-0">
        <rect x={PAD} y={TOP} width={W - PAD * 2} height={FRET_H * 4} fill="#27272a" rx={2} />
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={`f-${i}`}
            x1={PAD}
            y1={TOP + i * FRET_H}
            x2={W - PAD}
            y2={TOP + i * FRET_H}
            stroke={i === 0 ? "#a1a1aa" : "#3f3f46"}
            strokeWidth={i === 0 ? 2 : 1}
          />
        ))}
        {stringX.map((x) => (
          <line
            key={`s-${x}`}
            x1={x}
            y1={TOP}
            x2={x}
            y2={TOP + FRET_H * 4}
            stroke="#52525b"
            strokeWidth={0.7}
          />
        ))}
      </svg>
    )
  }

  const positiveFrets = frets.filter((f) => f > 0)
  const minFret = positiveFrets.length > 0 ? Math.min(...positiveFrets) : 1
  const hasOpen = frets.includes(0)
  const startFret = !hasOpen && minFret > 1 ? minFret : 1

  const relativeFrets = frets.map((f) => (f > 0 ? f - (startFret - 1) : f))

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="shrink-0">
      <rect
        x={PAD}
        y={TOP}
        width={W - PAD * 2}
        height={FRET_H * 4}
        fill="#27272a"
        rx={2}
      />

      {startFret > 1 && (
        <text
          x={PAD - 2}
          y={TOP + FRET_H * 0.65}
          textAnchor="end"
          fontSize={9}
          fontWeight={600}
          fill="#a1a1aa"
        >
          {startFret}fr
        </text>
      )}

      {Array.from({ length: 5 }, (_, i) => (
        <line
          key={`fret-${i}`}
          x1={PAD}
          y1={TOP + i * FRET_H}
          x2={W - PAD}
          y2={TOP + i * FRET_H}
          stroke={i === 0 ? "#a1a1aa" : "#3f3f46"}
          strokeWidth={i === 0 ? 2.5 : 1}
        />
      ))}

      {stringX.map((x) => (
        <line
          key={`str-${x}`}
          x1={x}
          y1={TOP}
          x2={x}
          y2={TOP + FRET_H * 4}
          stroke="#52525b"
          strokeWidth={0.7}
        />
      ))}

      {relativeFrets.map((fret, i) => {
        const x = stringX[i]

        if (fret === -1) {
          return (
            <text
              key={`m-${i}`}
              x={x}
              y={TOP - 4}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill="#71717a"
            >
              X
            </text>
          )
        }

        if (fret === 0) {
          return (
            <circle
              key={`m-${i}`}
              cx={x}
              cy={TOP - 5}
              r={4.5}
              fill="none"
              stroke="#a1a1aa"
              strokeWidth={1.5}
            />
          )
        }

        const y = TOP + (fret - 1) * FRET_H + FRET_H / 2

        return (
          <circle
            key={`m-${i}`}
            cx={x}
            cy={y}
            r={5.5}
            fill="#f97316"
          />
        )
      })}
    </svg>
  )
}

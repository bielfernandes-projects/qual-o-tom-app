type ChordShape = [number[] | null, number[] | null]

const GUITAR_MAJOR_TEMPLATE: Record<string, number[]> = {
  C: [-1, 3, 2, 0, 1, 0],
  D: [-1, -1, 0, 2, 3, 2],
  E: [0, 2, 2, 1, 0, 0],
  F: [1, 3, 3, 2, 1, 1],
  G: [3, 2, 0, 0, 0, 3],
  A: [-1, 0, 2, 2, 2, 0],
  B: [-1, 2, 4, 4, 4, 2],
}

const GUITAR_MINOR_TEMPLATE: Record<string, number[]> = {
  Cm: [-1, 3, 5, 5, 4, 3],
  Dm: [-1, -1, 0, 2, 3, 1],
  Em: [0, 2, 2, 0, 0, 0],
  Fm: [1, 3, 3, 1, 1, 1],
  Gm: [3, 5, 5, 3, 3, 3],
  Am: [-1, 0, 2, 2, 1, 0],
  Bm: [-1, 2, 4, 4, 3, 2],
}

const GUITAR_7TH_TEMPLATE: Record<string, number[]> = {
  C7: [-1, 3, 2, 3, 1, 0],
  D7: [-1, -1, 0, 2, 1, 2],
  E7: [0, 2, 2, 1, 3, 0],
  F7: [-1, -1, 3, 2, 1, 1],
  G7: [3, 2, 0, 0, 0, 1],
  A7: [-1, 0, 2, 0, 2, 0],
  B7: [-1, 2, 1, 2, 0, 2],
}

const CAVACO_MAJOR_TEMPLATE: Record<string, number[]> = {
  C: [2, 0, 1, 2],
  D: [2, 2, 2, 0],
  E: [1, 4, 3, 2],
  F: [2, 0, 1, 0],
  G: [0, 0, 0, 0],
  A: [2, 1, 0, 0],
  B: [4, 2, 2, 2],
}

const CAVACO_MINOR_TEMPLATE: Record<string, number[]> = {
  Cm: [3, 3, 3, 3],
  Dm: [2, 2, 1, 0],
  Em: [0, 4, 3, 2],
  Fm: [1, 5, 4, 3],
  Gm: [3, 0, 3, 3],
  Am: [2, 0, 0, 0],
  Bm: [4, 2, 2, 2],
}

const CAVACO_7TH_TEMPLATE: Record<string, number[]> = {
  C7: [0, 0, 0, 1],
  D7: [2, 0, 2, 0],
  E7: [0, 4, 0, 2],
  F7: [2, 0, 1, 3],
  G7: [0, 0, 0, 2],
  A7: [0, 1, 0, 0],
  B7: [2, 2, 2, 4],
}

const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function transpose(shape: number[], semitones: number): number[] {
  return shape.map((f) => {
    if (f === -1 || f === 0) return f
    const next = f + semitones
    if (next > 12) return 12
    return next
  })
}

function findAllInKey(
  templates: Record<string, number[]>,
  keyNotes: string[],
): Record<string, number[]> {
  const result: Record<string, number[]> = {}
  for (const templateNote of Object.keys(templates)) {
    const templateIndex = CHROMATIC.indexOf(templateNote)
    if (templateIndex === -1) continue
    const shape = templates[templateNote]
    for (const target of keyNotes) {
      const targetIndex = CHROMATIC.indexOf(target)
      if (targetIndex === -1) continue
      const diff = (targetIndex - templateIndex + 12) % 12
      result[target] = transpose(shape, diff)
    }
  }
  return result
}

const ALL_NOTES = CHROMATIC

export const chordDb: Record<string, { guitar: number[]; cavaco: number[] }> = {}

function addSet(
  suffix: string,
  guitarTemplates: Record<string, number[]>,
  cavacoTemplates: Record<string, number[]>,
) {
  const guitarMap = findAllInKey(guitarTemplates, ALL_NOTES)
  const cavacoMap = findAllInKey(cavacoTemplates, ALL_NOTES)

  for (const note of ALL_NOTES) {
    const key = `${note}${suffix}`
    const gShape = guitarMap[note]
    const cShape = cavacoMap[note]
    if (gShape || cShape) {
      chordDb[key] = {
        guitar: gShape ?? null as unknown as number[],
        cavaco: cShape ?? null as unknown as number[],
      }
    }
  }
}

addSet('', GUITAR_MAJOR_TEMPLATE, CAVACO_MAJOR_TEMPLATE)
addSet('m', GUITAR_MINOR_TEMPLATE, CAVACO_MINOR_TEMPLATE)
addSet('7', GUITAR_7TH_TEMPLATE, CAVACO_7TH_TEMPLATE)

export function getChordShape(
  instrument: 'guitar' | 'cavaco',
  chordName: string,
): number[] | null {
  const candidates = [
    chordName,
    chordName.replace(/7$/, 'm'),
    chordName.replace(/maj7$/, ''),
    chordName.replace(/m7$/, 'm'),
    chordName.replace(/dim$/, 'm'),
    chordName.replace(/[^A-G](#|b)?$/, (_m: string, a?: string) => a ?? ''),
    chordName.match(/^[A-G](#|b)?/)?.[0] ?? '',
  ]

  for (const key of candidates) {
    const entry = chordDb[key]
    if (entry) {
      const shape = entry[instrument]
      if (shape && shape.length > 0) {
        return shape
      }
      if (shape === null) entry[instrument] = instrument === 'guitar' ? [0, 0, 0, 0, 0, 0] : [0, 0, 0, 0]
    }
  }

  return null
}

const CHROMATIC_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const CHROMATIC_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

const NOTE_TO_SEMITONE: Record<string, number> = {
  C: 0, 'B#': 0,
  'C#': 1, Db: 1,
  D: 2,
  'D#': 3, Eb: 3,
  E: 4, Fb: 4,
  'E#': 5, F: 5,
  'F#': 6, Gb: 6,
  G: 7,
  'G#': 8, Ab: 8,
  A: 9,
  'A#': 10, Bb: 10,
  B: 11, Cb: 11,
}

const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11]
const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10]

const ROMAN_MAP: Record<string, number> = {
  I: 0, II: 1, III: 2, IV: 3, V: 4, VI: 5, VII: 6,
}

export interface HarmonicFieldResult {
  noteName: string
  numerals: string[]
  chords: string[]
}

export function getHarmonicField(
  note: string,
  accidental: string,
  mode: string,
): HarmonicFieldResult {
  const rootName = accidental ? `${note}${accidental}` : note
  const rootIndex = NOTE_TO_SEMITONE[rootName]
  if (rootIndex === undefined) return getHarmonicField('C', '', '')

  const chromatic = accidental === 'b' ? CHROMATIC_FLAT : CHROMATIC_SHARP
  const intervals = mode === 'm' ? MINOR_INTERVALS : MAJOR_INTERVALS
  const isMajor = mode !== 'm'

  const scaleNotes = intervals.map((i) => chromatic[(rootIndex + i) % 12])

  const chordQualities = isMajor
    ? ['', 'm', 'm', '', '', 'm', 'dim']
    : ['m', 'dim', '', 'm', 'm', '', '']

  const numeralSet = isMajor
    ? ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']
    : ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII']

  const chords = scaleNotes.map((sn, i) => `${sn}${chordQualities[i]}`)

  return { noteName: rootName, numerals: numeralSet, chords }
}

function extractRoot(chord: string): string {
  const m = chord.match(/^[A-G](#|b)?/)
  return m ? m[0] : chord
}

export function getProgressionChords(
  field: HarmonicFieldResult,
  numerals: string[],
): string[] {
  return numerals.map((numeral) => {
    const romanMatch = numeral.match(/^[IVXLCDM]+/)
    if (!romanMatch) return numeral

    const roman = romanMatch[0]
    const suffix = numeral.slice(roman.length)
    const index = ROMAN_MAP[roman]
    if (index === undefined || index >= field.chords.length) return numeral

    const root = extractRoot(field.chords[index])
    return root + suffix
  })
}

export const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const
export type Note = (typeof notes)[number]

export const accidentals = ['#', 'b'] as const
export type Accidental = (typeof accidentals)[number]

export const modes = [
  { label: 'Maior', value: '' },
  { label: 'Menor', value: 'm' },
] as const

export interface ProgressionPattern {
  name: string
  numerals: string
}

export const progressionPatterns: ProgressionPattern[] = [
  { name: 'Pop', numerals: 'I - V - VIm - IV' },
  { name: 'Jazz', numerals: 'IIm7 - V7 - Imaj7' },
]

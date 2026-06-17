# Changelog

Todas as alterações notáveis neste projeto serão documentadas aqui.

## [0.3.0] — 17/06/2026

### Adicionado
- Banco de acordes (`lib/chordDb.ts`) com 36 acordes × 2 instrumentos via templates + transposição
- Templates de forma (maior, menor, sétima) para violão e cavaco
- `getChordShape(instrument, chordName)` com fallback progressivo (exato → sem extensão → tônica → null)
- Componente `<ChordDiagram />` com SVG profissional (96×120):
  - Fundo escuro (zinc-800) simulando braço do instrumento
  - Grid de cordas × trastes (6 ou 4 cordas, 4 casas)
  - Nut mais grosso na primeira casa
  - Indicador `nfr` quando acorde começa em casa > 1
  - `X` para corda mutada, `O` vazado para corda solta
  - Bolinhas laranja (`#f97316`) nas posições dos trastes
  - Fallback discreto: grid vazio sem quebrar layout
- Seletor de instrumento (Violão / Cavaco) antes dos seletores de tom

### Alterado
- `ChordDiagram` refatorado: cores das bolinhas (preto → branco → laranja)
- Nome do acorde removido do diagrama (já exibido acima)
- `page.tsx`: import trocado de `chordDictionary` para `chordDb`

### Removido
- `lib/chordDictionary.ts` (substituído pelo `chordDb.ts` com templates)

## [0.2.0] — 17/06/2026

### Adicionado
- Motor musical (`lib/musicEngine.ts`) com funções puras:
  - `getHarmonicField(note, accidental, mode)` — calcula campo harmônico real
  - `getProgressionChords(field, numerals[])` — mapeia numerais para acordes
- Tratamento de edge cases: E# → F, B# → C, Cb → B, Fb → E
- Progressões armazenadas como array de strings (em vez de string com hífens)

### Alterado
- Substituído `lib/harmonicField.ts` por `lib/musicEngine.ts`
- `page.tsx` agora importa do `musicEngine` em vez do `harmonicField`
- Dados mock (`progressionPatterns`) agora usam arrays de numerais

### Removido
- `lib/harmonicField.ts` (substituído pelo motor musical)

## [0.1.1] — 17/06/2026

### Adicionado
- Anúncios laterais no desktop (skyscraper 160×600)
- Anúncios como banners horizontais no mobile (728×90)

## [0.1.0] — 17/06/2026

### Adicionado
- Setup inicial com Next.js 16 + Tailwind + TypeScript
- Seletor de tom (nota, acidente, modo) com estado React
- Campo harmônico reativo
- Cards de progressão (Pop e Jazz)
- Placeholders de diagrama de acordes
- Layout responsivo mobile-first
- Dark mode padrão
- Configuração de remote GitHub

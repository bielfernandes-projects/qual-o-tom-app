# Changelog

Todas as alterações notáveis neste projeto serão documentadas aqui.

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

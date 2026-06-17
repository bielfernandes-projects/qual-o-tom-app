# Arquitetura — Toca de Ouvido App

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 |
| Fonte | Geist (Vercel) |

## Estrutura de Pastas

```
src/
  app/
    globals.css      — estilos globais, dark mode (zinc-950)
    layout.tsx       — root layout, metadata, font
    page.tsx         — página principal (Client Component)
  lib/
    mockData.ts      — dados estáticos (notas, acidentes, modos, patterns)
    musicEngine.ts   — motor de teoria musical (puro TS, sem React)
docs/
  ARCHITECTURE.md    — este arquivo
  CHANGELOG.md       — histórico de alterações
```

## Fluxo de Dados

```
Usuário clica em Nota / Acidente / Modo
        │
        ▼
useState atualiza selectedNote / selectedAccidental / selectedMode
        │
        ▼
getHarmonicField(note, accidental, mode)
  → calcula escala + acordes do campo harmônico
  → retorna { noteName, numerals[], chords[] }
        │
        ▼
getProgressionChords(field, numerals[])
  → mapeia cada numeral romano ao chord correspondente
  → retorna string[] com os acordes da progressão
        │
        ▼
Renderiza campo harmônico + cards de progressão
```

## Motor Musical (`musicEngine.ts`)

Arquivo puramente funcional, sem dependências. Duas funções exportadas:

### `getHarmonicField(note, accidental, mode)`

1. Monta o nome da fundamental (ex: `C` + `#` → `C#`)
2. Mapeia para índice cromático (0–11)
3. Aplica intervalos da escala Maior `[0,2,4,5,7,9,11]` ou Menor `[0,2,3,5,7,8,10]`
4. Escolhe array cromático (sustenidos ou bemóis) conforme o acidente
5. Aplica sufixos de qualidade (`''`, `m`, `dim`) por grau
6. Retorna `{ noteName, numerals[], chords[] }`

### `getProgressionChords(field, numerals[])`

1. Para cada numeral (ex: `'IIm7'`), extrai o romano base (`II`) e o sufixo (`m7`)
2. Mapeia o romano para índice do campo harmônico
3. Extrai a root do chord naquele índice
4. Concatena root + sufixo (ex: `D` + `m7` → `Dm7`)
5. Retorna `string[]`

### Edge Cases Tratados

| Entrada | Tratamento |
|---|---|
| `E#` | Mapeado para semitom 5 (igual F) |
| `B#` | Mapeado para semitom 0 (igual C) |
| `Cb` | Mapeado para semitom 11 (igual B) |
| `Fb` | Mapeado para semitom 4 (igual E) |
| Nota inválida | Fallback para C |

## Layout e Responsividade

- **Mobile-first**: `max-w-3xl` para o conteúdo principal, `px-4` nas laterais
- **Desktop** (>= `lg`): anúncios laterais fixos (skyscraper 160×600)
- **Mobile** (< `lg`): anúncios como banners horizontais (728×90)
- Dark mode padrão, sem toggle (`bg-zinc-950`)

## Convenções de Código

- `"use client"` apenas onde há interatividade (useState, onClick)
- Sem comentários no código (salvo documentação)
- Sem CSS modules — tudo Tailwind utility classes
- Tipos exportados em `mockData.ts` ou `musicEngine.ts`

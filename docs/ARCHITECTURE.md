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
  components/
    ChordDiagram.tsx — SVG de diagrama de acordes (violão / cavaco)
  lib/
    mockData.ts      — dados estáticos (notas, acidentes, modos, patterns)
    musicEngine.ts   — motor de teoria musical (puro TS, sem React)
    chordDb.ts       — banco de acordes com templates + transposição
docs/
  ARCHITECTURE.md    — este arquivo
  CHANGELOG.md       — histórico de alterações
```

## Fluxo de Dados

```
Usuário seleciona Instrumento │
        ▼
useState atualiza instrument ('guitar' | 'cavaco')

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
getChordShape(instrument, chordName)
  → busca shape no banco (chordDb)
  → retorna number[] ou null
        │
        ▼
<ChordDiagram instrument frets={shape} />
  → renderiza SVG diagrama (ou grid vazio se null)
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

## Banco de Acordes (`chordDb.ts`)

Arquivo puro TS, sem dependências. Usa **6 templates** (violão maior/menor/sétima + cavaco maior/menor/sétima) e transpõe para as 12 notas via `findAllInKey()`, gerando **36 acordes × 2 instrumentos** automaticamente.

### `getChordShape(instrument, chordName)`

1. Tenta lookup exato (`Dm7`)
2. Tenta sem extensão (`Dm7` → `Dm`)
3. Tenta só a tônica (`Dm` → `D`)
4. Retorna `null` → componente exibe grid vazio

### Templates de Forma

| Template | Violão (referência) | Cavaco (referência) |
|---|---|---|
| Maior | C: x32010 | C: 2012 |
| Menor | Am: x02210 | Dm: 2210 |
| Sétima | E7: 020100 | C7: 0001 |

## Componente `<ChordDiagram />`

SVG puro, `96×120` px, dimensão fixa para evitar layout shift. Props:

```ts
interface Props {
  instrument: "guitar" | "cavaco"
  chordName: string
  frets: number[] | null
}
```

**Renderização:**
1. Fundo escuro (`#27272a`) para o braço, com 4 trastes (5 linhas horizontais)
2. Linhas verticais para cordas (6 ou 4, espaçamento proporcional)
3. Nut (linha 0) mais grossa que as demais
4. Se acorde inicia após casa 1: texto `nfr` no canto superior esquerdo
5. `X` estilizado para corda mutada (-1), `O` vazado para corda solta (0)
6. Círculos laranja (`#f97316`) nas posições dos trastes (>0)
7. Fallback: grid vazio (sem bolinhas nem textos)

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

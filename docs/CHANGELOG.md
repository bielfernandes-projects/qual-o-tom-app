# Changelog

Todas as alterações notáveis neste projeto serão documentadas aqui.

## [0.6.0] — 18/06/2026

### Adicionado
- `robots.txt` com referência ao sitemap XML
- Sitemap XML (`/sitemap.xml`) com URLs do app e política de privacidade
- `aria-label` e `role="img"` nos SVGs dos diagramas de acorde para acessibilidade SEO
- Server/Client Component split: página principal agora é Server Component (SSR), parte interativa em `HomeClient.tsx`

### Alterado
- Title e description incluem "Dicionário de Acordes para violão e cavaco"
- Script do AdSense migrado para `next/script` com `strategy="afterInteractive"` (melhor LCP)
- Keywords ampliadas com "dicionário de acordes"

### Removido
- `public/site.webmanifest` duplicado (substituído pelo `manifest.ts` do Next.js)

## [0.5.0] — 18/06/2026

### Adicionado
- Vercel Analytics (`@vercel/analytics`) para rastreamento de acessos
- Script do Google AdSense (`ca-pub-4704944043310509`) no `<head>` do layout
- Página de Política de Privacidade (`/politica-de-privacidade`) com texto legal (cookies, AdSense, links de terceiros)
- Footer no rodapé do app com copyright e link para a política de privacidade

## [0.4.1] — 18/06/2026

### Corrigido
- Layout das progressões no desktop: cartas agora empilham verticalmente em vez de lado a lado
- Favicon.ico copiado para `app/` para resolução do favicon em produção (Next.js file-based convention)

## [0.4.0] — 18/06/2026

### Adicionado
- Favicons (favicon.ico, favicon-16x16.png, favicon-32x32.png, icon.png, apple-touch-icon.png) com referências no metadata
- Manifest PWA (`src/app/manifest.ts`) com ícones android-chrome-192x192 e 512x512
- Logo (`/logo.png`) no cabeçalho da página
- Toggle "Mostrar Diagramas" para exibir/ocultar diagramas de acordes nas progressões
- Viewport config (`themeColor`, `initialScale`) no layout
- Metadados SEO: keywords, applicationName, openGraph (pt_BR)
- Acordes diminutos (dim) no banco de dados para violão e cavaco
- Progressões de música brasileira: Samba/Pagode, Sertanejo, Sofrência/Piseiro, Brega, Rock, Reggae/Forró

### Alterado
- Rebranding: "Toca de Ouvido App" → "Qual o Tom App"
- `chordDb.ts` refatorado: de templates com transposição para dados flat com strings CSV; cobertura expandida para todas as 12 tonalidades (maior, menor, sétima, dim)
- `getChordShape` simplificado: retorna `string | null` (CSV) em vez de `number[] | null`
- `ChordDiagram.tsx`: agora busca shape internamente via `getChordShape`; renderiza SVG com `viewBox` dinâmico e suporte a início em casa > 4
- `mockData.ts`: progressões substituídas por gêneros brasileiros

### Corrigido
- Fallback de diagrama agora exibe "Diagrama não mapeado" + nome do acorde

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

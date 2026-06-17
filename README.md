# Toca de Ouvido App

App utilitário para músicos — calcula o campo harmônico de qualquer tom e exibe progressões de acordes.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Geist** (fonte)

## Como Rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Funcionalidades

- Seletor de tom (7 notas × 2 acidentes × 2 modos)
- Campo harmônico com 7 graus e acordes reativos
- Progressões de acordes que se adaptam ao tom selecionado
- Diagramas placeholder para cada acorde
- Layout responsivo (mobile + desktop com anúncios laterais)

## Estrutura

```
src/
  app/              — páginas e layout
  lib/              — lógica de domínio (mockData, musicEngine)
docs/               — documentação e changelog
```

## Licença

Projeto privado.

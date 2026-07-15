# DoseRx

Aplicação de consulta rápida de fármacos em Medicina Intensiva, integrada visualmente na família JoFrutas/ICU Tools Hub.

> **Estado clínico:** esta primeira versão contém apenas fichas seed **não validadas**. Não inclui doses utilizáveis em prescrição. A aplicação é uma estrutura de apoio e não substitui validação clínica, farmacêutica, bibliográfica ou protocolos locais.

## Correr localmente

```bash
npm install
npm run dev
```

Checks disponíveis:

```bash
npm run lint
npm run test
npm run build
```

O teste unitário usa o runner nativo e o suporte TypeScript do Node 22 ou superior.

## Organização

- `src/data/categories.ts` — taxonomia de categorias.
- `src/data/drugs.ts` — fichas seed e conteúdo clínico estruturado.
- `src/types/drug.ts` — interfaces `Drug`, `DrugCategory`, `DoseAdjustment`, `RenalAdjustment`, `HepaticAdjustment` e `PrescriptionExample`.
- `src/pages` — início, categoria e detalhe do fármaco.
- `src/components` — componentes visuais reutilizáveis.
- `src/lib/search.ts` — pesquisa por nome, alias, classe, indicação e categoria.

## Adicionar e validar um fármaco

1. Adicionar uma ficha a `src/data/drugs.ts` seguindo a interface `Drug`.
2. Manter `validationStatus: 'not-validated'` e `confidence: 'unvalidated'` durante a preparação.
3. Preencher cada recomendação com `sourceIds` que correspondam a entradas em `references`.
4. Registar a data em `lastReviewedAt` no formato `AAAA-MM-DD`.
5. Submeter o conteúdo a revisão médica/farmacêutica e confirmar formulações, vias, unidades, limites, ajustes renal/hepático, compatibilidades e protocolos locais.
6. Só após aprovação alterar o estado para `validated` e atribuir um nível de confiança.

O helper `createUnvalidatedDrugSeed` existe apenas para demonstrar a UI sem inventar doses. Fichas clínicas reais devem ser objectos explícitos, rastreáveis e revistos.

## Deploy

A app é uma SPA estática Vite com navegação por hash, pelo que pode ser importada directamente no Vercel sem regras de rewrite. Build command: `npm run build`; output: `dist`.

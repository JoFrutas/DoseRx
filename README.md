# DoseRx

Aplicação de consulta rápida de fármacos em Medicina Intensiva, integrada visualmente na família JoFrutas/ICU Tools Hub.

> **Estado clínico:** o catálogo contém 550 fármacos. Nesta versão, 14 fichas prioritárias têm conteúdo documentado e permanecem **em revisão**; as restantes 536 apresentam placeholders explícitos e **não validados**. Nenhuma ficha deve ser usada para prescrever sem validação médica, farmacêutica e dos protocolos locais.

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

## Organização dos dados

- `src/data/sources/catalogo-farmacos.json` — transcrição estruturada das 714 linhas do catálogo fornecido.
- `src/data/catalog.generated.ts` — 550 entradas únicas geradas a partir do catálogo; não editar manualmente.
- `src/data/reviewedDrugs.ts` — fichas clínicas documentadas, ainda em revisão local.
- `src/data/drugBuilders.ts` — geradores dos placeholders não validados.
- `src/data/categories.ts` — taxonomia de categorias.
- `src/data/drugs.ts` — composição final do catálogo e sobreposição das fichas documentadas.
- `src/types/drug.ts` — tipos `Drug`, `DrugCategory`, `DoseAdjustment`, `RenalAdjustment`, `HepaticAdjustment` e `PrescriptionExample`.
- `src/lib/search.ts` — pesquisa por nome, alias, classe, prioridade, subcategoria, indicação e categoria.

Para reconstruir o catálogo depois de alterar o JSON de origem:

```bash
npm run catalog:generate
```

## Política de fontes

O Medscape pode ser usado como comparador, mas não como única base de validação. As fichas devem privilegiar:

1. RCM/SmPC europeu ou português e documentação INFARMED;
2. rotulagem oficial DailyMed/FDA quando acrescenta informação relevante;
3. guidelines de sociedades científicas;
4. protocolos institucionais específicos para hemodiálise e técnicas contínuas.

Quando fontes válidas divergem, a ficha deve identificar a diferença e privilegiar o contexto europeu/português. Doses, diluições, velocidades, formulações e ajustes dependentes da modalidade devem ser confirmados localmente.

## Adicionar ou validar um fármaco

1. Confirmar a entrada e prioridade no catálogo de origem.
2. Criar uma ficha explícita em `src/data/reviewedDrugs.ts` seguindo a interface `Drug`.
3. Associar `sourceIds` a cada dose, ajuste e exemplo de prescrição.
4. Manter `validationStatus: 'in-review'` até revisão médica e farmacêutica local.
5. Registar `lastReviewedAt` no formato `AAAA-MM-DD` e documentar dúvidas em `reviewNotes`.
6. Confirmar formulações disponíveis, vias, unidades, limites, ajustes renal/hepático, compatibilidades, monitorização e protocolos locais.
7. Só após aprovação alterar o estado para `validated` e atribuir o nível de confiança correspondente.

## Deploy

A app é uma SPA estática Vite com navegação por hash. No Vercel: build command `npm run build`; output `dist`.

# DoseRx

Aplicação de consulta rápida de fármacos em Medicina Intensiva, integrada visualmente na família JoFrutas/ICU Tools Hub.

> **Estado clínico:** o catálogo contém 550 fármacos. Nesta versão existem 103 fichas clínicas estruturadas: 6 com consenso multiponto, 12 adicionais com fontes primárias verificadas e 85 em revisão documental. Permanecem 447 entradas com placeholders explícitos.

## Correr localmente

```bash
npm install
npm run dev
```

Checks disponíveis:

```bash
npm run lint
npm run test
npm run clinical:audit
npm run build
```

O teste unitário usa o runner nativo e o suporte TypeScript do Node 22 ou superior.

## Organização dos dados

- `src/data/sources/catalogo-farmacos.json` — transcrição estruturada das 714 linhas do catálogo fornecido.
- `src/data/catalog.generated.ts` — 550 entradas únicas geradas a partir do catálogo; não editar manualmente.
- `src/data/reviewedDrugs.ts` — fichas clínicas com fontes primárias verificadas.
- `src/data/expandedClinicalDrugs.ts` — 102 fichas estruturadas importadas da fonte clínica local; as sobreposições são substituídas pelas fichas primárias já revistas.
- `src/data/crossSourceVerification.ts` — comparação rastreável entre a fonte local, Medscape, Drugs.com e fontes primárias, incluindo discrepâncias dependentes da jurisdição.
- `src/data/drugCalculators.ts` — calculadoras activadas apenas nas fichas com fontes verificadas.
- `src/lib/calculators.ts` — fórmulas puras de dose por peso, velocidade de perfusão e volume/tempo.
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

O Medscape e o Drugs.com são comparadores clínicos rápidos, mas não constituem isoladamente uma validação independente. As fichas devem privilegiar:

1. RCM/SmPC europeu ou português e documentação INFARMED;
2. rotulagem oficial DailyMed/FDA quando acrescenta informação relevante;
3. guidelines de sociedades científicas;
4. protocolos institucionais específicos para hemodiálise e técnicas contínuas.

O estado de consenso multiponto exige concordância da fonte local, Medscape, Drugs.com e pelo menos uma fonte primária independente no âmbito explicitado. Uma maioria numérica não resolve diferenças de formulação, indicação off-label, modalidade de substituição renal ou jurisdição. Quando fontes válidas divergem, a ficha identifica a diferença e privilegia o contexto europeu/português.

## Adicionar ou validar um fármaco

1. Confirmar a entrada e prioridade no catálogo de origem.
2. Criar uma ficha explícita em `src/data/reviewedDrugs.ts` seguindo a interface `Drug`.
3. Associar `sourceIds` a cada dose, ajuste e exemplo de prescrição.
4. Usar `in-review` durante a pesquisa e `source-verified` apenas após confirmar todas as recomendações nas fontes associadas.
5. Registar `lastReviewedAt` no formato `AAAA-MM-DD` e documentar dúvidas em `reviewNotes`.
6. Confirmar formulações disponíveis, vias, unidades, limites, ajustes renal/hepático, compatibilidades, monitorização e protocolos locais.
7. Só após aprovação alterar o estado para `validated` e atribuir o nível de confiança correspondente.

## Calculadoras

As calculadoras são definições data-driven associadas a uma ficha. Cada definição exige `sourceIds` válidos e só é publicada em fármacos com estado `source-verified` ou `validated`.

- **Dose por peso:** peso × dose/kg, com limite máximo e volume do concentrado quando a concentração é inequívoca.
- **Perfusão:** converte a dose alvo e a preparação confirmada em mL/h.
- **Volume/tempo:** converte o volume final e a duração prescrita em mL/h.

As fórmulas não escolhem indicação, peso de dose, função renal/hepática, concentração local ou arredondamento. Esses parâmetros continuam a ser responsabilidade do prescritor e do protocolo institucional.

## Deploy

A app é uma SPA estática Vite com navegação por hash. No Vercel: build command `npm run build`; output `dist`.

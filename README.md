# DoseRx

Aplicação de consulta rápida de fármacos em Medicina Intensiva, integrada visualmente na família JoFrutas/ICU Tools Hub.

> **Estado do catálogo:** existem 552 entradas pesquisáveis. Destas, 6 têm consenso multiponto, 15 têm fontes primárias verificadas, 173 estão em revisão e 358 ainda não têm validação clínica. Os estados são mostrados na interface e as fichas em revisão ou não validadas não devem ser usadas como suporte autónomo à prescrição.

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

- `src/data/sources/catalogo-farmacos.json` — inventário interno com 716 linhas e 552 entradas únicas; define âmbito e taxonomia, mas não é uma referência bibliográfica.
- `src/data/sources/reviewed-clinical-reference.md` — documento interno de trabalho usado para importar conteúdo; não aparece nem pode ser citado como referência bibliográfica.
- `src/data/sources/reviewed-clinical-notes.json` — 185 blocos clínicos extraídos do documento interno e mapeados para 190 entradas; conserva proveniência técnica, não bibliografia.
- `src/data/catalog.generated.ts` — 552 entradas únicas geradas a partir do catálogo; não editar manualmente.
- `src/data/catalogReviewedDrugs.ts` — constrói as fichas restantes, usando as notas revistas quando existem e evitando doses numéricas não documentadas.
- `src/data/reviewedDrugs.ts` — fichas clínicas com fontes primárias verificadas.
- `src/data/expandedClinicalDrugs.ts` — 141 rascunhos estruturados no modelo clínico completo; permanecem `in-review` até revisão médica e farmacêutica individual. As sobreposições são substituídas pelas fichas com fontes primárias verificadas.
- `src/data/crossSourceVerification.ts` — comparação rastreável entre Medscape, Drugs.com e fontes primárias/regulatórias, incluindo discrepâncias dependentes da jurisdição.
- `src/data/drugCalculators.ts` — calculadoras activadas apenas nas fichas com fontes verificadas.
- `src/lib/calculators.ts` — fórmulas puras de dose por peso, velocidade de perfusão e volume/tempo.
- `src/data/drugBuilders.ts` — tipos e auxiliares partilhados para construir doses e exemplos.
- `src/data/categories.ts` — taxonomia de categorias.
- `src/data/drugs.ts` — composição final do catálogo e sobreposição das fichas documentadas.
- `src/types/drug.ts` — tipos `Drug`, `DrugCategory`, `DoseAdjustment`, `RenalAdjustment`, `HepaticAdjustment` e `PrescriptionExample`.
- `src/lib/search.ts` — pesquisa por nome, alias, classe, prioridade, subcategoria, indicação e categoria.

Para reconstruir o catálogo depois de alterar o JSON de origem:

```bash
npm run catalog:generate
```

Para voltar a extrair e mapear as notas depois de editar o documento clínico:

```bash
npm run clinical:notes:generate
```

## Política de fontes

Os ficheiros do próprio projeto, listas de trabalho, folhas de cálculo, catálogos e documentos de importação são apenas proveniência interna. Nunca são apresentados ao utilizador como bibliografia e nunca contam para consenso entre fontes.

O Medscape e o Drugs.com são comparadores clínicos rápidos, mas não constituem isoladamente uma validação independente. As fichas devem privilegiar:

1. RCM/SmPC europeu ou português e documentação INFARMED;
2. rotulagem oficial DailyMed/FDA quando acrescenta informação relevante;
3. guidelines de sociedades científicas;
4. protocolos institucionais específicos para hemodiálise e técnicas contínuas.

O estado de consenso multiponto exige concordância entre Medscape, Drugs.com e pelo menos uma fonte primária, regulatória ou guideline independente no âmbito explicitado. Uma maioria numérica não resolve diferenças de formulação, indicação off-label, modalidade de substituição renal ou jurisdição. Quando fontes válidas divergem, a ficha identifica a diferença e privilegia o contexto europeu/português.

Estados documentais:

- `validated` — consenso multiponto sem discrepâncias materiais no âmbito definido;
- `source-verified` — recomendações ligadas a fontes primárias, regulatórias ou guidelines específicas;
- `in-review` — rascunho clínico estruturado ainda sem validação médica e farmacêutica completa;
- `not-validated` — entrada de catálogo ou conteúdo genérico, sem bibliografia clínica específica.

## Adicionar ou rever um fármaco

1. Confirmar a entrada e prioridade no catálogo de origem.
2. Criar uma ficha explícita em `src/data/reviewedDrugs.ts` seguindo a interface `Drug`.
3. Associar `sourceIds` a cada dose, ajuste e exemplo de prescrição.
4. Associar o estado documental interno adequado e não publicar uma dose numérica sem fonte identificada.
5. Registar `lastReviewedAt` no formato `AAAA-MM-DD` e documentar dúvidas em `reviewNotes`.
6. Confirmar formulações disponíveis, vias, unidades, limites, ajustes renal/hepático, compatibilidades, monitorização e protocolos locais.
7. Registar discrepâncias entre fontes em vez de as resolver por maioria simples quando dependem da indicação, apresentação ou jurisdição.

## Calculadoras

As calculadoras são definições data-driven associadas a uma ficha. Cada definição exige `sourceIds` válidos e só é publicada em fármacos com estado `source-verified` ou `validated`.

- **Dose por peso:** peso × dose/kg, com limite máximo e volume do concentrado quando a concentração é inequívoca.
- **Perfusão:** converte a dose alvo e a preparação confirmada em mL/h.
- **Volume/tempo:** converte o volume final e a duração prescrita em mL/h.

As fórmulas não escolhem indicação, peso de dose, função renal/hepática, concentração local ou arredondamento. Esses parâmetros continuam a ser responsabilidade do prescritor e do protocolo institucional.

## Deploy

A app é uma SPA estática Vite com navegação por hash. No Vercel: build command `npm run build`; output `dist`.

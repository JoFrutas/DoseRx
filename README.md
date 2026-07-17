# DoseRx

Aplicação de consulta rápida de fármacos em Medicina Intensiva, integrada visualmente na família JoFrutas/ICU Tools Hub.

> **Estado do catálogo:** existem 552 entradas pesquisáveis. Destas, 6 têm consenso multiponto, 15 têm fontes verificadas, 123 são monografias com referências externas ligadas e 408 são apenas entradas de catálogo, sem conteúdo posológico. Não existe um estado genérico “pendente”: a interface distingue explicitamente uma monografia clínica de uma entrada usada apenas para pesquisa e navegação.

A interface e o conteúdo estruturado estão disponíveis em português, inglês e espanhol. As traduções clínicas EN/ES são assistidas e auditadas para cobertura, preservação de números/unidades e terminologia crítica; a fonte original continua a ser a referência decisiva.

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
npm run translations:audit
npm run build
```

O teste unitário usa o runner nativo e o suporte TypeScript do Node 22 ou superior.

## Organização dos dados

- `src/data/sources/catalogo-farmacos.json` — inventário interno com 716 linhas e 552 entradas únicas; define âmbito e taxonomia, mas não é uma referência bibliográfica.
- `src/data/sources/reviewed-clinical-reference.md` — documento interno de trabalho usado para importar conteúdo; não aparece nem pode ser citado como referência bibliográfica.
- `src/data/sources/reviewed-clinical-notes.json` — 185 blocos clínicos extraídos do documento interno e mapeados para 190 entradas; conserva proveniência técnica, não bibliografia.
- `src/data/catalog.generated.ts` — 552 entradas únicas geradas a partir do catálogo; não editar manualmente.
- `src/data/catalogReviewedDrugs.ts` — constrói as 408 entradas estritamente catalogais; notas internas sem bibliografia específica não são expostas como conteúdo clínico.
- `src/data/reviewedDrugs.ts` — fichas clínicas com fontes primárias verificadas.
- `src/data/expandedClinicalDrugs.ts` — 141 monografias estruturadas com referências ligadas a cada recomendação. Permanecem `source-linked` enquanto não existir confirmação independente contra o texto integral das fontes.
- `src/data/crossSourceVerification.ts` — comparação rastreável entre Medscape, Drugs.com e fontes primárias/regulatórias, incluindo discrepâncias dependentes da jurisdição.
- `src/data/drugCalculators.ts` — 43 calculadoras em 36 fármacos, com evidência específica por fórmula e referências regulatórias/guidelines.
- `src/lib/calculators.ts` — fórmulas puras de dose por peso, velocidade de perfusão e volume/tempo.
- `src/data/drugBuilders.ts` — tipos e auxiliares partilhados para construir doses e exemplos.
- `src/data/categories.ts` — taxonomia de categorias.
- `src/data/drugs.ts` — composição final do catálogo e sobreposição das fichas documentadas.
- `src/types/drug.ts` — tipos `Drug`, `DrugCategory`, `DoseAdjustment`, `RenalAdjustment`, `HepaticAdjustment` e `PrescriptionExample`.
- `src/lib/search.ts` — pesquisa por nome, alias, classe, prioridade, subcategoria, indicação e categoria.
- `src/i18n/` — contexto PT/EN/ES, textos da interface, localização dos dados e traduções clínicas carregadas sob pedido.
- `scripts/audit-translations.mjs` — verifica cobertura, números, unidades e termos clínicos propensos a falsos amigos.

Para reconstruir o catálogo depois de alterar o JSON de origem:

```bash
npm run catalog:generate
```

Para voltar a extrair e mapear as notas depois de editar o documento clínico:

```bash
npm run clinical:notes:generate
```

Depois de alterar conteúdo clínico, actualizar e auditar as traduções:

```bash
npm run translations:generate
npm run translations:correct
npm run translations:audit
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
- `source-linked` — monografia em que todas as recomendações apontam para referências externas, mas sem confirmação independente do texto integral;
- `catalog-only` — identidade e âmbito de catálogo, sem monografia posológica nem bibliografia clínica específica.

## Adicionar ou rever um fármaco

1. Confirmar a entrada e prioridade no catálogo de origem.
2. Criar uma ficha explícita em `src/data/reviewedDrugs.ts` seguindo a interface `Drug`.
3. Associar `sourceIds` a cada dose, ajuste e exemplo de prescrição.
4. Associar o estado documental interno adequado e não publicar uma dose numérica sem fonte identificada.
5. Registar `lastReviewedAt` no formato `AAAA-MM-DD` e documentar dúvidas em `reviewNotes`.
6. Confirmar formulações disponíveis, vias, unidades, limites, ajustes renal/hepático, compatibilidades, monitorização e protocolos locais.
7. Registar discrepâncias entre fontes em vez de as resolver por maioria simples quando dependem da indicação, apresentação ou jurisdição.

## Calculadoras

As calculadoras são definições data-driven associadas a uma ficha. Cada definição exige `sourceIds` válidos. Nas fichas `source-linked`, uma calculadora só é publicada se a sua fórmula tiver verificação independente própria (`validationStatus: source-verified`) e uma ligação directa para a fonte regulatória ou guideline. Isto permite verificar o cálculo sem promover artificialmente toda a monografia.

O catálogo inclui 43 calculadoras em 36 fármacos: dose por peso, velocidade de perfusão e conversão volume/tempo. A interface mostra o selo de verificação dentro de cada calculadora e mantém visível o âmbito documental da monografia.

- **Dose por peso:** peso × dose/kg, com limite máximo e volume do concentrado quando a concentração é inequívoca.
- **Perfusão:** converte a dose alvo e a preparação confirmada em mL/h.
- **Volume/tempo:** converte o volume final e a duração prescrita em mL/h.

As fórmulas não escolhem indicação, peso de dose, função renal/hepática, concentração local ou arredondamento. Esses parâmetros continuam a ser responsabilidade do prescritor e do protocolo institucional.

## Deploy

A app é uma SPA estática Vite com navegação por hash. No Vercel: build command `npm run build`; output `dist`.

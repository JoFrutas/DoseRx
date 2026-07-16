import {
  drugs,
  expandedClinicalMappedCatalogCount,
  expandedClinicalSourceCount,
} from '../src/data/drugs.ts'
import {
  reviewedClinicalMappedCatalogCount,
  reviewedClinicalNoteCount,
  reviewedClinicalUnmappedNoteCount,
} from '../src/data/catalogReviewedDrugs.ts'

const issues = []
const forbiddenBibliographicIds = new Set([
  'reviewed-catalog',
  'reviewed-clinical-reference',
  'local-clinical-catalog',
])
const forbiddenBibliographicText = [
  /DoseRx\s+—\s+Lista de referência de fármacos/iu,
  /Catálogo de fármacos de Medicina Intensiva/iu,
  /Catálogo clínico estruturado fornecido para DoseRx/iu,
  /reviewed-clinical-reference\.md/iu,
]
const statusCounts = Object.groupBy(drugs, (drug) => drug.validationStatus)
const sourceVerified = drugs.filter((drug) => (
  drug.validationStatus === 'source-verified' || drug.validationStatus === 'validated'
))

if (reviewedClinicalUnmappedNoteCount > 0) {
  issues.push(`${reviewedClinicalUnmappedNoteCount} blocos da referência clínica sem correspondência no catálogo`)
}

for (const drug of drugs) {
  const referenceIds = new Set(drug.references.map((reference) => reference.id))
  const isSourceVerified = drug.validationStatus === 'source-verified' || drug.validationStatus === 'validated'
  const hasStructuredContent = drug.validationStatus !== 'not-validated'

  if (isSourceVerified && referenceIds.size === 0) issues.push(`${drug.id}: ficha verificada sem referências`)
  if (!isSourceVerified && (drug.calculators?.length ?? 0) > 0) issues.push(`${drug.id}: calculadora em ficha não verificada`)
  if (drug.validationStatus === 'validated' && drug.confidence !== 'high') issues.push(`${drug.id}: aprovação total sem confiança elevada`)
  if (drug.validationStatus === 'validated' && !drug.lastReviewedAt) issues.push(`${drug.id}: aprovação total sem data de revisão`)

  for (const reference of drug.references) {
    const searchableReference = [reference.title, reference.source, reference.url].filter(Boolean).join(' ')
    if (
      forbiddenBibliographicIds.has(reference.id)
      || forbiddenBibliographicText.some((pattern) => pattern.test(searchableReference))
    ) {
      issues.push(`${drug.id}: documento interno exposto como bibliografia (${reference.id})`)
    }
  }

  const adjustments = [
    ...drug.usualAdultDose,
    ...(drug.loadingDose ? [drug.loadingDose] : []),
    ...drug.renalAdjustment.byKidneyFunction,
    ...(drug.renalAdjustment.intermittentHemodialysis ? [drug.renalAdjustment.intermittentHemodialysis] : []),
    ...(drug.renalAdjustment.continuousKidneyReplacement ? [drug.renalAdjustment.continuousKidneyReplacement] : []),
    ...drug.hepaticAdjustment.bySeverity,
    ...drug.prescriptionExamples,
  ]

  if (hasStructuredContent) {
    for (const item of adjustments) {
      if (item.sourceIds.length === 0) issues.push(`${drug.id}: recomendação sem fonte (${item.context ?? item.title})`)
      for (const sourceId of item.sourceIds) {
        if (forbiddenBibliographicIds.has(sourceId)) issues.push(`${drug.id}: recomendação usa documento interno ${sourceId}`)
        if (!referenceIds.has(sourceId)) issues.push(`${drug.id}: referência inexistente ${sourceId}`)
      }
    }
  }

  if (drug.verification?.status === 'consensus') {
    if ((drug.verification?.comparedSourceIds.length ?? 0) < 3) issues.push(`${drug.id}: comparação com menos de três fontes externas`)
    if ((drug.verification?.discrepancies.length ?? 0) > 0) issues.push(`${drug.id}: consenso com discrepâncias por resolver`)
  }

  if (drug.verification) {
    for (const sourceId of drug.verification.comparedSourceIds) {
      if (forbiddenBibliographicIds.has(sourceId)) issues.push(`${drug.id}: comparação inclui documento interno ${sourceId}`)
      if (!referenceIds.has(sourceId)) issues.push(`${drug.id}: comparação usa fonte inexistente ${sourceId}`)
    }
  }

  for (const calculator of drug.calculators ?? []) {
    if (calculator.sourceIds.length === 0) issues.push(`${drug.id}: calculadora ${calculator.id} sem fonte`)
    for (const sourceId of calculator.sourceIds) {
      if (forbiddenBibliographicIds.has(sourceId)) issues.push(`${drug.id}: calculadora ${calculator.id} usa documento interno ${sourceId}`)
      if (!referenceIds.has(sourceId)) issues.push(`${drug.id}: calculadora ${calculator.id} usa fonte inexistente ${sourceId}`)
    }
  }
}

const calculatorCount = drugs.reduce((total, drug) => total + (drug.calculators?.length ?? 0), 0)
const report = {
  catalog: drugs.length,
  sourceVerified: sourceVerified.length,
  pending: drugs.length - sourceVerified.length,
  sourceCoverage: {
    expandedClinicalMonographs: expandedClinicalSourceCount,
    expandedClinicalMappedCatalogEntries: expandedClinicalMappedCatalogCount,
    reviewedClinicalNoteBlocks: reviewedClinicalNoteCount,
    reviewedClinicalMappedCatalogEntries: reviewedClinicalMappedCatalogCount,
    reviewedClinicalUnmappedNoteBlocks: reviewedClinicalUnmappedNoteCount,
  },
  forbiddenInternalBibliographicReferences: issues.filter((issue) => issue.includes('documento interno')).length,
  calculators: calculatorCount,
  statuses: Object.fromEntries(Object.entries(statusCounts).map(([status, items]) => [status, items.length])),
  issues,
}

console.log(JSON.stringify(report, null, 2))
if (issues.length > 0) process.exitCode = 1

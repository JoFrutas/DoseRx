import { drugs } from '../src/data/drugs.ts'

const issues = []
const statusCounts = Object.groupBy(drugs, (drug) => drug.validationStatus)
const sourceVerified = drugs.filter((drug) => (
  drug.validationStatus === 'source-verified' || drug.validationStatus === 'validated'
))

for (const drug of drugs) {
  const referenceIds = new Set(drug.references.map((reference) => reference.id))
  const isSourceVerified = drug.validationStatus === 'source-verified' || drug.validationStatus === 'validated'

  if (isSourceVerified && referenceIds.size === 0) issues.push(`${drug.id}: ficha verificada sem referências`)
  if (!isSourceVerified && (drug.calculators?.length ?? 0) > 0) issues.push(`${drug.id}: calculadora em ficha não verificada`)

  const adjustments = [
    ...drug.usualAdultDose,
    ...(drug.loadingDose ? [drug.loadingDose] : []),
    ...drug.renalAdjustment.byKidneyFunction,
    ...(drug.renalAdjustment.intermittentHemodialysis ? [drug.renalAdjustment.intermittentHemodialysis] : []),
    ...(drug.renalAdjustment.continuousKidneyReplacement ? [drug.renalAdjustment.continuousKidneyReplacement] : []),
    ...drug.hepaticAdjustment.bySeverity,
    ...drug.prescriptionExamples,
  ]

  if (isSourceVerified) {
    for (const item of adjustments) {
      if (item.sourceIds.length === 0) issues.push(`${drug.id}: recomendação sem fonte (${item.context ?? item.title})`)
      for (const sourceId of item.sourceIds) {
        if (!referenceIds.has(sourceId)) issues.push(`${drug.id}: referência inexistente ${sourceId}`)
      }
    }
  }

  for (const calculator of drug.calculators ?? []) {
    if (calculator.sourceIds.length === 0) issues.push(`${drug.id}: calculadora ${calculator.id} sem fonte`)
    for (const sourceId of calculator.sourceIds) {
      if (!referenceIds.has(sourceId)) issues.push(`${drug.id}: calculadora ${calculator.id} usa fonte inexistente ${sourceId}`)
    }
  }
}

const calculatorCount = drugs.reduce((total, drug) => total + (drug.calculators?.length ?? 0), 0)
const report = {
  catalog: drugs.length,
  sourceVerified: sourceVerified.length,
  pending: drugs.length - sourceVerified.length,
  calculators: calculatorCount,
  statuses: Object.fromEntries(Object.entries(statusCounts).map(([status, items]) => [status, items.length])),
  issues,
}

console.log(JSON.stringify(report, null, 2))
if (issues.length > 0) process.exitCode = 1

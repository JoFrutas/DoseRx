import type { Drug } from '../types/drug'
import { catalogSeeds } from './catalog.generated.ts'
import { createUnvalidatedDrugSeed } from './drugBuilders.ts'
import { drugCalculatorsByDrugId } from './drugCalculators.ts'
import { reviewedDrugs } from './reviewedDrugs.ts'

const reviewedIds = new Set(reviewedDrugs.map((drug) => drug.id))

const pendingCatalogDrugs = catalogSeeds
  .filter((seed) => !reviewedIds.has(seed.id))
  .map(createUnvalidatedDrugSeed)

const drugsWithCalculators = reviewedDrugs.map((drug) => ({
  ...drug,
  calculators: drugCalculatorsByDrugId[drug.id] ?? [],
}))

export const drugs: Drug[] = [...drugsWithCalculators, ...pendingCatalogDrugs]
  .sort((first, second) => {
    const priorityOrder = { P1: 1, P2: 2, P3: 3 }
    const priorityDifference = priorityOrder[first.priority] - priorityOrder[second.priority]
    return priorityDifference || first.name.localeCompare(second.name, 'pt-PT')
  })

export const reviewedDrugCount = reviewedDrugs.length
export const catalogDrugCount = drugs.length
export const sourceVerifiedDrugCount = drugs.filter((drug) => (
  drug.validationStatus === 'source-verified' || drug.validationStatus === 'validated'
)).length
export const pendingDrugCount = catalogDrugCount - sourceVerifiedDrugCount
export const allDrugContentSourceVerified = pendingDrugCount === 0

export function getDrugById(drugId: string): Drug | undefined {
  return drugs.find((drug) => drug.id === drugId)
}

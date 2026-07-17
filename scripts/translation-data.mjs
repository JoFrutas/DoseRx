import { drugCategories } from '../src/data/categories.ts'
import { drugs } from '../src/data/drugs.ts'

const add = (target, value) => {
  if (typeof value === 'string' && value.trim()) target.add(value)
}
const addList = (target, values) => values.forEach((value) => add(target, value))
const addAdjustment = (target, item) => {
  add(target, item.context)
  add(target, item.recommendation)
  addList(target, item.notes ?? [])
}

export function collectTranslatableStrings() {
  const strings = new Set()

  for (const category of drugCategories) {
    add(strings, category.name)
    add(strings, category.shortName)
    add(strings, category.description)
    addList(strings, category.searchTerms)
  }

  for (const drug of drugs) {
    add(strings, drug.name)
    addList(strings, drug.aliases)
    add(strings, drug.drugClass)
    addList(strings, drug.subcategories)
    addList(strings, drug.indications)
    addList(strings, drug.routes)
    drug.usualAdultDose.forEach((item) => addAdjustment(strings, item))
    if (drug.loadingDose) addAdjustment(strings, drug.loadingDose)

    for (const example of drug.prescriptionExamples) {
      add(strings, example.title)
      add(strings, example.prescription)
      add(strings, example.context)
      addList(strings, example.notes ?? [])
    }

    add(strings, drug.renalAdjustment.summary)
    drug.renalAdjustment.byKidneyFunction.forEach((item) => addAdjustment(strings, item))
    if (drug.renalAdjustment.intermittentHemodialysis) {
      addAdjustment(strings, drug.renalAdjustment.intermittentHemodialysis)
    }
    if (drug.renalAdjustment.continuousKidneyReplacement) {
      addAdjustment(strings, drug.renalAdjustment.continuousKidneyReplacement)
    }
    addList(strings, drug.renalAdjustment.monitoring)

    add(strings, drug.hepaticAdjustment.summary)
    drug.hepaticAdjustment.bySeverity.forEach((item) => addAdjustment(strings, item))
    addList(strings, drug.hepaticAdjustment.monitoring)
    addList(strings, drug.therapeuticDrugMonitoring)
    addList(strings, drug.contraindications)
    addList(strings, drug.interactions)
    addList(strings, drug.practicalNotes)
    addList(strings, drug.reviewNotes)

    if (drug.verification) {
      add(strings, drug.verification.scope)
      add(strings, drug.verification.summary)
      addList(strings, drug.verification.discrepancies)
    }

    for (const calculator of drug.calculators ?? []) {
      add(strings, calculator.title)
      add(strings, calculator.description)
      addList(strings, calculator.notes)
      if (calculator.kind === 'weight-dose') {
        for (const option of calculator.options) {
          add(strings, option.label)
          add(strings, option.note)
        }
        add(strings, calculator.concentration?.label)
      }
    }
  }

  return [...strings].sort((first, second) => first.localeCompare(second, 'pt-PT'))
}

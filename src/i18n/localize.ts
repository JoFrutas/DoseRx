import type {
  DoseAdjustment,
  Drug,
  DrugCalculatorDefinition,
  DrugCategory,
  PrescriptionExample,
} from '../types/drug'

export type TranslationMap = Readonly<Record<string, string>>

const unique = (values: string[]) => [...new Set(values)]

export function translateText(value: string, translations: TranslationMap): string {
  return translations[value] ?? value
}

const translateList = (values: string[], translations: TranslationMap) => (
  values.map((value) => translateText(value, translations))
)

const localizeAdjustment = (
  item: DoseAdjustment,
  translations: TranslationMap,
): DoseAdjustment => ({
  ...item,
  context: translateText(item.context, translations),
  recommendation: translateText(item.recommendation, translations),
  notes: item.notes ? translateList(item.notes, translations) : undefined,
})

const localizePrescription = (
  item: PrescriptionExample,
  translations: TranslationMap,
): PrescriptionExample => ({
  ...item,
  title: translateText(item.title, translations),
  prescription: translateText(item.prescription, translations),
  context: item.context ? translateText(item.context, translations) : undefined,
  notes: item.notes ? translateList(item.notes, translations) : undefined,
})

const localizeCalculator = (
  calculator: DrugCalculatorDefinition,
  translations: TranslationMap,
): DrugCalculatorDefinition => {
  switch (calculator.kind) {
    case 'weight-dose':
      return {
        ...calculator,
        title: translateText(calculator.title, translations),
        description: translateText(calculator.description, translations),
        notes: translateList(calculator.notes, translations),
        options: calculator.options.map((option) => ({
          ...option,
          label: translateText(option.label, translations),
          note: option.note ? translateText(option.note, translations) : undefined,
        })),
        concentration: calculator.concentration ? {
          ...calculator.concentration,
          label: translateText(calculator.concentration.label, translations),
        } : undefined,
      }
    case 'infusion-rate':
      return {
        ...calculator,
        title: translateText(calculator.title, translations),
        description: translateText(calculator.description, translations),
        notes: translateList(calculator.notes, translations),
      }
    case 'volume-time':
      return {
        ...calculator,
        title: translateText(calculator.title, translations),
        description: translateText(calculator.description, translations),
        notes: translateList(calculator.notes, translations),
      }
  }
}

export function localizeDrug(drug: Drug, translations: TranslationMap): Drug {
  const translatedAliases = translateList(drug.aliases, translations)

  return {
    ...drug,
    name: translateText(drug.name, translations),
    aliases: unique([...translatedAliases, ...drug.aliases]),
    drugClass: translateText(drug.drugClass, translations),
    subcategories: translateList(drug.subcategories, translations),
    indications: translateList(drug.indications, translations),
    routes: translateList(drug.routes, translations),
    usualAdultDose: drug.usualAdultDose.map((item) => localizeAdjustment(item, translations)),
    loadingDose: drug.loadingDose ? localizeAdjustment(drug.loadingDose, translations) : undefined,
    prescriptionExamples: drug.prescriptionExamples.map((item) => (
      localizePrescription(item, translations)
    )),
    renalAdjustment: {
      ...drug.renalAdjustment,
      summary: translateText(drug.renalAdjustment.summary, translations),
      byKidneyFunction: drug.renalAdjustment.byKidneyFunction.map((item) => (
        localizeAdjustment(item, translations)
      )),
      intermittentHemodialysis: drug.renalAdjustment.intermittentHemodialysis
        ? localizeAdjustment(drug.renalAdjustment.intermittentHemodialysis, translations)
        : undefined,
      continuousKidneyReplacement: drug.renalAdjustment.continuousKidneyReplacement
        ? localizeAdjustment(drug.renalAdjustment.continuousKidneyReplacement, translations)
        : undefined,
      monitoring: translateList(drug.renalAdjustment.monitoring, translations),
    },
    hepaticAdjustment: {
      ...drug.hepaticAdjustment,
      summary: translateText(drug.hepaticAdjustment.summary, translations),
      bySeverity: drug.hepaticAdjustment.bySeverity.map((item) => (
        localizeAdjustment(item, translations)
      )),
      monitoring: translateList(drug.hepaticAdjustment.monitoring, translations),
    },
    therapeuticDrugMonitoring: translateList(drug.therapeuticDrugMonitoring, translations),
    contraindications: translateList(drug.contraindications, translations),
    interactions: translateList(drug.interactions, translations),
    practicalNotes: translateList(drug.practicalNotes, translations),
    reviewNotes: translateList(drug.reviewNotes, translations),
    verification: drug.verification ? {
      ...drug.verification,
      scope: translateText(drug.verification.scope, translations),
      summary: translateText(drug.verification.summary, translations),
      discrepancies: translateList(drug.verification.discrepancies, translations),
    } : undefined,
    calculators: drug.calculators?.map((calculator) => (
      localizeCalculator(calculator, translations)
    )),
  }
}

export function localizeCategory(
  category: DrugCategory,
  translations: TranslationMap,
): DrugCategory {
  return {
    ...category,
    name: translateText(category.name, translations),
    shortName: translateText(category.shortName, translations),
    description: translateText(category.description, translations),
    searchTerms: unique([
      ...translateList(category.searchTerms, translations),
      ...category.searchTerms,
    ]),
  }
}

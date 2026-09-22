import type { DoseRateUnit, Drug, EvidenceReference, InfusionConversionCalculatorDefinition } from '../types/drug'

// Explicitly scoped to continuous IV infusions already described in these monographs.
// Unit choices are not dose recommendations. No clinical default is supplied.
export const infusionConversionUnits: Readonly<Record<string, DoseRateUnit[]>> = {
  cetamina: ['mg/kg/h', 'mg/h', 'mcg/kg/min'],
  fentanilo: ['mcg/kg/h', 'mcg/h', 'mcg/kg/min'],
  midazolam: ['mg/kg/h', 'mg/h', 'mcg/kg/min'],
  morfina: ['mg/h', 'mg/kg/h', 'mcg/kg/h'],
  remifentanilo: ['mcg/kg/min', 'mcg/kg/h'],
  hidromorfona: ['mg/h', 'mg/kg/h'],
  tiopental: ['mg/kg/h', 'mg/h'],
  atracurio: ['mcg/kg/min', 'mg/kg/h'],
  vecuronio: ['mcg/kg/min', 'mg/kg/h'],
  argatroban: ['mcg/kg/min'],
  'heparina-nao-fraccionada': ['units/kg/h', 'units/h'],
  fenilefrina: ['mcg/kg/min', 'mcg/min'],
  isoprenalina: ['mcg/kg/min', 'mcg/min'],
  labetalol: ['mg/min', 'mg/h'],
  nicardipina: ['mg/h'],
  clevidipina: ['mg/h'],
  nitroglicerina: ['mcg/min', 'mg/h'],
  'nitroprussiato-de-sodio': ['mcg/kg/min'],
  bumetanida: ['mg/h'],
  clonidina: ['mcg/kg/h', 'mcg/h'],
  diltiazem: ['mg/h'],
  glucagon: ['mg/h'],
  lidocaina: ['mg/min', 'mg/h'],
  naloxona: ['mg/h', 'mcg/h'],
  octreotido: ['mcg/h'],
  procainamida: ['mg/min', 'mg/h'],
  terlipressina: ['mg/h'],
  'valproato-de-sodio': ['mg/kg/h', 'mg/h'],
  levosimendano: ['mcg/kg/min'],
  benzilpenicilina: ['units/h'],
}

export const infusionCalculationReference: EvidenceReference = {
  id: 'sort-infusion-calculations',
  title: 'Infusion Rate Calculations — dose, weight, concentration and mL/h',
  source: 'Southampton Oxford Retrieval Team (NHS) — mathematical method only',
  url: 'https://www.sort.nhs.uk/Media/Guidelines/Infusion-calculations.pdf',
  accessedAt: '2026-09-22',
}

export function prescriptionInfusionCalculator(drug: Drug): InfusionConversionCalculatorDefinition | undefined {
  const doseRateUnits = infusionConversionUnits[drug.id]
  if (!doseRateUnits || drug.validationStatus === 'catalog-only') return undefined
  const unitsOnly = doseRateUnits.every(unit => unit.startsWith('units'))
  return {
    kind: 'infusion-conversion',
    id: `${drug.id}-prescribed-infusion`,
    title: 'Velocidade de perfusão',
    description: 'Converte a dose prescrita e a preparação confirmada em mL/h.',
    doseRateUnits,
    preparationAmountUnits: unitsOnly ? ['units'] : ['mg', 'mcg', 'g'],
    sourceIds: [infusionCalculationReference.id],
    notes: [],
  }
}

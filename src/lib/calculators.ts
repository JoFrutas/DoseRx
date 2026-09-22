import type { DoseAmountUnit, DoseRateUnit, InfusionRateCalculatorDefinition, InfusionConversionCalculatorDefinition, VolumeTimeCalculatorDefinition } from '../types/drug'

export interface WeightDoseResult {
  calculatedDose: number
  finalDose: number
  capped: boolean
  volumeMl: number | null
}

export interface InfusionRateInput {
  doseRate: number
  doseRateUnit: DoseRateUnit
  weightKg?: number
  preparationAmount: number
  preparationAmountUnit: DoseAmountUnit
  preparationVolumeMl: number
}

function requirePositive(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${label} deve ser superior a zero.`)
  }
}

function requireDosingWeight(weight: number): void {
  requirePositive(weight, 'O peso')
  if (weight < 1 || weight > 400) throw new Error('O peso de dose deve estar entre 1 e 400 kg.')
}

export function calculateWeightDose(
  weightKg: number,
  dosePerKg: number,
  maxDose?: number,
  concentrationPerMl?: number,
): WeightDoseResult {
  requireDosingWeight(weightKg)
  requirePositive(dosePerKg, 'A dose por kg')
  if (maxDose !== undefined) requirePositive(maxDose, 'A dose máxima')
  if (concentrationPerMl !== undefined) requirePositive(concentrationPerMl, 'A concentração')

  const calculatedDose = weightKg * dosePerKg
  requirePositive(calculatedDose, 'A dose calculada')
  const finalDose = maxDose === undefined ? calculatedDose : Math.min(calculatedDose, maxDose)
  const volumeMl = concentrationPerMl === undefined ? null : finalDose / concentrationPerMl
  if (volumeMl !== null) requirePositive(volumeMl, 'O volume calculado')

  return {
    calculatedDose,
    finalDose,
    capped: finalDose < calculatedDose,
    volumeMl,
  }
}

function amountFamily(unit: DoseAmountUnit): 'mass' | 'electrolyte' | 'units' {
  if (unit === 'g' || unit === 'mg' || unit === 'mcg') return 'mass'
  if (unit === 'mEq') return 'electrolyte'
  return 'units'
}

function rateFamily(unit: DoseRateUnit): 'mass' | 'electrolyte' | 'units' {
  if (unit.startsWith('mEq')) return 'electrolyte'
  if (unit.startsWith('units')) return 'units'
  return 'mass'
}

function preparationAmountInBaseUnit(amount: number, unit: DoseAmountUnit): number {
  if (unit === 'g') return amount * 1_000_000
  return unit === 'mg' ? amount * 1000 : amount
}

function dosePerHourInBaseUnit(
  doseRate: number,
  unit: DoseRateUnit,
  weightKg?: number,
): number {
  const requiresWeight = unit.includes('/kg/')
  if (requiresWeight) {
    if (weightKg === undefined) throw new Error('O peso é obrigatório para esta unidade de dose.')
    requireDosingWeight(weightKg)
  }

  switch (unit) {
    case 'ng/kg/min':
      return doseRate * (weightKg as number) * 60 / 1000
    case 'mcg/kg/min':
      return doseRate * (weightKg as number) * 60
    case 'mcg/kg/h':
      return doseRate * (weightKg as number)
    case 'mcg/min':
      return doseRate * 60
    case 'mcg/h':
      return doseRate
    case 'mg/kg/h':
      return doseRate * (weightKg as number) * 1000
    case 'mg/h':
      return doseRate * 1000
    case 'mg/min':
      return doseRate * 60 * 1000
    case 'mEq/h':
    case 'units/h':
      return doseRate
    case 'units/min':
      return doseRate * 60
    case 'units/kg/h':
      return doseRate * (weightKg as number)
    default:
      throw new Error('Unidade de dose desconhecida.')
  }
}

export function calculateInfusionRate(input: InfusionRateInput): number {
  requirePositive(input.doseRate, 'A dose alvo')
  requirePositive(input.preparationAmount, 'A quantidade preparada')
  requirePositive(input.preparationVolumeMl, 'O volume preparado')
  if (!['g', 'mg', 'mcg', 'mEq', 'units'].includes(input.preparationAmountUnit)) {
    throw new Error('Unidade da preparação desconhecida.')
  }
  if (typeof input.doseRateUnit !== 'string') throw new Error('Unidade de dose desconhecida.')

  if (rateFamily(input.doseRateUnit) !== amountFamily(input.preparationAmountUnit)) {
    throw new Error('A unidade da preparação não é compatível com a unidade da dose.')
  }

  const dosePerHour = dosePerHourInBaseUnit(
    input.doseRate,
    input.doseRateUnit,
    input.weightKg,
  )
  const concentration = preparationAmountInBaseUnit(
    input.preparationAmount,
    input.preparationAmountUnit,
  ) / input.preparationVolumeMl
  requirePositive(dosePerHour, 'A dose horária')
  requirePositive(concentration, 'A concentração')
  const rate = dosePerHour / concentration
  requirePositive(rate, 'O ritmo calculado')
  return rate
}

export function calculateDefinedInfusionRate(definition: InfusionRateCalculatorDefinition, input: InfusionRateInput): number {
  if (input.doseRateUnit !== definition.doseRateUnit) throw new Error('A unidade deve corresponder à definição da calculadora.')
  if (definition.maximumDoseRate !== undefined && input.doseRate > definition.maximumDoseRate) {
    throw new Error('Dose acima do limite documentado desta calculadora.')
  }
  return calculateInfusionRate(input)
}

export function calculatePrescriptionInfusionRate(definition: InfusionConversionCalculatorDefinition, input: InfusionRateInput): number {
  if (!definition.doseRateUnits.includes(input.doseRateUnit)
    || !definition.preparationAmountUnits.includes(input.preparationAmountUnit)) {
    throw new Error('Unidade não disponível para esta conversão.')
  }
  return calculateInfusionRate(input)
}

export function calculateVolumeRate(volumeMl: number, durationMinutes: number): number {
  requirePositive(volumeMl, 'O volume')
  requirePositive(durationMinutes, 'A duração')
  const rate = volumeMl / durationMinutes * 60
  requirePositive(rate, 'O ritmo calculado')
  return rate
}

export function calculateDefinedVolumeRate(definition: VolumeTimeCalculatorDefinition, volumeMl: number, durationMinutes: number): number {
  if (definition.minimumDurationMinutes !== undefined && durationMinutes < definition.minimumDurationMinutes) {
    throw new Error('Duração inferior ao mínimo documentado.')
  }
  return calculateVolumeRate(volumeMl, durationMinutes)
}

export function formatCalculatorNumber(value: number, language = 'pt'): string {
  if (!Number.isFinite(value)) return '—'
  // Small positive rates must not silently become zero at two decimal places.
  return new Intl.NumberFormat(language === 'pt' ? 'pt-PT' : language === 'es' ? 'es-ES' : 'en-GB', {
    maximumSignificantDigits: 6,
  }).format(value)
}

export function formatCalculatorUnit(unit: DoseAmountUnit | DoseRateUnit, language = 'pt'): string {
  return unit.replace('units', language === 'en' ? 'units' : 'unidades')
}

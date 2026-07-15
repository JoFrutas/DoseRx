import type { DoseAmountUnit, DoseRateUnit } from '../types/drug'

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

export function calculateWeightDose(
  weightKg: number,
  dosePerKg: number,
  maxDose?: number,
  concentrationPerMl?: number,
): WeightDoseResult {
  requirePositive(weightKg, 'O peso')
  requirePositive(dosePerKg, 'A dose por kg')
  if (maxDose !== undefined) requirePositive(maxDose, 'A dose máxima')
  if (concentrationPerMl !== undefined) requirePositive(concentrationPerMl, 'A concentração')

  const calculatedDose = weightKg * dosePerKg
  const finalDose = maxDose === undefined ? calculatedDose : Math.min(calculatedDose, maxDose)

  return {
    calculatedDose,
    finalDose,
    capped: finalDose < calculatedDose,
    volumeMl: concentrationPerMl === undefined ? null : finalDose / concentrationPerMl,
  }
}

function amountFamily(unit: DoseAmountUnit): 'mass' | 'electrolyte' | 'units' {
  if (unit === 'mg' || unit === 'mcg') return 'mass'
  if (unit === 'mEq') return 'electrolyte'
  return 'units'
}

function rateFamily(unit: DoseRateUnit): 'mass' | 'electrolyte' | 'units' {
  if (unit.startsWith('mEq')) return 'electrolyte'
  if (unit.startsWith('units')) return 'units'
  return 'mass'
}

function preparationAmountInBaseUnit(amount: number, unit: DoseAmountUnit): number {
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
    requirePositive(weightKg, 'O peso')
  }

  switch (unit) {
    case 'mcg/kg/min':
      return doseRate * (weightKg as number) * 60
    case 'mcg/min':
      return doseRate * 60
    case 'mg/kg/h':
      return doseRate * (weightKg as number) * 1000
    case 'mg/h':
      return doseRate * 1000
    case 'mg/min':
      return doseRate * 60 * 1000
    case 'mEq/h':
    case 'units/h':
      return doseRate
    case 'units/kg/h':
      return doseRate * (weightKg as number)
  }
}

export function calculateInfusionRate(input: InfusionRateInput): number {
  requirePositive(input.doseRate, 'A dose alvo')
  requirePositive(input.preparationAmount, 'A quantidade preparada')
  requirePositive(input.preparationVolumeMl, 'O volume preparado')

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

  return dosePerHour / concentration
}

export function calculateVolumeRate(volumeMl: number, durationMinutes: number): number {
  requirePositive(volumeMl, 'O volume')
  requirePositive(durationMinutes, 'A duração')
  return volumeMl * 60 / durationMinutes
}

export function formatCalculatorNumber(value: number): string {
  return new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 2 }).format(value)
}

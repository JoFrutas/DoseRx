export type ValidationStatus = 'not-validated' | 'in-review' | 'source-verified' | 'validated'

export type ConfidenceLevel = 'unvalidated' | 'low' | 'moderate' | 'high'

export type DrugPriority = 'P1' | 'P2' | 'P3'

export type DoseAmountUnit = 'mg' | 'mcg' | 'mEq' | 'units'

export type DoseRateUnit =
  | 'mcg/kg/min'
  | 'mcg/min'
  | 'mg/kg/h'
  | 'mg/h'
  | 'mg/min'
  | 'mEq/h'
  | 'units/kg/h'
  | 'units/h'

export interface WeightDoseOption {
  id: string
  label: string
  dosePerKg: number
  amountUnit: Exclude<DoseAmountUnit, 'mEq'>
  maxDose?: number
  note?: string
}

export interface WeightDoseCalculatorDefinition {
  kind: 'weight-dose'
  id: string
  title: string
  description: string
  defaultOptionId: string
  options: WeightDoseOption[]
  concentration?: {
    value: number
    amountUnit: Exclude<DoseAmountUnit, 'mEq'>
    label: string
  }
  sourceIds: string[]
  notes: string[]
}

export interface InfusionRateCalculatorDefinition {
  kind: 'infusion-rate'
  id: string
  title: string
  description: string
  doseRateUnit: DoseRateUnit
  defaultDoseRate: number
  minimumDoseRate?: number
  maximumDoseRate?: number
  preparation: {
    amount: number
    amountUnit: DoseAmountUnit
    volumeMl: number
    editable: boolean
  }
  sourceIds: string[]
  notes: string[]
}

export interface VolumeTimeCalculatorDefinition {
  kind: 'volume-time'
  id: string
  title: string
  description: string
  defaultVolumeMl: number
  defaultDurationMinutes: number
  minimumDurationMinutes?: number
  sourceIds: string[]
  notes: string[]
}

export type DrugCalculatorDefinition =
  | WeightDoseCalculatorDefinition
  | InfusionRateCalculatorDefinition
  | VolumeTimeCalculatorDefinition

export interface DrugCategory {
  id: string
  name: string
  shortName: string
  description: string
  icon: string
  accent: string
  accentBackground: string
  searchTerms: string[]
}

export interface EvidenceReference {
  id: string
  title: string
  authors?: string
  source?: string
  year?: number
  doi?: string
  url?: string
  accessedAt?: string
}

export interface DoseAdjustment {
  context: string
  recommendation: string
  notes?: string[]
  sourceIds: string[]
  validationStatus: ValidationStatus
}

export interface PrescriptionExample {
  title: string
  prescription: string
  context?: string
  notes?: string[]
  sourceIds: string[]
  validationStatus: ValidationStatus
}

export interface RenalAdjustment {
  summary: string
  byKidneyFunction: DoseAdjustment[]
  intermittentHemodialysis?: DoseAdjustment
  continuousKidneyReplacement?: DoseAdjustment
  monitoring: string[]
  validationStatus: ValidationStatus
}

export interface HepaticAdjustment {
  summary: string
  bySeverity: DoseAdjustment[]
  monitoring: string[]
  validationStatus: ValidationStatus
}

export interface Drug {
  id: string
  name: string
  aliases: string[]
  drugClass: string
  priority: DrugPriority
  subcategories: string[]
  categoryIds: string[]
  indications: string[]
  usualAdultDose: DoseAdjustment[]
  prescriptionExamples: PrescriptionExample[]
  routes: string[]
  loadingDose?: DoseAdjustment
  renalAdjustment: RenalAdjustment
  hepaticAdjustment: HepaticAdjustment
  therapeuticDrugMonitoring: string[]
  contraindications: string[]
  interactions: string[]
  practicalNotes: string[]
  references: EvidenceReference[]
  lastReviewedAt: string | null
  validationStatus: ValidationStatus
  confidence: ConfidenceLevel
  reviewNotes: string[]
  calculators?: DrugCalculatorDefinition[]
}

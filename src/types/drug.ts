export type ValidationStatus = 'not-validated' | 'in-review' | 'validated'

export type ConfidenceLevel = 'unvalidated' | 'low' | 'moderate' | 'high'

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
}

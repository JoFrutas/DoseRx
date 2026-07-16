import type {
  DoseAdjustment,
  DrugPriority,
  HepaticAdjustment,
  PrescriptionExample,
  RenalAdjustment,
  ValidationStatus,
} from '../types/drug'

export interface PlaceholderDrugSeed {
  id: string
  name: string
  aliases: string[]
  drugClass: string
  priority: DrugPriority
  subcategories: string[]
  categoryIds: string[]
  indications: string[]
  routes: string[]
  scopeNotes: string[]
}

export function dose(
  context: string,
  recommendation: string,
  sourceIds: string[],
  notes?: string[],
  validationStatus: ValidationStatus = 'source-verified',
): DoseAdjustment {
  return { context, recommendation, sourceIds, notes, validationStatus }
}

export function prescription(
  title: string,
  prescriptionText: string,
  sourceIds: string[],
  context?: string,
  notes?: string[],
  validationStatus: ValidationStatus = 'source-verified',
): PrescriptionExample {
  return {
    title,
    prescription: prescriptionText,
    sourceIds,
    context,
    notes,
    validationStatus,
  }
}

export function noRenalDoseAdjustment(
  sourceIds: string[],
  monitoring: string[],
  note = 'O RCM consultado não define ajuste posológico específico; individualizar perante disfunção orgânica dinâmica.',
): RenalAdjustment {
  return {
    summary: note,
    byKidneyFunction: [dose('Função renal reduzida', note, sourceIds)],
    intermittentHemodialysis: dose('Hemodiálise intermitente', 'Sem regime específico estabelecido na fonte consultada; confirmar protocolo local.', sourceIds),
    continuousKidneyReplacement: dose('Técnicas contínuas', 'Sem regime específico estabelecido na fonte consultada; titular por resposta clínica e protocolo local.', sourceIds),
    monitoring,
    validationStatus: 'source-verified',
  }
}

export function noHepaticDoseAdjustment(
  sourceIds: string[],
  monitoring: string[],
  note = 'O RCM consultado não define ajuste posológico específico; usar com vigilância clínica.',
): HepaticAdjustment {
  return {
    summary: note,
    bySeverity: [dose('Disfunção hepática', note, sourceIds)],
    monitoring,
    validationStatus: 'source-verified',
  }
}

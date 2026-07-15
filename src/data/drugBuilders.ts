import type {
  DoseAdjustment,
  Drug,
  DrugPriority,
  HepaticAdjustment,
  PrescriptionExample,
  RenalAdjustment,
  ValidationStatus,
} from '../types/drug'

export const CLINICAL_PLACEHOLDER =
  'Conteúdo clínico pendente de validação por equipa médica/farmacêutica. Não utilizar para prescrição.'

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
}

export function dose(
  context: string,
  recommendation: string,
  sourceIds: string[],
  notes?: string[],
  validationStatus: ValidationStatus = 'in-review',
): DoseAdjustment {
  return { context, recommendation, sourceIds, notes, validationStatus }
}

export function prescription(
  title: string,
  prescriptionText: string,
  sourceIds: string[],
  context?: string,
  notes?: string[],
  validationStatus: ValidationStatus = 'in-review',
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

const placeholderDose = (context: string): DoseAdjustment => ({
  context,
  recommendation: CLINICAL_PLACEHOLDER,
  notes: ['Adicionar dose, intervalo, via, limites e população depois de revisão documental.'],
  sourceIds: [],
  validationStatus: 'not-validated',
})

const placeholderPrescription = (): PrescriptionExample => ({
  title: 'Exemplo de prescrição — por validar',
  prescription: CLINICAL_PLACEHOLDER,
  context: 'Modelo estrutural; não corresponde a uma prescrição clínica.',
  notes: ['Confirmar formulação, concentração, diluição, velocidade, compatibilidade e duração.'],
  sourceIds: [],
  validationStatus: 'not-validated',
})

export function createUnvalidatedDrugSeed(seed: PlaceholderDrugSeed): Drug {
  return {
    ...seed,
    usualAdultDose: [placeholderDose('Adulto em Medicina Intensiva')],
    prescriptionExamples: [placeholderPrescription()],
    renalAdjustment: {
      summary: CLINICAL_PLACEHOLDER,
      byKidneyFunction: [
        placeholderDose('Função renal preservada / redução ligeira'),
        placeholderDose('Redução moderada da função renal'),
        placeholderDose('Redução grave da função renal'),
      ],
      intermittentHemodialysis: placeholderDose('Hemodiálise intermitente'),
      continuousKidneyReplacement: placeholderDose('Técnica contínua de substituição renal'),
      monitoring: [CLINICAL_PLACEHOLDER],
      validationStatus: 'not-validated',
    },
    hepaticAdjustment: {
      summary: CLINICAL_PLACEHOLDER,
      bySeverity: [placeholderDose('Disfunção hepática — estratificação por definir')],
      monitoring: [CLINICAL_PLACEHOLDER],
      validationStatus: 'not-validated',
    },
    therapeuticDrugMonitoring: [CLINICAL_PLACEHOLDER],
    contraindications: [CLINICAL_PLACEHOLDER],
    interactions: [CLINICAL_PLACEHOLDER],
    practicalNotes: [CLINICAL_PLACEHOLDER],
    references: [],
    lastReviewedAt: null,
    validationStatus: 'not-validated',
    confidence: 'unvalidated',
    reviewNotes: [
      'Entrada importada do catálogo de fármacos; ainda não contém uma ficha documental.',
      'Requer RCM/SmPC, guideline aplicável, revisão clínica e aprovação farmacêutica antes de publicação assistencial.',
    ],
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
    validationStatus: 'in-review',
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
    validationStatus: 'in-review',
  }
}

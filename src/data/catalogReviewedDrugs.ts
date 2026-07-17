import type { DoseAdjustment, Drug, PrescriptionExample } from '../types/drug'
import type { PlaceholderDrugSeed } from './drugBuilders'
import reviewedNotesSource from './sources/reviewed-clinical-notes.json' with { type: 'json' }

interface ReviewedClinicalNote {
  catalogIds: string[]
}

interface ReviewedNotesSource {
  reviewedAt: string
  notes: ReviewedClinicalNote[]
  stats: {
    noteCount: number
    mappedCatalogEntries: number
    unmappedNoteTitles: string[]
  }
}

const reviewedNotes = reviewedNotesSource as ReviewedNotesSource
const mappedCatalogIds = new Set(
  reviewedNotes.notes.flatMap((note) => note.catalogIds),
)

const catalogDose = (context: string, recommendation: string): DoseAdjustment => ({
  context,
  recommendation,
  sourceIds: [],
  validationStatus: 'catalog-only',
})

const catalogPrescription = (prescription: string): PrescriptionExample => ({
  title: 'Sem monografia posológica',
  prescription,
  context: 'Esta entrada identifica o fármaco, mas não apresenta uma recomendação de prescrição.',
  notes: [
    'Consultar o RCM/SmPC da apresentação local e o protocolo da indicação.',
    'Não extrapolar doses entre formulações, indicações, populações ou vias diferentes.',
  ],
  sourceIds: [],
  validationStatus: 'catalog-only',
})

export function createCatalogReviewedDrug(seed: PlaceholderDrugSeed): Drug {
  const { scopeNotes, ...drugSeed } = seed
  const doseMessage =
    'Não existe uma monografia posológica publicada para esta entrada. Consultar o RCM/SmPC da apresentação local e o protocolo aplicável.'
  const renalMessage =
    'Sem recomendação renal documentada nesta aplicação; confirmar ClCr/eGFR, modalidade de substituição renal e RCM antes de prescrever.'
  const hepaticMessage =
    'Sem recomendação hepática documentada nesta aplicação; confirmar gravidade, indicação e RCM antes de prescrever.'

  return {
    ...drugSeed,
    usualAdultDose: [catalogDose('Entrada de catálogo', doseMessage)],
    prescriptionExamples: [catalogPrescription(doseMessage)],
    routes: drugSeed.routes.length > 0
      ? drugSeed.routes
      : ['Dependente da indicação e da apresentação autorizada localmente'],
    renalAdjustment: {
      summary: renalMessage,
      byKidneyFunction: [catalogDose('Função renal', renalMessage)],
      intermittentHemodialysis: catalogDose('Hemodiálise intermitente', renalMessage),
      continuousKidneyReplacement: catalogDose('Técnicas contínuas de substituição renal', renalMessage),
      monitoring: ['Consultar a monografia regulatória e o protocolo local.'],
      validationStatus: 'catalog-only',
    },
    hepaticAdjustment: {
      summary: hepaticMessage,
      bySeverity: [catalogDose('Função hepática', hepaticMessage)],
      monitoring: ['Consultar a monografia regulatória e o protocolo local.'],
      validationStatus: 'catalog-only',
    },
    therapeuticDrugMonitoring: ['Sem recomendação de monitorização publicada nesta entrada.'],
    contraindications: ['Consultar contraindicações no RCM/SmPC da apresentação concreta.'],
    interactions: ['Rever interacções no RCM/SmPC e na medicação activa.'],
    practicalNotes: [
      ...scopeNotes,
      'Entrada mantida para pesquisa e navegação do catálogo; não contém uma monografia clínica.',
    ],
    references: [],
    lastReviewedAt: null,
    validationStatus: 'catalog-only',
    confidence: 'unvalidated',
    reviewNotes: [
      'Âmbito de catálogo apenas: nome, classe, prioridade e categorias.',
      mappedCatalogIds.has(seed.id)
        ? 'Existia uma nota clínica interna para esta entrada, mas foi excluída por não ter referências externas específicas.'
        : 'Não existe conteúdo posológico nem bibliografia clínica específica nesta ficha.',
    ],
  }
}

export const reviewedClinicalNoteCount = reviewedNotes.stats.noteCount
export const reviewedClinicalMappedCatalogCount = reviewedNotes.stats.mappedCatalogEntries
export const reviewedClinicalUnmappedNoteCount = reviewedNotes.stats.unmappedNoteTitles.length

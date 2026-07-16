import type {
  DoseAdjustment,
  Drug,
  PrescriptionExample,
  ValidationStatus,
} from '../types/drug'
import type { PlaceholderDrugSeed } from './drugBuilders'
import reviewedNotesSource from './sources/reviewed-clinical-notes.json' with { type: 'json' }

interface ReviewedClinicalNote {
  title: string
  summary: string
  categoryId: string
  bullets: string[]
  catalogIds: string[]
}

interface ReviewedNotesSource {
  reviewedAt: string
  sourceFile: string
  notes: ReviewedClinicalNote[]
  stats: {
    noteCount: number
    mappedCatalogEntries: number
    unmappedNoteTitles: string[]
  }
}

const reviewedNotes = reviewedNotesSource as ReviewedNotesSource

const notesByCatalogId = new Map<string, ReviewedClinicalNote[]>()
for (const note of reviewedNotes.notes) {
  for (const catalogId of note.catalogIds) {
    const notes = notesByCatalogId.get(catalogId) ?? []
    notes.push(note)
    notesByCatalogId.set(catalogId, notes)
  }
}

const unique = (values: string[]) => [...new Set(values.filter(Boolean))]

const includesAny = (value: string, patterns: RegExp[]) => (
  patterns.some((pattern) => pattern.test(value))
)

const renalPatterns = [
  /\brenal\b/iu,
  /\bClCr\b/u,
  /\bTFG\b/u,
  /\bHDi\b/u,
  /\bCRRT\b/u,
  /hemodiálise/iu,
  /\bdiálise\b/iu,
]
const intermittentDialysisPatterns = [/\bHDi\b/u, /hemodiálise/iu, /pós-diálise/iu]
const continuousDialysisPatterns = [/\bCRRT\b/u, /\bCVVH/iu, /técnica contínua/iu]
const hepaticPatterns = [/\bhepát/iu, /Child-Pugh/iu, /\bfígado\b/iu]
const monitoringPatterns = [
  /\bTDM\b/u,
  /\bmonitor/iu,
  /\bvigiar/iu,
  /\bníve/iu,
  /\bECG\b/u,
  /\bINR\b/u,
  /\bplaquet/iu,
  /\bglic/iu,
  /\bnatr/iu,
  /\bpotáss/iu,
  /\bCK\b/u,
  /\bfunção renal\b/iu,
]
const contraindicationPatterns = [
  /\bcontraindic/iu,
  /\bnão usar\b/iu,
  /\bnão co-administrar\b/iu,
  /\bevitar\b/iu,
  /\bhipersens/iu,
]
const interactionPatterns = [
  /\bintera/iu,
  /\bCYP/iu,
  /\bQT\b/u,
  /aumenta (?:os )?níveis/iu,
  /reduz (?:os )?níveis/iu,
  /\bassociação\b/iu,
  /\bseroton/iu,
]
const numericDosePattern = /(?:\d|mg|mcg|µg|mL|mmol|mEq|milhões?\s+U|MUI|UI\b|unidades?\/)/iu
const doseContextPattern = /\b(habitual|carga|manutenção|bólus|dose|perfusão|infusão|depois)\b/iu

const contextForDoseLine = (line: string) => {
  if (/^\s*carga\b/iu.test(line)) return 'Dose de carga'
  if (/^\s*manutenção\b/iu.test(line)) return 'Manutenção'
  if (/^\s*habitual\b/iu.test(line)) return 'Adulto — regime habitual'
  return 'Adulto — regime documentado'
}

const adjustment = (
  context: string,
  recommendation: string,
  sourceIds: string[],
  validationStatus: ValidationStatus,
  notes?: string[],
): DoseAdjustment => ({
  context,
  recommendation,
  sourceIds,
  notes,
  validationStatus,
})

const prescription = (
  prescriptionText: string,
  sourceIds: string[],
  hasNumericRegime: boolean,
  validationStatus: ValidationStatus,
): PrescriptionExample => ({
  title: hasNumericRegime
    ? 'Exemplo prático de prescrição'
    : 'Selecção do regime por indicação e apresentação',
  prescription: prescriptionText,
  context: hasNumericRegime
    ? 'Aplicar apenas à indicação, população e via descritas.'
    : 'Não existe um regime numérico universal para esta entrada.',
  notes: [
    'Confirmar formulação, concentração, diluição, compatibilidade, velocidade, duração e protocolo local.',
    'Não extrapolar entre apresentações, indicações ou vias diferentes.',
  ],
  sourceIds,
  validationStatus,
})

const defaultMonitoringByCategory: Readonly<Record<string, string[]>> = {
  antibiotics: ['Função renal e hepática durante a terapêutica', 'Resposta clínica, culturas, susceptibilidade e duração'],
  antifungals: ['Função renal/hepática e interacções', 'Resposta clínica, microbiologia e TDM quando aplicável'],
  antivirals: ['Função renal, hemograma e toxicidade específica do antiviral'],
  antiepileptics: ['Controlo de crises, estado neurológico e níveis séricos quando aplicável'],
  'sedation-analgesia': ['Escala de dor/sedação, ventilação, hemodinâmica e delirium'],
  'neuromuscular-blockers': ['TOF, ventilação, sedação/analgesia e recuperação neuromuscular'],
  'vasopressors-inotropes': ['Pressão arterial, perfusão periférica, lactato, ritmo e débito urinário'],
  antiarrhythmics: ['Ritmo, ECG, QT/QRS, electrólitos e hemodinâmica'],
  'acute-cardiology': ['Pressão arterial, ECG, sintomas, perfusão e função renal'],
  antithrombotics: ['Hemograma, sinais de hemorragia, função renal/hepática e teste farmacodinâmico quando indicado'],
  diuretics: ['Balanço hídrico, peso, função renal e electrólitos'],
  'electrolytes-metabolic': ['Ionograma seriado, função renal e ECG quando clinicamente indicado'],
  'resuscitation-fluids': ['Resposta hemodinâmica, balanço, congestão e electrólitos'],
  'antidotes-toxicology': ['Parâmetros toxicológicos específicos, ECG, estado neurológico e função orgânica'],
  gastrointestinal: ['Resposta clínica, trânsito, ECG e electrólitos conforme o fármaco'],
  'endocrine-corticosteroids': ['Glicemia, electrólitos, hemodinâmica e resposta endócrina'],
  'respiratory-pulmonary': ['Resposta respiratória, frequência cardíaca, ECG e efeitos sistémicos'],
  neurocritical: ['Exame neurológico, pupilas, pressão intracraniana e parâmetros específicos da indicação'],
  'hematology-transfusion': ['Hemograma, coagulação, resposta hemostática e reacções transfusionais'],
  'immunomodulation-transplant': ['Hemograma, função renal/hepática, infecção e níveis quando aplicável'],
  'critical-obstetrics': ['Parâmetros maternos, hemorragia, hemodinâmica e vigilância fetal quando aplicável'],
  'nutrition-micronutrients': ['Balanço metabólico, glicemia, triglicéridos, electrólitos e função hepática'],
}

const inferRoutes = (text: string) => {
  const routes: string[] = []
  if (/\bIV\b|intraven|perfus|infus|bólus/iu.test(text)) routes.push('Intravenosa')
  if (/\bPO\b|oral|entéric|SNG/iu.test(text)) routes.push('Oral / entérica')
  if (/\bSC\b|subcut/iu.test(text)) routes.push('Subcutânea')
  if (/\bIM\b|intramuscular/iu.test(text)) routes.push('Intramuscular')
  if (/nebul|inalad/iu.test(text)) routes.push('Inalatória / nebulizada')
  if (/intranasal/iu.test(text)) routes.push('Intranasal')
  if (/rectal/iu.test(text)) routes.push('Rectal')
  return unique(routes)
}

export function createCatalogReviewedDrug(seed: PlaceholderDrugSeed): Drug {
  const { scopeNotes, ...drugSeed } = seed
  const notes = notesByCatalogId.get(seed.id) ?? []
  const noteLines = unique(notes.flatMap((note) => [note.summary, ...note.bullets]))
  const hasClinicalNote = notes.length > 0
  const validationStatus: ValidationStatus = hasClinicalNote ? 'in-review' : 'not-validated'
  const sourceIds: string[] = []

  const renalLines = noteLines.filter((line) => includesAny(line, renalPatterns))
  const hepaticLines = noteLines.filter((line) => includesAny(line, hepaticPatterns))
  const loadingLines = noteLines.filter((line) => /\bcarga\b/iu.test(line) && numericDosePattern.test(line))
  const doseLines = noteLines.filter((line) => (
    numericDosePattern.test(line)
      && (doseContextPattern.test(line) || /\b(?:mg|mcg|µg|g|mL|mmol|mEq|MUI|UI)\b/u.test(line))
      && !includesAny(line, renalPatterns)
      && !includesAny(line, hepaticPatterns)
      && !/^\s*(?:TDM|Notas?)\s*:/iu.test(line)
  ))
  const monitoringLines = noteLines.filter((line) => includesAny(line, monitoringPatterns))
  const contraindicationLines = noteLines.filter((line) => includesAny(line, contraindicationPatterns))
  const interactionLines = noteLines.filter((line) => includesAny(line, interactionPatterns))
  const inferredRoutes = inferRoutes(noteLines.join(' '))

  const fallbackDose =
    'Não existe um regime posológico único para esta entrada. Seleccionar dose, intervalo, via e duração pelo RCM/SmPC da apresentação local e pelo protocolo da indicação.'
  const usualAdultDose = doseLines.length > 0
    ? doseLines.slice(0, 8).map((line) => adjustment(
        contextForDoseLine(line),
        line,
        sourceIds,
        validationStatus,
      ))
    : [adjustment('Adulto em Medicina Intensiva', fallbackDose, sourceIds, validationStatus)]

  const intermittentLine = renalLines.find((line) => includesAny(line, intermittentDialysisPatterns))
  const continuousLine = renalLines.find((line) => includesAny(line, continuousDialysisPatterns))
  const renalFallback =
    'Não está documentado um ajuste renal único para esta entrada; confirmar ClCr/eGFR, modalidade de TSR, dose de efluente e RCM antes de prescrever.'
  const hepaticFallback =
    'Não está documentado um ajuste hepático único para esta entrada; confirmar gravidade, indicação e RCM antes de prescrever.'

  const prescriptionText = doseLines.length > 0
    ? doseLines.slice(0, 3).join(' ')
    : fallbackDose

  const contextIndications = unique([
    ...drugSeed.indications,
    ...notes
      .map((note) => note.summary)
      .filter((summary) => summary && !numericDosePattern.test(summary))
      .map((summary) => summary.endsWith('.') ? summary : `${summary}.`),
  ])

  const practicalNotes = unique([
    ...noteLines,
    ...scopeNotes,
    hasClinicalNote
      ? 'Manter o contexto original da indicação e confirmar a apresentação disponível.'
      : 'A posologia depende da indicação e da apresentação; consultar as fontes externas associadas.',
    'Confirmar sempre a apresentação comercial, concentração, compatibilidade, estabilidade e protocolo local.',
  ])

  return {
    ...drugSeed,
    indications: contextIndications,
    routes: inferredRoutes.length > 0
      ? inferredRoutes
      : ['Via dependente da indicação e da apresentação autorizada localmente'],
    usualAdultDose,
    loadingDose: loadingLines.length > 0
      ? adjustment('Dose de carga', loadingLines.join(' '), sourceIds, validationStatus)
      : undefined,
    prescriptionExamples: [
      prescription(prescriptionText, sourceIds, doseLines.length > 0, validationStatus),
    ],
    renalAdjustment: {
      summary: renalLines.length > 0 ? renalLines.join(' ') : renalFallback,
      byKidneyFunction: renalLines.length > 0
        ? renalLines.map((line) => adjustment(
            'Função renal — contexto documentado',
            line,
            sourceIds,
            validationStatus,
          ))
        : [adjustment(
            'Função renal / ClCr / eGFR',
            renalFallback,
            sourceIds,
            validationStatus,
          )],
      intermittentHemodialysis: adjustment(
        'Hemodiálise intermitente',
        intermittentLine ?? renalFallback,
        sourceIds,
        validationStatus,
      ),
      continuousKidneyReplacement: adjustment(
        'Técnicas contínuas de substituição renal',
        continuousLine ?? renalFallback,
        sourceIds,
        validationStatus,
      ),
      monitoring: unique([
        'Reavaliar função renal e diurese perante alterações clínicas agudas.',
        ...monitoringLines,
      ]),
      validationStatus,
    },
    hepaticAdjustment: {
      summary: hepaticLines.length > 0 ? hepaticLines.join(' ') : hepaticFallback,
      bySeverity: hepaticLines.length > 0
        ? hepaticLines.map((line) => adjustment(
            'Disfunção hepática — contexto documentado',
            line,
            sourceIds,
            validationStatus,
          ))
        : [adjustment('Disfunção hepática', hepaticFallback, sourceIds, validationStatus)],
      monitoring: unique([
        'Reavaliar função hepática e sinais de toxicidade quando clinicamente indicado.',
        ...monitoringLines,
      ]),
      validationStatus,
    },
    therapeuticDrugMonitoring: unique([
      ...(defaultMonitoringByCategory[drugSeed.categoryIds[0]] ?? ['Resposta clínica e toxicidade']),
      ...monitoringLines,
    ]),
    contraindications: contraindicationLines.length > 0
      ? contraindicationLines
      : [
          'Hipersensibilidade ao fármaco ou a qualquer excipiente da apresentação.',
          'Confirmar contraindicações específicas no RCM e no contexto clínico individual.',
        ],
    interactions: interactionLines.length > 0
      ? interactionLines
      : ['Rever interacções farmacológicas no RCM e na medicação activa antes da prescrição.'],
    practicalNotes,
    references: [],
    lastReviewedAt: hasClinicalNote ? reviewedNotes.reviewedAt : null,
    validationStatus,
    confidence: hasClinicalNote ? 'moderate' : 'unvalidated',
    reviewNotes: hasClinicalNote
      ? [
          'Conteúdo importado de uma nota clínica interna e mantido em revisão.',
          'Ainda não existem fontes externas específicas associadas a cada recomendação.',
          'Confirmar RCM/SmPC, formulação e protocolo local antes da utilização assistencial.',
        ]
      : [
          'Apenas a entrada, prioridade e âmbito do catálogo estão registados.',
          'Não existe revisão clínica nem bibliografia específica para esta ficha.',
        ],
  }
}

export const reviewedClinicalNoteCount = reviewedNotes.notes.length
export const reviewedClinicalMappedCatalogCount = notesByCatalogId.size
export const reviewedClinicalUnmappedNoteCount = reviewedNotes.stats.unmappedNoteTitles.length

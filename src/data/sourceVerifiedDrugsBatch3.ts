import type { Drug, EvidenceReference } from '../types/drug'
import { dose, prescription } from './drugBuilders.ts'

const REVIEW_DATE = '2026-07-16'

const reference = (
  id: string,
  title: string,
  source: string,
  year: number,
  url: string,
  doi?: string,
): EvidenceReference => ({
  id,
  title,
  source,
  year,
  url,
  doi,
  accessedAt: REVIEW_DATE,
})

const reviewMetadata = {
  lastReviewedAt: REVIEW_DATE,
  validationStatus: 'source-verified' as const,
  confidence: 'moderate' as const,
  reviewNotes: [
    'Revisão documental concluída com guideline toxicológica e monografia farmacológica externa.',
    'A decisão de administrar carvão ativado depende do tóxico, tempo desde a ingestão, gravidade previsível e segurança da via aérea.',
  ],
}

const activatedCharcoal: Drug = {
  id: 'carvao-activado',
  name: 'Carvão activado',
  aliases: ['carvão ativado', 'activated charcoal', 'charcoal'],
  drugClass: 'Adsorvente gastrointestinal / descontaminação toxicológica',
  priority: 'P1',
  subcategories: ['Descontaminação gastrointestinal'],
  categoryIds: ['antidotes-toxicology'],
  indications: [
    'Ingestão potencialmente tóxica de uma substância adsorvível, em doente seleccionado',
    'Maior benefício esperado quando administrado precocemente; o benefício após uma hora depende do tóxico e do contexto',
  ],
  usualAdultDose: [
    dose(
      'Dose única no adulto',
      '25–100 g PO ou por sonda gástrica. A monografia de dose consultada apresenta 50–100 g; a dose óptima não está estabelecida.',
      ['aact-eapcct-charcoal', 'drugs-com-charcoal-dose'],
      ['Não administrar por rotina a todos os doentes intoxicados.'],
    ),
  ],
  prescriptionExamples: [
    prescription(
      'Descontaminação gastrointestinal seleccionada',
      'Carvão activado 50 g PO/SNG, dose única.',
      ['aact-eapcct-charcoal', 'drugs-com-charcoal-dose'],
      'Apenas após confirmar que o tóxico é adsorvível e que existe benefício clínico plausível.',
      [
        'Não administrar com via aérea desprotegida quando existe alteração do estado de consciência ou risco de aspiração.',
        'Não usar comprimidos ou cápsulas de carvão como substituto da suspensão medicinal.',
      ],
    ),
  ],
  routes: ['Oral', 'Sonda nasogástrica/orogástrica'],
  renalAdjustment: {
    summary: 'Não existe absorção sistémica clinicamente relevante; o ajuste por função renal não é aplicável.',
    byKidneyFunction: [
      dose('Qualquer função renal', 'Sem ajuste posológico por ClCr/eGFR.', ['aact-eapcct-charcoal']),
    ],
    intermittentHemodialysis: dose(
      'Hemodiálise intermitente',
      'Não é necessário suplemento relacionado com a diálise; a indicação de HD depende do tóxico ingerido.',
      ['aact-eapcct-charcoal'],
    ),
    continuousKidneyReplacement: dose(
      'Técnicas contínuas',
      'Não é necessário ajuste relacionado com a técnica; a depuração extracorporal do tóxico é uma decisão independente.',
      ['aact-eapcct-charcoal'],
    ),
    monitoring: ['Estado da via aérea', 'Vómitos e sinais de aspiração', 'Trânsito gastrointestinal e distensão'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: {
    summary: 'O ajuste por disfunção hepática não é aplicável porque o carvão activado não é absorvido sistemicamente.',
    bySeverity: [
      dose('Disfunção hepática', 'Sem ajuste posológico.', ['aact-eapcct-charcoal']),
    ],
    monitoring: ['Estado neurológico e segurança da via aérea'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: [
    'Não requer TDM.',
    'Monitorizar evolução da intoxicação, estado neurológico, via aérea, vómitos e função gastrointestinal.',
  ],
  contraindications: [
    'Via aérea desprotegida em doente com alteração do estado de consciência',
    'Ingestão com elevado risco de aspiração em que o carvão possa agravar a lesão',
    'Risco de hemorragia ou perfuração gastrointestinal; obstrução/íleo quando se ponderam doses repetidas',
  ],
  interactions: [
    'Adsorve muitos medicamentos orais e pode reduzir a eficácia de terapêuticas administradas por via entérica',
    'Não é eficaz para todas as substâncias; confirmar adsorção e alternativas específicas com Toxicologia/CIAV',
  ],
  practicalNotes: [
    'Não administrar rotineiramente: seleccionar o doente e o tóxico.',
    'A eficácia diminui com o tempo; a decisão após uma hora deve ser individualizada.',
    'A aspiração é a complicação mais grave; confirmar posição da sonda e protecção da via aérea.',
    'Formulações com sorbitol aumentam efeitos gastrointestinais e não devem ser usadas por rotina.',
  ],
  references: [
    reference(
      'aact-eapcct-charcoal',
      'Position paper: Single-dose activated charcoal',
      'AACT / EAPCCT',
      2005,
      'https://pubmed.ncbi.nlm.nih.gov/15822758/',
      '10.1081/CLT-200051867',
    ),
    reference(
      'clinical-toxicology-charcoal-2026',
      'Recommendations from the Clinical Toxicology Recommendations Collaborative on the administration of activated charcoal in acute oral overdose',
      'Clinical Toxicology Recommendations Collaborative',
      2026,
      'https://pubmed.ncbi.nlm.nih.gov/41906697/',
    ),
    reference(
      'drugs-com-charcoal-dose',
      'Charcoal Dosage Guide',
      'Drugs.com',
      2026,
      'https://www.drugs.com/dosage/charcoal.html',
    ),
  ],
  ...reviewMetadata,
}

export const sourceVerifiedDrugsBatch3: Drug[] = [activatedCharcoal]

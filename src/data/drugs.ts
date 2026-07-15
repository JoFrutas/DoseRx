import type {
  DoseAdjustment,
  Drug,
  HepaticAdjustment,
  PrescriptionExample,
  RenalAdjustment,
} from '../types/drug'

export const CLINICAL_PLACEHOLDER =
  'Conteúdo clínico pendente de validação por equipa médica/farmacêutica. Não utilizar para prescrição.'

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

const placeholderRenalAdjustment = (): RenalAdjustment => ({
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
})

const placeholderHepaticAdjustment = (): HepaticAdjustment => ({
  summary: CLINICAL_PLACEHOLDER,
  bySeverity: [placeholderDose('Disfunção hepática — estratificação por definir')],
  monitoring: [CLINICAL_PLACEHOLDER],
  validationStatus: 'not-validated',
})

interface PlaceholderDrugSeed {
  id: string
  name: string
  aliases: string[]
  drugClass: string
  categoryIds: string[]
  indications: string[]
  routes: string[]
}

function createUnvalidatedDrugSeed(seed: PlaceholderDrugSeed): Drug {
  return {
    ...seed,
    usualAdultDose: [placeholderDose('Adulto em Medicina Intensiva')],
    prescriptionExamples: [placeholderPrescription()],
    loadingDose: placeholderDose('Dose de carga, se aplicável'),
    renalAdjustment: placeholderRenalAdjustment(),
    hepaticAdjustment: placeholderHepaticAdjustment(),
    therapeuticDrugMonitoring: [CLINICAL_PLACEHOLDER],
    contraindications: [CLINICAL_PLACEHOLDER],
    interactions: [CLINICAL_PLACEHOLDER],
    practicalNotes: [CLINICAL_PLACEHOLDER],
    references: [],
    lastReviewedAt: null,
    validationStatus: 'not-validated',
    confidence: 'unvalidated',
    reviewNotes: [
      'Ficha criada apenas para demonstrar a arquitectura data-driven.',
      'Requer fontes primárias ou institucionais, revisão clínica e aprovação antes de publicação assistencial.',
    ],
  }
}

export const drugs: Drug[] = [
  createUnvalidatedDrugSeed({
    id: 'meropenem',
    name: 'Meropenem',
    aliases: ['meropenem IV'],
    drugClass: 'Carbapenemo',
    categoryIds: ['antibiotics', 'sepsis', 'renal-dialysis'],
    indications: ['Infecções graves em UCI — metadado de pesquisa por validar'],
    routes: ['Via intravenosa — informação por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'fluconazole',
    name: 'Fluconazol',
    aliases: ['fluconazole'],
    drugClass: 'Antifúngico azólico',
    categoryIds: ['antifungals', 'renal-dialysis'],
    indications: ['Infecção fúngica — metadado de pesquisa por validar'],
    routes: ['Vias de administração por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'acyclovir',
    name: 'Aciclovir',
    aliases: ['acyclovir'],
    drugClass: 'Antiviral',
    categoryIds: ['antivirals', 'renal-dialysis'],
    indications: ['Infecção viral — metadado de pesquisa por validar'],
    routes: ['Vias de administração por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'levetiracetam',
    name: 'Levetiracetam',
    aliases: ['LEV'],
    drugClass: 'Antiepiléptico',
    categoryIds: ['antiepileptics', 'renal-dialysis'],
    indications: ['Crises epilépticas — metadado de pesquisa por validar'],
    routes: ['Vias de administração por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'propofol',
    name: 'Propofol',
    aliases: ['2,6-diisopropilfenol'],
    drugClass: 'Sedativo-hipnótico',
    categoryIds: ['sedation-analgesia'],
    indications: ['Sedação — metadado de pesquisa por validar'],
    routes: ['Via intravenosa — informação por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'rocuronium',
    name: 'Rocurónio',
    aliases: ['rocuronium'],
    drugClass: 'Bloqueador neuromuscular não despolarizante',
    categoryIds: ['neuromuscular-blockers'],
    indications: ['Bloqueio neuromuscular — metadado de pesquisa por validar'],
    routes: ['Via intravenosa — informação por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'norepinephrine',
    name: 'Noradrenalina',
    aliases: ['norepinefrina', 'norepinephrine'],
    drugClass: 'Vasopressor catecolaminérgico',
    categoryIds: ['vasopressors-inotropes', 'sepsis'],
    indications: ['Choque — metadado de pesquisa por validar'],
    routes: ['Via intravenosa — informação por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'amiodarone',
    name: 'Amiodarona',
    aliases: ['amiodarone'],
    drugClass: 'Antiarrítmico',
    categoryIds: ['antiarrhythmics'],
    indications: ['Arritmia — metadado de pesquisa por validar'],
    routes: ['Vias de administração por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'enoxaparin',
    name: 'Enoxaparina',
    aliases: ['enoxaparin', 'HBPM'],
    drugClass: 'Heparina de baixo peso molecular',
    categoryIds: ['antithrombotics', 'renal-dialysis'],
    indications: ['Anticoagulação — metadado de pesquisa por validar'],
    routes: ['Via subcutânea — informação por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'furosemide',
    name: 'Furosemida',
    aliases: ['furosemide'],
    drugClass: 'Diurético da ansa',
    categoryIds: ['diuretics', 'renal-dialysis'],
    indications: ['Gestão de volume — metadado de pesquisa por validar'],
    routes: ['Vias de administração por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'potassium-chloride',
    name: 'Cloreto de potássio',
    aliases: ['KCl', 'potassium chloride'],
    drugClass: 'Electrólito',
    categoryIds: ['electrolytes-metabolic', 'renal-dialysis'],
    indications: ['Correcção electrolítica — metadado de pesquisa por validar'],
    routes: ['Vias de administração por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'fomepizole',
    name: 'Fomepizol',
    aliases: ['fomepizole', '4-metilpirazol'],
    drugClass: 'Antídoto',
    categoryIds: ['antidotes-toxicology', 'renal-dialysis'],
    indications: ['Intoxicação — metadado de pesquisa por validar'],
    routes: ['Vias de administração por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'pantoprazole',
    name: 'Pantoprazol',
    aliases: ['pantoprazole'],
    drugClass: 'Inibidor da bomba de protões',
    categoryIds: ['gastrointestinal'],
    indications: ['Contexto gastrointestinal — metadado de pesquisa por validar'],
    routes: ['Vias de administração por validar'],
  }),
  createUnvalidatedDrugSeed({
    id: 'hydrocortisone',
    name: 'Hidrocortisona',
    aliases: ['hydrocortisone'],
    drugClass: 'Corticosteróide',
    categoryIds: ['endocrine-corticosteroids', 'sepsis'],
    indications: ['Corticoterapia em UCI — metadado de pesquisa por validar'],
    routes: ['Vias de administração por validar'],
  }),
]

export function getDrugById(drugId: string): Drug | undefined {
  return drugs.find((drug) => drug.id === drugId)
}

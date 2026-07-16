import type {
  ConfidenceLevel,
  DrugVerification,
  EvidenceReference,
  ValidationStatus,
} from '../types/drug.ts'

const REVIEW_DATE = '2026-07-16'

interface CrossSourceVerificationPatch {
  references: EvidenceReference[]
  verification: DrugVerification
  validationStatus?: ValidationStatus
  confidence?: ConfidenceLevel
  reviewNotes?: string[]
}

const webReference = (
  id: string,
  title: string,
  source: string,
  url: string,
): EvidenceReference => ({
  id,
  title,
  source,
  year: 2026,
  url,
  accessedAt: REVIEW_DATE,
})

const consensus = (
  primarySourceId: string,
  medscape: EvidenceReference,
  drugsCom: EvidenceReference,
  scope: string,
  summary: string,
): CrossSourceVerificationPatch => ({
  references: [medscape, drugsCom],
  validationStatus: 'validated',
  confidence: 'high',
  verification: {
    status: 'consensus',
    reviewedAt: REVIEW_DATE,
    scope,
    comparedSourceIds: [
      medscape.id,
      drugsCom.id,
      primarySourceId,
    ],
    summary,
    discrepancies: [],
  },
  reviewNotes: [
    'Conteúdo comparado com Medscape, Drugs.com e uma fonte primária ou regulatória independente.',
    'Não foram identificadas discrepâncias materiais dentro do âmbito explicitado na comparação.',
    'Formulação, concentração padronizada e protocolos institucionais continuam a ser confirmados no ponto de utilização.',
  ],
})

export const crossSourceVerificationByDrugId: Readonly<
  Partial<Record<string, CrossSourceVerificationPatch>>
> = {
  amoxicilina: {
    references: [],
    validationStatus: 'source-verified',
    confidence: 'high',
    verification: {
      status: 'context-dependent',
      reviewedAt: REVIEW_DATE,
      scope: 'Posologia adulta oral e IV, ajuste renal e hemodiálise, distinguindo apresentação europeia e informação norte-americana.',
      comparedSourceIds: [
        'amoxicillin-iv-smpc',
        'amoxicillin-oral-smpc',
        'amoxil-fda-label',
        'amoxicillin-drugscom',
      ],
      summary: 'As fontes regulatórias e Drugs.com são concordantes dentro de cada apresentação, mas a informação oral norte-americana não valida a posologia IV europeia e os regimes não devem ser fundidos.',
      discrepancies: [
        'A informação norte-americana consultada descreve apresentações orais; o SmPC IV europeu permite doses e frequências diferentes conforme foco e gravidade.',
        'Na hemodiálise, o momento e a quantidade dos suplementos variam entre via/apresentação e jurisdição; a prescrição deve seguir o RCM do produto concreto.',
      ],
    },
    reviewNotes: [
      'Revisão dirigida efectuada por via e apresentação; não foi aplicada votação por maioria.',
      'O link Medscape indicado foi registado na bibliografia; a confirmação numérica desta revisão usa fontes externas acessíveis e específicas da apresentação.',
    ],
  },
  'amoxicilina-acido-clavulanico': {
    references: [],
    validationStatus: 'source-verified',
    confidence: 'high',
    verification: {
      status: 'context-dependent',
      reviewedAt: REVIEW_DATE,
      scope: 'Posologia adulta oral e IV, rácios amoxicilina/clavulanato, ajuste renal, hemodiálise e preparação IV.',
      comparedSourceIds: [
        'coamoxiclav-iv-smpc',
        'coamoxiclav-oral-smpc',
        'augmentin-drugscom',
      ],
      summary: 'Não existe uma única dose de “Augmentin”: a via, o rácio e a jurisdição alteram dose, frequência, ajuste renal e modo de preparação.',
      discrepancies: [
        'A apresentação IV europeia 1000/200 mg usa 8/8 h; a ficha oral norte-americana usa 875/125 mg 12/12 h ou 500/125 mg 8/8 h nas infecções graves.',
        'A apresentação oral europeia 875/125 mg admite 12/12 h ou 8/8 h, mas não é recomendada com ClCr <30 mL/min; apresentações 4:1 têm tabelas renais próprias.',
        'O regime anterior de 1,2 g IV 6/6 h não foi mantido como dose habitual da apresentação 1000/200 mg consultada.',
      ],
    },
    reviewNotes: [
      'Revisão dirigida efectuada por componente, via e apresentação; não foi aplicada votação por maioria.',
      'A dose total isolada foi substituída pela expressão amoxicilina/clavulanato para reduzir erro de rácio.',
      'O link Medscape indicado foi registado na bibliografia; a confirmação numérica desta revisão usa fontes externas acessíveis e específicas da apresentação.',
    ],
  },
  meropenem: consensus(
    'meropenem-smpc',
    webReference(
      'medscape-meropenem',
      'Meropenem dosing, indications and dose modifications',
      'Medscape Drug Reference',
      'https://reference.medscape.com/drug/meropenem-342565',
    ),
    webReference(
      'drugscom-meropenem',
      'Meropenem Dosage Guide',
      'Drugs.com',
      'https://www.drugs.com/dosage/meropenem.html',
    ),
    'Dose adulta por indicação, intervalos por ClCr e administração IV intermitente; regimes HD/CRRT mantêm fonte institucional própria.',
    'As três fontes externas concordam nos regimes adultos principais e na redução progressiva por função renal.',
  ),
  fluconazole: consensus(
    'fluconazole-dailymed',
    webReference(
      'medscape-fluconazole',
      'Diflucan (fluconazole) dosing and dose modifications',
      'Medscape Drug Reference',
      'https://reference.medscape.com/drug/diflucan-fluconazole-342587',
    ),
    webReference(
      'drugscom-fluconazole',
      'Fluconazole Dosage Guide',
      'Drugs.com',
      'https://www.drugs.com/dosage/fluconazole.html',
    ),
    'Carga e manutenção na candidíase invasiva, redução da manutenção por ClCr e administração após hemodiálise; CVVHD excluída da comparação genérica.',
    'As fontes concordam na carga plena, manutenção habitual e redução para 50% quando ClCr é igual ou inferior a 50 mL/min sem diálise.',
  ),
  acyclovir: consensus(
    'acyclovir-dailymed',
    webReference(
      'medscape-acyclovir',
      'Zovirax (acyclovir) dosing and dose modifications',
      'Medscape Drug Reference',
      'https://reference.medscape.com/drug/zovirax-acyclovir-342601',
    ),
    webReference(
      'drugscom-acyclovir',
      'Acyclovir Dosage Guide',
      'Drugs.com',
      'https://www.drugs.com/dosage/acyclovir.html',
    ),
    'Dose IV adulta para HSV/VZV e encefalite, intervalo por função renal e duração mínima da perfusão; HD/CRRT mantêm fonte institucional própria.',
    'As fontes concordam nas doses de 5 e 10 mg/kg, na perfusão durante pelo menos uma hora e no alargamento do intervalo com disfunção renal.',
  ),
  propofol: consensus(
    'propofol-label',
    webReference(
      'medscape-propofol',
      'Diprivan (propofol) dosing and administration',
      'Medscape Drug Reference',
      'https://reference.medscape.com/drug/diprivan-propofol-343100',
    ),
    webReference(
      'drugscom-propofol',
      'Propofol Dosage Guide',
      'Drugs.com',
      'https://www.drugs.com/dosage/propofol.html',
    ),
    'Início, titulação e intervalo habitual da perfusão para sedação de adulto ventilado em UCI.',
    'As fontes concordam no início a 5 mcg/kg/min, incrementos graduais e manutenção habitual entre 5 e 50 mcg/kg/min.',
  ),
  norepinephrine: consensus(
    'norepinephrine-label',
    webReference(
      'medscape-norepinephrine',
      'Levophed (norepinephrine) dosing and administration',
      'Medscape Drug Reference',
      'https://reference.medscape.com/drug/levarterenol-levophed-norepinephrine-342443',
    ),
    webReference(
      'drugscom-norepinephrine',
      'Norepinephrine Dosage Guide',
      'Drugs.com',
      'https://www.drugs.com/dosage/norepinephrine.html',
    ),
    'Dose inicial de referência e titulação contínua da perfusão vasoactiva; concentração final excluída porque deve ser institucional.',
    'As fontes concordam na dose inicial de referência de 8–12 mcg/min e na titulação ao alvo hemodinâmico.',
  ),
  amiodarone: consensus(
    'amiodarone-label',
    webReference(
      'medscape-amiodarone',
      'Cordarone/Pacerone (amiodarone) dosing and administration',
      'Medscape Drug Reference',
      'https://reference.medscape.com/drug/pacerone-cordarone-amiodarone-342296',
    ),
    webReference(
      'drugscom-amiodarone',
      'Amiodarone Dosage Guide',
      'Drugs.com',
      'https://www.drugs.com/dosage/amiodarone.html',
    ),
    'Carga IV para taquicardia ventricular, sequência de 1 mg/min e 0,5 mg/min e ausência de ajuste renal.',
    'As fontes concordam no esquema de 150 mg em 10 minutos, seguido de 1 mg/min durante 6 horas e 0,5 mg/min.',
  ),
  enoxaparin: {
    references: [
      webReference(
        'medscape-enoxaparin',
        'Lovenox (enoxaparin) dosing and dose modifications',
        'Medscape Drug Reference',
        'https://reference.medscape.com/drug/lovenox-enoxaparin-342174',
      ),
      webReference(
        'drugscom-enoxaparin',
        'Enoxaparin Dosage Guide',
        'Drugs.com',
        'https://www.drugs.com/dosage/enoxaparin.html',
      ),
    ],
    verification: {
      status: 'context-dependent',
      reviewedAt: REVIEW_DATE,
      scope: 'Profilaxia e tratamento no adulto, incluindo insuficiência renal grave.',
      comparedSourceIds: [
        'medscape-enoxaparin',
        'drugscom-enoxaparin',
        'enoxaparin-eu-smpc',
      ],
      summary: 'A dose terapêutica por peso é concordante; a profilaxia na ClCr 15–30 mL/min diverge entre a informação europeia e norte-americana.',
      discrepancies: [
        'O RCM europeu usa 20 mg SC de 24/24 h para profilaxia na ClCr 15–30 mL/min; as fontes norte-americanas usam habitualmente 30 mg SC de 24/24 h.',
        'A aplicação mantém o regime europeu/português e apresenta a diferença de jurisdição em vez de aplicar uma votação simples.',
      ],
    },
  },
}

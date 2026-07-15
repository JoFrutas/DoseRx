import type { Drug, EvidenceReference } from '../types/drug'
import {
  dose,
  noHepaticDoseAdjustment,
  noRenalDoseAdjustment,
  prescription,
} from './drugBuilders.ts'

const REVIEW_DATE = '2026-07-16'

const reference = (
  id: string,
  title: string,
  source: string,
  year: number,
  url: string,
): EvidenceReference => ({ id, title, source, year, url, accessedAt: REVIEW_DATE })

const reviewMetadata = {
  lastReviewedAt: REVIEW_DATE,
  validationStatus: 'source-verified' as const,
  confidence: 'moderate' as const,
  reviewNotes: [
    'Revisão documental concluída com RCM/SmPC, rótulo oficial e/ou guideline de sociedade científica.',
    'Fontes primárias verificadas; confirmar formulações disponíveis e protocolos locais antes da utilização assistencial.',
    'Confirmar sempre indicação, peso de dose, função orgânica dinâmica, compatibilidade, concentração e velocidade antes de prescrever.',
  ],
}

const meropenem: Drug = {
  id: 'meropenem',
  name: 'Meropenem',
  aliases: ['meropenem IV'],
  drugClass: 'Carbapenemo',
  priority: 'P1',
  subcategories: ['Carbapenemos'],
  categoryIds: ['antibiotics', 'sepsis', 'renal-dialysis'],
  indications: [
    'Pneumonia grave, incluindo pneumonia hospitalar e associada à ventilação',
    'Infecção intra-abdominal ou urinária complicada',
    'Meningite bacteriana aguda',
    'Febre neutropénica com suspeita de infecção bacteriana',
  ],
  usualAdultDose: [
    dose('Infecção grave / pneumonia hospitalar', '500 mg a 1 g IV de 8/8 h; seleccionar a dose conforme gravidade, agente, MIC e foco.', ['meropenem-smpc']),
    dose('Meningite bacteriana aguda', '2 g IV de 8/8 h.', ['meropenem-smpc']),
    dose('Infecção muito grave ou microrganismo menos susceptível', 'Pode ser necessário até 2 g IV de 8/8 h, com decisão individual e apoio de Infecciologia/Farmácia.', ['meropenem-smpc']),
  ],
  prescriptionExamples: [
    prescription(
      'Exemplo documental — dose de 1 g',
      'Meropenem 1 g IV de 8/8 h; perfundir em 15–30 min.',
      ['meropenem-smpc'],
      'Exemplo com função renal preservada; confirmar foco, MIC e protocolo local.',
      ['A perfusão prolongada durante 3 h é uma estratégia institucional possível em populações seleccionadas.'],
    ),
  ],
  routes: ['Intravenosa'],
  loadingDose: dose(
    'Antes de perfusão prolongada em infecção grave',
    'Pode ser considerada uma dose inicial plena em 30 min antes do regime prolongado; a dose concreta deve seguir o protocolo local.',
    ['ucsf-antimicrobial-hd'],
    ['Não está apresentada como dose de carga universal no RCM.'],
  ),
  renalAdjustment: {
    summary: 'Ajustar quando ClCr <51 mL/min. A “dose unitária” é a dose seleccionada para a indicação (500 mg, 1 g ou 2 g).',
    byKidneyFunction: [
      dose('ClCr >50 mL/min', 'Dose unitária seleccionada de 8/8 h.', ['meropenem-smpc']),
      dose('ClCr 26–50 mL/min', 'Uma dose unitária de 12/12 h.', ['meropenem-smpc']),
      dose('ClCr 10–25 mL/min', 'Metade da dose unitária de 12/12 h.', ['meropenem-smpc']),
      dose('ClCr <10 mL/min', 'Metade da dose unitária de 24/24 h.', ['meropenem-smpc']),
    ],
    intermittentHemodialysis: dose('Hemodiálise intermitente', 'Regime institucional de referência: 500 mg IV agora e depois ao fim do dia; administrar após HD nos dias de diálise.', ['ucsf-antimicrobial-hd'], ['O RCM confirma remoção por HD, mas não estabelece uma dose fixa.']),
    continuousKidneyReplacement: dose('CVVHD', 'Regime institucional de referência: 1 g IV de 8/8 h; considerar perfusão prolongada e rever se efluente >2 L/h.', ['ucsf-antimicrobial-hd']),
    monitoring: ['Função renal diária e evolução da diurese', 'Resposta clínica, culturas e susceptibilidade/MIC', 'Neurotoxicidade/convulsões', 'TDM de beta-lactâmicos quando disponível'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: {
    summary: 'Não é necessário ajuste por disfunção hepática segundo o RCM.',
    bySeverity: [dose('Disfunção hepática', 'Sem ajuste posológico; monitorizar função hepática durante o tratamento.', ['meropenem-smpc'])],
    monitoring: ['AST/ALT, bilirrubina e sinais de colestase/citólise'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: ['Considerar TDM de beta-lactâmicos em choque, ARC, obesidade, ECMO, meningite ou TSR quando disponível.'],
  contraindications: ['Hipersensibilidade a meropenem/carbapenemos', 'Reacção de hipersensibilidade grave prévia a outro beta-lactâmico'],
  interactions: ['Valproato/ácido valpróico: queda rápida das concentrações; associação não recomendada', 'Probenecida aumenta a exposição ao meropenem'],
  practicalNotes: ['Obter culturas antes da primeira dose quando isso não atrasar terapêutica urgente.', 'Reavaliar diariamente descalada, foco, duração e adequação à ecologia local.', 'A dose de 2 g contém carga de sódio clinicamente relevante.'],
  references: [
    reference('meropenem-smpc', 'Meropenem 2 g powder for solution for infusion — SmPC', 'electronic medicines compendium', 2026, 'https://www.medicines.org.uk/emc/product/15038/smpc'),
    reference('ucsf-antimicrobial-hd', 'Antimicrobial Dosing in Intermittent & Continuous Hemodialysis', 'UCSF Infectious Diseases Management Program', 2026, 'https://idmp.ucsf.edu/antimicrobial-dosing-intermittent-continuous-hemodialysis'),
  ],
  ...reviewMetadata,
}

const fluconazole: Drug = {
  id: 'fluconazole',
  name: 'Fluconazol',
  aliases: ['fluconazole'],
  drugClass: 'Antifúngico triazólico',
  priority: 'P1',
  subcategories: ['Azóis'],
  categoryIds: ['antifungals', 'renal-dialysis'],
  indications: ['Candidemia e candidíase invasiva por isolado susceptível', 'Candidíase mucosa seleccionada', 'Criptococose em regimes específicos'],
  usualAdultDose: [
    dose('Candidemia / candidíase invasiva', '800 mg IV/PO no dia 1, depois 400 mg IV/PO de 24/24 h; ajustar a espécie, susceptibilidade e foco.', ['fluconazole-smpc']),
  ],
  prescriptionExamples: [
    prescription('Candidemia — exemplo documental', 'Fluconazol 800 mg IV no dia 1, depois 400 mg IV de 24/24 h.', ['fluconazole-smpc'], 'Apenas quando fluconazol é opção adequada; em doente crítico uma equinocandina pode ser preferida inicialmente.', ['Confirmar concentração/apresentação local e velocidade máxima do produto.']),
  ],
  routes: ['Intravenosa', 'Oral'],
  loadingDose: dose('Candidíase invasiva', '800 mg no dia 1.', ['fluconazole-smpc']),
  renalAdjustment: {
    summary: 'Dar a dose de carga integral; ajustar a manutenção em tratamentos de doses múltiplas.',
    byKidneyFunction: [
      dose('ClCr >50 mL/min', '100% da dose indicada.', ['fluconazole-dailymed']),
      dose('ClCr ≤50 mL/min, sem diálise', '50% da dose de manutenção indicada.', ['fluconazole-dailymed']),
    ],
    intermittentHemodialysis: dose('Hemodiálise intermitente', 'Administrar 100% da dose indicada após cada sessão; nos dias sem diálise, dose reduzida conforme ClCr.', ['fluconazole-dailymed']),
    continuousKidneyReplacement: dose('CVVHD — infecção grave', 'O protocolo UCSF usa 800–1200 mg/dia, divididos de 12/12–24/24 h; depende do fluxo e não deve ser extrapolado para todas as modalidades.', ['ucsf-antimicrobial-hd'], ['Discutir com Infecciologia/Farmácia e usar susceptibilidade/MIC.']),
    monitoring: ['Função renal e modalidade/dose de efluente', 'Resposta clínica, culturas e susceptibilidade', 'QT e electrólitos em doentes de risco'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: {
    summary: 'Não há redução padronizada; usar com cautela e monitorizar hepatotoxicidade.',
    bySeverity: [dose('Disfunção hepática', 'Sem regime quantitativo estabelecido na fonte consultada; ponderar risco/benefício e vigiar função hepática.', ['fluconazole-smpc'])],
    monitoring: ['AST/ALT, bilirrubina e sinais clínicos de hepatotoxicidade'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: ['TDM não é rotineiro; considerar em situações PK extremas ou falência terapêutica com apoio especializado.'],
  contraindications: ['Hipersensibilidade ao fluconazol/azóis', 'Associações contraindicadas pelo RCM por prolongamento do QT devem ser confirmadas no medicamento concreto'],
  interactions: ['Inibição de CYP2C9/2C19 e moderada de CYP3A4: múltiplas interacções', 'Fármacos que prolongam QT aumentam risco arrítmico', 'Potencia o efeito de antagonistas da vitamina K'],
  practicalNotes: ['Confirmar espécie e susceptibilidade de Candida.', 'A elevada depuração em CVVHD pode exigir doses superiores às da função renal normal.', 'Rever interacções no início e na descalada.'],
  references: [
    reference('fluconazole-smpc', 'Fluconazole 2 mg/mL solution for infusion — SmPC', 'electronic medicines compendium', 2026, 'https://www.medicines.org.uk/emc/product/3378/smpc'),
    reference('fluconazole-dailymed', 'Fluconazole injection — official drug label', 'DailyMed / U.S. National Library of Medicine', 2026, 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=22ebc3fb-ee81-44bd-a6e3-5e759ee724a8&version=2'),
    reference('ucsf-antimicrobial-hd', 'Antimicrobial Dosing in Intermittent & Continuous Hemodialysis', 'UCSF Infectious Diseases Management Program', 2026, 'https://idmp.ucsf.edu/antimicrobial-dosing-intermittent-continuous-hemodialysis'),
  ],
  ...reviewMetadata,
}

const acyclovir: Drug = {
  id: 'acyclovir',
  name: 'Aciclovir',
  aliases: ['acyclovir'],
  drugClass: 'Antiviral análogo nucleósido',
  priority: 'P1',
  subcategories: ['Herpes simplex e varicela-zoster'],
  categoryIds: ['antivirals', 'renal-dialysis'],
  indications: ['Encefalite por HSV', 'Infecção grave/disseminada por VZV no imunocomprometido', 'Infecção grave por HSV'],
  usualAdultDose: [
    dose('HSV/VZV sem encefalite', '5 mg/kg IV de 8/8 h se função renal normal.', ['acyclovir-smpc']),
    dose('Encefalite herpética ou VZV no imunocomprometido', '10 mg/kg IV de 8/8 h se função renal normal.', ['acyclovir-smpc']),
  ],
  prescriptionExamples: [
    prescription('Encefalite herpética — exemplo documental', 'Aciclovir 10 mg/kg IV de 8/8 h; perfundir durante pelo menos 1 h.', ['acyclovir-smpc'], 'Função renal normal; ajustar por ClCr e assegurar hidratação.', ['Confirmar o peso de dose em obesidade e a concentração final da preparação local.']),
  ],
  routes: ['Intravenosa', 'Oral'],
  renalAdjustment: {
    summary: 'A eliminação é renal e a neuro/nefrotoxicidade aumenta com acumulação. Manter hidratação e ajustar pela ClCr.',
    byKidneyFunction: [
      dose('ClCr 25–50 mL/min', 'Manter a dose indicada e aumentar o intervalo para 12/12 h.', ['acyclovir-dailymed']),
      dose('ClCr 10–25 mL/min', 'Manter a dose indicada e aumentar o intervalo para 24/24 h.', ['acyclovir-dailymed']),
      dose('ClCr 0–10 mL/min', 'Administrar 50% da dose indicada de 24/24 h.', ['acyclovir-dailymed']),
    ],
    intermittentHemodialysis: dose('HD — encefalite HSV/VZV disseminado', 'Referência institucional: 5 mg/kg IV agora e depois ao fim do dia; administrar após HD.', ['ucsf-antimicrobial-hd']),
    continuousKidneyReplacement: dose('CVVHD — encefalite HSV/VZV disseminado', 'Referência institucional: 10 mg/kg IV de 12/12 h.', ['ucsf-antimicrobial-hd']),
    monitoring: ['Creatinina, diurese e hidratação', 'Estado mental, mioclonias e convulsões', 'Modalidade e intensidade de TSR'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: noHepaticDoseAdjustment(['acyclovir-smpc'], ['Função hepática segundo contexto clínico']),
  therapeuticDrugMonitoring: ['TDM não é rotineiro; a vigilância é clínica, renal e neurológica.'],
  contraindications: ['Hipersensibilidade a aciclovir ou valaciclovir'],
  interactions: ['Outros nefrotóxicos aumentam risco de lesão renal', 'Probenecida/cimetidina podem reduzir a depuração', 'Monitorizar lítio se associado a dose IV elevada'],
  practicalNotes: ['Nunca administrar em bólus; perfundir durante pelo menos 1 hora.', 'Assegurar hidratação e débito urinário adequado.', 'Em obesidade, a escolha do peso de dose é controversa; confirmar protocolo local.'],
  references: [
    reference('acyclovir-smpc', 'Aciclovir 25 mg/mL concentrate for solution for infusion — SmPC', 'electronic medicines compendium', 2026, 'https://www.medicines.org.uk/emc/product/377/smpc'),
    reference('acyclovir-dailymed', 'Acyclovir Injection, USP — official drug label', 'DailyMed / U.S. National Library of Medicine', 2026, 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=889bccd1-3793-40ce-bca2-c8c9cf6b7488'),
    reference('ucsf-antimicrobial-hd', 'Antimicrobial Dosing in Intermittent & Continuous Hemodialysis', 'UCSF Infectious Diseases Management Program', 2026, 'https://idmp.ucsf.edu/antimicrobial-dosing-intermittent-continuous-hemodialysis'),
  ],
  ...reviewMetadata,
}

const levetiracetam: Drug = {
  id: 'levetiracetam',
  name: 'Levetiracetam',
  aliases: ['LEV', 'Keppra'],
  drugClass: 'Antiepiléptico',
  priority: 'P1',
  subcategories: ['Segunda linha no estado de mal', 'Manutenção'],
  categoryIds: ['antiepileptics', 'renal-dialysis', 'neurocritical'],
  indications: ['Estado de mal epiléptico após benzodiazepina', 'Tratamento/manutenção de crises epilépticas quando via oral não é possível'],
  usualAdultDose: [
    dose('Manutenção no adulto', '500–1500 mg IV/PO de 12/12 h, individualizado à indicação e função renal.', ['levetiracetam-label']),
  ],
  prescriptionExamples: [
    prescription('Estado de mal — carga documental', 'Levetiracetam 60 mg/kg IV (máximo 4500 mg), dose única.', ['acep-status-epilepticus'], 'Segunda linha após benzodiazepina.', ['O RCM da formulação recomenda diluição em pelo menos 100 mL e perfusão em 15 min; confirmar volume máximo e apresentação local.']),
  ],
  routes: ['Intravenosa', 'Oral'],
  loadingDose: dose('Estado de mal epiléptico', '60 mg/kg IV, máximo 4500 mg, dose única.', ['acep-status-epilepticus']),
  renalAdjustment: {
    summary: 'Ajustar a manutenção à função renal; a carga do estado de mal não deve ser atrasada por este cálculo.',
    byKidneyFunction: [
      dose('ClCr >80 mL/min/1,73 m²', '500–1500 mg de 12/12 h.', ['levetiracetam-label']),
      dose('ClCr 50–80 mL/min/1,73 m²', '500–1000 mg de 12/12 h.', ['levetiracetam-label']),
      dose('ClCr 30–50 mL/min/1,73 m²', '250–750 mg de 12/12 h.', ['levetiracetam-label']),
      dose('ClCr <30 mL/min/1,73 m²', '250–500 mg de 12/12 h.', ['levetiracetam-label']),
    ],
    intermittentHemodialysis: dose('Doença renal terminal em HD', '500–1000 mg de 24/24 h, com suplemento de 250–500 mg após cada sessão.', ['levetiracetam-label']),
    continuousKidneyReplacement: dose('Técnicas contínuas', 'Não existe regime no RCM consultado; individualizar pela dose de efluente e considerar apoio farmacêutico/TDM se disponível.', ['levetiracetam-smpc']),
    monitoring: ['Controlo de crises/EEG quando indicado', 'Função renal', 'Sonolência, agitação ou alterações comportamentais'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: noHepaticDoseAdjustment(['levetiracetam-smpc'], ['Função renal, que pode ser sobrestimada na hepatopatia avançada']),
  therapeuticDrugMonitoring: ['TDM não é rotineiro; pode ser útil em TSR, gravidez, extremos farmacocinéticos ou dúvida de adesão.'],
  contraindications: ['Hipersensibilidade ao levetiracetam ou derivados de pirrolidona'],
  interactions: ['Baixo potencial de interacção farmacocinética; rever depressores do SNC e alterações comportamentais cumulativas'],
  practicalNotes: ['A formulação IV substitui a dose oral total diária na proporção 1:1.', 'Não interromper abruptamente manutenção crónica sem ponderação clínica.', 'Aproximadamente metade da carga corporal pode ser removida numa sessão típica de HD.'],
  references: [
    reference('levetiracetam-label', 'Levetiracetam Injection — official prescribing information', 'DailyMed / U.S. National Library of Medicine', 2025, 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=8d767545-1eb9-45a5-bd16-e8a66e628fea&type=display'),
    reference('levetiracetam-smpc', 'Levetiracetam 100 mg/mL concentrate for solution for infusion — SmPC', 'electronic medicines compendium', 2026, 'https://www.medicines.org.uk/emc/product/11035/smpc'),
    reference('acep-status-epilepticus', 'Clinical Policy: Adult Patients Presenting With Seizures', 'American College of Emergency Physicians', 2024, 'https://www.acep.org/siteassets/new-pdfs/clinical-policies/seizures.pdf'),
  ],
  ...reviewMetadata,
}

const propofol: Drug = {
  id: 'propofol',
  name: 'Propofol',
  aliases: ['2,6-diisopropilfenol'],
  drugClass: 'Sedativo-hipnótico intravenoso',
  priority: 'P1',
  subcategories: ['Sedativos principais'],
  categoryIds: ['sedation-analgesia'],
  indications: ['Sedação de adulto intubado e ventilado mecanicamente', 'Indução anestésica em contexto apropriado'],
  usualAdultDose: [
    dose('Sedação em UCI', 'Iniciar a 5 mcg/kg/min e titular em incrementos de 5–10 mcg/kg/min, respeitando pelo menos 5 min entre ajustes; manutenção habitual 5–50 mcg/kg/min.', ['propofol-label']),
  ],
  prescriptionExamples: [
    prescription('Sedação em ventilação mecânica', 'Propofol 10 mg/mL em perfusão IV contínua; iniciar 5 mcg/kg/min e titular ao alvo de sedação.', ['propofol-label'], 'Usar bomba volumétrica e protocolo local.', ['Não administrar bólus rápidos ao iniciar sedação em UCI.', 'Contabilizar a carga lipídica/calórica.']),
  ],
  routes: ['Intravenosa'],
  renalAdjustment: noRenalDoseAdjustment(['propofol-label'], ['Hemodinâmica', 'Triglicéridos', 'Equilíbrio ácido-base e CK quando suspeita de PRIS']),
  hepaticAdjustment: noHepaticDoseAdjustment(['propofol-label'], ['Resposta clínica e hemodinâmica'], 'Não existe tabela de ajuste; titular lentamente à resposta e usar doses menores em doentes debilitados.'),
  therapeuticDrugMonitoring: ['Escala de sedação (RASS/SAS) com alvo prescrito', 'PA, frequência cardíaca, ventilação e nível de consciência', 'Triglicéridos em perfusão prolongada', 'Lactato, CK, potássio, função renal e ECG se suspeita de síndrome de perfusão de propofol'],
  contraindications: ['Hipersensibilidade ao propofol ou componentes da emulsão', 'Ausência de capacidade para suporte de via aérea e reanimação'],
  interactions: ['Efeito aditivo com opióides, benzodiazepinas e outros depressores do SNC', 'Potencia hipotensão com vasodilatadores/anti-hipertensores'],
  practicalNotes: ['Definir alvo de sedação e realizar avaliação diária quando apropriado.', 'A técnica asséptica e o tempo máximo do sistema aberto dependem da apresentação; seguir rigorosamente o RCM local.', 'Vigiar síndrome de perfusão de propofol em doses elevadas ou exposição prolongada.'],
  references: [
    reference('propofol-label', 'Propofol Injectable Emulsion — official prescribing information', 'DailyMed / U.S. National Library of Medicine', 2025, 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=28d7ba00-f824-4e55-139a-03f509c099db'),
    reference('padis-2025', 'Focused Update to the PADIS Guidelines for Adult Patients', 'Society of Critical Care Medicine', 2025, 'https://www.sccm.org/clinical-resources/guidelines/guidelines/focused-update-padis-guideline'),
  ],
  ...reviewMetadata,
}

const rocuronium: Drug = {
  id: 'rocuronium',
  name: 'Rocurónio',
  aliases: ['rocuronium'],
  drugClass: 'Bloqueador neuromuscular não despolarizante',
  priority: 'P1',
  subcategories: ['Não despolarizantes — início rápido/intermédio'],
  categoryIds: ['neuromuscular-blockers'],
  indications: ['Facilitação de intubação traqueal', 'Bloqueio neuromuscular durante ventilação mecânica/procedimentos seleccionados'],
  usualAdultDose: [
    dose('Intubação traqueal', '0,6 mg/kg IV.', ['rocuronium-label']),
    dose('Sequência rápida', '0,6–1,2 mg/kg IV em doente adequadamente anestesiado.', ['rocuronium-label']),
    dose('Perfusão contínua', 'Iniciar 10–12 mcg/kg/min apenas após evidência inicial de recuperação; titular por monitorização neuromuscular.', ['rocuronium-label']),
  ],
  prescriptionExamples: [
    prescription('Sequência rápida — exemplo documental', 'Rocurónio 1,0 mg/kg IV em bólus, após indução adequada.', ['rocuronium-label'], 'A dose dentro do intervalo 0,6–1,2 mg/kg deve ser escolhida pelo operador.', ['Garantir sedação/anestesia, ventilação e plano de reversão/resgate.']),
  ],
  routes: ['Intravenosa'],
  loadingDose: dose('Dose de intubação', '0,6 mg/kg IV; na sequência rápida podem usar-se 0,6–1,2 mg/kg IV.', ['rocuronium-label']),
  renalAdjustment: {
    summary: 'O RCM permite a dose habitual, mas a duração é variável e pode prolongar-se; titular por TOF.',
    byKidneyFunction: [dose('Disfunção renal', 'Usar dose habitual inicial com monitorização neuromuscular; evitar redosagem automática.', ['rocuronium-smpc'])],
    intermittentHemodialysis: dose('Hemodiálise', 'Não existe regime dialítico específico; titular exclusivamente ao efeito e recuperação.', ['rocuronium-smpc']),
    continuousKidneyReplacement: dose('Técnicas contínuas', 'Não existe regime específico; usar TOF e reavaliar sedação e acumulação.', ['rocuronium-smpc']),
    monitoring: ['TOF quantitativo', 'Recuperação neuromuscular e ventilação', 'Sedação/analgesia contínuas enquanto houver bloqueio'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: {
    summary: 'A duração pode ser cerca de 1,5 vezes maior na doença hepática; não aumentar a dose inicial apenas para acelerar o início.',
    bySeverity: [dose('Doença hepática', 'Usar com cautela e titular por TOF; prever bloqueio prolongado.', ['rocuronium-smpc'])],
    monitoring: ['TOF quantitativo e tempo até recuperação'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: ['Monitorização neuromuscular quantitativa (TOF) e avaliação clínica de recuperação.'],
  contraindications: ['Hipersensibilidade ao rocurónio ou a outros bloqueadores neuromusculares'],
  interactions: ['Anestésicos inalatórios, magnésio, lítio, quinidina, procainamida e alguns antibióticos podem potenciar o bloqueio', 'Anticonvulsivantes crónicos podem reduzir o efeito'],
  practicalNotes: ['Bloqueio neuromuscular não produz sedação nem analgesia.', 'Medicamento de alto risco: armazenamento e rotulagem devem reduzir selecção acidental.', 'Assegurar ventilação, sedação, monitorização e estratégia de reversão.'],
  references: [
    reference('rocuronium-label', 'Rocuronium Bromide Injection — official drug label', 'DailyMed / U.S. National Library of Medicine', 2025, 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9a622308-7bda-4ca0-9de5-d6b3b4be3384'),
    reference('rocuronium-smpc', 'Rocuronium bromide 10 mg/mL solution for injection/infusion — SmPC', 'electronic medicines compendium', 2026, 'https://www.medicines.org.uk/emc/product/13173/smpc'),
  ],
  ...reviewMetadata,
}

const norepinephrine: Drug = {
  id: 'norepinephrine',
  name: 'Noradrenalina',
  aliases: ['norepinefrina', 'norepinephrine'],
  drugClass: 'Vasopressor catecolaminérgico',
  priority: 'P1',
  subcategories: ['Vasopressores de primeira linha'],
  categoryIds: ['vasopressors-inotropes', 'sepsis'],
  indications: ['Choque séptico', 'Hipotensão aguda grave com necessidade de vasopressor'],
  usualAdultDose: [
    dose('Rótulo oficial — início', '8–12 mcg/min em perfusão IV, com ajuste à resposta hemodinâmica.', ['norepinephrine-label']),
    dose('Choque séptico', 'Primeira linha; titular ao alvo individual de pressão arterial média. A SSC recomenda alvo inicial de 65 mmHg na maioria dos adultos.', ['ssc-2026']),
  ],
  prescriptionExamples: [
    prescription('Perfusão vasoactiva — exemplo documental', 'Noradrenalina em concentração padronizada da unidade; iniciar e titular continuamente ao alvo de PAM.', ['norepinephrine-label', 'ssc-2026'], 'A concentração e expressão em mcg/min ou mcg/kg/min têm de ser uniformes no protocolo local.', ['Não copiar uma concentração entre hospitais sem validação farmacêutica.']),
  ],
  routes: ['Intravenosa', 'Intraóssea em emergência até acesso definitivo — protocolo local'],
  renalAdjustment: noRenalDoseAdjustment(['norepinephrine-label'], ['PAM, perfusão periférica, lactato e diurese'], 'Não existe ajuste fixo por ClCr; titular ao efeito hemodinâmico.'),
  hepaticAdjustment: noHepaticDoseAdjustment(['norepinephrine-label'], ['PAM e sinais de hipoperfusão/isquemia'], 'Não existe ajuste fixo; titular ao efeito.'),
  therapeuticDrugMonitoring: ['Pressão arterial contínua quando possível', 'Perfusão periférica, enchimento capilar, lactato e diurese', 'Ritmo cardíaco e sinais de isquemia'],
  contraindications: ['Corrigir hipovolemia quando presente; em choque ameaçador não atrasar vasopressor enquanto decorre ressuscitação', 'Evitar extravasamento e perfusão em territórios com doença vascular oclusiva quando possível'],
  interactions: ['IMAO, antidepressivos tricíclicos e outros simpaticomiméticos podem potenciar resposta', 'Anestésicos halogenados podem aumentar risco arrítmico'],
  practicalNotes: ['Pode iniciar-se por acesso periférico proximal com vigilância frequente enquanto se obtém acesso definitivo.', 'Desmamar gradualmente; evitar interrupção abrupta.', 'Usar concentração padronizada e bomba com biblioteca de fármacos quando disponível.'],
  references: [
    reference('norepinephrine-label', 'Norepinephrine Bitartrate Injection — official prescribing information', 'DailyMed / U.S. National Library of Medicine', 2024, 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=fd398152-b428-4dca-8478-b691b909ee0e'),
    reference('ssc-2026', 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026', 'Society of Critical Care Medicine / ESICM', 2026, 'https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026'),
  ],
  ...reviewMetadata,
}

const amiodarone: Drug = {
  id: 'amiodarone',
  name: 'Amiodarona',
  aliases: ['amiodarone'],
  drugClass: 'Antiarrítmico classe III',
  priority: 'P1',
  subcategories: ['Taquicardia ventricular', 'Fibrilhação/flutter auricular'],
  categoryIds: ['antiarrhythmics', 'acute-cardiology'],
  indications: ['TV monomórfica estável seleccionada', 'FV/TV sem pulso refractária durante reanimação', 'Controlo de frequência em FA rápida no doente crítico seleccionado'],
  usualAdultDose: [
    dose('TV com pulso / carga IV', '150 mg IV em 10 min; seguir com 1 mg/min durante 6 h e depois 0,5 mg/min.', ['amiodarone-label', 'aha-tachycardia']),
    dose('FV/TV sem pulso refractária', '300 mg IV/IO em bólus; pode repetir 150 mg.', ['aha-cardiac-arrest']),
  ],
  prescriptionExamples: [
    prescription('TV recorrente — esquema das primeiras 24 h', 'Amiodarona 150 mg em 100 mL de glicose 5% em 10 min; depois 1 mg/min por 6 h e 0,5 mg/min.', ['amiodarone-label'], 'Monitorização contínua; o total inicial é cerca de 1000 mg/24 h.', ['Usar bomba volumétrica; via central e filtro em linha quando aplicável à concentração/duração.']),
  ],
  routes: ['Intravenosa', 'Intraóssea durante reanimação', 'Oral'],
  loadingDose: dose('TV/FV com pulso', '150 mg IV em 100 mL de glicose 5% durante 10 min.', ['amiodarone-label']),
  renalAdjustment: noRenalDoseAdjustment(['amiodarone-label'], ['ECG, QTc, PA e frequência cardíaca'], 'A doença renal não altera de forma relevante a farmacocinética; amiodarona e metabolito não são dialisáveis.'),
  hepaticAdjustment: {
    summary: 'Não existe ajuste quantitativo definido; interromper/reduzir perante lesão hepática e monitorizar de perto.',
    bySeverity: [dose('Disfunção hepática', 'Sem dose tabelada; usar com monitorização estreita e reavaliar se transaminases subirem.', ['amiodarone-label'])],
    monitoring: ['AST/ALT e bilirrubina', 'Sinais de hepatotoxicidade aguda, especialmente com infusão rápida'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: ['ECG contínuo, QTc, frequência e bloqueio AV', 'PA durante carga', 'K e Mg', 'Função hepática; tiroide e pulmão se exposição prolongada'],
  contraindications: ['Choque cardiogénico', 'Bradicardia sinusal marcada', 'Bloqueio AV de 2.º/3.º grau sem pacemaker funcionante', 'Hipersensibilidade à amiodarona/iodo'],
  interactions: ['Outros fármacos que prolongam QT', 'Inibe P-gp e múltiplos CYP: aumenta exposição a digoxina, varfarina e vários outros', 'Bradicardia aditiva com betabloqueantes e bloqueadores dos canais de cálcio'],
  practicalNotes: ['Corrigir K e Mg antes/durante tratamento quando possível.', 'A hipotensão relaciona-se com a velocidade de infusão; abrandar se necessário.', 'Não usar amiodarona IV em FA pré-excitada.'],
  references: [
    reference('amiodarone-label', 'Amiodarone Hydrochloride Injection — official prescribing information', 'DailyMed / U.S. National Library of Medicine', 2025, 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3a53668c-adda-44c2-a743-e79e467437e3'),
    reference('aha-tachycardia', 'Adult Tachycardia With a Pulse Algorithm', 'American Heart Association', 2025, 'https://www.heart.org/en/-/media/CPR-Files/CPR-Guidelines-Files/Algorithms/AlgorithmACLS_Tachycardia_200612.pdf'),
    reference('aha-cardiac-arrest', 'Adult Cardiac Arrest Algorithm', 'American Heart Association', 2025, 'https://cpr.heart.org/en/-/media/CPR-Files/CPR-Guidelines-Files/Algorithms/AlgorithmACLS_CA_200402.pdf'),
  ],
  ...reviewMetadata,
}

const enoxaparin: Drug = {
  id: 'enoxaparin',
  name: 'Enoxaparina',
  aliases: ['enoxaparin', 'HBPM', 'LMWH'],
  drugClass: 'Heparina de baixo peso molecular',
  priority: 'P1',
  subcategories: ['Heparinas'],
  categoryIds: ['antithrombotics', 'renal-dialysis'],
  indications: ['Tromboprofilaxia no doente médico agudo imobilizado', 'Tratamento de TVP/TEP', 'Síndromes coronárias agudas em esquemas específicos'],
  usualAdultDose: [
    dose('Tromboprofilaxia médica', '4000 UI anti-Xa (40 mg) SC de 24/24 h.', ['enoxaparin-eu-smpc']),
    dose('Tratamento de TVP/TEP', '100 UI/kg (1 mg/kg) SC de 12/12 h ou 150 UI/kg (1,5 mg/kg) SC de 24/24 h, conforme risco de recorrência/hemorragia.', ['enoxaparin-eu-smpc']),
  ],
  prescriptionExamples: [
    prescription('Tromboprofilaxia médica', 'Enoxaparina 4000 UI anti-Xa (40 mg) SC de 24/24 h.', ['enoxaparin-eu-smpc'], 'Função renal ≥30 mL/min; confirmar peso, hemorragia e procedimentos neuraxiais.'),
  ],
  routes: ['Subcutânea', 'Intravenosa apenas em indicações específicas'],
  renalAdjustment: {
    summary: 'O RCM europeu difere do rótulo norte-americano. Para Portugal, usar o esquema europeu e confirmar o RCM da apresentação local.',
    byKidneyFunction: [
      dose('ClCr 30–80 mL/min', 'Sem redução formal; vigilância clínica cuidadosa.', ['enoxaparin-eu-smpc']),
      dose('ClCr 15–30 mL/min — profilaxia', '2000 UI anti-Xa (20 mg) SC de 24/24 h.', ['enoxaparin-eu-smpc']),
      dose('ClCr 15–30 mL/min — tratamento', '100 UI/kg (1 mg/kg) SC de 24/24 h.', ['enoxaparin-eu-smpc']),
      dose('ClCr <15 mL/min', 'Não recomendada para anticoagulação sistémica fora da prevenção de trombo no circuito de HD.', ['enoxaparin-eu-smpc']),
    ],
    intermittentHemodialysis: dose('Anticoagulação do circuito de HD', 'Indicação e dose próprias do circuito; não extrapolar a dose de profilaxia/tratamento sistémico.', ['enoxaparin-eu-smpc']),
    continuousKidneyReplacement: dose('TSR contínua', 'Não existe um regime sistémico universal; preferir protocolo específico da técnica e monitorização local.', ['enoxaparin-eu-smpc']),
    monitoring: ['Hemograma e plaquetas', 'Sinais de hemorragia', 'Creatinina/ClCr', 'Anti-Xa apenas em situações seleccionadas segundo protocolo'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: {
    summary: 'Dados limitados; usar com cautela pelo risco hemorrágico aumentado.',
    bySeverity: [dose('Disfunção hepática', 'Sem dose de redução estabelecida; avaliar hemostase e risco hemorrágico.', ['enoxaparin-eu-smpc'])],
    monitoring: ['Hemorragia, plaquetas, Hb e função hepática/coagulação conforme contexto'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: ['Hemograma/plaquetas e função renal', 'Anti-Xa em situações seleccionadas; não usar isoladamente para avaliar hemostase na cirrose'],
  contraindications: ['Hemorragia activa clinicamente significativa', 'Trombocitopenia induzida por heparina imune recente/activa', 'Hipersensibilidade a enoxaparina/heparinas', 'Procedimentos neuraxiais exigem intervalos rigorosos'],
  interactions: ['Anticoagulantes, antiagregantes, AINE e fibrinolíticos aumentam hemorragia', 'Fármacos que aumentam potássio podem agravar hipercaliemia associada à heparina'],
  practicalNotes: ['Usar unidades anti-Xa e mg para reduzir erros.', 'Não administrar IM.', 'O esquema renal europeu de profilaxia é 20 mg/dia; não importar automaticamente a dose norte-americana de 30 mg/dia.'],
  references: [
    reference('enoxaparin-eu-smpc', 'Clexane Multidose Vial — Summary of Product Characteristics', 'electronic medicines compendium / harmonised EU product information', 2026, 'https://www.medicines.org.uk/emc/product/4498/smpc'),
    reference('enoxaparin-infarmed', 'Enoxaparina — anexos de informação do medicamento', 'INFARMED', 2026, 'https://www.infarmed.pt/documents/15786/1886316/anexo%2Blovenox/5ea9614d-fd16-4f29-80db-c2c9cafc630e?version=1.0'),
  ],
  ...reviewMetadata,
}

const furosemide: Drug = {
  id: 'furosemide',
  name: 'Furosemida',
  aliases: ['furosemide'],
  drugClass: 'Diurético da ansa',
  priority: 'P1',
  subcategories: ['Diuréticos de ansa'],
  categoryIds: ['diuretics', 'renal-dialysis', 'acute-cardiology'],
  indications: ['Edema/congestão associado a insuficiência cardíaca, cirrose ou doença renal', 'Edema agudo do pulmão como terapêutica adjuvante'],
  usualAdultDose: [
    dose('Edema', '20–40 mg IV/IM como dose inicial; pode repetir ou aumentar em 20 mg após pelo menos 2 h, conforme resposta.', ['furosemide-label']),
    dose('Edema agudo do pulmão', '40 mg IV lentamente; se resposta insuficiente em 1 h, 80 mg IV lentamente.', ['furosemide-label']),
  ],
  prescriptionExamples: [
    prescription('Congestão — dose inicial', 'Furosemida 40 mg IV lentamente; reavaliar diurese, congestão e perfusão antes de nova dose.', ['furosemide-label']),
    prescription('Dose elevada por perfusão', 'Furosemida IV por bomba, sem exceder 4 mg/min.', ['furosemide-label'], 'A dose total e diluente dependem do protocolo e da resposta.', ['Confirmar pH/compatibilidade; soluções ácidas podem precipitar furosemida.']),
  ],
  routes: ['Intravenosa', 'Intramuscular', 'Oral'],
  renalAdjustment: {
    summary: 'Não há tabela de redução: a doença renal pode exigir doses maiores para efeito, mas aumenta toxicidade. Titular por resposta e parar perante azotemia/oligúria progressivas.',
    byKidneyFunction: [dose('Doença renal com sobrecarga', 'Individualizar a dose e o intervalo pela resposta diurética, volume e electrólitos; não usar como tratamento da lesão renal sem congestão.', ['furosemide-label'])],
    intermittentHemodialysis: dose('Hemodiálise', 'A HD não acelera a eliminação; usar apenas se houver função renal residual e indicação clínica.', ['furosemide-label']),
    continuousKidneyReplacement: dose('TSR contínua', 'Não existe dose universal; avaliar função renal residual, balanço e objectivo clínico.', ['furosemide-label']),
    monitoring: ['Diurese horária, peso e balanço', 'Na, K, Mg, bicarbonato, ureia e creatinina', 'PA e perfusão', 'Audição em doses elevadas/rápidas'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: {
    summary: 'Na cirrose/ascite iniciar com doses pequenas e monitorização apertada, porque alterações rápidas podem precipitar encefalopatia.',
    bySeverity: [dose('Cirrose com ascite', 'Iniciar em ambiente monitorizado e titular lentamente; não existe uma redução fixa.', ['furosemide-label'])],
    monitoring: ['Estado mental, Na, K, função renal e balanço'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: ['Resposta diurética nas primeiras horas, balanço, peso, electrólitos e função renal.'],
  contraindications: ['Anúria', 'Hipersensibilidade à furosemida'],
  interactions: ['Aminoglicosídeos, cisplatina e outros ototóxicos aumentam risco de ototoxicidade', 'AINE podem reduzir efeito e piorar função renal', 'Aumenta risco de toxicidade por lítio', 'Pode potenciar hipotensão com inibidores do SRAA'],
  practicalNotes: ['Evitar administração rápida; em dose elevada não exceder 4 mg/min.', 'Definir previamente a resposta esperada e o momento de escalada/bloqueio sequencial.', 'Corrigir K e Mg e reavaliar perfusão se a diurese aumentar rapidamente.'],
  references: [
    reference('furosemide-label', 'Furosemide Injection — official prescribing information', 'DailyMed / U.S. National Library of Medicine', 2026, 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=8e0bac29-5a8b-4d4e-93b3-2e21eb3b0650&version=16'),
  ],
  ...reviewMetadata,
}

const potassiumChloride: Drug = {
  id: 'potassium-chloride',
  name: 'Cloreto de potássio',
  aliases: ['KCl', 'potassium chloride'],
  drugClass: 'Electrólito concentrado de alto risco',
  priority: 'P1',
  subcategories: ['Potássio', 'Hipocaliemia'],
  categoryIds: ['electrolytes-metabolic', 'renal-dialysis'],
  indications: ['Hipocaliemia quando reposição IV é necessária'],
  usualAdultDose: [
    dose('K sérico >2,5 mEq/L', 'Velocidade habitualmente não superior a 10 mEq/h; concentração até 40 mEq/L; máximo 200 mEq/24 h segundo o rótulo consultado.', ['kcl-label']),
    dose('Hipocaliemia extrema com K <2 mEq/L e alterações ECG/paralisia', 'Pode ser necessário até 40 mEq/h, exclusivamente com monitorização ECG contínua e determinações frequentes de K; máximo 400 mEq/24 h no rótulo consultado.', ['kcl-label'], ['Usar apenas em contexto crítico e segundo protocolo institucional.']),
  ],
  prescriptionExamples: [
    prescription('Reposição padrão — exemplo documental', 'KCl 40 mEq diluído em 1000 mL de NaCl 0,9%, perfundir a 10 mEq/h.', ['kcl-label'], 'Exemplo do rótulo para K >2,5 mEq/L.', ['A concentração periférica/central e o volume têm de ser ajustados ao protocolo local e à restrição hídrica.']),
  ],
  routes: ['Intravenosa após diluição', 'Oral/entérica quando apropriado'],
  renalAdjustment: {
    summary: 'Não existe dose automática por ClCr. A reposição depende do défice, perdas, diurese, acidose e TSR; o risco de hipercaliemia aumenta na oligúria/anúria.',
    byKidneyFunction: [dose('DRC ou oligúria', 'Usar doses menores e reavaliações mais frequentes; não repetir sem novo K e avaliação do débito urinário.', ['kcl-label'])],
    intermittentHemodialysis: dose('Hemodiálise', 'Corrigir com base no K pré/pós-HD, banho de diálise e perdas; não existe esquema IV universal.', ['kcl-label']),
    continuousKidneyReplacement: dose('TSR contínua', 'Integrar K do dialisante/reposição, dose de efluente e perdas; usar protocolo específico da técnica.', ['kcl-label']),
    monitoring: ['K sérico seriado', 'ECG nas velocidades elevadas', 'Mg, função renal e diurese', 'Equilíbrio ácido-base'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: noHepaticDoseAdjustment(['kcl-label'], ['K, função renal e equilíbrio ácido-base'], 'Sem ajuste hepático específico; a função renal e as perdas determinam a reposição.'),
  therapeuticDrugMonitoring: ['K sérico e ECG; repetir dose apenas após avaliar resposta e redistribuição.'],
  contraindications: ['Hipercaliemia', 'Administração IV sem diluição', 'Situações de retenção marcada de potássio sem capacidade de monitorização'],
  interactions: ['IECA/ARA, antagonistas da aldosterona, trimetoprim e outros fármacos hipercaliemiantes', 'Soluções com dextrose podem reduzir transitoriamente K sérico por libertação de insulina'],
  practicalNotes: ['KCl concentrado é medicamento de alto risco: nunca administrar IV directo.', 'Usar bomba e misturar completamente a solução.', 'Corrigir hipomagnesemia concomitante quando presente.'],
  references: [
    reference('kcl-label', 'Potassium Chloride for Injection Concentrate — official drug label', 'DailyMed / U.S. National Library of Medicine', 2026, 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bf8e8ac7-e6a8-4571-a0ea-7bcab89290f6'),
  ],
  ...reviewMetadata,
}

const fomepizole: Drug = {
  id: 'fomepizole',
  name: 'Fomepizol',
  aliases: ['fomepizole', '4-metilpirazol'],
  drugClass: 'Antídoto inibidor da álcool-desidrogenase',
  priority: 'P1',
  subcategories: ['Álcoois tóxicos'],
  categoryIds: ['antidotes-toxicology', 'renal-dialysis'],
  indications: ['Intoxicação suspeita ou confirmada por metanol', 'Intoxicação suspeita ou confirmada por etilenoglicol'],
  usualAdultDose: [
    dose('Tratamento', '15 mg/kg IV de carga; depois 10 mg/kg de 12/12 h por 4 doses; subsequentemente 15 mg/kg de 12/12 h até critérios de suspensão.', ['fomepizole-label']),
  ],
  prescriptionExamples: [
    prescription('Dose de carga', 'Fomepizol 15 mg/kg diluído em pelo menos 100 mL de NaCl 0,9% ou glucose 5%; perfundir em 30 min.', ['fomepizole-label']),
  ],
  routes: ['Intravenosa'],
  loadingDose: dose('Carga inicial', '15 mg/kg IV em 30 min.', ['fomepizole-label']),
  renalAdjustment: {
    summary: 'Não reduzir por insuficiência renal; a HD remove fomepizol e exige encurtar o intervalo.',
    byKidneyFunction: [dose('Sem hemodiálise', 'Manter o regime padrão; considerar HD pela toxicidade/acidose, não para ajustar fomepizol isoladamente.', ['fomepizole-label'])],
    intermittentHemodialysis: dose('Durante hemodiálise', 'Administrar de 4/4 h durante HD. No fim: <1 h desde a última dose, não dar; 1–3 h, dar metade; >3 h, dar a dose seguinte.', ['fomepizole-label']),
    continuousKidneyReplacement: dose('Técnicas contínuas', 'O rótulo não estabelece regime; contactar toxicologia/farmácia e individualizar pela depuração extracorporal.', ['fomepizole-label']),
    monitoring: ['Gasimetria, anion gap, osmolar gap', 'Nível de metanol/etilenoglicol quando disponível', 'Função renal, electrólitos e estado visual/neurológico'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: noHepaticDoseAdjustment(['fomepizole-label'], ['Função hepática e resposta toxicológica'], 'Não existe recomendação quantitativa específica no rótulo; discutir com toxicologia.'),
  therapeuticDrugMonitoring: ['Monitorizar tóxico e parâmetros metabólicos; níveis de fomepizol não são rotina.'],
  contraindications: ['Hipersensibilidade ao fomepizol ou outros pirazóis'],
  interactions: ['Etanol altera a cinética de ambos; a co-administração exige supervisão toxicológica'],
  practicalNotes: ['Iniciar com base na suspeita clínica; não esperar pelo nível quando a probabilidade é elevada.', 'A indicação de HD depende de acidose, função renal, manifestações e concentração do tóxico.', 'Usar seringa/agulha compatível com o produto e confirmar instruções da apresentação local.'],
  references: [
    reference('fomepizole-label', 'Fomepizole Injection — official drug label', 'DailyMed / U.S. National Library of Medicine', 2025, 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=911312e2-3a7c-4c97-88a8-b8d92cd12923'),
  ],
  ...reviewMetadata,
}

const pantoprazole: Drug = {
  id: 'pantoprazole',
  name: 'Pantoprazol',
  aliases: ['pantoprazole'],
  drugClass: 'Inibidor da bomba de protões',
  priority: 'P1',
  subcategories: ['Inibidores da bomba de protões'],
  categoryIds: ['gastrointestinal'],
  indications: ['Hemorragia digestiva alta não varicosa após hemostase endoscópica de lesão de alto risco', 'Profilaxia de úlcera de stress apenas quando indicada', 'Úlcera/refluxo quando via oral não é apropriada'],
  usualAdultDose: [
    dose('HDA não varicosa — pós-hemostase de alto risco', '80 mg IV em bólus, seguido de 8 mg/h por 72 h; regimes intermitentes de alta dose são alternativa em guidelines.', ['esge-nvugih']),
    dose('Úlcera/refluxo — indicação do RCM', '40 mg IV de 24/24 h; mudar para via oral logo que possível.', ['pantoprazole-smpc']),
  ],
  prescriptionExamples: [
    prescription('HDA não varicosa — pós-endoscopia', 'Pantoprazol 80 mg IV, depois 8 mg/h em perfusão contínua durante 72 h.', ['esge-nvugih'], 'Para estigmas de alto risco após hemostase endoscópica; não aplicar automaticamente a toda a HDA.'),
    prescription('Dose diária IV', 'Pantoprazol 40 mg IV de 24/24 h; reconstituir e administrar em 2–15 min conforme RCM.', ['pantoprazole-smpc']),
  ],
  routes: ['Intravenosa', 'Oral'],
  loadingDose: dose('HDA não varicosa de alto risco', '80 mg IV antes da perfusão de 8 mg/h.', ['esge-nvugih']),
  renalAdjustment: {
    summary: 'Não é necessário ajuste, incluindo doentes em diálise; apenas pequenas quantidades são dialisadas.',
    byKidneyFunction: [dose('Disfunção renal', 'Sem ajuste posológico.', ['pantoprazole-smpc'])],
    intermittentHemodialysis: dose('Hemodiálise', 'Sem suplemento pós-HD.', ['pantoprazole-smpc']),
    continuousKidneyReplacement: dose('Técnicas contínuas', 'Sem ajuste específico previsto no RCM.', ['pantoprazole-smpc']),
    monitoring: ['Indicação e duração', 'Mg se tratamento prolongado ou factores de risco'],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: {
    summary: 'Na insuficiência hepática grave não exceder 20 mg/dia e monitorizar enzimas hepáticas.',
    bySeverity: [dose('Insuficiência hepática grave', 'Máximo 20 mg IV de 24/24 h.', ['pantoprazole-smpc'])],
    monitoring: ['AST/ALT; interromper se houver elevação relacionada'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: ['Não requer TDM; monitorizar indicação, hemorragia/rebleeding e eventos adversos.'],
  contraindications: ['Hipersensibilidade a pantoprazol ou benzimidazóis substituídos'],
  interactions: ['Reduz absorção de fármacos dependentes de pH, incluindo alguns inibidores da protease', 'Pode aumentar risco de hipomagnesemia em tratamentos prolongados'],
  practicalNotes: ['Na HDA, distinguir período pré-endoscópico de terapêutica pós-hemostase.', 'Não manter profilaxia de stress sem reavaliar diariamente factores de risco.', 'Mudar para via oral logo que apropriado.'],
  references: [
    reference('pantoprazole-smpc', 'Pantoprazole 40 mg powder for solution for injection — SmPC', 'electronic medicines compendium', 2026, 'https://www.medicines.org.uk/emc/product/11068/smpc'),
    reference('esge-nvugih', 'Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage — Update 2021', 'European Society of Gastrointestinal Endoscopy', 2021, 'https://www.esge.com/endoscopic-diagnosis-and-management-of-nonvariceal-upper-gastrointestinal-hemorrhage-esge-update-2021'),
    reference('ssc-2026', 'Surviving Sepsis Campaign Adult Guidelines 2026', 'Society of Critical Care Medicine / ESICM', 2026, 'https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026'),
  ],
  ...reviewMetadata,
}

const hydrocortisone: Drug = {
  id: 'hydrocortisone',
  name: 'Hidrocortisona',
  aliases: ['hydrocortisone', 'hydrocortisone sodium succinate'],
  drugClass: 'Corticosteróide com actividade glucocorticóide e mineralocorticóide',
  priority: 'P1',
  subcategories: ['Corticóides sistémicos', 'Crise adrenal'],
  categoryIds: ['endocrine-corticosteroids', 'sepsis'],
  indications: ['Choque séptico com necessidade persistente de vasopressores', 'Crise adrenal/insuficiência suprarrenal aguda', 'Outras indicações inflamatórias seleccionadas'],
  usualAdultDose: [
    dose('Choque séptico', '200 mg/dia IV, habitualmente 50 mg de 6/6 h ou perfusão contínua, segundo protocolo.', ['ssc-2021-dose', 'ssc-2026']),
    dose('Crise adrenal', '100 mg IV/IM imediatamente, seguido de 200 mg/24 h; confirmar protocolo endocrinológico local.', ['endocrine-emergency-guidance']),
  ],
  prescriptionExamples: [
    prescription('Choque séptico', 'Hidrocortisona 50 mg IV de 6/6 h (total 200 mg/dia).', ['ssc-2021-dose', 'ssc-2026'], 'Usar quando persiste necessidade de vasopressores; reavaliar desmame.'),
  ],
  routes: ['Intravenosa', 'Intramuscular', 'Oral'],
  loadingDose: dose('Crise adrenal', '100 mg IV ou IM imediatamente.', ['endocrine-emergency-guidance']),
  renalAdjustment: noRenalDoseAdjustment(['hydrocortisone-label'], ['Glicemia, Na, K, balanço e PA'], 'Sem ajuste renal específico; titular à indicação e resposta.'),
  hepaticAdjustment: noHepaticDoseAdjustment(['hydrocortisone-label'], ['Glicemia, infecção e resposta clínica'], 'Sem ajuste quantitativo no RCM consultado; usar a menor duração eficaz.'),
  therapeuticDrugMonitoring: ['Glicemia, Na, K, PA e balanço', 'Sinais de infecção e fraqueza neuromuscular', 'Necessidade de vasopressor e plano de desmame'],
  contraindications: ['Hipersensibilidade', 'Infecção fúngica sistémica é contra-indicação relativa/forte salvo necessidade vital específica'],
  interactions: ['Indutores/inibidores de CYP3A podem alterar exposição', 'Hipocaliemia com diuréticos e anfotericina', 'Hiperglicemia e maior necessidade de insulina'],
  practicalNotes: ['Não atrasar tratamento de crise adrenal por testes laboratoriais.', 'No choque séptico, documentar indicação e plano de suspensão/desmame.', 'Vigiar hiperglicemia, delirium, fraqueza e infecção secundária.'],
  references: [
    reference('hydrocortisone-label', 'Hydrocortisone Sodium Succinate for Injection — official drug label', 'DailyMed / U.S. National Library of Medicine', 2026, 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=37534164-9de5-4bb3-9f87-341dfcf90883&type=display'),
    reference('ssc-2026', 'Surviving Sepsis Campaign: International Guidelines 2026', 'Society of Critical Care Medicine / ESICM', 2026, 'https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026'),
    reference('ssc-2021-dose', 'Surviving Sepsis Campaign International Guidelines 2021', 'Society of Critical Care Medicine / ESICM', 2021, 'https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-guidelines-2021'),
    reference('endocrine-emergency-guidance', 'Adrenal crisis — clinical practice guidance', 'Society for Endocrinology', 2026, 'https://www.endocrinology.org/adrenal-crisis'),
  ],
  ...reviewMetadata,
}

export const reviewedDrugs: Drug[] = [
  meropenem,
  fluconazole,
  acyclovir,
  levetiracetam,
  propofol,
  rocuronium,
  norepinephrine,
  amiodarone,
  enoxaparin,
  furosemide,
  potassiumChloride,
  fomepizole,
  pantoprazole,
  hydrocortisone,
]

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
    'Revisão documental concluída com RCM/SmPC e/ou rótulo oficial.',
    'Confirmar formulação, concentração padronizada e protocolo da instituição antes da utilização assistencial.',
    'A dose deve ser titulada ao alvo clínico e à função orgânica dinâmica; a calculadora apenas efectua conversões matemáticas.',
  ],
}

const epinephrine: Drug = {
  id: 'adrenalina',
  name: 'Adrenalina',
  aliases: ['epinefrina', 'epinephrine'],
  drugClass: 'Catecolamina vasopressora e inotrópica',
  priority: 'P1',
  subcategories: ['Vasopressores de primeira linha', 'Anafilaxia'],
  categoryIds: ['vasopressors-inotropes', 'sepsis', 'respiratory-pulmonary'],
  indications: ['Hipotensão associada a choque séptico', 'Anafilaxia'],
  usualAdultDose: [
    dose('Choque séptico', '0,05–2 mcg/kg/min IV, titulada ao alvo de pressão arterial média; desmamar gradualmente após estabilização.', ['epinephrine-label']),
    dose('Anafilaxia', '0,3–0,5 mg IM na face anterolateral da coxa; pode repetir de 5/5 a 10/10 min conforme resposta.', ['epinephrine-label']),
  ],
  prescriptionExamples: [
    prescription('Choque séptico — perfusão', 'Adrenalina IV em concentração padronizada da unidade; iniciar 0,05 mcg/kg/min e titular ao alvo hemodinâmico.', ['epinephrine-label'], 'O rótulo permite titulação até 2 mcg/kg/min; a escolha e escalada dependem do contexto clínico.', ['Não confundir apresentações de 0,1 mg/mL, 1 mg/mL e bolsas pré-misturadas.']),
    prescription('Anafilaxia — adulto', 'Adrenalina 0,3–0,5 mg IM na coxa; repetir após 5–10 min se necessário.', ['epinephrine-label']),
  ],
  routes: ['Intravenosa em perfusão', 'Intramuscular'],
  renalAdjustment: noRenalDoseAdjustment(
    ['epinephrine-label'],
    ['Diurese, creatinina, perfusão periférica e lactato'],
    'Não existe tabela de ajuste renal; titular ao efeito. A vasoconstrição renal pode reduzir a diurese e agravar disfunção renal.',
  ),
  hepaticAdjustment: noHepaticDoseAdjustment(
    ['epinephrine-label'],
    ['Resposta hemodinâmica e lactato'],
    'Não existe ajuste quantitativo por disfunção hepática no rótulo consultado; titular à resposta.',
  ),
  therapeuticDrugMonitoring: ['Pressão arterial e ritmo contínuos', 'Perfusão periférica, lactato e diurese', 'Glicemia e potássio'],
  contraindications: ['O rótulo de utilização no choque não apresenta contra-indicações absolutas; não atrasar uma emergência vital por sensibilidade a sulfito sem alternativa adequada'],
  interactions: ['IMAO, antidepressivos tricíclicos, levotiroxina e alguns anti-histamínicos podem potenciar os efeitos', 'Betabloqueantes e alfabloqueantes antagonizam componentes da resposta', 'Anestésicos halogenados e outros fármacos podem aumentar risco arrítmico'],
  practicalNotes: ['Usar nomenclatura e concentração uniformes em toda a unidade.', 'Vigiar extravasamento, isquemia, taquiarritmia e aumento do lactato.', 'Na anafilaxia, a via IM na coxa é a via inicial; a perfusão IV pertence a contexto refractário monitorizado.'],
  references: [
    reference('epinephrine-label', 'Epinephrine Injection — official prescribing information', 'DailyMed / U.S. National Library of Medicine', 2025, 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=cc4ebb51-6020-4339-a36a-ec2380b7d28e'),
    reference('epinephrine-premix-label', 'Epinephrine in Sodium Chloride Injection — official prescribing information', 'DailyMed / U.S. National Library of Medicine', 2026, 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=60efd409-3555-4182-a68d-1cd7bc0d1bfc&version=9'),
  ],
  ...reviewMetadata,
}

const dexmedetomidine: Drug = {
  id: 'dexmedetomidina',
  name: 'Dexmedetomidina',
  aliases: ['dexmedetomidine'],
  drugClass: 'Agonista alfa-2 adrenérgico sedativo',
  priority: 'P1',
  subcategories: ['Sedativos principais'],
  categoryIds: ['sedation-analgesia'],
  indications: ['Sedação ligeira a moderada no adulto em UCI, com alvo não mais profundo do que resposta à voz (RASS 0 a −3)'],
  usualAdultDose: [
    dose('Sedação em UCI', 'Iniciar habitualmente a 0,7 mcg/kg/h e titular entre 0,2 e 1,4 mcg/kg/h ao alvo de sedação; considerar início mais baixo no doente frágil.', ['dexmedetomidine-smpc']),
  ],
  prescriptionExamples: [
    prescription('Sedação em UCI', 'Dexmedetomidina 0,7 mcg/kg/h IV; titular entre 0,2–1,4 mcg/kg/h ao RASS prescrito.', ['dexmedetomidine-smpc'], 'A concentração final documentada no RCM é 4 ou 8 mcg/mL.', ['Não administrar dose de carga para sedação em UCI.']),
  ],
  routes: ['Intravenosa em perfusão contínua'],
  renalAdjustment: noRenalDoseAdjustment(
    ['dexmedetomidine-smpc'],
    ['RASS, PA, frequência cardíaca e perfusão'],
    'Não é necessário ajuste por disfunção renal; a farmacocinética não se altera de forma relevante mesmo com ClCr <30 mL/min.',
  ),
  hepaticAdjustment: {
    summary: 'A depuração diminui com a gravidade da disfunção hepática; considerar dose inicial e/ou manutenção mais baixas.',
    bySeverity: [dose('Disfunção hepática', 'Reduzir a dose conforme a gravidade e titular lentamente à resposta clínica.', ['dexmedetomidine-smpc'])],
    monitoring: ['RASS, duração do efeito, PA e frequência cardíaca'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: ['RASS e avaliação de dor', 'ECG/frequência cardíaca e pressão arterial contínuos', 'Ventilação e oxigenação, sobretudo sem via aérea protegida'],
  contraindications: ['Bloqueio AV de 2.º/3.º grau sem pacemaker', 'Hipotensão não controlada', 'Condição cerebrovascular aguda', 'Hipersensibilidade'],
  interactions: ['Sedativos, anestésicos, hipnóticos e opióides potenciam sedação e efeitos cardiorrespiratórios', 'Betabloqueantes e outros bradicardizantes/hipotensores podem potenciar bradicardia e hipotensão'],
  practicalNotes: ['Não usar dose de carga na sedação em UCI.', 'Não exceder 1,4 mcg/kg/h; se insuficiente, mudar de estratégia sedativa.', 'Pode facilitar sedação cooperativa e extubação, mas não substitui analgesia.', 'Evitar suspensão abrupta após uso prolongado e vigiar febre inexplicada, poliúria e hipernatremia.'],
  references: [
    reference('dexmedetomidine-smpc', 'Dexmedetomidine 100 micrograms/mL concentrate for solution for infusion — SmPC', 'electronic medicines compendium', 2026, 'https://www.medicines.org.uk/emc/product/13154/smpc'),
  ],
  ...reviewMetadata,
}

const dobutamine: Drug = {
  id: 'dobutamina',
  name: 'Dobutamina',
  aliases: ['dobutamine'],
  drugClass: 'Inotrópico beta-adrenérgico',
  priority: 'P1',
  subcategories: ['Inotrópicos', 'Insuficiência cardíaca aguda'],
  categoryIds: ['vasopressors-inotropes', 'acute-cardiology'],
  indications: ['Suporte inotrópico em baixo débito por contractilidade deprimida', 'Choque cardiogénico seleccionado após optimização da pré-carga e pressão de perfusão'],
  usualAdultDose: [
    dose('Suporte inotrópico', '2,5–10 mcg/kg/min IV na maioria dos adultos, titulada à resposta; em casos individuais foram administradas doses até 40 mcg/kg/min.', ['dobutamine-smpc']),
  ],
  prescriptionExamples: [
    prescription('Perfusão inotrópica', 'Dobutamina 5 mcg/kg/min IV; titular ao débito/perfusão e tolerância.', ['dobutamine-smpc'], 'A apresentação documentada contém 250 mg/50 mL (5 mg/mL) e pode ser administrada por bomba.', ['Corrigir hipovolemia e excluir obstrução mecânica antes de iniciar.']),
  ],
  routes: ['Intravenosa em perfusão contínua'],
  renalAdjustment: noRenalDoseAdjustment(
    ['dobutamine-smpc'],
    ['Diurese, creatinina, perfusão, frequência e ritmo'],
    'Não existe ajuste quantitativo por ClCr; titular ao efeito. Foram descritas mioclonias em insuficiência renal grave.',
  ),
  hepaticAdjustment: noHepaticDoseAdjustment(
    ['dobutamine-smpc'],
    ['Resposta hemodinâmica, frequência e ritmo'],
    'Não existe ajuste quantitativo por disfunção hepática no RCM consultado; titular à resposta.',
  ),
  therapeuticDrugMonitoring: ['ECG, frequência e pressão arterial contínuos', 'Perfusão, diurese e lactato', 'Débito cardíaco e pressões de enchimento quando disponíveis', 'Potássio e glicemia'],
  contraindications: ['Obstrução mecânica ao enchimento ou ejecção ventricular', 'Hipovolemia não corrigida', 'Feocromocitoma', 'Hipersensibilidade, incluindo ao metabissulfito da apresentação'],
  interactions: ['Betabloqueantes reduzem o efeito beta e podem revelar vasoconstrição alfa', 'Vasodilatadores podem potenciar aumento do débito e redução das pressões de enchimento', 'Pode aumentar a necessidade de insulina'],
  practicalNotes: ['A taquicardia e ectopia ventricular são sinais frequentes de dose excessiva.', 'Desmamar gradualmente; pode ocorrer tolerância após mais de 72 h.', 'É incompatível com bicarbonato e soluções fortemente alcalinas.'],
  references: [
    reference('dobutamine-smpc', 'Dobutamine 5 mg/mL solution for infusion — SmPC', 'electronic medicines compendium', 2024, 'https://www.medicines.org.uk/emc/product/6462/smpc'),
  ],
  ...reviewMetadata,
}

const vasopressin: Drug = {
  id: 'vasopressina',
  name: 'Vasopressina',
  aliases: ['vasopressin', 'arginina vasopressina'],
  drugClass: 'Vasopressor não catecolaminérgico',
  priority: 'P1',
  subcategories: ['Vasopressores de primeira linha'],
  categoryIds: ['vasopressors-inotropes', 'sepsis'],
  indications: ['Choque vasodilatador persistente apesar de fluidos e catecolaminas'],
  usualAdultDose: [
    dose('Choque séptico', 'Iniciar 0,01 unidades/min IV; titular em incrementos de 0,005 unidades/min a cada 10–15 min. Existem dados limitados acima de 0,07 unidades/min.', ['vasopressin-label']),
    dose('Choque pós-cardiotomia', 'Iniciar 0,03 unidades/min IV; existem dados limitados acima de 0,1 unidades/min.', ['vasopressin-label']),
  ],
  prescriptionExamples: [
    prescription('Choque séptico', 'Vasopressina 0,01 unidades/min IV; titular em incrementos de 0,005 unidades/min ao alvo de PAM.', ['vasopressin-label'], 'Usar a concentração padronizada da instituição; o rótulo inclui bolsas pré-misturadas entre 0,2 e 1 unidade/mL.', ['Desmamar gradualmente após estabilidade sem catecolaminas.']),
  ],
  routes: ['Intravenosa em perfusão contínua'],
  renalAdjustment: noRenalDoseAdjustment(
    ['vasopressin-label'],
    ['Diurese, creatinina, sódio, perfusão cutânea e lactato'],
    'Não existe tabela de ajuste renal no rótulo para choque vasodilatador; titular ao alvo e vigiar isquemia e função renal.',
  ),
  hepaticAdjustment: noHepaticDoseAdjustment(
    ['vasopressin-label'],
    ['Resposta hemodinâmica, lactato e sinais de isquemia'],
    'Não existe ajuste quantitativo por disfunção hepática no rótulo consultado; titular à resposta.',
  ),
  therapeuticDrugMonitoring: ['Pressão arterial e ritmo', 'Débito cardíaco quando disponível', 'Perfusão digital, cutânea e mesentérica', 'Sódio, balanço e diurese durante e após suspensão'],
  contraindications: ['Hipersensibilidade à arginina-vasopressina; algumas apresentações multidose contêm clorobutanol'],
  interactions: ['Efeito pressor aditivo com catecolaminas', 'Indometacina pode prolongar o efeito', 'Fármacos que causam SIADH podem aumentar a resposta; fármacos associados a diabetes insípida podem diminuí-la'],
  practicalNotes: ['Usar a menor dose compatível com resposta clinicamente aceitável.', 'Vigiar redução do débito cardíaco e isquemia coronária, mesentérica, cutânea ou digital.', 'Após suspensão pode ocorrer diabetes insípida reversível com poliúria e hipernatremia.'],
  references: [
    reference('vasopressin-label', 'Vasostrict (vasopressin injection) — official prescribing information', 'DailyMed / U.S. National Library of Medicine', 2023, 'https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?setid=b1147beb-743e-4c62-8927-91192447f8b8'),
  ],
  ...reviewMetadata,
}

export const sourceVerifiedDrugsBatch2: Drug[] = [
  epinephrine,
  dexmedetomidine,
  dobutamine,
  vasopressin,
]

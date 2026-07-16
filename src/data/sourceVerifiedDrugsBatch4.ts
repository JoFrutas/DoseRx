import type { Drug, EvidenceReference } from '../types/drug'
import { dose, prescription } from './drugBuilders.ts'

const REVIEW_DATE = '2026-07-16'

const reference = (
  id: string,
  title: string,
  source: string,
  year: number,
  url: string,
): EvidenceReference => ({
  id,
  title,
  source,
  year,
  url,
  accessedAt: REVIEW_DATE,
})

const antibioticReviewMetadata = {
  lastReviewedAt: REVIEW_DATE,
  validationStatus: 'source-verified' as const,
  confidence: 'high' as const,
  reviewNotes: [
    'Revisão dirigida concluída após detecção de mistura entre apresentações orais e intravenosas.',
    'As doses são apresentadas com os componentes, a via e a formulação relevantes; apresentações com rácios diferentes não são consideradas intercambiáveis.',
    'Os links Medscape indicados pelo responsável ficam registados como referências secundárias; as doses numéricas foram confirmadas em SmPC, rótulo FDA, Drugs.com e guia institucional de diálise.',
  ],
}

const amoxicillin: Drug = {
  id: 'amoxicilina',
  name: 'Amoxicilina',
  aliases: ['amoxicillin', 'Amoxil', 'amoxicilina sódica'],
  drugClass: 'Aminopenicilina',
  priority: 'P1',
  subcategories: ['Aminopenicilinas e combinações'],
  categoryIds: ['antibiotics', 'renal-dialysis'],
  indications: [
    'Infecção grave por microrganismo documentado ou fortemente provável como susceptível à amoxicilina',
    'Pneumonia adquirida na comunidade, pielonefrite e outras infecções autorizadas, conforme foco e susceptibilidade',
    'Bacteriemia associada a foco susceptível',
    'Meningite bacteriana e endocardite em regimes dirigidos por guideline e microbiologia',
  ],
  usualAdultDose: [
    dose(
      'Via IV — infecções graves autorizadas',
      '750 mg a 2 g IV de 8/8 h, ou 2 g IV de 12/12 h; máximo 12 g/dia. Seleccionar a dose pelo foco, gravidade e susceptibilidade.',
      ['amoxicillin-iv-smpc'],
    ),
    dose(
      'Via IV — endocardite ou meningite bacteriana',
      '1–2 g IV de 4/4 h a 6/6 h; máximo 12 g/dia. Usar apenas em regime dirigido e de acordo com a guideline da indicação.',
      ['amoxicillin-iv-smpc'],
    ),
    dose(
      'Via IV — bacteriemia associada a foco susceptível',
      '1–2 g IV de 4/4 h, 6/6 h ou 8/8 h; máximo 12 g/dia.',
      ['amoxicillin-iv-smpc'],
    ),
    dose(
      'Via oral — PAC ou exacerbação de bronquite, apresentação europeia',
      '500 mg a 1 g PO de 8/8 h. A dose depende do foco, gravidade, susceptibilidade e RCM da apresentação local.',
      ['amoxicillin-oral-smpc'],
    ),
    dose(
      'Via oral — referência norte-americana imediata',
      '500 mg PO de 8/8 h ou 875 mg PO de 12/12 h para infecção respiratória inferior; não extrapolar este regime para a formulação IV.',
      ['amoxil-fda-label', 'amoxicillin-drugscom'],
    ),
  ],
  prescriptionExamples: [
    prescription(
      'Infecção grave susceptível — exemplo IV',
      'Amoxicilina 2 g IV de 8/8 h; perfundir durante 20–30 min.',
      ['amoxicillin-iv-smpc'],
      'Exemplo para função renal preservada; a escolha de 2 g exige foco e susceptibilidade compatíveis.',
      [
        'A apresentação IV pode também ser administrada por injecção lenta durante 3–4 min.',
        'Confirmar a apresentação disponível, o volume de reconstituição e a estabilidade no RCM local.',
      ],
    ),
    prescription(
      'Transição para via oral — exemplo',
      'Amoxicilina 1 g PO de 8/8 h.',
      ['amoxicillin-oral-smpc'],
      'Apenas quando a via entérica é apropriada e o foco/microrganismo são susceptíveis.',
    ),
  ],
  routes: ['Intravenosa', 'Oral', 'Intramuscular em apresentações específicas'],
  renalAdjustment: {
    summary: 'Separar sempre a apresentação IV da oral. A amoxicilina é removida por hemodiálise e acumula quando a função renal está gravemente reduzida.',
    byKidneyFunction: [
      dose('GFR >30 mL/min — IV ou oral', 'Sem ajuste posológico devido apenas à função renal.', ['amoxicillin-iv-smpc', 'amoxicillin-oral-smpc']),
      dose('GFR 10–30 mL/min — IV', '1 g IV inicial, depois 500 mg a 1 g IV de 12/12 h.', ['amoxicillin-iv-smpc']),
      dose('GFR <10 mL/min — IV', '1 g IV inicial, depois 500 mg IV de 24/24 h.', ['amoxicillin-iv-smpc']),
      dose('GFR 10–30 mL/min — oral', 'Máximo 500 mg PO de 12/12 h. Não utilizar a apresentação de 875 mg quando GFR/ClCr <30 mL/min.', ['amoxicillin-oral-smpc', 'amoxil-fda-label', 'amoxicillin-drugscom']),
      dose('GFR <10 mL/min — oral', 'Máximo 500 mg PO de 24/24 h.', ['amoxicillin-oral-smpc', 'amoxil-fda-label', 'amoxicillin-drugscom']),
    ],
    intermittentHemodialysis: dose(
      'Hemodiálise intermitente',
      'IV: 1 g no final da sessão, depois 500 mg IV de 24/24 h. Oral: 500 mg de 24/24 h, com suplemento associado à sessão conforme o RCM da apresentação; as fontes europeia e norte-americana descrevem o momento do suplemento de forma diferente.',
      ['amoxicillin-iv-smpc', 'amoxicillin-oral-smpc', 'amoxil-fda-label'],
      ['Prescrever explicitamente a via e o momento relativo à diálise; não juntar os regimes IV e oral.'],
    ),
    continuousKidneyReplacement: dose(
      'Técnica contínua — referência institucional',
      'Não existe um regime IV universal no SmPC. Para via oral, a UCSF usa 500 mg de 8/8 h na ITU enterocócica e 1 g de 8/8 h em infecção grave seleccionada; individualizar pela modalidade, dose de efluente, foco e susceptibilidade.',
      ['ucsf-antimicrobial-dialysis'],
      ['Recomendação institucional com dados limitados; confirmar com Infecciologia/Farmácia.'],
    ),
    monitoring: [
      'Função renal e diurese, sobretudo quando a função está a mudar rapidamente',
      'Resposta clínica, culturas, susceptibilidade/MIC e controlo do foco',
      'Neurotoxicidade/convulsões em dose elevada ou acumulação',
      'Cristalúria, débito urinário e permeabilidade do cateter vesical em doses IV elevadas',
    ],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: {
    summary: 'Não existe redução quantitativa estabelecida; dosear com precaução e monitorizar a função hepática.',
    bySeverity: [
      dose('Disfunção hepática', 'Sem tabela de redução; usar com precaução e vigiar função hepática regularmente.', ['amoxicillin-iv-smpc', 'amoxicillin-oral-smpc']),
    ],
    monitoring: ['AST/ALT, fosfatase alcalina e bilirrubina em tratamento prolongado ou perante suspeita de toxicidade'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: [
    'TDM não é de rotina; considerar TDM de beta-lactâmicos em choque, depuração renal aumentada, obesidade, ECMO ou TSR quando disponível.',
    'Monitorizar resposta, microbiologia, função renal/hepática e toxicidade neurológica.',
  ],
  contraindications: [
    'Hipersensibilidade à amoxicilina ou a qualquer penicilina',
    'Antecedente de reacção imediata grave a outro beta-lactâmico',
  ],
  interactions: [
    'Probenecida reduz a secreção tubular e aumenta/prolonga a exposição à amoxicilina',
    'Alopurinol pode aumentar a probabilidade de reacção cutânea',
    'Anticoagulantes orais: foram descritas alterações do INR; vigiar na introdução e suspensão',
    'Penicilinas podem reduzir a excreção de metotrexato e aumentar a sua toxicidade',
    'Não misturar amoxicilina e aminoglicosídeos na mesma seringa, recipiente ou sistema de administração',
  ],
  practicalNotes: [
    'Não usar amoxicilina empiricamente em infecção grave se não existir elevada probabilidade de susceptibilidade.',
    'A ficha Medscape/Amoxil indicada é uma referência secundária da marca; a posologia IV europeia foi validada no SmPC da apresentação injectável.',
    'Em doses IV elevadas, assegurar hidratação e débito urinário adequados para reduzir o risco de cristalúria.',
    'A dose depende do foco e da susceptibilidade; “amoxicilina” não tem uma única dose habitual transversal.',
  ],
  references: [
    reference(
      'amoxicillin-iv-smpc',
      'Amoxicillin 500 mg powder for solution for injection or infusion — SmPC',
      'electronic medicines compendium',
      2023,
      'https://www.medicines.org.uk/emc/product/8743/smpc',
    ),
    reference(
      'amoxicillin-oral-smpc',
      'Amoxicillin 500 mg Capsules — SmPC',
      'electronic medicines compendium',
      2026,
      'https://www.medicines.org.uk/emc/product/10638/smpc',
    ),
    reference(
      'amoxil-fda-label',
      'AMOXIL (amoxicillin) — U.S. prescribing information',
      'U.S. Food and Drug Administration',
      2024,
      'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/050542s032%2C050754s022%2C050760s023%2C050761s019lbl.pdf',
    ),
    reference(
      'amoxil-medscape',
      'Amoxil (amoxicillin) dosing, indications and dose modifications',
      'Medscape Drug Reference',
      2026,
      'https://reference.medscape.com/drug/amoxil-amoxicillin-342473',
    ),
    reference(
      'amoxicillin-drugscom',
      'Amoxicillin Dosage Guide',
      'Drugs.com',
      2025,
      'https://www.drugs.com/dosage/amoxicillin.html',
    ),
    reference(
      'ucsf-antimicrobial-dialysis',
      'Antimicrobial Dosing in Intermittent & Continuous Hemodialysis',
      'UCSF Infectious Diseases Management Program',
      2026,
      'https://idmp.ucsf.edu/antimicrobial-dosing-intermittent-continuous-hemodialysis',
    ),
  ],
  ...antibioticReviewMetadata,
}

const amoxicillinClavulanate: Drug = {
  id: 'amoxicilina-acido-clavulanico',
  name: 'Amoxicilina/ácido clavulânico',
  aliases: ['amoxicillin-clavulanate', 'amoxicilina-clavulanato', 'co-amoxiclav', 'Augmentin'],
  drugClass: 'Aminopenicilina + inibidor de beta-lactamase',
  priority: 'P1',
  subcategories: ['Aminopenicilinas e combinações'],
  categoryIds: ['antibiotics', 'renal-dialysis'],
  indications: [
    'Pneumonia adquirida na comunidade e exacerbação aguda de bronquite quando a combinação é apropriada',
    'Pielonefrite, cistite e outras infecções urinárias seleccionadas',
    'Infecções da pele e tecidos moles, mordeduras e abcesso dentário grave',
    'Infecções intra-abdominais, biliares, genitais, ósseas ou articulares seleccionadas',
    'Profilaxia cirúrgica em procedimentos seleccionados com a apresentação IV',
  ],
  usualAdultDose: [
    dose(
      'Via IV — apresentação 1000/200 mg',
      '1000 mg/200 mg IV de 8/8 h. A dose deve ser escrita pelos dois componentes; esta apresentação não estabelece 1,2 g de 6/6 h como regime habitual.',
      ['coamoxiclav-iv-smpc'],
    ),
    dose(
      'Via oral — apresentação europeia 875/125 mg',
      '875 mg/125 mg PO de 12/12 h como dose standard; 875 mg/125 mg PO de 8/8 h como dose superior em indicações seleccionadas.',
      ['coamoxiclav-oral-smpc'],
      ['Administrar com uma refeição. Não usar esta apresentação 7:1 quando ClCr <30 mL/min.'],
    ),
    dose(
      'Via oral — apresentação norte-americana imediata',
      'Infecção grave ou respiratória: 875 mg/125 mg PO de 12/12 h ou 500 mg/125 mg PO de 8/8 h.',
      ['augmentin-drugscom'],
      ['Este regime corresponde a apresentações norte-americanas e não deve ser confundido com a formulação IV.'],
    ),
  ],
  prescriptionExamples: [
    prescription(
      'Tratamento IV — exemplo para função renal preservada',
      'Amoxicilina/ácido clavulânico 1000 mg/200 mg IV de 8/8 h; reconstituir o frasco com 20 mL de água para injectáveis, adicionar imediatamente a 100 mL de NaCl 0,9% e perfundir em 30–40 min.',
      ['coamoxiclav-iv-smpc'],
      'Exemplo específico da apresentação IV 1000/200 mg descrita no SmPC consultado.',
      [
        'Usar ou diluir a solução reconstituída imediatamente e dentro de 20 min.',
        'Não preparar em glucose, dextrano ou bicarbonato e não misturar com aminoglicosídeos no mesmo sistema.',
      ],
    ),
    prescription(
      'Transição para via oral — apresentação 875/125 mg',
      'Amoxicilina/ácido clavulânico 875 mg/125 mg PO de 12/12 h, com as refeições.',
      ['coamoxiclav-oral-smpc'],
      'Apenas se a formulação 7:1 for apropriada, a via oral for possível e a ClCr for superior a 30 mL/min.',
    ),
  ],
  routes: ['Intravenosa', 'Oral'],
  renalAdjustment: {
    summary: 'O ajuste depende da via, da apresentação e do rácio amoxicilina/clavulanato. Não escrever apenas a dose total em doentes com disfunção renal.',
    byKidneyFunction: [
      dose('ClCr >30 mL/min — IV 1000/200 mg', 'Sem ajuste; 1000 mg/200 mg IV de 8/8 h.', ['coamoxiclav-iv-smpc']),
      dose('ClCr 10–30 mL/min — IV', '1000 mg/200 mg IV como dose inicial, depois 500 mg/100 mg IV de 12/12 h.', ['coamoxiclav-iv-smpc']),
      dose('ClCr <10 mL/min — IV', '1000 mg/200 mg IV como dose inicial, depois 500 mg/100 mg IV de 24/24 h.', ['coamoxiclav-iv-smpc']),
      dose('ClCr <30 mL/min — oral 875/125 mg (7:1)', 'Não recomendada porque não existe ajuste validado para esta apresentação. Seleccionar uma apresentação com rácio apropriado e seguir o respectivo RCM.', ['coamoxiclav-oral-smpc']),
      dose('ClCr 10–30 mL/min — oral imediata 4:1', '250 mg/125 mg a 500 mg/125 mg PO de 12/12 h, conforme gravidade e apresentação local.', ['augmentin-drugscom']),
      dose('ClCr <10 mL/min — oral imediata 4:1', '250 mg/125 mg a 500 mg/125 mg PO de 24/24 h, conforme gravidade e apresentação local.', ['augmentin-drugscom']),
    ],
    intermittentHemodialysis: dose(
      'Hemodiálise intermitente',
      'IV: 1000 mg/200 mg inicial, depois 500 mg/100 mg IV de 24/24 h, mais 500 mg/100 mg no final da sessão. Oral imediata: 250 mg/125 mg a 500 mg/125 mg de 24/24 h, com suplementos associados à sessão conforme o RCM da apresentação.',
      ['coamoxiclav-iv-smpc', 'augmentin-drugscom'],
      ['As apresentações IV e orais têm rácios distintos; não converter apenas pela dose total de 1,2 g ou 625 mg.'],
    ),
    continuousKidneyReplacement: dose(
      'Técnica contínua — referência institucional oral',
      'O SmPC IV não estabelece um regime de CRRT. A UCSF usa por via oral 500 mg/125 mg de 12/12 h na maioria das indicações e 875 mg/125 mg de 8/8 h em bacteriemia Gram-negativa seleccionada; individualizar pela técnica, foco e susceptibilidade.',
      ['ucsf-antimicrobial-dialysis'],
      ['Dados limitados e recomendação institucional; não extrapolar automaticamente para a apresentação IV.'],
    ),
    monitoring: [
      'Função renal e diurese; recalcular perante alteração aguda da ClCr ou da TSR',
      'Resposta clínica, culturas, susceptibilidade/MIC e controlo do foco',
      'Provas hepáticas em tratamento prolongado ou perante sintomas',
      'Tolerância gastrointestinal e sinais de infecção por C. difficile',
    ],
    validationStatus: 'source-verified',
  },
  hepaticAdjustment: {
    summary: 'Dosear com precaução e monitorizar a função hepática; não existe redução quantitativa validada.',
    bySeverity: [
      dose('Disfunção hepática', 'Sem tabela de redução; usar com precaução e monitorizar a função hepática regularmente.', ['coamoxiclav-iv-smpc', 'coamoxiclav-oral-smpc']),
    ],
    monitoring: ['AST/ALT, fosfatase alcalina e bilirrubina', 'Icterícia, prurido ou outros sinais de lesão colestática'],
    validationStatus: 'source-verified',
  },
  therapeuticDrugMonitoring: [
    'TDM não é de rotina.',
    'Monitorizar resposta, culturas, função renal, função hepática e tolerância gastrointestinal.',
  ],
  contraindications: [
    'Hipersensibilidade à amoxicilina, ácido clavulânico ou qualquer penicilina',
    'Antecedente de reacção imediata grave a outro beta-lactâmico',
    'Antecedente de icterícia ou disfunção hepática causada por amoxicilina/ácido clavulânico',
  ],
  interactions: [
    'Probenecida aumenta/prolonga a exposição à amoxicilina sem atrasar da mesma forma a eliminação do clavulanato',
    'Alopurinol pode aumentar a probabilidade de reacção cutânea',
    'Anticoagulantes orais: vigiar INR na introdução e suspensão',
    'Penicilinas podem reduzir a excreção de metotrexato e aumentar a toxicidade',
    'Não misturar com aminoglicosídeos no mesmo recipiente ou sistema de administração',
  ],
  practicalNotes: [
    'Escrever sempre amoxicilina/clavulanato em mg/mg; “1,2 g” isolado oculta o rácio e favorece erros.',
    'As apresentações 1000/200 mg IV, 875/125 mg oral, 500/125 mg oral e XR não são intercambiáveis.',
    'Se for necessária maior exposição à amoxicilina, escolher uma apresentação com mais amoxicilina e sem aumento desnecessário do clavulanato.',
    'A ficha Medscape/Augmentin indicada é uma referência secundária da marca e não substitui o SmPC da apresentação IV europeia.',
    'Não cobre Pseudomonas nem MRSA; se o agente for susceptível à amoxicilina, considerar descalar para amoxicilina sem clavulanato.',
  ],
  references: [
    reference(
      'coamoxiclav-iv-smpc',
      'Co-amoxiclav 1000 mg/200 mg powder for solution for injection/infusion — SmPC',
      'electronic medicines compendium',
      2026,
      'https://www.medicines.org.uk/emc/product/8753/smpc',
    ),
    reference(
      'coamoxiclav-oral-smpc',
      'Co-amoxiclav 875 mg/125 mg film-coated tablets — SmPC',
      'electronic medicines compendium',
      2026,
      'https://www.medicines.org.uk/emc/product/10877/smpc',
    ),
    reference(
      'augmentin-medscape',
      'Augmentin (amoxicillin/clavulanate) dosing, indications and dose modifications',
      'Medscape Drug Reference',
      2026,
      'https://reference.medscape.com/drug/augmentin-amoxicillin-clavulanate-342474',
    ),
    reference(
      'augmentin-drugscom',
      'Augmentin Dosage Guide',
      'Drugs.com',
      2025,
      'https://www.drugs.com/dosage/augmentin.html',
    ),
    reference(
      'ucsf-antimicrobial-dialysis',
      'Antimicrobial Dosing in Intermittent & Continuous Hemodialysis',
      'UCSF Infectious Diseases Management Program',
      2026,
      'https://idmp.ucsf.edu/antimicrobial-dosing-intermittent-continuous-hemodialysis',
    ),
  ],
  ...antibioticReviewMetadata,
}

export const sourceVerifiedDrugsBatch4: Drug[] = [
  amoxicillin,
  amoxicillinClavulanate,
]

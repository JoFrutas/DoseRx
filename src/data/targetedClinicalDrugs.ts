// Targeted adult summaries linked to the specified primary product labels.
// No calculator or independent-validation claim is added by this batch.
import type { Drug } from '../types/drug'
import { catalogSeeds } from './catalog.generated.ts'

const clinicalEntries: Array<Omit<Drug, 'name' | 'aliases' | 'drugClass' | 'priority' | 'subcategories' | 'categoryIds'>> = [
  {
    "id": "salbutamol",
    "indications": [
      "Broncospasmo e asma aguda grave: solução para nebulização 2 mg/mL (5 mg/2,5 mL)."
    ],
    "routes": [
      "Inalação por nebulizador"
    ],
    "contraindications": [
      "Hipersensibilidade ao salbutamol ou excipientes."
    ],
    "interactions": [
      "Betabloqueantes não seletivos antagonizam o efeito; xantinas, corticosteroides e diuréticos podem agravar hipocaliemia."
    ],
    "practicalNotes": [
      "Não injetar nem ingerir. Não converter estas doses para inaladores ou para tratamento da hipercaliemia."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "2,5–5 mg por nebulização, até 4 vezes/dia. Até 40 mg/dia apenas no hospital sob supervisão médica rigorosa.",
        "sourceIds": [
          "salbutamol-cipla-smpc"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "A fonte não define um esquema por função renal. Não extrapolar para hemodiálise ou terapêutica renal contínua.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "A fonte não define um ajuste hepático quantitativo; individualizar a decisão clínica.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Resposta respiratória, frequência cardíaca e potássio; avaliar lactato se taquipneia persistir apesar de melhoria do broncospasmo."
    ],
    "references": [
      {
        "id": "salbutamol-cipla-smpc",
        "title": "Salbutamol 2 mg/mL nebuliser solution — SmPC, sections 4.1–4.5",
        "source": "Cipla EU Ltd / eMC",
        "url": "https://www.medicines.org.uk/emc/product/10257/smpc",
        "accessedAt": "2026-09-22"
      }
    ],
    "lastReviewedAt": "2026-09-22",
    "validationStatus": "source-linked",
    "confidence": "low",
    "reviewNotes": [
      "Síntese de uma fonte primária ligada, consultada nesta revisão; aguarda revisão clínica independente. Âmbito adulto e formulações indicadas; consultar a fonte para outros contextos."
    ]
  },
  {
    "id": "ipratropio",
    "indications": [
      "Broncospasmo na DPOC; na asma, associado a agonista beta. Unidoses 250 mcg/1 mL ou 500 mcg/2 mL."
    ],
    "routes": [
      "Inalação por nebulizador"
    ],
    "contraindications": [
      "Hipersensibilidade à atropina, derivados ou excipientes."
    ],
    "interactions": [
      "Evitar associação crónica com outros anticolinérgicos; com agonistas beta, proteger os olhos do aerossol."
    ],
    "practicalNotes": [
      "Apenas inalação. Se necessário, diluir com NaCl 0,9% para o volume do nebulizador; evitar contacto ocular, sobretudo no glaucoma de ângulo fechado."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "250–500 mcg, 3–4 vezes/dia. Broncospasmo agudo: 500 mcg; repetições e intervalo definidos pelo médico. Acima de 2 mg/dia apenas sob supervisão médica.",
        "sourceIds": [
          "ipratropium-atrovent-smpc"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "A fonte não define um esquema por função renal. Não extrapolar para hemodiálise ou terapêutica renal contínua.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "A fonte não define um ajuste hepático quantitativo; individualizar a decisão clínica.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Resposta respiratória, broncospasmo paradoxal, sintomas oculares e retenção urinária."
    ],
    "references": [
      {
        "id": "ipratropium-atrovent-smpc",
        "title": "Atrovent UDVs — SmPC, sections 4.1–4.5",
        "source": "Boehringer Ingelheim / eMC",
        "url": "https://www.medicines.org.uk/emc/product/8028/smpc",
        "accessedAt": "2026-09-22"
      }
    ],
    "lastReviewedAt": "2026-09-22",
    "validationStatus": "source-linked",
    "confidence": "low",
    "reviewNotes": [
      "Síntese de uma fonte primária ligada, consultada nesta revisão; aguarda revisão clínica independente. Âmbito adulto e formulações indicadas; consultar a fonte para outros contextos."
    ]
  },
  {
    "id": "cefazolina",
    "indications": [
      "Tratamento de infeções por microrganismos suscetíveis, em adultos; pó injetável 500 mg ou 1 g. Profilaxia cirúrgica fora deste resumo."
    ],
    "routes": [
      "IV",
      "IM"
    ],
    "contraindications": [
      "Alergia conhecida às cefalosporinas; avaliar antecedentes de reação a betalactâmicos."
    ],
    "interactions": [
      "Probenecida reduz a eliminação renal."
    ],
    "practicalNotes": [
      "Reconstituir segundo a apresentação. Injeção IV lenta em 3–5 min; para perfusão, seguir diluição da fonte. Não usar dose renal habitual sem avaliar função renal."
    ],
    "usualAdultDose": [
      {
        "context": "Infeção moderada a grave; função renal preservada",
        "recommendation": "500 mg–1 g de 6/6h a 8/8h.",
        "sourceIds": [
          "cefazolin-fresenius-label"
        ],
        "validationStatus": "source-linked"
      },
      {
        "context": "Infeção com risco de vida, incluindo endocardite/septicemia",
        "recommendation": "1–1,5 g de 6/6h; selecionar segundo foco e suscetibilidade.",
        "sourceIds": [
          "cefazolin-fresenius-label"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Ajustes após dose inicial adequada à gravidade; ClCr em mL/min. A fonte não define aqui HD/TRRC.",
      "byKidneyFunction": [
        {
          "context": "ClCr ≥55 mL/min",
          "recommendation": "Dose habitual.",
          "sourceIds": [
            "cefazolin-fresenius-label"
          ],
          "validationStatus": "source-linked"
        },
        {
          "context": "ClCr 35–54 mL/min",
          "recommendation": "Dose habitual com intervalo mínimo de 8 h.",
          "sourceIds": [
            "cefazolin-fresenius-label"
          ],
          "validationStatus": "source-linked"
        },
        {
          "context": "ClCr 11–34 mL/min",
          "recommendation": "Metade da dose habitual de 12/12h.",
          "sourceIds": [
            "cefazolin-fresenius-label"
          ],
          "validationStatus": "source-linked"
        },
        {
          "context": "ClCr ≤10 mL/min",
          "recommendation": "Metade da dose habitual de 18/18h a 24/24h.",
          "sourceIds": [
            "cefazolin-fresenius-label"
          ],
          "validationStatus": "source-linked"
        }
      ],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "A fonte não define um ajuste hepático quantitativo; individualizar a decisão clínica.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Função renal, resposta microbiológica, alergia e diarreia associada a antibióticos."
    ],
    "references": [
      {
        "id": "cefazolin-fresenius-label",
        "title": "Cefazolin for Injection, USP — adult dosage, renal adjustment and administration",
        "source": "Fresenius Kabi / DailyMed",
        "url": "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=c47c8d14-1eef-40f9-9d11-f0c300b1d4be&type=display",
        "accessedAt": "2026-09-22"
      }
    ],
    "lastReviewedAt": "2026-09-22",
    "validationStatus": "source-linked",
    "confidence": "low",
    "reviewNotes": [
      "Síntese de uma fonte primária ligada, consultada nesta revisão; aguarda revisão clínica independente. Âmbito adulto e formulações indicadas; consultar a fonte para outros contextos."
    ]
  },
  {
    "id": "labetalol",
    "indications": [
      "Hipertensão grave em adultos; injetável 5 mg/mL ou solução de perfusão 1 mg/mL."
    ],
    "routes": [
      "IV"
    ],
    "contraindications": [
      "Asma/doença obstrutiva, bradicardia grave, bloqueio AV superior ao primeiro grau, choque cardiogénico ou hipersensibilidade."
    ],
    "interactions": [
      "Contraindicado com antagonistas do cálcio não di-hidropiridínicos IV, como verapamilo; outros hipotensores potenciam a queda tensional."
    ],
    "practicalNotes": [
      "Confirmar concentração: volumes de bolus e perfusão não são intercambiáveis."
    ],
    "usualAdultDose": [
      {
        "context": "Injeção IV",
        "recommendation": "0,25 mg/kg, máximo 20 mg, em 2 min. Depois 20–80 mg em 2 min a cada 10 min conforme resposta; segurança acima de 300 mg acumulados não estabelecida.",
        "sourceIds": [
          "labetalol-hikma-label"
        ],
        "validationStatus": "source-linked"
      },
      {
        "context": "Perfusão IV",
        "recommendation": "2 mg/min; ajustar à pressão arterial e interromper quando a resposta desejada for obtida.",
        "sourceIds": [
          "labetalol-hikma-label"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "A fonte não define um esquema por função renal. Não extrapolar para hemodiálise ou terapêutica renal contínua.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Cautela na doença hepática; suspender e investigar sinais de lesão hepática. Sem ajuste quantitativo definido nesta fonte.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Pressão arterial, frequência cardíaca e ECG; manter em decúbito durante a administração e avaliar hipotensão postural."
    ],
    "references": [
      {
        "id": "labetalol-hikma-label",
        "title": "Labetalol Hydrochloride Injection — prescribing information, sections 2, 4, 5, 7",
        "source": "Hikma / DailyMed",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=99a715a0-4579-410c-b102-7ef6fab8db55",
        "accessedAt": "2026-09-22"
      }
    ],
    "lastReviewedAt": "2026-09-22",
    "validationStatus": "source-linked",
    "confidence": "low",
    "reviewNotes": [
      "Síntese de uma fonte primária ligada, consultada nesta revisão; aguarda revisão clínica independente. Âmbito adulto e formulações indicadas; consultar a fonte para outros contextos."
    ]
  },
  {
    "id": "nicardipina",
    "indications": [
      "Hipertensão aguda com risco de vida ou pós-operatória, em adultos; solução 1 mg/mL."
    ],
    "routes": [
      "Perfusão IV"
    ],
    "contraindications": [
      "Estenose aórtica grave, hipertensão compensatória, angina instável, enfarte nos últimos 8 dias ou hipersensibilidade."
    ],
    "interactions": [
      "Inibidores/indutores CYP3A4 e imunossupressores requerem revisão de interações."
    ],
    "practicalNotes": [
      "Administrar por bomba em ambiente monitorizado. Sem via central, diluir para 0,1–0,2 mg/mL; não administrar em bolus. Gravidez exige esquema próprio da fonte."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "Iniciar 3–5 mg/h durante 15 min; aumentar 0,5–1 mg/h a cada 15 min. Máximo 15 mg/h; após atingir o alvo, reduzir progressivamente, geralmente para 2–4 mg/h.",
        "sourceIds": [
          "nicardipine-smpc"
        ],
        "validationStatus": "source-linked"
      },
      {
        "context": "Idosos",
        "recommendation": "Iniciar 1–5 mg/h; após 30 min, ajustar em 0,5 mg/h conforme resposta. Máximo 15 mg/h.",
        "sourceIds": [
          "nicardipine-smpc"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Iniciar 1–5 mg/h; após 30 min, ajustar em 0,5 mg/h conforme resposta. Máximo 15 mg/h.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Iniciar 1–5 mg/h; após 30 min, ajustar em 0,5 mg/h conforme resposta. Máximo 15 mg/h.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Monitorização contínua da pressão arterial; avaliar pressão e frequência cardíaca pelo menos a cada 5 min durante a perfusão."
    ],
    "references": [
      {
        "id": "nicardipine-smpc",
        "title": "Nicardipine 10 mg/10 mL — SmPC, sections 4.1–4.5",
        "source": "Aguettant / eMC",
        "url": "https://www.medicines.org.uk/emc/product/12140/smpc",
        "accessedAt": "2026-09-22"
      }
    ],
    "lastReviewedAt": "2026-09-22",
    "validationStatus": "source-linked",
    "confidence": "low",
    "reviewNotes": [
      "Síntese de uma fonte primária ligada, consultada nesta revisão; aguarda revisão clínica independente. Âmbito adulto e formulações indicadas; consultar a fonte para outros contextos."
    ]
  },
  {
    "id": "nitroglicerina",
    "indications": [
      "Adultos: hipertensão perioperatória, insuficiência cardíaca no enfarte ou angina refratária. Solução IV em glicose 5%, 25 mg/250 mL."
    ],
    "routes": [
      "Perfusão IV"
    ],
    "contraindications": [
      "Tamponamento, pericardite constritiva, cardiomiopatia restritiva, pressão intracraniana elevada ou alergia."
    ],
    "interactions": [
      "Não associar a sildenafil, tadalafil, vardenafil ou riociguat. Pode alterar resposta à heparina."
    ],
    "practicalNotes": [
      "Usar bomba e sistema não adsorvente. Não transpor doses de estudos com PVC; não adicionar outros medicamentos à solução."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "Com sistema não adsorvente: iniciar 5 mcg/min; aumentar 5 mcg/min a cada 3–5 min. Sem resposta a 20 mcg/min, podem usar-se incrementos de 10–20 mcg/min. Com resposta parcial, incrementos menores e menos frequentes; não existe máximo universal definido na fonte.",
        "sourceIds": [
          "nitroglycerin-dextrose-label"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "A fonte não define um esquema por função renal. Não extrapolar para hemodiálise ou terapêutica renal contínua.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "A fonte não define um ajuste hepático quantitativo; individualizar a decisão clínica.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Pressão arterial e frequência cardíaca continuamente; resposta clínica e carga de volume."
    ],
    "references": [
      {
        "id": "nitroglycerin-dextrose-label",
        "title": "Nitroglycerin in 5% Dextrose — prescribing information, adult dosing",
        "source": "DailyMed, manufacturer labelling",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3f2c9570-a544-1982-e063-6294a90a3067",
        "accessedAt": "2026-09-22"
      }
    ],
    "lastReviewedAt": "2026-09-22",
    "validationStatus": "source-linked",
    "confidence": "low",
    "reviewNotes": [
      "Síntese de uma fonte primária ligada, consultada nesta revisão; aguarda revisão clínica independente. Âmbito adulto e formulações indicadas; consultar a fonte para outros contextos."
    ]
  },
  {
    "id": "nitroprussiato-de-sodio",
    "indications": [
      "Adultos: crise hipertensiva ou insuficiência cardíaca aguda. Solução pronta em NaCl 0,9%, 0,2 ou 0,5 mg/mL."
    ],
    "routes": [
      "Perfusão IV"
    ],
    "contraindications": [
      "Hipertensão compensatória; insuficiência cardíaca com resistência periférica reduzida; circulação cerebral inadequada para hipotensão cirúrgica; atrofia ótica de Leber/ambliopia tabágica."
    ],
    "interactions": [
      "Contraindicado com sildenafil, tadalafil, vardenafil ou riociguat."
    ],
    "practicalNotes": [
      "Apenas perfusão controlada por bomba. Esta ficha refere solução pronta, não concentrado para diluição."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "Iniciar 0,3 mcg/kg/min; avaliar a pressão arterial durante pelo menos 5 min antes de alterar a dose, segundo resposta/perfusão. Máximo 10 mcg/kg/min pelo menor tempo possível: risco de toxicidade por cianeto.",
        "sourceIds": [
          "nitroprusside-rtu-label"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Limites de velocidade média por risco de acumulação de tiocianato; não equivalem a esquema de TRRC.",
      "byKidneyFunction": [
        {
          "context": "eGFR <30 mL/min/1,73 m²",
          "recommendation": "Velocidade média inferior a 3 mcg/kg/min.",
          "sourceIds": [
            "nitroprusside-rtu-label"
          ],
          "validationStatus": "source-linked"
        },
        {
          "context": "Anúria",
          "recommendation": "Limitar velocidade média a 1 mcg/kg/min.",
          "sourceIds": [
            "nitroprusside-rtu-label"
          ],
          "validationStatus": "source-linked"
        }
      ],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Disfunção hepática aumenta suscetibilidade à toxicidade por cianeto; sem ajuste quantitativo definido.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Pressão arterial contínua, perfusão e toxicidade por cianeto/tiocianato; monitorizar tiocianato se dose acumulada exceder 7 mg/kg/dia mesmo com função renal normal."
    ],
    "references": [
      {
        "id": "nitroprusside-rtu-label",
        "title": "Sodium nitroprusside in 0.9% sodium chloride — prescribing information, sections 2, 4, 5",
        "source": "Slate Run Pharmaceuticals / DailyMed",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6f02e4ac-5f7c-4003-b9b7-283f489cddb0",
        "accessedAt": "2026-09-22"
      }
    ],
    "lastReviewedAt": "2026-09-22",
    "validationStatus": "source-linked",
    "confidence": "low",
    "reviewNotes": [
      "Síntese de uma fonte primária ligada, consultada nesta revisão; aguarda revisão clínica independente. Âmbito adulto e formulações indicadas; consultar a fonte para outros contextos."
    ]
  },
  {
    "id": "cloreto-de-calcio",
    "indications": [
      "Hipocalcemia aguda sintomática em adultos; solução 10% (100 mg/mL). Doses expressas em cloreto de cálcio, não cálcio elementar."
    ],
    "routes": [
      "Perfusão IV"
    ],
    "contraindications": [
      "A fonte contraindica em fibrilhação ventricular, assistolia e dissociação eletromecânica. Esta ficha não define tratamento de paragem cardíaca ou hipercaliemia."
    ],
    "interactions": [
      "Evitar associação com digoxina. Não misturar com ceftriaxona nem administrar simultaneamente em Y; em adultos, administração sequencial exige lavagem da linha."
    ],
    "practicalNotes": [
      "Não substituir por gluconato de cálcio usando os mesmos mg ou mL. Repetição depende de reavaliação clínica e laboratorial."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "200–1000 mg IV, individualizados pela gravidade e cálcio ionizado. Administrar em veia central ou profunda, sem exceder 1 mL/min; não administrar em bolus, IM ou SC.",
        "sourceIds": [
          "calcium-chloride-label"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Na insuficiência renal, dose inicial adulta de 200 mg; monitorizar cálcio frequentemente e individualizar repetições.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "A fonte não define um ajuste hepático quantitativo; individualizar a decisão clínica.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Cálcio ionizado, ECG e local de infusão; extravasamento pode causar necrose."
    ],
    "references": [
      {
        "id": "calcium-chloride-label",
        "title": "Calcium Chloride Injection 10% — prescribing information, sections 1–5, 8.6",
        "source": "DailyMed, manufacturer labelling",
        "url": "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=8295039b-2559-4626-90c8-6ac7e896e41a&type=display",
        "accessedAt": "2026-09-22"
      }
    ],
    "lastReviewedAt": "2026-09-22",
    "validationStatus": "source-linked",
    "confidence": "low",
    "reviewNotes": [
      "Síntese de uma fonte primária ligada, consultada nesta revisão; aguarda revisão clínica independente. Âmbito adulto e formulações indicadas; consultar a fonte para outros contextos."
    ]
  },
  {
    "id": "protamina",
    "indications": [
      "Reversão de heparina não fracionada em adultos; sulfato de protamina 10 mg/mL."
    ],
    "routes": [
      "IV"
    ],
    "contraindications": [
      "Intolerância prévia à protamina."
    ],
    "interactions": [
      "Excesso de protamina tem efeito anticoagulante. Não misturar com outros medicamentos sem confirmar compatibilidade."
    ],
    "practicalNotes": [
      "Ter tratamento de anafilaxia disponível. Não aplicar esta relação à HBPM; não calcular pela dose total histórica de heparina."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "1 mg neutraliza pelo menos 100 unidades USP de heparina. Ajustar à heparina ainda circulante e coagulação; após 30 min da heparina IV, metade da dose pode bastar. Administrar lentamente em 10 min; não exceder 50 mg por administração.",
        "sourceIds": [
          "protamine-fresenius-label"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "A fonte não define um esquema por função renal. Não extrapolar para hemodiálise ou terapêutica renal contínua.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "A fonte não define um ajuste hepático quantitativo; individualizar a decisão clínica.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Coagulação, hemorragia, pressão arterial e reação anafilática; vigiar retorno do efeito da heparina."
    ],
    "references": [
      {
        "id": "protamine-fresenius-label",
        "title": "Protamine Sulfate Injection — prescribing information, dosage and warnings",
        "source": "Fresenius Kabi / DailyMed",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c76876da-b9a8-45d0-9278-7df3288d3a06",
        "accessedAt": "2026-09-22"
      }
    ],
    "lastReviewedAt": "2026-09-22",
    "validationStatus": "source-linked",
    "confidence": "low",
    "reviewNotes": [
      "Síntese de uma fonte primária ligada, consultada nesta revisão; aguarda revisão clínica independente. Âmbito adulto e formulações indicadas; consultar a fonte para outros contextos."
    ]
  },
  {
    "id": "tiamina",
    "indications": [
      "Adultos: prevenção/tratamento de Wernicke associado a perturbação por consumo de álcool. Cloridrato de tiamina 125 mg/mL."
    ],
    "routes": [
      "IV",
      "IM"
    ],
    "contraindications": [
      "Hipersensibilidade à tiamina ou excipientes."
    ],
    "interactions": [
      "Fluoropirimidinas, ifosfamida e diuréticos podem reduzir o efeito ou aumentar a perda de tiamina."
    ],
    "practicalNotes": [
      "IV: diluir em 50–250 mL de glicose 5% ou NaCl 0,9% e administrar em 30 min. IM: não diluir. Outros esquemas, incluindo beribéri e doses iniciais superiores, exigem consulta da fonte."
    ],
    "usualAdultDose": [
      {
        "context": "Profilaxia em alto risco",
        "recommendation": "250 mg IV ou IM uma vez/dia durante 3–5 dias.",
        "sourceIds": [
          "thiamine-brancaster-smpc"
        ],
        "validationStatus": "source-linked"
      },
      {
        "context": "Tratamento de Wernicke",
        "recommendation": "500–750 mg IV, 3 vezes/dia, pelo menos 2 dias. Se resposta favorável: 250 mg IV/IM uma vez/dia durante 5 dias ou até deixar de melhorar; depois formulação oral.",
        "sourceIds": [
          "thiamine-brancaster-smpc"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Não se recomenda ajuste na fonte, mas a farmacocinética nesta população não foi avaliada; usar com cautela.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Não se recomenda ajuste na fonte, mas a farmacocinética nesta população não foi avaliada; usar com cautela.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Resposta neurológica e hipersensibilidade; manter tratamento de anafilaxia disponível."
    ],
    "references": [
      {
        "id": "thiamine-brancaster-smpc",
        "title": "Thiamine hydrochloride 125 mg/mL — SmPC, sections 4.1–4.5",
        "source": "Brancaster Pharma / eMC",
        "url": "https://www.medicines.org.uk/emc/product/101445/smpc",
        "accessedAt": "2026-09-22"
      }
    ],
    "lastReviewedAt": "2026-09-22",
    "validationStatus": "source-linked",
    "confidence": "low",
    "reviewNotes": [
      "Síntese de uma fonte primária ligada, consultada nesta revisão; aguarda revisão clínica independente. Âmbito adulto e formulações indicadas; consultar a fonte para outros contextos."
    ]
  }
]

export const targetedClinicalDrugs: Drug[] = clinicalEntries.map((clinical) => {
  const seed = catalogSeeds.find((candidate) => candidate.id === clinical.id)
  if (!seed) throw new Error(`Missing catalog seed: ${clinical.id}`)
  return { ...seed, ...clinical }
})

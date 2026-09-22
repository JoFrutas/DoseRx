// Adult, formulation-specific summaries. Independent clinical review remains pending.
import type { Drug } from '../types/drug'
import { catalogSeeds } from './catalog.generated.ts'

const clinicalEntries: Array<Omit<Drug, 'name' | 'aliases' | 'drugClass' | 'priority' | 'subcategories' | 'categoryIds'>> = [
  {
    "id": "fidaxomicina",
    "indications": [
      "Infeção por Clostridioides difficile em adultos: comprimidos de 200 mg."
    ],
    "routes": [
      "Oral"
    ],
    "contraindications": [
      "Hipersensibilidade à fidaxomicina ou excipientes."
    ],
    "interactions": [
      "Evitar inibidores potentes da P-gp, incluindo ciclosporina, claritromicina, verapamilo e amiodarona."
    ],
    "practicalNotes": [
      "Engolir os comprimidos inteiros. Dados limitados na doença fulminante: não extrapolar estes esquemas para esse contexto."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "200 mg de 12/12h durante 10 dias.",
        "sourceIds": [
          "fidaxomicin-tillotts-smpc"
        ],
        "validationStatus": "source-linked"
      },
      {
        "context": "Esquema prolongado pulsado",
        "recommendation": "200 mg de 12/12h nos dias 1–5; sem dose no dia 6; depois 200 mg uma vez em dias alternados, do dia 7 ao dia 25.",
        "sourceIds": [
          "fidaxomicin-tillotts-smpc"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Sem ajuste renal recomendado; precaução na insuficiência renal grave, pela escassez de dados.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Sem ajuste hepático recomendado; precaução na disfunção moderada a grave.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Resposta clínica e hipersensibilidade; suspender perante angioedema ou reação grave."
    ],
    "references": [
      {
        "id": "fidaxomicin-tillotts-smpc",
        "title": "Fidaxomicin Tillotts 200 mg tablets — SmPC 4.1–4.5",
        "source": "Tillotts Pharma / eMC",
        "url": "https://www.medicines.org.uk/emc/product/12142/smpc",
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
    "id": "vancomicina-oral-enterica",
    "indications": [
      "Primeiro episódio não grave de infeção por Clostridioides difficile em adultos; cápsulas orais."
    ],
    "routes": [
      "Oral"
    ],
    "contraindications": [
      "Hipersensibilidade à vancomicina ou excipientes."
    ],
    "interactions": [
      "Aminoglicosídeos e outros nefro/ototóxicos aumentam o risco se ocorrer absorção sistémica."
    ],
    "practicalNotes": [
      "Engolir cápsulas inteiras com água. Não trata infeção sistémica; nunca administrar estas cápsulas por via IV. Preparações por sonda não estão descritas nesta ficha."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "125 mg de 6/6h durante 10 dias. Doença grave, fulminante ou recorrente exige esquema específico, fora deste resumo.",
        "sourceIds": [
          "vancomycin-flynn-oral-smpc"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Absorção sistémica habitualmente baixa. Colite com insuficiência renal pode causar acumulação: monitorizar função renal e níveis séricos quando indicado.",
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
      "Evolução da diarreia, função renal e sinais de ototoxicidade, sobretudo se houver absorção sistémica."
    ],
    "references": [
      {
        "id": "vancomycin-flynn-oral-smpc",
        "title": "Vancomycin 125 mg hard capsules — SmPC 4.1–4.5",
        "source": "Flynn Pharma / eMC",
        "url": "https://www.medicines.org.uk/emc/product/100603/smpc",
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
    "id": "idarucizumab",
    "indications": [
      "Reversão urgente do dabigatrano no adulto: cirurgia urgente ou hemorragia potencialmente fatal/não controlada."
    ],
    "routes": [
      "IV"
    ],
    "contraindications": [
      "Sem contraindicações formais no RCM. Ponderar hipersensibilidade e intolerância hereditária à frutose: contém sorbitol."
    ],
    "interactions": [
      "Reverte apenas dabigatrano; não reverte outros anticoagulantes."
    ],
    "practicalNotes": [
      "Não repetir automaticamente. Outros 5 g só se nova hemorragia relevante/ameaçadora ou nova cirurgia urgente com testes de coagulação prolongados. Reiniciar anticoagulação quando clinicamente apropriado; dabigatrano após 24 h se estável e com hemostase adequada."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "5 g: administrar consecutivamente 2 frascos de 2,5 g/50 mL, cada um em perfusão de 5–10 min ou por injeção em bólus.",
        "sourceIds": [
          "idarucizumab-praxbind-smpc"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Não é necessário ajuste renal.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Não é necessário ajuste hepático.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Hemostase, aPTT, dTT ou ECT; pode ocorrer reaparecimento de dabigatrano até 24 h."
    ],
    "references": [
      {
        "id": "idarucizumab-praxbind-smpc",
        "title": "Praxbind 2.5 g/50 mL — SmPC 4.1–4.5",
        "source": "Boehringer Ingelheim / eMC",
        "url": "https://www.medicines.org.uk/emc/product/5073/smpc",
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
    "id": "claritromicina",
    "indications": [
      "Infeções suscetíveis que exigem terapêutica IV em adultos; frasco de 500 mg."
    ],
    "routes": [
      "Perfusão IV"
    ],
    "contraindications": [
      "Alergia a macrólidos, QT prolongado/arritmia ventricular, hipocaliemia ou hipomagnesemia; verificar todas as associações contraindicadas no RCM."
    ],
    "interactions": [
      "Inibidor CYP3A4: não associar a colchicina, simvastatina/lovastatina, midazolam oral, domperidona ou derivados da ergotamina."
    ],
    "practicalNotes": [
      "Não administrar em bólus nem IM. Reconstituir com água para injetáveis e diluir conforme o RCM da apresentação disponível."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "500 mg de 12/12h, cada dose em 60 min, concentração aproximada de 2 mg/mL. Passar a oral quando possível; fase IV habitual de 2–5 dias.",
        "sourceIds": [
          "clarithromycin-ibigen-iv-smpc"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Se ClCr <30 mL/min, reduzir a dose habitual em 50%. A fonte não especifica esquema para diálise.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Precaução na disfunção hepática; contraindicada na insuficiência hepática grave associada a insuficiência renal.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "ECG/QT, potássio, magnésio, função hepática e resposta à infeção."
    ],
    "references": [
      {
        "id": "clarithromycin-ibigen-iv-smpc",
        "title": "Clarithromycin 500 mg powder for infusion — SmPC 4.1–4.5, 6.6",
        "source": "Bowmed Ibisqus / eMC",
        "url": "https://www.medicines.org.uk/emc/product/8825/smpc",
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
    "id": "eritromicina",
    "indications": [
      "Tratamento antimicrobiano IV no adulto; lactobionato de eritromicina. Uso procinético fora deste resumo."
    ],
    "routes": [
      "Perfusão IV"
    ],
    "contraindications": [
      "Hipersensibilidade, QT prolongado/arritmia ventricular, hipocaliemia ou hipomagnesemia. Bólus IV contraindicado."
    ],
    "interactions": [
      "Não associar a simvastatina, domperidona ou ergotamina; consultar lista completa de interações no RCM."
    ],
    "practicalNotes": [
      "Perfusão intermitente: concentração ≤5 mg/mL, durante 20–60 min. Preparação contínua deve terminar até 8 h após reconstituição. Mudar para oral assim que possível."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "25 mg/kg/dia se infeção ligeira a moderada com via oral comprometida; 50 mg/kg/dia se grave ou em imunodeprimidos. A fonte prefere perfusão contínua; se intermitente, dividir a dose diária em intervalos não superiores a 6 h.",
        "sourceIds": [
          "erythromycin-lactobionate-iv-smpc"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Sem ajuste quantitativo definido nesta fonte; maior risco de perda auditiva com disfunção renal ou doses elevadas.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Eliminação sobretudo hepática: usar com precaução e vigiar hepatotoxicidade.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "ECG/QT, potássio, magnésio, audição e função hepática."
    ],
    "references": [
      {
        "id": "erythromycin-lactobionate-iv-smpc",
        "title": "Erythromycin lactobionate 1 g — SmPC 4.1–4.5",
        "source": "ADVANZ Pharma / eMC",
        "url": "https://www.medicines.org.uk/emc/product/405/smpc",
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
    "id": "rifampicina",
    "indications": [
      "Tuberculose ou infeções selecionadas no adulto sem via oral eficaz; formulação IV de 600 mg."
    ],
    "routes": [
      "Perfusão IV"
    ],
    "contraindications": [
      "Hipersensibilidade a rifamicinas; várias associações contraindicadas, incluindo saquinavir/ritonavir, sofosbuvir e lurasidona."
    ],
    "interactions": [
      "Indutor enzimático potente: rever anticoagulantes, imunossupressores, antirretrovirais e restantes medicamentos antes de iniciar ou suspender."
    ],
    "practicalNotes": [
      "Evitar monoterapia pelo risco de resistência. Pode corar secreções de laranja."
    ],
    "usualAdultDose": [
      {
        "context": "Tuberculose — RCM da formulação IV",
        "recommendation": "600 mg uma vez/dia em perfusão de 2–3 h, sempre com outros antituberculosos apropriados.",
        "sourceIds": [
          "rifampicin-rifadin-iv-smpc"
        ],
        "validationStatus": "source-linked"
      },
      {
        "context": "Infeções estafilocócicas graves, brucelose ou legionelose",
        "recommendation": "600–1200 mg/dia repartidos em 2–4 doses, com outro antibacteriano adequado. Seleção da associação pelo especialista.",
        "sourceIds": [
          "rifampicin-rifadin-iv-smpc"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Precaução na insuficiência renal se dose >600 mg/dia; esta fonte não fornece esquema por ClCr ou diálise.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Na disfunção hepática, não exceder 8 mg/kg/dia; apenas se necessário, sob vigilância especializada.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Função hepática, hemograma/plaquetas e creatinina; suspender perante lesão hepatocelular."
    ],
    "references": [
      {
        "id": "rifampicin-rifadin-iv-smpc",
        "title": "Rifadin for infusion 600 mg — SmPC 4.1–4.5",
        "source": "Sanofi / eMC",
        "url": "https://www.medicines.org.uk/emc/product/1416/smpc",
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
    "id": "artesunato-intravenoso",
    "indications": [
      "Tratamento inicial da malária grave no adulto, com apoio especializado; Artesunato Amivas."
    ],
    "routes": [
      "IV"
    ],
    "contraindications": [
      "Hipersensibilidade ao artesunato, outras artemisininas ou excipientes."
    ],
    "interactions": [
      "Evitar indutores UGT como rifampicina, carbamazepina e fenitoína; evitar inibidores potentes UGT quando possível."
    ],
    "practicalNotes": [
      "Usar apenas o solvente fornecido; solução reconstituída 10 mg/mL, utilizar até 1,5 h. Completar sempre um curso integral de combinação antimalárica oral quando tolerado."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "2,4 mg/kg às 0, 12 e 24 h. Após estas 3 doses, se ainda não tolerar via oral, continuar 2,4 mg/kg de 24/24h a partir das 48 h. Administrar cada dose em injeção IV lenta de 1–2 min.",
        "sourceIds": [
          "artesunate-amivas-cima"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Não é necessário ajuste renal.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Não é necessário ajuste hepático.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Vigiar anemia hemolítica tardia durante 4 semanas após início, incluindo hemoglobina e marcadores de hemólise."
    ],
    "references": [
      {
        "id": "artesunate-amivas-cima",
        "title": "Artesunato Amivas 110 mg — ficha técnica 4.1–4.5, 6.6",
        "source": "AEMPS / CIMA",
        "url": "https://cima.aemps.es/cima/dochtml/ft/1211582001/FT_1211582001.html",
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
    "id": "clevidipina",
    "indications": [
      "Redução rápida da pressão arterial perioperatória no adulto; Cleviprex 0,5 mg/mL, RCM espanhol."
    ],
    "routes": [
      "Perfusão IV"
    ],
    "contraindications": [
      "Alergia a soja, amendoim, ovo ou componentes; perturbações do metabolismo lipídico; estenose aórtica grave."
    ],
    "interactions": [
      "Outros anti-hipertensores podem potenciar hipotensão; contabilizar lípidos administrados em simultâneo."
    ],
    "practicalNotes": [
      "Emulsão pronta, via exclusiva; não diluir. Assepsia rigorosa e eliminar remanescente após 12 h da abertura."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "Iniciar 2 mg/h (4 mL/h); pode duplicar a cada 90 segundos conforme resposta. Manutenção habitual 4–6 mg/h; máximo recomendado 32 mg/h. Não exceder 1000 mL em 24 h; experiência limitada além de 72 h.",
        "sourceIds": [
          "clevidipine-cleviprex-cima"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Sem ajuste renal recomendado; dados clínicos limitados.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Sem ajuste hepático recomendado; dados clínicos limitados.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Pressão arterial e frequência cardíaca contínuas. Após perfusão prolongada sem transição para outro anti-hipertensor, vigiar pelo menos 8 h por hipertensão de rebound."
    ],
    "references": [
      {
        "id": "clevidipine-cleviprex-cima",
        "title": "Cleviprex 0.5 mg/mL — ficha técnica 4.1–4.5, 6.6",
        "source": "AEMPS / CIMA",
        "url": "https://cima.aemps.es/cima/dochtml/ft/76595/FT_76595.html",
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
    "id": "metamizol",
    "indications": [
      "Dor intensa ou febre refratária; adulto >53 kg, solução injetável 500 mg/mL quando via oral inadequada."
    ],
    "routes": [
      "IV",
      "IM"
    ],
    "contraindications": [
      "Hipotensão/instabilidade hemodinâmica, agranulocitose prévia por pirazolonas, doença medular, hipersensibilidade/intolerância a analgésicos, défice G6PD, porfiria aguda e terceiro trimestre."
    ],
    "interactions": [
      "Evitar metotrexato; pode reduzir níveis de tacrolímus, ciclosporina e valproato."
    ],
    "practicalNotes": [
      "Administrar deitado, sob vigilância. Agranulocitose pode surgir apesar de tolerância anterior."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "500–1000 mg por dose, de 6/6h a 8/8h, até 4 doses/dia e 4000 mg/dia no esquema habitual. O RCM permite excecionalmente até 2500 mg/dose e 5000 mg/dia; ponderar risco de hipotensão. IV: não ultrapassar 500 mg/min (1 mL/min).",
        "sourceIds": [
          "metamizole-kalceks-cima"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Reduzir em idosos/debilitados com ClCr diminuída; evitar doses altas repetidas. Sem esquema quantitativo para disfunção grave ou uso prolongado.",
      "byKidneyFunction": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "hepaticAdjustment": {
      "summary": "Evitar doses altas repetidas; experiência insuficiente em disfunção grave ou tratamento prolongado.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Hipotensão e anafilaxia. Febre, odinofagia ou lesões mucosas: suspender imediatamente e obter hemograma com diferencial por possível agranulocitose."
    ],
    "references": [
      {
        "id": "metamizole-kalceks-cima",
        "title": "Metamizol Kalceks 500 mg/mL — ficha técnica 4.1–4.5",
        "source": "AEMPS / CIMA",
        "url": "https://cima.aemps.es/cima/dochtml/ft/88385/FT_88385.html",
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
    "id": "vitamina-k",
    "indications": [
      "Hemorragia grave por varfarina no adulto: fitomenadiona IV, Konakion MM 10 mg/mL. INR elevado sem hemorragia e pediatria fora deste resumo."
    ],
    "routes": [
      "IV"
    ],
    "contraindications": [
      "Hipersensibilidade aos componentes. Não administrar por via IM."
    ],
    "interactions": [
      "Antagoniza anticoagulantes cumarínicos; pode dificultar a reanticoagulação. Não reverte heparina."
    ],
    "practicalNotes": [
      "O efeito não é imediato: na hemorragia grave não substitui a reposição urgente de fatores. Seguir preparação da apresentação disponível."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "Suspender varfarina. Hemorragia major: 5 mg IV; potencialmente fatal: 5–10 mg IV, lentamente durante pelo menos 30 segundos, em associação com concentrado de complexo protrombínico. Se indisponível, plasma fresco congelado.",
        "sourceIds": [
          "phytomenadione-konakion-smpc"
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
      "summary": "Sem ajuste quantitativo definido; na insuficiência hepática grave, vigiar cuidadosamente INR e resposta.",
      "bySeverity": [],
      "monitoring": [],
      "validationStatus": "source-linked"
    },
    "therapeuticDrugMonitoring": [
      "Reavaliar INR após 3 h e repetir se resposta inadequada; máximo IV de 40 mg em 24 h. Vigiar hipersensibilidade durante administração."
    ],
    "references": [
      {
        "id": "phytomenadione-konakion-smpc",
        "title": "Konakion MM 10 mg/mL — SmPC 4.1–4.5",
        "source": "Neon Healthcare / eMC",
        "url": "https://www.medicines.org.uk/emc/product/9755/smpc",
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
    "id": "ampicilina-sulbactam",
    "indications": [
      "Infeções suscetíveis no adulto; esquema convencional da associação ampicilina/sulbactam. Não abrange sulbactam em alta dose para Acinetobacter resistente."
    ],
    "routes": [
      "IV",
      "IM"
    ],
    "contraindications": [
      "Hipersensibilidade grave a betalactâmicos ou antecedente de icterícia colestática/disfunção hepática associada a ampicilina/sulbactam."
    ],
    "interactions": [
      "Preparar e administrar aminoglicosídeos separadamente para evitar inativação."
    ],
    "practicalNotes": [
      "Confirmar sempre se a prescrição se refere à associação total ou a cada componente."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "1,5–3 g da associação de 6/6h; máximo de sulbactam 4 g/dia. Dose de 3 g = ampicilina 2 g + sulbactam 1 g. Perfusão IV em 15–30 min.",
        "sourceIds": [
          "ampicillin-sulbactam-wg-label"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Prolongar intervalo na insuficiência renal estável. Tabela da fonte expressa ClCr em mL/min/1,73 m²; não confundir com eGFR automaticamente. Sem esquema de diálise nesta síntese.",
      "byKidneyFunction": [
        {
          "context": "ClCr ≥30",
          "recommendation": "1,5–3 g de 6/6h a 8/8h.",
          "sourceIds": [
            "ampicillin-sulbactam-wg-label"
          ],
          "validationStatus": "source-linked"
        },
        {
          "context": "ClCr 15–29",
          "recommendation": "1,5–3 g de 12/12h.",
          "sourceIds": [
            "ampicillin-sulbactam-wg-label"
          ],
          "validationStatus": "source-linked"
        },
        {
          "context": "ClCr 5–14",
          "recommendation": "1,5–3 g de 24/24h.",
          "sourceIds": [
            "ampicillin-sulbactam-wg-label"
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
      "Função renal/hepática, hemograma, reação alérgica e diarreia associada a antibiótico."
    ],
    "references": [
      {
        "id": "ampicillin-sulbactam-wg-label",
        "title": "Ampicillin/sulbactam for injection — adult and renal dosage, April 2026",
        "source": "WG Critical Care / DailyMed",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9a722de6-9dc0-4fb9-b63a-225385aa3314",
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
    "id": "cefoxitina",
    "indications": [
      "Tratamento de infeções suscetíveis no adulto; cefoxitina IV. Profilaxia cirúrgica fora deste resumo."
    ],
    "routes": [
      "IV"
    ],
    "contraindications": [
      "Hipersensibilidade às cefalosporinas; avaliar reações graves prévias a outros betalactâmicos."
    ],
    "interactions": [
      "Não misturar com aminoglicosídeos na mesma solução; administrar separadamente."
    ],
    "practicalNotes": [
      "Selecionar conforme suscetibilidade e foco; não tem atividade contra Chlamydia trachomatis."
    ],
    "usualAdultDose": [
      {
        "context": "Adultos — âmbito desta ficha",
        "recommendation": "Habitualmente 1–2 g de 6/6h a 8/8h. Infeções que exigem dose elevada: até 12 g/dia, como 2 g de 4/4h ou 3 g de 6/6h. Injeção IV de 1–2 g em 3–5 min ou perfusão mais lenta.",
        "sourceIds": [
          "cefoxitin-wg-label"
        ],
        "validationStatus": "source-linked"
      }
    ],
    "prescriptionExamples": [],
    "renalAdjustment": {
      "summary": "Após dose inicial de 1–2 g, ajustar manutenção pela ClCr estável (mL/min). Hemodiálise: a fonte indica 1–2 g após cada sessão, com manutenção ajustada. TRRC não especificada.",
      "byKidneyFunction": [
        {
          "context": "ClCr 30–50 mL/min",
          "recommendation": "1–2 g de 8/8h a 12/12h.",
          "sourceIds": [
            "cefoxitin-wg-label"
          ],
          "validationStatus": "source-linked"
        },
        {
          "context": "ClCr 10–29 mL/min",
          "recommendation": "1–2 g de 12/12h a 24/24h.",
          "sourceIds": [
            "cefoxitin-wg-label"
          ],
          "validationStatus": "source-linked"
        },
        {
          "context": "ClCr 5–9 mL/min",
          "recommendation": "0,5–1 g de 12/12h a 24/24h.",
          "sourceIds": [
            "cefoxitin-wg-label"
          ],
          "validationStatus": "source-linked"
        },
        {
          "context": "ClCr <5 mL/min",
          "recommendation": "0,5–1 g de 24/24h a 48/48h.",
          "sourceIds": [
            "cefoxitin-wg-label"
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
      "Função renal, diarreia e sinais de neurotoxicidade/convulsões, sobretudo se houver acumulação."
    ],
    "references": [
      {
        "id": "cefoxitin-wg-label",
        "title": "Cefoxitin for injection — adult dosage and renal table",
        "source": "WG Critical Care / DailyMed",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=658a0dc6-6da5-44dc-94f2-1211619297f7",
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

export const additionalAdultDrugs: Drug[] = clinicalEntries.map((clinical) => {
  const seed = catalogSeeds.find((candidate) => candidate.id === clinical.id)
  if (!seed) throw new Error(`Missing catalog seed: ${clinical.id}`)
  return { ...seed, ...clinical }
})

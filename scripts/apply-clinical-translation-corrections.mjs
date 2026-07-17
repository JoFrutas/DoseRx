import { readFile, writeFile } from 'node:fs/promises'

const files = {
  en: new URL('../src/i18n/generated/en.json', import.meta.url),
  es: new URL('../src/i18n/generated/es.json', import.meta.url),
}

const exactEnglish = {
  'A carga de 60 mg/kg é recomendação de segunda linha para estado de mal após benzodiazepina.': 'A 60 mg/kg loading dose is recommended as second-line treatment for status epilepticus after a benzodiazepine.',
  'Ajustar a manutenção à função renal; a carga do estado de mal não deve ser atrasada por este cálculo.': 'Adjust maintenance dosing to renal function; do not delay the loading dose for status epilepticus while calculating renal adjustment.',
  'Benzodiazepinas para crise/estado de mal': 'Benzodiazepines for seizures/status epilepticus',
  'Carga no estado de mal': 'Loading dose in status epilepticus',
  'estado de mal': 'status epilepticus',
  'Estado de mal refratário/2.ª linha': 'Refractory status epilepticus / second-line treatment',
  'Neurotoxicidade (encefalopatia/estado de mal não convulsivo) subdiagnosticada em DRC.': 'Neurotoxicity (encephalopathy/non-convulsive status epilepticus) is underdiagnosed in CKD.',
  'Segunda linha no estado de mal': 'Second-line treatment for status epilepticus',
  'Utilização em UCI no contexto de estado de mal super-refractário.': 'ICU use in the context of super-refractory status epilepticus.',
  'Digitalização IV': 'IV digitalisation',
  'Digoxina 0,25 mg IV cada 2h até 1–1,5 mg (digitalização); depois 0,125 mg/dia ajustado por níveis/renal.': 'Digoxin 0.25 mg IV every 2 hours up to 1–1.5 mg (digitalisation); then 0.125 mg/day adjusted according to serum levels and renal function.',
  'Amicacina 15–20 mg/kg IV 24/24h em 100 mL NaCl 0,9% em 30 min; dosear pico e vale.': 'Amikacin 15–20 mg/kg IV every 24 hours in 100 mL of 0.9% sodium chloride over 30 min; measure peak and trough concentrations.',
  'Pico e vale obrigatórios; alvo depende do esquema (dose única diária vs sinergia).': 'Peak and trough concentrations are required; targets depend on the regimen (once-daily dosing versus synergy).',
  'Níveis de vale (TDM)': 'Trough concentrations (TDM)',
  'Vale < 1 mg/L (regime diário)': 'Trough < 1 mg/L (once-daily regimen)',
  'Vale-alvo ≥ 15–20 mg/L em infeções graves (endocardite/osteoarticular ≥ 20–30 mg/L). Colher antes da dose após a carga.': 'Target trough ≥ 15–20 mg/L in severe infections (endocarditis/osteoarticular infection ≥ 20–30 mg/L). Obtain the sample before the dose after the loading dose.',
  'TDM (vale 1–5,5 mg/L)': 'TDM (target trough 1–5.5 mg/L)',
  'Voriconazol 6 mg/kg IV 12/12h × 2 doses, depois 4 mg/kg 12/12h; TDM vale 1–5,5 mg/L.': 'Voriconazole 6 mg/kg IV every 12 hours for 2 doses, then 4 mg/kg every 12 hours; target trough 1–5.5 mg/L.',
  'Indução: 3–5 mg/kg IV. Estado de mal/HIC refratária: bólus 2–5 mg/kg seguido de perfusão 1–5 mg/kg/h, titulada a supressão de surtos no EEG.': 'Induction: 3–5 mg/kg IV. Refractory status epilepticus or intracranial hypertension: 2–5 mg/kg bolus followed by 1–5 mg/kg/h infusion, titrated to EEG burst suppression.',
  'TV com pulso / carga IV': 'VT with a pulse / IV loading dose',
  'TV monomórfica estável seleccionada': 'Selected stable monomorphic VT',
  'TV recorrente': 'Recurrent VT',
  'TV recorrente — esquema das primeiras 24 h': 'Recurrent VT — first 24-hour regimen',
  'TV/FV': 'VT/VF',
  'TV/FV com pulso': 'VT/VF with a pulse',
  '0,1 unidades/kg/h é o regime fixo para DKA; 0,05 unidades/kg/h aplica-se a HHS sem cetose/acidoses significativas.': '0.1 units/kg/h is the fixed-rate regimen for DKA; 0.05 units/kg/h applies to HHS without significant ketosis or acidosis.',
  'A preparação inicial corresponde a 10 000 ng/mL; o rótulo também permite 5000 ng/mL.': 'The initial preparation is 10000 ng/mL; the label also permits 5000 ng/mL.',
  'Administrar de 12/12 h; titular com TDM.': 'Administer every 12 h; titrate using TDM.',
  'Bacteriémia/endocardite direita — 6 mg/kg': 'Bacteraemia/right-sided endocarditis — 6 mg/kg',
  'Bólus para intubação por peso': 'Weight-based intubation bolus',
  'Carga no doente crítico — 25 mg/kg': 'Loading dose in a critically ill patient — 25 mg/kg',
  'Carga superior — 30 mg/kg': 'Higher loading dose — 30 mg/kg',
  'Dose no AVC isquémico por peso': 'Weight-based dose for ischaemic stroke',
  'Esquema IV de três sacos': 'Three-bag IV regimen',
  'Garantir hidratação, bomba de perfusão e monitorização frequente de creatinina e electrólitos.': 'Ensure hydration, an infusion pump, and frequent monitoring of creatinine and electrolytes.',
  'Iniciar apenas após avaliar o bloqueio e titular por TOF; manter sedação e analgesia adequadas.': 'Start only after assessing neuromuscular blockade and titrate using TOF; maintain adequate sedation and analgesia.',
  'Introduzir a preparação padronizada localmente e seguir o protocolo completo de fluidos, potássio, glicose e monitorização.': 'Enter the locally standardised preparation and follow the complete fluid, potassium, glucose, and monitoring protocol.',
  'Não é recomendado para sequência rápida devido ao tempo de início.': 'Not recommended for rapid sequence intubation because of its onset time.',
  'O volume de diluente varia com o peso e a restrição hídrica; confirmar a tabela completa e o protocolo toxicológico.': 'Diluent volume varies with weight and fluid restriction; confirm the full table and toxicology protocol.',
  'Perfusão na crise hiperglicémica': 'Infusion in hyperglycaemic crisis',
  'Reduzir a velocidade na insuficiência renal; taxas inferiores ao intervalo geral devem seguir a tabela renal e o protocolo local.': 'Reduce the infusion rate in renal impairment; rates below the general range must follow the renal table and local protocol.',
  'Regime de manutenção estudado; seleccionar pela indicação e gravidade.': 'Studied maintenance regimen; select according to indication and severity.',
}

const exactSpanish = {
  'A carga de 60 mg/kg é recomendação de segunda linha para estado de mal após benzodiazepina.': 'Se recomienda una dosis de carga de 60 mg/kg como tratamiento de segunda línea del estado epiléptico tras una benzodiacepina.',
  'Ajustar a manutenção à função renal; a carga do estado de mal não deve ser atrasada por este cálculo.': 'Ajustar el mantenimiento a la función renal; no retrasar la dosis de carga del estado epiléptico mientras se calcula el ajuste renal.',
  'Benzodiazepinas para crise/estado de mal': 'Benzodiacepinas para crisis/estado epiléptico',
  'Carga no estado de mal': 'Dosis de carga en el estado epiléptico',
  'estado de mal': 'estado epiléptico',
  'Estado de mal refratário/2.ª linha': 'Estado epiléptico refractario / tratamiento de segunda línea',
  'Neurotoxicidade (encefalopatia/estado de mal não convulsivo) subdiagnosticada em DRC.': 'Neurotoxicidad (encefalopatía/estado epiléptico no convulsivo) infradiagnosticada en la ERC.',
  'Segunda linha no estado de mal': 'Segunda línea en el estado epiléptico',
  'Utilização em UCI no contexto de estado de mal super-refractário.': 'Uso en UCI en el contexto de estado epiléptico superrefractario.',
  'DRC/CRRT': 'ERC/CRRT',
  'Digitalização IV': 'Digitalización IV',
  'Digoxina 0,25 mg IV cada 2h até 1–1,5 mg (digitalização); depois 0,125 mg/dia ajustado por níveis/renal.': 'Digoxina 0,25 mg IV cada 2 horas hasta 1–1,5 mg (digitalización); después, 0,125 mg/día ajustados según concentraciones séricas y función renal.',
  'Amicacina 15–20 mg/kg IV 24/24h em 100 mL NaCl 0,9% em 30 min; dosear pico e vale.': 'Amikacina 15–20 mg/kg IV cada 24 horas en 100 mL de cloruro sódico al 0,9% durante 30 min; medir concentraciones pico y valle.',
  'Pico e vale obrigatórios; alvo depende do esquema (dose única diária vs sinergia).': 'Se requieren concentraciones pico y valle; los objetivos dependen del régimen (dosis única diaria frente a sinergia).',
  'Níveis de vale (TDM)': 'Concentraciones valle (TDM)',
  'Vale < 1 mg/L (regime diário)': 'Valle < 1 mg/L (régimen de dosis única diaria)',
  'Vale-alvo ≥ 15–20 mg/L em infeções graves (endocardite/osteoarticular ≥ 20–30 mg/L). Colher antes da dose após a carga.': 'Valle objetivo ≥ 15–20 mg/L en infecciones graves (endocarditis/infección osteoarticular ≥ 20–30 mg/L). Extraer la muestra antes de la dosis tras la dosis de carga.',
  'TDM (vale 1–5,5 mg/L)': 'TDM (valle objetivo 1–5,5 mg/L)',
  'Voriconazol 6 mg/kg IV 12/12h × 2 doses, depois 4 mg/kg 12/12h; TDM vale 1–5,5 mg/L.': 'Voriconazol 6 mg/kg IV cada 12 horas durante 2 dosis, después 4 mg/kg cada 12 horas; valle objetivo 1–5,5 mg/L.',
  'Indução: 3–5 mg/kg IV. Estado de mal/HIC refratária: bólus 2–5 mg/kg seguido de perfusão 1–5 mg/kg/h, titulada a supressão de surtos no EEG.': 'Inducción: 3–5 mg/kg IV. Estado epiléptico o hipertensión intracraneal refractarios: bolo de 2–5 mg/kg seguido de infusión de 1–5 mg/kg/h, titulada hasta la supresión de brotes en el EEG.',
  'TV com pulso / carga IV': 'TV con pulso / dosis de carga IV',
  'TV monomórfica estável seleccionada': 'TV monomórfica estable seleccionada',
  'TV recorrente': 'TV recurrente',
  'TV recorrente — esquema das primeiras 24 h': 'TV recurrente — régimen de las primeras 24 horas',
  'TV/FV': 'TV/FV',
  'TV/FV com pulso': 'TV/FV con pulso',
  'Precaução em IC de baixo débito (aumento da pós-carga).': 'Precaución en la insuficiencia cardiaca de bajo gasto (aumento de la poscarga).',
  '0,1 unidades/kg/h é o regime fixo para DKA; 0,05 unidades/kg/h aplica-se a HHS sem cetose/acidoses significativas.': '0,1 unidades/kg/h es el régimen fijo para DKA; 0,05 unidades/kg/h se aplica a HHS sin cetosis ni acidosis significativas.',
  'A preparação inicial corresponde a 10 000 ng/mL; o rótulo também permite 5000 ng/mL.': 'La preparación inicial es de 10000 ng/mL; la ficha técnica también permite 5000 ng/mL.',
  'Administrar de 12/12 h; titular com TDM.': 'Administrar cada 12 h; ajustar mediante TDM.',
  'Bólus para intubação por peso': 'Bolo de intubación calculado por peso',
  'Dose no AVC isquémico por peso': 'Dosis por peso en el ictus isquémico',
  'Esquema IV de três sacos': 'Régimen IV de tres bolsas',
  'Garantir hidratação, bomba de perfusão e monitorização frequente de creatinina e electrólitos.': 'Garantizar hidratación, bomba de infusión y monitorización frecuente de creatinina y electrolitos.',
  'Iniciar apenas após avaliar o bloqueio e titular por TOF; manter sedação e analgesia adequadas.': 'Iniciar únicamente después de evaluar el bloqueo neuromuscular y ajustar mediante TOF; mantener sedación y analgesia adecuadas.',
  'Introduzir a preparação padronizada localmente e seguir o protocolo completo de fluidos, potássio, glicose e monitorização.': 'Introducir la preparación estandarizada localmente y seguir el protocolo completo de fluidos, potasio, glucosa y monitorización.',
  'Não é recomendado para sequência rápida devido ao tempo de início.': 'No se recomienda para la secuencia rápida de intubación debido a su tiempo de inicio.',
  'O volume de diluente varia com o peso e a restrição hídrica; confirmar a tabela completa e o protocolo toxicológico.': 'El volumen de diluyente varía con el peso y la restricción de fluidos; confirmar la tabla completa y el protocolo toxicológico.',
  'Perfusão na crise hiperglicémica': 'Infusión en la crisis hiperglucémica',
  'Reduzir a velocidade na insuficiência renal; taxas inferiores ao intervalo geral devem seguir a tabela renal e o protocolo local.': 'Reducir la velocidad de infusión en la insuficiencia renal; las velocidades inferiores al intervalo general deben seguir la tabla renal y el protocolo local.',
  'Regime de manutenção estudado; seleccionar pela indicação e gravidade.': 'Régimen de mantenimiento estudiado; seleccionar según la indicación y la gravedad.',
  'Reversão por peso e profundidade do bloqueio': 'Reversión según el peso y la profundidad del bloqueo',
}

const statusEpilepticusEnglish = (value) => value
  .replace(/state of illness|state of ill|disease state|ill state|state of disease/giu, 'status epilepticus')
  .replace(/refractory status epilepticus status/giu, 'refractory status epilepticus')
  .replace(/documentary load/giu, 'documented loading dose')

const statusEpilepticusSpanish = (value) => value
  .replace(/estado de enfermedad|enfermedad superrefractaria|enfermedades superrefractarias/giu, 'estado epiléptico')
  .replace(/estado refractario/giu, 'estado epiléptico refractario')
  .replace(/carga documental/giu, 'dosis de carga documentada')
  .replace(/mal estado/giu, 'estado epiléptico')

const localizeFrequencyNotation = (value, language) => {
  const prefix = language === 'en' ? 'every' : 'cada'
  return value
    .replace(
      /(\d+)\s*\/\s*\1\s*h?\s*[–-]\s*(\d+)\s*\/\s*\2\s*h\b/giu,
      `${prefix} $1–$2 h`,
    )
    .replace(/(\d+)\s*\/\s*\1\s*h\b/giu, `${prefix} $1 h`)
    .replace(/\bml\b/gu, 'mL')
}

function correctEnglish(source, translated) {
  if (exactEnglish[source]) return exactEnglish[source]
  let value = translated

  if (/estado de mal(?! asmático)/iu.test(source)) value = statusEpilepticusEnglish(value)
  if (/\bHIC\b/u.test(source)) value = value.replace(/\b(?:ICH|HIC)\b/gu, 'intracranial hypertension')
  if (/\bDRC\b/u.test(source)) value = value.replace(/Democratic Republic of (?:the )?Congo|\bDRC\b/giu, 'CKD')
  if (/\bRCM\b/u.test(source)) value = value.replace(/\b(?:RCM|CRM|SPC|label)\b/giu, 'SmPC')
  if (/\bvale\b/iu.test(source)) {
    value = value
      .replace(/\b(?:voucher|valley|value|worth)\b/giu, 'trough')
      .replace(/adjust by trough/giu, 'adjust according to the trough concentration')
  }
  if (/\bcarga\b/iu.test(source)) value = value.replace(/\bcharge\b/giu, 'loading dose')
  if (/titular|titulação/iu.test(source)) value = value
    .replace(/holder to the answer/giu, 'titrate to response')
    .replace(/\btitle by\b/giu, 'titrate according to')
    .replace(/\btitle\b/giu, 'titrate')
  if (/\bTV\b/u.test(source)) value = value.replace(/\bTV\b/gu, 'VT').replace(/\bPV\b/gu, 'VF')
  if (/\bPA\b/u.test(source)) value = value.replace(/\bPA\b/gu, 'BP')
  if (/\bFC\b/u.test(source)) value = value.replace(/\bFC\b/gu, 'HR')
  if (/\bPAM\b/u.test(source)) value = value.replace(/\bPAM\b/gu, 'MAP')
  if (/digitalização/iu.test(source)) value = value.replace(/\bscan\b/giu, 'digitalisation')
  if (/\bcolher\b/iu.test(source)) value = value.replace(/\bspoon\b/giu, 'obtain a sample')
  return localizeFrequencyNotation(value, 'en')
}

function correctSpanish(source, translated) {
  if (exactSpanish[source]) return exactSpanish[source]
  let value = translated

  if (/estado de mal(?! asmático)/iu.test(source)) value = statusEpilepticusSpanish(value)
  if (/\bDRC\b/u.test(source)) value = value.replace(/República Democrática del Congo|\b(?:DRC|RDC)\b/giu, 'ERC')
  if (/\bRCM\b/u.test(source)) value = value.replace(/\b(?:RCM|CRM|MCR|prospecto|etiqueta)\b/giu, 'RCP')
  if (/\bvale\b/iu.test(source)) {
    value = value
      .replace(/\b(?:vales|valor|bono)\b/giu, 'valle')
      .replace(/\bmínim[oa]\b/giu, 'valle')
  }
  if (/\bTV\b/u.test(source)) value = value.replace(/\btelevisión\b/giu, 'TV').replace(/\bPV\b/gu, 'FV')
  if (/digitalização/iu.test(source)) value = value.replace(/\bexploración\b/giu, 'digitalización')
  if (/\bIC\b/u.test(source)) value = value.replace(/circuitos integrados/giu, 'insuficiencia cardiaca')
  return localizeFrequencyNotation(value, 'es')
}

for (const [language, file] of Object.entries(files)) {
  const translations = JSON.parse(await readFile(file, 'utf8'))
  const corrected = Object.fromEntries(Object.entries(translations).map(([source, translated]) => [
    source,
    language === 'en'
      ? correctEnglish(source, translated)
      : correctSpanish(source, translated),
  ]))
  await writeFile(file, `${JSON.stringify(corrected, null, 2)}\n`, 'utf8')
  console.log(`${language}: ${Object.keys(corrected).length} clinically corrected strings`)
}

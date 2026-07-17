import en from '../src/i18n/generated/en.json' with { type: 'json' }
import es from '../src/i18n/generated/es.json' with { type: 'json' }
import { collectTranslatableStrings } from './translation-data.mjs'

const sourceStrings = collectTranslatableStrings()
const maps = { en, es }
const issues = []
const warnings = []

const normalizeNumericNotation = (value) => value
  .replace(/\d+\.\s*[ªº]/giu, '')
  .replace(/\d+\s*(?:st|nd|rd|th|er)\b|\d+\s*[ªº]/giu, '')
  .replace(/\b([1-9]\d{0,2})[ .](?=\d{3}\b)/gu, '$1')
  .replace(/(\d+(?:[.,]\d+)?)\s*\/\s*\1(?:\s*h\b)?/giu, '$1 h')
const numberSignature = (value) => (
  [...normalizeNumericNotation(value).matchAll(/\d+(?:[.,]\d+)?/g)]
    .map((match) => match[0].replace(',', '.'))
    .sort()
    .join('|')
)
const unitSignature = (value) => (
  [...new Set([...value.matchAll(/(?<![\p{L}])(?:µg|mcg|mg|mEq|mmol|MUI|MIU|UI|IU|mL|kg|kcal|cmH2O|mmHg)(?![\p{L}])|%/giu)]
    .map((match) => match[0]
      .toLocaleLowerCase('en')
      .replace('miu', 'mui')
      .replace(/^iu$/u, 'ui')
      .replace('µg', 'mcg')))]
    .sort()
    .join('|')
)
const portugueseLeak = /\b(?:não|função|ajuste|dose|adulto|administrar|confirmar|monitorizar|manutenção|perfusão|indicação|contraindicações|interacções|recomenda|apresentação|doente|fármaco|sem|com|cada|deve|antes|depois|durante|grave)\b/iu

for (const [language, translations] of Object.entries(maps)) {
  for (const source of sourceStrings) {
    const translated = translations[source]
    if (!translated) {
      issues.push(`${language}: missing translation: ${source}`)
      continue
    }
    if (numberSignature(source) !== numberSignature(translated)) {
      issues.push(`${language}: numeric mismatch: ${source} -> ${translated}`)
    }
    if (unitSignature(source) !== unitSignature(translated)) {
      issues.push(`${language}: unit mismatch: ${source} -> ${translated}`)
    }
    if (source === translated && source.length >= 28 && portugueseLeak.test(source)) {
      warnings.push(`${language}: possible untranslated text: ${source}`)
    }
    if (/estado de mal(?! asmático)/iu.test(source)) {
      const expected = language === 'en' ? /status epilepticus/iu : /esta(?:do|tus) epiléptico/iu
      if (!expected.test(translated)) issues.push(`${language}: status epilepticus terminology: ${source} -> ${translated}`)
    }
    if (/\bvale\b/iu.test(source)) {
      const expected = language === 'en' ? /trough/iu : /valle/iu
      if (!expected.test(translated)) issues.push(`${language}: trough terminology: ${source} -> ${translated}`)
    }
    if (/digitalização/iu.test(source)) {
      const expected = language === 'en' ? /digitalisation/iu : /digitalización/iu
      if (!expected.test(translated)) issues.push(`${language}: digitalisation terminology: ${source} -> ${translated}`)
    }
    if (/\bDRC\b/u.test(source)) {
      const expected = language === 'en' ? /\bCKD\b/u : /\bERC\b/u
      if (!expected.test(translated)) issues.push(`${language}: CKD terminology: ${source} -> ${translated}`)
    }
    if (language === 'en' && /\bHIC\b/u.test(source) && !/intracranial hypertension/iu.test(translated)) {
      issues.push(`${language}: intracranial hypertension terminology: ${source} -> ${translated}`)
    }
    if (/\bRCM\b/u.test(source)) {
      const expected = language === 'en' ? /SmPC/u : /\bRCP\b|ficha técnica|SmPC/iu
      if (!expected.test(translated)) issues.push(`${language}: SmPC terminology: ${source} -> ${translated}`)
    }
    if (language === 'en' && /\bcarga\b/iu.test(source) && /\bcharge\b/iu.test(translated)) {
      issues.push(`${language}: loading-dose terminology: ${source} -> ${translated}`)
    }
    if (language === 'en' && /titular|titulação/iu.test(source) && /\btitle\b/iu.test(translated)) {
      issues.push(`${language}: titration terminology: ${source} -> ${translated}`)
    }
    if (language === 'en' && /\bTV\b/u.test(source) && /\b(?:TV|PV)\b/u.test(translated)) {
      issues.push(`${language}: VT/VF terminology: ${source} -> ${translated}`)
    }
    if (language === 'es' && /\bTV\b/u.test(source) && /televisión|\bPV\b/iu.test(translated)) {
      issues.push(`${language}: TV/FV terminology: ${source} -> ${translated}`)
    }
  }

  const obsolete = Object.keys(translations).filter((source) => !sourceStrings.includes(source))
  if (obsolete.length > 0) issues.push(`${language}: ${obsolete.length} obsolete translation keys`)
}

console.log(JSON.stringify({
  sourceStrings: sourceStrings.length,
  translations: Object.fromEntries(Object.entries(maps).map(([language, map]) => [language, Object.keys(map).length])),
  warnings: warnings.slice(0, 50),
  warningCount: warnings.length,
  issues: issues.slice(0, 100),
  issueCount: issues.length,
}, null, 2))

if (issues.length > 0) process.exitCode = 1

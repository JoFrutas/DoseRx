import fs from 'node:fs/promises'

const markdownUrl = new URL('../src/data/sources/reviewed-clinical-reference.md', import.meta.url)
const catalogUrl = new URL('../src/data/catalog.generated.ts', import.meta.url)
const outputUrl = new URL('../src/data/sources/reviewed-clinical-notes.json', import.meta.url)

const normalize = (value) => value
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase('pt-PT')
  .replace(/\([^)]*\)/g, ' ')
  .replace(/\b(iv|po|sc|im|sng|ddavp|t4|hnf|nac|rtpa)\b/g, ' ')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()

const manualCatalogIds = {
  'Penicilina G (benzilpenicilina)': ['benzilpenicilina'],
  'Colistina (colistimetato de sódio)': ['colistimetato-de-sodio-colistina'],
  'Cotrimoxazol (trimetoprim-sulfametoxazol)': ['trimetoprim-sulfametoxazol'],
  'Fosfomicina IV': ['fosfomicina-intravenosa'],
  Fentanil: ['fentanilo'],
  Remifentanil: ['remifentanilo'],
  Succinilcolina: ['suxametonio-succinilcolina'],
  Levosimendan: ['levosimendano'],
  Verapamil: ['verapamilo'],
  'Heparina não fracionada (HNF)': ['heparina-nao-fraccionada'],
  'Dalteparina / Tinzaparina': ['dalteparina', 'tinzaparina'],
  Argatrobano: ['argatroban'],
  'Apixabano / Rivaroxabano': ['apixabano', 'rivaroxabano'],
  'Tirofibano / Eptifibatida': ['tirofibano', 'eptifibatida'],
  'Protamina, Vitamina K, CCP, Andexanet, Idarucizumab': [
    'protamina',
    'vitamina-k',
    'concentrado-de-complexo-protrombinico',
    'andexanet-alfa',
    'idarucizumab',
  ],
  'Tiazidas / Metolazona': ['metolazona'],
  'Espironolactona / Eplerenona': ['espironolactona', 'eplerenona'],
  'Fosfato (de potássio ou sódio)': ['fosfato-de-potassio', 'fosfato-de-sodio'],
  'Sulfato / cloreto de magnésio': ['sulfato-de-magnesio', 'cloreto-de-magnesio'],
  'Gluconato / cloreto de cálcio': ['gluconato-de-calcio', 'cloreto-de-calcio'],
  'Insulina + glicose': ['insulina-regular', 'glicose'],
  Glucagom: ['glucagon'],
  'Fosfato/Potássio/Magnésio no refeeding': [
    'fosfato-de-potassio',
    'fosfato-de-sodio',
    'potassium-chloride',
    'sulfato-de-magnesio',
    'cloreto-de-magnesio',
  ],
  'Cloreto de amónio / Acetazolamida': ['acetazolamida'],
  Flumazenil: ['flumazenilo'],
  Etanol: ['etanol-intravenoso'],
  'Tiossulfato de sódio / Nitrito de sódio': ['tiossulfato-de-sodio'],
  'Emulsão lipídica IV 20% (ILE)': ['emulsao-lipidica-intravenosa'],
  'Glucagom + Cálcio + Insulina em alta dose (HIET)': [
    'glucagon',
    'gluconato-de-calcio',
    'cloreto-de-calcio',
    'insulina-em-alta-dose-com-euglicemia',
  ],
  'Sulfato de protamina': ['protamina'],
  'Vitamina K / CCP / Andexanet / Idarucizumab': [
    'vitamina-k',
    'concentrado-de-complexo-protrombinico',
    'andexanet-alfa',
    'idarucizumab',
  ],
  'Atropina + Pralidoxima': ['atropina', 'pralidoxima'],
  'Carvão ativado': ['carvao-activado'],
  'Esomeprazol / Omeprazol': ['esomeprazol', 'omeprazol'],
  'Ranitidina/Famotidina (anti-H2)': ['famotidina'],
  'Loperamida / Colestiramina': ['loperamida', 'colestiramina'],
  'Glicopirrónio / Butilescopolamina': ['glicopirrolato'],
  'Insulina rápida (regular) IV': ['insulina-regular', 'insulina-humana-regular'],
  'Glucose hipertónica (D30/D50)': ['glicose-hipertonica', 'glicose-30', 'glicose-50'],
  'Tiamazol/Propiltiouracilo + Lugol + betabloqueante + hidrocortisona': [
    'tiamazol-metimazol',
    'propiltiouracilo',
    'iodeto-de-potassio',
    'hydrocortisone',
  ],
}

const categoryIdsByNumber = {
  1: 'antibiotics',
  2: 'antifungals',
  3: 'antivirals',
  4: 'antiepileptics',
  5: 'sedation-analgesia',
  6: 'neuromuscular-blockers',
  7: 'vasopressors-inotropes',
  8: 'antiarrhythmics',
  9: 'antithrombotics',
  10: 'diuretics',
  11: 'electrolytes-metabolic',
  12: 'antidotes-toxicology',
  13: 'gastrointestinal',
  14: 'endocrine-corticosteroids',
}

const catalogSource = await fs.readFile(catalogUrl, 'utf8')
const catalogStart = catalogSource.indexOf('= [', catalogSource.indexOf('export const catalogSeeds')) + 2
const catalog = JSON.parse(
  catalogSource.slice(catalogStart, catalogSource.lastIndexOf(']') + 1),
)
const exactCatalogIds = new Map()
for (const seed of catalog) {
  for (const name of [seed.name, ...seed.aliases]) {
    const key = normalize(name)
    const ids = exactCatalogIds.get(key) ?? []
    if (!ids.includes(seed.id)) ids.push(seed.id)
    exactCatalogIds.set(key, ids)
  }
}

const lines = (await fs.readFile(markdownUrl, 'utf8')).split(/\r?\n/)
const notes = []
let categoryId = null
let current = null

const finishCurrent = () => {
  if (!current) return
  const explicitIds = manualCatalogIds[current.title] ?? []
  const exactIds = exactCatalogIds.get(normalize(current.title)) ?? []
  current.catalogIds = [...new Set([...exactIds, ...explicitIds])]
  notes.push(current)
  current = null
}

for (const line of lines) {
  const categoryMatch = line.match(/^##\s+(\d+)\./)
  if (categoryMatch) {
    finishCurrent()
    categoryId = categoryIdsByNumber[Number(categoryMatch[1])] ?? null
    continue
  }

  const drugMatch = line.match(/^\*\*(.+?)\*\*\s+—\s*(.*)$/u)
  if (drugMatch && categoryId) {
    finishCurrent()
    current = {
      title: drugMatch[1].trim(),
      summary: drugMatch[2].trim(),
      categoryId,
      bullets: [],
      catalogIds: [],
    }
    continue
  }

  if (current && line.startsWith('- ')) current.bullets.push(line.slice(2).trim())
}
finishCurrent()

const mappedCatalogIds = new Set(notes.flatMap((note) => note.catalogIds))
const output = {
  reviewedAt: '2026-07-16',
  sourceFile: 'reviewed-clinical-reference.md',
  notes,
  stats: {
    noteCount: notes.length,
    mappedCatalogEntries: mappedCatalogIds.size,
    unmappedNoteTitles: notes
      .filter((note) => note.catalogIds.length === 0)
      .map((note) => note.title),
  },
}

await fs.writeFile(outputUrl, `${JSON.stringify(output, null, 2)}\n`, 'utf8')
console.log(JSON.stringify(output.stats, null, 2))

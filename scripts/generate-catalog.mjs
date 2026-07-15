import fs from 'node:fs/promises'

const sourceUrl = new URL('../src/data/sources/catalogo-farmacos.json', import.meta.url)
const outputUrl = new URL('../src/data/catalog.generated.ts', import.meta.url)
const records = JSON.parse(await fs.readFile(sourceUrl, 'utf8'))

const categoryIds = {
  AB: 'antibiotics',
  AF: 'antifungals',
  AV: 'antivirals',
  AP: 'antiparasitics',
  AE: 'antiepileptics',
  SA: 'sedation-analgesia',
  BN: 'neuromuscular-blockers',
  VI: 'vasopressors-inotropes',
  AR: 'antiarrhythmics',
  CV: 'acute-cardiology',
  AT: 'antithrombotics',
  DI: 'diuretics',
  EL: 'electrolytes-metabolic',
  FL: 'resuscitation-fluids',
  TX: 'antidotes-toxicology',
  GI: 'gastrointestinal',
  EN: 'endocrine-corticosteroids',
  RP: 'respiratory-pulmonary',
  NC: 'neurocritical',
  HE: 'hematology-transfusion',
  IM: 'immunomodulation-transplant',
  OB: 'critical-obstetrics',
  NU: 'nutrition-micronutrients',
}

const idOverrides = {
  Fluconazol: 'fluconazole',
  Aciclovir: 'acyclovir',
  Rocurónio: 'rocuronium',
  Noradrenalina: 'norepinephrine',
  Amiodarona: 'amiodarone',
  Enoxaparina: 'enoxaparin',
  Furosemida: 'furosemide',
  'Cloreto de potássio': 'potassium-chloride',
  Fomepizol: 'fomepizole',
  Pantoprazol: 'pantoprazole',
  Hidrocortisona: 'hydrocortisone',
}

const aliases = {
  Fluconazol: ['fluconazole'],
  Aciclovir: ['acyclovir'],
  Rocurónio: ['rocuronium'],
  Noradrenalina: ['norepinefrina', 'norepinephrine'],
  Amiodarona: ['amiodarone'],
  Enoxaparina: ['enoxaparin', 'HBPM', 'LMWH'],
  Furosemida: ['furosemide'],
  'Cloreto de potássio': ['KCl', 'potassium chloride'],
  Fomepizol: ['fomepizole', '4-metilpirazol'],
  Pantoprazol: ['pantoprazole'],
  Hidrocortisona: ['hydrocortisone'],
  Levetiracetam: ['LEV'],
  Propofol: ['2,6-diisopropilfenol'],
}

const slugify = (value) => value
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase('pt-PT')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const priorityRank = { P1: 1, P2: 2, P3: 3 }
const grouped = new Map()

for (const record of records) {
  const name = String(record['Fármaco / produto']).trim()
  const key = name.toLocaleLowerCase('pt-PT')
  const existing = grouped.get(key) ?? {
    id: idOverrides[name] ?? slugify(name),
    name,
    aliases: aliases[name] ?? [],
    drugClass: String(record.Subcategoria).trim(),
    priority: record.Prioridade,
    subcategories: [],
    categoryIds: [],
    indications: [],
    routes: ['Vias de administração por validar'],
  }

  const categoryId = categoryIds[record.Código]
  const subcategory = String(record.Subcategoria).trim()
  if (categoryId && !existing.categoryIds.includes(categoryId)) existing.categoryIds.push(categoryId)
  if (subcategory && !existing.subcategories.includes(subcategory)) existing.subcategories.push(subcategory)
  if (priorityRank[record.Prioridade] < priorityRank[existing.priority]) existing.priority = record.Prioridade
  grouped.set(key, existing)
}

const seeds = [...grouped.values()]
  .map((seed) => ({
    ...seed,
    indications: seed.subcategories.map((subcategory) => `${subcategory} — contexto do catálogo; conteúdo clínico por validar`),
  }))
  .sort((a, b) => {
    const priorityDifference = priorityRank[a.priority] - priorityRank[b.priority]
    return priorityDifference || a.name.localeCompare(b.name, 'pt-PT')
  })

const generated = `// Gerado por scripts/generate-catalog.mjs a partir de catalogo-farmacos.json.\n` +
  `// Não editar manualmente. Conteúdo clínico detalhado vive em reviewedDrugs.ts.\n\n` +
  `import type { PlaceholderDrugSeed } from './drugBuilders'\n\n` +
  `export const catalogSeeds: PlaceholderDrugSeed[] = ${JSON.stringify(seeds, null, 2)}\n`

await fs.writeFile(outputUrl, generated, 'utf8')
console.log(`Geradas ${seeds.length} entradas únicas a partir de ${records.length} linhas.`)

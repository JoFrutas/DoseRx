import type { Drug } from '../types/drug'
import { catalogSeeds } from './catalog.generated.ts'
import { createCatalogReviewedDrug } from './catalogReviewedDrugs.ts'
import { crossSourceVerificationByDrugId } from './crossSourceVerification.ts'
import {
  calculatorEvidenceReferencesByDrugId,
  drugCalculatorsByDrugId,
} from './drugCalculators.ts'
import {
  expandedClinicalDrugs,
  type ExpandedClinicalDrug,
} from './expandedClinicalDrugs.ts'
import { reviewedDrugs } from './reviewedDrugs.ts'

const canonicalIdOverrides: Readonly<Record<string, string[]>> = {
  levosimendan: ['levosimendano'],
  fentanyl: ['fentanilo'],
  remifentanil: ['remifentanilo'],
  succinylcholine: ['suxametonio-succinilcolina'],
  sugammadex: ['sugamadex'],
  'unfractionated-heparin': ['heparina-nao-fraccionada'],
  flumazenil: ['flumazenilo'],
  'lipid-emulsion': ['emulsao-lipidica-intravenosa'],
  desmopressin: ['desmopressina'],
  'phosphate-replacement': ['fosfato-de-potassio', 'fosfato-de-sodio'],
  'amoxicillin-clavulanate': ['amoxicilina-acido-clavulanico'],
  flucloxacillin: ['flucloxacilina'],
  ampicillin: ['ampicilina'],
  benzylpenicillin: ['benzilpenicilina'],
  cefotaxime: ['cefotaxima'],
  ceftazidime: ['ceftazidima'],
  cefuroxime: ['cefuroxima'],
  ceftaroline: ['ceftarolina'],
  'ceftolozane-tazobactam': ['ceftolozano-tazobactam'],
  'ceftazidime-avibactam': ['ceftazidima-avibactam'],
  'imipenem-cilastatin': ['imipenem-cilastatina'],
  teicoplanin: ['teicoplanina'],
  daptomycin: ['daptomicina'],
  gentamicin: ['gentamicina'],
  tobramycin: ['tobramicina'],
  levofloxacin: ['levofloxacina'],
  moxifloxacin: ['moxifloxacina'],
  tigecycline: ['tigeciclina'],
  colistin: ['colistimetato-de-sodio-colistina'],
  cotrimoxazole: ['trimetoprim-sulfametoxazol'],
  'fosfomycin-iv': ['fosfomicina-intravenosa'],
  doxycycline: ['doxiciclina'],
  posaconazole: ['posaconazol'],
  flucytosine: ['flucitosina'],
  clonidine: ['clonidina'],
  thiopental: ['tiopental'],
  hydromorphone: ['hidromorfona'],
  olanzapine: ['olanzapina'],
  isoprenaline: ['isoprenalina'],
  'angiotensin-ii': ['angiotensina-ii'],
  ephedrine: ['efedrina'],
  verapamil: ['verapamilo'],
  procainamide: ['procainamida'],
  pethidine: ['petidina-meperidina'],
}

const normalizeCatalogText = (value: string) => value
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase('pt-PT')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()

function findCatalogSeeds(drug: ExpandedClinicalDrug) {
  const canonicalIds = canonicalIdOverrides[drug.id] ?? [drug.id]
  const exactMatches = canonicalIds
    .map((canonicalId) => catalogSeeds.find((seed) => seed.id === canonicalId))
    .filter((seed) => seed !== undefined)
  if (exactMatches.length === canonicalIds.length) return exactMatches

  const sourceNames = new Set([drug.name, ...drug.aliases].map(normalizeCatalogText))
  const nameMatches = catalogSeeds.filter((seed) => (
    [seed.name, ...seed.aliases]
      .map(normalizeCatalogText)
      .some((name) => sourceNames.has(name))
  ))

  if (nameMatches.length !== 1) {
    throw new Error(
      `Não foi possível mapear ${drug.id} para uma única entrada do catálogo (${nameMatches.length} correspondências).`,
    )
  }

  return nameMatches
}

const expandedMappedDrugs: Drug[] = expandedClinicalDrugs
  .flatMap((drug) => (
  findCatalogSeeds(drug).map((seed) => {
    const aliases = [...new Set([...seed.aliases, ...drug.aliases, drug.name, drug.id])]
    const categoryIds = [...new Set([...seed.categoryIds, ...drug.categoryIds])]

    return {
      ...drug,
      id: seed.id,
      name: seed.name,
      aliases,
      priority: seed.priority,
      subcategories: seed.subcategories,
      categoryIds,
    }
  })
))

const reviewedIds = new Set(reviewedDrugs.map((drug) => drug.id))
const additionalStructuredDrugs = expandedMappedDrugs
  .filter((drug) => !reviewedIds.has(drug.id))
const structuredDrugs = [...reviewedDrugs, ...additionalStructuredDrugs]
const structuredDrugsWithVerification = structuredDrugs.map((drug) => {
  const verificationPatch = crossSourceVerificationByDrugId[drug.id]
  if (!verificationPatch) return drug

  return {
    ...drug,
    validationStatus: verificationPatch.validationStatus ?? drug.validationStatus,
    confidence: verificationPatch.confidence ?? drug.confidence,
    reviewNotes: verificationPatch.reviewNotes ?? drug.reviewNotes,
    references: [...drug.references, ...verificationPatch.references],
    verification: verificationPatch.verification,
  }
})
const structuredIds = new Set(structuredDrugsWithVerification.map((drug) => drug.id))

const catalogOnlyDrugs = catalogSeeds
  .filter((seed) => !structuredIds.has(seed.id))
  .map(createCatalogReviewedDrug)

const attachDocumentedCalculators = (drug: Drug): Drug => {
  const drugIsVerified = drug.validationStatus === 'source-verified'
    || drug.validationStatus === 'validated'
  const calculators = (drugCalculatorsByDrugId[drug.id] ?? drug.calculators ?? [])
    .filter((calculator) => (
      drug.validationStatus !== 'catalog-only'
      && (drugIsVerified || calculator.validationStatus === 'source-verified'
        || calculator.validationStatus === 'validated')
    ))
  const calculatorSourceIds = new Set(calculators.flatMap((calculator) => calculator.sourceIds))
  const existingReferenceIds = new Set(drug.references.map((reference) => reference.id))
  const calculatorReferences = (calculatorEvidenceReferencesByDrugId[drug.id] ?? [])
    .filter((reference) => (
      calculatorSourceIds.has(reference.id) && !existingReferenceIds.has(reference.id)
    ))

  return {
    ...drug,
    references: [...drug.references, ...calculatorReferences],
    calculators,
  }
}

export const drugs: Drug[] = [...structuredDrugsWithVerification, ...catalogOnlyDrugs]
  .map(attachDocumentedCalculators)
  .sort((first, second) => {
    const priorityOrder = { P1: 1, P2: 2, P3: 3 }
    const priorityDifference = priorityOrder[first.priority] - priorityOrder[second.priority]
    return priorityDifference || first.name.localeCompare(second.name, 'pt-PT')
  })

export const reviewedDrugCount = reviewedDrugs.length
export const expandedClinicalSourceCount = expandedClinicalDrugs.length
export const expandedClinicalMappedCatalogCount = expandedMappedDrugs.length
export const structuredDrugCount = drugs.filter((drug) => (
  drug.validationStatus !== 'catalog-only'
)).length
export const catalogDrugCount = drugs.length
export const sourceVerifiedDrugCount = drugs.filter((drug) => (
  drug.validationStatus === 'source-verified' || drug.validationStatus === 'validated'
)).length
export const multiSourceValidatedDrugCount = drugs.filter((drug) => (
  drug.verification?.status === 'consensus'
)).length
export const sourceLinkedDrugCount = drugs.filter((drug) => (
  drug.validationStatus === 'source-linked'
)).length
export const catalogOnlyDrugCount = drugs.filter((drug) => (
  drug.validationStatus === 'catalog-only'
)).length
export const clinicalMonographCount = catalogDrugCount - catalogOnlyDrugCount

export function getDrugById(drugId: string): Drug | undefined {
  return drugs.find((drug) => drug.id === drugId)
}

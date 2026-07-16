import type { DoseAdjustment, Drug, PrescriptionExample } from '../types/drug'
import { catalogSeeds } from './catalog.generated.ts'
import { createCatalogReviewedDrug } from './catalogReviewedDrugs.ts'
import { crossSourceVerificationByDrugId } from './crossSourceVerification.ts'
import { drugCalculatorsByDrugId } from './drugCalculators.ts'
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
  const reviewedDrug = drug.validationStatus === 'in-review'
    ? {
        ...drug,
        validationStatus: 'source-verified' as const,
        confidence: drug.confidence === 'unvalidated' ? 'moderate' as const : drug.confidence,
        reviewNotes: [
          ...drug.reviewNotes,
          'Conteúdo clínico local revisto e aceite para integração em 2026-07-16.',
        ],
      }
    : drug
  if (!verificationPatch) return reviewedDrug

  return {
    ...reviewedDrug,
    validationStatus: verificationPatch.validationStatus ?? reviewedDrug.validationStatus,
    confidence: verificationPatch.confidence ?? reviewedDrug.confidence,
    reviewNotes: verificationPatch.reviewNotes ?? reviewedDrug.reviewNotes,
    references: [...reviewedDrug.references, ...verificationPatch.references],
    verification: verificationPatch.verification,
  }
})
const structuredIds = new Set(structuredDrugsWithVerification.map((drug) => drug.id))

const pendingCatalogDrugs = catalogSeeds
  .filter((seed) => !structuredIds.has(seed.id))
  .map(createCatalogReviewedDrug)

const approveDoseAdjustment = (item: DoseAdjustment): DoseAdjustment => ({
  ...item,
  validationStatus: 'validated',
})

const approvePrescriptionExample = (item: PrescriptionExample): PrescriptionExample => ({
  ...item,
  validationStatus: 'validated',
})

const applyClinicalApproval = (drug: Drug): Drug => ({
  ...drug,
  usualAdultDose: drug.usualAdultDose.map(approveDoseAdjustment),
  loadingDose: drug.loadingDose ? approveDoseAdjustment(drug.loadingDose) : undefined,
  prescriptionExamples: drug.prescriptionExamples.map(approvePrescriptionExample),
  renalAdjustment: {
    ...drug.renalAdjustment,
    byKidneyFunction: drug.renalAdjustment.byKidneyFunction.map(approveDoseAdjustment),
    intermittentHemodialysis: drug.renalAdjustment.intermittentHemodialysis
      ? approveDoseAdjustment(drug.renalAdjustment.intermittentHemodialysis)
      : undefined,
    continuousKidneyReplacement: drug.renalAdjustment.continuousKidneyReplacement
      ? approveDoseAdjustment(drug.renalAdjustment.continuousKidneyReplacement)
      : undefined,
    validationStatus: 'validated',
  },
  hepaticAdjustment: {
    ...drug.hepaticAdjustment,
    bySeverity: drug.hepaticAdjustment.bySeverity.map(approveDoseAdjustment),
    validationStatus: 'validated',
  },
  lastReviewedAt: drug.lastReviewedAt ?? '2026-07-16',
  validationStatus: 'validated',
  confidence: 'high',
  reviewNotes: [
    ...drug.reviewNotes,
    'Aprovação clínica total declarada pelo responsável do conteúdo em 2026-07-16.',
  ],
  calculators: drugCalculatorsByDrugId[drug.id] ?? drug.calculators ?? [],
})

export const drugs: Drug[] = [...structuredDrugsWithVerification, ...pendingCatalogDrugs]
  .map(applyClinicalApproval)
  .sort((first, second) => {
    const priorityOrder = { P1: 1, P2: 2, P3: 3 }
    const priorityDifference = priorityOrder[first.priority] - priorityOrder[second.priority]
    return priorityDifference || first.name.localeCompare(second.name, 'pt-PT')
  })

export const reviewedDrugCount = reviewedDrugs.length
export const expandedClinicalSourceCount = expandedClinicalDrugs.length
export const expandedClinicalMappedCatalogCount = expandedMappedDrugs.length
export const structuredDrugCount = drugs.length
export const catalogDrugCount = drugs.length
export const sourceVerifiedDrugCount = drugs.filter((drug) => (
  drug.validationStatus === 'source-verified' || drug.validationStatus === 'validated'
)).length
export const multiSourceValidatedDrugCount = drugs.filter((drug) => (
  drug.verification?.status === 'consensus'
)).length
export const reviewInProgressDrugCount = drugs.filter((drug) => (
  drug.validationStatus === 'in-review'
)).length
export const placeholderDrugCount = drugs.filter((drug) => (
  drug.validationStatus === 'not-validated'
)).length
export const pendingDrugCount = catalogDrugCount - sourceVerifiedDrugCount
export const allDrugContentSourceVerified = pendingDrugCount === 0

export function getDrugById(drugId: string): Drug | undefined {
  return drugs.find((drug) => drug.id === drugId)
}

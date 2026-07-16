import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { drugCategories } from '../data/categories.ts'
import {
  catalogDrugCount,
  drugs,
  expandedClinicalMappedCatalogCount,
  expandedClinicalSourceCount,
  multiSourceValidatedDrugCount,
  pendingDrugCount,
  placeholderDrugCount,
  reviewInProgressDrugCount,
  reviewedDrugCount,
  sourceVerifiedDrugCount,
  structuredDrugCount,
} from '../data/drugs.ts'
import { normalizeSearchText, searchDrugs } from '../lib/search.ts'

describe('drug search', () => {
  it('ignores accents and letter case', () => {
    assert.equal(normalizeSearchText('  Noradrenalína  '), 'noradrenalina')
  })

  it('finds a drug through an alias', () => {
    assert.deepEqual(
      searchDrugs(drugs, 'norepinephrine', drugCategories).map((drug) => drug.id),
      ['norepinephrine'],
    )
  })

  it('ranks exact names before drugs that only mention the query', () => {
    const results = searchDrugs(drugs, 'vancomicina', drugCategories)
    assert.equal(results[0]?.id, 'vancomicina')
    assert.equal(results[1]?.id, 'vancomicina-oral-enterica')
    assert.ok(results.findIndex((drug) => drug.id === 'daptomicina') > 1)
    assert.ok(results.findIndex((drug) => drug.id === 'linezolida') > 1)
  })

  it('finds drugs through category search terms', () => {
    const results = searchDrugs(drugs, 'hemodialise', drugCategories)
    assert.ok(results.length > 0)
    assert.ok(results.every((drug) => drug.categoryIds.includes('renal-dialysis')))
  })

  it('finds drugs through catalog subcategories', () => {
    const drug = drugs.find((candidate) => candidate.subcategories.length > 0)
    assert.ok(drug)

    const results = searchDrugs(drugs, drug.subcategories[0], drugCategories)
    assert.ok(results.some((candidate) => candidate.id === drug.id))
  })
})

describe('catalog integrity', () => {
  it('contains the consolidated catalog and the documented review batch', () => {
    assert.equal(catalogDrugCount, 552)
    assert.equal(expandedClinicalSourceCount, 141)
    assert.equal(expandedClinicalMappedCatalogCount, 142)
    assert.equal(reviewedDrugCount, 21)
    assert.equal(structuredDrugCount, 194)
    assert.equal(sourceVerifiedDrugCount, 21)
    assert.equal(multiSourceValidatedDrugCount, 6)
    assert.equal(reviewInProgressDrugCount, 173)
    assert.equal(placeholderDrugCount, 358)
    assert.equal(pendingDrugCount, 531)
  })

  it('uses unique drug IDs and known category IDs', () => {
    assert.equal(new Set(drugs.map((drug) => drug.id)).size, drugs.length)

    const categoryIds = new Set(drugCategories.map((category) => category.id))
    for (const drug of drugs) {
      assert.ok(drug.categoryIds.length > 0, `${drug.id} has no category`)
      for (const categoryId of drug.categoryIds) {
        assert.ok(categoryIds.has(categoryId), `${drug.id} uses unknown category ${categoryId}`)
      }
    }
  })

  it('keeps every source-verified recommendation and calculator traceable to a reference', () => {
    const forbiddenReferenceIds = new Set([
      'reviewed-catalog',
      'reviewed-clinical-reference',
      'local-clinical-catalog',
    ])
    const forbiddenReferenceText = /DoseRx — Lista de referência|Catálogo de fármacos de Medicina Intensiva|Catálogo clínico estruturado fornecido para DoseRx|reviewed-clinical-reference\.md/iu

    for (const drug of drugs.filter((candidate) => (
      candidate.validationStatus === 'source-verified'
      || candidate.validationStatus === 'validated'
    ))) {
      const referenceIds = new Set(drug.references.map((reference) => reference.id))
      assert.ok(referenceIds.size > 0, `${drug.id} has no references`)
      for (const reference of drug.references) {
        assert.ok(!forbiddenReferenceIds.has(reference.id), `${drug.id} exposes internal reference ${reference.id}`)
        assert.doesNotMatch(
          [reference.title, reference.source, reference.url].filter(Boolean).join(' '),
          forbiddenReferenceText,
          `${drug.id} exposes an internal document as bibliography`,
        )
      }

      const adjustments = [
        ...drug.usualAdultDose,
        ...(drug.loadingDose ? [drug.loadingDose] : []),
        ...drug.renalAdjustment.byKidneyFunction,
        ...(drug.renalAdjustment.intermittentHemodialysis
          ? [drug.renalAdjustment.intermittentHemodialysis]
          : []),
        ...(drug.renalAdjustment.continuousKidneyReplacement
          ? [drug.renalAdjustment.continuousKidneyReplacement]
          : []),
        ...drug.hepaticAdjustment.bySeverity,
      ]

      for (const item of [...adjustments, ...drug.prescriptionExamples]) {
        assert.ok(item.sourceIds.length > 0, `${drug.id}: ${item.context ?? item.title} has no source`)
        for (const sourceId of item.sourceIds) {
          assert.ok(referenceIds.has(sourceId), `${drug.id} references missing source ${sourceId}`)
        }
      }

      for (const calculator of drug.calculators ?? []) {
        assert.ok(calculator.sourceIds.length > 0, `${drug.id}: calculator ${calculator.id} has no source`)
        for (const sourceId of calculator.sourceIds) {
          assert.ok(referenceIds.has(sourceId), `${drug.id}: calculator missing source ${sourceId}`)
        }
      }
    }
  })

  it('records multi-source consensus and preserves contextual discrepancies', () => {
    const statusCounts = Object.fromEntries(
      Object.entries(Object.groupBy(drugs, (drug) => drug.validationStatus))
        .map(([status, items]) => [status, items.length]),
    )
    assert.deepEqual(statusCounts, {
      'not-validated': 358,
      'in-review': 173,
      validated: 6,
      'source-verified': 15,
    })
    assert.ok(drugs.every((drug) => (
      !drug.reviewNotes.some((note) => note.includes('Aprovação clínica total declarada'))
    )))

    for (const drug of drugs.filter((candidate) => candidate.verification?.status === 'consensus')) {
      assert.equal(drug.verification?.status, 'consensus', `${drug.id} has no consensus record`)
      assert.equal(drug.validationStatus, 'validated', `${drug.id} is not marked as validated`)
      assert.ok((drug.verification?.comparedSourceIds.length ?? 0) >= 3, `${drug.id} compares too few external sources`)
      assert.deepEqual(drug.verification?.discrepancies, [], `${drug.id} has unresolved discrepancies`)
    }

    const enoxaparin = drugs.find((drug) => drug.id === 'enoxaparin')
    assert.equal(enoxaparin?.verification?.status, 'context-dependent')
    assert.equal(enoxaparin?.validationStatus, 'source-verified')
    assert.ok((enoxaparin?.verification?.discrepancies.length ?? 0) > 0)

    const amoxicillin = drugs.find((drug) => drug.id === 'amoxicilina')
    assert.equal(amoxicillin?.verification?.status, 'context-dependent')
    assert.equal(amoxicillin?.validationStatus, 'source-verified')
    assert.ok((amoxicillin?.verification?.discrepancies.length ?? 0) > 0)

    const amoxicillinClavulanate = drugs.find(
      (drug) => drug.id === 'amoxicilina-acido-clavulanico',
    )
    assert.equal(amoxicillinClavulanate?.verification?.status, 'context-dependent')
    assert.equal(amoxicillinClavulanate?.validationStatus, 'source-verified')
    assert.ok((amoxicillinClavulanate?.verification?.discrepancies.length ?? 0) > 0)
  })

  it('does not promote internal drafts or catalog-only entries', () => {
    const aspirin = drugs.find((drug) => drug.id === 'acido-acetilsalicilico')
    assert.equal(aspirin?.validationStatus, 'in-review')
    assert.equal(aspirin?.references.length, 0)
    assert.equal(aspirin?.calculators?.length, 0)

    const acenocoumarol = drugs.find((drug) => drug.id === 'acenocumarol')
    assert.equal(acenocoumarol?.validationStatus, 'not-validated')
    assert.equal(acenocoumarol?.confidence, 'unvalidated')
    assert.equal(acenocoumarol?.lastReviewedAt, null)
    assert.equal(acenocoumarol?.references.length, 0)
    assert.equal(acenocoumarol?.calculators?.length, 0)
  })

  it('keeps amoxicillin formulations and renal regimens separated', () => {
    const amoxicillin = drugs.find((drug) => drug.id === 'amoxicilina')
    assert.ok(amoxicillin)
    assert.ok(amoxicillin.references.some((reference) => reference.id === 'amoxicillin-iv-smpc'))
    assert.ok(amoxicillin.usualAdultDose.some((item) => (
      item.context.includes('Via IV')
      && item.recommendation.includes('750 mg a 2 g IV de 8/8 h')
    )))
    assert.ok(amoxicillin.renalAdjustment.byKidneyFunction.some((item) => (
      item.context.includes('GFR 10–30 mL/min — IV')
      && item.recommendation === '1 g IV inicial, depois 500 mg a 1 g IV de 12/12 h.'
    )))
    assert.ok(amoxicillin.renalAdjustment.byKidneyFunction.some((item) => (
      item.context.includes('GFR 10–30 mL/min — oral')
      && item.recommendation.includes('Não utilizar a apresentação de 875 mg')
    )))

    const amoxicillinClavulanate = drugs.find(
      (drug) => drug.id === 'amoxicilina-acido-clavulanico',
    )
    assert.ok(amoxicillinClavulanate)
    assert.ok(amoxicillinClavulanate.references.some((reference) => (
      reference.id === 'coamoxiclav-iv-smpc'
    )))
    assert.ok(amoxicillinClavulanate.usualAdultDose.some((item) => (
      item.context === 'Via IV — apresentação 1000/200 mg'
      && item.recommendation.startsWith('1000 mg/200 mg IV de 8/8 h.')
    )))
    assert.ok(amoxicillinClavulanate.renalAdjustment.byKidneyFunction.some((item) => (
      item.context === 'ClCr 10–30 mL/min — IV'
      && item.recommendation === '1000 mg/200 mg IV como dose inicial, depois 500 mg/100 mg IV de 12/12 h.'
    )))
    assert.ok(amoxicillinClavulanate.practicalNotes.some((note) => (
      note.includes('não são intercambiáveis')
    )))
    assert.ok(amoxicillinClavulanate.usualAdultDose.every((item) => (
      !item.recommendation.includes('1,2 g IV 6/6h')
    )))
  })
})

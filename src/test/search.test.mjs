import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { drugCategories } from '../data/categories.ts'
import {
  catalogDrugCount,
  drugs,
  pendingDrugCount,
  reviewedDrugCount,
  sourceVerifiedDrugCount,
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
    assert.equal(catalogDrugCount, 550)
    assert.equal(reviewedDrugCount, 14)
    assert.equal(sourceVerifiedDrugCount, 14)
    assert.equal(pendingDrugCount, 536)
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
    for (const drug of drugs.filter((candidate) => candidate.validationStatus === 'source-verified')) {
      const referenceIds = new Set(drug.references.map((reference) => reference.id))
      assert.ok(referenceIds.size > 0, `${drug.id} has no references`)

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
})

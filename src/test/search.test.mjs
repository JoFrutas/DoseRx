import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { drugCategories } from '../data/categories.ts'
import { drugs } from '../data/drugs.ts'
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
})

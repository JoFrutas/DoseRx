import { useState } from 'react'
import { CategoryCard } from '../components/CategoryCard'
import { DrugCard } from '../components/DrugCard'
import { LogoMark } from '../components/LogoMark'
import { SafetyBanner } from '../components/SafetyBanner'
import { SearchBar } from '../components/SearchBar'
import {
  catalogDrugCount,
  catalogOnlyDrugCount,
  multiSourceValidatedDrugCount,
  sourceLinkedDrugCount,
  sourceVerifiedDrugCount,
} from '../data/drugs'
import { useI18n } from '../i18n/I18nContext'
import { searchDrugs } from '../lib/search'

export function HomePage() {
  const { categories: drugCategories, drugs, ui } = useI18n()
  const [query, setQuery] = useState('')
  const results = searchDrugs(drugs, query, drugCategories)
  const isSearching = query.trim().length > 0

  return (
    <main>
      <section className="hero">
        <div className="hero__glow hero__glow--one" />
        <div className="hero__glow hero__glow--two" />
        <div className="content-width hero__content">
          <div className="hero__brand">
            <LogoMark size="large" />
            <div>
              <span className="eyebrow eyebrow--light">{ui.heroEyebrow}</span>
              <h1>{ui.heroTitleFirst}<br /><em>{ui.heroTitleSecond}</em></h1>
              <p>{ui.heroDescription}</p>
            </div>
          </div>
          <SearchBar query={query} onQueryChange={setQuery} />
          <p className="hero__search-hint">
            {ui.searchHint}
          </p>
        </div>
      </section>

      <div className="content-width home-content">
        <SafetyBanner
          compact
          sourceLinkedCount={sourceLinkedDrugCount}
          catalogOnlyCount={catalogOnlyDrugCount}
        />

        {isSearching ? (
          <section className="search-results" aria-live="polite">
            <div className="section-heading">
              <div>
                <span className="eyebrow">{ui.results}</span>
                <h2>{results.length} {results.length === 1 ? ui.drugFound : ui.drugsFound}</h2>
              </div>
              <button className="text-button" type="button" onClick={() => setQuery('')}>{ui.viewCategories}</button>
            </div>
            {results.length > 0 ? (
              <div className="drug-list">
                {results.map((drug) => <DrugCard key={drug.id} drug={drug} />)}
              </div>
            ) : (
              <div className="empty-state">
                <strong>{ui.noResults} “{query}”</strong>
                <p>{ui.noResultsHint}</p>
              </div>
            )}
          </section>
        ) : (
          <section className="categories-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">{ui.catalogEyebrow}</span>
                <h2>{ui.exploreByCategory}</h2>
                <p>
                  {multiSourceValidatedDrugCount} {ui.consensusCount};{' '}
                  {sourceVerifiedDrugCount - multiSourceValidatedDrugCount} {ui.verifiedCount};{' '}
                  {sourceLinkedDrugCount} {ui.linkedCount}; {catalogOnlyDrugCount} {ui.catalogOnlyCount}.
                </p>
              </div>
              <span className="record-count">{catalogDrugCount} {ui.records}</span>
            </div>
            <div className="category-grid">
              {drugCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  drugCount={drugs.filter((drug) => drug.categoryIds.includes(category.id)).length}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

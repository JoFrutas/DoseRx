import { DrugCard } from '../components/DrugCard'
import { Icon } from '../components/Icon'
import { SafetyBanner } from '../components/SafetyBanner'
import { useI18n } from '../i18n/I18nContext'
import { homeHref } from '../lib/routes'
import { NotFoundPage } from './NotFoundPage'

interface CategoryPageProps {
  categoryId: string
}

export function CategoryPage({ categoryId }: CategoryPageProps) {
  const { categories, drugs, ui } = useI18n()
  const category = categories.find((candidate) => candidate.id === categoryId)
  if (!category) return <NotFoundPage />

  const categoryDrugs = drugs.filter((drug) => drug.categoryIds.includes(category.id))
  const sourceLinkedCount = categoryDrugs.filter((drug) => (
    drug.validationStatus === 'source-linked'
  )).length
  const catalogOnlyCount = categoryDrugs.filter((drug) => (
    drug.validationStatus === 'catalog-only'
  )).length

  return (
    <main className="content-width page-content">
      <a className="back-link" href={homeHref}><Icon name="arrow-left" size={18} /> {ui.back}</a>

      <section
        className="category-hero"
        style={{ '--category-accent': category.accent, '--category-bg': category.accentBackground } as React.CSSProperties}
      >
        <span className="category-hero__icon">{category.icon}</span>
        <div>
          <span className="eyebrow">{ui.catalogEyebrow}</span>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
        <strong>{categoryDrugs.length} {categoryDrugs.length === 1 ? ui.structuralRecord : ui.structuralRecords}</strong>
      </section>

      {(sourceLinkedCount > 0 || catalogOnlyCount > 0) && (
        <SafetyBanner
          compact
          sourceLinkedCount={sourceLinkedCount}
          catalogOnlyCount={catalogOnlyCount}
        />
      )}

      <section className="category-list-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{ui.records}</span>
            <h2>{ui.drugsInCategory}</h2>
          </div>
        </div>
        {categoryDrugs.length > 0 ? (
          <div className="drug-list">
            {categoryDrugs.map((drug) => <DrugCard key={drug.id} drug={drug} />)}
          </div>
        ) : (
          <div className="empty-state">
            <strong>{ui.noResults}</strong>
            <p>{ui.noResultsHint}</p>
          </div>
        )}
      </section>
    </main>
  )
}

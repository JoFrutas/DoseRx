import { DrugCard } from '../components/DrugCard'
import { Icon } from '../components/Icon'
import { SafetyBanner } from '../components/SafetyBanner'
import { getCategoryById } from '../data/categories'
import { drugs } from '../data/drugs'
import { homeHref } from '../lib/routes'
import { NotFoundPage } from './NotFoundPage'

interface CategoryPageProps {
  categoryId: string
}

export function CategoryPage({ categoryId }: CategoryPageProps) {
  const category = getCategoryById(categoryId)
  if (!category) return <NotFoundPage />

  const categoryDrugs = drugs.filter((drug) => drug.categoryIds.includes(category.id))

  return (
    <main className="content-width page-content">
      <a className="back-link" href={homeHref}><Icon name="arrow-left" size={18} /> Todas as categorias</a>

      <section
        className="category-hero"
        style={{ '--category-accent': category.accent, '--category-bg': category.accentBackground } as React.CSSProperties}
      >
        <span className="category-hero__icon">{category.icon}</span>
        <div>
          <span className="eyebrow">Categoria</span>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
        <strong>{categoryDrugs.length} {categoryDrugs.length === 1 ? 'ficha' : 'fichas'}</strong>
      </section>

      <SafetyBanner compact />

      <section className="category-list-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Fármacos</span>
            <h2>Fichas nesta categoria</h2>
          </div>
        </div>
        {categoryDrugs.length > 0 ? (
          <div className="drug-list">
            {categoryDrugs.map((drug) => <DrugCard key={drug.id} drug={drug} />)}
          </div>
        ) : (
          <div className="empty-state">
            <strong>Ainda não existem fármacos nesta categoria.</strong>
            <p>A categoria já está pronta para receber conteúdo clínico estruturado.</p>
          </div>
        )}
      </section>
    </main>
  )
}

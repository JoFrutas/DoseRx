import { useState } from 'react'
import { CategoryCard } from '../components/CategoryCard'
import { DrugCard } from '../components/DrugCard'
import { LogoMark } from '../components/LogoMark'
import { SearchBar } from '../components/SearchBar'
import { drugCategories } from '../data/categories'
import { catalogDrugCount, drugs } from '../data/drugs'
import { searchDrugs } from '../lib/search'

export function HomePage() {
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
              <span className="eyebrow eyebrow--light">Consulta farmacológica em UCI</span>
              <h1>Doses críticas.<br /><em>Contexto à vista.</em></h1>
              <p>
                Encontre rapidamente a estrutura de dose, prescrição, ajuste renal,
                ajuste hepático e notas práticas de cada fármaco.
              </p>
            </div>
          </div>
          <SearchBar query={query} onQueryChange={setQuery} />
          <p className="hero__search-hint">
            Pesquise por nome, alias, classe, indicação ou categoria.
          </p>
        </div>
      </section>

      <div className="content-width home-content">
        {isSearching ? (
          <section className="search-results" aria-live="polite">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Resultados</span>
                <h2>{results.length} {results.length === 1 ? 'fármaco encontrado' : 'fármacos encontrados'}</h2>
              </div>
              <button className="text-button" type="button" onClick={() => setQuery('')}>Ver categorias</button>
            </div>
            {results.length > 0 ? (
              <div className="drug-list">
                {results.map((drug) => <DrugCard key={drug.id} drug={drug} />)}
              </div>
            ) : (
              <div className="empty-state">
                <strong>Sem resultados para “{query}”</strong>
                <p>Tente outro nome, classe, indicação, subcategoria ou alias.</p>
              </div>
            )}
          </section>
        ) : (
          <section className="categories-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Catálogo de Medicina Intensiva</span>
                <h2>Explorar por categoria</h2>
                <p>
                  As {catalogDrugCount} fichas estão estruturadas e pesquisáveis. Quando a fonte
                  revista não define uma posologia única, a ficha remete para o RCM e para o
                  protocolo específico da indicação.
                </p>
              </div>
              <span className="record-count">{catalogDrugCount} fármacos</span>
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

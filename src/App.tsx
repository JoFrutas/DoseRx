import { useEffect } from 'react'
import { AppHeader } from './components/AppHeader'
import { parseRoute, useHashLocation } from './lib/routes'
import { CategoryPage } from './pages/CategoryPage'
import { DrugDetailPage } from './pages/DrugDetailPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  const hash = useHashLocation()
  const route = parseRoute(hash)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [hash])

  let page
  switch (route.name) {
    case 'home':
      page = <HomePage />
      break
    case 'category':
      page = <CategoryPage categoryId={route.categoryId} />
      break
    case 'drug':
      page = <DrugDetailPage drugId={route.drugId} />
      break
    case 'not-found':
      page = <NotFoundPage />
      break
  }

  return (
    <div className="app-shell">
      <AppHeader />
      {page}
      <footer className="app-footer">
        <div className="content-width">
          <strong>DoseRx</strong>
          <span>Ferramenta de apoio · confirmar indicação, preparação e protocolo local</span>
          <span>v0.3</span>
        </div>
      </footer>
    </div>
  )
}

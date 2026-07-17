import { useEffect } from 'react'
import { AppHeader } from './components/AppHeader'
import { LanguageScreen } from './components/LanguageScreen'
import { useI18n } from './i18n/I18nContext'
import { parseRoute, useHashLocation } from './lib/routes'
import { CategoryPage } from './pages/CategoryPage'
import { DrugDetailPage } from './pages/DrugDetailPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  const { language, loading, setLanguage, ui } = useI18n()
  const hash = useHashLocation()
  const route = parseRoute(hash)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [hash])

  if (!language) return <LanguageScreen onSelect={setLanguage} />
  if (loading) {
    return <main className="language-loading" aria-live="polite"><LogoLoading />{ui.loadingLanguage}</main>
  }

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
          <span>{ui.footerSafety}</span>
          <span>v0.4</span>
        </div>
        {language !== 'pt' && <div className="content-width app-footer__translation">{ui.clinicalTranslationNotice}</div>}
      </footer>
    </div>
  )
}

function LogoLoading() {
  return <span className="language-loading__mark">Rx</span>
}

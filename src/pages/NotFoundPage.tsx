import { homeHref } from '../lib/routes'
import { useI18n } from '../i18n/I18nContext'

export function NotFoundPage() {
  const { ui } = useI18n()
  return (
    <main className="content-width page-content">
      <div className="not-found">
        <span>404</span>
        <h1>{ui.notFoundTitle}</h1>
        <p>{ui.notFoundText}</p>
        <a className="primary-button" href={homeHref}>{ui.returnHome}</a>
      </div>
    </main>
  )
}

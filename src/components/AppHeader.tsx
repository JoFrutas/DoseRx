import { homeHref } from '../lib/routes'
import { catalogDrugCount } from '../data/drugs'
import { LogoMark } from './LogoMark'
import { useI18n } from '../i18n/I18nContext'
import { languageOptions } from '../i18n/translations'

export function AppHeader() {
  const { language, setLanguage, ui } = useI18n()
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <a className="brand" href={homeHref} aria-label={ui.homeAria}>
          <LogoMark />
          <span className="brand__copy">
            <strong>Dose<span>Rx</span></strong>
            <small>{ui.brandSubtitle}</small>
          </span>
        </a>
        <div className="app-header__actions">
          <div className="header-status">
            <span className="status-dot" />
            {catalogDrugCount} {ui.availableRecords}
          </div>
          <div className="language-switcher" role="group" aria-label={ui.languageSelectorLabel}>
            {languageOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                className={language === option.code ? 'is-active' : ''}
                onClick={() => setLanguage(option.code)}
                aria-pressed={language === option.code}
                title={option.label}
              >
                {option.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

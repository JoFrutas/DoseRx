import { homeHref } from '../lib/routes'
import { placeholderDrugCount, reviewInProgressDrugCount } from '../data/drugs'
import { LogoMark } from './LogoMark'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <a className="brand" href={homeHref} aria-label="DoseRx — página inicial">
          <LogoMark />
          <span className="brand__copy">
            <strong>Dose<span>Rx</span></strong>
            <small>Medicina Intensiva</small>
          </span>
        </a>
        {(placeholderDrugCount > 0 || reviewInProgressDrugCount > 0) && (
          <div className="header-status">
            <span className="status-dot" />
            {placeholderDrugCount} por preencher · {reviewInProgressDrugCount} em revisão
          </div>
        )}
      </div>
    </header>
  )
}

import type { ValidationStatus } from '../types/drug'
import { Icon } from './Icon'
import { useI18n } from '../i18n/I18nContext'

interface SafetyBannerProps {
  compact?: boolean
  status?: Extract<ValidationStatus, 'catalog-only' | 'source-linked'>
  sourceLinkedCount?: number
  catalogOnlyCount?: number
}

export function SafetyBanner({
  compact = false,
  status,
  sourceLinkedCount = 0,
  catalogOnlyCount = 0,
}: SafetyBannerProps) {
  const { ui } = useI18n()
  const title = status === 'source-linked'
    ? ui.bannerLinkedTitle
    : status === 'catalog-only'
      ? ui.bannerCatalogTitle
      : ui.bannerMixedTitle

  const message = status === 'source-linked'
    ? ui.bannerLinkedMessage
    : status === 'catalog-only'
      ? ui.bannerCatalogMessage
      : `${ui.bannerMixedMessage} ${sourceLinkedCount} ${ui.linkedCount}; ${catalogOnlyCount} ${ui.catalogOnlyCount}.`

  return (
    <aside
      className={`safety-banner${compact ? ' safety-banner--compact' : ''}`}
      aria-label="Aviso de segurança clínica"
    >
      <span className="safety-banner__icon"><Icon name="shield" size={compact ? 18 : 22} /></span>
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
    </aside>
  )
}

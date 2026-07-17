import type { ConfidenceLevel, ValidationStatus } from '../types/drug'
import { useI18n } from '../i18n/I18nContext'

interface ValidationBadgeProps {
  status: ValidationStatus
  confidence?: ConfidenceLevel
}

export function ValidationBadge({ status, confidence }: ValidationBadgeProps) {
  const { ui } = useI18n()
  const statusLabels: Record<ValidationStatus, string> = {
    'catalog-only': ui.statusCatalogOnly,
    'source-linked': ui.statusSourceLinked,
    'source-verified': ui.statusSourceVerified,
    validated: ui.statusValidated,
  }
  const confidenceLabels: Record<ConfidenceLevel, string> = {
    unvalidated: ui.confidenceUnvalidated,
    low: ui.confidenceLow,
    moderate: ui.confidenceModerate,
    high: ui.confidenceHigh,
  }
  return (
    <span className={`validation-badge validation-badge--${status}`}>
      <span aria-hidden="true" />
      {statusLabels[status]}
      {confidence ? ` · ${confidenceLabels[confidence]}` : ''}
    </span>
  )
}

import type { ConfidenceLevel, ValidationStatus } from '../types/drug'

interface ValidationBadgeProps {
  status: ValidationStatus
  confidence?: ConfidenceLevel
}

const statusLabels: Record<ValidationStatus, string> = {
  'not-validated': 'Não validado',
  'in-review': 'Em revisão',
  validated: 'Validado',
}

const confidenceLabels: Record<ConfidenceLevel, string> = {
  unvalidated: 'confiança não atribuída',
  low: 'confiança baixa',
  moderate: 'confiança moderada',
  high: 'confiança elevada',
}

export function ValidationBadge({ status, confidence }: ValidationBadgeProps) {
  return (
    <span className={`validation-badge validation-badge--${status}`}>
      <span aria-hidden="true" />
      {statusLabels[status]}
      {confidence ? ` · ${confidenceLabels[confidence]}` : ''}
    </span>
  )
}

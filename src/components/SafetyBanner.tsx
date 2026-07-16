import type { ValidationStatus } from '../types/drug'
import { Icon } from './Icon'

interface SafetyBannerProps {
  compact?: boolean
  status?: Extract<ValidationStatus, 'not-validated' | 'in-review'>
  inReviewCount?: number
  notValidatedCount?: number
}

export function SafetyBanner({
  compact = false,
  status,
  inReviewCount = 0,
  notValidatedCount = 0,
}: SafetyBannerProps) {
  const title = status === 'in-review'
    ? 'Ficha clínica em revisão'
    : status === 'not-validated'
      ? 'Ficha clínica não validada'
      : 'Catálogo com diferentes níveis de revisão'

  const message = status === 'in-review'
    ? 'O conteúdo é um rascunho estruturado. Confirme cada recomendação no RCM/SmPC, nas fontes específicas e no protocolo local.'
    : status === 'not-validated'
      ? 'Esta entrada contém apenas informação de catálogo ou texto genérico e não deve ser usada como suporte à prescrição.'
      : `${inReviewCount} fichas estão em revisão e ${notValidatedCount} ainda não têm validação clínica. Verifique o estado apresentado em cada cartão.`

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

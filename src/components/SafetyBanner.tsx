import { Icon } from './Icon'

interface SafetyBannerProps {
  compact?: boolean
  pendingCount?: number
}

export function SafetyBanner({ compact = false, pendingCount }: SafetyBannerProps) {
  return (
    <aside className={`safety-banner${compact ? ' safety-banner--compact' : ''}`} aria-label="Aviso de segurança clínica">
      <span className="safety-banner__icon"><Icon name="shield" size={compact ? 18 : 22} /></span>
      <div>
        {!compact && <strong>Ficha clínica ainda não documentada</strong>}
        <p>
          {pendingCount ? `${pendingCount} entradas do catálogo ainda não têm ficha documental. ` : ''}
          Não utilize conteúdo assinalado como não validado para prescrever.
        </p>
      </div>
    </aside>
  )
}

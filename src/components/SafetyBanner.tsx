import { Icon } from './Icon'

interface SafetyBannerProps {
  compact?: boolean
}

export function SafetyBanner({ compact = false }: SafetyBannerProps) {
  return (
    <aside className={`safety-banner${compact ? ' safety-banner--compact' : ''}`} aria-label="Aviso de segurança clínica">
      <span className="safety-banner__icon"><Icon name="shield" size={compact ? 18 : 22} /></span>
      <div>
        {!compact && <strong>Base clínica ainda não validada</strong>}
        <p>
          Ferramenta de apoio à prescrição. Não substitui validação clínica, farmacêutica,
          bibliográfica ou protocolos locais. Não utilize os dados seed para prescrever.
        </p>
      </div>
    </aside>
  )
}

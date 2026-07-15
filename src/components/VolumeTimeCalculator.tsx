import { useState } from 'react'
import { calculateVolumeRate, formatCalculatorNumber } from '../lib/calculators'
import type { EvidenceReference, VolumeTimeCalculatorDefinition } from '../types/drug'
import { SourceLinks } from './SourceLinks'

interface VolumeTimeCalculatorProps {
  definition: VolumeTimeCalculatorDefinition
  references: EvidenceReference[]
}

export function VolumeTimeCalculator({ definition, references }: VolumeTimeCalculatorProps) {
  const [volumeMl, setVolumeMl] = useState(String(definition.defaultVolumeMl))
  const [durationMinutes, setDurationMinutes] = useState(String(definition.defaultDurationMinutes))

  let rateMlHour = null
  try {
    rateMlHour = calculateVolumeRate(Number(volumeMl), Number(durationMinutes))
  } catch {
    rateMlHour = null
  }

  const belowMinimum = definition.minimumDurationMinutes !== undefined
    && Number(durationMinutes) < definition.minimumDurationMinutes

  return (
    <article className="calculator-card">
      <header>
        <span className="calculator-card__kind">Volume / tempo</span>
        <h3>{definition.title}</h3>
        <p>{definition.description}</p>
      </header>
      <div className="calculator-fields calculator-fields--two">
        <label>
          <span>Volume final (mL)</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={volumeMl} onChange={(event) => setVolumeMl(event.target.value)} />
        </label>
        <label>
          <span>Duração (minutos)</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={durationMinutes} onChange={(event) => setDurationMinutes(event.target.value)} />
        </label>
      </div>
      {belowMinimum && (
        <p className="calculator-warning">A duração é inferior ao mínimo documentado de {definition.minimumDurationMinutes} minutos.</p>
      )}
      {rateMlHour !== null ? (
        <div className="calculator-result" aria-live="polite">
          <span>Velocidade calculada</span>
          <strong>{formatCalculatorNumber(rateMlHour)} mL/h</strong>
          <small>{formatCalculatorNumber(Number(volumeMl))} mL em {formatCalculatorNumber(Number(durationMinutes))} minutos</small>
        </div>
      ) : (
        <p className="calculator-placeholder">Introduza volume e duração superiores a zero.</p>
      )}
      <ul className="calculator-notes">
        {definition.notes.map((note) => <li key={note}>{note}</li>)}
      </ul>
      <SourceLinks sourceIds={definition.sourceIds} references={references} />
    </article>
  )
}

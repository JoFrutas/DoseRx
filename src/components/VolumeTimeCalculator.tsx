import { useState } from 'react'
import { calculateDefinedVolumeRate, formatCalculatorNumber as formatNumber } from '../lib/calculators'
import type { EvidenceReference, VolumeTimeCalculatorDefinition } from '../types/drug'
import { SourceLinks } from './SourceLinks'
import { ValidationBadge } from './ValidationBadge'
import { useI18n } from '../i18n/I18nContext'
import { CalculatorFlow, useCalculatorFlowCopy, isPositiveInput, type CalculatorMode } from './CalculatorFlow'

interface VolumeTimeCalculatorProps {
  mode: CalculatorMode
  definition: VolumeTimeCalculatorDefinition
  references: EvidenceReference[]
}

export function VolumeTimeCalculator({ mode, definition, references }: VolumeTimeCalculatorProps) {
  const { ui, language } = useI18n()
  const flow = useCalculatorFlowCopy()
  const formatCalculatorNumber = (value: number) => formatNumber(value, language ?? 'pt')
  const [volumeMl, setVolumeMl] = useState(String(definition.defaultVolumeMl))
  const [durationMinutes, setDurationMinutes] = useState(String(definition.defaultDurationMinutes))

  let rateMlHour = null
  try {
    rateMlHour = calculateDefinedVolumeRate(definition, Number(volumeMl), Number(durationMinutes))
  } catch {
    rateMlHour = null
  }

  const belowMinimum = definition.minimumDurationMinutes !== undefined
    && Number(durationMinutes) < definition.minimumDurationMinutes

  return (
    <article className="calculator-card">
      <header>
        <div className="calculator-card__meta">
          <span className="calculator-card__kind">{ui.volumeTime}</span>
          <ValidationBadge status={definition.validationStatus ?? 'source-verified'} />
        </div>
        <h3>{definition.title}</h3>
        <p>{definition.description}</p>
      </header>
      <CalculatorFlow mode={mode} fields={[
        { id: 'volume', valid: isPositiveInput(volumeMl), error: flow.positive, input: (
        <label>
          <span>{ui.finalVolume}</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={volumeMl} onChange={(event) => setVolumeMl(event.target.value)} />
        </label>
        ) },
        { id: 'duration', valid: isPositiveInput(durationMinutes) && !belowMinimum, error: belowMinimum ? `${flow.minimum} ${definition.minimumDurationMinutes} min.` : flow.positive, input: (
        <label>
          <span>{ui.duration}</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={durationMinutes} onChange={(event) => setDurationMinutes(event.target.value)} />
        </label>
        ) },
      ]}>
      {belowMinimum && (
        <p className="calculator-warning">{ui.durationMinimumWarning} {definition.minimumDurationMinutes} min.</p>
      )}
      {rateMlHour !== null ? (
        <div className="calculator-result" aria-live="polite">
          <span>{ui.calculatedRate}</span>
          <strong>{formatCalculatorNumber(rateMlHour)} mL/h</strong>
          <small>{formatCalculatorNumber(Number(volumeMl))} mL / {formatCalculatorNumber(Number(durationMinutes))} min</small>
        </div>
      ) : (
        <p className="calculator-placeholder">{ui.volumeTimePlaceholder}</p>
      )}
      </CalculatorFlow>
      <ul className="calculator-notes">
        {definition.notes.map((note) => <li key={note}>{note}</li>)}
      </ul>
      <SourceLinks sourceIds={definition.sourceIds} references={references} />
    </article>
  )
}

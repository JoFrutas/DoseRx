import { useState } from 'react'
import { calculateWeightDose, formatCalculatorNumber, formatCalculatorUnit } from '../lib/calculators'
import type { EvidenceReference, WeightDoseCalculatorDefinition } from '../types/drug'
import { SourceLinks } from './SourceLinks'
import { ValidationBadge } from './ValidationBadge'
import { useI18n } from '../i18n/I18nContext'

interface WeightDoseCalculatorProps {
  definition: WeightDoseCalculatorDefinition
  references: EvidenceReference[]
}

export function WeightDoseCalculator({ definition, references }: WeightDoseCalculatorProps) {
  const { ui } = useI18n()
  const [weightKg, setWeightKg] = useState('70')
  const [optionId, setOptionId] = useState(definition.defaultOptionId)
  const option = definition.options.find((candidate) => candidate.id === optionId)

  let result = null
  if (option) {
    try {
      result = calculateWeightDose(
        Number(weightKg),
        option.dosePerKg,
        option.maxDose,
        definition.concentration?.value,
      )
    } catch {
      result = null
    }
  }

  return (
    <article className="calculator-card">
      <header>
        <div className="calculator-card__meta">
          <span className="calculator-card__kind">{ui.weightDose}</span>
          <ValidationBadge status={definition.validationStatus ?? 'source-verified'} />
        </div>
        <h3>{definition.title}</h3>
        <p>{definition.description}</p>
      </header>
      <div className="calculator-fields calculator-fields--two">
        <label>
          <span>{ui.dosingWeight}</span>
          <input
            type="number"
            min="1"
            max="400"
            step="0.1"
            inputMode="decimal"
            value={weightKg}
            onChange={(event) => setWeightKg(event.target.value)}
          />
        </label>
        <label>
          <span>{ui.documentedRegimen}</span>
          <select value={optionId} onChange={(event) => setOptionId(event.target.value)}>
            {definition.options.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>{candidate.label}</option>
            ))}
          </select>
        </label>
      </div>
      {result && option ? (
        <div className="calculator-result" aria-live="polite">
          <span>{ui.mathematicalDose}</span>
          <strong>{formatCalculatorNumber(result.finalDose)} {formatCalculatorUnit(option.amountUnit)}</strong>
          <small>
            {formatCalculatorNumber(Number(weightKg))} kg × {formatCalculatorNumber(option.dosePerKg)} {formatCalculatorUnit(option.amountUnit)}/kg
            {result.capped ? `; ${ui.maximumLimited} ${formatCalculatorNumber(option.maxDose as number)} ${formatCalculatorUnit(option.amountUnit)}` : ''}
          </small>
          {option.note && <small>{option.note}</small>}
          {result.volumeMl !== null && definition.concentration && (
            <small>
              {ui.volumeOf} {definition.concentration.label}: <b>{formatCalculatorNumber(result.volumeMl)} mL</b>
            </small>
          )}
        </div>
      ) : (
        <p className="calculator-placeholder">{ui.weightPlaceholder}</p>
      )}
      <ul className="calculator-notes">
        {definition.notes.map((note) => <li key={note}>{note}</li>)}
      </ul>
      <SourceLinks sourceIds={definition.sourceIds} references={references} />
    </article>
  )
}

import { useState } from 'react'
import { calculateWeightDose, formatCalculatorNumber, formatCalculatorUnit } from '../lib/calculators'
import type { EvidenceReference, WeightDoseCalculatorDefinition } from '../types/drug'
import { SourceLinks } from './SourceLinks'

interface WeightDoseCalculatorProps {
  definition: WeightDoseCalculatorDefinition
  references: EvidenceReference[]
}

export function WeightDoseCalculator({ definition, references }: WeightDoseCalculatorProps) {
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
        <span className="calculator-card__kind">Dose por peso</span>
        <h3>{definition.title}</h3>
        <p>{definition.description}</p>
      </header>
      <div className="calculator-fields calculator-fields--two">
        <label>
          <span>Peso de dose (kg)</span>
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
          <span>Regime documentado</span>
          <select value={optionId} onChange={(event) => setOptionId(event.target.value)}>
            {definition.options.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>{candidate.label}</option>
            ))}
          </select>
        </label>
      </div>
      {result && option ? (
        <div className="calculator-result" aria-live="polite">
          <span>Dose matemática</span>
          <strong>{formatCalculatorNumber(result.finalDose)} {formatCalculatorUnit(option.amountUnit)}</strong>
          <small>
            {formatCalculatorNumber(Number(weightKg))} kg × {formatCalculatorNumber(option.dosePerKg)} {formatCalculatorUnit(option.amountUnit)}/kg
            {result.capped ? `; limitado ao máximo de ${formatCalculatorNumber(option.maxDose as number)} ${formatCalculatorUnit(option.amountUnit)}` : ''}
          </small>
          {result.volumeMl !== null && definition.concentration && (
            <small>
              Volume de {definition.concentration.label}: <b>{formatCalculatorNumber(result.volumeMl)} mL</b>
            </small>
          )}
        </div>
      ) : (
        <p className="calculator-placeholder">Introduza um peso válido para obter o resultado.</p>
      )}
      <ul className="calculator-notes">
        {definition.notes.map((note) => <li key={note}>{note}</li>)}
      </ul>
      <SourceLinks sourceIds={definition.sourceIds} references={references} />
    </article>
  )
}

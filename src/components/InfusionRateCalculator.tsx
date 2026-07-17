import { useState } from 'react'
import { calculateInfusionRate, formatCalculatorNumber, formatCalculatorUnit } from '../lib/calculators'
import type { EvidenceReference, InfusionRateCalculatorDefinition } from '../types/drug'
import { SourceLinks } from './SourceLinks'
import { useI18n } from '../i18n/I18nContext'

interface InfusionRateCalculatorProps {
  definition: InfusionRateCalculatorDefinition
  references: EvidenceReference[]
}

export function InfusionRateCalculator({ definition, references }: InfusionRateCalculatorProps) {
  const { ui } = useI18n()
  const [doseRate, setDoseRate] = useState(String(Number(definition.defaultDoseRate.toFixed(2))))
  const [weightKg, setWeightKg] = useState('70')
  const [preparationAmount, setPreparationAmount] = useState(
    definition.preparation.amount > 0 ? String(definition.preparation.amount) : '',
  )
  const [preparationVolume, setPreparationVolume] = useState(
    definition.preparation.volumeMl > 0 ? String(definition.preparation.volumeMl) : '',
  )
  const requiresWeight = definition.doseRateUnit.includes('/kg/')
  const numericDoseRate = Number(doseRate)

  let rateMlHour = null
  try {
    rateMlHour = calculateInfusionRate({
      doseRate: numericDoseRate,
      doseRateUnit: definition.doseRateUnit,
      weightKg: requiresWeight ? Number(weightKg) : undefined,
      preparationAmount: Number(preparationAmount),
      preparationAmountUnit: definition.preparation.amountUnit,
      preparationVolumeMl: Number(preparationVolume),
    })
  } catch {
    rateMlHour = null
  }

  const outsideDocumentedRange = (
    definition.minimumDoseRate !== undefined && numericDoseRate < definition.minimumDoseRate
  ) || (
    definition.maximumDoseRate !== undefined && numericDoseRate > definition.maximumDoseRate
  )

  return (
    <article className="calculator-card">
      <header>
        <span className="calculator-card__kind">{ui.infusion}</span>
        <h3>{definition.title}</h3>
        <p>{definition.description}</p>
      </header>
      <div className="calculator-fields">
        {requiresWeight && (
          <label>
            <span>{ui.dosingWeight}</span>
            <input type="number" min="1" max="400" step="0.1" inputMode="decimal" value={weightKg} onChange={(event) => setWeightKg(event.target.value)} />
          </label>
        )}
        <label>
          <span>{ui.targetDose} ({formatCalculatorUnit(definition.doseRateUnit)})</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={doseRate} onChange={(event) => setDoseRate(event.target.value)} />
        </label>
        <label>
          <span>{ui.preparationAmount} ({formatCalculatorUnit(definition.preparation.amountUnit)})</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={preparationAmount} readOnly={!definition.preparation.editable} onChange={(event) => setPreparationAmount(event.target.value)} />
        </label>
        <label>
          <span>{ui.finalVolume}</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={preparationVolume} readOnly={!definition.preparation.editable} onChange={(event) => setPreparationVolume(event.target.value)} />
        </label>
      </div>
      {outsideDocumentedRange && (
        <p className="calculator-warning">{ui.documentedRangeWarning}</p>
      )}
      {rateMlHour !== null ? (
        <div className="calculator-result" aria-live="polite">
          <span>{ui.calculatedRate}</span>
          <strong>{formatCalculatorNumber(rateMlHour)} mL/h</strong>
          <small>
            {ui.preparation}: {formatCalculatorNumber(Number(preparationAmount))} {formatCalculatorUnit(definition.preparation.amountUnit)} / {formatCalculatorNumber(Number(preparationVolume))} mL
          </small>
        </div>
      ) : (
        <p className="calculator-placeholder">{ui.infusionPlaceholder}</p>
      )}
      <ul className="calculator-notes">
        {definition.notes.map((note) => <li key={note}>{note}</li>)}
      </ul>
      <SourceLinks sourceIds={definition.sourceIds} references={references} />
    </article>
  )
}

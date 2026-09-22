import { useState } from 'react'
import { calculateDefinedInfusionRate, formatCalculatorNumber as formatNumber, formatCalculatorUnit as formatUnit } from '../lib/calculators'
import type { EvidenceReference, InfusionRateCalculatorDefinition } from '../types/drug'
import { SourceLinks } from './SourceLinks'
import { ValidationBadge } from './ValidationBadge'
import { useI18n } from '../i18n/I18nContext'
import { CalculatorFlow, useCalculatorFlowCopy, isPositiveInput, type CalculatorMode } from './CalculatorFlow'

interface InfusionRateCalculatorProps {
  mode: CalculatorMode
  definition: InfusionRateCalculatorDefinition
  references: EvidenceReference[]
}

export function InfusionRateCalculator({ mode, definition, references }: InfusionRateCalculatorProps) {
  const { ui, language } = useI18n()
  const flow = useCalculatorFlowCopy()
  const formatCalculatorNumber = (value: number) => formatNumber(value, language ?? 'pt')
  const formatCalculatorUnit = (unit: Parameters<typeof formatUnit>[0]) => formatUnit(unit, language ?? 'pt')
  const [doseRate, setDoseRate] = useState(String(definition.defaultDoseRate))
  const [weightKg, setWeightKg] = useState('')
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
    rateMlHour = calculateDefinedInfusionRate(definition, {
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
        <div className="calculator-card__meta">
          <span className="calculator-card__kind">{ui.infusion}</span>
          <ValidationBadge status={definition.validationStatus ?? 'source-verified'} />
        </div>
        <h3>{definition.title}</h3>
        <p>{definition.description}</p>
      </header>
      <CalculatorFlow mode={mode} fields={[
        ...(requiresWeight ? [{ id: 'weight', valid: isPositiveInput(weightKg) && Number(weightKg) >= 1 && Number(weightKg) <= 400, error: flow.weight, input: (
          <label>
            <span>{ui.dosingWeight}</span>
            <input type="number" min="1" max="400" step="0.1" inputMode="decimal" value={weightKg} onChange={(event) => setWeightKg(event.target.value)} />
          </label>
        ) }] : []),
        { id: 'dose', valid: isPositiveInput(doseRate) && (definition.maximumDoseRate === undefined || numericDoseRate <= definition.maximumDoseRate), error: definition.maximumDoseRate !== undefined && numericDoseRate > definition.maximumDoseRate ? `${flow.maximum} ${formatCalculatorNumber(definition.maximumDoseRate)} ${formatCalculatorUnit(definition.doseRateUnit)}.` : flow.positive, input: (
        <label>
          <span>{ui.targetDose} ({formatCalculatorUnit(definition.doseRateUnit)})</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={doseRate} onChange={(event) => setDoseRate(event.target.value)} />
        </label>
        ) },
        { id: 'amount', valid: isPositiveInput(preparationAmount), error: flow.positive, input: (
        <label>
          <span>{ui.preparationAmount} ({formatCalculatorUnit(definition.preparation.amountUnit)})</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={preparationAmount} readOnly={!definition.preparation.editable} onChange={(event) => setPreparationAmount(event.target.value)} />
        </label>
        ) },
        { id: 'volume', valid: isPositiveInput(preparationVolume), error: flow.positive, input: (
        <label>
          <span>{ui.finalVolume}</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={preparationVolume} readOnly={!definition.preparation.editable} onChange={(event) => setPreparationVolume(event.target.value)} />
        </label>
        ) },
      ]}>
      {outsideDocumentedRange && (
        <p className="calculator-warning">{ui.documentedRangeWarning}</p>
      )}
      {rateMlHour !== null ? (
        <div className="calculator-result" aria-live="polite">
          <span>{ui.calculatedRate}</span>
          <strong>{formatCalculatorNumber(rateMlHour)} mL/h</strong>
          <small>
            {ui.targetDose}: {formatCalculatorNumber(numericDoseRate)} {formatCalculatorUnit(definition.doseRateUnit)}
            {requiresWeight ? ` · ${ui.dosingWeight}: ${formatCalculatorNumber(Number(weightKg))} kg` : ''}
          </small>
          <small>
            {ui.preparation}: {formatCalculatorNumber(Number(preparationAmount))} {formatCalculatorUnit(definition.preparation.amountUnit)} / {formatCalculatorNumber(Number(preparationVolume))} mL
          </small>
        </div>
      ) : (
        <p className="calculator-placeholder">{requiresWeight ? ui.infusionPlaceholder : ui.infusionPlaceholderNoWeight}</p>
      )}
      </CalculatorFlow>
      <ul className="calculator-notes">
        {definition.notes.map((note) => <li key={note}>{note}</li>)}
      </ul>
      <SourceLinks sourceIds={definition.sourceIds} references={references} />
    </article>
  )
}

import { useState } from 'react'
import type { DoseAmountUnit, DoseRateUnit, EvidenceReference, InfusionConversionCalculatorDefinition } from '../types/drug'
import { calculatePrescriptionInfusionRate, formatCalculatorNumber, formatCalculatorUnit } from '../lib/calculators'
import { useI18n } from '../i18n/I18nContext'
import { CalculatorFlow, isPositiveInput, useCalculatorFlowCopy, type CalculatorMode } from './CalculatorFlow'
import { SourceLinks } from './SourceLinks'

const copy = {
  pt: {
    kind: 'Conversão da dose prescrita', doseUnit: 'Unidade da dose', amountUnit: 'Unidade da quantidade preparada',
    scope: 'Conversão matemática: não escolhe a dose nem verifica os limites clínicos. Confirme a prescrição e a preparação.',
    volume: 'Volume final da seringa ou bolsa (mL)', volumeHelp: 'Volume total após preparar, incluindo o volume do fármaco.',
    concentration: 'Concentração final', method: 'mL/h = dose por hora ÷ concentração',
    source: 'Fonte do método de cálculo',
  },
  en: {
    kind: 'Prescribed dose conversion', doseUnit: 'Dose unit', amountUnit: 'Prepared amount unit',
    scope: 'Mathematical conversion: does not choose the dose or check clinical limits. Confirm the prescription and preparation.',
    volume: 'Final syringe or bag volume (mL)', volumeHelp: 'Total volume after preparation, including the drug volume.',
    concentration: 'Final concentration', method: 'mL/h = hourly dose ÷ concentration',
    source: 'Calculation method source',
  },
  es: {
    kind: 'Conversión de la dosis prescrita', doseUnit: 'Unidad de la dosis', amountUnit: 'Unidad de la cantidad preparada',
    scope: 'Conversión matemática: no elige la dosis ni comprueba los límites clínicos. Confirme la prescripción y la preparación.',
    volume: 'Volumen final de la jeringa o bolsa (mL)', volumeHelp: 'Volumen total tras preparar, incluido el volumen del fármaco.',
    concentration: 'Concentración final', method: 'mL/h = dosis por hora ÷ concentración',
    source: 'Fuente del método de cálculo',
  },
}

interface Props {
  mode: CalculatorMode
  definition: InfusionConversionCalculatorDefinition
  references: EvidenceReference[]
}

export function InfusionConversionCalculator({ mode, definition, references }: Props) {
  const { language, ui } = useI18n()
  const lang = language ?? 'pt'
  const t = copy[lang]
  const flow = useCalculatorFlowCopy()
  const number = (value: number) => formatCalculatorNumber(value, lang)
  const unit = (value: DoseRateUnit | DoseAmountUnit) => formatCalculatorUnit(value, lang)
  const [doseUnit, setDoseUnit] = useState(definition.doseRateUnits[0])
  const [amountUnit, setAmountUnit] = useState(definition.preparationAmountUnits[0])
  const [dose, setDose] = useState('')
  const [weight, setWeight] = useState('')
  const [amount, setAmount] = useState('')
  const [volume, setVolume] = useState('')
  const requiresWeight = doseUnit.includes('/kg/')
  let rate: number | null = null
  try {
    rate = calculatePrescriptionInfusionRate(definition, {
      doseRate: Number(dose), doseRateUnit: doseUnit,
      weightKg: requiresWeight ? Number(weight) : undefined,
      preparationAmount: Number(amount), preparationAmountUnit: amountUnit, preparationVolumeMl: Number(volume),
    })
  } catch { /* Incomplete or invalid data must not produce a pump rate. */ }

  return <article className="calculator-card">
    <header>
      <div className="calculator-card__meta"><span className="calculator-card__kind">{t.kind}</span></div>
      <h3>{definition.title}</h3>
      <p>{definition.description}</p>
      <p className="calculator-warning">{t.scope}</p>
    </header>
    <CalculatorFlow mode={mode} fields={[
      { id: 'dose', valid: isPositiveInput(dose), error: flow.positive, input: <>
        <label><span>{t.doseUnit}</span>
          <select value={doseUnit} onChange={event => { setDoseUnit(event.target.value as DoseRateUnit); setDose('') }}>
            {definition.doseRateUnits.map(value => <option key={value} value={value}>{unit(value)}</option>)}
          </select>
        </label>
        <label><span>{ui.targetDose} ({unit(doseUnit)})</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={dose} onChange={event => setDose(event.target.value)} />
        </label>
      </> },
      ...(requiresWeight ? [{ id: 'weight', valid: isPositiveInput(weight) && Number(weight) >= 1 && Number(weight) <= 400, error: flow.weight, input:
        <label><span>{ui.dosingWeight}</span>
          <input type="number" min="1" max="400" step="any" inputMode="decimal" value={weight} onChange={event => setWeight(event.target.value)} />
        </label>,
      }] : []),
      { id: 'amount', valid: isPositiveInput(amount), error: flow.positive, input: <>
        <label><span>{t.amountUnit}</span>
          <select value={amountUnit} onChange={event => { setAmountUnit(event.target.value as DoseAmountUnit); setAmount('') }}>
            {definition.preparationAmountUnits.map(value => <option key={value} value={value}>{unit(value)}</option>)}
          </select>
        </label>
        <label><span>{ui.preparationAmount} ({unit(amountUnit)})</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={amount} onChange={event => setAmount(event.target.value)} />
        </label>
      </> },
      { id: 'volume', valid: isPositiveInput(volume), error: flow.positive, input:
        <label><span>{t.volume}</span>
          <input type="number" min="0" step="any" inputMode="decimal" value={volume} onChange={event => setVolume(event.target.value)} />
          <small>{t.volumeHelp}</small>
        </label>,
      },
    ]}>
      {rate !== null ? <div className="calculator-result" aria-live="polite">
        <span>{ui.calculatedRate}</span><strong>{number(rate)} mL/h</strong>
        <small>{ui.targetDose}: {number(Number(dose))} {unit(doseUnit)}{requiresWeight ? ` · ${ui.dosingWeight}: ${number(Number(weight))} kg` : ''}</small>
        <small>{ui.preparation}: {number(Number(amount))} {unit(amountUnit)} / {number(Number(volume))} mL</small>
        <small>{t.concentration}: {number(Number(amount) / Number(volume))} {unit(amountUnit)}/mL</small>
        <small>{t.method}</small>
      </div> : <p className="calculator-placeholder">{requiresWeight ? ui.infusionPlaceholder : ui.infusionPlaceholderNoWeight}</p>}
    </CalculatorFlow>
    <p className="calculator-intro">{t.source}</p>
    <SourceLinks sourceIds={definition.sourceIds} references={references} />
  </article>
}

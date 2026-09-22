import type { DrugCalculatorDefinition, EvidenceReference } from '../types/drug'
import { InfusionRateCalculator } from './InfusionRateCalculator'
import { VolumeTimeCalculator } from './VolumeTimeCalculator'
import { WeightDoseCalculator } from './WeightDoseCalculator'
import { useState } from 'react'
import { useCalculatorFlowCopy, type CalculatorMode } from './CalculatorFlow'

interface DrugCalculatorsProps {
  calculators: DrugCalculatorDefinition[]
  references: EvidenceReference[]
}

export function DrugCalculators({ calculators, references }: DrugCalculatorsProps) {
  const t = useCalculatorFlowCopy()
  const [mode, setMode] = useState<CalculatorMode>('all')
  const [selected, setSelected] = useState(calculators[0]?.id)
  const active = calculators.some((calculator) => calculator.id === selected) ? selected : calculators[0]?.id
  return (
    <div className="calculator-grid">
      <div className="calculator-mode">
        <div role="group" aria-label={t.mode} className="calculator-mode__buttons">
          <button type="button" aria-pressed={mode === 'all'} onClick={() => setMode('all')}>{t.all}</button>
          <button type="button" aria-pressed={mode === 'questions'} onClick={() => setMode('questions')}>{t.questions}</button>
        </div>
        <p>{mode === 'all' ? t.automatic : t.guided}</p>
        {mode === 'questions' && calculators.length > 1 && <label>
          <span>{t.choose}</span>
          <select value={active} onChange={(event) => setSelected(event.target.value)}>
            {calculators.map((calculator) => <option key={calculator.id} value={calculator.id}>{calculator.title}</option>)}
          </select>
        </label>}
      </div>
      {calculators.map((calculator) => {
        let content
        switch (calculator.kind) {
          case 'weight-dose':
            content = <WeightDoseCalculator mode={mode} definition={calculator} references={references} />
            break
          case 'infusion-rate':
            content = <InfusionRateCalculator mode={mode} definition={calculator} references={references} />
            break
          case 'volume-time':
            content = <VolumeTimeCalculator mode={mode} definition={calculator} references={references} />
        }
        return <div key={calculator.id} hidden={mode === 'questions' && calculator.id !== active}>{content}</div>
      })}
    </div>
  )
}

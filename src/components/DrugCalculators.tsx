import type { DrugCalculatorDefinition, EvidenceReference } from '../types/drug'
import { InfusionRateCalculator } from './InfusionRateCalculator'
import { VolumeTimeCalculator } from './VolumeTimeCalculator'
import { WeightDoseCalculator } from './WeightDoseCalculator'

interface DrugCalculatorsProps {
  calculators: DrugCalculatorDefinition[]
  references: EvidenceReference[]
}

export function DrugCalculators({ calculators, references }: DrugCalculatorsProps) {
  return (
    <div className="calculator-grid">
      {calculators.map((calculator) => {
        switch (calculator.kind) {
          case 'weight-dose':
            return <WeightDoseCalculator key={calculator.id} definition={calculator} references={references} />
          case 'infusion-rate':
            return <InfusionRateCalculator key={calculator.id} definition={calculator} references={references} />
          case 'volume-time':
            return <VolumeTimeCalculator key={calculator.id} definition={calculator} references={references} />
        }
      })}
    </div>
  )
}

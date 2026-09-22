import { useI18n } from '../i18n/I18nContext'
import { hasDocumentedDose, type DoseAvailability } from '../lib/doseAvailability'
import type { Drug } from '../types/drug'

interface Props { drugs: Drug[]; value: DoseAvailability; onChange: (value: DoseAvailability) => void }

export function DoseAvailabilityFilter({ drugs, value, onChange }: Props) {
  const { ui } = useI18n()
  const withDose = drugs.filter(hasDocumentedDose).length
  const options: Array<{ value: DoseAvailability; label: string; count: number }> = [
    { value: 'all', label: ui.availabilityAll, count: drugs.length },
    { value: 'with-dose', label: ui.withDoses, count: withDose },
    { value: 'catalog-only', label: ui.catalogOnly, count: drugs.length - withDose },
  ]
  return <fieldset className="dose-filter">
    <legend>{ui.availabilityLabel}</legend>
    <div className="dose-filter__options">
      {options.map((option) => <button key={option.value} type="button" aria-pressed={value === option.value} onClick={() => onChange(option.value)}>
        {option.label} <span>{option.count}</span>
      </button>)}
    </div>
    <p>{ui.availabilityHint}</p>
  </fieldset>
}

import { useI18n } from '../i18n/I18nContext'
import { drugHref } from '../lib/routes'
import type { Drug } from '../types/drug'
import { Icon } from './Icon'
import { ValidationBadge } from './ValidationBadge'

interface DrugCardProps {
  drug: Drug
}

export function DrugCard({ drug }: DrugCardProps) {
  const { categories: localizedCategories } = useI18n()
  const categories = drug.categoryIds
    .map((categoryId) => localizedCategories.find((category) => category.id === categoryId))
    .filter((category) => category !== undefined)

  return (
    <a className="drug-card" href={drugHref(drug.id)}>
      <span className="drug-card__avatar">Rx</span>
      <span className="drug-card__body">
        <span className="drug-card__heading">
          <strong>{drug.name}</strong>
          <ValidationBadge status={drug.validationStatus} />
        </span>
        <span className="drug-card__class">{drug.drugClass}</span>
        <span className="drug-card__tags">
          <span className={`priority-tag priority-tag--${drug.priority.toLowerCase()}`}>{drug.priority}</span>
          {categories.slice(0, 3).map((category) => (
            <span key={category.id}>{category.shortName}</span>
          ))}
        </span>
      </span>
      <span className="drug-card__arrow"><Icon name="chevron-right" /></span>
    </a>
  )
}

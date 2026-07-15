import { categoryHref } from '../lib/routes'
import type { DrugCategory } from '../types/drug'
import { Icon } from './Icon'

interface CategoryCardProps {
  category: DrugCategory
  drugCount: number
}

export function CategoryCard({ category, drugCount }: CategoryCardProps) {
  return (
    <a
      className="category-card"
      href={categoryHref(category.id)}
      style={{ '--category-accent': category.accent, '--category-bg': category.accentBackground } as React.CSSProperties}
    >
      <span className="category-card__icon">{category.icon}</span>
      <span className="category-card__body">
        <strong>{category.name}</strong>
        <span>{category.description}</span>
        <small>{drugCount} {drugCount === 1 ? 'ficha estrutural' : 'fichas estruturais'}</small>
      </span>
      <span className="category-card__arrow"><Icon name="chevron-right" size={20} /></span>
    </a>
  )
}

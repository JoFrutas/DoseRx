import type { DoseAdjustment } from '../types/drug'
import { ValidationBadge } from './ValidationBadge'

interface DoseAdjustmentListProps {
  items: DoseAdjustment[]
}

export function DoseAdjustmentList({ items }: DoseAdjustmentListProps) {
  return (
    <div className="adjustment-list">
      {items.map((item) => (
        <article className="adjustment-item" key={item.context}>
          <div className="adjustment-item__top">
            <strong>{item.context}</strong>
            <ValidationBadge status={item.validationStatus} />
          </div>
          <p>{item.recommendation}</p>
          {item.notes && (
            <ul>
              {item.notes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          )}
        </article>
      ))}
    </div>
  )
}

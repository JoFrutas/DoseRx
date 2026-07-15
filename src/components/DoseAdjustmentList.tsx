import type { DoseAdjustment, EvidenceReference } from '../types/drug'
import { SourceLinks } from './SourceLinks'
import { ValidationBadge } from './ValidationBadge'

interface DoseAdjustmentListProps {
  items: DoseAdjustment[]
  references: EvidenceReference[]
}

export function DoseAdjustmentList({ items, references }: DoseAdjustmentListProps) {
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
          <SourceLinks sourceIds={item.sourceIds} references={references} />
        </article>
      ))}
    </div>
  )
}

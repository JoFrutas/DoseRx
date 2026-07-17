import type { EvidenceReference } from '../types/drug'
import { useI18n } from '../i18n/I18nContext'

interface SourceLinksProps {
  sourceIds: string[]
  references: EvidenceReference[]
}

export function SourceLinks({ sourceIds, references }: SourceLinksProps) {
  const { ui } = useI18n()
  const sources = sourceIds
    .map((sourceId) => references.find((reference) => reference.id === sourceId))
    .filter((reference) => reference !== undefined)

  if (sources.length === 0) return null

  return (
    <div className="source-links" aria-label={ui.sourceLinksAria}>
      <span>{ui.sources}</span>
      {sources.map((source) => (
        source.url ? (
          <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
            {source.source ?? source.title}
          </a>
        ) : (
          <span key={source.id}>{source.source ?? source.title}</span>
        )
      ))}
    </div>
  )
}

import type { EvidenceReference } from '../types/drug'

interface SourceLinksProps {
  sourceIds: string[]
  references: EvidenceReference[]
}

export function SourceLinks({ sourceIds, references }: SourceLinksProps) {
  const sources = sourceIds
    .map((sourceId) => references.find((reference) => reference.id === sourceId))
    .filter((reference) => reference !== undefined)

  if (sources.length === 0) return null

  return (
    <div className="source-links" aria-label="Fontes desta recomendação">
      <span>Fontes:</span>
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

import { ClinicalSection } from '../components/ClinicalSection'
import { DoseAdjustmentList } from '../components/DoseAdjustmentList'
import { DrugCalculators } from '../components/DrugCalculators'
import { Icon } from '../components/Icon'
import { SafetyBanner } from '../components/SafetyBanner'
import { SourceLinks } from '../components/SourceLinks'
import { ValidationBadge } from '../components/ValidationBadge'
import { useI18n } from '../i18n/I18nContext'
import { categoryHref, homeHref } from '../lib/routes'
import { NotFoundPage } from './NotFoundPage'

interface DrugDetailPageProps {
  drugId: string
}

export function DrugDetailPage({ drugId }: DrugDetailPageProps) {
  const { categories: localizedCategories, drugs, ui } = useI18n()
  const drug = drugs.find((candidate) => candidate.id === drugId)
  if (!drug) return <NotFoundPage />

  const categories = drug.categoryIds
    .map((categoryId) => localizedCategories.find((category) => category.id === categoryId))
    .filter((category) => category !== undefined)
  const verificationLabels = {
    'not-compared': ui.verificationNotCompared,
    consensus: ui.verificationConsensus,
    'context-dependent': ui.verificationContext,
    conflict: ui.verificationConflict,
  }

  return (
    <main className="content-width page-content drug-detail">
      <nav className="breadcrumbs" aria-label={ui.summary}>
        <a href={homeHref}>{ui.home}</a>
        <span>/</span>
        {categories[0] && <a href={categoryHref(categories[0].id)}>{categories[0].shortName}</a>}
        <span>/</span>
        <span aria-current="page">{drug.name}</span>
      </nav>

      <section className="drug-hero">
        <div className="drug-hero__mark">Rx</div>
        <div className="drug-hero__main">
          <div className="drug-hero__status">
            <ValidationBadge status={drug.validationStatus} confidence={drug.confidence} />
          </div>
          <h1>{drug.name}</h1>
          <p>{drug.drugClass}</p>
          <div className="drug-hero__tags">
            {categories.map((category) => (
              <a key={category.id} href={categoryHref(category.id)}>{category.shortName}</a>
            ))}
          </div>
        </div>
        <a className="back-link drug-hero__back" href={categories[0] ? categoryHref(categories[0].id) : homeHref}>
          <Icon name="arrow-left" size={18} /> {ui.back}
        </a>
      </section>

      {drug.validationStatus === 'source-linked' && <SafetyBanner status="source-linked" />}
      {drug.validationStatus === 'catalog-only' && <SafetyBanner status="catalog-only" />}

      <div className={`detail-layout${drug.validationStatus === 'catalog-only' ? ' detail-layout--catalog' : ''}`}>
        <aside className="detail-summary">
          <section>
            <span className="eyebrow">{ui.summary}</span>
            <dl>
              <div><dt>{ui.lastReview}</dt><dd>{drug.lastReviewedAt ?? '—'}</dd></div>
              <div><dt>{ui.priority}</dt><dd>{drug.priority}</dd></div>
              <div><dt>{ui.subcategories}</dt><dd>{drug.subcategories.join('; ') || '—'}</dd></div>
              <div><dt>{ui.references}</dt><dd>{drug.references.length}</dd></div>
              <div><dt>{ui.aliases}</dt><dd>{drug.aliases.join(', ') || '—'}</dd></div>
              <div><dt>{ui.routes}</dt><dd>{drug.routes.join('; ')}</dd></div>
            </dl>
          </section>
          <section className="review-note">
            <strong>{ui.reviewNotes}</strong>
            <ul>
              {drug.reviewNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </section>
          {drug.verification && (
            <section className={`verification-note verification-note--${drug.verification.status}`}>
              <strong>{verificationLabels[drug.verification.status]}</strong>
              <span>{drug.verification.comparedSourceIds.length} {ui.sourcesCompared} · {drug.verification.reviewedAt}</span>
              <p><b>{ui.scope}:</b> {drug.verification.scope}</p>
              <p>{drug.verification.summary}</p>
              {drug.verification.discrepancies.length > 0 && (
                <ul>
                  {drug.verification.discrepancies.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          )}
        </aside>

        {drug.validationStatus !== 'catalog-only' && <div className="detail-sections">
          {drug.calculators && drug.calculators.length > 0 && (
            <ClinicalSection title={ui.calculatorsTitle} eyebrow={ui.calculatorsEyebrow}>
              <p className="calculator-intro">{ui.calculatorsIntro}</p>
              <DrugCalculators calculators={drug.calculators} references={drug.references} />
            </ClinicalSection>
          )}

          <ClinicalSection title={ui.indicationsTitle} eyebrow={ui.indicationsEyebrow}>
            <ul className="plain-list">
              {drug.indications.map((indication) => <li key={indication}>{indication}</li>)}
            </ul>
          </ClinicalSection>

          <ClinicalSection title={ui.doseTitle} eyebrow={ui.doseEyebrow}>
            <DoseAdjustmentList items={drug.usualAdultDose} references={drug.references} />
          </ClinicalSection>

          <ClinicalSection title={ui.prescribeTitle} eyebrow={ui.prescribeEyebrow}>
            <div className="prescription-list">
              {drug.prescriptionExamples.map((example) => (
                <article key={example.title}>
                  <div>
                    <strong>{example.title}</strong>
                    <ValidationBadge status={example.validationStatus} />
                  </div>
                  <code>{example.prescription}</code>
                  {example.context && <p>{example.context}</p>}
                  {example.notes && <ul>{example.notes.map((note) => <li key={note}>{note}</li>)}</ul>}
                  <SourceLinks sourceIds={example.sourceIds} references={drug.references} />
                </article>
              ))}
            </div>
          </ClinicalSection>

          {drug.loadingDose && (
            <ClinicalSection title={ui.loadingDoseTitle} eyebrow={ui.loadingDoseEyebrow}>
              <DoseAdjustmentList items={[drug.loadingDose]} references={drug.references} />
            </ClinicalSection>
          )}

          <ClinicalSection title={ui.renalTitle} eyebrow={ui.renalEyebrow} tone="renal">
            <p className="section-summary">{drug.renalAdjustment.summary}</p>
            <DoseAdjustmentList items={drug.renalAdjustment.byKidneyFunction} references={drug.references} />
            <h3>{ui.intermittentHd}</h3>
            {drug.renalAdjustment.intermittentHemodialysis && (
              <DoseAdjustmentList items={[drug.renalAdjustment.intermittentHemodialysis]} references={drug.references} />
            )}
            <h3>{ui.continuousKrt}</h3>
            {drug.renalAdjustment.continuousKidneyReplacement && (
              <DoseAdjustmentList items={[drug.renalAdjustment.continuousKidneyReplacement]} references={drug.references} />
            )}
          </ClinicalSection>

          <ClinicalSection title={ui.hepaticTitle} eyebrow={ui.hepaticEyebrow} tone="hepatic">
            <p className="section-summary">{drug.hepaticAdjustment.summary}</p>
            <DoseAdjustmentList items={drug.hepaticAdjustment.bySeverity} references={drug.references} />
          </ClinicalSection>

          <ClinicalSection title={ui.monitoringTitle} eyebrow={ui.monitoringEyebrow}>
            <ul className="plain-list">
              {drug.therapeuticDrugMonitoring.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </ClinicalSection>

          <ClinicalSection title={ui.safetyTitle} eyebrow={ui.safetyEyebrow} tone="warning">
            <div className="two-column-list">
              <div><h3>{ui.contraindications}</h3><ul>{drug.contraindications.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h3>{ui.interactions}</h3><ul>{drug.interactions.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
          </ClinicalSection>

          <ClinicalSection title={ui.practicalTitle} eyebrow={ui.practicalEyebrow}>
            <ul className="plain-list">
              {drug.practicalNotes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </ClinicalSection>

          <ClinicalSection title={ui.bibliographyTitle} eyebrow={ui.bibliographyEyebrow}>
            {drug.references.length > 0 ? (
              <ol className="reference-list">
                {drug.references.map((reference) => (
                  <li key={reference.id}>
                    <strong>{reference.title}</strong>
                    {reference.source && <span>{reference.source}</span>}
                    {reference.url && <a href={reference.url} target="_blank" rel="noreferrer">{ui.openSource} <Icon name="external" size={14} /></a>}
                  </li>
                ))}
              </ol>
            ) : (
              <div className="empty-reference">
                <Icon name="book" />
                <div><strong>{ui.noSource}</strong><p>{ui.noSourceText}</p></div>
              </div>
            )}
          </ClinicalSection>
        </div>}
      </div>
    </main>
  )
}

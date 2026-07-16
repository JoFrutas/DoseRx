import { ClinicalSection } from '../components/ClinicalSection'
import { DoseAdjustmentList } from '../components/DoseAdjustmentList'
import { DrugCalculators } from '../components/DrugCalculators'
import { Icon } from '../components/Icon'
import { SafetyBanner } from '../components/SafetyBanner'
import { SourceLinks } from '../components/SourceLinks'
import { ValidationBadge } from '../components/ValidationBadge'
import { getCategoryById } from '../data/categories'
import { getDrugById } from '../data/drugs'
import { categoryHref, homeHref } from '../lib/routes'
import { NotFoundPage } from './NotFoundPage'

interface DrugDetailPageProps {
  drugId: string
}

export function DrugDetailPage({ drugId }: DrugDetailPageProps) {
  const drug = getDrugById(drugId)
  if (!drug) return <NotFoundPage />

  const categories = drug.categoryIds
    .map((categoryId) => getCategoryById(categoryId))
    .filter((category) => category !== undefined)
  const verificationLabels = {
    'not-compared': 'Comparação ainda não realizada',
    consensus: 'Consenso entre fontes',
    'context-dependent': 'Diferença dependente do contexto',
    conflict: 'Discrepância por resolver',
  }

  return (
    <main className="content-width page-content drug-detail">
      <nav className="breadcrumbs" aria-label="Navegação hierárquica">
        <a href={homeHref}>Início</a>
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
          <Icon name="arrow-left" size={18} /> Voltar
        </a>
      </section>

      {drug.validationStatus === 'in-review' && <SafetyBanner status="in-review" />}
      {drug.validationStatus === 'not-validated' && <SafetyBanner status="not-validated" />}

      <div className="detail-layout">
        <aside className="detail-summary">
          <section>
            <span className="eyebrow">Resumo da ficha</span>
            <dl>
              <div><dt>Última revisão</dt><dd>{drug.lastReviewedAt ?? '—'}</dd></div>
              <div><dt>Prioridade</dt><dd>{drug.priority}</dd></div>
              <div><dt>Subcategorias</dt><dd>{drug.subcategories.join('; ') || '—'}</dd></div>
              <div><dt>Referências</dt><dd>{drug.references.length}</dd></div>
              <div><dt>Aliases</dt><dd>{drug.aliases.join(', ') || '—'}</dd></div>
              <div><dt>Vias</dt><dd>{drug.routes.join('; ')}</dd></div>
            </dl>
          </section>
          <section className="review-note">
            <strong>Notas de revisão</strong>
            <ul>
              {drug.reviewNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </section>
          {drug.verification && (
            <section className={`verification-note verification-note--${drug.verification.status}`}>
              <strong>{verificationLabels[drug.verification.status]}</strong>
              <span>{drug.verification.comparedSourceIds.length} fontes comparadas · {drug.verification.reviewedAt}</span>
              <p><b>Âmbito:</b> {drug.verification.scope}</p>
              <p>{drug.verification.summary}</p>
              {drug.verification.discrepancies.length > 0 && (
                <ul>
                  {drug.verification.discrepancies.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          )}
        </aside>

        <div className="detail-sections">
          {drug.calculators && drug.calculators.length > 0 && (
            <ClinicalSection title="Calculadoras documentadas" eyebrow="Cálculo assistido">
              <p className="calculator-intro">
                Resultados matemáticos baseados nos parâmetros introduzidos. A calculadora não selecciona
                a indicação, o peso de dose, a função orgânica nem a preparação local.
              </p>
              <DrugCalculators calculators={drug.calculators} references={drug.references} />
            </ClinicalSection>
          )}

          <ClinicalSection title="Indicações comuns em UCI" eyebrow="Enquadramento">
            <ul className="plain-list">
              {drug.indications.map((indication) => <li key={indication}>{indication}</li>)}
            </ul>
          </ClinicalSection>

          <ClinicalSection title="Dose habitual no adulto" eyebrow="Posologia">
            <DoseAdjustmentList items={drug.usualAdultDose} references={drug.references} />
          </ClinicalSection>

          <ClinicalSection title="Como prescrever" eyebrow="Exemplos práticos">
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
            <ClinicalSection title="Dose de carga" eyebrow="Se aplicável">
              <DoseAdjustmentList items={[drug.loadingDose]} references={drug.references} />
            </ClinicalSection>
          )}

          <ClinicalSection title="Ajuste renal" eyebrow="ClCr / eGFR" tone="renal">
            <p className="section-summary">{drug.renalAdjustment.summary}</p>
            <DoseAdjustmentList items={drug.renalAdjustment.byKidneyFunction} references={drug.references} />
            <h3>Hemodiálise intermitente</h3>
            {drug.renalAdjustment.intermittentHemodialysis && (
              <DoseAdjustmentList items={[drug.renalAdjustment.intermittentHemodialysis]} references={drug.references} />
            )}
            <h3>Técnicas contínuas de substituição renal</h3>
            {drug.renalAdjustment.continuousKidneyReplacement && (
              <DoseAdjustmentList items={[drug.renalAdjustment.continuousKidneyReplacement]} references={drug.references} />
            )}
          </ClinicalSection>

          <ClinicalSection title="Ajuste hepático" eyebrow="Função hepática" tone="hepatic">
            <p className="section-summary">{drug.hepaticAdjustment.summary}</p>
            <DoseAdjustmentList items={drug.hepaticAdjustment.bySeverity} references={drug.references} />
          </ClinicalSection>

          <ClinicalSection title="Monitorização terapêutica" eyebrow="TDM e parâmetros">
            <ul className="plain-list">
              {drug.therapeuticDrugMonitoring.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </ClinicalSection>

          <ClinicalSection title="Contraindicações e interacções" eyebrow="Segurança" tone="warning">
            <div className="two-column-list">
              <div><h3>Contraindicações principais</h3><ul>{drug.contraindications.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h3>Interacções importantes</h3><ul>{drug.interactions.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
          </ClinicalSection>

          <ClinicalSection title="Notas práticas de Medicina Intensiva" eyebrow="À cabeceira">
            <ul className="plain-list">
              {drug.practicalNotes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </ClinicalSection>

          <ClinicalSection title="Referências bibliográficas" eyebrow="Fontes">
            {drug.references.length > 0 ? (
              <ol className="reference-list">
                {drug.references.map((reference) => (
                  <li key={reference.id}>
                    <strong>{reference.title}</strong>
                    {reference.source && <span>{reference.source}</span>}
                    {reference.url && <a href={reference.url} target="_blank" rel="noreferrer">Abrir fonte <Icon name="external" size={14} /></a>}
                  </li>
                ))}
              </ol>
            ) : (
              <div className="empty-reference">
                <Icon name="book" />
                <div><strong>Nenhuma fonte associada</strong><p>Esta ficha ainda não tem referências documentais e não deve ser usada para prescrição.</p></div>
              </div>
            )}
          </ClinicalSection>
        </div>
      </div>
    </main>
  )
}

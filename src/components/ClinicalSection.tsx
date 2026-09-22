import type { ReactNode } from 'react'

interface ClinicalSectionProps {
  id?: string
  title: string
  eyebrow?: string
  children: ReactNode
  tone?: 'default' | 'renal' | 'hepatic' | 'warning'
}

export function ClinicalSection({ id, title, eyebrow, children, tone = 'default' }: ClinicalSectionProps) {
  return (
    <section id={id} tabIndex={id ? -1 : undefined} className={`clinical-section clinical-section--${tone}`}>
      <header>
        {eyebrow && <span>{eyebrow}</span>}
        <h2>{title}</h2>
      </header>
      <div className="clinical-section__content">{children}</div>
    </section>
  )
}

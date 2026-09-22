import type { Drug } from '../types/drug'

export type DoseAvailability = 'all' | 'with-dose' | 'catalog-only'

export function hasDocumentedDose(drug: Drug): boolean {
  return drug.validationStatus !== 'catalog-only' && drug.usualAdultDose.length > 0
}

export function filterByDoseAvailability(drugs: Drug[], availability: DoseAvailability): Drug[] {
  if (availability === 'all') return drugs
  return drugs.filter((drug) => hasDocumentedDose(drug) === (availability === 'with-dose'))
}

// Explicit navigation pairs only. Never merge formulations, indications or doses.
const doseCompanions: Readonly<Record<string, string>> = {
  'benzilpenicilina-penicilina-g': 'benzilpenicilina',
  'insulina-humana-regular': 'insulina-regular',
}

export function getDoseCompanion(drugId: string, source: Drug[]): Drug | undefined {
  const companionId = doseCompanions[drugId]
  return source.find((drug) => drug.id === companionId && hasDocumentedDose(drug))
}

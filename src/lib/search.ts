import type { Drug, DrugCategory } from '../types/drug'

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('pt-PT')
    .trim()
}

export function getDrugSearchText(drug: Drug, categories: DrugCategory[]): string {
  const categoryText = categories
    .filter((category) => drug.categoryIds.includes(category.id))
    .flatMap((category) => [category.name, category.shortName, ...category.searchTerms])

  return normalizeSearchText(
    [
      drug.name,
      drug.drugClass,
      drug.priority,
      ...drug.aliases,
      ...drug.subcategories,
      ...drug.indications,
      ...categoryText,
    ].join(' '),
  )
}

export function searchDrugs(
  source: Drug[],
  query: string,
  categories: DrugCategory[],
): Drug[] {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return []

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean)

  return source.filter((drug) => {
    const searchableText = getDrugSearchText(drug, categories)
    return tokens.every((token) => searchableText.includes(token))
  })
}

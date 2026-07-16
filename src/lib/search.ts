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

  return source
    .map((drug, sourceIndex) => {
      const normalizedName = normalizeSearchText(drug.name)
      const normalizedAliases = drug.aliases.map(normalizeSearchText)
      const nameMatchesTokens = tokens.every((token) => normalizedName.includes(token))
      const aliasMatchesTokens = normalizedAliases.some((alias) => (
        tokens.every((token) => alias.includes(token))
      ))
      const searchableText = getDrugSearchText(drug, categories)
      const matches = tokens.every((token) => searchableText.includes(token))

      let relevance = 6
      if (normalizedName === normalizedQuery) relevance = 0
      else if (normalizedAliases.includes(normalizedQuery)) relevance = 1
      else if (normalizedName.startsWith(normalizedQuery)) relevance = 2
      else if (normalizedAliases.some((alias) => alias.startsWith(normalizedQuery))) relevance = 3
      else if (nameMatchesTokens) relevance = 4
      else if (aliasMatchesTokens) relevance = 5

      return { drug, matches, relevance, sourceIndex }
    })
    .filter((result) => result.matches)
    .sort((first, second) => (
      first.relevance - second.relevance
      || first.sourceIndex - second.sourceIndex
    ))
    .map(({ drug }) => drug)
}

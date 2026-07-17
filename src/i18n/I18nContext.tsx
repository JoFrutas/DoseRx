import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { drugCategories as baseCategories } from '../data/categories'
import { drugs as baseDrugs } from '../data/drugs'
import type { Drug, DrugCategory } from '../types/drug'
import { localizeCategory, localizeDrug, type TranslationMap } from './localize'
import { uiTranslations, type Language, type UiStrings } from './translations'

interface I18nContextValue {
  language: Language | null
  setLanguage: (language: Language) => void
  ui: UiStrings
  drugs: Drug[]
  categories: DrugCategory[]
  loading: boolean
}

const I18nContext = createContext<I18nContextValue | null>(null)

const translationLoaders: Readonly<Record<Exclude<Language, 'pt'>, () => Promise<{
  default: Record<string, string>
}>>> = {
  en: () => import('./generated/en.json'),
  es: () => import('./generated/es.json'),
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language | null>(null)
  const [translations, setTranslations] = useState<TranslationMap>({})
  const [loading, setLoading] = useState(false)

  const setLanguage = useCallback((nextLanguage: Language) => {
    setTranslations({})
    setLoading(nextLanguage !== 'pt')
    setLanguageState(nextLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language ?? 'pt'
    if (!language || language === 'pt') {
      setTranslations({})
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)
    translationLoaders[language]().then((module) => {
      if (!active) return
      setTranslations(module.default)
      setLoading(false)
    }).catch(() => {
      if (!active) return
      setTranslations({})
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [language])

  const localizedDrugs = useMemo(() => (
    language && language !== 'pt'
      ? baseDrugs.map((drug) => localizeDrug(drug, translations))
      : baseDrugs
  ), [language, translations])

  const localizedCategories = useMemo(() => (
    language && language !== 'pt'
      ? baseCategories.map((category) => localizeCategory(category, translations))
      : baseCategories
  ), [language, translations])

  const value = useMemo<I18nContextValue>(() => ({
    language,
    setLanguage,
    ui: uiTranslations[language ?? 'pt'],
    drugs: localizedDrugs,
    categories: localizedCategories,
    loading,
  }), [language, localizedCategories, localizedDrugs, loading, setLanguage])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}

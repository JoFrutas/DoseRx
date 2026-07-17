import { Icon } from './Icon'
import { useI18n } from '../i18n/I18nContext'

interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const { ui } = useI18n()
  return (
    <div className="search-shell">
      <label className="sr-only" htmlFor="drug-search">{ui.searchLabel}</label>
      <span className="search-shell__icon"><Icon name="search" size={24} /></span>
      <input
        id="drug-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={ui.searchPlaceholder}
        autoComplete="off"
        spellCheck="false"
      />
      {query && (
        <button
          className="search-shell__clear"
          type="button"
          onClick={() => onQueryChange('')}
          aria-label={ui.clearSearch}
        >
          <Icon name="clear" size={18} />
        </button>
      )}
    </div>
  )
}

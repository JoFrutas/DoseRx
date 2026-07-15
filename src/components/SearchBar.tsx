import { Icon } from './Icon'

interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="search-shell">
      <label className="sr-only" htmlFor="drug-search">Pesquisar fármacos</label>
      <span className="search-shell__icon"><Icon name="search" size={24} /></span>
      <input
        id="drug-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Pesquisar por fármaco, classe, indicação ou alias…"
        autoComplete="off"
        spellCheck="false"
      />
      {query && (
        <button
          className="search-shell__clear"
          type="button"
          onClick={() => onQueryChange('')}
          aria-label="Limpar pesquisa"
        >
          <Icon name="clear" size={18} />
        </button>
      )}
    </div>
  )
}

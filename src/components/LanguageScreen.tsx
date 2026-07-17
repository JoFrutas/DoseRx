import { LogoMark } from './LogoMark'
import { languageOptions, type Language } from '../i18n/translations'

interface LanguageScreenProps {
  onSelect: (language: Language) => void
}

export function LanguageScreen({ onSelect }: LanguageScreenProps) {
  return (
    <main className="language-screen">
      <div className="language-screen__panel">
        <LogoMark size="large" />
        <h1>Dose<span>Rx</span></h1>
        <p>Choose language · Escolha o idioma · Elegir idioma</p>
        <div className="language-screen__options">
          {languageOptions.map((option) => (
            <button key={option.code} type="button" onClick={() => onSelect(option.code)}>
              <span aria-hidden="true">{option.flag}</span>
              <span>
                <strong>{option.label}</strong>
                <small>{option.region}</small>
              </span>
              <b aria-hidden="true">›</b>
            </button>
          ))}
        </div>
        <small>Clinical dosing reference · v0.4</small>
      </div>
    </main>
  )
}

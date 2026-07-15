import { homeHref } from '../lib/routes'

export function NotFoundPage() {
  return (
    <main className="content-width page-content">
      <div className="not-found">
        <span>404</span>
        <h1>Página não encontrada</h1>
        <p>O endereço pode estar incompleto ou a ficha já não existir.</p>
        <a className="primary-button" href={homeHref}>Voltar ao início</a>
      </div>
    </main>
  )
}

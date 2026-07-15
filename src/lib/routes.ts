import { useSyncExternalStore } from 'react'

export type AppRoute =
  | { name: 'home' }
  | { name: 'category'; categoryId: string }
  | { name: 'drug'; drugId: string }
  | { name: 'not-found' }

const getHashSnapshot = (): string => window.location.hash || '#/'

const subscribeToHash = (callback: () => void): (() => void) => {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

export function useHashLocation(): string {
  return useSyncExternalStore(subscribeToHash, getHashSnapshot, () => '#/')
}

export function parseRoute(hash: string): AppRoute {
  const path = hash.replace(/^#/, '').replace(/^\//, '')
  if (!path) return { name: 'home' }

  const [section, rawId, ...rest] = path.split('/')
  if (!rawId || rest.length > 0) return { name: 'not-found' }

  const id = decodeURIComponent(rawId)
  if (section === 'category') return { name: 'category', categoryId: id }
  if (section === 'drug') return { name: 'drug', drugId: id }
  return { name: 'not-found' }
}

export const homeHref = '#/'
export const categoryHref = (categoryId: string): string =>
  `#/category/${encodeURIComponent(categoryId)}`
export const drugHref = (drugId: string): string => `#/drug/${encodeURIComponent(drugId)}`

export type IconName =
  | 'arrow-left'
  | 'book'
  | 'chevron-right'
  | 'clear'
  | 'external'
  | 'search'
  | 'shield'

interface IconProps {
  name: IconName
  size?: number
}

export function Icon({ name, size = 20 }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (name) {
    case 'arrow-left':
      return <svg {...common}><path d="m15 18-6-6 6-6" /></svg>
    case 'book':
      return <svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></svg>
    case 'chevron-right':
      return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>
    case 'clear':
      return <svg {...common}><path d="M18 6 6 18M6 6l12 12" /></svg>
    case 'external':
      return <svg {...common}><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
    case 'shield':
      return <svg {...common}><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" /><path d="M12 8v4M12 16h.01" /></svg>
  }
}

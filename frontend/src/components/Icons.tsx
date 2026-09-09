import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const iconDefaults = {
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function HouseMark(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
      <path d="M4 18 20 5l16 13v17H24V24h-8v11H4V18Z" fill="currentColor" />
      <path d="m11 18 9-7 9 7H11Z" fill="var(--paper, #f5f3ed)" />
    </svg>
  )
}

export function BagIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M5.5 8.5h13l1 12h-15l1-12Z" />
      <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
    </svg>
  )
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M20.8 4.7a5.4 5.4 0 0 0-7.6 0L12 5.9l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.7a5.4 5.4 0 0 0 0-7.6Z" />
    </svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M4 7h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

import { useEffect, useLayoutEffect, useState } from 'react'

export type Page = 'home' | 'lookbook' | 'fit-studio'
const paths: Record<string, Page> = {
  '/': 'home',
  '/lookbook': 'lookbook',
  '/fit-studio': 'fit-studio',
}
const pageAtLocation = () =>
  paths[window.location.pathname.replace(/\/$/, '') || '/'] ?? 'home'
const titles: Record<Page, string> = {
  home: 'FitHouse — No rules. Just fits.',
  lookbook: 'Lookbook — FitHouse',
  'fit-studio': 'Fit Studio — FitHouse',
}

export function usePageNavigation() {
  const [page, setPage] = useState<Page>(pageAtLocation)

  useEffect(() => {
    const sync = () => setPage(pageAtLocation())
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href]',
      )
      if (!link || link.target || link.hasAttribute('download')) return
      const url = new URL(link.href, window.location.href)
      const path = url.pathname.replace(/\/$/, '') || '/'
      if (url.origin !== window.location.origin || !(path in paths)) return
      if (path === (window.location.pathname.replace(/\/$/, '') || '/')) return
      event.preventDefault()
      window.history.pushState(null, '', url)
      sync()
    }
    document.addEventListener('click', onClick)
    window.addEventListener('popstate', sync)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  useLayoutEffect(() => {
    document.title = titles[page]
    const target = document.getElementById(window.location.hash.slice(1))
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [page])

  const navigate = (href: string) => {
    window.history.pushState(null, '', href)
    setPage(pageAtLocation())
  }

  return { page, navigate }
}

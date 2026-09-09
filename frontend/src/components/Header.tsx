import { AnimatePresence, motion, useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { BagIcon, CloseIcon, HouseMark, MenuIcon, SearchIcon } from './Icons'

interface HeaderProps {
  cartCount: number
  onOpenCart: () => void
  onSearch: () => void
}

const navigation = [
  { href: '#shop', label: 'Colecția 001' },
  { href: '#story', label: 'Despre House' },
  { href: '#quality', label: 'Fit & detalii' },
]

export function Header({ cartCount, onOpenCart, onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButton.current?.focus()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main">Sari la conținut</a>
      <div className="announcement mono"><span className="status-dot" /> GOOD FITS, DELIVERED. <span className="announcement__detail">TRANSPORT GRATUIT PESTE 60 EUR</span><span aria-hidden="true">↗</span></div>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="FitHouse, pagina principală"><HouseMark />FitHouse<span className="wordmark-period">®</span></a>
          <nav className="desktop-nav" aria-label="Navigație principală">
            {navigation.map(({ href, label }) => <a href={href} key={href}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <span className="header-locale mono">RO / EUR</span>
            <button className="icon-button" type="button" aria-label="Caută în colecție" onClick={() => { setMenuOpen(false); onSearch() }}><SearchIcon /></button>
            <button className="cart-button" type="button" onClick={() => { setMenuOpen(false); onOpenCart() }} aria-label={`Deschide coșul, ${cartCount} produse`}>
              <BagIcon /><span className="cart-label">Coș</span><motion.span key={cartCount} className="cart-count" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>{cartCount}</motion.span>
            </button>
            <button ref={menuButton} className="icon-button mobile-menu-button" type="button" aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <CloseIcon /> : <MenuIcon />}</button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {menuOpen && <motion.nav id="mobile-navigation" className="mobile-menu" aria-label="Navigație mobilă" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {navigation.map(({ href, label }, index) => <a href={href} key={href} onClick={() => setMenuOpen(false)}><span className="mono">0{index + 1}</span>{label}<span>↗</span></a>)}
          </motion.nav>}
        </AnimatePresence>
        <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} />
      </header>
    </>
  )
}

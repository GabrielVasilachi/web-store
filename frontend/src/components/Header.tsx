import { useState } from 'react'
import { BagIcon, CloseIcon, MenuIcon, SearchIcon } from './Icons'

interface HeaderProps {
  cartCount: number
  onOpenCart: () => void
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="announcement">
        <p>Transport gratuit peste 60 EUR</p>
        <p className="announcement__drop">Drop 001 — disponibil acum</p>
        <p>Retur simplu în 30 de zile</p>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Valentin, pagina principală">
          VALENTIN<span>®</span>
        </a>

        <nav className="desktop-nav" aria-label="Navigație principală">
          <a href="#shop">Shop</a>
          <a href="#story">Poveste</a>
          <a href="#quality">Fit & material</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button desktop-search" type="button" aria-label="Caută">
            <SearchIcon />
          </button>
          <button className="cart-button" type="button" onClick={onOpenCart}>
            <BagIcon />
            <span>Coș</span>
            <span className="cart-count" aria-label={`${cartCount} produse în coș`}>
              {cartCount}
            </span>
          </button>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Navigație mobilă">
          <a href="#shop" onClick={closeMenu}>01 — Shop</a>
          <a href="#story" onClick={closeMenu}>02 — Poveste</a>
          <a href="#quality" onClick={closeMenu}>03 — Fit & material</a>
        </nav>
        <p>Maiouri create pentru zile fără frână.</p>
      </div>
    </>
  )
}

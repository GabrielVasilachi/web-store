import { motion, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import editorialImage from '../assets/campaign/fithouse-afterhours.webp'
import {
  ArrowUpRightIcon,
  BagIcon,
  CloseIcon,
  HouseMark,
  MenuIcon,
  SearchIcon,
} from './Icons'
import { ScrambleText } from './MotionEffects'

interface HeaderProps {
  cartCount: number
  onOpenCart: () => void
  onSearch: () => void
}

const navigation = [
  { href: '#shop', label: 'The drop', number: '01' },
  { href: '#story', label: 'The attitude', number: '02' },
  { href: '#quality', label: 'The details', number: '03' },
  { href: '#club', label: 'The inner circle', number: '04' },
]

export function Header({ cartCount, onOpenCart, onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !menuOpen) return
    const opener = menuButton.current
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      opener?.focus({ preventScroll: true })
    }
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main">
        Sari la conținut
      </a>
      <div className="announcement mono">
        <span>
          NOT FOR EVERYONE.{' '}
          <span className="announcement__accent">FOR YOU.</span>
        </span>
        <span>
          TRANSPORT GRATUIT PESTE 60 EUR <span aria-hidden="true">↗</span>
        </span>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <a
            className="wordmark"
            href="#top"
            aria-label="FitHouse, pagina principală"
          >
            <HouseMark />
            FitHouse<span className="wordmark-period">®</span>
          </a>
          <nav className="desktop-nav" aria-label="Navigație principală">
            {navigation.slice(0, 3).map(({ href, label }) => (
              <a href={href} key={href}>
                <ScrambleText text={label} />
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <span className="header-locale mono">RO / EUR</span>
            <button
              className="icon-button header-search"
              type="button"
              aria-label="Caută în colecție"
              onClick={onSearch}
            >
              <SearchIcon />
            </button>
            <button
              className="cart-button"
              type="button"
              onClick={onOpenCart}
              aria-label={`Deschide coșul, ${cartCount} produse`}
            >
              <BagIcon />
              <span className="cart-label">BAG</span>
              <motion.span
                key={cartCount}
                className="cart-count"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                {cartCount}
              </motion.span>
            </button>
            <button
              ref={menuButton}
              className="menu-button"
              type="button"
              aria-label="Deschide meniul"
              aria-expanded={menuOpen}
              aria-controls="fullscreen-navigation"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
        <motion.div
          className="reading-progress"
          style={{ scaleX: scrollYProgress }}
        />
      </header>
      <dialog
        ref={dialogRef}
        className="menu-dialog"
        id="fullscreen-navigation"
        aria-label="Navigație FitHouse"
        onCancel={(event) => {
          event.preventDefault()
          setMenuOpen(false)
        }}
      >
        {menuOpen && (
          <motion.div
            className="fullscreen-menu"
            initial={reducedMotion ? false : { opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="fullscreen-menu__top">
              <span className="wordmark">FitHouse®</span>
              <button
                className="icon-button"
                type="button"
                aria-label="Închide meniul"
                onClick={() => setMenuOpen(false)}
                autoFocus
              >
                <CloseIcon />
              </button>
            </div>
            <nav aria-label="Toate secțiunile">
              {navigation.map(({ href, label, number }, index) => (
                <motion.a
                  href={href}
                  key={href}
                  onClick={() => setMenuOpen(false)}
                  initial={reducedMotion ? false : { x: -35, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <span className="mono">/{number}</span>
                  <span>{label}</span>
                  <ArrowUpRightIcon />
                </motion.a>
              ))}
            </nav>
            <div className="fullscreen-menu__image">
              <img
                src={editorialImage}
                alt="Campania FitHouse After Hours"
                width="1536"
                height="1024"
              />
              <span className="mono">
                COME AS YOU ARE. LEAVE AN IMPRESSION.
              </span>
            </div>
            <div className="fullscreen-menu__bottom mono">
              <a href="mailto:hello@fithouse.store">HELLO@FITHOUSE.STORE ↗</a>
              <span>UNFILTERED SINCE 2026.</span>
            </div>
          </motion.div>
        )}
      </dialog>
    </>
  )
}

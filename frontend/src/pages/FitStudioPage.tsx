import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState, type CSSProperties } from 'react'
import { ArrowUpRightIcon, BagIcon, PlusIcon } from '../components/Icons'
import { AttractLink, Reveal } from '../components/MotionEffects'
import { TiltSurface } from '../components/TiltSurface'
import { products } from '../data/products'
import { formatPrice } from '../utils/currency'
import './Pages.css'

const careNotes = [
  {
    title: 'Alege proporția, nu regula.',
    text: 'Piesele sunt relaxed și unisex. Începe cu mărimea pe care o porți de obicei și gândește-te cât spațiu vrei în ținută. Pentru dimensiunile exacte ale unei piese, cere-ne măsurătorile înainte de comandă.',
  },
  {
    title: 'Construiește în jurul piesei.',
    text: 'Lasă printul în centru și păstrează restul simplu. Denim pentru zi, cargo pentru mișcare sau pantaloni negri pentru seară. Aceeași piesă, altă energie.',
  },
  {
    title: 'Ai grijă de ce porți.',
    text: 'Verifică întotdeauna eticheta de întreținere a produsului. Întoarce piesa pe dos pentru a proteja printul și evită călcarea directă pe grafică.',
  },
]

export function FitStudioPage({
  onAddToCart,
}: {
  onAddToCart: (productId: string, size: string) => void
}) {
  const [productId, setProductId] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('piece')
    return (
      products.find((product) => product.id === requested)?.id ?? products[0].id
    )
  })
  const [size, setSize] = useState('M')
  const [angle, setAngle] = useState(0)
  const reducedMotion = useReducedMotion()
  const product = products.find((item) => item.id === productId) ?? products[0]
  const selectProduct = (id: string) => {
    setProductId(id)
    setAngle(0)
    const url = new URL(window.location.href)
    url.searchParams.set('piece', id)
    window.history.replaceState(null, '', url)
  }

  return (
    <div className="studio-page">
      <section className="studio-intro" aria-labelledby="studio-title">
        <div className="page-eyebrow mono">
          <span>FITHOUSE / PERSONAL STYLE LAB</span>
          <span>
            <i className="status-dot" /> STUDIO IS OPEN
          </span>
        </div>
        <div className="studio-title-row">
          <Reveal>
            <h1 id="studio-title">
              FIT <em>STUDIO.</em>
              <sup>®</sup>
            </h1>
          </Reveal>
          <div>
            <span className="studio-asterisk" aria-hidden="true">
              ✳
            </span>
            <p>
              Piesa ta. Mărimea ta.
              <br />
              Restul ține de atitudine.
            </p>
          </div>
        </div>
      </section>
      <section
        className="studio-workspace"
        aria-label="Configurează piesa ta"
        style={
          {
            '--piece-surface': product.surface,
            '--piece-accent': product.accent,
          } as CSSProperties
        }
      >
        <div className="studio-viewer">
          <div className="studio-viewer-top mono">
            <span>OBJECT / 00{products.indexOf(product) + 1}</span>
            <span>DROP 001 — UNISEX</span>
          </div>
          <div className="studio-scene">
            <span className="studio-background-word" aria-hidden="true">
              YOUR
              <br />
              RULES.
            </span>
            <div
              className="studio-orbit studio-orbit--one"
              aria-hidden="true"
            />
            <div
              className="studio-orbit studio-orbit--two"
              aria-hidden="true"
            />
            <div className="studio-pedestal" aria-hidden="true" />
            <TiltSurface className="studio-product-tilt">
              <motion.div
                className="studio-product-angle"
                animate={{ rotateY: angle }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    className="studio-product-image"
                    key={product.id}
                    src={product.image}
                    alt={`${product.name}, ${product.color}, vedere din față`}
                    width="768"
                    height="1152"
                    initial={{
                      opacity: 0,
                      y: reducedMotion ? 0 : 20,
                      rotate: reducedMotion ? 0 : -6,
                    }}
                    animate={{ opacity: 1, y: 0, rotate: -6 }}
                    exit={{ opacity: 0, y: reducedMotion ? 0 : -15 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </motion.div>
            </TiltSurface>
            <span className="studio-floating-tag mono">
              RELAXED FIT
              <br />
              <strong>100% YOU.</strong>
            </span>
          </div>
          <div className="studio-angle-control">
            <label htmlFor="piece-angle" className="mono">
              ÎNCLINĂ PIESA
            </label>
            <input
              id="piece-angle"
              type="range"
              min="-30"
              max="30"
              value={angle}
              onChange={(event) => setAngle(Number(event.target.value))}
              aria-valuetext={`${angle} grade`}
            />
            <button
              type="button"
              onClick={() => setAngle(0)}
              aria-label="Resetează înclinarea piesei"
            >
              ↺
            </button>
          </div>
        </div>
        <div className="studio-config">
          <div className="studio-config-heading">
            <span className="section-kicker">01 / ALEGE-ȚI ENERGIA</span>
            <span className="mono">(04 PIESE)</span>
          </div>
          <div
            className="studio-pieces"
            role="group"
            aria-label="Alege produsul"
          >
            {products.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.name}
                aria-pressed={product.id === item.id}
                onClick={() => selectProduct(item.id)}
                style={{ backgroundColor: item.surface }}
              >
                <img src={item.image} alt="" width="100" height="150" />
                <span style={{ backgroundColor: item.accent }} />
                {item.id === product.id && <b aria-hidden="true">↗</b>}
              </button>
            ))}
          </div>
          <div className="studio-product-info" aria-live="polite">
            <span className="mono">{product.subtitle.toUpperCase()}</span>
            <div>
              <h2>{product.name}</h2>
              <span className="studio-price">{formatPrice(product.price)}</span>
            </div>
            <p>{product.description}</p>
            <span className="studio-color mono">
              <i style={{ backgroundColor: product.accent }} />
              {product.color} / RELAXED / UNISEX
            </span>
          </div>
          <div className="studio-size-heading">
            <span className="section-kicker">02 / ALEGE MĂRIMEA</span>
            <a href="#studio-guide" className="mono">
              CUM ALEGI? ↗
            </a>
          </div>
          <div className="studio-sizes" role="group" aria-label="Alege mărimea">
            {product.sizes.map((value) => (
              <button
                type="button"
                key={value}
                onClick={() => setSize(value)}
                aria-pressed={size === value}
              >
                {value}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="studio-add button button--dark"
            onClick={() => onAddToCart(product.id, size)}
          >
            <BagIcon />
            <span>Adaugă în bag — {size}</span>
            <span>{formatPrice(product.price)} ↗</span>
          </button>
          <div className="studio-summary mono">
            <span>PIESA TA. ALEASĂ DE TINE.</span>
            <span>XS — XL</span>
          </div>
          <a className="studio-lookbook-link" href="/lookbook">
            <span>
              Ai piesa. Cauți inspirația?
              <strong>Vezi cum o porți în Lookbook.</strong>
            </span>
            <ArrowUpRightIcon />
          </a>
        </div>
      </section>
      <section
        className="studio-guide section-space"
        id="studio-guide"
        aria-labelledby="studio-guide-title"
      >
        <Reveal className="studio-guide-heading">
          <span className="section-kicker">03 / GET INTO YOUR ELEMENT</span>
          <h2 id="studio-guide-title">
            GOOD FIT.
            <br />
            <em>GOOD FEELING.</em>
          </h2>
          <p>
            Un punct de pornire.
            <br />
            Niciodată un set de reguli.
          </p>
          <a
            className="text-link"
            href={`mailto:hello@fithouse.store?subject=${encodeURIComponent(`Măsurători ${product.name}, mărimea ${size}`)}`}
          >
            Cere măsurătorile piesei <ArrowUpRightIcon />
          </a>
        </Reveal>
        <div className="studio-guide-notes">
          {careNotes.map((note, index) => (
            <details key={note.title} open={index === 0}>
              <summary>
                <span className="mono">0{index + 1}</span>
                <h3>{note.title}</h3>
                <PlusIcon />
              </summary>
              <p>{note.text}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="page-next page-next--violet">
        <span className="mono">STILUL TĂU MERITĂ SĂ IASĂ DIN STUDIO.</span>
        <h2>
          TAKE IT <em>OUTSIDE.</em>
        </h2>
        <AttractLink href="/lookbook" className="button--dark">
          Explorează Lookbook
        </AttractLink>
      </section>
    </div>
  )
}

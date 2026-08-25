import { useRef, type PointerEvent } from 'react'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/currency'
import { ArrowUpRightIcon, PlusIcon } from './Icons'

interface HeroProps {
  product: Product
  onAddToCart: (productId: string) => void
}

export function Hero({ product, onAddToCart }: HeroProps) {
  const sceneRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    sceneRef.current?.style.setProperty('--hero-rotate-x', `${-y * 10}deg`)
    sceneRef.current?.style.setProperty('--hero-rotate-y', `${x * 14}deg`)
    sceneRef.current?.style.setProperty('--hero-shift-x', `${x * 18}px`)
    sceneRef.current?.style.setProperty('--hero-shift-y', `${y * 18}px`)
  }

  const resetScene = () => {
    sceneRef.current?.style.setProperty('--hero-rotate-x', '0deg')
    sceneRef.current?.style.setProperty('--hero-rotate-y', '0deg')
    sceneRef.current?.style.setProperty('--hero-shift-x', '0px')
    sceneRef.current?.style.setProperty('--hero-shift-y', '0px')
  }

  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <div className="eyebrow-row" data-reveal>
          <span className="eyebrow-dot" />
          Drop 001 / Summer forever
        </div>

        <h1 data-reveal>
          <span>Wear</span>
          <span className="hero-title-outline">the rush.</span>
        </h1>

        <div className="hero-copy__bottom" data-reveal>
          <p>
            Maiouri premium cu povești care se poartă tare. Croială boxy,
            printuri curajoase și zero energie plictisitoare.
          </p>
          <div className="hero-actions">
            <a className="button button--dark" href="#shop">
              Descoperă drop-ul
              <ArrowUpRightIcon />
            </a>
            <a className="text-link" href="#story">De ce Nürburgring?</a>
          </div>
        </div>
      </div>

      <div
        className="hero-showroom"
        ref={sceneRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetScene}
        data-reveal
      >
        <div className="showroom-grid" aria-hidden="true" />
        <div className="orbit orbit--one" aria-hidden="true" />
        <div className="orbit orbit--two" aria-hidden="true" />
        <div className="chrome-sphere chrome-sphere--one" aria-hidden="true" />
        <div className="chrome-sphere chrome-sphere--two" aria-hidden="true" />

        <div className="showroom-label showroom-label--top">
          <span>01</span>
          Interactive piece
        </div>
        <div className="showroom-label showroom-label--side">Move your cursor</div>

        <div className="hero-product-object">
          <div className="hero-product-glow" aria-hidden="true" />
          <img
            src={product.image}
            alt={`Maiou ${product.name}, ${product.color}`}
            width="768"
            height="1152"
            fetchPriority="high"
          />
        </div>

        <div className="hero-product-panel">
          <div>
            <span>{product.subtitle}</span>
            <strong>{product.name}</strong>
          </div>
          <button type="button" onClick={() => onAddToCart(product.id)} aria-label={`Adaugă ${product.name} în coș`}>
            <PlusIcon />
          </button>
        </div>

        <div className="hero-price">{formatPrice(product.price)}</div>
      </div>

      <a className="scroll-cue" href="#shop" aria-label="Derulează la colecție">
        <span />
        Scroll to explore
      </a>
    </section>
  )
}

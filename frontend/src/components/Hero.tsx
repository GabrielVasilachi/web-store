import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import campaignImage from '../assets/campaign/fithouse-editorial.webp'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/currency'
import { ArrowUpRightIcon, HouseMark } from './Icons'
import { AttractLink, Reveal } from './MotionEffects'

interface HeroProps {
  product: Product
  onAddToCart: (productId: string, size?: string) => void
}

export function Hero({ product, onAddToCart }: HeroProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <Reveal>
        <div className="hero-eyebrow mono">
          <span><i className="status-dot" /> INDEPENDENT SPIRIT. EVERYDAY UNIFORM.</span>
          <span>EST. 2026 — BUILT TO BELONG</span>
        </div>
        <div className="hero-heading">
          <h1 id="hero-title">YOUR FIT. <span>YOUR RULES.</span></h1>
          <HouseMark className="hero-house" />
        </div>
      </Reveal>
      <div className="hero-scene" ref={sceneRef}>
        <motion.img className="hero-image" src={campaignImage}
          alt="Campanie FitHouse: două persoane în maiouri washed black, într-un cadru urban din beton"
          width="1536" height="1024" fetchPriority="high" style={{ y: reducedMotion ? 0 : imageY }}
        />
        <div className="hero-shade" />
        <div className="hero-scene__top mono"><span>THE EVERYDAY COLLECTION</span><span>VOL. 001 / 2026</span></div>
        <div className="hero-copy">
          <Reveal delay={0.15}>
            <span className="hero-copy__label">BINE AI VENIT ÎN HOUSE.</span>
            <h2>Good fits.<br />Better energy.</h2>
            <p>Maiouri cu personalitate. Libertate în fiecare croială.<br className="desktop-break" /> Piese care se simt la fel de bine cum arată.</p>
            <AttractLink href="#shop" className="button--orange">Găsește-ți fit-ul</AttractLink>
          </Reveal>
        </div>
        <button className="hero-featured" onClick={() => onAddToCart(product.id)} type="button" aria-label={`Adaugă ${product.name}, mărimea M, în coș`}>
          <div className="hero-featured__image"><img src={product.image} alt="" width="100" height="150" /></div>
          <div><span className="mono">THE SIGNATURE PIECE</span><strong>{product.name}</strong><span>{formatPrice(product.price)} <span className="hero-featured__size">/ M</span></span></div>
          <ArrowUpRightIcon />
        </button>
        <span className="hero-vertical mono" aria-hidden="true">EVERY BODY. EVERY DAY.</span>
      </div>
      <div className="hero-caption mono"><span>01 / THE EVERYDAY COLLECTION</span><a href="#shop">SCROLL TO FIND YOUR FIT <span>↓</span></a><span>DESIGNED TO BE YOU.</span></div>
    </section>
  )
}

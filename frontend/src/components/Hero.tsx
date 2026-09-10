import { lazy, Suspense, useRef, type PointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import modelImage from '../assets/campaign/fithouse-no-rules.webp'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/currency'
import { ArrowUpRightIcon, PlusIcon } from './Icons'
import { AttractLink, Reveal } from './MotionEffects'

const ChromeSculpture = lazy(() => import('./ChromeSculpture'))

interface HeroProps {
  product: Product
  onAddToCart: (productId: string, size?: string) => void
}

export function Hero({ product, onAddToCart }: HeroProps) {
  const sceneRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  })
  const titleX = useTransform(scrollYProgress, [0, 1], ['0%', '-13%'])
  const modelY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const haloScale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 80, damping: 25 })
  const y = useSpring(pointerY, { stiffness: 80, damping: 25 })

  const moveScene = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 24)
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 12)
  }

  return (
    <section
      className="hero-section"
      id="top"
      ref={sceneRef}
      aria-labelledby="hero-title"
      onPointerMove={moveScene}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
    >
      <div className="hero-eyebrow mono">
        <span>
          <i className="status-dot" /> INDEPENDENT WEAR. UNFILTERED ENERGY.
        </span>
        <span>DROP 001 / NO RULES EDITION</span>
      </div>
      <motion.h1
        id="hero-title"
        className="hero-title"
        style={{ x: reducedMotion ? 0 : titleX }}
        aria-label="FitHouse"
      >
        {'FITHOUSE'.split('').map((letter, index) => (
          <span className="hero-letter-mask" key={index} aria-hidden="true">
            <motion.span
              initial={reducedMotion ? false : { y: '110%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: 0.85,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
        <span className="hero-title-star" aria-hidden="true">
          ✳
        </span>
      </motion.h1>
      <motion.div
        className="hero-halo"
        aria-hidden="true"
        style={{ scale: reducedMotion ? 1 : haloScale }}
      />
      <div className="hero-cross hero-cross--one" aria-hidden="true">
        +
      </div>
      <div className="hero-cross hero-cross--two" aria-hidden="true">
        +
      </div>
      <motion.div
        className="hero-model-layer"
        style={{ y: reducedMotion ? 0 : modelY }}
      >
        <motion.img
          className="hero-model"
          src={modelImage}
          alt="Campanie FitHouse: model în maioul Nürburgring 73, pantaloni cargo și ochelari crom"
          width="1024"
          height="1536"
          fetchPriority="high"
          style={{ x, y }}
        />
      </motion.div>
      <div className="hero-chrome" aria-hidden="true">
        <Suspense fallback={<span className="chrome-fallback">✳</span>}>
          <ChromeSculpture />
        </Suspense>
        <span className="mono">UNDEFINED BY DESIGN.</span>
      </div>
      <div className="hero-manifesto">
        <Reveal delay={0.25}>
          <span className="mono">A HOUSE FOR THE OUTSIDERS.</span>
          <h2>
            NOT MADE
            <br />
            TO <em>FIT IN.</em>
          </h2>
          <a href="#story" className="hero-story-link mono">
            DAR CREAT SĂ TE SIMȚI TU. <ArrowUpRightIcon />
          </a>
        </Reveal>
      </div>
      <Reveal className="hero-shop-copy" delay={0.35}>
        <span className="hero-drop-label mono">
          [ VOL. 001 — DISPONIBIL ACUM ]
        </span>
        <p>
          Croieli libere. Printuri cu atitudine.
          <br />
          Pentru cei care își fac propriile reguli.
        </p>
        <AttractLink href="#shop" className="button--dark">
          Explorează drop-ul
        </AttractLink>
        <span className="hero-shop-note mono">UNISEX / XS—XL / 300 GSM</span>
      </Reveal>
      <button
        className="hero-product-tag"
        type="button"
        onClick={() => onAddToCart(product.id)}
        aria-label={`Adaugă ${product.name}, mărimea M, în coș`}
      >
        <span className="tag-plus">
          <PlusIcon />
        </span>
        <span>
          <span className="mono">ON THE MODEL / M</span>
          <strong>
            {product.name} <span>{formatPrice(product.price)}</span>
          </strong>
        </span>
      </button>
      <div className="hero-bottom mono">
        <span>EST. 2026 · ALWAYS OUTSIDE THE LINES</span>
        <a href="#shop">SCROLL TO MISBEHAVE ↓</a>
      </div>
      <div className="grain" aria-hidden="true" />
    </section>
  )
}

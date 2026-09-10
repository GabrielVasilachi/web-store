import { useRef } from 'react'
import afterhours from '../assets/campaign/fithouse-afterhours.webp'
import editorial from '../assets/campaign/fithouse-editorial.webp'
import model from '../assets/campaign/fithouse-no-rules.webp'
import { ArrowUpRightIcon } from './Icons'
import { Reveal } from './MotionEffects'

export function Lookbook() {
  const rail = useRef<HTMLDivElement>(null)
  const move = (direction: number) => {
    if (!rail.current) return
    rail.current.scrollBy({
      left: rail.current.clientWidth * direction * 0.8,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }

  return (
    <section
      className="lookbook section-space"
      aria-labelledby="lookbook-title"
    >
      <Reveal className="lookbook-heading">
        <div>
          <span className="section-kicker">THE HOUSE IS A FEELING.</span>
          <h2 id="lookbook-title">
            COME AS <em>YOU ARE.</em>
          </h2>
        </div>
        <div className="lookbook-controls">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Imaginea precedentă"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Imaginea următoare"
          >
            →
          </button>
        </div>
      </Reveal>
      <div
        className="lookbook-rail"
        ref={rail}
        tabIndex={0}
        aria-label="Lookbook FitHouse, derulează orizontal"
      >
        <a
          href="#shop"
          className="lookbook-frame lookbook-frame--street"
          data-cursor="SHOP"
        >
          <img
            src={editorial}
            alt="FitHouse în oraș: două modele în maiouri washed black"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span className="mono">
            01 / IN YOUR ELEMENT <ArrowUpRightIcon />
          </span>
        </a>
        <a
          href="#shop"
          className="lookbook-frame lookbook-frame--poster"
          data-cursor="SHOP"
        >
          <span className="lookbook-poster-word" aria-hidden="true">
            ZERO
            <br />
            FILTER.
          </span>
          <img
            src={model}
            alt="Stil unisex FitHouse: maiou cu print, ochelari argintii și pantaloni cargo"
            width="1024"
            height="1536"
            loading="lazy"
          />
          <span className="mono">
            02 / UNAPOLOGETICALLY YOU <ArrowUpRightIcon />
          </span>
        </a>
        <a
          href="#shop"
          className="lookbook-frame lookbook-frame--night"
          data-cursor="SHOP"
        >
          <img
            src={afterhours}
            alt="Colecția FitHouse fotografiată în lumină cobalt"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span className="mono">
            03 / NO CURFEW <ArrowUpRightIcon />
          </span>
        </a>
      </div>
      <div className="lookbook-bottom mono">
        <span>REAL ATTITUDE. EVERY SINGLE DAY.</span>
        <a href="mailto:hello@fithouse.store">ARATĂ-NE FIT-UL TĂU ↗</a>
      </div>
    </section>
  )
}

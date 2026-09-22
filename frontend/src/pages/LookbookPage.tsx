import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import editorial from '../assets/campaign/fithouse-editorial.webp'
import afterhours from '../assets/campaign/fithouse-afterhours.webp'
import noRules from '../assets/campaign/fithouse-no-rules.webp'
import ChromeSculpture from '../components/ChromeSculpture'
import { ArrowUpRightIcon } from '../components/Icons'
import { AttractLink, Reveal } from '../components/MotionEffects'
import { TiltSurface } from '../components/TiltSurface'
import { products } from '../data/products'
import { formatPrice } from '../utils/currency'
import './Pages.css'

const stories = [
  {
    title: 'OFF DUTY.',
    tag: 'THE EVERYDAY REBELLION',
    time: '14:26 / CITY MODE',
    image: editorial,
    alt: 'Două modele FitHouse în maiouri washed black, pe stradă',
    color: '#bca2dc',
    text: 'Ieși fără un plan. Ia cu tine o piesă care spune tot. Croieli relaxate, asfalt cald și orașul în ritmul tău.',
    pairing: 'Denim larg. Sneakers uzați. Atitudine intactă.',
    product: products[0],
  },
  {
    title: 'NO CURFEW.',
    tag: 'WHEN THE CITY GOES BLUE',
    time: '00:38 / AFTER HOURS',
    image: afterhours,
    alt: 'Modele FitHouse într-un decor brutalist cu lumină albastră',
    color: '#abbef5',
    text: 'Când luminile se schimbă, energia rămâne. Cobalt, umbre și un print care nu trece neobservat.',
    pairing: 'Pantaloni negri. Accente metalice. Fără oră de întoarcere.',
    product: products[1],
  },
  {
    title: 'ZERO FILTER.',
    tag: 'YOUR OWN KIND OF LOUD',
    time: '17:09 / NO RULES',
    image: noRules,
    alt: 'Model FitHouse cu maiou grafic și pantaloni cargo',
    color: '#e1e990',
    text: 'Niciun dress code nu te cunoaște mai bine decât tine. Combină texturi, schimbă proporții, ocupă-ți locul.',
    pairing: 'Cargo lejer. Ochelari statement. Zero aprobări.',
    product: products[3],
  },
]

export function LookbookPage() {
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()
  const story = stories[active]

  return (
    <div className="lookbook-page">
      <section className="lb-hero" aria-labelledby="lb-title">
        <div className="page-eyebrow mono">
          <span>FITHOUSE / VISUAL DIARY</span>
          <span>VOL. 001 — NO DRESS CODE</span>
        </div>
        <div className="lb-heading">
          <Reveal>
            <h1 id="lb-title">
              LIFE, <em>UNFILTERED.</em>
            </h1>
          </Reveal>
          <p>
            Trei stări. Aceeași atitudine.
            <br />
            Stilul începe acolo unde
            <br />
            se termină regulile.
          </p>
        </div>
        <div className="lb-artwork">
          <div className="lb-side-note mono">
            REAL PLACES. REAL ENERGY. YOUR HOUSE.
          </div>
          <TiltSurface className="lb-photo-stack">
            <div
              className="lb-photo-back lb-photo-back--one"
              aria-hidden="true"
            />
            <div
              className="lb-photo-back lb-photo-back--two"
              aria-hidden="true"
            />
            <div className="lb-cover">
              <img
                src={editorial}
                alt="Editorial FitHouse: stil unisex în oraș"
                width="1536"
                height="1024"
                fetchPriority="high"
              />
              <div className="lb-cover-overlay">
                <span className="mono">THE STREETS ARE THE STUDIO.</span>
                <span>
                  COME AS
                  <br />
                  <em>YOU ARE.</em>
                </span>
              </div>
              <span className="lb-cover-index mono">
                FH—001
                <br />
                UNFILTERED EDITION
              </span>
            </div>
          </TiltSurface>
          <div className="lb-chrome" aria-hidden="true">
            <ChromeSculpture />
          </div>
          <span className="lb-sticker">
            NO
            <br />
            POSE.<span>JUST YOU ↗</span>
          </span>
        </div>
        <div className="lb-hero-bottom mono">
          <span>O COLECȚIE. INFINIT DE MULTE FELURI DE A FI TU.</span>
          <a href="#moods">EXPLOREAZĂ STĂRILE ↓</a>
        </div>
      </section>

      <section
        className="lb-moods section-space"
        id="moods"
        aria-labelledby="moods-title"
      >
        <Reveal className="lb-section-heading">
          <div>
            <span className="section-kicker">01 / FIND YOUR FREQUENCY</span>
            <h2 id="moods-title">
              SAME HOUSE.
              <br />
              <em>DIFFERENT ENERGY.</em>
            </h2>
          </div>
          <p>
            Nu alegi o uniformă.
            <br />
            Alegi cum te simți azi.
          </p>
        </Reveal>
        <div
          className="lb-tabs"
          role="group"
          aria-label="Alege atmosfera editorialului"
        >
          {stories.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-pressed={active === index}
              className={active === index ? 'is-active' : ''}
              onClick={() => setActive(index)}
            >
              <span className="mono">0{index + 1}</span>
              {item.title}
              <ArrowUpRightIcon />
            </button>
          ))}
        </div>
        <div className="lb-feature" style={{ backgroundColor: story.color }}>
          <div className="lb-feature-image">
            <AnimatePresence mode="wait">
              <motion.img
                key={story.title}
                src={story.image}
                alt={story.alt}
                width="1536"
                height="1024"
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            <span className="mono">{story.time}</span>
          </div>
          <div className="lb-feature-copy" aria-live="polite">
            <span className="mono">{story.tag}</span>
            <h3>{story.title}</h3>
            <p>{story.text}</p>
            <div className="lb-styling-note">
              <span className="mono">STYLE NOTES ↗</span>
              <p>{story.pairing}</p>
            </div>
            <a
              className="lb-product-link"
              href={`/fit-studio?piece=${story.product.id}`}
            >
              <img src={story.product.image} alt="" width="60" height="80" />
              <span>
                <small className="mono">COMPLETEAZĂ ATMOSFERA</small>
                <strong>{story.product.name}</strong>
                <small>
                  {formatPrice(story.product.price)} · Deschide în studio
                </small>
              </span>
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </section>

      <section
        className="lb-contact-sheet section-space"
        aria-labelledby="details-title"
      >
        <Reveal>
          <span className="section-kicker">02 / BETWEEN THE FRAMES</span>
          <h2 id="details-title">
            THE DETAILS
            <br />
            <em>DO THE TALKING.</em>
          </h2>
        </Reveal>
        <div className="lb-detail-grid">
          {[
            {
              product: products[0],
              word: 'TEXTURE.',
              note: 'BUMBAC GREU. PREZENȚĂ NATURALĂ.',
            },
            {
              product: products[1],
              word: 'EXPRESSION.',
              note: 'PRINTURI CARE AU CEVA DE SPUS.',
            },
            {
              product: products[2],
              word: 'FREEDOM.',
              note: 'PROPORȚII LIBERE. STIL PERSONAL.',
            },
          ].map(({ product, word, note }, index) => (
            <Reveal key={word} delay={index * 0.08}>
              <a
                href={`/fit-studio?piece=${product.id}`}
                className={`lb-detail lb-detail--${index}`}
              >
                <TiltSurface>
                  <img
                    src={product.image}
                    alt={`Detaliu ${product.name}`}
                    width="768"
                    height="1152"
                    loading="lazy"
                  />
                </TiltSurface>
                <span className="mono">
                  0{index + 1} / {note}
                </span>
                <h3>
                  {word}
                  <ArrowUpRightIcon />
                </h3>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="page-next page-next--acid">
        <span className="mono">INSPIRAȚIA E DOAR ÎNCEPUTUL.</span>
        <h2>
          MAKE IT <em>YOURS.</em>
        </h2>
        <AttractLink href="/fit-studio" className="button--dark">
          Intră în Fit Studio
        </AttractLink>
      </section>
    </div>
  )
}

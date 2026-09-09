import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import campaignImage from '../assets/campaign/fithouse-editorial.webp'
import { featuredProduct } from '../data/products'
import { ArrowUpRightIcon, HouseMark } from './Icons'
import { AttractLink, Reveal, ShimmeringText } from './MotionEffects'

export function BrandStory() {
  const storyRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 8])

  return (
    <>
      <section className="brand-story" id="story" ref={storyRef}>
        <div className="story-visual">
          <span className="mono story-visual__label">THE HOUSE PHILOSOPHY / 001</span>
          <span className="story-visual__word" aria-hidden="true">FEEL<br />AT HOME.</span>
          <motion.img src={featuredProduct.image} alt="Maiou Nürburgring 73 din bumbac washed black, cu print inspirat de circuit" width="768" height="1152" loading="lazy" style={{ rotate: reducedMotion ? -5 : rotate }} />
          <div className="story-seal"><HouseMark /><span className="mono">GOOD FITS<br />LIVE HERE</span></div>
          <span className="mono story-visual__bottom">NOT MADE TO FIT IN. MADE TO FEEL RIGHT.</span>
        </div>
        <Reveal className="story-copy">
          <span className="section-kicker"><i className="status-dot" /> MAI MULT DECÂT UN NUME</span>
          <h2>O casă pentru<br />stilul <span>tău.</span></h2>
          <p className="story-lead">FitHouse e locul în care nu trebuie să te încadrezi. Doar să te simți tu.</p>
          <p>Credem în piesele la care revii. În bumbac pe care îl simți, croieli care îți dau libertate și detalii care spun ceva despre tine. De la prima cafea la ultimul plan al serii.</p>
          <div className="story-signoff"><HouseMark /><ShimmeringText text="YOUR EVERYDAY. YOUR WAY." /></div>
          <AttractLink href="#quality" className="button--light">Intră în detalii</AttractLink>
        </Reveal>
      </section>

      <section className="quality-section section-space" id="quality">
        <Reveal className="section-heading"><div><span className="section-kicker">02 / THE FEEL-GOOD STANDARD</span><h2>Se vede bine.<br /><span>Se simte și mai bine.</span></h2></div><p>Un fit bun începe cu lucrurile pe care<br />nu le vezi într-o fotografie.</p></Reveal>
        <div className="quality-grid">
          <Reveal className="quality-card quality-card--cotton">
            <div className="quality-card__top mono"><span>01 / MATERIAL</span><span>↗</span></div>
            <div className="cotton-detail"><img src={featuredProduct.image} alt="Detaliu al texturii din bumbac și al cusăturii maioului" width="768" height="1152" loading="lazy" /><span>300<span>GSM</span></span></div>
            <div className="quality-card__copy"><h3>Greutate. Cu sens.</h3><p>Bumbac greu, textură plină. Cade natural și dă structură fiecărei ținute.</p></div>
          </Reveal>
          <Reveal className="quality-card quality-card--fit" delay={0.08}>
            <div className="quality-card__top mono"><span>02 / CROIALĂ</span><span>↗</span></div>
            <div className="fit-diagram" aria-hidden="true"><svg viewBox="0 0 260 220"><path d="M87 32c4 23 19 33 43 33s39-10 43-33l30 11-9 56-17-7 10 102H73L83 92l-17 7-9-56 30-11Z" /><path className="fit-diagram__guide" d="M40 16v189M220 16v189M35 177h190M73 114h114M130 65v129" /><path d="m74 114 8-5m-8 5 8 5m104-5-8-5m8 5-8 5" /></svg><span className="mono">ROOM TO BE YOU</span></div>
            <div className="quality-card__copy"><h3>Relaxed. Niciodată banal.</h3><p>O croială unisex, cu spațiu de mișcare. Poart-o simplu sau în straturi.</p></div>
          </Reveal>
          <Reveal className="quality-card quality-card--print" delay={0.16}>
            <div className="quality-card__top mono"><span>03 / PERSONALITATE</span><span>↗</span></div>
            <div className="print-art" aria-hidden="true"><span>MAKE<br />IT <em>YOU.</em></span><HouseMark /></div>
            <div className="quality-card__copy"><h3>Detalii care rămân.</h3><p>Printuri tactile și povești originale. Caracter în fiecare piesă, fără zgomot în plus.</p></div>
          </Reveal>
        </div>
      </section>

      <section className="campaign-banner">
        <img src={campaignImage} alt="Stil urban FitHouse, purtat în fiecare zi" width="1536" height="1024" loading="lazy" />
        <div className="campaign-banner__shade" />
        <Reveal><span className="section-kicker">NO DRESS CODE. JUST YOU.</span><h2>OUT OF THE HOUSE.<br /><span>IN YOUR ELEMENT.</span></h2><AttractLink href="#shop" className="button--light">Poartă-ți energia</AttractLink></Reveal>
        <span className="campaign-banner__note mono">FITHOUSE EVERYDAY CLUB <ArrowUpRightIcon /></span>
      </section>
    </>
  )
}

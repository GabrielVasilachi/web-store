import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import campaignImage from '../assets/campaign/fithouse-afterhours.webp'
import { featuredProduct } from '../data/products'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { ArrowUpRightIcon, HouseMark } from './Icons'
import { AttractLink, Reveal, ShimmeringText } from './MotionEffects'

export function BrandStory() {
  const storyRef = useRef<HTMLElement>(null)
  const editorialRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 801px)')
  const cinematic = desktop && !reducedMotion
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  })
  const { scrollYProgress: editorialProgress } = useScroll({
    target: editorialRef,
    offset: ['start end', 'end start'],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [-18, 14])
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [0.85, 1.15, 1])
  const productX = useTransform(scrollYProgress, [0, 1], ['-8%', '15%'])
  const lineX = useTransform(scrollYProgress, [0, 1], ['8%', '-14%'])
  const secondLineX = useTransform(scrollYProgress, [0, 1], ['-10%', '7%'])
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ['#25142e', '#4a2c59'],
  )
  const imageY = useTransform(editorialProgress, [0, 1], ['0%', '-6%'])
  const imageClip = useTransform(
    editorialProgress,
    [0, 0.35],
    ['inset(10% 12% 10% 12%)', 'inset(0% 0% 0% 0%)'],
  )

  return (
    <>
      <section
        className={`brand-story ${cinematic ? 'is-cinematic' : ''}`}
        id="story"
        ref={storyRef}
        aria-labelledby="story-title"
      >
        <motion.div
          className="story-stage"
          style={{ backgroundColor: cinematic ? backgroundColor : '#25142e' }}
        >
          <div className="story-stage__top mono">
            <span>02 / A MANIFESTO, NOT A DRESS CODE.</span>
            <ShimmeringText text="SCROLL. BREAK THE PATTERN." />
          </div>
          <h2 id="story-title" className="story-title">
            <motion.span style={{ x: cinematic ? lineX : 0 }}>
              WEAR YOUR
            </motion.span>
            <motion.span
              className="story-title__outline"
              style={{ x: cinematic ? secondLineX : 0 }}
            >
              OWN RULES.
            </motion.span>
          </h2>
          <div className="story-product-wrap">
            <motion.img
              src={featuredProduct.image}
              alt="Maioul Nürburgring 73 din bumbac greu, cu print tactil"
              width="768"
              height="1152"
              loading="lazy"
              style={{
                rotate: cinematic ? rotate : -10,
                scale: cinematic ? scale : 1,
                x: cinematic ? productX : 0,
              }}
            />
          </div>
          <div className="story-label mono">
            <span>300</span>GSM OF ATTITUDE.
            <i />
          </div>
          <div className="story-copy">
            <span className="section-kicker">
              O CASĂ PENTRU CEI CARE NU SE ÎNCADREAZĂ.
            </span>
            <p>
              Nu trebuie să fii ca ei.
              <br />
              Trebuie doar să fii <em>tu.</em>
            </p>
            <span className="story-description">
              Croieli libere, printuri care spun ceva și energia de a le purta
              în felul tău. Asta înseamnă FitHouse.
            </span>
            <AttractLink href="#shop" className="button--acid">
              Găsește-ți piesa
            </AttractLink>
          </div>
          <div className="story-stage__bottom mono">
            <span>HEAVY COTTON. LIGHT ON RULES.</span>
            <span>YOUR BODY. YOUR UNIFORM. YOUR HOUSE.</span>
          </div>
          <div className="grain" aria-hidden="true" />
        </motion.div>
      </section>

      <section
        className="quality-section section-space"
        id="quality"
        aria-labelledby="quality-title"
      >
        <Reveal className="section-heading">
          <div>
            <span className="section-kicker">
              03 / FEEL IT. DON'T JUST SEE IT.
            </span>
            <h2 id="quality-title">
              ALL FEEL.
              <br />
              <em>NO FILTER.</em>
            </h2>
          </div>
          <p>
            Atitudinea se vede.
            <br />
            Calitatea se simte.
          </p>
        </Reveal>
        <div className="quality-layout">
          <Reveal className="material-poster">
            <img
              src={featuredProduct.image}
              alt="Textura de bumbac washed black și cusăturile maioului FitHouse"
              width="768"
              height="1152"
              loading="lazy"
            />
            <span className="material-poster__label mono">
              THE HEAVYWEIGHT STANDARD
            </span>
            <span className="material-poster__number">
              300<span>GSM</span>
            </span>
            <span className="material-poster__bottom mono">
              YOU CAN FEEL THE DIFFERENCE. ↗
            </span>
          </Reveal>
          <div className="quality-details">
            <Reveal className="quality-detail">
              <span className="mono">/01</span>
              <div>
                <h3>GREUTATE. CU SENS.</h3>
                <p>
                  Bumbac greu, textură plină. Cade natural și dă structură
                  fiecărei ținute.
                </p>
              </div>
              <span className="detail-symbol" aria-hidden="true">
                ✳
              </span>
            </Reveal>
            <Reveal className="quality-detail" delay={0.08}>
              <span className="mono">/02</span>
              <div>
                <h3>FIT FĂRĂ LIMITE.</h3>
                <p>
                  Croială relaxed, unisex. Spațiu pentru mișcare, loc pentru
                  personalitate.
                </p>
                <span className="detail-sizes mono">XS / S / M / L / XL</span>
              </div>
              <ArrowUpRightIcon />
            </Reveal>
            <Reveal className="quality-detail" delay={0.16}>
              <span className="mono">/03</span>
              <div>
                <h3>PERSONALITATE TACTILĂ.</h3>
                <p>
                  Printuri cu textură și povești originale. Detaliul pe care îl
                  descoperi din a doua privire.
                </p>
              </div>
              <HouseMark />
            </Reveal>
            <a className="text-link" href="#fit-guide">
              Ghid de mărimi & întrebări <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </section>

      <section
        className="editorial-section"
        id="editorial"
        ref={editorialRef}
        aria-labelledby="editorial-title"
      >
        <div className="editorial-heading">
          <span className="mono">THE FITHOUSE JOURNAL / CHAPTER 001</span>
          <span className="mono">OFF DUTY. ON YOUR TERMS.</span>
        </div>
        <motion.div
          className="editorial-image"
          style={{ clipPath: cinematic ? imageClip : undefined }}
        >
          <motion.img
            src={campaignImage}
            alt="Campanie editorială FitHouse: două modele în maiouri, într-un spațiu brutalist cu lumină cobalt"
            width="1536"
            height="1024"
            loading="lazy"
            style={{ y: reducedMotion ? 0 : imageY }}
          />
          <div className="editorial-image__shade" />
          <span className="editorial-stamp mono">
            NO INVITE
            <br />
            NEEDED.
            <ArrowUpRightIcon />
          </span>
          <h2 id="editorial-title">
            AFTER
            <br />
            <em>HOURS.</em>
            <span>BEFORE ANYONE ELSE.</span>
          </h2>
        </motion.div>
        <div className="editorial-bottom">
          <span className="mono">THE CITY IS YOURS. DRESS LIKE IT.</span>
          <p>
            De la ultimul metrou la primul răsărit.
            <br />
            Piese pentru tot ce nu încape într-un program.
          </p>
          <AttractLink href="#shop" className="button--acid">
            Shop the attitude
          </AttractLink>
        </div>
      </section>
    </>
  )
}

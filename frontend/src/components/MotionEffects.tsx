import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, useState, type ReactNode } from 'react'
import { ArrowUpRightIcon } from './Icons'

export function Reveal({ children, className = '', delay = 0 }: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  )
}

// Adapted from Kokonut UI's MIT-licensed Attract Button; see THIRD_PARTY_NOTICES.md.
const particles = Array.from({ length: 8 }, (_, index) => ({
  x: Math.cos(index * Math.PI / 4) * 28,
  y: Math.sin(index * Math.PI / 4) * 28,
}))

export function AttractLink({ children, href, className = '' }: {
  children: ReactNode
  href: string
  className?: string
}) {
  const [attracting, setAttracting] = useState(false)
  const reducedMotion = useReducedMotion()
  return (
    <motion.a className={`button attract-link ${className}`} href={href}
      onHoverStart={() => setAttracting(true)} onHoverEnd={() => setAttracting(false)}
      onFocus={() => setAttracting(true)} onBlur={() => setAttracting(false)}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
    >
      <span>{children}</span>
      <span className="button-arrow">
        {!reducedMotion && particles.map((particle, index) => (
          <motion.i key={index} aria-hidden="true" initial={false}
            animate={{ x: attracting ? 0 : particle.x, y: attracting ? 0 : particle.y, opacity: attracting ? 0.6 : 0, scale: attracting ? 0 : 1 }}
            transition={{ type: 'spring', stiffness: 60, damping: 12 }}
          />
        ))}
        <ArrowUpRightIcon />
      </span>
    </motion.a>
  )
}

// Adapted from Bklit UI's ShimmeringText, with viewport and reduced-motion controls.
export function ShimmeringText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const reducedMotion = useReducedMotion()
  return (
    <span className="shimmering-text" ref={ref}>
      {text.split('').map((character, index) => (
        <motion.span key={index} aria-hidden="true" initial={false}
          animate={{ color: inView && !reducedMotion ? ['#bdb9ae', '#ffffff', '#bdb9ae'] : '#bdb9ae' }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3, delay: index * 0.045 }}
        >{character}</motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  )
}

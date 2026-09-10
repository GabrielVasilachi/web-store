import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { ArrowUpRightIcon } from './Icons'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Spring-based attraction follows the interaction principles of Kokonut UI.
export function AttractLink({
  children,
  href,
  className = '',
}: {
  children: ReactNode
  href: string
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const x = useSpring(targetX, { stiffness: 180, damping: 17 })
  const y = useSpring(targetY, { stiffness: 180, damping: 17 })

  const attract = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    targetX.set((event.clientX - bounds.left - bounds.width / 2) * 0.12)
    targetY.set((event.clientY - bounds.top - bounds.height / 2) * 0.18)
  }

  return (
    <motion.a
      className={`button attract-link ${className}`}
      href={href}
      style={{ x, y }}
      onPointerMove={attract}
      onPointerLeave={() => {
        targetX.set(0)
        targetY.set(0)
      }}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
    >
      <span>{children}</span>
      <span className="button-arrow">
        <ArrowUpRightIcon />
      </span>
    </motion.a>
  )
}

export function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const reducedMotion = useReducedMotion()
  const frame = useRef(0)
  const alphabet = 'FH/01+*'

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const scramble = () => {
    if (reducedMotion) return
    cancelAnimationFrame(frame.current)
    const start = performance.now()
    const tick = (now: number) => {
      const progress = (now - start) / 400
      setDisplay(
        text
          .split('')
          .map((character, index) => {
            if (character === ' ' || index / text.length < progress)
              return character
            return alphabet[
              (Math.floor(progress * 24) + index) % alphabet.length
            ]
          })
          .join(''),
      )
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }

  return (
    <span className="scramble-text" onPointerEnter={scramble}>
      <span className="sr-only">{text}</span>
      <span className="scramble-text__sizer" aria-hidden="true">
        {text}
      </span>
      <span className="scramble-text__display" aria-hidden="true">
        {display}
      </span>
    </span>
  )
}

// Adapted from Bklit UI's ShimmeringText. Attribution: public/THIRD_PARTY_NOTICES.txt.
export function ShimmeringText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const reducedMotion = useReducedMotion()
  const running = inView && !reducedMotion
  return (
    <span className="shimmering-text" ref={ref}>
      {text.split('').map((character, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          initial={false}
          animate={{
            color: running ? ['#ac9db5', '#e0ff39', '#ac9db5'] : '#ac9db5',
          }}
          transition={
            running
              ? {
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: index * 0.045,
                }
              : { duration: 0 }
          }
        >
          {character}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  )
}

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const currentLabel = useRef('')
  const xTarget = useMotionValue(-100)
  const yTarget = useMotionValue(-100)
  const x = useSpring(xTarget, { stiffness: 550, damping: 38 })
  const y = useSpring(yTarget, { stiffness: 550, damping: 38 })

  useEffect(() => {
    const media = window.matchMedia(
      '(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)',
    )
    const sync = () => {
      setEnabled(media.matches)
      document.body.classList.toggle('has-custom-cursor', media.matches)
    }
    const move = (event: PointerEvent) => {
      if (!media.matches) return
      xTarget.set(event.clientX)
      yTarget.set(event.clientY)
      const element = event.target instanceof Element ? event.target : null
      const explicit =
        element?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor
      const next = element?.closest('a, button, summary')
        ? '↗'
        : (explicit ?? '')
      if (next !== currentLabel.current) {
        currentLabel.current = next
        setLabel(next)
      }
    }
    const hide = () => {
      xTarget.set(-100)
      yTarget.set(-100)
    }
    sync()
    media.addEventListener('change', sync)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [xTarget, yTarget])

  if (!enabled) return null
  return (
    <motion.div
      className={`custom-cursor ${label ? 'is-active' : ''}`}
      style={{ x, y }}
      aria-hidden="true"
    >
      <span>{label}</span>
    </motion.div>
  )
}

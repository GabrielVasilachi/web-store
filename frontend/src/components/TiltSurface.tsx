import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'

export function TiltSurface({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const reducedMotion = useReducedMotion()
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const rotateX = useSpring(targetX, { stiffness: 110, damping: 20 })
  const rotateY = useSpring(targetY, { stiffness: 110, damping: 20 })
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    targetX.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 12)
    targetY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 16)
  }
  return (
    <motion.div
      className={`tilt-surface ${className}`}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={move}
      onPointerLeave={() => {
        targetX.set(0)
        targetY.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

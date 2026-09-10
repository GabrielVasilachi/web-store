import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { createChromeRenderer } from '../utils/chromeRenderer'

export default function ChromeSculpture() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [available, setAvailable] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const media = window.matchMedia('(min-width: 801px)')
    let dispose: (() => void) | undefined

    const initialize = () => {
      dispose?.()
      dispose = undefined
      if (!media.matches) {
        setAvailable(false)
        return
      }
      dispose = createChromeRenderer(canvas, Boolean(reducedMotion))
      setAvailable(Boolean(dispose))
    }

    initialize()
    media.addEventListener('change', initialize)
    return () => {
      dispose?.()
      media.removeEventListener('change', initialize)
    }
  }, [reducedMotion])

  return (
    <div className="chrome-sculpture">
      <canvas
        ref={canvasRef}
        className={available ? 'is-ready' : ''}
        aria-hidden="true"
      />
      {!available && <span className="chrome-fallback">✳</span>}
    </div>
  )
}

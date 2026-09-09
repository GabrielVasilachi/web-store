import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useState, type CSSProperties, type PointerEvent } from 'react'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/currency'
import { HeartIcon, PlusIcon } from './Icons'

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (productId: string) => void
  onAddToCart: (productId: string, size: string) => void
}

export function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState('M')
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(pointerY, { stiffness: 160, damping: 24 })
  const rotateY = useSpring(pointerX, { stiffness: 160, damping: 24 })
  const cardStyle = { '--product-accent': product.accent, '--product-surface': product.surface } as CSSProperties

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 10)
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -8)
  }

  return (
    <motion.article className="product-card" style={cardStyle} layout={!reducedMotion}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}
    >
      <div className="product-visual" onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}>
        <span className="product-badge mono">{product.badge ?? 'EVERYDAY ESSENTIAL'}</span>
        <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} type="button" onClick={() => onToggleFavorite(product.id)} aria-label={isFavorite ? `Elimină ${product.name} din favorite` : `Adaugă ${product.name} la favorite`} aria-pressed={isFavorite}><HeartIcon /></button>
        <span className="product-background-word" aria-hidden="true">{product.category === 'Motorsport' ? 'DRIVE' : product.category === 'Color' ? 'ENERGY' : 'FEEL'}</span>
        <motion.img src={product.image} alt={`Maiou ${product.name}, culoare ${product.color}`} width="768" height="1152" loading="lazy" style={{ rotateX, rotateY }} />
        <span className="product-visual__caption mono">FH / 001 — HEAVY COTTON</span>
      </div>
      <div className="product-info"><div><p className="mono">{product.subtitle}</p><h3>{product.name}</h3></div><strong>{formatPrice(product.price)}</strong></div>
      <div className="product-meta"><span><i style={{ backgroundColor: product.accent }} />{product.color}</span><span>Unisex / relaxed</span></div>
      <div className="product-purchase">
        <div className="size-list" role="group" aria-label={`Mărime pentru ${product.name}`}>
          {product.sizes.map((size) => <button key={size} type="button" className={selectedSize === size ? 'is-selected' : ''} onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size} aria-label={`Mărimea ${size}`}>{size}</button>)}
        </div>
        <button className="quick-add" type="button" onClick={() => onAddToCart(product.id, selectedSize)} aria-label={`Adaugă ${product.name}, mărimea ${selectedSize}, în coș`}><PlusIcon /><span>Adaugă</span></button>
      </div>
    </motion.article>
  )
}

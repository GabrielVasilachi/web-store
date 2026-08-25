import { useRef, type CSSProperties, type PointerEvent } from 'react'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/currency'
import { ArrowUpRightIcon, HeartIcon, PlusIcon } from './Icons'

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (productId: string) => void
  onAddToCart: (productId: string) => void
}

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: ProductCardProps) {
  const visualRef = useRef<HTMLDivElement>(null)
  const cardStyle = {
    '--product-accent': product.accent,
    '--product-surface': product.surface,
  } as CSSProperties

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    visualRef.current?.style.setProperty('--card-rotate-x', `${-y * 7}deg`)
    visualRef.current?.style.setProperty('--card-rotate-y', `${x * 9}deg`)
  }

  const resetTilt = () => {
    visualRef.current?.style.setProperty('--card-rotate-x', '0deg')
    visualRef.current?.style.setProperty('--card-rotate-y', '0deg')
  }

  return (
    <article className="product-card" style={cardStyle} data-reveal>
      <div
        className="product-visual"
        ref={visualRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className="product-visual__ring" aria-hidden="true" />
        <span className="product-index" aria-hidden="true">/ {product.id === 'nurburgring-73' ? '01' : product.id === 'orbital-koi' ? '02' : product.id === 'sunny-motel' ? '03' : '04'}</span>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-label={isFavorite ? `Elimină ${product.name} din favorite` : `Adaugă ${product.name} la favorite`}
          aria-pressed={isFavorite}
        >
          <HeartIcon />
        </button>
        <img
          src={product.image}
          alt={`Maiou ${product.name}, culoare ${product.color}`}
          width="768"
          height="1152"
          loading="lazy"
        />
        <button className="quick-add" type="button" onClick={() => onAddToCart(product.id)}>
          Adaugă rapid
          <PlusIcon />
        </button>
      </div>

      <div className="product-info">
        <div>
          <p>{product.subtitle}</p>
          <h3>{product.name}</h3>
        </div>
        <div className="product-info__price">
          <strong>{formatPrice(product.price)}</strong>
          <ArrowUpRightIcon />
        </div>
      </div>
      <div className="product-meta">
        <span>{product.color}</span>
        <span>XS—XL</span>
      </div>
    </article>
  )
}

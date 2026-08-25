import { useEffect } from 'react'
import type { CartLine } from '../types/product'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '../utils/currency'
import { ArrowUpRightIcon, CloseIcon, MinusIcon, PlusIcon } from './Icons'

interface CartDrawerProps {
  isOpen: boolean
  lines: readonly CartLine[]
  onClose: () => void
  onIncrease: (productId: string) => void
  onDecrease: (productId: string) => void
}

export function CartDrawer({
  isOpen,
  lines,
  onClose,
  onIncrease,
  onDecrease,
}: CartDrawerProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const subtotal = lines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  )

  return (
    <div className={`cart-layer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <button className="cart-backdrop" type="button" onClick={onClose} aria-label="Închide coșul" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Coșul tău">
        <div className="cart-drawer__header">
          <div>
            <span>Bag / {lines.reduce((count, line) => count + line.quantity, 0).toString().padStart(2, '0')}</span>
            <h2>Coșul tău</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Închide coșul">
            <CloseIcon />
          </button>
        </div>

        <div className="cart-drawer__content">
          {lines.length === 0 ? (
            <div className="empty-cart">
              <span>0 km/h</span>
              <h3>Coșul stă pe loc.</h3>
              <p>Alege un maiou și pune povestea în mișcare.</p>
              <button className="button button--dark" type="button" onClick={onClose}>
                Vezi colecția
                <ArrowUpRightIcon />
              </button>
            </div>
          ) : (
            <div className="cart-lines">
              {lines.map(({ product, quantity }) => (
                <div className="cart-line" key={product.id}>
                  <div className="cart-line__image" style={{ background: product.surface }}>
                    <img src={product.image} alt="" width="160" height="240" />
                  </div>
                  <div className="cart-line__details">
                    <div>
                      <span>{product.subtitle}</span>
                      <h3>{product.name}</h3>
                      <p>M / {product.color}</p>
                    </div>
                    <div className="cart-line__bottom">
                      <div className="quantity-control" aria-label={`Cantitate pentru ${product.name}`}>
                        <button type="button" onClick={() => onDecrease(product.id)} aria-label="Scade cantitatea"><MinusIcon /></button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => onIncrease(product.id)} aria-label="Crește cantitatea"><PlusIcon /></button>
                      </div>
                      <strong>{formatPrice(product.price * quantity)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="shipping-progress">
              <div><span>Transport gratuit</span><strong>{subtotal >= FREE_SHIPPING_THRESHOLD ? 'Deblocat' : `${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} rămași`}</strong></div>
              <span className="shipping-progress__track"><span style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }} /></span>
            </div>
            <div className="subtotal"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <button className="checkout-button" type="button">
              Spre checkout
              <ArrowUpRightIcon />
            </button>
            <p>Taxele și livrarea sunt calculate la checkout.</p>
          </div>
        )}
      </aside>
    </div>
  )
}

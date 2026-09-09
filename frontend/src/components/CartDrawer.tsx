import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import type { CartLine } from '../types/product'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '../utils/currency'
import { ArrowUpRightIcon, BagIcon, CloseIcon, MinusIcon, PlusIcon } from './Icons'

interface CartDrawerProps {
  isOpen: boolean
  lines: readonly CartLine[]
  onClose: () => void
  onIncrease: (productId: string, size: string) => void
  onDecrease: (productId: string, size: string) => void
}

export function CartDrawer({ isOpen, lines, onClose, onIncrease, onDecrease }: CartDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !isOpen) return
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [isOpen])

  const subtotal = lines.reduce((total, line) => total + line.product.price * line.quantity, 0)
  const count = lines.reduce((total, line) => total + line.quantity, 0)

  return (
    <dialog ref={dialogRef} className="cart-dialog" aria-labelledby="cart-title" onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      {isOpen && <motion.div className="cart-drawer" initial={reducedMotion ? false : { x: '100%' }} animate={{ x: 0 }} transition={{ duration: 0.4 }}>
        <div className="cart-drawer__header"><div><span className="mono">YOUR NEXT GOOD FIT / {String(count).padStart(2, '0')}</span><h2 id="cart-title">În coșul tău.</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Închide coșul" autoFocus><CloseIcon /></button></div>
        <div className="cart-drawer__content">
          {lines.length === 0 ? <div className="empty-cart"><BagIcon /><h3>Următorul tău fit<br />te așteaptă.</h3><p>Alege piesa care vorbește pe limba ta.</p><a className="button button--dark" href="#shop" onClick={onClose}>Descoperă colecția <ArrowUpRightIcon /></a></div> :
            <div className="cart-lines">{lines.map(({ product, quantity, size }) => (
              <div className="cart-line" key={`${product.id}-${size}`}>
                <div className="cart-line__image" style={{ background: product.surface }}><img src={product.image} alt="" width="160" height="240" /></div>
                <div className="cart-line__details"><div><span className="mono">{product.subtitle}</span><h3>{product.name}</h3><p>{size} / {product.color}</p></div><div className="cart-line__bottom"><div className="quantity-control" role="group" aria-label={`Cantitate pentru ${product.name}, ${size}`}><button type="button" onClick={() => onDecrease(product.id, size)} aria-label={`Scade cantitatea pentru ${product.name}, ${size}`}><MinusIcon /></button><span aria-live="polite">{quantity}</span><button type="button" onClick={() => onIncrease(product.id, size)} aria-label={`Crește cantitatea pentru ${product.name}, ${size}`}><PlusIcon /></button></div><strong>{formatPrice(product.price * quantity)}</strong></div></div>
              </div>
            ))}</div>
          }
        </div>
        {lines.length > 0 && <div className="cart-drawer__footer"><div className="shipping-progress"><div><span>Transport gratuit</span><strong>{subtotal >= FREE_SHIPPING_THRESHOLD ? 'Deblocat ✓' : `${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} rămași`}</strong></div><span className="shipping-progress__track"><motion.span initial={false} animate={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }} /></span></div><div className="subtotal"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><button className="checkout-button" type="button" disabled>Checkout în curând <ArrowUpRightIcon /></button><p>Comenzile online nu sunt încă disponibile.</p><button className="text-link" type="button" onClick={onClose}>Continuă explorarea <ArrowUpRightIcon /></button></div>}
      </motion.div>}
    </dialog>
  )
}

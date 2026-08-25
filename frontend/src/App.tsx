import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import './App.css'
import { CartDrawer } from './components/CartDrawer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ArrowUpRightIcon } from './components/Icons'
import { ProductCard } from './components/ProductCard'
import { featuredProduct, products } from './data/products'
import type { ProductCategory } from './types/product'

type ProductFilter = 'Toate' | ProductCategory

const productFilters: readonly ProductFilter[] = ['Toate', 'Motorsport', 'Graphic', 'Color']

function App() {
  const [activeFilter, setActiveFilter] = useState<ProductFilter>('Toate')
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set())
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorFollowerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12 },
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [activeFilter])

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let animationFrame = 0
    let pointerX = -100
    let pointerY = -100
    let followerX = -100
    let followerY = -100

    const renderCursor = () => {
      followerX += (pointerX - followerX) * 0.16
      followerY += (pointerY - followerY) * 0.16
      cursorRef.current?.style.setProperty('transform', `translate3d(${pointerX}px, ${pointerY}px, 0)`)
      cursorFollowerRef.current?.style.setProperty('transform', `translate3d(${followerX}px, ${followerY}px, 0)`)
      animationFrame = window.requestAnimationFrame(renderCursor)
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    animationFrame = window.requestAnimationFrame(renderCursor)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  const filteredProducts = useMemo(
    () => activeFilter === 'Toate'
      ? products
      : products.filter((product) => product.category === activeFilter),
    [activeFilter],
  )

  const cartLines = useMemo(
    () => products
      .filter((product) => cartQuantities[product.id] > 0)
      .map((product) => ({ product, quantity: cartQuantities[product.id] })),
    [cartQuantities],
  )

  const cartCount = cartLines.reduce((total, line) => total + line.quantity, 0)

  const addToCart = (productId: string) => {
    setCartQuantities((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }))
    setCartOpen(true)
  }

  const decreaseCartQuantity = (productId: string) => {
    setCartQuantities((current) => ({
      ...current,
      [productId]: Math.max((current[productId] ?? 0) - 1, 0),
    }))
  }

  const toggleFavorite = (productId: string) => {
    setFavoriteIds((current) => {
      const next = new Set(current)
      if (next.has(productId)) next.delete(productId)
      else next.add(productId)
      return next
    })
  }

  const closeCart = useCallback(() => setCartOpen(false), [])

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <div className="app-shell">
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="custom-cursor custom-cursor--follower" ref={cursorFollowerRef} aria-hidden="true" />

      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <main>
        <Hero product={featuredProduct} onAddToCart={addToCart} />

        <div className="velocity-marquee" aria-label="Valentin tank lab, heavy cotton, made to move">
          <div>
            <span>Valentin tank lab</span><i>✦</i>
            <span>Heavy cotton</span><i>✦</i>
            <span>Made to move</span><i>✦</i>
            <span>Valentin tank lab</span><i>✦</i>
            <span>Heavy cotton</span><i>✦</i>
            <span>Made to move</span><i>✦</i>
          </div>
        </div>

        <section className="collection-section" id="shop">
          <div className="section-heading" data-reveal>
            <div>
              <span className="section-kicker">Drop 001 / 04 pieces</span>
              <h2>Alege-ți<br /><em>povestea.</em></h2>
            </div>
            <p>
              Patru stări, aceeași croială premium. Fiecare piesă este creată
              să întoarcă priviri și să reziste mult după sezon.
            </p>
          </div>

          <div className="collection-toolbar" data-reveal>
            <div className="filter-list" role="group" aria-label="Filtrează colecția">
              {productFilters.map((filter) => (
                <button
                  className={activeFilter === filter ? 'is-active' : ''}
                  type="button"
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
            <span>{filteredProducts.length.toString().padStart(2, '0')} rezultate</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favoriteIds.has(product.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <section className="track-story" id="story">
          <div className="track-story__visual" data-reveal>
            <div className="story-grid" aria-hidden="true" />
            <span className="story-coordinate story-coordinate--one">50°20′04″N</span>
            <span className="story-coordinate story-coordinate--two">06°56′29″E</span>
            <svg className="track-line" viewBox="0 0 540 430" aria-hidden="true">
              <path d="M114 284c-38-34-32-95 15-116 18-8 30-24 32-44 4-42 42-71 82-58l42 14c22 7 45 3 63-12 32-26 79-10 88 31 4 20 18 36 37 43 38 14 51 61 25 92l-28 33c-14 17-19 40-11 61 14 40-19 79-61 72l-46-8c-22-4-45 4-60 21-29 32-80 23-96-17l-17-42c-8-20-24-35-45-42l-20-7Z" />
            </svg>
            <div className="track-dot" aria-hidden="true" />
            <div className="story-product">
              <img src={featuredProduct.image} alt="Maioul Nürburgring 73 văzut în showroom" width="768" height="1152" loading="lazy" />
            </div>
            <span className="story-stamp">20.8 KM<br />OF LEGEND</span>
          </div>

          <div className="track-story__copy" data-reveal>
            <span className="section-kicker section-kicker--light">Hero story / Germany</span>
            <h2>Nu este doar<br />un <em>circuit.</em></h2>
            <p className="track-story__lead">
              Este un loc care te face să simți viteza înainte să pornească motorul.
              Am transformat harta Nordschleife într-un print purtabil — precis, tactil
              și suficient de discret încât să-l descoperi din a doua privire.
            </p>
            <div className="story-details">
              <div><span>Material</span><strong>300 GSM cotton</strong></div>
              <div><span>Print</span><strong>High-density ink</strong></div>
              <div><span>Fit</span><strong>Relaxed / unisex</strong></div>
            </div>
            <button className="button button--acid" type="button" onClick={() => addToCart(featuredProduct.id)}>
              Adaugă piesa erou
              <ArrowUpRightIcon />
            </button>
          </div>
        </section>

        <section className="quality-section" id="quality">
          <div className="quality-intro" data-reveal>
            <span className="section-kicker">Built different / literally</span>
            <h2>Detaliile mici.<br /><em>Impactul mare.</em></h2>
          </div>
          <div className="quality-grid">
            <article data-reveal>
              <span>01</span>
              <div className="material-swatch material-swatch--cotton" aria-hidden="true" />
              <h3>Bumbac greu</h3>
              <p>300 GSM care cade curat pe corp și nu își pierde forma după două spălări.</p>
            </article>
            <article data-reveal>
              <span>02</span>
              <div className="material-swatch material-swatch--fit" aria-hidden="true"><i /><i /><i /></div>
              <h3>Fit gândit</h3>
              <p>Umeri bine definiți, armhole generos și lungime calibrată pentru layering.</p>
            </article>
            <article data-reveal>
              <span>03</span>
              <div className="material-swatch material-swatch--print" aria-hidden="true">V</div>
              <h3>Print tactil</h3>
              <p>Culori dense, detalii clare și o textură pe care o simți fără să fie rigidă.</p>
            </article>
          </div>
        </section>

        <section className="newsletter-section">
          <div data-reveal>
            <span className="section-kicker">No spam / just good drops</span>
            <h2>{subscribed ? 'Ești pe listă.' : <>Primul la drop.<br /><em>Ultimul banal.</em></>}</h2>
          </div>
          {subscribed ? (
            <p className="newsletter-success" role="status" data-reveal>
              Perfect. Următorul drop ajunge la tine înaintea tuturor.
            </p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} data-reveal>
              <label htmlFor="newsletter-email">Email</label>
              <input id="newsletter-email" type="email" placeholder="numele@tau.ro" required />
              <button type="submit" aria-label="Înscrie-te la newsletter"><ArrowUpRightIcon /></button>
            </form>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="wordmark wordmark--footer" href="#top">VALENTIN<span>®</span></a>
          <p>Maiouri create pentru<br />zile fără frână.</p>
          <div className="footer-links">
            <div><span>Explore</span><a href="#shop">Shop all</a><a href="#story">Poveste</a><a href="#quality">Fit guide</a></div>
            <div><span>Social</span><a href="#instagram">Instagram</a><a href="#tiktok">TikTok</a><a href="#pinterest">Pinterest</a></div>
            <div><span>Help</span><a href="#shipping">Livrare</a><a href="#returns">Retur</a><a href="mailto:hello@valentin.store">Contact</a></div>
          </div>
        </div>
        <div className="footer-word">VALENTIN</div>
        <div className="footer-bottom"><span>© 2026 Valentin Tank Lab</span><span>Designed to move / RO</span></div>
      </footer>

      <CartDrawer
        isOpen={cartOpen}
        lines={cartLines}
        onClose={closeCart}
        onIncrease={addToCart}
        onDecrease={decreaseCartQuantity}
      />
    </div>
  )
}

export default App

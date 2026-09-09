import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { useCallback, useMemo, useRef, useState } from 'react'
import './App.css'
import { BrandStory } from './components/BrandStory'
import { CartDrawer } from './components/CartDrawer'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CloseIcon, HouseMark, SearchIcon } from './components/Icons'
import { Reveal } from './components/MotionEffects'
import { ProductCard } from './components/ProductCard'
import { featuredProduct, products } from './data/products'
import type { CartLine, ProductCategory } from './types/product'

type ProductFilter = 'Toate' | ProductCategory | 'Favorite'
const productFilters: readonly ProductFilter[] = ['Toate', 'Motorsport', 'Graphic', 'Color', 'Favorite']

function App() {
  const [activeFilter, setActiveFilter] = useState<ProductFilter>('Toate')
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set())
  const [cartLines, setCartLines] = useState<CartLine[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeFilter === 'Toate' || (activeFilter === 'Favorite' ? favoriteIds.has(product.id) : product.category === activeFilter)
    const searchable = `${product.name} ${product.color} ${product.subtitle}`.toLocaleLowerCase('ro')
    return matchesCategory && searchable.includes(searchQuery.trim().toLocaleLowerCase('ro'))
  }), [activeFilter, favoriteIds, searchQuery])

  const cartCount = cartLines.reduce((total, line) => total + line.quantity, 0)

  const addToCart = (productId: string, size = 'M') => {
    const product = products.find((entry) => entry.id === productId)
    if (!product || !product.sizes.includes(size)) return
    setCartLines((current) => {
      const existingLine = current.find((line) => line.product.id === productId && line.size === size)
      return existingLine
        ? current.map((line) => line === existingLine ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, size, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const decreaseCartQuantity = (productId: string, size: string) => {
    setCartLines((current) => current.map((line) => line.product.id === productId && line.size === size
      ? { ...line, quantity: line.quantity - 1 } : line).filter((line) => line.quantity > 0))
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
  const focusSearch = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    searchRef.current?.focus({ preventScroll: true })
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      <div className="app-shell">
        <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} onSearch={focusSearch} />
        <main id="main" tabIndex={-1}>
          <Hero product={featuredProduct} onAddToCart={addToCart} />
          <div className="brand-marquee" aria-label="Good fits. Good energy. FitHouse. Make yourself at home.">
            <div className="brand-marquee__track" aria-hidden="true">{[0, 1, 2, 3].map((copy) => <div className="brand-marquee__group" key={copy}><span>GOOD FITS.</span><HouseMark /><span>GOOD ENERGY.</span><HouseMark /><span className="marquee-outline">MAKE YOURSELF AT HOME.</span><HouseMark /></div>)}</div>
          </div>

          <section className="collection-section section-space" id="shop" aria-labelledby="collection-title">
            <Reveal className="section-heading"><div><span className="section-kicker"><i className="status-dot" /> 01 / THE EVERYDAY COLLECTION</span><h2 id="collection-title">Piese bune.<br /><span>Zero compromisuri.</span></h2></div><div className="collection-intro"><p>Patru personalități. Același ADN FitHouse.<br />Găsește piesa care vorbește pe limba ta.</p><span className="mono">DROP 001 — DISPONIBIL ACUM ↗</span></div></Reveal>
            <div className="collection-toolbar">
              <div className="filter-list" role="group" aria-label="Filtrează colecția">{productFilters.map((filter) => <button className={activeFilter === filter ? 'is-active' : ''} type="button" key={filter} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{activeFilter === filter && <motion.span className="filter-indicator" layoutId="collection-filter" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}<span>{filter}{filter === 'Favorite' && favoriteIds.size > 0 ? ` (${favoriteIds.size})` : ''}</span></button>)}</div>
              <label className="collection-search"><SearchIcon /><span className="sr-only">Caută produse</span><input ref={searchRef} type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Caută un fit..." /></label>
            </div>
            <p className="sr-only" role="status">{filteredProducts.length} produse găsite</p>
            <motion.div className="product-grid" layout>
              <AnimatePresence mode="popLayout">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} isFavorite={favoriteIds.has(product.id)} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />)}</AnimatePresence>
            </motion.div>
            {filteredProducts.length === 0 && <div className="empty-results"><SearchIcon /><h3>{activeFilter === 'Favorite' ? 'Loc pentru viitoarele tale favorite.' : 'Niciun fit găsit deocamdată.'}</h3><p>{activeFilter === 'Favorite' ? 'Apasă pe inimioara unei piese pentru a o salva aici.' : 'Încearcă alt nume sau explorează întreaga colecție.'}</p><button className="text-link" type="button" onClick={() => { setActiveFilter('Toate'); setSearchQuery('') }}>Vezi toate piesele <CloseIcon /></button></div>}
            <div className="collection-bottom mono"><span>4 PIESE. POSIBILITĂȚI NELIMITATE.</span><span>FĂRĂ REGULI. DOAR STILUL TĂU.</span></div>
          </section>
          <BrandStory />
        </main>
        <Footer />
        <CartDrawer isOpen={cartOpen} lines={cartLines} onClose={closeCart} onIncrease={addToCart} onDecrease={decreaseCartQuantity} />
      </div>
    </MotionConfig>
  )
}

export default App

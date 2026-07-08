import { useState, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Check, Tag } from 'lucide-react'
import StoreLayout from '../components/StoreLayout'
import StarRating from '../components/StarRating'
import ProductCarousel from '../components/ProductCarousel'
import SubscribeSection from '../components/SubscribeSection'
import AddToCartModal from '../components/AddToCartModal'
import { useProducts } from '../context/ProductsContext'
import { getProductById } from '../data/productDetails'
import { formatPrice, getEffectivePrice, getDiscountPercent } from '../utils/productUtils'

export default function ProductDetail() {
  const { id } = useParams()
  const { products } = useProducts()
  const [sortBy, setSortBy] = useState('recent')
  const [modalOpen, setModalOpen] = useState(false)

  const product = getProductById(products, id)
  const sortedReviews = useMemo(() => {
    if (!product) return []
    const reviews = [...product.reviews]
    if (sortBy === 'recent') return reviews.sort((a, b) => new Date(b.date) - new Date(a.date))
    return reviews.sort((a, b) => b.rating - a.rating)
  }, [product, sortBy])

  if (!product) return <Navigate to="/" replace />

  const price = getEffectivePrice(product)
  const discount = getDiscountPercent(product)
  const outOfStock = product.stock === 0

  return (
    <StoreLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-teal hover:text-forest mb-6 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-up">
          <div className="relative rounded-2xl overflow-hidden border border-sage/30 aspect-square max-h-[500px]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.onSale && <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500 text-white font-bold">-{discount}% OFF</span>}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-teal text-sm">{product.category}</span>
          </div>

          <div>
            <p className="text-xs text-sage font-mono mb-2">SKU: {product.sku}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-deep mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} size="lg" />
              <span className="text-forest font-semibold">{product.rating}</span>
              <span className="text-sage text-sm">({product.reviewCount} calificaciones)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-extrabold text-forest">{formatPrice(price)}</span>
              {product.onSale && <span className="text-lg text-sage line-through">{formatPrice(product.price)}</span>}
            </div>
            <p className="text-teal leading-relaxed mb-6">{product.description}</p>
            <div className="mb-6">
              <h3 className="font-semibold text-deep mb-3 flex items-center gap-2"><Tag className="w-4 h-4" /> Características</h3>
              <ul className="space-y-2">{product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-teal"><Check className="w-4 h-4 text-forest shrink-0" />{f}</li>
              ))}</ul>
            </div>
            {!outOfStock && <p className="text-sm text-teal mb-4">{product.stock} disponibles</p>}
            <button type="button" onClick={() => setModalOpen(true)} disabled={outOfStock} className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-forest to-deep text-mint font-bold hover:shadow-xl disabled:opacity-50">
              <ShoppingBag className="w-5 h-5" /> {outOfStock ? 'Agotado' : 'Agregar'}
            </button>
          </div>
        </div>

        <section className="mt-12 bg-white/80 rounded-2xl border border-sage/30 p-6 sm:p-8">
          <div className="flex flex-wrap justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-deep">Opiniones</h2>
              <StarRating rating={product.rating} />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-xl border border-sage/40 text-sm">
              <option value="recent">Más recientes</option>
              <option value="rating">Mejor calificados</option>
            </select>
          </div>
          <div className="space-y-4">
            {sortedReviews.map((r) => (
              <article key={r.id} className="p-4 rounded-xl bg-mint/10">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-deep text-sm">{r.author}</span>
                  <span className="text-xs text-sage">{new Date(r.date).toLocaleDateString('es-GT')}</span>
                </div>
                <StarRating rating={r.rating} size="sm" />
                <p className="text-teal text-sm mt-2">{r.text}</p>
              </article>
            ))}
          </div>
        </section>

        <ProductCarousel products={products} excludeId={product.id} />
        <SubscribeSection />
      </div>
      <AddToCartModal product={product} open={modalOpen} onClose={() => setModalOpen(false)} />
    </StoreLayout>
  )
}

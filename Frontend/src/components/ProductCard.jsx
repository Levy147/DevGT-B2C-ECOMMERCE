import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import AddToCartModal from './AddToCartModal'
import { getEffectivePrice, getDiscountPercent, formatPrice } from '../utils/productUtils'

export default function ProductCard({ product, index = 0, listView = false }) {
  const [modalOpen, setModalOpen] = useState(false)

  const price = getEffectivePrice(product)
  const discount = getDiscountPercent(product)

  const openModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setModalOpen(true)
  }

  if (listView) {
    return (
      <>
        <article className="flex gap-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-sage/30 p-4 hover:shadow-md transition-all">
          <Link to={`/producto/${product.id}`} className="shrink-0">
            <img src={product.image} alt="" className="w-24 h-24 rounded-xl object-cover" />
          </Link>
          <div className="flex-1 min-w-0">
            <Link to={`/producto/${product.id}`}>
              <h3 className="font-semibold text-deep hover:text-forest">{product.name}</h3>
            </Link>
            <p className="text-sm text-teal mt-1 line-clamp-2">{product.category}</p>
            <PriceBlock product={product} price={price} discount={discount} />
          </div>
          <button type="button" onClick={openModal} className="self-center shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-forest to-deep text-mint text-sm font-semibold">
            Agregar
          </button>
        </article>
        <AddToCartModal product={product} open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    )
  }

  return (
    <>
      <article className="product-card-enter group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-sage/30 shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all flex flex-col" style={{ animationDelay: `${index * 0.05}s` }}>
        <Link to={`/producto/${product.id}`} className="block relative aspect-square overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
          {product.onSale && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">-{discount}%</span>
          )}
          {product.isNew && !product.onSale && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-violet-500 text-white text-xs font-bold">Nuevo</span>
          )}
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 text-teal text-xs">{product.category}</span>
        </Link>
        <div className="p-3 sm:p-4 flex flex-col flex-1">
          <Link to={`/producto/${product.id}`}>
            <h3 className="font-semibold text-deep text-sm line-clamp-2 hover:text-forest">{product.name}</h3>
          </Link>
          <div className="mt-auto pt-2">
            <PriceBlock product={product} price={price} discount={discount} />
            <button type="button" onClick={openModal} className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-forest to-deep text-mint text-sm font-semibold hover:shadow-lg">
              <ShoppingBag className="w-4 h-4" /> Agregar
            </button>
          </div>
        </div>
      </article>
      <AddToCartModal product={product} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

function PriceBlock({ product, price, discount }) {
  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className="text-lg sm:text-xl font-bold text-forest">{formatPrice(price)}</span>
      {product.onSale && (
        <span className="text-sm text-sage line-through">{formatPrice(product.price)}</span>
      )}
    </div>
  )
}

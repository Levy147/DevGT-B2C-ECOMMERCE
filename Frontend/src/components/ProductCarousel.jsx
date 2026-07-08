import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import Swal from 'sweetalert2'
import { useCart } from '../context/CartContext'
import { formatPrice, getEffectivePrice } from '../utils/productUtils'

export default function ProductCarousel({ products, excludeId }) {
  const { addToCart, items } = useCart()
  const filtered = products.filter((p) => p.id !== excludeId)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(3)

  useEffect(() => {
    const update = () => {
      setVisible(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, filtered.length - visible)

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1))
  }, [maxIndex])

  const prev = () => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  }

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  useEffect(() => {
    if (paused || filtered.length <= visible) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [paused, next, filtered.length, visible])

  if (filtered.length === 0) return null

  const handleAdd = (product, e) => {
    e.preventDefault()
    const inCart = items.find((i) => i.id === product.id)?.quantity ?? 0
    if (product.stock - inCart <= 0) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Sin stock disponible',
        showConfirmButton: false,
        timer: 2000,
        background: '#f5f8fd',
      })
      return
    }
    addToCart(product)
  }

  const itemWidth = `${100 / visible}%`

  return (
    <section
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-deep">También te puede interesar</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="p-2 rounded-xl border border-sage/40 hover:bg-mint/30 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-forest" />
          </button>
          <button
            type="button"
            onClick={next}
            className="p-2 rounded-xl border border-sage/40 hover:bg-mint/30 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 text-forest" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
        >
          {filtered.map((product) => (
            <div
              key={product.id}
              className="shrink-0 px-2"
              style={{ width: itemWidth }}
            >
              <Link
                to={`/producto/${product.id}`}
                className="block bg-white/80 backdrop-blur-sm rounded-2xl border border-sage/30 p-4 h-full hover:shadow-md transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-xl mb-3"
                />
                <h3 className="font-semibold text-deep text-sm line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-forest my-2">
                  {formatPrice(getEffectivePrice(product))}
                </p>
                <button
                  type="button"
                  onClick={(e) => handleAdd(product, e)}
                  disabled={product.stock === 0}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-forest to-deep text-mint text-sm font-semibold hover:shadow-md transition-all disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Agregar
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

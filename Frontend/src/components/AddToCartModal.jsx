import { useState } from 'react'
import { X, Plus, Minus, ShoppingBag, ShoppingCart } from 'lucide-react'
import Swal from 'sweetalert2'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import { getEffectivePrice, formatPrice } from '../utils/productUtils'

export default function AddToCartModal({ product, open, onClose }) {
  const { addToCart, items } = useCart()
  const { getProductStock } = useProducts()
  const [qty, setQty] = useState(1)

  if (!open || !product) return null

  const inCart = items.find((i) => i.id === product.id)?.quantity ?? 0
  const stock = getProductStock(product.id)
  const maxQty = Math.max(0, stock - inCart)
  const price = getEffectivePrice(product)
  const cartItem = { ...product, price }

  const handleAdd = (openPanel = false) => {
    if (qty < 1 || qty > maxQty) return
    addToCart(cartItem, qty, { openPanel })
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `${qty} producto(s) agregado(s)`, showConfirmButton: false, timer: 1500, background: '#f8fffd' })
    setQty(1)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-deep/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-sage/20">
          <h3 className="font-bold text-deep">Selecciona cantidad</h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-sage/20">
            <X className="w-5 h-5 text-teal" />
          </button>
        </div>

        <div className="p-5">
          <div className="flex gap-4 mb-5">
            <img src={product.image} alt="" className="w-20 h-20 rounded-xl object-cover" />
            <div>
              <p className="font-semibold text-deep text-sm">{product.name}</p>
              <p className="text-xl font-bold text-forest mt-1">{formatPrice(price)}</p>
              <p className="text-xs text-teal mt-1">{maxQty} disponibles</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} className="w-10 h-10 rounded-xl border border-sage/40 flex items-center justify-center hover:bg-mint/30 disabled:opacity-40">
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-2xl font-bold text-deep w-12 text-center">{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} disabled={qty >= maxQty} className="w-10 h-10 rounded-xl border border-sage/40 flex items-center justify-center hover:bg-mint/30 disabled:opacity-40">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <p className="text-center text-teal mb-4">
            Subtotal: <strong className="text-forest">{formatPrice(price * qty)}</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button type="button" onClick={() => handleAdd(false)} disabled={maxQty === 0} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-forest to-deep text-mint font-semibold hover:shadow-lg disabled:opacity-50">
              <ShoppingBag className="w-4 h-4" />
              Agregar al carrito
            </button>
            <button type="button" onClick={() => handleAdd(false)} disabled={maxQty === 0} className="py-3 rounded-xl border-2 border-forest text-forest font-semibold hover:bg-mint/20 disabled:opacity-50">
              Seguir comprando
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleAdd(true)}
            disabled={maxQty === 0}
            className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-xl bg-mint/30 text-forest font-medium hover:bg-mint/50 disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar e ir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

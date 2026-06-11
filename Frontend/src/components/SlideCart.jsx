import { useNavigate } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import { formatPrice, getEffectivePrice } from '../utils/productUtils'
import Swal from 'sweetalert2'

export default function SlideCart() {
  const navigate = useNavigate()
  const {
    items,
    isOpen,
    totalItems,
    subtotal,
    shipping,
    totalPrice,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart()
  const { getProductStock } = useProducts()

  const handleIncrease = (item) => {
    const stock = getProductStock(item.id)
    if (item.quantity >= stock) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Stock máximo alcanzado',
        showConfirmButton: false,
        timer: 2000,
        background: '#f8fffd',
      })
      return
    }
    updateQuantity(item.id, 1)
  }

  const goToCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-deep/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-350 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-sage/30 bg-gradient-to-r from-mint/20 to-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-forest" />
            <div>
              <h2 className="font-bold text-lg text-deep leading-tight">Tu Carrito</h2>
              {totalItems > 0 && (
                <p className="text-xs text-teal">
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 rounded-xl hover:bg-sage/20 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5 text-teal" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 rounded-full bg-mint/30 flex items-center justify-center mb-4 animate-pulse-soft">
                <ShoppingBag className="w-10 h-10 text-teal" />
              </div>
              <p className="text-teal font-medium">Tu carrito está vacío</p>
              <p className="text-sage text-sm mt-1">Agrega productos del catálogo</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 p-3 rounded-2xl bg-mint/10 border border-sage/20"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-deep truncate">{item.name}</h4>
                    <p className="text-forest font-bold text-sm mt-0.5">
                      {formatPrice(item.price)}
                    </p>
                    <p className="text-xs text-teal">
                      Subtotal: {formatPrice(item.price * item.quantity)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white border border-sage/40 flex items-center justify-center hover:bg-mint/30"
                        aria-label="Reducir"
                      >
                        <Minus className="w-3.5 h-3.5 text-forest" />
                      </button>
                      <span className="w-8 text-center font-semibold text-deep text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrease(item)}
                        className="w-7 h-7 rounded-lg bg-white border border-sage/40 flex items-center justify-center hover:bg-mint/30"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5 text-forest" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto p-1.5 rounded-lg hover:bg-red-50 text-red-400"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-sage/30 px-5 py-5 bg-gradient-to-t from-mint/10 to-white space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-teal">Subtotal ({totalItems} productos)</span>
              <span className="font-semibold text-deep">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-teal">Envío</span>
              <span className="font-semibold text-deep">
                {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
              </span>
            </div>
            {subtotal < 100 && subtotal > 0 && (
              <p className="text-xs text-sage">
                Agrega {formatPrice(100 - subtotal)} más para envío gratis
              </p>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-sage/20">
              <span className="text-teal font-medium">Total</span>
              <span className="text-2xl font-bold text-deep">{formatPrice(totalPrice)}</span>
            </div>
            <button
              type="button"
              onClick={goToCheckout}
              className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-forest to-deep text-mint font-bold text-base hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Ir a pagar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

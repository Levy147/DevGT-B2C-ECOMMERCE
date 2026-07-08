import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { loadStorage, saveStorage, STORAGE_KEYS } from '../utils/storage'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() =>
    loadStorage(STORAGE_KEYS.cart, [])
  )
  const [isOpen, setIsOpen] = useState(false)
  const [badgePop, setBadgePop] = useState(false)

  useEffect(() => {
    saveStorage(STORAGE_KEYS.cart, items)
  }, [items])

  const addToCart = useCallback((product, quantity = 1, { openPanel = true } = {}) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
    setBadgePop(true)
    setTimeout(() => setBadgePop(false), 400)
    if (openPanel) setIsOpen(true)
  }, [])

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 15) : 0
  const totalPrice = subtotal + shipping

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        badgePop,
        totalItems,
        subtotal,
        shipping,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}

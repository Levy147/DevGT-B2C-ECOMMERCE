import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { mockProducts } from '../data/mockProducts'
import { loadStorage, saveStorage, STORAGE_KEYS } from '../utils/storage'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = loadStorage(STORAGE_KEYS.products, null)
    if (!saved || saved.length !== mockProducts.length) return mockProducts
    return saved
  })

  useEffect(() => {
    saveStorage(STORAGE_KEYS.products, products)
  }, [products])

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }, [])

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const setProductSale = useCallback((id, onSale, salePrice) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, onSale, salePrice: onSale ? salePrice : null }
          : p
      )
    )
  }, [])

  const reduceStock = useCallback((orderItems) => {
    setProducts((prev) =>
      prev.map((p) => {
        const ordered = orderItems.find((i) => i.id === p.id)
        if (ordered) return { ...p, stock: Math.max(0, p.stock - ordered.quantity) }
        return p
      })
    )
  }, [])

  const getProductStock = useCallback(
    (productId) => products.find((p) => p.id === productId)?.stock ?? 0,
    [products]
  )

  const lowStockCount = products.filter((p) => p.stock <= 10).length

  return (
    <ProductsContext.Provider
      value={{
        products,
        updateProduct,
        deleteProduct,
        setProductSale,
        reduceStock,
        getProductStock,
        lowStockCount,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProducts debe usarse dentro de ProductsProvider')
  return context
}

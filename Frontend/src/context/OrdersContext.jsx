import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { loadStorage, saveStorage, STORAGE_KEYS } from '../utils/storage'
import { generateTrackingCode } from '../utils/productUtils'

const OrdersContext = createContext(null)

function isToday(dateStr) {
  const date = new Date(dateStr)
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() =>
    loadStorage(STORAGE_KEYS.orders, [])
  )

  useEffect(() => {
    saveStorage(STORAGE_KEYS.orders, orders)
  }, [orders])

  const placeOrder = useCallback((orderData) => {
    const trackingCode = generateTrackingCode()
    const order = {
      id: Date.now(),
      trackingCode,
      createdAt: new Date().toISOString(),
      status: 'pending_confirm',
      archived: false,
      ...orderData,
    }
    setOrders((prev) => [order, ...prev])
    return order
  }, [])

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    )
  }, [])

  const archiveOrder = useCallback((orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: 'archived', archived: true } : o
      )
    )
  }, [])

  const getOrderByTracking = useCallback(
    (code) => orders.find((o) => o.trackingCode === code.toUpperCase()),
    [orders]
  )

  const activeOrders = orders.filter((o) => !o.archived)
  const todayOrders = orders.filter((o) => isToday(o.createdAt) && !o.archived)
  const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = activeOrders.filter(
    (o) => o.status === 'pending_confirm' || o.status === 'preparing' || o.status === 'in_transit'
  )

  return (
    <OrdersContext.Provider
      value={{
        orders: activeOrders,
        allOrders: orders,
        placeOrder,
        updateOrderStatus,
        archiveOrder,
        getOrderByTracking,
        todaySales,
        pendingOrders,
        pendingCount: pendingOrders.length,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) throw new Error('useOrders debe usarse dentro de OrdersProvider')
  return context
}

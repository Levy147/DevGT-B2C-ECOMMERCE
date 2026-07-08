import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { loadStorage, saveStorage, STORAGE_KEYS } from '../utils/storage'

const SubscribersContext = createContext(null)

export function SubscribersProvider({ children }) {
  const [subscribers, setSubscribers] = useState(() =>
    loadStorage(STORAGE_KEYS.subscribers, [])
  )

  useEffect(() => {
    saveStorage(STORAGE_KEYS.subscribers, subscribers)
  }, [subscribers])

  const subscribe = useCallback((email) => {
    const normalized = email.trim().toLowerCase()
    if (!normalized) return { success: false, error: 'Ingresa un correo válido' }

    const exists = subscribers.some((s) => s.email === normalized)
    if (exists) return { success: false, error: 'Este correo ya está suscrito' }

    setSubscribers((prev) => [
      { id: Date.now(), email: normalized, subscribedAt: new Date().toISOString() },
      ...prev,
    ])
    return { success: true }
  }, [subscribers])

  const sendPromoCampaign = useCallback((subject, message) => {
    return {
      success: true,
      count: subscribers.length,
      subject,
      message,
    }
  }, [subscribers.length])

  return (
    <SubscribersContext.Provider
      value={{ subscribers, subscribe, sendPromoCampaign }}
    >
      {children}
    </SubscribersContext.Provider>
  )
}

export function useSubscribers() {
  const context = useContext(SubscribersContext)
  if (!context) {
    throw new Error('useSubscribers debe usarse dentro de SubscribersProvider')
  }
  return context
}

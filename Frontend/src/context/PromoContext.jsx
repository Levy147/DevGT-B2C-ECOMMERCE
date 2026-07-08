import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { loadStorage, saveStorage, STORAGE_KEYS } from '../utils/storage'

const PromoContext = createContext(null)

function randomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let c = 'VF'
  for (let i = 0; i < 6; i++) c += chars[Math.floor(Math.random() * chars.length)]
  return c
}

export function PromoProvider({ children }) {
  const [promoCodes, setPromoCodes] = useState(() =>
    loadStorage(STORAGE_KEYS.promoCodes, [
      { id: 1, code: 'BIENVENIDO10', discount: 10, type: 'percent', active: true, uses: 0 },
      { id: 2, code: 'FATIMA15', discount: 15, type: 'percent', active: true, uses: 0 },
    ])
  )

  useEffect(() => {
    saveStorage(STORAGE_KEYS.promoCodes, promoCodes)
  }, [promoCodes])

  const generateCode = useCallback((discount, type = 'percent') => {
    const code = randomCode()
    const entry = {
      id: Date.now(),
      code,
      discount: Number(discount),
      type,
      active: true,
      uses: 0,
      createdAt: new Date().toISOString(),
    }
    setPromoCodes((prev) => [entry, ...prev])
    return entry
  }, [])

  const validateCode = useCallback(
    (code) => {
      const promo = promoCodes.find(
        (p) => p.code === code.toUpperCase() && p.active
      )
      if (!promo) return { valid: false, error: 'Código inválido o expirado' }
      return { valid: true, promo }
    },
    [promoCodes]
  )

  const applyCode = useCallback((code) => {
    setPromoCodes((prev) =>
      prev.map((p) =>
        p.code === code.toUpperCase() ? { ...p, uses: p.uses + 1 } : p
      )
    )
  }, [])

  const toggleCode = useCallback((id) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    )
  }, [])

  const calcDiscount = useCallback((subtotal, promo) => {
    if (!promo) return 0
    if (promo.type === 'percent') return subtotal * (promo.discount / 100)
    return Math.min(promo.discount, subtotal)
  }, [])

  return (
    <PromoContext.Provider
      value={{ promoCodes, generateCode, validateCode, applyCode, toggleCode, calcDiscount }}
    >
      {children}
    </PromoContext.Provider>
  )
}

export function usePromo() {
  const context = useContext(PromoContext)
  if (!context) throw new Error('usePromo debe usarse dentro de PromoProvider')
  return context
}

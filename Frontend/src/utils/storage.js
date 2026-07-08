export const STORAGE_KEYS = {
  products: 'variedades_products',
  orders: 'variedades_orders',
  cart: 'variedades_cart',
  subscribers: 'variedades_subscribers',
  users: 'variedades_users',
  promoCodes: 'variedades_promo_codes',
  userSession: 'variedades_user_session',
}

export function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

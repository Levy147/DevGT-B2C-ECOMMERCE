import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { loadStorage, saveStorage, STORAGE_KEYS } from '../utils/storage'

const UsersContext = createContext(null)

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(() =>
    loadStorage(STORAGE_KEYS.users, [])
  )
  const [currentUser, setCurrentUser] = useState(() => {
    const id = sessionStorage.getItem(STORAGE_KEYS.userSession)
    if (!id) return null
    const list = loadStorage(STORAGE_KEYS.users, [])
    return list.find((u) => String(u.id) === id) ?? null
  })

  useEffect(() => {
    saveStorage(STORAGE_KEYS.users, users)
  }, [users])

  const registerUser = useCallback((data) => {
    const email = data.email.trim().toLowerCase()
    if (users.some((u) => u.email === email))
      return { success: false, error: 'Este correo ya está registrado' }

    const user = {
      id: Date.now(),
      nombre: data.nombre,
      apellido: data.apellido,
      email,
      telefono: data.telefono,
      direccion: data.direccion,
      ciudad: data.ciudad || 'Guatemala',
      password: data.password,
      registeredAt: new Date().toISOString(),
    }
    setUsers((prev) => [user, ...prev])
    return { success: true, user }
  }, [users])

  const loginUser = useCallback((email, password) => {
    const normalized = email.trim().toLowerCase()
    const user = users.find(
      (u) => u.email === normalized && u.password === password
    )
    if (!user) return { success: false, error: 'Correo o contraseña incorrectos' }
    sessionStorage.setItem(STORAGE_KEYS.userSession, String(user.id))
    setCurrentUser(user)
    return { success: true, user }
  }, [users])

  const logoutUser = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEYS.userSession)
    setCurrentUser(null)
  }, [])

  const updateProfile = useCallback((userId, updates) => {
    setUsers((prev) => {
      const next = prev.map((u) =>
        u.id === userId ? { ...u, ...updates, id: userId } : u
      )
      const updated = next.find((u) => u.id === userId)
      if (currentUser?.id === userId) setCurrentUser(updated)
      return next
    })
    return { success: true }
  }, [currentUser])

  return (
    <UsersContext.Provider
      value={{
        users,
        currentUser,
        isLoggedIn: !!currentUser,
        registerUser,
        loginUser,
        logoutUser,
        updateProfile,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext)
  if (!context) throw new Error('useUsers debe usarse dentro de UsersProvider')
  return context
}

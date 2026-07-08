import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { Lock, User, Store } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import FloatingBackground from '../components/FloatingBackground'

export default function Login() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const result = login(username.trim(), password)
      if (result.success) {
        navigate('/admin')
      } else {
        setError(result.error)
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <FloatingBackground />

      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-forest to-deep items-center justify-center shadow-lg mb-4">
            <Store className="w-7 h-7 text-mint" />
          </div>
          <h1 className="text-2xl font-bold text-deep">Panel Administrativo</h1>
          <p className="text-teal text-sm mt-1">Variedades Fatima</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sage/30 shadow-lg p-6 sm:p-8 space-y-5"
        >
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-teal mb-1.5">
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 bg-white text-deep placeholder:text-sage/60 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-teal mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 bg-white text-deep placeholder:text-sage/60 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-forest to-deep text-mint font-semibold hover:shadow-lg hover:shadow-forest/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>

          <p className="text-center text-xs text-sage">
            Demo: usuario <span className="font-mono text-teal">fatima</span> · contraseña{' '}
            <span className="font-mono text-teal">fatima</span>
          </p>
        </form>

        <p className="text-center mt-6">
          <Link to="/" className="text-sm text-teal hover:text-forest transition-colors">
            ← Volver a la tienda
          </Link>
        </p>
      </div>
    </div>
  )
}

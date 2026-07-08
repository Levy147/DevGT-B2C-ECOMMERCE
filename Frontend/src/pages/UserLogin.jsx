import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowLeft } from 'lucide-react'
import Swal from 'sweetalert2'
import FloatingBackground from '../components/FloatingBackground'
import { useUsers } from '../context/UsersContext'

export default function UserLogin() {
  const { loginUser, isLoggedIn } = useUsers()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isLoggedIn) {
    navigate('/perfil')
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = loginUser(email, password)
    if (result.success) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: '¡Bienvenido!', showConfirmButton: false, timer: 2000, background: '#f8fffd' })
      navigate('/perfil')
    } else {
      Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: result.error, showConfirmButton: false, timer: 2500, background: '#f8fffd' })
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <FloatingBackground />
      <div className="w-full max-w-md animate-fade-up">
        <Link to="/" className="inline-flex items-center gap-2 text-teal text-sm mb-6"><ArrowLeft className="w-4 h-4" /> Volver</Link>
        <h1 className="text-2xl font-bold text-deep text-center mb-6">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sage/30 p-6 space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50" />
          </div>
          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-forest to-deep text-mint font-semibold">Entrar</button>
          <p className="text-center text-sm text-teal">
            ¿No tienes cuenta? <Link to="/registro" className="text-forest font-medium">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

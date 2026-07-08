import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { User, Mail, Phone, MapPin, Lock, ArrowLeft } from 'lucide-react'
import FloatingBackground from '../components/FloatingBackground'
import { useUsers } from '../context/UsersContext'

export default function Register() {
  const { registerUser } = useUsers()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: 'Guatemala',
    password: '',
    confirmPassword: '',
  })

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        showConfirmButton: false,
        timer: 2500,
        background: '#f5f8fd',
      })
      return
    }

    if (form.password.length < 6) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'La contraseña debe tener al menos 6 caracteres',
        showConfirmButton: false,
        timer: 2500,
        background: '#f5f8fd',
      })
      return
    }

    setLoading(true)
    setTimeout(() => {
      const { confirmPassword, password, ...data } = form
      const result = registerUser({ ...data, password })

      if (result.success) {
        Swal.fire({
          title: '¡Registro exitoso!',
          text: `Bienvenido/a ${form.nombre}. Tu cuenta ha sido creada (demo).`,
          icon: 'success',
          confirmButtonColor: '#1E56A0',
          background: '#f5f8fd',
        }).then(() => navigate('/'))
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: result.error,
          showConfirmButton: false,
          timer: 2500,
          background: '#f5f8fd',
        })
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      <FloatingBackground />

      <div className="w-full max-w-lg animate-fade-up">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-teal hover:text-forest transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la tienda
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-deep">Crear cuenta</h1>
          <p className="text-teal text-sm mt-1">
            Regístrate para una experiencia personalizada (demo)
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sage/30 shadow-lg p-6 sm:p-8 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-teal mb-1">Nombre</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={update('nombre')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-teal mb-1">Apellido</label>
              <input
                type="text"
                required
                value={form.apellido}
                onChange={update('apellido')}
                className="w-full px-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-teal mb-1">Correo electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
              <input
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-teal mb-1">Teléfono</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
              <input
                type="tel"
                required
                placeholder="502 XXXX XXXX"
                value={form.telefono}
                onChange={update('telefono')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-teal mb-1">Dirección</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-sage" />
              <input
                type="text"
                required
                value={form.direccion}
                onChange={update('direccion')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-teal mb-1">Ciudad</label>
            <input
              type="text"
              value={form.ciudad}
              onChange={update('ciudad')}
              className="w-full px-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-teal mb-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={update('password')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-teal mb-1">Confirmar</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={update('confirmPassword')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-forest to-deep text-mint font-semibold hover:shadow-lg transition-all disabled:opacity-60 mt-2"
          >
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </button>

          <p className="text-center text-xs text-sage">
            ¿Ya tienes cuenta?{' '}
            <Link to="/" className="text-forest font-medium hover:underline">
              Continuar como invitado
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Mail, Gift } from 'lucide-react'
import Swal from 'sweetalert2'
import { useSubscribers } from '../context/SubscribersContext'

export default function SubscribeSection() {
  const { subscribe } = useSubscribers()
  const [email, setEmail] = useState('')
  const [accepted, setAccepted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!accepted) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Debes aceptar el aviso de privacidad',
        showConfirmButton: false,
        timer: 2500,
        background: '#f8fffd',
      })
      return
    }

    const result = subscribe(email)
    if (result.success) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: '¡Suscripción exitosa!',
        showConfirmButton: false,
        timer: 2500,
        background: '#f8fffd',
      })
      setEmail('')
      setAccepted(false)
    } else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: result.error,
        showConfirmButton: false,
        timer: 2500,
        background: '#f8fffd',
      })
    }
  }

  return (
    <section className="mt-12 bg-gradient-to-br from-mint/30 via-white to-sage/20 rounded-2xl border border-sage/30 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-forest text-mint">
          <Gift className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-deep">Recibe ofertas y promociones</h2>
          <p className="text-teal text-sm">
            Suscríbete y entérate primero de descuentos exclusivos
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 bg-white focus:outline-none focus:ring-2 focus:ring-teal/50"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-forest to-deep text-mint font-semibold hover:shadow-lg transition-all whitespace-nowrap"
        >
          Suscribirme
        </button>
      </form>

      <label className="flex items-start gap-2 mt-4 cursor-pointer">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 accent-forest"
        />
        <span className="text-xs text-teal leading-relaxed">
          Al suscribirme, acepto el{' '}
          <span className="text-forest font-medium underline decoration-sage/50">
            Aviso de Privacidad
          </span>{' '}
          y los{' '}
          <span className="text-forest font-medium underline decoration-sage/50">
            Términos y Condiciones
          </span>{' '}
          de Variedades Fatima. Autorizo el uso de mis datos para recibir comunicaciones
          comerciales, promociones y novedades. Puedo cancelar mi suscripción en cualquier
          momento contactando a nuestro equipo de atención al cliente.
        </span>
      </label>
    </section>
  )
}

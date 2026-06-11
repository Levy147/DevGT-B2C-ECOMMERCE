import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { User, Mail, Phone, MapPin, Save } from 'lucide-react'
import StoreLayout from '../components/StoreLayout'
import { useUsers } from '../context/UsersContext'
import { confirmChange, buildChangeHtml } from '../utils/confirmDialog'

export default function Profile() {
  const { currentUser, updateProfile, logoutUser } = useUsers()
  const [form, setForm] = useState({
    nombre: currentUser?.nombre ?? '',
    apellido: currentUser?.apellido ?? '',
    email: currentUser?.email ?? '',
    telefono: currentUser?.telefono ?? '',
    direccion: currentUser?.direccion ?? '',
    ciudad: currentUser?.ciudad ?? '',
  })

  if (!currentUser) return <Navigate to="/login" replace />

  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }))

  const handleSave = async () => {
    const changes = []
    if (form.nombre !== currentUser.nombre) changes.push({ label: 'Nombre', before: currentUser.nombre, after: form.nombre })
    if (form.apellido !== currentUser.apellido) changes.push({ label: 'Apellido', before: currentUser.apellido, after: form.apellido })
    if (form.telefono !== currentUser.telefono) changes.push({ label: 'Teléfono', before: currentUser.telefono, after: form.telefono })
    if (form.direccion !== currentUser.direccion) changes.push({ label: 'Dirección', before: currentUser.direccion, after: form.direccion })
    if (form.ciudad !== currentUser.ciudad) changes.push({ label: 'Ciudad', before: currentUser.ciudad, after: form.ciudad })

    if (changes.length === 0) return

    const ok = await confirmChange({ title: '¿Confirmar cambios?', html: buildChangeHtml(changes) })
    if (!ok) return

    updateProfile(currentUser.id, form)
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Perfil actualizado', showConfirmButton: false, timer: 2000, background: '#f8fffd' })
  }

  return (
    <StoreLayout>
      <div className="max-w-lg mx-auto px-4 py-8 pb-16">
        <h1 className="text-2xl font-bold text-deep mb-6 flex items-center gap-2"><User className="w-6 h-6 text-forest" /> Mi perfil</h1>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sage/30 p-6 space-y-4">
          {[
            { icon: User, field: 'nombre', label: 'Nombre' },
            { icon: User, field: 'apellido', label: 'Apellido' },
            { icon: Mail, field: 'email', label: 'Email', disabled: true },
            { icon: Phone, field: 'telefono', label: 'Teléfono' },
            { icon: MapPin, field: 'direccion', label: 'Dirección' },
            { icon: MapPin, field: 'ciudad', label: 'Ciudad' },
          ].map(({ icon: Icon, field, label, disabled }) => (
            <div key={field}>
              <label className="text-sm text-teal font-medium">{label}</label>
              <div className="relative mt-1">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                <input type="text" value={form[field]} onChange={update(field)} disabled={disabled} className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage/40 disabled:bg-sage/10 focus:outline-none focus:ring-2 focus:ring-teal/50" />
              </div>
            </div>
          ))}
          <button type="button" onClick={handleSave} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-forest to-deep text-mint font-semibold">
            <Save className="w-4 h-4" /> Guardar cambios
          </button>
          <button type="button" onClick={logoutUser} className="w-full py-2 text-red-500 text-sm hover:underline">Cerrar sesión</button>
        </div>
      </div>
    </StoreLayout>
  )
}

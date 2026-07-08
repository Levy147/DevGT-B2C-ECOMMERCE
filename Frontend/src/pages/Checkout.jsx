import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { MapPin, CreditCard, CheckCircle, Truck, ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import StoreLayout from '../components/StoreLayout'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import { useProducts } from '../context/ProductsContext'
import { usePromo } from '../context/PromoContext'
import { formatPrice } from '../utils/productUtils'
import { buildWhatsAppMessage, openWhatsApp } from '../utils/whatsapp'
import { sendOrderToSheets } from '../utils/googleSheets'

const STEPS = [
  { id: 1, label: 'Envío', icon: Truck },
  { id: 2, label: 'Pago', icon: CreditCard },
  { id: 3, label: 'Confirmar', icon: CheckCircle },
]

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, shipping, totalPrice, totalItems, clearCart } = useCart()
  const { placeOrder } = useOrders()
  const { reduceStock } = useProducts()
  const { validateCode, applyCode, calcDiscount } = usePromo()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)

  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    ciudad: 'Guatemala',
    referencia: '',
    shippingMethod: 'domicilio',
    metodoPago: 'efectivo',
  })

  if (items.length === 0) return <Navigate to="/" replace />

  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }))
  const discount = appliedPromo ? calcDiscount(subtotal, appliedPromo) : 0
  const finalTotal = Math.max(0, totalPrice - discount)

  const applyPromo = () => {
    const result = validateCode(promoInput)
    if (!result.valid) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: result.error, showConfirmButton: false, timer: 2000, background: '#f5f8fd' })
      return
    }
    setAppliedPromo(result.promo)
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `Código ${result.promo.code} aplicado`, showConfirmButton: false, timer: 2000, background: '#f5f8fd' })
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      const order = placeOrder({
        items: items.map(({ id, name, price, quantity, image }) => ({ id, name, price, quantity, image })),
        subtotal,
        shipping,
        discount,
        total: finalTotal,
        promoCode: appliedPromo?.code ?? null,
        customer: {
          type: 'guest',
          userId: null,
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
        },
        shippingInfo: {
          method: form.shippingMethod,
          direccion: form.direccion,
          ciudad: form.ciudad,
          referencia: form.referencia,
        },
        payment: { method: form.metodoPago },
      })
      if (appliedPromo) applyCode(appliedPromo.code)
      reduceStock(order.items)
      clearCart()

      const msg = buildWhatsAppMessage(order)
      openWhatsApp(msg)
      sendOrderToSheets(order)

      Swal.fire({
        title: '¡Pedido confirmado!',
        html: `<p style="color:#5A8CC5;">Te redirigimos a WhatsApp con el resumen de tu pedido.</p>`,
        icon: 'success',
        confirmButtonColor: '#1E56A0',
        background: '#f5f8fd',
      })
      setLoading(false)
    }, 800)
  }

  return (
    <StoreLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-teal text-sm mb-6"><ArrowLeft className="w-4 h-4" /> Seguir comprando</Link>
        <h1 className="text-2xl font-bold text-deep mb-8">Finalizar compra</h1>

        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-sage/30 -z-10" />
          {STEPS.map((s) => (
            <div key={s.id} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s.id ? 'bg-forest text-mint' : 'bg-white border-2 border-sage/40 text-sage'}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs mt-2 font-medium ${step >= s.id ? 'text-forest' : 'text-sage'}`}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <section className="bg-white/80 rounded-2xl border border-sage/30 p-6 animate-fade-up">
                <h2 className="font-bold text-deep flex items-center gap-2 mb-2"><Truck className="w-5 h-5 text-forest" /> Opciones de envío</h2>
                <p className="text-sm text-teal mb-4">Selecciona cómo deseas recibir tu pedido</p>
                {['domicilio', 'recoger'].map((m) => (
                  <label key={m} className={`flex items-center gap-3 p-4 rounded-xl border mb-3 cursor-pointer ${form.shippingMethod === m ? 'border-forest bg-mint/20' : 'border-sage/30'}`}>
                    <input type="radio" name="ship" value={m} checked={form.shippingMethod === m} onChange={update('shippingMethod')} className="accent-forest" />
                    <span className="text-deep font-medium">{m === 'domicilio' ? 'Entrega a domicilio' : 'Recoger en tienda'}</span>
                  </label>
                ))}
                <div className="grid gap-3 mt-4">
                  <input type="text" placeholder="Nombre completo *" required value={form.nombre} onChange={update('nombre')} className="px-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50" />
                  <input type="tel" placeholder="Teléfono *" required value={form.telefono} onChange={update('telefono')} className="px-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50" />
                  <input type="email" placeholder="Email *" required value={form.email} onChange={update('email')} className="px-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50" />
                  <input type="text" placeholder="Dirección *" required value={form.direccion} onChange={update('direccion')} className="px-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50" />
                  <input type="text" placeholder="Ciudad" value={form.ciudad} onChange={update('ciudad')} className="px-4 py-3 rounded-xl border border-sage/40 focus:outline-none focus:ring-2 focus:ring-teal/50" />
                </div>
                <button type="button" onClick={() => setStep(2)} className="w-full mt-6 py-3 rounded-xl bg-forest text-mint font-semibold flex items-center justify-center gap-2">Siguiente <ArrowRight className="w-4 h-4" /></button>
              </section>
            )}

            {step === 2 && (
              <section className="bg-white/80 rounded-2xl border border-sage/30 p-6 animate-fade-up">
                <h2 className="font-bold text-deep flex items-center gap-2 mb-2"><CreditCard className="w-5 h-5 text-forest" /> Método de pago</h2>
                <p className="text-sm text-teal mb-4">Elige un método e ingresa tus datos</p>
                {[{ v: 'efectivo', l: 'Efectivo contra entrega' }, { v: 'transferencia', l: 'Transferencia bancaria' }].map((o) => (
                  <label key={o.v} className={`flex items-center gap-3 p-4 rounded-xl border mb-3 cursor-pointer ${form.metodoPago === o.v ? 'border-forest bg-mint/20' : 'border-sage/30'}`}>
                    <input type="radio" name="pay" value={o.v} checked={form.metodoPago === o.v} onChange={update('metodoPago')} className="accent-forest" />
                    <span className="text-deep">{o.l}</span>
                  </label>
                ))}
                <div className="flex gap-2 mt-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-sage/40 text-teal">Anterior</button>
                  <button type="button" onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl bg-forest text-mint font-semibold">Siguiente</button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="bg-white/80 rounded-2xl border border-sage/30 p-6 animate-fade-up">
                <h2 className="font-bold text-deep flex items-center gap-2 mb-4"><CheckCircle className="w-5 h-5 text-forest" /> Confirmación del pedido</h2>
                <p className="text-sm text-teal mb-4">Revisa tu pedido y confirma. Te redirigiremos a WhatsApp con el resumen.</p>
                <div className="space-y-2 text-sm text-teal mb-4">
                  <p><strong className="text-deep">Entrega:</strong> {form.direccion}, {form.ciudad}</p>
                  <p><strong className="text-deep">Contacto:</strong> {form.nombre} · {form.telefono}</p>
                  <p><strong className="text-deep">Pago:</strong> {form.metodoPago}</p>
                  <p><strong className="text-deep">Tipo:</strong> Invitado</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-sage/40 text-teal">Anterior</button>
                  <button type="button" onClick={handleSubmit} disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-forest to-deep text-mint font-bold disabled:opacity-60">
                    {loading ? 'Procesando...' : 'Confirmar pedido'}
                  </button>
                </div>
              </section>
            )}
          </div>

          <aside className="bg-white/80 rounded-2xl border border-sage/30 p-5 h-fit sticky top-24">
            <h3 className="font-bold text-deep mb-3">Resumen ({totalItems})</h3>
            <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto text-sm">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between text-teal"><span className="truncate flex-1">{i.name} ×{i.quantity}</span><span className="font-semibold text-forest ml-2">{formatPrice(i.price * i.quantity)}</span></li>
              ))}
            </ul>
            <div className="flex gap-2 mb-3">
              <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value.toUpperCase())} placeholder="Código promo" className="flex-1 px-3 py-2 rounded-lg border border-sage/40 text-sm uppercase" />
              <button type="button" onClick={applyPromo} className="px-3 py-2 rounded-lg bg-mint/40 text-forest text-sm font-semibold"><Tag className="w-4 h-4" /></button>
            </div>
            {appliedPromo && <p className="text-xs text-forest mb-2">Aplicado: {appliedPromo.code} (-{appliedPromo.discount}{appliedPromo.type === 'percent' ? '%' : ' Q'})</p>}
            <div className="border-t border-sage/20 pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Envío</span><span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span></div>
              {discount > 0 && <div className="flex justify-between text-red-500"><span>Descuento</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between font-bold text-lg text-deep pt-2"><span>Total</span><span>{formatPrice(finalTotal)}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </StoreLayout>
  )
}

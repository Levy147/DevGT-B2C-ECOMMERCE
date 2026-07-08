import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Search, ArrowLeft } from 'lucide-react'
import StoreLayout from '../components/StoreLayout'
import { useOrders } from '../context/OrdersContext'
import { ORDER_STATUS, STATUS_FLOW } from '../data/categories'
import { formatPrice } from '../utils/productUtils'

export default function OrderTracking() {
  const { getOrderByTracking } = useOrders()
  const [code, setCode] = useState('')
  const [order, setOrder] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const found = getOrderByTracking(code.trim())
    setOrder(found ?? null)
    setNotFound(!found)
  }

  const currentStep = order ? STATUS_FLOW.indexOf(order.status) : -1

  return (
    <StoreLayout>
      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-teal text-sm mb-6"><ArrowLeft className="w-4 h-4" /> Inicio</Link>
        <h1 className="text-2xl font-bold text-deep mb-2 flex items-center gap-2"><Package className="w-6 h-6 text-forest" /> Rastrear pedido</h1>
        <p className="text-teal text-sm mb-6">Ingresa tu código de rastreo (ej: VF-XXXXXXXX)</p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input type="text" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Código de rastreo" className="flex-1 px-4 py-3 rounded-xl border border-sage/40 uppercase focus:outline-none focus:ring-2 focus:ring-teal/50" />
          <button type="submit" className="px-5 py-3 rounded-xl bg-forest text-mint font-semibold flex items-center gap-2"><Search className="w-4 h-4" /> Buscar</button>
        </form>

        {notFound && <p className="text-red-500 text-center py-4">No se encontró un pedido con ese código</p>}

        {order && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sage/30 p-6 space-y-6 animate-fade-up">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-mono text-forest font-bold">{order.trackingCode}</p>
                <p className="text-sm text-teal">Pedido #{order.id}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${ORDER_STATUS[order.status]?.color ?? ''}`}>
                {ORDER_STATUS[order.status]?.label ?? order.status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              {STATUS_FLOW.map((step, i) => (
                <div key={step} className="flex flex-col items-center flex-1 relative">
                  {i > 0 && <div className={`absolute top-3 -left-1/2 w-full h-0.5 ${i <= currentStep ? 'bg-forest' : 'bg-sage/30'}`} style={{ width: '100%', left: '-50%' }} />}
                  <div className={`w-6 h-6 rounded-full z-10 ${i <= currentStep ? 'bg-forest' : 'bg-sage/30'}`} />
                  <span className="text-[10px] text-teal mt-1 text-center leading-tight">{ORDER_STATUS[step]?.label.split(' ')[0]}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-sage/20 pt-4">
              <p className="text-sm text-teal">Total: <strong className="text-forest">{formatPrice(order.total)}</strong></p>
              <p className="text-sm text-teal mt-1">{order.items?.length} producto(s) en el pedido</p>
            </div>
          </div>
        )}
      </div>
    </StoreLayout>
  )
}

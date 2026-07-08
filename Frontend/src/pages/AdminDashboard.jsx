import { useState, useMemo } from 'react'
import Swal from 'sweetalert2'
import {
  DollarSign, Clock, AlertTriangle, Pencil, Trash2, Package,
  ClipboardList, Mail, Send, Users, Tag, ChevronRight, Archive,
  LayoutGrid, List, ChevronLeft, Percent, Eye,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import FloatingBackground from '../components/FloatingBackground'
import { useProducts } from '../context/ProductsContext'
import { useOrders } from '../context/OrdersContext'
import { useSubscribers } from '../context/SubscribersContext'
import { useUsers } from '../context/UsersContext'
import { usePromo } from '../context/PromoContext'
import { ORDER_STATUS, STATUS_FLOW } from '../data/categories'
import { formatPrice, paginate, getEffectivePrice } from '../utils/productUtils'
import { confirmChange, buildChangeHtml } from '../utils/confirmDialog'

export default function AdminDashboard() {
  const { products, updateProduct, deleteProduct, setProductSale, lowStockCount } = useProducts()
  const { orders, pendingCount, todaySales, updateOrderStatus, archiveOrder } = useOrders()
  const { subscribers, sendPromoCampaign } = useSubscribers()
  const { users } = useUsers()
  const { promoCodes, generateCode, toggleCode } = usePromo()

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', price: '', stock: '' })
  const [saleForm, setSaleForm] = useState({ id: null, salePrice: '' })
  const [promoSubject, setPromoSubject] = useState('¡Ofertas en Variedades Fatima!')
  const [promoMessage, setPromoMessage] = useState('Descuentos especiales esta semana.')
  const [newPromoDiscount, setNewPromoDiscount] = useState(10)
  const [invPage, setInvPage] = useState(1)
  const [invPerPage, setInvPerPage] = useState(15)
  const [invView, setInvView] = useState('grid')

  const formatTime = (iso) => new Date(iso).toLocaleString('es-GT', { dateStyle: 'short', timeStyle: 'short' })

  const invPaginated = useMemo(() => paginate(products, invPage, invPerPage), [products, invPage, invPerPage])

  const saveEdit = async (id, original) => {
    const changes = []
    if (editForm.name !== original.name) changes.push({ label: 'Nombre', before: original.name, after: editForm.name })
    if (parseFloat(editForm.price) !== original.price) changes.push({ label: 'Precio', before: formatPrice(original.price), after: formatPrice(parseFloat(editForm.price)) })
    if (parseInt(editForm.stock, 10) !== original.stock) changes.push({ label: 'Stock', before: original.stock, after: editForm.stock })

    const ok = await confirmChange({ title: '¿Confirmar cambios?', html: buildChangeHtml(changes) })
    if (!ok) return

    updateProduct(id, { name: editForm.name, price: parseFloat(editForm.price) || 0, stock: parseInt(editForm.stock, 10) || 0 })
    setEditingId(null)
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000, background: '#f8fffd' })
  }

  const handleDelete = async (product) => {
    const ok = await confirmChange({
      title: '¿Eliminar producto?',
      html: `<p style="color:#67998C;">Se eliminará <strong>${product.name}</strong> del catálogo permanentemente.</p>`,
      confirmText: 'Sí, eliminar',
    })
    if (ok) deleteProduct(product.id)
  }

  const handleSetSale = async (product) => {
    const salePrice = parseFloat(saleForm.salePrice)
    if (!salePrice || salePrice >= product.price) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Precio oferta debe ser menor al normal', showConfirmButton: false, timer: 2500, background: '#f8fffd' })
      return
    }
    const ok = await confirmChange({
      title: '¿Activar oferta?',
      html: buildChangeHtml([
        { label: 'Producto', before: product.name, after: product.name },
        { label: 'Precio', before: formatPrice(product.price), after: formatPrice(salePrice) },
      ]),
    })
    if (ok) {
      setProductSale(product.id, true, salePrice)
      setSaleForm({ id: null, salePrice: '' })
    }
  }

  const handleRemoveSale = async (product) => {
    const ok = await confirmChange({ title: '¿Quitar oferta?', html: `<p>Se restaurará el precio <strong>${formatPrice(product.price)}</strong></p>` })
    if (ok) setProductSale(product.id, false, null)
  }

  const advanceStatus = async (order) => {
    const idx = STATUS_FLOW.indexOf(order.status)
    if (idx < 0 || idx >= STATUS_FLOW.length - 1) return
    const next = STATUS_FLOW[idx + 1]
    const ok = await confirmChange({
      title: '¿Avanzar estado?',
      html: buildChangeHtml([{ label: 'Estado', before: ORDER_STATUS[order.status]?.label, after: ORDER_STATUS[next]?.label }]),
    })
    if (ok) updateOrderStatus(order.id, next)
  }

  const handleArchive = async (order) => {
    const ok = await confirmChange({ title: '¿Archivar pedido?', html: `<p>Pedido <strong>#${order.id}</strong> se moverá al archivo.</p>` })
    if (ok) { archiveOrder(order.id); setSelectedOrder(null) }
  }

  const handleSendPromo = () => {
    const allEmails = [...subscribers.map((s) => s.email), ...users.map((u) => u.email)]
    Swal.fire({ title: 'Campaña enviada (demo)', html: `<p>Simulado a ${allEmails.length} contactos</p>`, icon: 'success', confirmButtonColor: '#306658', background: '#f8fffd' })
    sendPromoCampaign(promoSubject, promoMessage)
  }

  const metrics = [
    { label: 'Ventas de Hoy', value: formatPrice(todaySales), icon: DollarSign, bg: 'bg-mint/30' },
    { label: 'Órdenes Activas', value: String(pendingCount), icon: Clock, bg: 'bg-sage/30' },
    { label: 'Bajo Stock', value: String(lowStockCount), icon: AlertTriangle, bg: 'bg-mint/20' },
  ]

  return (
    <div className="min-h-screen relative">
      <FloatingBackground />
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-8"><h1 className="text-3xl font-bold text-deep">Panel de Control</h1></header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {metrics.map((m) => (
            <div key={m.label} className={`${m.bg} rounded-2xl p-5 border border-sage/30`}>
              <p className="text-teal text-sm">{m.label}</p>
              <p className="text-2xl font-extrabold text-deep">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Pedidos */}
        <section className="bg-white/80 rounded-2xl border border-sage/30 mb-10 overflow-hidden">
          <div className="px-5 py-4 border-b border-sage/20 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-forest" />
            <h2 className="font-bold text-deep">Pedidos</h2>
            <span className="ml-auto text-sm text-teal">{orders.length}</span>
          </div>
          {orders.length === 0 ? (
            <p className="text-center py-8 text-teal text-sm">Sin pedidos aún</p>
          ) : (
            <div className="divide-y divide-sage/15">
              {orders.map((order) => (
                <button key={order.id} type="button" onClick={() => setSelectedOrder(order)} className="w-full px-5 py-4 flex items-center justify-between hover:bg-mint/10 text-left">
                  <div>
                    <span className="font-bold text-deep">Pedido #{order.id}</span>
                    <span className="text-xs text-sage ml-2">{formatTime(order.createdAt)}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${ORDER_STATUS[order.status]?.color}`}>{ORDER_STATUS[order.status]?.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-forest">{formatPrice(order.total)}</span>
                    <span className="text-xs text-teal">{order.items?.length} productos</span>
                    <ChevronRight className="w-4 h-4 text-sage" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Detalle pedido modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-deep/50" onClick={() => setSelectedOrder(null)} aria-hidden="true" />
            <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-deep mb-1">Pedido #{selectedOrder.id}</h3>
              <p className="font-mono text-sm text-forest mb-4">{selectedOrder.trackingCode}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${ORDER_STATUS[selectedOrder.status]?.color}`}>{ORDER_STATUS[selectedOrder.status]?.label}</span>

              <div className="mt-4 p-3 rounded-xl bg-mint/10 text-sm space-y-1">
                <p><strong>Cliente:</strong> {selectedOrder.customer?.nombre} ({selectedOrder.customer?.type === 'user' ? 'Registrado' : 'Invitado'})</p>
                <p><strong>Email:</strong> {selectedOrder.customer?.email}</p>
                <p><strong>Teléfono:</strong> {selectedOrder.customer?.telefono}</p>
                <p><strong>Dirección:</strong> {selectedOrder.shippingInfo?.direccion}, {selectedOrder.shippingInfo?.ciudad}</p>
                <p><strong>Pago:</strong> {selectedOrder.payment?.method}</p>
              </div>

              <h4 className="font-semibold text-deep mt-4 mb-2">Productos solicitados</h4>
              <ul className="space-y-2">
                {selectedOrder.items?.map((item) => (
                  <li key={item.id} className="flex gap-2 text-sm">
                    <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span className="flex-1">{item.name} × {item.quantity}</span>
                    <span className="font-semibold text-forest">{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-right font-bold text-deep mt-3">Total: {formatPrice(selectedOrder.total)}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {STATUS_FLOW.indexOf(selectedOrder.status) < STATUS_FLOW.length - 1 && (
                  <button type="button" onClick={() => advanceStatus(selectedOrder)} className="px-4 py-2 rounded-xl bg-forest text-mint text-sm font-semibold">Avanzar estado</button>
                )}
                {selectedOrder.status === 'delivered' && (
                  <button type="button" onClick={() => handleArchive(selectedOrder)} className="px-4 py-2 rounded-xl border border-sage/40 text-teal text-sm flex items-center gap-1"><Archive className="w-4 h-4" /> Archivar</button>
                )}
                <button type="button" onClick={() => setSelectedOrder(null)} className="px-4 py-2 rounded-xl bg-sage/20 text-teal text-sm">Cerrar</button>
              </div>
            </div>
          </div>
        )}

        {/* Usuarios + Promo codes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <section className="bg-white/80 rounded-2xl border border-sage/30 p-5">
            <h2 className="font-bold text-deep flex items-center gap-2 mb-4"><Users className="w-5 h-5" /> Usuarios registrados</h2>
            {users.length === 0 ? <p className="text-sm text-teal">Sin usuarios</p> : (
              <ul className="space-y-2 max-h-48 overflow-y-auto text-sm">
                {users.map((u) => (
                  <li key={u.id} className="flex justify-between p-2 rounded-lg bg-mint/10">
                    <span className="text-deep font-medium">{u.nombre} {u.apellido}</span>
                    <span className="text-teal truncate ml-2">{u.email} · {u.telefono}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="bg-white/80 rounded-2xl border border-sage/30 p-5">
            <h2 className="font-bold text-deep flex items-center gap-2 mb-4"><Tag className="w-5 h-5" /> Códigos promocionales</h2>
            <div className="flex gap-2 mb-3">
              <input type="number" value={newPromoDiscount} onChange={(e) => setNewPromoDiscount(Number(e.target.value))} className="w-20 px-2 py-2 rounded-lg border border-sage/40 text-sm" min={5} max={50} />
              <span className="self-center text-teal text-sm">% desc.</span>
              <button type="button" onClick={() => { const c = generateCode(newPromoDiscount); Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `Código: ${c.code}`, showConfirmButton: false, timer: 3000, background: '#f8fffd' }) }} className="px-4 py-2 rounded-xl bg-forest text-mint text-sm font-semibold flex items-center gap-1"><Percent className="w-4 h-4" /> Generar</button>
            </div>
            <ul className="space-y-1 max-h-32 overflow-y-auto text-sm">
              {promoCodes.map((p) => (
                <li key={p.id} className="flex justify-between items-center p-2 rounded-lg bg-mint/10">
                  <span className="font-mono font-bold text-forest">{p.code}</span>
                  <span className="text-teal">-{p.discount}% · {p.uses} usos</span>
                  <button type="button" onClick={() => toggleCode(p.id)} className={`text-xs px-2 py-0.5 rounded ${p.active ? 'bg-forest text-mint' : 'bg-sage/30 text-sage'}`}>{p.active ? 'Activo' : 'Off'}</button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Suscriptores */}
        <section className="bg-white/80 rounded-2xl border border-sage/30 p-5 mb-10">
          <h2 className="font-bold text-deep flex items-center gap-2 mb-4"><Mail className="w-5 h-5" /> Marketing ({subscribers.length + users.length} contactos)</h2>
          <textarea value={promoMessage} onChange={(e) => setPromoMessage(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-xl border border-sage/40 text-sm mb-2" />
          <button type="button" onClick={handleSendPromo} className="px-5 py-2 rounded-xl bg-forest text-mint text-sm font-semibold flex items-center gap-2"><Send className="w-4 h-4" /> Enviar campaña demo</button>
        </section>

        {/* Inventario paginado */}
        <section className="bg-white/80 rounded-2xl border border-sage/30 overflow-hidden">
          <div className="px-5 py-4 border-b border-sage/20 flex flex-wrap items-center gap-3">
            <Package className="w-5 h-5 text-forest" />
            <h2 className="font-bold text-deep">Inventario</h2>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex rounded-lg border border-sage/40 overflow-hidden">
                <button type="button" onClick={() => setInvView('grid')} className={`p-1.5 ${invView === 'grid' ? 'bg-mint/40' : ''}`}><LayoutGrid className="w-4 h-4" /></button>
                <button type="button" onClick={() => setInvView('list')} className={`p-1.5 ${invView === 'list' ? 'bg-mint/40' : ''}`}><List className="w-4 h-4" /></button>
              </div>
              <select value={invPerPage} onChange={(e) => { setInvPerPage(Number(e.target.value)); setInvPage(1) }} className="px-2 py-1 rounded-lg border border-sage/40 text-sm">
                <option value={15}>15</option><option value={25}>25</option><option value={30}>30</option>
              </select>
            </div>
          </div>
          <div className="p-4">
            {invView === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {invPaginated.items.map((p) => (
                  <div key={p.id} className="border border-sage/20 rounded-xl p-3 text-sm">
                    <img src={p.image} alt="" className="w-full aspect-square object-cover rounded-lg mb-2" />
                    <p className="font-medium text-deep line-clamp-2 text-xs">{p.name}</p>
                    <p className="text-forest font-bold">{formatPrice(getEffectivePrice(p))}</p>
                    {p.onSale && <span className="text-xs text-red-500 line-through">{formatPrice(p.price)}</span>}
                    <p className="text-xs text-teal">Stock: {p.stock}</p>
                    <div className="flex gap-1 mt-2">
                      <button type="button" onClick={() => { setEditingId(p.id); setEditForm({ name: p.name, price: String(p.price), stock: String(p.stock) }) }} className="p-1 rounded hover:bg-mint/30"><Pencil className="w-3 h-3" /></button>
                      {p.onSale ? (
                        <button type="button" onClick={() => handleRemoveSale(p)} className="text-[10px] px-1 rounded bg-red-100 text-red-600">Quitar off</button>
                      ) : (
                        <button type="button" onClick={() => setSaleForm({ id: p.id, salePrice: String(p.price * 0.85) })} className="text-[10px] px-1 rounded bg-mint/40 text-forest">Oferta</button>
                      )}
                    </div>
                    {saleForm.id === p.id && (
                      <div className="mt-2 flex gap-1">
                        <input type="number" step="0.01" value={saleForm.salePrice} onChange={(e) => setSaleForm({ ...saleForm, salePrice: e.target.value })} className="w-full px-1 py-0.5 rounded border text-xs" />
                        <button type="button" onClick={() => handleSetSale(p)} className="text-xs bg-forest text-mint px-1 rounded">OK</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead><tr className="text-teal border-b"><th className="py-2">Producto</th><th>Precio</th><th>Stock</th><th>Oferta</th><th></th></tr></thead>
                <tbody>
                  {invPaginated.items.map((p) => (
                    <tr key={p.id} className="border-b border-sage/10">
                      <td className="py-2">{editingId === p.id ? <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-1 border rounded text-xs" /> : p.name}</td>
                      <td>{editingId === p.id ? <input value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} className="w-16 px-1 border rounded text-xs" /> : formatPrice(getEffectivePrice(p))}</td>
                      <td>{editingId === p.id ? <input value={editForm.stock} onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })} className="w-12 px-1 border rounded text-xs" /> : p.stock}</td>
                      <td>{p.onSale ? `-${Math.round((1 - p.salePrice / p.price) * 100)}%` : '—'}</td>
                      <td className="text-right">
                        {editingId === p.id ? (
                          <button type="button" onClick={() => saveEdit(p.id, p)} className="text-xs text-forest font-bold">Guardar</button>
                        ) : (
                          <button type="button" onClick={() => { setEditingId(p.id); setEditForm({ name: p.name, price: String(p.price), stock: String(p.stock) }) }}><Pencil className="w-3 h-3 inline" /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {invPaginated.totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-4">
                <button type="button" disabled={invPage === 1} onClick={() => setInvPage((p) => p - 1)} className="flex items-center gap-1 px-3 py-1 rounded-lg border text-sm disabled:opacity-40"><ChevronLeft className="w-4 h-4" /> Anterior</button>
                <span className="text-sm text-teal self-center">{invPage}/{invPaginated.totalPages}</span>
                <button type="button" disabled={invPage === invPaginated.totalPages} onClick={() => setInvPage((p) => p + 1)} className="flex items-center gap-1 px-3 py-1 rounded-lg border text-sm disabled:opacity-40">Siguiente <ChevronRight className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export const WHATSAPP_NUMBER = '50258570841'

export function buildWhatsAppMessage(order) {
  const items = order.items.map((i) => `- ${i.name} x${i.quantity} = Q${(i.price * i.quantity).toFixed(2)}`).join('\n')

  return [
    '*NUEVO PEDIDO - Variedades Fatima*',
    '',
    '*Cliente:*',
    `  ${order.customer.nombre}`,
    `  Tel: ${order.customer.telefono}`,
    `  ${order.customer.email}`,
    '',
    '*Direccion:*',
    `  ${order.shippingInfo.direccion}, ${order.shippingInfo.ciudad}`,
    order.shippingInfo.referencia ? `  Ref: ${order.shippingInfo.referencia}` : '',
    '',
    '*Productos:*',
    items,
    '',
    '*Pago:* ' + (order.payment?.method === 'efectivo' ? 'Efectivo contra entrega' : 'Transferencia bancaria'),
    '',
    '*Total: Q' + order.total.toFixed(2) + '*',
    '*Envio:* ' + (order.shippingInfo.method === 'domicilio' ? 'A domicilio' : 'Recoger en tienda'),
    '',
    order.promoCode ? '*Promo:* ' + order.promoCode : '',
    '',
    'ID: #' + order.id,
  ]
    .filter(Boolean)
    .join('\n')
}

export function openWhatsApp(message) {
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
}

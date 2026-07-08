/**
 * Google Apps Script — Webhook para Variedades Fatima
 *
 * 1. Abre https://script.google.com/ y crea un nuevo proyecto
 * 2. Copia este código
 * 3. Reemplaza SPREADSHEET_ID con el ID de tu hoja de Google Sheets
 * 4. Ve a "Implementar" → "Nueva implementación" → "Aplicación web"
 * 5. Ejecutar como: "Yo", Acceso: "Cualquier persona"
 * 6. Copia la URL generada y pégala en el .env del frontend
 */

const SPREADSHEET_ID = 'AQUI_VA_EL_ID_DE_TU_HOJA'

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID)
    const sheet = ss.getSheetByName('Pedidos') || ss.insertSheet('Pedidos')

    // Encabezados si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Fecha', 'ID Pedido', 'Cliente', 'Teléfono', 'Email',
        'Dirección', 'Ciudad', 'Método Envío', 'Método Pago',
        'Productos', 'Subtotal', 'Envío', 'Descuento', 'Total',
      ])
    }

    const productos = data.items.map(i => `${i.name} x${i.quantity} (Q${i.price})`).join(', ')

    sheet.appendRow([
      new Date().toLocaleString('es-GT'),
      `#${data.id}`,
      data.customer?.nombre || '',
      data.customer?.telefono || '',
      data.customer?.email || '',
      data.shippingInfo?.direccion || '',
      data.shippingInfo?.ciudad || '',
      data.shippingInfo?.method === 'domicilio' ? 'A domicilio' : 'Recoger',
      data.payment?.method || '',
      productos,
      data.subtotal || 0,
      data.shipping || 0,
      data.discount || 0,
      data.total || 0,
    ])

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

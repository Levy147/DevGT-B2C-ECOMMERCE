export const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || ''

export async function sendOrderToSheets(order) {
  if (!SHEETS_WEBHOOK_URL) {
    console.warn('Google Sheets webhook no configurado. VITE_SHEETS_WEBHOOK_URL no está definido.')
    return false
  }
  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
    return true
  } catch {
    console.warn('Error al enviar a Google Sheets')
    return false
  }
}

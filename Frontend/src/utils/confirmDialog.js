import Swal from 'sweetalert2'

export async function confirmChange({ title, html, confirmText = 'Confirmar' }) {
  const result = await Swal.fire({
    title,
    html,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#306658',
    cancelButtonColor: '#B1CCC5',
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar',
    background: '#f8fffd',
  })
  return result.isConfirmed
}

export function buildChangeHtml(changes) {
  return `
    <p style="color:#67998C;margin-bottom:12px;">¿Está seguro de aplicar estos cambios?</p>
    <ul style="text-align:left;list-style:none;padding:0;">
      ${changes.map((c) => `<li style="margin:6px 0;color:#306658;">${c.label}: <strong>${c.before}</strong> → <strong style="color:#0E332A;">${c.after}</strong></li>`).join('')}
    </ul>
  `
}

// ─────────────────────────────────────────────
// HELPER DE WHATSAPP — La Piedra Esmeraldas
// ─────────────────────────────────────────────

/**
 * Genera el link de WhatsApp para un lote específico.
 * El mensaje viene pre-llenado con el nombre y precio del lote.
 */
export function buildWhatsAppUrl(
  phone: string,
  loteNombre: string,
  precio: string
): string {
  const text = encodeURIComponent(
    `Hola, me interesa el lote "${loteNombre}" (${precio}). ¿Está disponible?`
  )
  return `https://wa.me/${phone}?text=${text}`
}

/**
 * Genera el link de WhatsApp general para consultas de asesoría.
 */
export function buildGeneralWhatsAppUrl(phone: string): string {
  const text = encodeURIComponent(
    'Hola, me gustaría recibir asesoría sobre esmeraldas colombianas de origen Muzo.'
  )
  return `https://wa.me/${phone}?text=${text}`
}

/**
 * Formatea un número de teléfono colombiano para mostrarlo.
 * Ej: "573216362443" → "+57 321 636 2443"
 */
export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('57') && digits.length === 12) {
    const local = digits.slice(2)
    return `+57 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
  }
  return `+${digits}`
}

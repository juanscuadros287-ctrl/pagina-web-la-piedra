// ─────────────────────────────────────────────
// ANALYTICS — Meta Pixel + Google Analytics 4
// ─────────────────────────────────────────────
// Los IDs se configuran en data/config.json → pixelId y gaId
// Si están vacíos, todas las funciones son no-ops (no hace nada)

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Dispara un evento de Meta Pixel */
export function firePixelEvent(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', event, params)
  }
}

/** Dispara un evento de Google Analytics 4 */
export function fireGAEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

/** Rastrea un click de WhatsApp (lote específico o general) */
export function trackWhatsAppClick(loteNombre?: string) {
  const label = loteNombre ?? 'general'
  firePixelEvent('Contact', { content_name: label })
  fireGAEvent('whatsapp_click', { lote: label, event_category: 'engagement' })
}

/** Rastrea una vista de lote (cuando se abre el modal) */
export function trackLoteView(loteId: string, loteNombre: string) {
  firePixelEvent('ViewContent', { content_ids: [loteId], content_name: loteNombre })
  fireGAEvent('view_item', { item_id: loteId, item_name: loteNombre })
}

/** Rastrea envío del formulario de contacto */
export function trackFormSubmit() {
  firePixelEvent('Lead', { content_name: 'contact_form' })
  fireGAEvent('generate_lead', { method: 'contact_form' })
}

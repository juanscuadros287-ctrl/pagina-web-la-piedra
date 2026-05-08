// ─────────────────────────────────────────────
// GOOGLE SHEETS VÍA APPS SCRIPT
// ─────────────────────────────────────────────
// Para configurar: crea un Google Sheet, agrega el Apps Script
// que está en COMO-ACTUALIZAR.md, publica como web app,
// y pega el URL en data/config.json → "sheetsUrl"

export interface ContactFormData {
  nombre: string
  email: string
  telefono: string
  mensaje: string
  sheetsUrl: string
}

export interface SubmitResult {
  ok: boolean
  error?: string
}

/**
 * Envía los datos del formulario al Google Sheet vía Apps Script.
 * Si sheetsUrl está vacío, retorna error controlado.
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<SubmitResult> {
  if (!data.sheetsUrl) {
    // En desarrollo o cuando no está configurado, simular éxito
    console.log('[Formulario] sheetsUrl no configurado. Datos:', data)
    return { ok: true }
  }

  try {
    const res = await fetch(data.sheetsUrl, {
      method: 'POST',
      // Apps Script requiere text/plain para evitar preflight CORS
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono || '',
        mensaje: data.mensaje,
        fecha: new Date().toISOString(),
      }),
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    return { ok: true }
  } catch (err) {
    console.error('[Formulario] Error al enviar:', err)
    return {
      ok: false,
      error: 'No pudimos enviar tu mensaje. Por favor escríbenos directamente por WhatsApp.',
    }
  }
}

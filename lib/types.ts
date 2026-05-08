// ─────────────────────────────────────────────
// TIPOS COMPARTIDOS — La Piedra Esmeraldas
// ─────────────────────────────────────────────

export interface Lote {
  id: string
  nombre: string
  rango: string           // rango de precio ej: "150000"
  precioMostrado: string  // precio formateado ej: "$150.000 COP"
  descripcion: string
  imagenes: string[]      // rutas desde /public, ej: ["/images/lotes/lote-001-a.jpg"]
  disponible: boolean
  destacado: boolean
  quilates?: string       // ej: "2.5 ct"
  color?: string          // ej: "Verde intenso"
  origen?: string         // siempre "Muzo, Boyacá"
  categoria?: 'Genesis' | 'Dual' | 'Elite' | 'Otros' | string
}

export interface Testimonio {
  id: string
  nombre: string
  negocio: string         // tipo de negocio: "Joyería" | "Reventa" | "Coleccionista"
  cita: string
  avatar?: string         // ruta a imagen, opcional
  ciudad?: string
}

export interface SiteConfig {
  whatsapp: string        // formato internacional: "573216362443"
  email: string
  phase: 1 | 2
  pixelId: string         // Meta Pixel ID, vacío si no configurado
  gaId: string            // GA4 ID, vacío si no configurado
  sheetsUrl: string       // URL del web app de Apps Script, vacío si no configurado
  social: {
    instagram: string
    tiktok: string
    facebook: string
  }
  siteUrl: string
  brandName: string
  tagline: string
}

export interface BlogPost {
  slug: string
  titulo: string
  resumen: string
  fecha: string
  imagen?: string
  categoria?: string
}

// Para el carrito (Fase 2 — no usado en Fase 1)
export interface CartItem {
  lote: Lote
  quantity: 1 // siempre 1 por lote
}

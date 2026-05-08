// ─────────────────────────────────────────────
// POLÍTICA DE PRIVACIDAD — FASE 2
// Esta página es 404 mientras phase === 1
// ─────────────────────────────────────────────
import { notFound } from 'next/navigation'
import config from '@/data/config.json'

export default function PrivacidadPage() {
  if (config.phase === 1) {
    notFound()
  }

  // TODO Fase 2: Agregar política de privacidad completa
  return (
    <div className="min-h-screen pt-24 max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-playfair text-4xl text-muzo-marfil mb-8">
        Política de privacidad
      </h1>
      <p className="text-muzo-marfil/60 font-inter">
        Contenido de privacidad — Fase 2 (próximamente)
      </p>
    </div>
  )
}

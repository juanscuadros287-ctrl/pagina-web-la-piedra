// ─────────────────────────────────────────────
// TÉRMINOS Y CONDICIONES — FASE 2
// Esta página es 404 mientras phase === 1
// ─────────────────────────────────────────────
import { notFound } from 'next/navigation'
import config from '@/data/config.json'

export default function TerminosPage() {
  if (config.phase === 1) {
    notFound()
  }

  // TODO Fase 2: Agregar términos y condiciones completos
  return (
    <div className="min-h-screen pt-24 max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-playfair text-4xl text-muzo-marfil mb-8">
        Términos y condiciones
      </h1>
      <p className="text-muzo-marfil/60 font-inter">
        Contenido de términos — Fase 2 (próximamente)
      </p>
    </div>
  )
}

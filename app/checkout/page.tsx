// ─────────────────────────────────────────────
// CHECKOUT — FASE 2
// Esta página es 404 mientras phase === 1
// Cuando se active Fase 2, aquí va el checkout con Wompi
// ─────────────────────────────────────────────
import { notFound } from 'next/navigation'
import config from '@/data/config.json'

export default function CheckoutPage() {
  if (config.phase === 1) {
    notFound()
  }

  // TODO Fase 2: Implementar checkout con Wompi o MercadoPago
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <p className="text-muzo-marfil font-playfair text-2xl">
        Checkout — Fase 2 (próximamente)
      </p>
    </div>
  )
}

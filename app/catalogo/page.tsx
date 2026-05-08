import type { Metadata } from 'next'
import CatalogGrid from '@/components/sections/CatalogGrid'
import config from '@/data/config.json'
import lotesData from '@/data/lotes.json'
import type { SiteConfig, Lote } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Catálogo de Esmeraldas',
  description:
    'Explora nuestro catálogo de lotes de esmeraldas colombianas de origen Muzo. Precios desde $75.000 COP. Asesoría personalizada incluida.',
}

export default function CatalogoPage() {
  const siteConfig = config as SiteConfig
  const lotes = lotesData as Lote[]

  return (
    <div className="min-h-screen pt-24">
      {/* Header de página */}
      <div className="py-16 md:py-24 text-center border-b border-muzo-dorado/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-inter font-semibold tracking-[0.3em] uppercase text-muzo-dorado mb-4">
            Disponible ahora
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl text-muzo-marfil mb-4">
            Catálogo de lotes
          </h1>
          <p className="text-muzo-marfil/50 font-inter text-lg max-w-xl mx-auto">
            Cada lote seleccionado a mano en Muzo, Boyacá. Haz click en cualquier
            lote para ver detalles, fotos y consultar por WhatsApp.
          </p>
        </div>
      </div>

      {/* Catálogo completo con filtros */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <CatalogGrid
            lotes={lotes}
            config={siteConfig}
            showFilters
          />
        </div>
      </section>
    </div>
  )
}

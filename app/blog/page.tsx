import type { Metadata } from 'next'
import BlogPreview from '@/components/sections/BlogPreview'

export const metadata: Metadata = {
  title: 'Blog — Aprende sobre Esmeraldas',
  description:
    'Artículos educativos sobre esmeraldas colombianas: cómo identificarlas, historia de Muzo, guías para joyeros y revendedores.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="py-16 md:py-24 text-center border-b border-muzo-dorado/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-inter font-semibold tracking-[0.3em] uppercase text-muzo-dorado mb-4">
            Educación
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl text-muzo-marfil mb-4">
            Aprende sobre esmeraldas
          </h1>
          <p className="text-muzo-marfil/50 font-inter text-lg max-w-xl mx-auto">
            Guías, historias e información técnica para que tomes mejores decisiones
            al comprar, vender o coleccionar esmeraldas colombianas.
          </p>

          {/* Aviso de construcción */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-muzo-dorado/30 bg-muzo-dorado/5">
            <span className="w-2 h-2 rounded-full bg-muzo-dorado animate-pulse" />
            <span className="text-sm text-muzo-dorado/80 font-inter">
              Blog en construcción — primeros artículos próximamente
            </span>
          </div>
        </div>
      </div>

      {/* Preview */}
      <BlogPreview />
    </div>
  )
}

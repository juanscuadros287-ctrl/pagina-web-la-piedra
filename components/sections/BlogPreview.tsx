'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const posts = [
  {
    slug: 'como-reconocer-esmeralda-muzo',
    categoria: 'Educación',
    titulo: 'Cómo reconocer una esmeralda Muzo auténtica',
    resumen:
      'El efecto gota de aceite, el color cálido y el jardín de inclusiones fluidas son las claves para identificar una Muzo legítima. Te explicamos cada una.',
    fecha: 'Próximamente',
  },
  {
    slug: 'guia-primer-lote-joyeros',
    categoria: 'Guía',
    titulo: 'Guía para joyeros: seleccionando tu primer lote de esmeraldas',
    resumen:
      'Antes de comprar, debes entender tamaño, transparencia, color y tratamientos. Esta guía te da el mapa completo para decidir bien.',
    fecha: 'Próximamente',
  },
  {
    slug: 'historia-mineria-muzo-boyaca',
    categoria: 'Historia',
    titulo: 'Historia de la minería en Muzo, Boyacá',
    resumen:
      'Desde los muiscas hasta hoy: cómo Muzo se convirtió en la capital mundial de la esmeralda y qué hace único su ecosistema geológico.',
    fecha: 'Próximamente',
  },
]

export default function BlogPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-inter font-semibold tracking-[0.3em] uppercase text-muzo-dorado mb-4"
            >
              Blog educativo
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="font-playfair text-4xl text-muzo-marfil heading-accent"
            >
              Aprende sobre esmeraldas
            </motion.h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-inter text-muzo-dorado/70 hover:text-muzo-dorado transition-colors duration-200"
          >
            Ver todos los artículos <ArrowRight size={14} />
          </Link>
        </div>

        {/* Divider */}
        <div className="divider-gold mb-12" />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(({ slug, categoria, titulo, resumen, fecha }, i) => (
            <motion.article
              key={slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="oil-drop rounded-sm p-6 flex flex-col gap-4 group"
            >
              {/* Categoría + fecha */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-inter font-semibold tracking-[0.2em] uppercase text-muzo-dorado/70 border border-muzo-dorado/30 px-2 py-0.5 rounded-sm">
                  {categoria}
                </span>
                <span className="text-xs text-muzo-marfil/30 font-inter">{fecha}</span>
              </div>

              {/* Título */}
              <h3 className="font-playfair text-lg text-muzo-marfil leading-snug group-hover:text-muzo-dorado transition-colors duration-200">
                {titulo}
              </h3>

              {/* Resumen */}
              <p className="text-sm text-muzo-marfil/50 font-inter leading-relaxed line-clamp-3 flex-1">
                {resumen}
              </p>

              {/* Divisor */}
              <div className="divider-gold" />

              {/* Link */}
              <div className="flex items-center gap-2 text-xs font-inter text-muzo-marfil/30">
                <span>Próximamente disponible</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

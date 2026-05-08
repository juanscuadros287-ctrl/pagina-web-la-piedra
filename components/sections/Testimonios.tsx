'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { Testimonio } from '@/lib/types'

interface TestimoniosProps {
  testimonios: Testimonio[]
}

function AvatarPlaceholder({ nombre }: { nombre: string }) {
  const initials = nombre
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-playfair font-bold text-white"
      style={{
        background: 'linear-gradient(135deg, #0B6E4F, #C9A961)',
      }}
    >
      {initials}
    </div>
  )
}

export default function Testimonios({ testimonios }: TestimoniosProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-inter font-semibold tracking-[0.3em] uppercase text-muzo-dorado mb-4"
          >
            Lo que dicen nuestros clientes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="font-playfair text-4xl text-muzo-marfil heading-accent centered"
          >
            Emprendedores que confiaron
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonios.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="oil-drop rounded-sm p-8 flex flex-col gap-5 relative"
            >
              {/* Ícono cita */}
              <Quote size={32} className="text-muzo-dorado/20 absolute top-6 right-6" />

              {/* Cita */}
              <p className="font-playfair text-lg italic text-muzo-marfil/75 leading-relaxed relative z-10">
                &ldquo;{t.cita}&rdquo;
              </p>

              {/* Divisor */}
              <div className="divider-gold" />

              {/* Autor */}
              <div className="flex items-center gap-3">
                <AvatarPlaceholder nombre={t.nombre} />
                <div>
                  <p className="text-sm font-inter font-semibold text-muzo-marfil">
                    {t.nombre}
                  </p>
                  <p className="text-xs text-muzo-dorado/70 font-inter">
                    {t.negocio}{t.ciudad ? ` · ${t.ciudad}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

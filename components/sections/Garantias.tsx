'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Gem, MessageCircle } from 'lucide-react'

const garantias = [
  {
    icon: ShieldCheck,
    titulo: 'Origen certificado',
    descripcion:
      'Cada lote viene con carta de origen Muzo, Boyacá. Sabemos de qué mina viene cada piedra que vendemos.',
  },
  {
    icon: Gem,
    titulo: 'Calidad garantizada',
    descripcion:
      'Seleccionamos cada piedra a mano. Lo que ves en foto y video es exactamente lo que recibes — sin sorpresas.',
  },
  {
    icon: MessageCircle,
    titulo: 'Soporte directo',
    descripcion:
      'Antes, durante y después de tu compra. Nuestra asesora está disponible por WhatsApp para resolver todas tus preguntas.',
  },
]

export default function Garantias() {
  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: 'linear-gradient(180deg, rgba(11,110,79,0.06) 0%, transparent 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {garantias.map(({ icon: Icon, titulo, descripcion }, i) => (
            <motion.div
              key={titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-4 oil-drop rounded-sm p-8"
            >
              {/* Ícono */}
              <div className="w-14 h-14 rounded-full border border-muzo-dorado/30 bg-muzo-verde/10 flex items-center justify-center">
                <Icon size={24} className="text-muzo-dorado" />
              </div>

              {/* Texto */}
              <div>
                <h3 className="font-playfair text-xl text-muzo-marfil mb-3">{titulo}</h3>
                <p className="text-sm text-muzo-marfil/55 font-inter leading-relaxed">
                  {descripcion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

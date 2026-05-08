'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Gem, Weight } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import type { Lote, SiteConfig } from '@/lib/types'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'

interface LoteModalProps {
  lote: Lote
  config: SiteConfig
  isOpen: boolean
  onClose: () => void
}

function EmeraldPlaceholderLg() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #064E3B 0%, #0B6E4F 40%, #34D399 70%, #C9A961 100%)',
      }}
    >
      <div
        className="w-32 h-32 rounded-full opacity-70"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6), rgba(52,211,153,0.3) 50%, rgba(6,78,59,0.8))',
          boxShadow: '0 0 50px rgba(52,211,153,0.5), inset 0 4px 12px rgba(255,255,255,0.3)',
        }}
      />
    </div>
  )
}

export default function LoteModal({ lote, config, isOpen, onClose }: LoteModalProps) {
  const [activeImg, setActiveImg] = useState(0)
  const waUrl = buildWhatsAppUrl(config.whatsapp, lote.nombre, lote.precioMostrado)

  function handleWhatsApp() {
    trackWhatsAppClick(lote.nombre)
  }

  const hasRealImages =
    lote.imagenes.length > 0 && !lote.imagenes[0].includes('placeholder')

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

        {/* — Columna izquierda: Galería — */}
        <div className="p-6 flex flex-col gap-3">
          {/* Imagen principal */}
          <div className="relative aspect-square rounded-sm overflow-hidden bg-muzo-negro/50 emerald-glow">
            <AnimatePresence mode="wait">
              {hasRealImages ? (
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={lote.imagenes[activeImg]}
                    alt={`${lote.nombre} — imagen ${activeImg + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              ) : (
                <EmeraldPlaceholderLg />
              )}
            </AnimatePresence>
          </div>

          {/* Miniaturas (si hay múltiples imágenes) */}
          {hasRealImages && lote.imagenes.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {lote.imagenes.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={[
                    'relative w-16 h-16 shrink-0 rounded-sm overflow-hidden transition-all duration-200',
                    i === activeImg
                      ? 'ring-2 ring-muzo-dorado'
                      : 'ring-1 ring-muzo-dorado/20 opacity-60 hover:opacity-100',
                  ].join(' ')}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* — Columna derecha: Info — */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            {/* Categoría y origen */}
            <p className="text-[10px] font-inter font-semibold tracking-[0.25em] uppercase text-muzo-dorado/70 mb-2">
              {lote.categoria ?? 'Esmeralda'} · {lote.origen ?? 'Muzo, Boyacá'}
            </p>

            {/* Nombre */}
            <h2 className="font-playfair text-2xl text-muzo-marfil mb-2 leading-tight">
              {lote.nombre}
            </h2>

            {/* Precio */}
            <p className="font-playfair text-3xl text-muzo-dorado font-bold mb-4">
              {lote.precioMostrado}
            </p>

            {/* Divisor */}
            <div className="divider-gold mb-6" />

            {/* Descripción */}
            <p className="text-sm text-muzo-marfil/65 font-inter leading-relaxed mb-6">
              {lote.descripcion}
            </p>

            {/* Metadatos */}
            <div className="flex flex-col gap-3 mb-6">
              {lote.quilates && (
                <div className="flex items-center gap-3 text-sm">
                  <Weight size={15} className="text-muzo-dorado/60 shrink-0" />
                  <span className="text-muzo-marfil/50 font-inter w-20">Quilates</span>
                  <span className="text-muzo-marfil font-inter font-medium">{lote.quilates}</span>
                </div>
              )}
              {lote.color && (
                <div className="flex items-center gap-3 text-sm">
                  <Gem size={15} className="text-muzo-dorado/60 shrink-0" />
                  <span className="text-muzo-marfil/50 font-inter w-20">Color</span>
                  <span className="text-muzo-marfil font-inter font-medium">{lote.color}</span>
                </div>
              )}
              {lote.origen && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={15} className="text-muzo-dorado/60 shrink-0" />
                  <span className="text-muzo-marfil/50 font-inter w-20">Origen</span>
                  <span className="text-muzo-marfil font-inter font-medium">{lote.origen}</span>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            {lote.disponible ? (
              <Button
                variant="primary"
                size="lg"
                href={waUrl}
                target="_blank"
                onClick={handleWhatsApp}
                className="w-full justify-center"
              >
                Consultar por WhatsApp
              </Button>
            ) : (
              <p className="text-center text-sm text-muzo-marfil/40 font-inter py-3">
                Este lote ya fue vendido
              </p>
            )}

            <p className="text-center text-xs text-muzo-marfil/30 font-inter">
              Te respondemos en menos de 24 horas
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

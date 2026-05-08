'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import LoteModal from './LoteModal'
import type { Lote, SiteConfig } from '@/lib/types'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick, trackLoteView } from '@/lib/analytics'

interface LoteCardProps {
  lote: Lote
  config: SiteConfig
}

// Imagen placeholder generada con CSS (sin depender de imágenes externas)
function EmeraldPlaceholder() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #064E3B 0%, #0B6E4F 40%, #34D399 70%, #C9A961 100%)',
      }}
    >
      <div
        className="w-20 h-20 rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6), rgba(52,211,153,0.3) 50%, rgba(6,78,59,0.8))',
          boxShadow: '0 0 30px rgba(52,211,153,0.4), inset 0 2px 8px rgba(255,255,255,0.3)',
        }}
      />
    </div>
  )
}

export default function LoteCard({ lote, config }: LoteCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const waUrl = buildWhatsAppUrl(config.whatsapp, lote.nombre, lote.precioMostrado)

  function handleWhatsApp() {
    trackWhatsAppClick(lote.nombre)
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }

  function handleOpenModal() {
    trackLoteView(lote.id, lote.nombre)
    setModalOpen(true)
  }

  return (
    <>
      <motion.article
        className="group relative oil-drop rounded-sm overflow-hidden cursor-pointer"
        whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(11,110,79,0.25), 0 8px 20px rgba(0,0,0,0.5)' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleOpenModal}
      >
        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden">
          {lote.imagenes[0] && !lote.imagenes[0].includes('placeholder') ? (
            <Image
              src={lote.imagenes[0]}
              alt={lote.nombre}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <EmeraldPlaceholder />
          )}

          {/* Overlay en hover */}
          <div className="absolute inset-0 bg-muzo-negro/0 group-hover:bg-muzo-negro/20 transition-colors duration-300" />

          {/* Badge Destacado */}
          {lote.destacado && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-muzo-dorado/90 rounded-sm">
              <Star size={10} fill="white" stroke="none" />
              <span className="text-[10px] font-inter font-semibold text-white tracking-wide uppercase">
                Destacado
              </span>
            </div>
          )}

          {/* Badge Disponibilidad */}
          <div
            className={[
              'absolute top-3 right-3 px-2 py-1 rounded-sm text-[10px] font-inter font-semibold tracking-wide uppercase',
              lote.disponible
                ? 'bg-muzo-verde/90 text-white'
                : 'bg-white/10 text-muzo-marfil/50',
            ].join(' ')}
          >
            {lote.disponible ? 'Disponible' : 'Vendido'}
          </div>

          {/* Overlay "Vendido" */}
          {!lote.disponible && (
            <div className="absolute inset-0 bg-muzo-negro/60 flex items-center justify-center">
              <span className="font-playfair text-2xl text-muzo-marfil/40 rotate-[-20deg]">
                Vendido
              </span>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-5">
          {/* Categoría */}
          {lote.categoria && (
            <p className="text-[10px] font-inter font-semibold tracking-[0.2em] uppercase text-muzo-dorado/60 mb-2">
              {lote.categoria} · {lote.origen ?? 'Muzo, Boyacá'}
            </p>
          )}

          {/* Nombre */}
          <h3 className="font-playfair text-lg text-muzo-marfil mb-1 leading-snug">
            {lote.nombre}
          </h3>

          {/* Precio */}
          <p className="text-muzo-dorado font-inter font-semibold text-base mb-3">
            {lote.precioMostrado}
          </p>

          {/* Descripción — 2 líneas máx */}
          <p className="text-sm text-muzo-marfil/50 font-inter leading-relaxed line-clamp-2 mb-4">
            {lote.descripcion}
          </p>

          {/* Divisor */}
          <div className="divider-gold mb-4" />

          {/* CTAs */}
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleOpenModal}
              className="flex-1 text-xs font-inter font-medium text-muzo-marfil/60 hover:text-muzo-marfil border border-muzo-dorado/20 hover:border-muzo-dorado/50 rounded-sm py-2 transition-all duration-200"
            >
              Ver detalles
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={lote.disponible ? handleWhatsApp : undefined}
              disabled={!lote.disponible}
              className="flex-1 text-xs"
            >
              {lote.disponible ? 'Consultar' : 'No disponible'}
            </Button>
          </div>
        </div>
      </motion.article>

      {/* Modal de detalle */}
      <LoteModal
        lote={lote}
        config={config}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

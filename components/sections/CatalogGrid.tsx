'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoteCard from './LoteCard'
import type { Lote, SiteConfig } from '@/lib/types'

interface CatalogGridProps {
  lotes: Lote[]
  config: SiteConfig
  showFilters?: boolean
  featuredOnly?: boolean
}

type CategoryFilter = 'todos' | 'Genesis' | 'Dual' | 'Elite' | 'Otros'

const filters: { value: CategoryFilter; label: string }[] = [
  { value: 'todos',   label: 'Todo' },
  { value: 'Genesis', label: 'Génesis' },
  { value: 'Dual',    label: 'Dual' },
  { value: 'Elite',   label: 'Elite' },
  { value: 'Otros',   label: 'Otros' },
]

const containerVariants = {
  animate: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
}

export default function CatalogGrid({
  lotes,
  config,
  showFilters = true,
  featuredOnly = false,
}: CatalogGridProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('todos')

  const baseLotes = featuredOnly ? lotes.filter((l) => l.destacado) : lotes
  const filtered =
    activeFilter === 'todos'
      ? baseLotes
      : baseLotes.filter((l) => l.categoria === activeFilter)

  return (
    <div className="w-full">
      {/* Filtros */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={[
                'px-5 py-2 rounded-sm text-sm font-inter font-medium tracking-wide',
                'border transition-all duration-200',
                activeFilter === value
                  ? 'bg-muzo-verde border-muzo-verde text-white shadow-[0_0_16px_rgba(11,110,79,0.4)]'
                  : 'bg-transparent border-muzo-dorado/30 text-muzo-marfil/60 hover:border-muzo-dorado/60 hover:text-muzo-marfil',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="font-playfair text-2xl text-muzo-marfil/30 mb-3">
            No hay lotes disponibles en esta categoría
          </p>
          <p className="text-sm text-muzo-marfil/20 font-inter">
            Escríbenos para consultar disponibilidad especial
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((lote) => (
              <motion.div key={lote.id} variants={itemVariants}>
                <LoteCard lote={lote} config={config} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

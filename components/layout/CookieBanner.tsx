'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const COOKIE_KEY = 'lapiedra-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_KEY)
      if (!consent) setVisible(true)
    } catch {
      // localStorage no disponible (modo privado extremo)
    }
  }, [])

  function accept() {
    try { localStorage.setItem(COOKIE_KEY, 'accepted') } catch { /* noop */ }
    setVisible(false)
  }

  function decline() {
    try { localStorage.setItem(COOKIE_KEY, 'declined') } catch { /* noop */ }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-3xl mx-auto oil-drop rounded-sm px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <p className="text-sm text-muzo-marfil/70 font-inter leading-relaxed">
              Usamos cookies de analítica para mejorar tu experiencia.
              No compartimos tu información con terceros.
            </p>
            <div className="flex gap-3 shrink-0">
              <Button variant="ghost" size="sm" onClick={decline}>
                Rechazar
              </Button>
              <Button variant="primary" size="sm" onClick={accept}>
                Aceptar
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

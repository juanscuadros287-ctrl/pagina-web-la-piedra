'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { submitContactForm } from '@/lib/sheets'
import { trackFormSubmit } from '@/lib/analytics'
import type { SiteConfig } from '@/lib/types'

interface ContactoFormProps {
  config: SiteConfig
}

const interesOptions = [
  { value: 'lote-75k', label: 'Lote de $75.000 COP' },
  { value: 'lote-150k', label: 'Lote de $150.000 COP' },
  { value: 'lote-300k', label: 'Lote de $300.000 COP' },
  { value: 'lote-400k', label: 'Lote de $400.000+ COP' },
  { value: 'asesoría', label: 'Solo quiero asesoría' },
  { value: 'otro', label: 'Otro' },
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactoForm({ config }: ContactoFormProps) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [interes, setInteres] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) return

    setStatus('loading')
    const result = await submitContactForm({
      nombre,
      email,
      telefono,
      mensaje: `Interés: ${interes || 'no especificado'}\n\n${mensaje}`,
      sheetsUrl: config.sheetsUrl,
    })

    if (result.ok) {
      setStatus('success')
      trackFormSubmit()
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'Error al enviar')
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="oil-drop rounded-sm p-10 flex flex-col items-center text-center gap-4"
          >
            <CheckCircle size={48} className="text-muzo-cristal" />
            <h3 className="font-playfair text-2xl text-muzo-marfil">
              ¡Mensaje recibido!
            </h3>
            <p className="text-muzo-marfil/60 font-inter text-sm leading-relaxed max-w-sm">
              Te responderemos en menos de 24 horas. También puedes escribirnos
              directamente por WhatsApp si necesitas respuesta más rápida.
            </p>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setStatus('idle')}
            >
              Enviar otro mensaje
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5"
          >
            <Input
              label="Nombre *"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              disabled={status === 'loading'}
            />

            <Input
              label="Email *"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />

            <Input
              label="WhatsApp (opcional)"
              type="tel"
              placeholder="+57 300 000 0000"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              disabled={status === 'loading'}
            />

            <Select
              label="¿Qué te interesa?"
              options={interesOptions}
              placeholder="Selecciona una opción"
              value={interes}
              onChange={(e) => setInteres(e.target.value)}
              disabled={status === 'loading'}
            />

            <Textarea
              label="Mensaje *"
              placeholder="Cuéntanos sobre tu negocio y qué tipo de esmeraldas buscas..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
              rows={5}
              disabled={status === 'loading'}
            />

            {/* Error */}
            {status === 'error' && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-sm">
                <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 font-inter">{errorMsg}</p>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              type="submit"
              loading={status === 'loading'}
              className="w-full justify-center"
            >
              Enviar mensaje
            </Button>

            <p className="text-xs text-muzo-marfil/30 font-inter text-center">
              * Campos obligatorios. Tu información es privada y nunca la compartimos.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

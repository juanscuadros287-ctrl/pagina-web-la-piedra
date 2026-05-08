'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { submitContactForm } from '@/lib/sheets'
import { trackFormSubmit } from '@/lib/analytics'
import type { SiteConfig } from '@/lib/types'

interface AsesoriaFormProps {
  config: SiteConfig
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const negocioOptions = [
  { value: 'joyeria', label: 'Tengo o quiero abrir una joyería' },
  { value: 'reventa', label: 'Quiero revender esmeraldas' },
  { value: 'coleccion', label: 'Soy coleccionista' },
  { value: 'regalo', label: 'Busco un regalo especial' },
  { value: 'otro', label: 'Otro tipo de negocio' },
]

const presupuestoOptions = [
  { value: '150000', label: '$150.000 COP' },
  { value: '300000', label: '$300.000 COP' },
  { value: '400000', label: '$400.000 COP o más' },
  { value: 'no-se',  label: 'No lo tengo claro aún' },
]

/** Construye el mensaje de WhatsApp con todos los datos del formulario */
function buildAsesoriaWhatsAppUrl(
  phone: string,
  nombre: string,
  negocio: string,
  presupuesto: string,
  mensaje: string,
  whatsappContacto: string
): string {
  const negocioLabel = negocioOptions.find((o) => o.value === negocio)?.label ?? negocio
  const presupuestoLabel = presupuestoOptions.find((o) => o.value === presupuesto)?.label ?? presupuesto

  const text = [
    `Hola, estoy interesado/a en recibir asesoría personalizada.`,
    ``,
    `📋 *Mis datos:*`,
    `• Nombre: ${nombre}`,
    `• WhatsApp: ${whatsappContacto}`,
    `• Tipo de negocio: ${negocioLabel}`,
    `• Presupuesto: ${presupuestoLabel}`,
    ``,
    `💬 *Lo que busco:*`,
    mensaje,
  ].join('\n')

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export default function AsesoriaForm({ config }: AsesoriaFormProps) {
  const [nombre, setNombre] = useState('')
  const [whatsappContacto, setWhatsappContacto] = useState('')
  const [negocio, setNegocio] = useState('')
  const [presupuesto, setPresupuesto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [waUrl, setWaUrl] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim() || !whatsappContacto.trim() || !negocio || !presupuesto) return

    setStatus('loading')

    // Guardar en Google Sheets
    const result = await submitContactForm({
      nombre,
      email: '',
      telefono: whatsappContacto,
      mensaje: `Tipo negocio: ${negocio} | Presupuesto: ${presupuesto}\n\n${mensaje}`,
      sheetsUrl: config.sheetsUrl,
    })

    if (result.ok) {
      // Construir el link de WhatsApp con todos sus datos
      const url = buildAsesoriaWhatsAppUrl(
        config.whatsapp,
        nombre,
        negocio,
        presupuesto,
        mensaje || '(sin mensaje adicional)',
        whatsappContacto
      )
      setWaUrl(url)
      setStatus('success')
      trackFormSubmit()
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'Error al enviar. Por favor intenta de nuevo.')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        /* ── ESTADO ÉXITO ─────────────────────────────────────── */
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="oil-drop rounded-sm p-8 md:p-12 flex flex-col items-center text-center gap-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          >
            <CheckCircle size={52} className="text-muzo-cristal" />
          </motion.div>

          <div>
            <h3 className="font-playfair text-2xl text-muzo-marfil mb-2">
              ¡Gracias, {nombre.split(' ')[0]}!
            </h3>
            <p className="text-muzo-marfil/55 font-inter text-sm leading-relaxed max-w-sm">
              Tus datos quedaron registrados. Ahora continúa en WhatsApp para
              hablar con nuestro equipo de asesores — el mensaje ya viene pre-llenado con
              tu información.
            </p>
          </div>

          <div className="divider-gold w-full" />

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-muzo-verde text-white rounded-sm font-inter font-medium text-sm hover:bg-muzo-verde-oscuro transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Continuar en WhatsApp
              <ArrowRight size={16} />
            </a>

            <p className="text-xs text-muzo-marfil/25 font-inter">
              El mensaje ya viene con tus datos completos
            </p>
          </div>

          <button
            onClick={() => { setStatus('idle'); setNombre(''); setWhatsappContacto(''); setNegocio(''); setPresupuesto(''); setMensaje('') }}
            className="text-xs text-muzo-marfil/30 hover:text-muzo-marfil/60 font-inter transition-colors"
          >
            Enviar otra solicitud
          </button>
        </motion.div>
      ) : (
        /* ── FORMULARIO ────────────────────────────────────────── */
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Nombre completo *"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <Input
              label="Tu WhatsApp *"
              type="tel"
              placeholder="+57 300 000 0000"
              value={whatsappContacto}
              onChange={(e) => setWhatsappContacto(e.target.value)}
              required
              disabled={status === 'loading'}
            />
          </div>

          <Select
            label="¿Cuál es tu tipo de negocio? *"
            options={negocioOptions}
            placeholder="Selecciona una opción"
            value={negocio}
            onChange={(e) => setNegocio(e.target.value)}
            required
            disabled={status === 'loading'}
          />

          <Select
            label="¿Cuál es tu presupuesto para el primer lote? *"
            options={presupuestoOptions}
            placeholder="Selecciona un rango"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            required
            disabled={status === 'loading'}
          />

          <Textarea
            label="¿Qué estás buscando exactamente? (opcional)"
            placeholder="Cuéntanos más: ¿tienes clientes en mente? ¿es para montar? ¿buscas un color específico?..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
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
            Enviar solicitud de asesoría
          </Button>

          <p className="text-xs text-muzo-marfil/25 font-inter text-center leading-relaxed">
            * Campos obligatorios. Después de enviar, te abriremos WhatsApp
            con tu información ya cargada para conectarte con nuestra asesora.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

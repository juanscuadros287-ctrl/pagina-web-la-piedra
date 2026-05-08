import type { Metadata } from 'next'
import Asesoria from '@/components/sections/Asesoria'
import AsesoriaForm from '@/components/sections/AsesoriaForm'
import Garantias from '@/components/sections/Garantias'
import config from '@/data/config.json'
import type { SiteConfig } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Asesoría Personalizada',
  description:
    'En La Piedra te asesoramos antes de cada compra. Fotos, videos, videollamada y envío contra entrega a todo Colombia. Sin compromiso.',
}

export default function AsesoriaPage() {
  const siteConfig = config as SiteConfig

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="py-16 md:py-24 text-center border-b border-muzo-dorado/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-inter font-semibold tracking-[0.3em] uppercase text-muzo-dorado mb-4">
            Nuestro proceso
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl text-muzo-marfil mb-4 leading-tight">
            Asesoría antes de comprar.
            <br />Siempre.
          </h1>
          <p className="text-muzo-marfil/50 font-inter text-lg max-w-xl mx-auto">
            Aquí no se venden piedras sin contexto. Te acompañamos
            en cada paso para que tomes la mejor decisión.
          </p>
        </div>
      </div>

      <Asesoria />

      {/* Formulario */}
      <section id="formulario" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-inter font-semibold tracking-[0.3em] uppercase text-muzo-dorado mb-4">
                Solicitar asesoría
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-muzo-marfil leading-tight mb-6 heading-accent">
                Cuéntanos tu proyecto.<br />
                Te guiamos desde cero.
              </h2>
              <p className="text-muzo-marfil/55 font-inter leading-relaxed mb-8">
                Llena el formulario y en menos de 24 horas un asesor te contactará
                por WhatsApp con opciones personalizadas para tu presupuesto.
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  { icon: '🌿', text: 'Selección de lotes según tu presupuesto exacto' },
                  { icon: '📷', text: 'Fotos y video real de cada esmeralda disponible' },
                  { icon: '📦', text: 'Envío contra entrega a todo Colombia' },
                  { icon: '📜', text: 'Certificado de origen Muzo incluido' },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">{icon}</span>
                    <span className="text-sm text-muzo-marfil/65 font-inter">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="divider-gold mt-8 mb-6" />
              <p className="text-xs text-muzo-marfil/30 font-inter leading-relaxed">
                Sin compromiso de compra. La asesoría es completamente gratuita.
              </p>
            </div>
            <div>
              <AsesoriaForm config={siteConfig} />
            </div>
          </div>
        </div>
      </section>

      <Garantias />
    </div>
  )
}

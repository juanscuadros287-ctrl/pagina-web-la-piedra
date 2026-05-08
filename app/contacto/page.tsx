import type { Metadata } from 'next'
import ContactoForm from '@/components/sections/ContactoForm'
import config from '@/data/config.json'
import { formatPhoneDisplay } from '@/lib/whatsapp'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import type { SiteConfig } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contáctanos para recibir asesoría personalizada sobre esmeraldas colombianas de origen Muzo. Respuesta en menos de 24 horas.',
}

export default function ContactoPage() {
  const siteConfig = config as SiteConfig
  const waUrl = buildGeneralWhatsAppUrl(config.whatsapp)

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="py-16 md:py-20 text-center border-b border-muzo-dorado/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-inter font-semibold tracking-[0.3em] uppercase text-muzo-dorado mb-4">
            Hablemos
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl text-muzo-marfil mb-4">
            Estamos para asesorarte
          </h1>
          <p className="text-muzo-marfil/50 font-inter text-lg max-w-xl mx-auto">
            Cuéntanos qué buscas y te respondemos en menos de 24 horas.
            También puedes escribirnos directamente por WhatsApp.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

            {/* Formulario */}
            <div>
              <h2 className="font-playfair text-2xl text-muzo-marfil mb-8 heading-accent">
                Envíanos un mensaje
              </h2>
              <ContactoForm config={siteConfig} />
            </div>

            {/* Info de contacto */}
            <div>
              <h2 className="font-playfair text-2xl text-muzo-marfil mb-8 heading-accent">
                Contacto directo
              </h2>

              <div className="flex flex-col gap-6">
                {/* WhatsApp */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oil-drop rounded-sm p-6 flex items-start gap-4 hover:border-muzo-verde/40 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-muzo-verde/20 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className="text-muzo-cristal">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-inter font-semibold tracking-widest uppercase text-muzo-dorado/60 mb-1">
                      WhatsApp
                    </p>
                    <p className="text-muzo-marfil font-inter group-hover:text-muzo-dorado transition-colors duration-200">
                      {formatPhoneDisplay(config.whatsapp)}
                    </p>
                    <p className="text-xs text-muzo-marfil/35 font-inter mt-0.5">
                      Respuesta rápida · Lun–Sáb
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${config.email}`}
                  className="oil-drop rounded-sm p-6 flex items-start gap-4 hover:border-muzo-dorado/30 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-muzo-dorado/10 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="18" height="18" className="text-muzo-dorado/70">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-inter font-semibold tracking-widest uppercase text-muzo-dorado/60 mb-1">
                      Email
                    </p>
                    <p className="text-muzo-marfil font-inter group-hover:text-muzo-dorado transition-colors duration-200 break-all">
                      {config.email}
                    </p>
                    <p className="text-xs text-muzo-marfil/35 font-inter mt-0.5">
                      Respuesta en menos de 24 horas
                    </p>
                  </div>
                </a>

                {/* Nota importante */}
                <div className="p-4 border border-muzo-dorado/20 rounded-sm bg-muzo-dorado/5">
                  <p className="text-sm text-muzo-marfil/60 font-inter leading-relaxed">
                    <span className="text-muzo-dorado font-semibold">WhatsApp es más rápido.</span>{' '}
                    Si necesitas respuesta urgente o quieres ver fotos y videos de lotes disponibles,
                    escríbenos directamente por WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

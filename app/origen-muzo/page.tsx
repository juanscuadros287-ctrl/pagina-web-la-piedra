import type { Metadata } from 'next'
import OrigenMuzo from '@/components/sections/OrigenMuzo'
import Garantias from '@/components/sections/Garantias'
import Button from '@/components/ui/Button'
export const metadata: Metadata = {
  title: 'Origen Muzo',
  description:
    'Descubre por qué las esmeraldas de Muzo, Boyacá son las más valoradas del mundo. El efecto gota de aceite, 65 millones de años de historia y el estándar Muzo explicados.',
}

export default function OrigenMuzoPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="py-16 md:py-24 text-center border-b border-muzo-dorado/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-inter font-semibold tracking-[0.3em] uppercase text-muzo-dorado mb-4">
            Boyacá · Colombia
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl text-muzo-marfil mb-4 leading-tight">
            El origen que lo cambia todo
          </h1>
          <p className="text-muzo-marfil/50 font-inter text-lg max-w-2xl mx-auto">
            No todas las esmeraldas son iguales. Las de Muzo tienen una composición
            química y un carácter visual que ningún otro yacimiento del planeta puede replicar.
          </p>
        </div>
      </div>

      {/* Sección principal */}
      <OrigenMuzo />

      {/* Sección narrativa adicional */}
      <section className="py-16 md:py-24 border-t border-muzo-dorado/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-playfair text-3xl text-muzo-marfil mb-4 heading-accent">
                El efecto gota de aceite
              </h2>
              <p className="text-muzo-marfil/60 font-inter leading-relaxed text-sm">
                Las esmeraldas de Muzo contienen inclusiones fluidas microscópicas que
                crean un efecto visual único: cuando la luz atraviesa la piedra, el color
                parece moverse y flotar, como una gota de aceite en agua.
              </p>
              <p className="text-muzo-marfil/60 font-inter leading-relaxed text-sm mt-4">
                Este fenómeno, conocido técnicamente como &ldquo;jardín&rdquo; o <em>jardinée</em>,
                es paradójicamente lo que hace más valiosas a las esmeraldas colombianas:
                lejos de ser un defecto, es la firma de su autenticidad.
              </p>
            </div>
            <div>
              <h2 className="font-playfair text-3xl text-muzo-marfil mb-4 heading-accent">
                El color que no se replica
              </h2>
              <p className="text-muzo-marfil/60 font-inter leading-relaxed text-sm">
                El verde de Muzo es cálido, intenso y luminoso. A diferencia de
                esmeraldas de otros orígenes con tonos azulados o amarillentos,
                las colombianas tienen una saturación pura que los gemólogos llaman
                &ldquo;verde colombiano&rdquo; como categoría propia.
              </p>
              <p className="text-muzo-marfil/60 font-inter leading-relaxed text-sm mt-4">
                Esta característica cromática viene del cromo y vanadio presentes
                en la roca calizas de Muzo — una geología que no existe
                en ningún otro lugar del mundo en las mismas proporciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantías */}
      <Garantias />

      {/* CTA final */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-playfair text-3xl text-muzo-marfil mb-4">
            ¿Listo para conocer tu primer lote?
          </h2>
          <p className="text-muzo-marfil/50 font-inter text-sm mb-8">
            Llena el formulario de asesoría y te explicamos todo lo que necesitas saber antes de comprar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/catalogo">
              Ver catálogo
            </Button>
            <Button variant="secondary" size="lg" href="/asesoria">
              Solicitar asesoría
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

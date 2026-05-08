import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import WhyUs from '@/components/sections/WhyUs'
import Asesoria from '@/components/sections/Asesoria'
import CatalogSection from '@/components/sections/CatalogSection'

export const metadata: Metadata = {
  title: 'Comprar Esmeraldas de Muzo | Directo de la Mina — La Piedra Esmeralda',
  description:
    'Compra esmeraldas colombianas 100% naturales directas de la mina de Muzo, Boyacá. Lotes Génesis, Dual y Élite para joyería, reventa y colección. Asesoría personalizada. Envíos a Colombia y el mundo.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Asesoria />
      <CatalogSection />
    </>
  )
}

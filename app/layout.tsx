import type { Metadata } from 'next'
import { Cinzel, Raleway } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import config from '@/data/config.json'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Comprar Esmeraldas de Muzo | La Piedra Esmeralda — Directo de la Mina',
    template: '%s | La Piedra Esmeralda',
  },
  description:
    'Compra esmeraldas colombianas 100% naturales de la mina de Muzo, Boyacá. Lotes para joyería, reventa y colección. Certificadas, con asesoría personalizada y envíos a Colombia y el mundo.',
  metadataBase: new URL(config.siteUrl),
  alternates: {
    canonical: config.siteUrl,
    languages: {
      'es-CO': config.siteUrl,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: config.siteUrl,
    siteName: 'La Piedra Esmeralda',
    title: 'Comprar Esmeraldas de Muzo | La Piedra Esmeralda',
    description:
      'Esmeraldas colombianas directas de la mina de Muzo, Boyacá. Para emprendedores, joyeros y coleccionistas. Envíos nacionales e internacionales.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Esmeraldas de Muzo — La Piedra Esmeralda' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comprar Esmeraldas de Muzo | La Piedra Esmeralda',
    description: 'Esmeraldas colombianas directas de la mina de Muzo. Certificadas, con asesoría personalizada.',
    images: ['/og-default.jpg'],
  },
  icons: { icon: '/favicon.ico' },
  keywords: [
    'esmeraldas colombianas', 'esmeraldas de Muzo', 'comprar esmeraldas Colombia',
    'esmeraldas certificadas Boyacá', 'venta esmeraldas directo mina', 'lotes esmeraldas joyería',
    'esmeraldas en bruto Colombia', 'esmeraldas sin intermediarios', 'precio esmeraldas Muzo',
    'Colombian emeralds for sale', 'buy Muzo emeralds', 'Colombian emerald wholesale',
    'esmeraldas para emprendedores', 'esmeraldas Cali Colombia',
  ],
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${config.siteUrl}/#organization`,
      name: 'La Piedra Esmeralda',
      url: config.siteUrl,
      logo: { '@type': 'ImageObject', url: `${config.siteUrl}/logo.png` },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+573148316745',
        contactType: 'sales',
        availableLanguage: ['Spanish', 'English'],
      },
      sameAs: [
        config.social.instagram,
        config.social.tiktok,
        config.social.facebook,
      ],
      description: 'Venta de esmeraldas colombianas directas de la mina de Muzo, Boyacá. Lotes para joyería, reventa y colección con asesoría personalizada.',
    },
    {
      '@type': 'WebSite',
      '@id': `${config.siteUrl}/#website`,
      url: config.siteUrl,
      name: 'La Piedra Esmeralda',
      publisher: { '@id': `${config.siteUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${config.siteUrl}/?s={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${config.siteUrl}/#webpage`,
      url: config.siteUrl,
      name: 'Comprar Esmeraldas de Muzo | La Piedra Esmeralda',
      description: 'Esmeraldas colombianas directas de la mina de Muzo. Para emprendedores, joyeros y coleccionistas.',
      isPartOf: { '@id': `${config.siteUrl}/#website` },
      about: { '@id': `${config.siteUrl}/#organization` },
      inLanguage: 'es-CO',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cinzel.variable} ${raleway.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />

        {config.pixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init','${config.pixelId}');fbq('track','PageView');
              `,
            }}
          />
        )}

        {config.gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config','${config.gaId}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}

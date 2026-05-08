import type { MetadataRoute } from 'next'
import config from '@/data/config.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.siteUrl

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${base}/origen-muzo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/asesoria`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // En Fase 2 se agregarían aquí rutas de /terminos y /privacidad
  // y las URLs de cada lote individual si tuvieran página propia

  return staticRoutes
}

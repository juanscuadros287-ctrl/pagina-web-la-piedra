import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nuevo sistema de colores — tema claro esmeralda
        'bg': '#F7F7F5',
        'bg-soft': '#FFFFFF',
        'bg-warm': '#EFEFEC',
        'ink': '#1A2421',
        'ink-soft': '#3D4A45',
        'ink-dim': '#6B7672',
        'ink-faint': '#9AA29E',
        'emerald': '#0E7C5C',
        'emerald-deep': '#0A4F3B',
        'emerald-darker': '#062E22',
        'emerald-bright': '#16A47A',
        'emerald-soft': '#E3F1EB',
        'emerald-tint': '#F1F7F4',
        // Aliases de compatibilidad
        'muzo-verde': '#0E7C5C',
        'muzo-verde-oscuro': '#0A4F3B',
        'muzo-cristal': '#16A47A',
        'muzo-dorado': '#0E7C5C',
        'muzo-negro': '#1A2421',
        'muzo-marfil': '#F7F7F5',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'Georgia', 'serif'],
        raleway: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
        // aliases compatibilidad
        playfair: ['var(--font-cinzel)', 'Georgia', 'serif'],
        inter: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [typography],
}

export default config

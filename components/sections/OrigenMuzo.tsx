'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Globe, Gem, Award, ShieldCheck } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}
const ease = [0.22, 1, 0.36, 1] as const

const stats = [
  {
    icon: Globe,
    value: '~70%',
    label: 'del mercado mundial',
    body: 'Colombia produce la mayor parte de las esmeraldas finas del mundo. Muzo lidera en calidad y color.',
  },
  {
    icon: Gem,
    value: '65M',
    label: 'años de historia',
    body: 'Cada esmeralda de Muzo se formó durante el Cretáceo, en condiciones únicas que no se replican en ningún otro lugar del planeta.',
  },
  {
    icon: Award,
    value: '+2',
    label: 'años de experiencia',
    body: 'Llevamos más de 2 años conectando emprendedores y joyeros con esmeraldas certificadas directamente desde Muzo, Boyacá.',
  },
  {
    icon: ShieldCheck,
    value: '100%',
    label: 'origen certificado',
    body: 'Trabajamos directamente con mineros de Muzo, Boyacá. Conocemos la cadena de cada piedra que vendemos.',
  },
]

// ── RAYOS DE LUZ VOLUMÉTRICA ─────────────────────────────────────
// Usamos divs grandes con blur pesado — nunca partículas sólidas.
// El efecto imita luz crepuscular filtrada a través de las minas.
interface Beam {
  id: number
  left: string      // posición horizontal
  rotate: number    // ángulo de inclinación
  width: string     // anchura del rayo
  height: string    // altura
  opacity: number   // opacidad máxima
  blur: number      // blur en px
  delay: number     // delay de animación
  dur: number       // duración ciclo
  color: string     // color del rayo
}

const BEAMS: Beam[] = [
  // Rayo ancho central — el más prominente
  { id:1, left:'35%',  rotate: -8,  width:'18%', height:'75%', opacity:0.10, blur:70, delay:0,   dur:7, color:'52,211,153' },
  // Rayo fino izquierdo
  { id:2, left:'12%',  rotate:-18,  width:'7%',  height:'65%', opacity:0.14, blur:50, delay:1.2, dur:6, color:'52,211,153' },
  // Rayo medio-izquierdo
  { id:3, left:'22%',  rotate:-12,  width:'12%', height:'70%', opacity:0.08, blur:80, delay:2.4, dur:8, color:'11,110,79'  },
  // Rayo central-derecho más brillante
  { id:4, left:'52%',  rotate: -3,  width:'10%', height:'80%', opacity:0.12, blur:60, delay:0.7, dur:7, color:'52,211,153' },
  // Rayo derecho delgado
  { id:5, left:'68%',  rotate:  6,  width:'8%',  height:'60%', opacity:0.09, blur:55, delay:1.8, dur:9, color:'52,211,153' },
  // Rayo derecho ancho difuso
  { id:6, left:'78%',  rotate: 12,  width:'15%', height:'55%', opacity:0.07, blur:90, delay:3.0, dur:6, color:'11,110,79'  },
  // Rayo extremo izquierdo — muy sutil
  { id:7, left:'-3%',  rotate:-24,  width:'10%', height:'50%', opacity:0.08, blur:65, delay:0.4, dur:8, color:'52,211,153' },
  // Rayo de acento dorado — toque cálido
  { id:8, left:'44%',  rotate: -6,  width:'6%',  height:'45%', opacity:0.06, blur:50, delay:2.0, dur:7, color:'201,169,97' },
]

function EmeraldLightRays() {
  const shouldReduce = useReducedMotion()

  return (
    <div
      className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none"
      style={{ height: '80%' }}
      aria-hidden
    >
      {/* Halo superior difuso — el "cielo" de la escena */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '35%',
          background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(11,110,79,0.08) 0%, transparent 100%)',
        }}
      />

      {/* Rayos volumétricos */}
      {BEAMS.map((beam) => (
        <motion.div
          key={beam.id}
          style={{
            position: 'absolute',
            top: '-5%',
            left: beam.left,
            width: beam.width,
            height: beam.height,
            transform: `rotate(${beam.rotate}deg)`,
            transformOrigin: 'top center',
            background: `linear-gradient(
              to bottom,
              rgba(${beam.color}, ${beam.opacity}) 0%,
              rgba(${beam.color}, ${beam.opacity * 0.6}) 30%,
              rgba(${beam.color}, ${beam.opacity * 0.2}) 65%,
              transparent 100%
            )`,
            filter: `blur(${beam.blur}px)`,
            willChange: 'opacity',
          }}
          animate={shouldReduce ? undefined : {
            opacity: [0.4, 1, 0.6, 0.9, 0.4],
          }}
          transition={{
            duration: beam.dur,
            delay: beam.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Destellos de partícula — pequeños puntos de luz, MUY sutiles */}
      {[
        { x:'15%', y:'8%',  s:3, d:0   },
        { x:'33%', y:'5%',  s:2, d:1.5 },
        { x:'50%', y:'12%', s:3, d:0.8 },
        { x:'67%', y:'6%',  s:2, d:2.2 },
        { x:'82%', y:'9%',  s:3, d:1.0 },
        { x:'24%', y:'18%', s:2, d:3.1 },
        { x:'57%', y:'22%', s:2, d:1.7 },
      ].map((p, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.s,
            height: p.s,
            background: '#34D399',
            boxShadow: `0 0 ${p.s * 5}px rgba(52,211,153,0.8)`,
          }}
          animate={shouldReduce ? undefined : {
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.4,
            delay: p.d,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function OrigenMuzo() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <EmeraldLightRays />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-inter font-semibold tracking-[0.3em] uppercase text-muzo-dorado mb-4"
          >
            Por qué Muzo
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease, delay: 0.08 }}
            className="font-playfair text-4xl md:text-5xl text-muzo-marfil leading-tight heading-accent"
          >
            Muzo no es un lugar.
            Es un estándar.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease, delay: 0.16 }}
            className="mt-6 text-muzo-marfil/55 font-inter text-base leading-relaxed"
          >
            En las montañas de Boyacá, Colombia, la naturaleza tardó 65 millones de años
            en crear algo irrepetible. Las esmeraldas de Muzo son conocidas en todo el
            mundo por su color verde cálido único y la presencia del efecto gota de aceite
            — una firma que no se falsifica.
          </motion.p>
        </div>

        <div className="divider-gold mb-16" />

        {/* Grid de stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label, body }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="oil-drop rounded-sm p-6 flex flex-col gap-4 cursor-default"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2.5 rounded-sm bg-muzo-verde/15 border border-muzo-verde/20"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(52,211,153,0)',
                      '0 0 12px rgba(52,211,153,0.2)',
                      '0 0 0px rgba(52,211,153,0)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                >
                  <Icon size={18} className="text-muzo-cristal" />
                </motion.div>
                <div>
                  <p className="font-playfair text-xl font-bold text-muzo-dorado leading-none">
                    {value}
                  </p>
                  <p className="text-[10px] font-inter text-muzo-marfil/40 tracking-wide uppercase mt-0.5">
                    {label}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muzo-marfil/55 font-inter leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="mt-16 text-center max-w-xl mx-auto"
        >
          <p className="font-playfair text-2xl italic text-muzo-marfil/70 leading-relaxed">
            &ldquo;Cada piedra cuenta una historia de 65 millones de años.&rdquo;
          </p>
          <div className="mt-4 w-8 h-px bg-muzo-dorado mx-auto" />
        </motion.blockquote>
      </div>
    </section>
  )
}

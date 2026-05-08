'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * AmbientBackground — fondo 3D global de La Piedra
 *
 * Orbs de luz difuminada fijos en la pantalla, detrás de todo el contenido.
 * Crean la ilusión de profundidad y espacio sin espacios oscuros muertos.
 * Se animan muy lento (14-28s) para que se sienta orgánico, no ansioso.
 */

interface Orb {
  id: number
  /** posición inicial en viewport units */
  x: string
  y: string
  /** tamaño del orb */
  w: string
  h: string
  /** color rgba */
  color: string
  /** blur en px */
  blur: number
  /** opacidad base */
  opacity: number
  /** cuánto se mueve (px) */
  drift: [number, number]
  /** duración ciclo */
  dur: number
  delay: number
}

const ORBS: Orb[] = [
  // ── Orb principal verde — gran presencia top-left
  {
    id: 1,
    x: '-15vw', y: '5vh',
    w: '65vw',  h: '55vw',
    color: 'rgba(11,110,79,1)',
    blur: 140,
    opacity: 0.13,
    drift: [30, 20],
    dur: 22,
    delay: 0,
  },
  // ── Orb esmeralda brillante — centro-derecha
  {
    id: 2,
    x: '55vw', y: '20vh',
    w: '50vw',  h: '45vw',
    color: 'rgba(52,211,153,1)',
    blur: 120,
    opacity: 0.07,
    drift: [-25, 35],
    dur: 28,
    delay: 4,
  },
  // ── Orb verde oscuro — parte baja izquierda
  {
    id: 3,
    x: '5vw',  y: '55vh',
    w: '55vw',  h: '50vw',
    color: 'rgba(6,78,59,1)',
    blur: 130,
    opacity: 0.15,
    drift: [20, -30],
    dur: 25,
    delay: 8,
  },
  // ── Orb dorado sutil — toque cálido centro
  {
    id: 4,
    x: '35vw', y: '40vh',
    w: '40vw',  h: '35vw',
    color: 'rgba(201,169,97,1)',
    blur: 150,
    opacity: 0.045,
    drift: [-15, 25],
    dur: 32,
    delay: 12,
  },
  // ── Orb cristal — acento top-right
  {
    id: 5,
    x: '70vw', y: '-5vh',
    w: '42vw',  h: '38vw',
    color: 'rgba(52,211,153,1)',
    blur: 110,
    opacity: 0.055,
    drift: [-20, 15],
    dur: 19,
    delay: 6,
  },
  // ── Orb verde profundo — bottom-right para continuidad
  {
    id: 6,
    x: '60vw', y: '70vh',
    w: '48vw',  h: '42vw',
    color: 'rgba(11,110,79,1)',
    blur: 135,
    opacity: 0.10,
    drift: [10, -20],
    dur: 24,
    delay: 15,
  },
]

export default function AmbientBackground() {
  const shouldReduce = useReducedMotion()

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {ORBS.map((orb) => (
        <motion.div
          key={orb.id}
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: orb.w,
            height: orb.h,
            borderRadius: '50%',
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity,
            willChange: 'transform, opacity',
          }}
          animate={shouldReduce ? undefined : {
            x: [0, orb.drift[0], -orb.drift[0] * 0.5, 0],
            y: [0, orb.drift[1], -orb.drift[1] * 0.4, 0],
            opacity: [
              orb.opacity,
              orb.opacity * 1.5,
              orb.opacity * 0.7,
              orb.opacity,
            ],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Viñeta perimetral — evita que los orbs se vean cortados en bordes */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 60% at 50% 50%, transparent 30%, rgba(6,6,6,0.35) 100%)
          `,
        }}
      />
    </div>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

interface Dot {
  left: number
  top: number
  size: number
  duration: number
  delay: number
  color: string
}

const COLORS = ['#C8A24A', '#DCC182', '#6C8A76', '#EBD9AE']

/**
 * Sahifa orqasidagi yumshoq, sekin harakatlanuvchi zarralar.
 * Juda past shaffoflik — ular e'tiborni buzmasligi kerak.
 */
export function GlowParticles({ count = 20 }: { count?: number }) {
  const reduce = useReducedMotion()

  const dots = useMemo<Dot[]>(() => {
    return Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3.5,
      duration: 14 + Math.random() * 18,
      delay: -Math.random() * 20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))
  }, [count])

  if (reduce) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {dots.map((dot, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
          }}
          animate={{ y: [0, -26, 0], opacity: [0.12, 0.42, 0.12] }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

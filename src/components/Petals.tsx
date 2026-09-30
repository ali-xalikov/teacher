import { useMemo } from 'react'

interface Petal {
  left: number
  size: number
  duration: number
  delay: number
  rotate: number
  opacity: number
  background: string
}

const COLORS = [
  'linear-gradient(140deg, rgba(236,199,194,0.9), rgba(247,232,228,0.75))',
  'linear-gradient(140deg, rgba(220,193,130,0.85), rgba(246,237,216,0.7))',
  'linear-gradient(140deg, rgba(108,138,118,0.55), rgba(237,242,236,0.6))',
]

/** Yengil, sezilmaydigan gul g'unchalari */
export function Petals({ count = 14, reduce = false }: { count?: number; reduce?: boolean }) {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      size: 8 + Math.random() * 10,
      duration: 20 + Math.random() * 22,
      delay: -Math.random() * 30,
      rotate: Math.random() * 360,
      opacity: 0.25 + Math.random() * 0.35,
      background: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))
  }, [count])

  if (reduce) return null

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {petals.map((petal, index) => (
        <span
          key={index}
          className="absolute -top-10 animate-petal will-change-transform"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 0.72,
            borderRadius: '60% 40% 55% 45%',
            background: petal.background,
            opacity: petal.opacity,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotate}deg)`,
            filter: 'blur(0.3px)',
          }}
        />
      ))}
    </div>
  )
}

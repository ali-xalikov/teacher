import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'

export interface CelebrationHandle {
  /** Yumshoq tilla tantana */
  fire: (count?: number, origin?: { x: number; y: number }) => void
  /** Tozalash */
  clear: () => void
}

type Shape = 0 | 1 | 2 // nuqta · yulduz · g'uncha

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  decay: number
  size: number
  rot: number
  vr: number
  color: string
  shape: Shape
  opacity: number
}

/* Premium his: asosan tilla, oz-moz yashil va krem */
const PALETTE = [
  '#DCC182',
  '#C8A24A',
  '#EBD9AE',
  '#B08C33',
  '#F6EDD8',
  '#C8A24A',
  '#6C8A76',
]

function drawStar(ctx: CanvasRenderingContext2D, r: number) {
  ctx.beginPath()
  ctx.moveTo(0, -r)
  ctx.quadraticCurveTo(r * 0.16, -r * 0.16, r, 0)
  ctx.quadraticCurveTo(r * 0.16, r * 0.16, 0, r)
  ctx.quadraticCurveTo(-r * 0.16, r * 0.16, -r, 0)
  ctx.quadraticCurveTo(-r * 0.16, -r * 0.16, 0, -r)
  ctx.closePath()
  ctx.fill()
}

const Celebration = forwardRef<CelebrationHandle>(function Celebration(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particles = useRef<Particle[]>([])
  const frame = useRef<number | null>(null)
  const dpr = useRef(1)

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    dpr.current = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(window.innerWidth * dpr.current)
    canvas.height = Math.floor(window.innerHeight * dpr.current)
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr.current, 0, 0, dpr.current, 0, 0)
  }, [])

  const tick = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    const alive: Particle[] = []
    for (const p of particles.current) {
      p.vy += 0.013
      p.vx *= 0.994
      p.vy *= 0.994
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      p.life -= p.decay

      if (p.life <= 0 || p.y > window.innerHeight + 60) continue

      const alpha = Math.min(1, p.life * 1.8) * p.opacity
      ctx.globalAlpha = Math.max(0, alpha)
      ctx.fillStyle = p.color

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)

      if (p.shape === 0) {
        ctx.beginPath()
        ctx.arc(0, 0, p.size, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.shape === 1) {
        drawStar(ctx, p.size * 2.1)
      } else {
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size * 0.7, p.size * 1.5, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
      alive.push(p)
    }

    particles.current = alive
    ctx.globalAlpha = 1

    if (alive.length > 0) {
      frame.current = window.requestAnimationFrame(tick)
    } else {
      frame.current = null
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
  }, [])

  const start = useCallback(() => {
    if (frame.current === null) frame.current = window.requestAnimationFrame(tick)
  }, [tick])

  useImperativeHandle(
    ref,
    () => ({
      fire(count = 60, origin) {
        if (reduce) return

        const w = window.innerWidth
        const h = window.innerHeight
        const total = Math.round(count)

        for (let i = 0; i < total; i += 1) {
          const hasOrigin = Boolean(origin)
          const x = origin ? origin.x + (Math.random() - 0.5) * w * 0.5 : Math.random() * w
          const y = origin ? origin.y : h * (0.55 + Math.random() * 0.35)

          const angle = hasOrigin
            ? -Math.PI / 2 + (Math.random() - 0.5) * 2.1
            : -Math.PI / 2 + (Math.random() - 0.5) * 1.5
          const speed = 2.4 + Math.random() * 4.6

          const shapeRoll = Math.random()
          const shape: Shape = shapeRoll > 0.82 ? 1 : shapeRoll > 0.58 ? 2 : 0

          particles.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: 0.0055 + Math.random() * 0.004,
            size: 1.6 + Math.random() * 2.4,
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.09,
            color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            shape,
            opacity: 0.7 + Math.random() * 0.3,
          })
        }

        start()
      },
      clear() {
        particles.current = []
        const ctx = canvasRef.current?.getContext('2d')
        if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      },
    }),
    [reduce, start],
  )

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
    }
  }, [resize])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[110] h-full w-full"
    />
  )
})

export default Celebration

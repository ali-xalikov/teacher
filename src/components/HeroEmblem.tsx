import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Heart, Sparkles, Star } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Bosh sahifa emblemasi — sekin aylanuvchi halqalar va mayda yulduzlar.
 * Juda yengil, "sakrash" effekti yo'q.
 */
export function HeroEmblem() {
  return (
    <div className="relative mx-auto grid h-60 w-60 place-items-center sm:h-72 sm:w-72">
      {/* Yumshoq nur */}
      <span
        className="absolute inset-6 rounded-full bg-gold-200/50 blur-3xl animate-breathe"
        aria-hidden="true"
      />

      {/* Aylanuvchi halqalar */}
      <span
        className="absolute inset-2 animate-slow-spin rounded-full border border-dashed border-gold-300/70"
        aria-hidden="true"
      />
      <span
        className="absolute inset-7 animate-slow-spin rounded-full border border-sage-light/40 [animation-direction:reverse] [animation-duration:60s]"
        aria-hidden="true"
      />

      {/* Markaz */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid h-36 w-36 place-items-center rounded-full border border-gold-300/80
                   bg-white/70 text-center shadow-card backdrop-blur-sm sm:h-44 sm:w-44"
      >
        <span className="flex flex-col items-center gap-1.5">
          <GraduationCap size={26} strokeWidth={1.3} className="text-gold-600" />
          <span className="font-display text-lg font-medium text-navy sm:text-xl">1-oktyabr</span>
          <span className="text-[0.6rem] uppercase tracking-soft text-muted">Ustoz kuni</span>
        </span>
      </motion.div>

      {/* Atrofidagi kichik belgilar */}
      <OrbitChip className="left-0 top-6" delay={0.9} icon={<BookOpen size={14} strokeWidth={1.6} />} />
      <OrbitChip className="right-0 top-2" delay={1.15} icon={<Heart size={14} strokeWidth={1.6} />} />
      <OrbitChip className="bottom-4 left-4" delay={1.4} icon={<Star size={14} strokeWidth={1.6} />} />
      <OrbitChip className="bottom-0 right-6" delay={1.65} icon={<Sparkles size={14} strokeWidth={1.6} />} />
    </div>
  )
}

function OrbitChip({
  className = '',
  delay,
  icon,
}: {
  className?: string
  delay: number
  icon: ReactNode
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute animate-floaty grid h-9 w-9 place-items-center rounded-full border border-gold-300/70
                  bg-cream-50/90 text-gold-600 shadow-soft ${className}`}
      aria-hidden="true"
    >
      {icon}
    </motion.span>
  )
}

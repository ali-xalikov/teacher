import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { initials, type Teacher } from '../data/teachers'
import { cn } from '../lib/cn'

type Size = 'sm' | 'md' | 'lg'

const SIZES: Record<Size, { box: string; text: string; ring: string }> = {
  sm: { box: 'h-16 w-16', text: 'text-lg', ring: 'inset-0' },
  md: { box: 'h-24 w-24 sm:h-28 sm:w-28', text: 'text-2xl sm:text-3xl', ring: 'inset-0' },
  lg: { box: 'h-40 w-40 sm:h-52 sm:w-52', text: 'text-4xl sm:text-5xl', ring: 'inset-0' },
}

/**
 * Ustoz portreti.
 * Rasm bo'lsa — chiroyli ramka ichida; bo'lmasa yoki yuklanmasa —
 * bosh harflar (DK) bilan chiroyli avatar.
 */
export function TeacherPortrait({
  teacher,
  size = 'md',
  className,
}: {
  teacher: Teacher
  size?: Size
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const reduce = useReducedMotion()
  const s = SIZES[size]
  const showPhoto = Boolean(teacher.photo) && !failed

  return (
    <div className={cn('relative grid place-items-center', s.box, className)}>
      {/* Yumshoq tilla nur */}
      <div
        className="absolute -inset-4 rounded-full bg-gold-200/40 blur-2xl animate-breathe"
        aria-hidden="true"
      />

      {/* Sekin aylanuvchi nozik halqa */}
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute rounded-full border border-dashed border-gold-300/70"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={size === 'lg' ? { inset: '-10px' } : { inset: '-6px' }}
        />
      )}

      <span
        className={cn(
          'relative grid h-full w-full place-items-center overflow-hidden rounded-full',
          'border border-gold-300 bg-gradient-to-br from-cream-50 to-gold-100 shadow-soft',
        )}
      >
        {showPhoto ? (
          <img
            src={teacher.photo}
            alt={`${teacher.firstName} ${teacher.lastName}`}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className={cn(
              'font-display font-semibold tracking-wide text-navy',
              s.text,
            )}
            aria-hidden="true"
          >
            {initials(teacher)}
          </span>
        )}
      </span>

      {/* Ichki nozik halqa */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute rounded-full ring-1 ring-inset ring-white/70',
          s.ring,
        )}
      />
    </div>
  )
}

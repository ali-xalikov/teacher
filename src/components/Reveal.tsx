import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/** Sekin, yuqoriga ko'tarilish — sahifa kirishidagi asosiy harakat */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Juda sekin, nozik ochilish (matn uchun) */
export const softVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Ichki elementlarni ketma-ket ko'rsatish */
export function staggerContainer(delay = 0.25, gap = 0.14): Variants {
  return {
    hidden: {},
    show: {
      transition: { delayChildren: delay, staggerChildren: gap },
    },
  }
}

/** Scroll ko'rinishga kirganda ochilish */
export function Reveal({
  children,
  delay = 0,
  className,
  amount = 0.25,
}: {
  children: ReactNode
  delay?: number
  className?: string
  amount?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

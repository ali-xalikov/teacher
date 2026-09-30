import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import type { Teacher } from '../data/teachers'
import { fullName } from '../data/teachers'
import { splitChars, splitWords } from '../lib/text'
import { CornerFlourish, GoldDivider, SparkleCluster } from './Ornaments'
import { TeacherPortrait } from './TeacherPortrait'

/** Premium, sekin easing */
const EASE = [0.22, 1, 0.36, 1] as const

export const LONG_MESSAGE =
  'Bergan har bir bilimingiz, aytgan nasihatingiz va ko‘rsatgan yo‘llaringiz o‘quvchilaringiz qalbida uzoq yillar saqlanadi. Sizga mustahkam sog‘liq, oilaviy baxt, cheksiz ilhom va shogirdlaringiz yutuqlaridan doim faxrlanib yurishni tilaymiz!'

interface GreetingCardProps {
  teacher: Teacher
}

/** Umumiy kirish harakati */
function rise(delay: number, y = 18) {
  return {
    initial: { opacity: 0, y, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.95, delay, ease: EASE },
  }
}

export const GreetingCard = forwardRef<HTMLDivElement, GreetingCardProps>(function GreetingCard(
  { teacher },
  ref,
) {
  const name = fullName(teacher)
  const nameWords = splitWords(name)
  const nameEnd = 1.2 + name.length * 0.035

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-3xl"
    >
      <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gold-200/25 blur-3xl" aria-hidden="true" />

      <div
        ref={ref}
        className="grain relative overflow-hidden rounded-[1.75rem] border border-gold-200/80 bg-gold-sheet px-6 py-10 shadow-card sm:rounded-[2.25rem] sm:px-12 sm:py-14"
      >
        <CornerFlourish className="left-5 top-5 rotate-0" />
        <CornerFlourish className="right-5 top-5 rotate-90" />
        <CornerFlourish className="bottom-5 right-5 rotate-180" />
        <CornerFlourish className="bottom-5 left-5 -rotate-90" />

        <SparkleCluster className="pointer-events-none absolute left-1/2 top-8 h-10 w-40 -translate-x-1/2 text-gold-500/50 sm:top-10" />

        <div className="relative flex flex-col items-center text-center">
          {/* Sarlavha */}
          <motion.p {...rise(0.4, 12)} className="eyebrow">
            Ustoz va murabbiylar kuni · 1-oktyabr
          </motion.p>

          {/* Portret */}
          <motion.div
            {...rise(0.55, 14)}
            className="mt-7 sm:mt-9"
          >
            <TeacherPortrait teacher={teacher} size="lg" />
          </motion.div>

          {/* Hurmatli */}
          <motion.p
            {...rise(1, 14)}
            className="mt-7 font-serif text-xl italic text-gold-600 sm:text-2xl"
          >
            Hurmatli
          </motion.p>

          {/* Ism — harflar ketma-ket ochiladi, so‘zlar yaxlit qoladi */}
          <h1 className="mt-1 flex max-w-full flex-wrap items-baseline justify-center gap-x-[0.22em] gap-y-1.5 overflow-hidden px-1">
            {nameWords.map((word, wordIndex) => {
              const offset = nameWords
                .slice(0, wordIndex)
                .reduce((sum, w) => sum + w.length, 0)

              return (
                <span
                  key={`${word}-${wordIndex}`}
                  className="inline-flex items-baseline whitespace-nowrap"
                >
                  {splitChars(word).map((char, charIndex) => {
                    const index = offset + charIndex
                    return (
                      <motion.span
                        key={`${char}-${index}`}
                        className="font-display text-[clamp(1.75rem,5vw,2.75rem)] font-medium leading-[1.06] text-navy"
                        initial={{ opacity: 0, y: '0.45em', filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, delay: 1.2 + index * 0.035, ease: EASE }}
                      >
                        {char}
                      </motion.span>
                    )
                  })}
                </span>
              )
            })}
          </h1>

          {/* Otasining ismi */}
          {teacher.patronymic && (
            <motion.p
              {...rise(nameEnd + 0.12, 12)}
              className="mt-1.5 font-serif text-lg italic text-muted sm:text-xl"
            >
              {teacher.patronymic}
            </motion.p>
          )}

          {/* Fan */}
          {teacher.subject && (
            <motion.p {...rise(nameEnd + 0.2, 10)} className="mt-4 text-xs uppercase tracking-soft text-gold-600">
              {teacher.subject}
            </motion.p>
          )}

          <motion.div {...rise(nameEnd + 0.3)} className="my-7 w-full max-w-xs sm:my-8">
            <GoldDivider />
          </motion.div>

          {/* Asosiy tabrik */}
          <motion.p
            {...rise(nameEnd + 0.42, 16)}
            className="max-w-[24ch] font-display text-[clamp(1.1rem,4.4vw,1.6rem)] font-medium leading-snug text-navy sm:max-w-none"
          >
            Sizni Ustoz va murabbiylar kuni bilan chin qalbdan tabriklaymiz!{' '}
            <span aria-hidden="true">🌷</span>
          </motion.p>

          {/* Uzun tabrik */}
          <motion.p
            {...rise(nameEnd + 0.58, 14)}
            className="mt-6 max-w-[62ch] text-[0.98rem] leading-[1.85] text-ink/75 sm:text-[1.05rem]"
          >
            {LONG_MESSAGE}
          </motion.p>

          {/* Imzo */}
          <motion.div {...rise(nameEnd + 0.74, 12)} className="mt-8 sm:mt-10">
            <p className="font-serif text-lg italic text-gold-600">Hurmat bilan</p>
            <p className="mt-1 font-sans text-xs uppercase tracking-ceremonial text-muted">
              Xalikov Ali
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
})

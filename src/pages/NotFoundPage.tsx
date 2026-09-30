import { motion } from 'framer-motion'
import { ArrowLeft, SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import { teachers, fullName } from '../data/teachers'

interface NotFoundPageProps {
  /** 'teacher' — noto'g'ri ustoz havolasi, 'page' — umumiy 404 */
  variant?: 'teacher' | 'page'
}

export function NotFoundPage({ variant = 'page' }: NotFoundPageProps) {
  const isTeacher = variant === 'teacher'

  return (
    <>
      <SiteHeader />

      <main className="mx-auto flex min-h-[68vh] w-[min(100%-2rem,720px)] flex-col items-center justify-center py-16 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid h-20 w-20 place-items-center rounded-full border border-gold-300/70 bg-white/70 text-gold-600 shadow-soft"
        >
          <SearchX size={28} strokeWidth={1.3} />
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mt-7"
        >
          {isTeacher ? '404 · Tabrik' : '404'}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-display text-[clamp(1.9rem,7vw,3rem)] font-medium text-navy"
        >
          {isTeacher ? 'Ustoz topilmadi' : 'Sahifa topilmadi'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-[46ch] text-[0.98rem] leading-[1.85] text-muted"
        >
          {isTeacher
            ? 'Kechirasing, bunday ustoz sahifasi topilmadi. Havola noto‘g‘ri kiritilgan yoki o‘zgargan bo‘lishi mumkin.'
            : 'Kechirasing, izlagan sahifangiz topilmadi. Balki bosh sahifadan davom etarsiz?'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <Link to="/" className="btn-primary">
            <ArrowLeft size={16} strokeWidth={1.7} />
            Bosh sahifaga qaytish
          </Link>
        </motion.div>

        {/* Yo'qotilgan bo'lsa — umumiy havolalar */}
        {isTeacher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 w-full"
          >
            <p className="text-xs uppercase tracking-ceremonial text-muted/80">
              Yoki shu ustozlardan birini tanlang
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {teachers.slice(0, 6).map((teacher) => (
                <Link
                  key={teacher.id}
                  to={`/teacher/${teacher.slug}`}
                  className="whitespace-nowrap rounded-full border border-line bg-white/70 px-4 py-2 text-sm text-navy/75
                             transition-colors duration-500 hover:border-gold-300 hover:text-gold-700"
                >
                  {fullName(teacher)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      <SiteFooter />
    </>
  )
}

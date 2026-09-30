import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fullName, type Teacher } from '../data/teachers'
import { TeacherPortrait } from './TeacherPortrait'

/** Ro'yxatdagi bitta ustoz kartochkasi */
export function TeacherCard({ teacher, index = 0 }: { teacher: Teacher; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay: Math.min(index, 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/teacher/${teacher.slug}`}
        className="paper group flex h-full flex-col items-center px-6 py-8 text-center transition-all duration-500
                   hover:-translate-y-1 hover:border-gold-300 hover:shadow-lift sm:py-9"
      >
        <TeacherPortrait teacher={teacher} size="md" />

        <h3 className="mt-5 whitespace-nowrap font-display text-base font-medium text-navy sm:text-lg">
          {fullName(teacher)}
        </h3>

        {teacher.patronymic && (
          <p className="mt-0.5 font-serif text-sm italic text-muted">{teacher.patronymic}</p>
        )}

        {teacher.subject && (
          <p className="mt-3 text-[0.68rem] uppercase tracking-soft text-gold-600">{teacher.subject}</p>
        )}

        <span
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-navy/70 transition-colors duration-500
                     group-hover:text-gold-600"
        >
          Tabrikni ochish
          <ArrowUpRight size={15} strokeWidth={1.6} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.div>
  )
}

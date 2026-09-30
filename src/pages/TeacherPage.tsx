import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Celebration, { type CelebrationHandle } from '../components/Celebration'
import { GreetingCard } from '../components/GreetingCard'
import { MusicToggle } from '../components/MusicToggle'
import { QrBlock } from '../components/QrBlock'
import { ShareActions } from '../components/ShareActions'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import { getTeacherBySlug } from '../data/teachers'
import { absoluteUrl } from '../lib/text'
import { NotFoundPage } from './NotFoundPage'

/** /teacher/:slug — shaxsiy tabrik sahifasi */
export function TeacherPage() {
  const { slug } = useParams<{ slug: string }>()
  const teacher = getTeacherBySlug(slug)

  // Topilmasa — chiroyli "Ustoz topilmadi" sahifasi
  if (!teacher) return <NotFoundPage variant="teacher" />

  return <TeacherGreeting teacherSlug={teacher.slug} />
}

function TeacherGreeting({ teacherSlug }: { teacherSlug: string }) {
  const celebration = useRef<CelebrationHandle>(null)
  const card = useRef<HTMLDivElement>(null)
  const teacher = getTeacherBySlug(teacherSlug)

  const url = absoluteUrl(`/teacher/${teacherSlug}`)

  // Tabrik ko'rinishi keyin — yumshoq tantana
  useEffect(() => {
    const timer = window.setTimeout(() => {
      celebration.current?.fire(70)
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [])

  const handleCelebrate = () => {
    celebration.current?.fire(90, { x: window.innerWidth / 2, y: window.innerHeight * 0.42 })
  }

  if (!teacher) return null

  return (
    <>
      <SiteHeader>
        <Link to="/" className="btn-quiet !px-4 !py-2 text-sm">
          <ArrowLeft size={15} strokeWidth={1.7} />
          <span className="hidden sm:inline">Bosh sahifa</span>
        </Link>
      </SiteHeader>

      <Celebration ref={celebration} />

      <main className="mx-auto w-[min(100%-2rem,1160px)] pb-16 pt-6 sm:pt-10">
        <GreetingCard ref={card} teacher={teacher} />

        {/* Amallar */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <ShareActions
            cardRef={card}
            url={url}
            fileName={`tabrik-${teacher.slug}`}
            onCelebrate={handleCelebrate}
          />

          <p className="mt-6 text-center text-sm text-muted">
            Bu tabrik {teacher.firstName} {teacher.lastName} uchun mehr bilan tayyorlangan
          </p>
        </motion.div>

        {/* QR */}
        <div className="mt-12 sm:mt-16">
          <QrBlock url={url} />
        </div>
      </main>

      <SiteFooter />
      <MusicToggle />
    </>
  )
}

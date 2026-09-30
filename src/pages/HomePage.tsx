import { motion } from 'framer-motion'
import { ArrowRight, ImageDown, QrCode, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeroEmblem } from '../components/HeroEmblem'
import { GoldDivider } from '../components/Ornaments'
import { Reveal } from '../components/Reveal'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import { TeacherCard } from '../components/TeacherCard'
import { teachers } from '../data/teachers'
import { splitWords } from '../lib/text'

const EASE = [0.22, 1, 0.36, 1] as const

const HERO_WORDS = splitWords('Ustoz — qalblarga yo‘l ko‘rsatuvchi inson.')
const HIGHLIGHT = new Set([3, 4])

const POINTS = [
  { icon: <QrCode size={15} strokeWidth={1.6} />, text: 'Har bir ustozga alohida havola' },
  { icon: <Share2 size={15} strokeWidth={1.6} />, text: 'QR kod bilan oson ulashish' },
  { icon: <ImageDown size={15} strokeWidth={1.6} />, text: 'Tabrikni rasmga saqlash' },
]

const REASONS = [
  {
    title: 'Bilim — zanjir',
    body: 'Ustoz o‘z tajribasini bizga bag‘ishlaydi. Bugun ular, ertaga biz o‘quvchilarga o‘tkazamiz. Bu zanjirni uzmaslik — hurmatning birinchi belgisi.',
  },
  {
    title: 'Mehnat — ko‘rinmas',
    body: 'Tayyorlanish, tekshirish, har bir savolga javob topish — bularni biz ko‘rmaymiz, lekin ularning mevasini har kun sezamiz. Ustozning bu ko‘rinmas mehnatiga minnatdormiz.',
  },
  {
    title: 'So‘z — uzoq esda qoladi',
    body: 'Ustozning aytgan bir jumlasi yillar o‘tsa-da yurakda qoladi. Bugun biz aytmoqchimiz: so‘zingiz hali ham esimizda va har doim qadrlanadi.',
  },
]

export function HomePage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-[min(100%-2rem,1160px)]">
        {/* ================= HERO ================= */}
        <section className="grid items-center gap-10 pb-6 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-10 lg:pt-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="eyebrow"
            >
              1-oktyabr · Ustoz va murabbiylar kuni
            </motion.p>

            <h1 className="mt-5 flex flex-wrap items-baseline gap-x-[0.26em] gap-y-1 font-display text-[clamp(2.1rem,8.2vw,4.1rem)] font-medium leading-[1.08] text-navy">
              {HERO_WORDS.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  className={
                    HIGHLIGHT.has(index)
                      ? 'font-serif italic text-gold-600'
                      : 'text-navy'
                  }
                  initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: 0.3 + index * 0.09, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease: EASE }}
              className="mt-6 max-w-[46ch] text-[1.02rem] leading-[1.8] text-ink/70 sm:text-[1.1rem]"
            >
              Ustoz va murabbiylar kuniga bag‘ishlangan, chin qalbdan yozilgan tabriklar. Har bir
              ustoz uchun alohida tayyorlangan shaxsiy sahifa — ismi, surati va samimiy tilaklar bilan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#ustozlar" className="btn-primary">
                Tabrikni ko‘rish
                <ArrowRight size={16} strokeWidth={1.7} />
              </a>
              <a href="#why" className="btn-quiet">
                Nima uchun?
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.25, ease: EASE }}
              className="mt-9 flex flex-wrap gap-x-6 gap-y-3"
            >
              {POINTS.map((point) => (
                <li key={point.text} className="flex items-center gap-2 text-sm text-muted">
                  <span className="text-gold-600">{point.icon}</span>
                  {point.text}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
            className="order-first lg:order-last"
          >
            <HeroEmblem />
          </motion.div>
        </section>

        {/* ================= NIMA UCHUN ================= */}
        <section id="why" className="py-16 sm:py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Nima uchun</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,5.4vw,2.5rem)] font-medium text-navy">
              Bugun aytgan so‘zimiz uzoq esda qoladi
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3">
            {REASONS.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 0.1}>
                <article className="paper h-full px-6 py-7 sm:px-7 sm:py-8">
                  <span className="font-display text-sm text-gold-500/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-medium text-navy">{reason.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-[1.8] text-muted">{reason.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-12 sm:mt-16">
            <div className="mx-auto max-w-2xl text-center">
              <GoldDivider className="mx-auto" />
              <p className="mt-6 font-serif text-[clamp(1.2rem,4.4vw,1.7rem)] italic leading-[1.6] text-navy/80">
                «Ustoz — kunning eng yorug‘ quyoshiday: qayerga kirsa, yaxshilik olib kiradi.»
              </p>
            </div>
          </Reveal>
        </section>

        {/* ================= USTOZLAR RO'YXATI ================= */}
        <section id="ustozlar" className="py-16 sm:py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Ustozlar ro‘yxati</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,5.4vw,2.5rem)] font-medium text-navy">
              Tanlang — tabrik o‘zi ochiladi
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[0.98rem] leading-[1.8] text-muted">
              Ustozni tanlang — uning shaxsiy tabriga o‘tasiz. Ism yoki parol kerak emas:
              sahifada tabrik allaqachon tayyor turibdi.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {teachers.map((teacher, index) => (
              <TeacherCard key={teacher.id} teacher={teacher} index={index} />
            ))}
          </div>
        </section>

        {/* ================= YAKUN ================= */}
        <section className="py-16 sm:py-24">
          <Reveal>
            <div className="paper grain mx-auto max-w-3xl overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
              <p className="eyebrow">Yana bir so‘z</p>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,5.6vw,2.6rem)] font-medium leading-[1.25] text-navy">
                Bugun faqat tabrik etsak, yetarlimi?
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[0.98rem] leading-[1.85] text-muted">
                Bugundan boshlab har kuni eslaymiz: ularni tinglaymiz, mehnatini qadrlaymiz va
                yaxshi so‘zni behuda qoldirmaymiz. Zero, ustozga eng katta hurmat — o‘z vaqtida
                aytilgan chin tabrikdir.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="#ustozlar" className="btn-primary">
                  Tabrikni ko‘rish
                  <ArrowRight size={16} strokeWidth={1.7} />
                </a>
                <Link to={`/teacher/${teachers[0].slug}`} className="btn-gold">
                  Namuna: {teachers[0].firstName} ustozning tabrigi
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}

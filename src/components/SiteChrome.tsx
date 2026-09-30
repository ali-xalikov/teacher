import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Flower2 } from 'lucide-react'

/** Saytning yuqori paneli — juda yengil, menyusiz */
export function SiteHeader({ children }: { children?: ReactNode }) {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        stuck ? 'border-b border-line/70 bg-cream/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex w-[min(100%-2rem,1160px)] items-center gap-4 py-3.5">
        <Link to="/" className="group flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 place-items-center rounded-full border border-gold-300/70 bg-white/70
                       text-gold-600 shadow-soft transition-transform duration-500 group-hover:rotate-[8deg]"
          >
            <Flower2 size={16} strokeWidth={1.6} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[0.95rem] font-medium text-navy">Ustoz va murabbiylar kuni</span>
            <span className="hidden text-[0.68rem] uppercase tracking-soft text-muted sm:block">
              Shaxsiy tabriklar
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">{children}</div>
      </div>
    </motion.header>
  )
}

/** Sayt oxiri */
export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-line/70 bg-cream-50/70 py-10 text-center">
      <div className="mx-auto w-[min(100%-2rem,1160px)]">
        <p className="font-display text-lg text-navy">Ustoz va murabbiylar kuni</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Har bir ustozga — alohida tabrik, alohida havola va alohida QR kod.
          Ustozga aytilgan yaxshi so‘z — eng chiroyli sovg‘adir.
        </p>
        <p className="mt-5 text-xs uppercase tracking-ceremonial text-muted/70">
          Maktabimiz · 1-oktyabr
        </p>
      </div>
    </footer>
  )
}

import { motion } from 'framer-motion'
import { ExternalLink, Heart, QrCode } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

/**
 * QR blok — joriy ustoz sahifasining havolasi.
 * Skanerlagandan keyin boshqa odam ham aynan shu
 * shaxsiy tabrikni ochadi.
 */
export function QrBlock({ url, delay = 0 }: { url: string; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="paper grain mx-auto max-w-2xl overflow-hidden px-6 py-8 text-center sm:px-10 sm:py-10"
      aria-label="QR kod orqali tabrikni saqlash"
    >
      <span
        className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-full bg-gold-100 text-gold-600"
        aria-hidden="true"
      >
        <QrCode size={20} strokeWidth={1.6} />
      </span>

      <h2 className="font-display text-xl font-medium text-navy sm:text-2xl">
        Bu tabrikni saqlab qo‘ying <Heart size={18} className="inline text-rose-400" fill="currentColor" />
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
        QR kodni skanerlasangiz, tabrik istalgan payt yana ochiladi. Do‘stlaringiz bilan
        ulashish ham oson.
      </p>

      <div className="mx-auto mt-7 inline-flex rounded-3xl border border-gold-300/70 bg-white p-4 shadow-soft">
        <QRCodeSVG
          value={url}
          size={148}
          bgColor="#FFFFFF"
          fgColor="#0E1A2B"
          level="M"
          marginSize={0}
        />
      </div>

      <p className="mt-5 break-all font-mono text-[0.7rem] leading-relaxed text-muted/80">{url}</p>

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="btn-quiet mt-3 !px-4 !py-2 text-sm"
      >
        <ExternalLink size={15} strokeWidth={1.6} />
        Havolani ochish
      </a>
    </motion.section>
  )
}

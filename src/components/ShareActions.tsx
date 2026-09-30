import { motion } from 'framer-motion'
import { Download, Loader2, PartyPopper, Share2 } from 'lucide-react'
import { useState, type RefObject } from 'react'
import { shareOrCopy } from '../lib/share'
import { useToast } from './ToastProvider'

interface ShareActionsProps {
  /** Tabrik kartasi (rasmga eksport qilinadigan element) */
  cardRef: RefObject<HTMLElement>
  url: string
  fileName: string
  onCelebrate: () => void
}

export function ShareActions({ cardRef, url, fileName, onCelebrate }: ShareActionsProps) {
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  const handleShare = async () => {
    const result = await shareOrCopy({
      title: 'Ustoz va murabbiylar kuni tabrigi',
      text: 'Ustoz va murabbiylar kuni muborak! Bu tabrikni ochib ko‘ring.',
      url,
    })

    if (result === 'copied') toast('Havola nusxalandi ✓')
    if (result === 'failed') toast('Kechirasing, ulashib bo‘lmadi 😔')
  }

  const handleDownload = async () => {
    const node = cardRef.current
    if (!node || busy) return

    setBusy(true)
    try {
      const { toPng } = await import('html-to-image')

      const options = {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#FBF7EF',
      }

      let dataUrl: string
      try {
        // Shriftlarni rasmga joylash (CORS ruxsat berilgan holatda)
        dataUrl = await toPng(node, options)
      } catch {
        // Shriftni joylashda muammo bo'lsa — shriftsiz ham saqlaymiz
        dataUrl = await toPng(node, { ...options, skipFonts: true })
      }

      const link = document.createElement('a')
      link.download = `${fileName}.png`
      link.href = dataUrl
      link.click()
      toast('Tabrik saqlandi ✓')
    } catch {
      toast('Kechirasing, rasmni saqlab bo‘lmadi 😔')
    } finally {
      setBusy(false)
    }
  }

  const item = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
    >
      <motion.button
        {...item}
        type="button"
        onClick={onCelebrate}
        className="btn-gold w-full sm:w-auto"
      >
        <PartyPopper size={17} strokeWidth={1.6} />
        Bayramona tabrik
      </motion.button>

      <motion.button
        {...item}
        type="button"
        onClick={handleShare}
        className="btn-primary w-full sm:w-auto"
      >
        <Share2 size={17} strokeWidth={1.6} />
        Ulashish
      </motion.button>

      <motion.button
        {...item}
        type="button"
        onClick={handleDownload}
        disabled={busy}
        className="btn-quiet w-full border border-line/80 bg-white/60 sm:w-auto"
      >
        {busy ? (
          <Loader2 size={17} strokeWidth={1.6} className="animate-spin" />
        ) : (
          <Download size={17} strokeWidth={1.6} />
        )}
        {busy ? 'Tayyorlanmoqda…' : 'Tabrikni saqlash'}
      </motion.button>
    </motion.div>
  )
}

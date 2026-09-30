import { motion } from 'framer-motion'
import { Music4, Volume2, VolumeX } from 'lucide-react'
import { useBackgroundMusic } from '../lib/useBackgroundMusic'
import { useToast } from './ToastProvider'

/**
 * Suzib turuvchi musiqa tugmasi.
 * Ovozli autoplay brauzerda bloklanadi — shuning uchun
 * musiqa faqat shu tugma bosilganda boshlanadi.
 */
export function MusicToggle({ src = '/music/teachers-day.mp3' }: { src?: string }) {
  const { playing, toggle, unavailable } = useBackgroundMusic(src)
  const toast = useToast()

  const onClick = () => {
    if (unavailable && !playing) {
      toast('🎵 Musiqa hozircha mavjud emas')
      return
    }
    toggle()
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.94 }}
      aria-label={playing ? 'Musiqani to‘xtatish' : 'Musiqani yoqish'}
      aria-pressed={playing}
      title={playing ? 'Musiqani to‘xtatish' : 'Musiqani yoqish'}
      className="veil fixed bottom-5 left-5 z-[100] grid h-12 w-12 place-items-center rounded-full
                 text-navy shadow-card transition-colors duration-500 hover:text-gold-600"
    >
      <span
        className={`pointer-events-none absolute inset-0 rounded-full border transition-opacity duration-500 ${
          playing ? 'border-gold-400/70 opacity-100' : 'border-gold-300/40 opacity-60'
        }`}
      />
      {playing ? (
        <Volume2 size={20} strokeWidth={1.6} className="relative" />
      ) : (
        <VolumeX size={20} strokeWidth={1.6} className="relative" />
      )}
    </motion.button>
  )
}

/** Sahifa burchagidagi kichkina musiqa belgisi (bezak sifatida) */
export function MusicGlyph() {
  return <Music4 size={14} strokeWidth={1.6} className="text-gold-600" />
}

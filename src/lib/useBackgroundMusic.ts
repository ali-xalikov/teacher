import { useCallback, useEffect, useRef, useState } from 'react'

interface BackgroundMusic {
  /** Hozir musiqa o'ynayaptimi */
  playing: boolean
  /** Musiqani yoqish / to'xtatish */
  toggle: () => void
  /** Fayl yuklanmadi (masalan, /music fayli qo'yilmagan) */
  unavailable: boolean
}

/**
 * Fon musiqasi.
 * MUHIM: brauzer ovozli autoplay'ni bloklaydi — shuning uchun
 * fayl AVTOMATIK ishga tushmaydi. Faqat foydalanuvchi tugmani
 * bosganda musiqa boshlanadi.
 */
export function useBackgroundMusic(src: string): BackgroundMusic {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'none'
    audio.volume = 0

    const onError = () => setUnavailable(true)
    audio.addEventListener('error', onError)

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener('error', onError)
      if (fadeRef.current) window.clearInterval(fadeRef.current)
      audioRef.current = null
    }
  }, [src])

  /** Sekin ochilish — qo'pol emas, yumshoq */
  const fadeTo = useCallback((target: number, step: number) => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeRef.current) window.clearInterval(fadeRef.current)
    fadeRef.current = window.setInterval(() => {
      if (!audioRef.current) return
      const next = audioRef.current.volume + step * Math.sign(target - audioRef.current.volume)
      audioRef.current.volume = Math.abs(next - target) < Math.abs(step) ? target : next
      if (audioRef.current.volume === target && fadeRef.current) {
        window.clearInterval(fadeRef.current)
        fadeRef.current = null
      }
    }, 60)
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      setUnavailable(false)
      audio
        .play()
        .then(() => {
          setPlaying(true)
          fadeTo(0.32, 0.04)
        })
        .catch(() => {
          setPlaying(false)
          setUnavailable(true)
        })
    } else {
      fadeTo(0, 0.06)
      const target = audio
      window.setTimeout(() => {
        target.pause()
        setPlaying(false)
      }, 500)
    }
  }, [fadeTo])

  return { playing, toggle, unavailable }
}

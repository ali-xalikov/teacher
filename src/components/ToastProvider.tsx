import { AnimatePresence, motion } from 'framer-motion'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

interface ToastItem {
  id: number
  message: string
}

type ToastFn = (message: string) => void

const ToastContext = createContext<ToastFn | null>(null)

/** Xabarni ko'rsatish: toast('Havola nusxalandi ✓') */
export function useToast(): ToastFn {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast faqat ToastProvider ichida ishlatiladi')
  return ctx
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const counter = useRef(0)

  const push = useCallback<ToastFn>((message) => {
    counter.current += 1
    const id = counter.current
    setItems((prev) => [...prev, { id, message }])
    window.setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }, 3200)
  }, [])

  const value = useMemo(() => push, [push])

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[120] flex flex-col items-center gap-2 px-4"
        role="status"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto rounded-full border border-gold-300/60 bg-cream-50/95 px-5 py-2.5
                         text-sm font-medium text-navy shadow-card backdrop-blur"
            >
              {item.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

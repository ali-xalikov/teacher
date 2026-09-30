import { cn } from '../lib/cn'

/** Burchakdagi nozik tilla naqshi */
export function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={cn('pointer-events-none absolute h-16 w-16 text-gold-400/70 sm:h-20 sm:w-20', className)}
    >
      <path
        d="M2 78V22C2 10.954 10.954 2 22 2h56"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M10 78V26C10 17.163 17.163 10 26 10h52"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <circle cx="24" cy="24" r="2.4" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

/** Markaziy bezak: chiziq — yulduz — chiziq */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-3', className)} aria-hidden="true">
      <span className="h-px w-16 bg-gold-hairline sm:w-24" />
      <span className="relative grid h-2 w-2 place-items-center">
        <span className="absolute h-3 w-3 rotate-45 border border-gold-400/80" />
      </span>
      <span className="h-px w-16 bg-gold-hairline sm:w-24" />
    </div>
  )
}

/** Kichkina yulduz to'plami */
export function SparkleCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" aria-hidden="true" className={className}>
      <path d="M18 30c6-9 10 9 16 0s10 9 16 0" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="30" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="74" cy="22" r="1.6" fill="currentColor" opacity="0.5" />
      <circle cx="88" cy="34" r="1.2" fill="currentColor" opacity="0.4" />
      <path d="M96 30c4-6 7 6 11 0" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

import { useReducedMotion } from 'framer-motion'
import { GlowParticles } from './GlowParticles'
import { Petals } from './Petals'

/**
 * Butun sayt orqasidagi qatlamlar:
 * krem asos · yumshoq nur · donador qog'oz · nozik zarralar · g'unchalar.
 */
export function SiteBackground() {
  const reduce = Boolean(useReducedMotion())

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Asos: juda yengil, iliq yorug'lik */}
        <div className="absolute inset-0 bg-cream" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.9),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_12%_8%,rgba(200,162,74,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_92%_18%,rgba(63,93,76,0.12),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_105%,rgba(200,162,74,0.14),transparent_60%)]" />

        <GlowParticles count={reduce ? 0 : 20} />
        <Petals count={reduce ? 0 : 12} reduce={reduce} />

        {/* Qog'oz donadorligi */}
        <div className="grain absolute inset-0 opacity-[0.35]" />

        {/* Pastki yumshoq chegara */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/70 to-transparent" />
      </div>
    </>
  )
}

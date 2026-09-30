import type { Config } from 'tailwindcss'

/**
 * Dizayn tokenlari: krem, oq, yumshoq tilla, to'q navy va yashil.
 * Premium, iliq va kam gradientli palitra.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FBF7EF',
          50: '#FEFCF8',
          100: '#FBF7EF',
          200: '#F5EDDE',
          300: '#EDE1C9',
        },
        gold: {
          DEFAULT: '#C8A24A',
          50: '#FBF5E7',
          100: '#F6EDD8',
          200: '#EBD9AE',
          300: '#DCC182',
          400: '#C8A24A',
          500: '#B08C33',
          600: '#8E6F24',
        },
        navy: {
          DEFAULT: '#0E1A2B',
          800: '#101E31',
          700: '#16273C',
          600: '#1D3450',
          500: '#2A4361',
        },
        sage: {
          DEFAULT: '#3F5D4C',
          light: '#6C8A76',
          pale: '#EDF2EC',
        },
        ink: '#1A2430',
        muted: '#6E7B87',
        line: '#E6DCC8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        ceremonial: '0.3em',
        soft: '0.18em',
      },
      boxShadow: {
        card: '0 28px 70px -30px rgba(14, 26, 43, 0.35)',
        soft: '0 14px 36px -18px rgba(14, 26, 43, 0.25)',
        lift: '0 40px 90px -40px rgba(14, 26, 43, 0.45)',
        gold: '0 0 0 1px rgba(200, 162, 74, 0.28), 0 30px 70px -34px rgba(142, 111, 36, 0.55)',
        inner: 'inset 0 1px 0 rgba(255, 255, 255, 0.7)',
      },
      backgroundImage: {
        'gold-hairline':
          'linear-gradient(90deg, transparent 0%, rgba(200,162,74,0.55) 22%, rgba(200,162,74,0.85) 50%, rgba(200,162,74,0.55) 78%, transparent 100%)',
        'gold-sheet':
          'linear-gradient(160deg, #FFFDF8 0%, #FBF7EF 45%, #F6EDD8 100%)',
        'navy-sheet': 'linear-gradient(165deg, #16273C 0%, #0E1A2B 100%)',
      },
      keyframes: {
        petalFall: {
          '0%': { transform: 'translate3d(0, -10vh, 0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translate3d(6vw, 108vh, 0) rotate(420deg)', opacity: '0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
          '50%': { transform: 'scale(1.06)', opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        slowSpin: {
          to: { transform: 'rotate(360deg)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        petal: 'petalFall linear infinite',
        breathe: 'breathe 6s ease-in-out infinite',
        shimmer: 'shimmer 9s linear infinite',
        'slow-spin': 'slowSpin 44s linear infinite',
        floaty: 'floaty 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config

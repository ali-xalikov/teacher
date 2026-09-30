/** Matnni harflarga bo'ladi — ismni bosqichma-bosqich ochish uchun */
export function splitChars(text: string): string[] {
  return Array.from(text)
}

/** Matnni so'zlarga bo'ladi */
export function splitWords(text: string): string[] {
  return text.split(' ')
}

/** Istalgan havolani joriy sahifaga asoslangan holda to'liq qiladi */
export function absoluteUrl(path: string): string {
  if (typeof window === 'undefined') return path
  return `${window.location.origin}${path}`
}

export type ClassValue = string | false | null | undefined

/** Kichik classlar yordamchisi (clsx o'rniga, tashqi paket'siz) */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}

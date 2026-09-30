export type ShareResult = 'shared' | 'copied' | 'failed'

export interface SharePayload {
  title: string
  text: string
  url: string
}

/**
 * Matnni buferga nusxalaydi.
 * Zaxira yo'l: eskirgan `document.execCommand('copy')`.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* quyidagi zaxiraviy yo'lga o'tamiz */
  }

  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(area)
    return ok
  } catch {
    return false
  }
}

/**
 * Web Share API mavjud bo'lsa — undan foydalanadi,
 * aks holda havolani nusxalaydi.
 */
export async function shareOrCopy(payload: SharePayload): Promise<ShareResult> {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share(payload)
      return 'shared'
    } catch (error) {
      // Foydalanuvchi bekor qilgan bo'lishi mumkin — nusxalashga o'tmaymiz
      if (error instanceof DOMException && error.name === 'AbortError') return 'shared'
    }
  }

  const copied = await copyToClipboard(payload.url)
  return copied ? 'copied' : 'failed'
}

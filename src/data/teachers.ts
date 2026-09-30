/**
 * ============================================================
 *  USTOZLAR MA'LUMOTLARI
 * ============================================================
 *  Bu — butun saytning yagona ma'lumot manbai. UI bilan
 *  bog'liqligi yo'q: kelgusi versiyalarda shu faylni API
 *  (fetch/axios) bilan almashtirish yetarli.
 *
 *  Yangi ustoz qo'shish: ro'yxatga bitta ob'ekt qo'shing.
 *  `slug` — URL manzili: /teacher/{slug}
 *  `photo` — ixtiyoriy. Rasm yo'q bo'lsa, avtomatik
 *  bosh harflar (initial) ko'rsatiladi.
 * ============================================================
 */

export interface Teacher {
  id: number
  /** URL manzili: /teacher/shodiyona-shoymurodovna */
  slug: string
  firstName: string
  lastName: string
  /** Otasining ismi (masalan: Akmalovna / Bahodirovich) */
  patronymic?: string
  /** Fan nomi */
  subject?: string
  /** Rasm manzili, ixtiyoriy: /teachers/dilnoza.jpg */
  photo?: string
  /** Qisqa tabrik izohi (ixtiyoriy) */
  note?: string
}

export const teachers: Teacher[] = [
  {
    id: 1,
    slug: 'shodiyona-shoymurodovna',
    firstName: 'Shodiyona',
    lastName: 'Shoymurodovna',
    patronymic: 'Ozodovna',
  },
  {
    id: 2,
    slug: 'dildora-shaymardonova',
    firstName: 'Dildora',
    lastName: 'Shaymardonova',
    patronymic: 'Ural qizi',
  },
  {
    id: 3,
    slug: 'yulduz-rajabova',
    firstName: 'Yulduz',
    lastName: 'Rajabova',
    patronymic: 'Alisherovna',
  },
  {
    id: 4,
    slug: 'tursinoy-haydarova',
    firstName: 'Tursinoy',
    lastName: 'Haydarova',
    patronymic: 'Temirovna',
  },
  {
    id: 5,
    slug: 'feruzaxon-asrorova',
    firstName: 'Feruzaxon',
    lastName: 'Asrorova',
    patronymic: 'Abdulxayevna',
  },
  {
    id: 6,
    slug: 'ramiz-xushnayev',
    firstName: 'Ramiz',
    lastName: 'Xushnayev',
    patronymic: 'Naimovich',
  },
  {
    id: 7,
    slug: 'shuhrat-muhiddinov',
    firstName: 'Shuhrat',
    lastName: 'Muhiddinov',
    patronymic: 'Narzullayevich',
  },
  {
    id: 8,
    slug: 'gulnoza-eshonqulova',
    firstName: 'Gulnoza',
    lastName: 'Eshonqulova',
    patronymic: 'Nu’manovna',
  },
  {
    id: 9,
    slug: 'xurshida-sanayeva',
    firstName: 'Xurshida',
    lastName: 'Sanayeva',
    patronymic: 'Muratovna',
  },
  {
    id: 10,
    slug: 'zulfiya-bazarova',
    firstName: 'Zulfiya',
    lastName: 'Bazarova',
    patronymic: 'Kurbanovna',
  },
  {
    id: 11,
    slug: 'dilnavoz-ismatova',
    firstName: 'Dilnavoz',
    lastName: 'Ismatova',
    patronymic: 'Ro‘ziboy qizi',
  },
  {
    id: 12,
    slug: 'baxodir-xayitov',
    firstName: 'Baxodir',
    lastName: 'Xayitov',
    patronymic: 'Ziyatovich',
  },
  {
    id: 13,
    slug: 'nilufar-tursunova',
    firstName: 'Nilufar',
    lastName: 'Tursunova',
    patronymic: 'Akbarovna',
  },
  {
    id: 14,
    slug: 'sadoqat-xusanova',
    firstName: 'Sadoqat',
    lastName: 'Xusanova',
    patronymic: 'Nomozovna',
  },
]

/** To‘liq ism: "Shodiyona Shoymurodovna" */
export function fullName(teacher: Pick<Teacher, 'firstName' | 'lastName'>): string {
  return `${teacher.firstName} ${teacher.lastName}`
}

/** Bosh harflar: "DK" */
export function initials(teacher: Pick<Teacher, 'firstName' | 'lastName'>): string {
  return `${teacher.firstName.charAt(0)}${teacher.lastName.charAt(0)}`.toUpperCase()
}

/** Slug bo‘yicha ustozni topadi (topilmasa undefined) */
export function getTeacherBySlug(slug: string | undefined): Teacher | undefined {
  if (!slug) return undefined
  const key = slug.trim().toLowerCase()
  return teachers.find((teacher) => teacher.slug.toLowerCase() === key)
}

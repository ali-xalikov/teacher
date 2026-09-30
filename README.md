# 🌷 Ustoz va murabbiylar kuni — shaxsiy tabrik sayti

Har bir ustoz uchun **alohida shaxsiy tabrik sahifasi**.
Ustoz o‘z havolasini (yoki QR kodini) ochishi yetarli — ismni kiritish shart emas,
sayfada uning ismi, otasining ismi, fani va surati **avtomatik** ko‘rinadi.

```
/                              — umumiy bosh sahifa (landing)
/teacher/shodiyona-shoymurodovna — shaxsiy tabrik
/teacher/unknown-person        — "Ustoz topilmadi"
```

---

## Texnologiyalar

| | |
| --- | --- |
| React 18 + TypeScript (strict) | Vite 5 |
| Tailwind CSS 3 | React Router 6 |
| Framer Motion 11 | Lucide React |
| `qrcode.react` (QR kod) | `html-to-image` (rasmga saqlash) |

---

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
```

| Skript | Vazifasi |
| --- | --- |
| `npm run dev` | Ishlab chiqarish rejimi |
| `npm run build` | `tsc` tekshiruvi + ishlab chiqarish (`dist/`) |
| `npm run preview` | Tayyor versiyani ko‘rish (port 4173) |
| `npm run typecheck` | Faqat TypeScript tekshiruvi |

---

## Yangi ustoz qo‘shish

Bitta joy: **`src/data/teachers.ts`**

```ts
export interface Teacher {
  id: number
  slug: string          // /teacher/{slug}
  firstName: string
  lastName: string
  patronymic?: string   // Akmalovna
  subject?: string      // Matematika
  photo?: string        // /teachers/shodiyona-shoymurodovna.jpg
  note?: string
}
```

Ro‘yxatga yangi ob’ekt qo‘shsangiz — sayfada, ro‘yxatda, QR kodda va
404 sahifasidagi tavsiyalarda **avtomatik** paydo bo‘ladi.
20, 50 yoki 100 ta ustoz qo‘shish uchun bir xil ishlaydi.

> Keyin API bilan almashtirmoqchi bo‘lsangiz: `getTeacherBySlug()` va
> `teachers` eksportlarini `fetch()` bilan almashtiring — UI o‘zgarmaydi.

---

## Fayl tuzilmasi

```
src/
├── data/teachers.ts        # ← barcha ma’lumot shu yerda
├── lib/
│   ├── cn.ts               # classlar yordamchisi
│   ├── share.ts            # Web Share API + clipboard
│   ├── text.ts             # matn bo‘lish, absolute URL
│   └── useBackgroundMusic.ts
├── components/
│   ├── SiteBackground.tsx  # fon qatlamlari (nur, don, zarralar)
│   ├── Petals.tsx          # yuguruvchi g‘unchalar
│   ├── GlowParticles.tsx   # yumshoq zarralar
│   ├── HeroEmblem.tsx      # bosh sahifa belgisi
│   ├── GreetingCard.tsx    # ★ shaxsiy tabrik kartasi (eksport qilinadi)
│   ├── TeacherPortrait.tsx # rasm yoki bosh harflar
│   ├── Celebration.tsx     # tilla tantana (canvas)
│   ├── ShareActions.tsx    # bayramona / ulashish / saqlash
│   ├── QrBlock.tsx         # QR kod
│   ├── MusicToggle.tsx     # 🎵 suzib turuvchi tugma
│   ├── SiteChrome.tsx      # header + footer
│   ├── Ornaments.tsx       # tilla bezaklar
│   ├── Reveal.tsx          # scroll ochilish
│   └── ToastProvider.tsx   # «Havola nusxalandi ✓»
└── pages/
    ├── HomePage.tsx
    ├── TeacherPage.tsx
    └── NotFoundPage.tsx
```

---

## Tabrik sahifasidagi funksiyalar

* **Shaxsiy tabrik** — «Hurmatli» → ism (har bir harf alohida ochiladi) → otasining ismi
* **Tantana** — tabrik ko‘rinishi keyin yumshoq tilla zarralar (1.5 s dan keyin)
* **🎉 Bayramona tabrik** — qo‘lda qo‘shimcha tantana
* **Ulashish** — Web Share API, yo‘q bo‘lsa havolani nusxalaydi
* **Tabrikni saqlash** — kartani PNG rasmga eksport qilib yuklab oladi
* **QR kod** — joriy sahifa havolasi, boshqa odam skanerlab ochadi
* **🎵 Musiqa** — qo‘lda yoqiladigan sekin fon musiqasi
* **Barchasi ekranga mos** — ism hech qachon ekrandan chiqib ketmaydi

---

## Rasm va musiqa qo‘shish

* Ustoqlar rasmlari → `public/teachers/` (batafsil: `public/teachers/README.md`)
* Fon musiqasi → `public/music/teachers-day.mp3` (batafsil: `public/music/README.md`)

Rasm yo‘q bo‘lsa yoki yuklanmasa — avtomatik ravishda bosh harflar (DK, AN …) chiqadi.

---

## Deploy (ishga tayyor)

SPA marshrutlash uchun `index.html` ga qaytarish kerak:

* **Netlify** — `public/_redirects` allaqachon tayyor
* **Vercel** — `vercel.json` allaqachon tayyor
* **Nginx** — `try_files $uri $uri/ /index.html;`
* **GitHub Pages** — `base` ni `repo` nomiga o‘zgartiring (`vite.config.ts`)

```bash
npm run build      # dist/ papkasi tayyor
```

---

## Dizayn

Krem · oq · yumshoq tilla · to‘q navy · yashil.
Ko‘p gradient, ko‘p glassmorphism va sakrash effektlari ishlatilmagan —
animatsiyalar sekin, premium va xotirjam.

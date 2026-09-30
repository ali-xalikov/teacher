# USTOZLAR RASMLARI

Bu papkaga har bir ustozning rasmini qo‘ying.

**Fayl nomi = slug.** Masalan:

| Slug (`teachers.ts`) | Rasm fayli |
| --- | --- |
| `shodiyona-shoymurodovna` | `public/teachers/shodiyona-shoymurodovna.jpg` |
| `dildora-shaymardonova` | `public/teachers/dildora-shaymardonova.jpg` |
| `yulduz-rajabova` | `public/teachers/yulduz-rajabova.jpg` |

Tavsiya:

* **Kvadrat (1:1)**, kamida `600×600` px
* JPG yoki WebP, fayl hajmi **200 KB dan kichik**
* Rasmga avval **yuzani markazga** olib tasvirlang — aylanma ramka uchun qulay

## Rasmni olib tashlash

1. Rasmni shu papkaga (`public/teachers/`) saqlang.
2. `src/data/teachers.ts` faylida `photo` maydoni allaqaeron yo‘lni ko‘rsatayotgan bo‘lsa, yangilang.

Rasmni olib tashlasangiz yoki fayl topilmasa — sayt **avtomatik ravishda**
bosh harflar bilan avatar ko‘rsatadi (`DK`, `AN` va h.k.), hech qanday xato chiqmaydi.

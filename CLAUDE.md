# CLAUDE.md — KangPaket Web

> Landing page + download page untuk KangPaket (open source)
> Deploy otomatis ke GitHub Pages via GitHub Actions.
> **Stack: Astro + Tailwind CSS**

---

## 1. Project Overview

Website publik untuk KangPaket — menampilkan landing page, fitur-fitur app, screenshot, dan link download release terbaru dari GitHub Releases.

### Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **Astro 4** | Static output, zero JS by default, komponen-based |
| Styling | **Tailwind CSS v3** | Utility-first, tidak perlu custom CSS manual |
| Hosting | **GitHub Pages** | Gratis, auto-deploy dari repo yang sama |
| CI/CD | **GitHub Actions** | Build + deploy otomatis setiap push ke `main` |
| Icons | **Lucide Icons** (via CDN) | Ringan, konsisten |
| Font | **Inter** (Google Fonts) | Bersih, readable |

### Kenapa bukan Next.js?
Website ini sepenuhnya static — tidak ada login, tidak ada API call saat runtime, tidak ada user-specific content. Astro menghasilkan pure HTML/CSS yang di-serve Nginx/CDN tanpa Node.js process. Lebih cepat, lebih murah, lebih simpel.

---

## 2. Struktur Direktori

```
kangpaket-web/
├── CLAUDE.md
├── README.md
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions: build + deploy ke gh-pages
│
├── public/
│   ├── favicon.ico
│   ├── favicon.png
│   ├── og-image.png            # Open Graph image (1200x630)
│   └── screenshots/
│       ├── main-window.png
│       ├── runner.png
│       └── postman-import.png
│
└── src/
    ├── layouts/
    │   └── BaseLayout.astro    # HTML shell: meta tags, fonts, navbar, footer
    │
    ├── pages/
    │   ├── index.astro         # Landing page utama
    │   └── changelog.astro     # Halaman changelog / release notes
    │
    └── components/
        ├── Navbar.astro
        ├── Hero.astro
        ├── Features.astro
        ├── Screenshots.astro
        ├── Download.astro
        ├── Footer.astro
        └── ChangelogEntry.astro
```

---

## 3. Halaman & Konten

### 3.1 `src/pages/index.astro` — Landing Page

Urutan section dari atas ke bawah:

1. **Navbar** — logo KangPaket + nav links (Features, Download, Changelog, GitHub)
2. **Hero** — tagline, sub-tagline, dua tombol CTA, screenshot utama
3. **Features** — grid 6 fitur unggulan
4. **Screenshots** — carousel/grid screenshot app
5. **Download** — tombol download per platform
6. **Footer** — link GitHub, license, versi

---

### 3.2 Konten Hero

```
Tagline:   "API Client Ringan untuk Tim Internal"
Sub:       "Alternatif Postman yang berjalan offline, tanpa langganan,
            dan bisa di-customize sesuai kebutuhan tim."

CTA 1:  [⬇ Download for Windows]  → anchor ke section #download
CTA 2:  [★ Star on GitHub]        → https://github.com/<user>/kangpaket
```

---

### 3.3 Konten Features (6 item)

| Icon | Judul | Deskripsi |
|---|---|---|
| `Zap` | Ringan & Cepat | Binary single-file, startup < 1 detik, RAM minimal |
| `Globe` | Semua HTTP Method | GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS |
| `Shield` | Berjalan Offline | Tidak butuh internet, data tersimpan lokal |
| `Play` | Collection Runner | Jalankan banyak request sekaligus dengan assertions |
| `Upload` | Import dari Postman | Import koleksi Postman v2.0 & v2.1 langsung |
| `Download` | Export Profil | Bagikan koleksi request ke anggota tim via JSON |

---

### 3.4 Konten Download Section

Tampilkan tombol download per platform yang mengambil URL dari GitHub Releases terbaru:

```
[⬇ Download for Windows (.exe)]   → https://github.com/<user>/kangpaket/releases/latest/download/KangPaket.exe
[⬇ Download for Linux]            → https://github.com/<user>/kangpaket/releases/latest/download/KangPaket
[⬇ Download for macOS]            → https://github.com/<user>/kangpaket/releases/latest/download/KangPaket.dmg

Versi saat ini: v1.0.1  (ditampilkan sebagai static string, update manual)
```

Tambahkan catatan kecil di bawah:
```
"Windows: mungkin muncul SmartScreen warning — klik 'More info' → 'Run anyway'.
 Ini karena app belum code-signed. Source code tersedia di GitHub."
```

---

### 3.5 `src/pages/changelog.astro` — Changelog

List release notes per versi menggunakan komponen `ChangelogEntry`:

```astro
<ChangelogEntry version="1.0.1" date="2025-03-01">
  - Fix: PyInstaller bundle tidak menyertakan customtkinter
  - Fix: httpx hidden import pada Windows build
</ChangelogEntry>

<ChangelogEntry version="1.0.0" date="2025-02-15">
  - Initial release
  - HTTP request builder (semua method, auth, body types)
  - Collection Runner dengan 7 assertions
  - Import dari Postman Collection v2.0 & v2.1
  - Export/import profil JSON
</ChangelogEntry>
```

---

## 4. Komponen Detail

### 4.1 `src/layouts/BaseLayout.astro`

```astro
---
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}
const {
  title,
  description = "API client desktop ringan untuk tim internal. Alternatif Postman offline.",
  ogImage = "/og-image.png"
} = Astro.props;
---
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} — KangPaket</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:type" content="website" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" />

  <!-- Font: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
<body class="bg-gray-950 text-gray-100 font-sans antialiased">
  <slot />
</body>
</html>
```

### 4.2 `src/components/Navbar.astro`

- Logo KangPaket (teks + icon) — kiri
- Nav links: Features | Screenshots | Download | Changelog — tengah
- Tombol GitHub dengan icon bintang — kanan
- Sticky top, backdrop blur
- Mobile: hamburger menu collapse

### 4.3 `src/components/Hero.astro`

- Background: dark dengan subtle gradient atau grid pattern
- Tagline: font besar (text-5xl / text-6xl), font-weight 600
- Sub-tagline: text-xl, text-gray-400
- Dua tombol CTA (primary + secondary)
- Screenshot app di bawah teks, dengan shadow dan rounded corner
- Animasi: fade-in sederhana via Tailwind `animate-fade-in` atau CSS

### 4.4 `src/components/Features.astro`

- Grid 3 kolom (desktop) / 2 kolom (tablet) / 1 kolom (mobile)
- Setiap card: icon + judul + deskripsi
- Background card: `bg-gray-900` border `border-gray-800`
- Icon: SVG inline atau Lucide via CDN

### 4.5 `src/components/Screenshots.astro`

- Grid 3 screenshot dengan caption
- Klik → lightbox sederhana (opsional, bisa plain img dulu)
- Screenshot diberi border + shadow + rounded untuk terlihat seperti app window

### 4.6 `src/components/Download.astro`

- Judul section: "Download KangPaket"
- 3 tombol platform dalam satu row (desktop) / stack (mobile)
- Versi dan tanggal release
- Catatan SmartScreen warning untuk Windows
- Link ke GitHub Releases untuk lihat semua versi

### 4.7 `src/components/Footer.astro`

- Logo + tagline singkat — kiri
- Link: GitHub | Changelog | License (MIT) — kanan
- Copyright: `© 2025 KangPaket — Open Source under MIT License`

---

## 5. Konfigurasi File

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/kangpaket',       // sesuaikan dengan nama repo
  integrations: [tailwind()],
  output: 'static',         // pure static output
});
```

> Ganti `<username>` dengan GitHub username dan `/kangpaket` dengan nama repo.
> Jika repo bernama `<username>.github.io`, hapus `base` (deploy ke root domain).

### `tailwind.config.mjs`

```js
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#49cc90',   // warna hijau KangPaket (POST color)
          dark: '#1D9E75',
        }
      }
    }
  }
}
```

### `package.json`

```json
{
  "name": "kangpaket-web",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## 6. GitHub Actions — Auto Deploy

### `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:        # bisa trigger manual dari GitHub UI

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build Astro site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Cara kerja:**
- Setiap push ke branch `main` → GitHub Actions otomatis build Astro → deploy ke GitHub Pages
- Build time: ~30–60 detik
- Tidak perlu server, tidak perlu VPS, tidak perlu konfigurasi manual apapun setelah setup awal

---

## 7. Setup GitHub Pages (Sekali Saja)

Setelah repo di-push ke GitHub:

1. Buka repo di GitHub → **Settings** → **Pages**
2. Di bagian **Build and deployment**:
   - Source: pilih **GitHub Actions**
3. Push ke branch `main` → Actions akan jalan otomatis
4. URL hasil deploy: `https://<username>.github.io/<nama-repo>/`

---

## 8. Design System

### Warna (dark theme)

```
Background utama:   #030712  (gray-950)
Background card:    #111827  (gray-900)
Border card:        #1f2937  (gray-800)
Teks utama:         #f9fafb  (gray-50)
Teks sekunder:      #9ca3af  (gray-400)
Teks muted:         #4b5563  (gray-600)
Aksen brand:        #49cc90  (hijau KangPaket)
Aksen hover:        #1D9E75
```

### Typography

```
Heading H1:  text-5xl md:text-6xl font-semibold
Heading H2:  text-3xl font-semibold
Heading H3:  text-xl font-medium
Body:        text-base text-gray-300 leading-relaxed
Muted:       text-sm text-gray-400
Code/mono:   font-mono text-sm
```

### Tombol

```
Primary:   bg-brand hover:bg-brand-dark text-gray-950 font-medium px-6 py-3 rounded-lg
Secondary: border border-gray-700 hover:border-gray-500 text-gray-300 px-6 py-3 rounded-lg
```

---

## 9. Sprint Plan

### Sprint 1 — Setup & Hero
**Goal:** Astro berjalan, hero section tampil, auto-deploy ke GitHub Pages.

- [ ] Init Astro project: `npm create astro@latest`
- [ ] Install Tailwind: `npx astro add tailwind`
- [ ] Setup `astro.config.mjs` dengan `site` dan `base` yang benar
- [ ] Implement `BaseLayout.astro` (meta tags, font, body wrapper)
- [ ] Implement `Navbar.astro` (logo, nav links, GitHub button)
- [ ] Implement `Hero.astro` (tagline, sub, 2 CTA buttons)
- [ ] Implement `Footer.astro`
- [ ] Setup `.github/workflows/deploy.yml`
- [ ] Push ke GitHub → verifikasi GitHub Pages live
- [ ] **Test:** Buka `https://<username>.github.io/<repo>/` → halaman tampil

### Sprint 2 — Features & Screenshots
**Goal:** Konten utama lengkap.

- [ ] Implement `Features.astro` (grid 6 fitur + icons)
- [ ] Siapkan file screenshot di `public/screenshots/`
- [ ] Implement `Screenshots.astro` (grid 3 screenshot + caption)
- [ ] Polish mobile responsiveness semua section
- [ ] Tambah smooth scroll antar section

### Sprint 3 — Download & Changelog
**Goal:** User bisa langsung download dan lihat history.

- [ ] Implement `Download.astro` (3 tombol platform + catatan SmartScreen)
- [ ] Buat `src/pages/changelog.astro`
- [ ] Implement `ChangelogEntry.astro` component
- [ ] Isi changelog dengan release notes dari v1.0.0 dan v1.0.1
- [ ] Tambah link "View all releases" ke GitHub Releases

### Sprint 4 — Polish & SEO
**Goal:** Site siap publik, SEO oke.

- [ ] Buat `public/og-image.png` (1200x630 untuk social share)
- [ ] Pastikan semua meta tags terisi di BaseLayout
- [ ] Tambah `public/robots.txt` dan `public/sitemap.xml`
  (Astro punya integration `@astrojs/sitemap` — tambahkan)
- [ ] Cek Lighthouse score (target: Performance 95+)
- [ ] Cek tampilan mobile di berbagai ukuran layar
- [ ] Review semua teks konten

---

## 10. Workflow Update Konten

### Update link download (setiap rilis baru):
Edit `src/components/Download.astro` → update string versi.

URL download via `releases/latest/download/` otomatis mengarah ke release terbaru — tidak perlu update URL, hanya update label versi.

### Update changelog:
Edit `src/pages/changelog.astro` → tambah `<ChangelogEntry>` baru di paling atas.

### Deploy:
Cukup `git push origin main` → GitHub Actions otomatis build + deploy. Selesai.

---

## Notes untuk Claude Code

1. **Astro reference:** https://docs.astro.build
2. **Tailwind reference:** https://tailwindcss.com/docs
3. **Ganti semua `<username>` dan `<nama-repo>`** di `astro.config.mjs` dan workflow sebelum push.
4. **Jika repo bernama `<username>.github.io`** (user/org page): hapus `base` dari `astro.config.mjs` dan URL deploy menjadi `https://<username>.github.io/` tanpa subfolder.
5. **Screenshot belum ada?** Buat placeholder dulu di `public/screenshots/` — isi dengan screenshot nyata setelah app selesai.
6. **Tailwind dark mode** sudah default karena `bg-gray-950` dipakai di body — tidak perlu config `darkMode`.
7. **Untuk test lokal:** `npm run dev` → buka `http://localhost:4321`

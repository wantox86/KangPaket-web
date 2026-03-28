# KangPaket — Website

Public website for [KangPaket](https://github.com/wantox86/KangPaket), a lightweight offline API client for internal teams.

**Live:** https://wantox86.github.io/KangPaket-web/

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Astro 4 |
| Styling | Tailwind CSS v3 |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:4321/KangPaket-web/](http://localhost:4321/KangPaket-web/)

### Build for production

```bash
npm run build
```

Output goes to `./dist/`

### Preview production build

```bash
npm run preview
```

---

## Project Structure

```
kangpaket-web/
├── public/
│   ├── favicon.png
│   ├── og-image.png            # Open Graph image (1200x630)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── screenshots/
│       ├── Main_v1.0.1.png
│       ├── Request-Builder_v1.0.1.png
│       ├── Collection-Runner_v1.0.1.png
│       └── Postman-Import_v1.0.1.png
│
└── src/
    ├── layouts/
    │   └── BaseLayout.astro    # HTML shell: meta tags, fonts
    ├── pages/
    │   ├── index.astro         # Landing page
    │   └── changelog.astro     # Changelog page
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

## Deployment

Deploys automatically to GitHub Pages on every push to `main` via GitHub Actions.

**Manual trigger:** Go to Actions tab → Deploy to GitHub Pages → Run workflow.

To set up GitHub Pages for a new repo:
1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the workflow will build and deploy automatically

---

## Updating Content

### New app release

1. Update version string in `src/components/Download.astro`
2. Add a new `<ChangelogEntry>` at the top of `src/pages/changelog.astro`
3. Add new screenshots to `public/screenshots/` if needed
4. Push to `main`

### Download URLs

Download links use GitHub's `releases/latest/download/` endpoint — they always point to the latest release automatically. Only the version label needs manual updating.

---

## License

MIT — see [LICENSE](./LICENSE)

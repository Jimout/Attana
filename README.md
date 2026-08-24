# Attana Coffee — Landing Page

Marketing website for **Attana Coffee**: Ethiopian origin, small-batch roasting, and an editorial scroll experience.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion · GSAP · Lenis

**Live repo:** https://github.com/Jimout/Attana

---

## Requirements

- **Node.js** 20 or newer  
- **npm** (bundled with Node)

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm start
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Page sections (top → bottom)

| # | Section | Component |
|---|---------|-----------|
| — | Header / nav | `src/components/site-header.tsx` |
| 00 | Hero | `src/components/hero/hero.tsx` |
| 01 | Story | `src/components/sections/about-section.tsx` |
| — | 3 Origins / One Craft mosaic | `src/components/sections/mosaic-section.tsx` |
| 02 | Featured Coffee | `src/components/sections/featured-coffee-section.tsx` |
| 03 | Origin / Craft | `src/components/sections/origin-section.tsx` |
| 04 | Why Attana | `src/components/sections/why-attana-section.tsx` |
| — | Footer (“Brew the story.”) | `src/components/sections/site-footer.tsx` |

Section order is controlled in `src/app/page.tsx`.

---

## Project structure

```
src/
  app/
    page.tsx          → home page composition
    layout.tsx        → fonts + smooth scroll wrapper
    globals.css       → Attana brand tokens + shared UI classes
  components/
    hero/
    sections/         → story, mosaic, coffee, origin, why, footer
    site-header.tsx
    smooth-scroll.tsx → Lenis + scroll restore
public/
  images/
    logos/            → NavLogo.png, FavIcon.png
    hero/             → hero.jpg
    mosaic/           → coffee1.jpg … coffee7.jpg
    featured/         → f1.jpg … f3.jpg
    origin/           → origin1.jpg … origin3.jpg
    footer/           → brew.jpg
```

---

## Brand system

All colors and fonts are defined once in `src/app/globals.css` (`--attana-*` and `--font-*`). Use those tokens everywhere — do not introduce new hex values or fonts ad hoc.

### Colors

| Token | Value | Use |
|-------|-------|-----|
| `--attana-bg` | `#0D0D0D` | Page background |
| `--attana-bg-elevated` | `#1C1E19` | Elevated surfaces |
| `--attana-espresso` | `#241914` | Dark brown (CTAs on cream) |
| `--attana-accent` | `#8A5A3A` | Roasted brown accent |
| `--attana-cream` | `#F4EFE7` | Cream highlights |
| `--attana-text` | `#FFFFFA` | Primary text |
| `--attana-muted` | `#BCBCBC` | Labels / secondary |
| `--attana-body` | `#B8B8B8` | Body copy |

### Fonts

| Role | Font |
|------|------|
| Headlines / UI | Mona Sans |
| Indexes / labels `(01)` | IBM Plex Mono |
| Display / accents | DM Serif Display |
| Some nav / CTAs | Inter |

### Logos

| Asset | Path | Used by |
|-------|------|---------|
| Navbar wordmark | `public/images/logos/NavLogo.png` | `src/components/site-header.tsx` |
| Favicon / apple icon | `public/images/logos/FavIcon.png` | `src/app/layout.tsx` metadata |

Shared layout helpers: `.attana-section`, `.attana-container`, `.attana-heading`, `.attana-label`, `.attana-lede`.

---

## Replacing images

Keep **filenames** the same. Swap the file inside the matching folder:

| Folder | Files | Used by |
|--------|--------|---------|
| `public/images/logos/` | `NavLogo.png`, `FavIcon.png` | Navbar + browser tab icon |
| `public/images/hero/` | `hero.jpg` | Hero |
| `public/images/mosaic/` | `coffee1.jpg`–`coffee7.jpg` | 3 Origins mosaic |
| `public/images/featured/` | `f1.jpg`–`f3.jpg` | Featured Coffee |
| `public/images/origin/` | `origin1.jpg`–`origin3.jpg` | Origin / Craft scrub |
| `public/images/footer/` | `brew.jpg` | “Brew the story.” band |

**Note:** Image optimization is disabled (`images.unoptimized` in `next.config.ts`) so photos serve at full quality. Prefer reasonably sized JPEGs (about 1920–2560px wide) for good performance. PNGs for logos are fine at native resolution.

---

## Editing copy

- Nav links / mobile menu → `src/components/site-header.tsx`
- Hero headline / CTAs → `src/components/hero/hero.tsx`
- Story text → `src/components/sections/about-section.tsx`
- Coffee names / notes → `src/components/sections/featured-coffee-section.tsx`
- Origin stage titles → `src/components/sections/origin-section.tsx`
- Why Attana reasons → `src/components/sections/why-attana-section.tsx`
- Footer / credit → `src/components/sections/site-footer.tsx`

---

## Deploy

Works on **Vercel**, **Netlify**, or any host that supports Next.js.

Typical Vercel flow: import the GitHub repo → deploy. No environment variables are required for this landing page.

---

## Credit

Made by **Leseb Tech Lab**

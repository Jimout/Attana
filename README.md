# Attana Coffee — Landing Page

Marketing website for **Attana Coffee**: Ethiopian origin, small-batch character, editorial scroll experience.

Built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Motion**, and **GSAP**.

---

## Requirements

- **Node.js** 20 or newer  
- **npm** (comes with Node)

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Production build

```bash
npm run build
npm start
```

---

## Project structure

| Path | Purpose |
|------|---------|
| `src/app/page.tsx` | Page section order |
| `src/app/globals.css` | Brand colors, fonts, shared section styles |
| `src/components/` | Header, hero, sections, footer |
| `public/images/` | Site photos (hero, mosaic, coffee, origin, footer) |

### Brand tokens

Colors and type live in `src/app/globals.css` under `--attana-*` and `--font-*`.

- **Accent brown:** `--attana-accent` (`#8A5A3A`)
- **Background:** `--attana-bg`
- **Cream / text:** `--attana-cream`, `--attana-text`
- **Fonts:** Mona Sans (UI), IBM Plex Mono (labels), DM Serif (logo), Inter (some CTAs)

### Replacing images

Drop files into `public/images/` using the same names the code already references (for example `he.jpg`, `1.jpg`–`7.jpg`, `f1.jpg`–`f3.jpg`, `origin1.jpg`–`origin3.jpg`, `hero.jpg`).

---

## Deploy

Works well on **Vercel**, **Netlify**, or any host that supports Next.js.

Typical Vercel flow: import the project → deploy. No special env vars are required for this landing page.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

---

## Credit

Made by **Leseb Tech Lab**

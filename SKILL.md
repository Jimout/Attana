---
name: mira-studio-design
description: >-
  Apply the Mira Studio (mirastudio.framer.website) agency/portfolio design
  system — dark cinematic hero, Mona Sans + Smooch + IBM Plex Mono, lime and
  hot-red accents, corner-pinned chrome, and section patterns. Use when
  building or restyling pages to match Mira, cloning that Framer template look,
  or implementing Attana UI from the Mira design extract.
---

# Mira Studio Design System

Agent-ready design skill extracted from [https://mirastudio.framer.website/](https://mirastudio.framer.website/) via the firecrawl-website-design-clone workflow.

## Source

- URL: https://mirastudio.framer.website/
- Capture date: 2026-08-23
- Evidence:
  - Live Framer HTML parse (CSS tokens, fonts, component names)
  - OG / hero reference: `./.firecrawl/mira-og.jpg`
  - Page structure and copy hierarchy from the published Mira template
- Note: Firecrawl `branding` + `images` + full-page screenshot were not available without `FIRECRAWL_API_KEY` in this environment. Prefer re-running Firecrawl scrapes when a key exists; until then treat tokens below as **observed from HTML** unless marked **inferred**.

## Reference Screenshot

![Mira Studio hero reference](./.firecrawl/mira-og.jpg)

Use this as the visual source of truth for the **hero**: full-bleed moody portrait, massive centered wordmark, red script “Studio”, corner-pinned nav/chrome, and a red pill CTA.

## Design Summary

Mira is a **dark, high-fashion agency** system: one cinematic full-bleed image plane, **corner-pinned UI** (nav, locations, services, CTA), and a **centered brand stack** (huge condensed sans wordmark + handwritten red script + short uppercase manifesto). Accents are **hot orange-red** (`#ff3903`) and **acid lime** (`#d1ff00`). Type is **Mona Sans** for UI/display, **Smooch** for script flourishes, **IBM Plex Mono** for technical labels. Radius is mostly sharp; CTAs can be soft pills. Motion is cinematic (preloader %, WebGL/project slider — inferred from template marketing).

**Do not** ship Mira trademarks, client logos (Gucci/Chanel/etc.), or their photography in production without rights. Recreate the *system*, swap in original brand assets.

## Design Tokens

### Colors

| Role | Value | Confidence |
|------|-------|------------|
| Void / page bg | `#050505` / `#0a0a0a` / `#000000` | observed |
| Surface dark | `#1c1e19` / `#242424` / `#262626` | observed |
| Primary text | `#ffffff` / `#fffffa` / `#fcfcfa` | observed |
| Soft text | `#ffffffbf` / `#bcbcbc` / `#b8b8b8` | observed |
| Muted UI | `#616161` / `#686868` / `#9c9c9c26` | observed |
| Cream panel | `#f4f4e8` / `#f7f7f7` | observed (light sections) |
| Accent red / CTA | `#ff3903` / `rgb(255, 57, 3)` (also `#ff5703`) | observed |
| Accent lime | `#d1ff00` | observed token |
| Link blue (Framer default noise) | `rgb(0, 153, 255)` | observed in CSS; **do not** treat as brand primary |

### Typography

| Role | Family | Fallback | Usage |
|------|--------|----------|-------|
| Primary UI / display | **Mona Sans** | `"Helvetica Neue", Arial, sans-serif` | Nav, wordmark, body, section titles |
| Script accent | **Smooch** | `"Segoe Script", cursive` | “Studio” over wordmark; expressive flourishes |
| Mono / meta | **IBM Plex Mono** | `ui-monospace, monospace` | Small labels, counts, technical chrome |

Scale (observed / inferred for hero):

- Nav / chrome: ~11–14px, uppercase, tight tracking
- Manifesto / hero body: ~12–16px, uppercase, centered, generous line-height
- Section display: ~30–60px Mona Sans
- Giant wordmark: ~18–25vw / up to ~230px-class display sizes — ultra bold condensed feel
- Script “Studio”: medium script overlapping wordmark baseline-right, red

Letter-spacing: UI often slightly open or caps; display wordmark condensed / negative tracking (**inferred** for Impact-like density — Mona Sans weight heavy).

### Spacing And Layout

- Hero = **100svh** full-bleed photo, not an inset card
- Chrome pinned to **viewport edges** (top nav, bottom meta row, left rail, right thumb stack)
- Brand stack **dead-center**
- Left rail: thin vertical border, grid icon top, `EST. 2012` rotated/vertical bottom
- Right rail: 3 stacked project thumbnails
- Bottom row: locations | services list | CTA
- Radius language: mostly `0` / sharp imagery; CTA pill ~`48px` / full pill; rare `2px` chips
- Density: sparse center, dense micro-labels at edges

## Components

### Hero (primary pattern)

Layers bottom → top:

1. Full-bleed cinematic portrait (`object-fit: cover`)
2. Optional dark gradient / vignette for type legibility
3. Centered brand stack:
   - `MIRA` (massive white sans)
   - `Studio` (red Smooch script, offset bottom-right of wordmark)
   - Short uppercase manifesto paragraph
4. Top nav: logo (boxed M + MIRA) | PROJECTS (count in red) + STUDIO | JOURNAL
5. Bottom: locations | SERVICES + list | red pill “LET’S TALK” with avatar + arrow
6. Side rails: EST. year + thumbnail strip

### Buttons / CTA

- Primary: hot-red pill, white label, optional circular avatar thumb + northeast arrow
- Secondary: text links / underline ghost — sparse
- Avoid purple gradients and soft marketing cards in hero

### Navigation

- Uppercase Mona Sans
- Active/count accents in red (e.g. projects `6`)
- Minimal items: Projects, Studio, Journal, Let’s talk

### Section chrome (site-wide)

- Numbered section labels: `(01)`, `(02)`, …
- Big condensed headlines (often ALL CAPS)
- Stat blocks: `50+`, `4.9/5`, `+47%`
- Service cards: index `S.(01)`, title, price “Starts at $X”, delivery time, include list, CTA
- FAQ accordion, pricing toggle (Monthly / Per Project)
- Footer: EST. year, legal links, newsletter

### Imagery

- Fashion / editorial close-ups, high contrast, wet/metal/skin texture
- Project thumbs as small vertical stack or grid
- Client logo strip (marquee) — replace with own clients when cloning

## Page Patterns

### Hero frame

```
[ M logo MIRA ]     PROJECTS (6)  STUDIO          JOURNAL
[grid]
                                              [thumb]
                                              [thumb]
                                              [thumb]

                 M I R A
                    Studio   ← red script

           UPPERCASE MANIFESTO (2–4 lines)

EST.2012
LOS ANGELES          SERVICES          [ avatar LET'S TALK → ]
BASED IN TOKYO       Brand Identity…
```

### Section rhythm (after hero)

1. About / manifesto + founder quote  
2. Clients / trust strip + ratings  
3. Why us / proof stats + chart  
4. Services grid  
5. Team  
6. Process steps  
7. Reel / play  
8. Testimonials  
9. Pricing  
10. FAQ  
11. Contact / book a call  
12. Journal teaser  
13. Footer / newsletter  

### Motion (inferred from template positioning)

- Preloader with percentage (`0%` → `100%`)
- Cinematic hero / WebGL or fullscreen slider for projects
- Hover reveals on services and case studies
- Keep motion purposeful: load → reveal → hover; avoid noise

## Content Style

- Confident, founder-direct, anti-commodity agency voice
- Short lines; ALL CAPS for display/manifesto; sentence case for body explanations
- CTAs: “let’s talk”, “Start a project”, “See the studio”
- Proof language: numbers first (`50 BRANDS`, `14 YEARS`, `+47% inbound`)
- Philosophy quotes attributed to founder

## Agent Build Instructions

Target stack for this repo: **Next.js App Router + TypeScript + Tailwind + Motion/GSAP**.

When this skill is invoked:

1. Read this file and `./.firecrawl/mira-og.jpg` before coding.
2. Prefer **one full-bleed hero composition** with edge-pinned chrome; do not card-wrap the hero image.
3. Load **Mona Sans**, **Smooch**, **IBM Plex Mono** (or closest licensed equivalents).
4. Use **black void + white type + `#ff3903` CTA/script + optional `#d1ff00` highlight**.
5. Brand name is the hero-level signal; manifesto stays secondary; never let a headline overpower the wordmark.
6. Implement nav/locations/services/CTA as absolute/edge layout inside `min-h-svh`.
7. Replace Mira photography, ® marks, and third-party logos with Attana (or user) assets for production.
8. Match section numbering `(01)`… and uppercase display cadence when building below-the-fold.
9. Ship 2–3 intentional motions max for the first viewport (e.g. fade-up brand stack, CTA hover, preloader if requested).

### Hero checklist

- [ ] Full-bleed dark editorial photo
- [ ] Centered giant wordmark + red script subtitle
- [ ] Uppercase centered manifesto
- [ ] Top nav with red count accent
- [ ] Bottom locations + services + red pill CTA
- [ ] Left EST. rail and/or right thumbnail stack
- [ ] Sharp geometry; no soft purple AI aesthetic

## Rerun Inputs

```
workflow: firecrawl-website-design-clone
source_url: https://mirastudio.framer.website/
output: SKILL.md
target_stack: next.js + typescript + tailwind
firecrawl_formats: branding,images + full-page-screenshot
requires: FIRECRAWL_API_KEY
```

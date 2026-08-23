# DESIGN.md: Fovea (Hero-focused)

## Source
- URL: https://fovea.framer.website/
- Capture date: 2026-08-23
- Evidence:
  - Live HTML parse of Framer page (CSS tokens, fonts, hero markup)
  - OG / section images saved under `./.firecrawl/`
  - Page content structure from [Fovea](https://fovea.framer.website/)
- Note: Firecrawl `branding` + `images` + full-page screenshot scrapes were blocked from this environment without `FIRECRAWL_API_KEY` (“suspicious IP”). Re-run with Firecrawl for official branding confidence when a key is available.

## Reference Screenshot
![Fovea OG / hero collage reference](./.firecrawl/fovea-og.png)

Use this as the visual source of truth for the **hero**: full-bleed warm portrait, sharp focus window on the eye, viewfinder brackets, floating measurement pills, giant translucent wordmark, and sparse left-side copy.

Primary hero photography (source asset):
- `https://framerusercontent.com/images/UjFlbHaNSnn4NEqytSByEHr77oY.webp` (local attempt: `./.firecrawl/fovea-hero-portrait.webp`)
- Related cinematic portraits: `./.firecrawl/fovea-img-1.png`, `./.firecrawl/fovea-img-2.png`

## Design Summary
Fovea’s hero is a **dark, cinematic, vision-product** composition: one dominant edge-to-edge photograph, a literal “fovea” metaphor (blurred world + sharp rectangular focus), sparse white type, and HUD-like annotation UI. The brand voice is calm and declarative — short sentences, no clutter, one primary CTA.

**What to recreate for a hero clone:** full-bleed photo plane → blurred base layer → sharp clipped focus window with L-brackets → callout pills + leader lines → left value prop → top nav/logo + pill CTA → oversized semi-transparent serif wordmark anchored low.

## Design Tokens

### Colors
Observed from Framer CSS tokens / inline styles (high confidence):

| Role | Value | Notes |
|------|-------|-------|
| Background / void | `#000000` / `#121212` | Hero sits on near-black |
| Primary text | `#ffffff` | Logo, body, labels |
| Soft white | `rgba(255,255,255,0.75)` / `#ffffffbf` | Secondary text |
| Hairline / muted UI | `#c4c4c4`, `#a0a0a0` | Tablet bracket stroke uses `#a0a0a0` |
| Glass fill | `rgba(255,255,255,0.08–0.32)` | Pills / frosted chips |
| Accent blue | `#4da3ff` / `rgb(0,153,255)` | Product/eye accent (inferred for chips) |
| Accent coral | `#ff5436` / `#e7543c` | Secondary brand accent (page-wide) |
| Accent pink | `#f5699c` | Sparse accent |
| Accent green | `#8bd17c` | Status / success cues elsewhere |
| Photo warmth (inferred from imagery) | `#E7A173`, `#C06B3E`, deep `#1A0A05` | Skin highlights / shadow |

### Typography
Observed `@font-face` / `font-family` on page:

| Role | Family | Fallback | Usage |
|------|--------|----------|-------|
| Display / brand | **Instrument Serif** | `Georgia, "Times New Roman", serif` | Logo wordmark, oversized “Fovea”, editorial headings |
| UI / body | **Inter** | `system-ui, sans-serif` | Nav, value prop, labels |
| Alt sans | **Manrope** | `Inter, sans-serif` | Supporting UI (observed loaded) |
| Handwritten cue | **Caveat** | `cursive` | “drag me” affordance (~26px, ~-4° rotation) |

Scale (observed / inferred for hero):

- Logo (top-left): small Instrument Serif, ~16–18px, white
- Value prop: Inter ~16–18px, comfortable line-height (~1.5), left-aligned
- Section title fragments (“Focus” / “now”): large display (~32–58px range observed site-wide)
- Giant wordmark “Fovea”: very large serif (site has up to ~190px display sizes) — low opacity white over photo
- HUD labels: Inter / small caps feel, ~12–14px in dark translucent pills
- “drag me”: Caveat 26px, white, slight rotation

Letter-spacing: mostly `0`; some tight heading tracking `-0.01em` to `-0.04em`; occasional open tracking `0.08em` for labels.

### Spacing And Layout
- Hero is a **full-viewport / full-bleed** section (`data-framer-name="Hero"`), not an inset card.
- Desktop focus window (observed clip-path): roughly `inset(11% 26% 53% 42%)` — sharp crop of the eye region; other breakpoints shift the inset (e.g. tablet ~`15.5% 14% 57.5% 38%`).
- Focus frame L-brackets: **16×16px**, **2px** solid white (desktop) / muted gray on some breakpoints.
- Focus hit area sits around `left: 42%; top: 11%; width: 32%; height: 36%` (desktop variant).
- Background image: `object-fit: cover`, scaled ~122%, offset `-11%`, filter `blur(4px)` + reduced brightness (~0.64).
- Sharp layer: same image without blur, masked by `clip-path`.
- Radius language: mostly **sharp** photo/frame; **pill** CTAs (`border-radius: 100px`); small chips ~10–12px; circular indicators `50%`.
- Density: sparse — large empty photo space, few text blocks.

## Components

### Hero (primary target)
Composition layers (bottom → top):

1. **Photo plane** — warm close-up portrait, full bleed.
2. **Blurred field** — entire photo blurred + darkened (world outside fovea).
3. **Sharp fovea window** — rectangular clip of the same photo, crisp; optional subtle brightness restore.
4. **Viewfinder chrome** — four corner L-brackets on the focus rect.
5. **Annotation HUD** — curved/leader lines + pills:
   - `EYES • BLUE`
   - `CLARITY • 98%`
6. **Interaction cue** — “drag me” in Caveat near the focus box (draggable focus metaphor).
7. **Top bar** — left: wordmark “Fovea”; right: pill CTA “Join waitlist”.
8. **Value prop** — left mid/upper: “Point, and Fovea tells you what you’re looking at. No searching. No typing. Just focus.”
9. **Giant brand watermark** — oversized semi-transparent “Fovea” across lower third.

### Buttons
- Primary CTA: white fill, dark text, pill shape (`border-radius: 100px`), compact padding, label “Join waitlist”.
- No secondary button in hero.

### Tags / HUD pills
- Dark translucent rounded capsules.
- Uppercase or small-caps label + metric, separated by bullet/dot.
- Thin white callout strokes (~1.7px) with soft opacity (~0.85).

### Navigation
- Minimal: logo + single CTA only in hero viewport (no dense link row in first screen).

## Page Patterns

### Hero pattern (clone this)
```
[ Logo ]                         [ Join waitlist ]
[ Value prop — 2–3 short lines ]

        ┌──────────────┐
        │ sharp focus  │  ← HUD pills
        └──────────────┘
              drag me

              F O V E A   ← giant translucent serif
```

### Responsive assumptions
- Desktop: focus window upper-center/right of face; more negative space left for copy.
- Tablet/mobile: clip-path insets change; brackets may mute to gray; same stack (photo → focus → chrome → copy).
- Breakpoints present in Framer CSS around ~810px and ~1200px.

### Motion / interaction (observed / inferred)
- Focus region is **draggable** (`cursor: grab`, “drag me”).
- Appear animation on hero container (opacity / translate / scale present in markup).
- Keep motion purposeful: soft fade-in of HUD, slight parallax optional — avoid noisy particle effects.

## Content Style
- Short, confident, product-poet lines.
- Hero copy pattern: **action → benefit → negation of friction → single verb brand close**.
  - Example structure: “Point, and [Product] tells you…. No X. No Y. Just [verb].”
- CTA is invitational waitlist language, not “Buy”.
- HUD copy is clinical/telemetry: category + attribute, metric + %.

## Agent Build Instructions
Target stack for Attana: **Next.js App Router + TypeScript + Tailwind + Motion/GSAP** (existing project). Build **only the hero** unless asked otherwise.

1. **Do not** reuse Fovea logos, photography, or trademarked copy in production without rights. Use original portrait photography or licensed stock in the same *style* (warm cinematic close-up, shallow DOF, eye as focal point).
2. Hero section = one full-bleed composition:
   - `min-h-svh`, edge-to-edge background image.
   - Dual image layers (blurred full + sharp clipped window) OR CSS `filter` + `clip-path`.
   - Absolute L-brackets on the focus rect.
   - Left column copy; top bar logo + pill CTA.
   - Oversized low-opacity Instrument Serif wordmark near bottom.
3. Load fonts: Instrument Serif (display), Inter (UI), Caveat only if keeping a drag affordance.
4. Color: black void, white type, optional `#4da3ff` for one accent chip; keep coral/pink as secondary system tokens, not hero noise.
5. CTA = white pill, dark text; no card chrome around the hero.
6. Prefer one intentional motion (HUD fade / focus drag) over many.
7. Keep brand name as the strongest type signal in the first viewport; supporting sentence stays secondary.

## Hero Spec Checklist
- [ ] Full-bleed photo (not inset card)
- [ ] Blurred world + sharp rectangular focus
- [ ] Corner brackets
- [ ] 1–2 measurement pills with leader lines
- [ ] Minimal top bar (logo + pill CTA)
- [ ] Short left value prop
- [ ] Giant translucent serif wordmark
- [ ] Dark cinematic contrast, warm photo palette

## Rerun Inputs
```
workflow: firecrawl-website-design-clone
source_url: https://fovea.framer.website/
focus: hero
target_stack: next.js + typescript + tailwind
output: DESIGN.md
firecrawl_formats: branding,images + full-page-screenshot
requires: FIRECRAWL_API_KEY
```

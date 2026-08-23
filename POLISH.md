# POLISH.md: Catalin Vintila — Featured Work

Agent-ready polish guide extracted from [https://catalinvintila.design/](https://catalinvintila.design/) with focus on the **Featured Work** section (scroll-pinned dual-column project showcase).

## Source

- URL: https://catalinvintila.design/
- Capture date: 2026-08-23
- Evidence:
  - Live HTML + embedded CSS (`./.firecrawl/catalin-raw.html`, `./.firecrawl/catalin-wshow-css.txt`)
  - OG image: `./.firecrawl/catalin-og.jpg`
  - Section screenshots: `./.firecrawl/catalin-shots/featured-work.png`, `featured-work-mid.png`, `hero.png`
  - Computed layout dump: `./.firecrawl/catalin-featured-layout.json`
- Note: Firecrawl CLI was not available in this environment (`firecrawl` not on PATH / no API scrape). Tokens below are **observed from live HTML/CSS + Playwright screenshots**. Re-run with Firecrawl `branding,images` + full-page screenshot when a key/CLI is available.

## Reference Screenshot

![Featured Work section — Catalin Vintila](./.firecrawl/catalin-shots/featured-work.png)

Use this as the visual source of truth for the Featured Work polish: dark full-bleed project stage, tiny orange-dot section labels, giant centered uppercase project name, tag row above the title, `01 / 03` counter, and “KEEP SCROLLING” hint.

## Design Summary

Catalin’s Featured Work is a **dark, editorial, scroll-scrubbed portfolio stage**. It is not a card grid. On desktop, a sticky `100svh` show (`.wshow`) splits into **two half-width columns** that scroll project full-bleeds in opposite tracks. Each project is a **full-viewport photo** with a ~42% black veil, **centered UI**: small uppercase tags (orange separators) + massive condensed sans title. Chrome is sparse: section head (`FEATURED WORK` · `03 — SELECTED`), bottom-left count (`01 / 03` with orange current index), top-right hint (`KEEP SCROLLING`), and a pill **ALL WORK** CTA with orange count. Mobile swaps to stacked `.mslide` cards (~70svh). Personality: calm, precise, boardroom-serious but kinetic.

**Do not** ship Catalin’s logos, project photography, or client names in production without rights. Recreate the *system*; swap Attana (or user) assets.

## Design Tokens

### Colors

| Role | Value | Confidence |
|------|-------|------------|
| Page / stage black | `#0c0c0c` (`--black`) | observed |
| Elevated black | `#151515` (`--black-2`) | observed |
| Primary text / grey | `#d8d8d4` (`--grey`) | observed |
| Soft grey | `#c8c8c3` (`--grey-2`) | observed |
| Muted labels | `#7b7b76` (`--mut`) | observed |
| Muted low | `#6e6e68` (`--mut-l`) | observed |
| Accent orange | `#ff4d00` (`--orange`) | observed |
| Hairline | `rgba(216, 216, 212, 0.15)` (`--line`) | observed |
| Photo veil | `rgba(12, 12, 12, 0.42)` on `.wfull::after` | observed |
| Selection | orange bg / black text | observed |

For Attana adaptation: keep dark stage + grey type; map orange → Attana roasted brown `#8A5A3A` (or keep orange only if cloning Catalin 1:1).

### Typography

| Role | Family | Fallback | Usage |
|------|--------|----------|-------|
| UI / display | **Switzer** | Aeonik, Inter, Helvetica Neue, Arial, sans-serif | Entire Featured Work |

Scale (observed):

| Element | Size | Weight | Tracking | Transform |
|---------|------|--------|----------|-----------|
| Section label `.lbl` | 11px | 600 | 0.14em | uppercase |
| Tags `.wfull__tags` | 11px | 700 | 0.16em | uppercase |
| Project name `.wfull__name` | `clamp(56px, 10.5vw, 180px)` | 600 | -0.03em | uppercase, lh 0.95 |
| Count `.wshow__count` | 13px | 700 | 0.1em | tabular nums |
| Hint `.wshow__hint` | 11px | 600 | 0.14em | uppercase, 60% grey |
| All Work `.btnAll` | 12px | 700 | 0.14em | uppercase |
| Mobile name `.mslide__name` | `clamp(40px, 12vw, 76px)` | 600 | -0.03em | uppercase |

Ease: `--ease: cubic-bezier(0.83, 0, 0.17, 1)`.

### Spacing And Layout

- Horizontal pad: `--pad: clamp(20px, 4vw, 72px)`
- Section head: flex space-between; padding `clamp(70px, 11vh, 140px) var(--pad) clamp(24px, 4vh, 44px)`
- Stage height: `100svh` (desktop sticky pin; scroll spacer ~3× viewport for 3 projects — **inferred** from ~3600px spacer at 900px viewport)
- Columns: each `width: calc(50% + 1px)`; left `0`, right `left: calc(50% - 1px)` (1px overlap seam)
- Center stack gap: `clamp(14px, 2.4vh, 24px)`
- Radius: sharp imagery; **pill** only on `.btnAll` (`border-radius: 999px`)
- Borders: 1px `--line` on All Work pill

## Components

### Section head (`.work__head`)

- Left: `.lbl` → orange square glyph (`::before`) + `FEATURED WORK`
- Right: `.lbl.-plain.num` → `03 — SELECTED` (no orange square)
- Color: `--mut`

### Desktop show (`.wshow`)

1. Sticky / pinned full viewport stage
2. Dual tracks (`.wcol.-l` / `.wcol.-r`) of stacked `.wfull` project panels
3. Each `.wfull`: full-bleed `img` + dark veil + `.wfull__ui` (tags + name)
4. Tags: uppercase meta joined with orange middot/`i` separators (e.g. `WEB DESIGN · DESIGN SYSTEM · HIGHER ED`)
5. Name: giant centered uppercase client/project title
6. Chrome: `.wshow__count` bottom-left (`01 / 03`, current index in orange); `.wshow__hint` top-right `KEEP SCROLLING`

### Mobile fallback (`.mslide`)

- Shown ≤820px; desktop show hidden
- ~70svh cards, side margin `--pad`, 14px vertical gap
- Gradient veil; top row count/tags; foot name + CTA

### All Work CTA (`.btnAll`)

- Centered under the show
- Pill outline; label `ALL WORK` + bold orange count (`05`)
- Hover: fill `--orange`, text/count → black

## Page Patterns

### Featured Work section order

1. `work__head` — Featured Work / 03 — selected  
2. Scroll-pinned `wshow` — 03 featured projects, dual-column scrub  
3. Mobile `mslide` stack (responsive alternate)  
4. `work__all` — All work pill  

### Interaction (observed / inferred)

- Scroll drives column transforms (GSAP/ScrollTrigger-class pinning — **inferred** from `pin-spacer` + tall spacer)
- Project index updates with scroll (`01` → `03`)
- Name color transition on hover class `.wfull.-hov` (0.3s)
- Lenis smooth scroll present site-wide (**observed** class hooks)

### Responsive

- ≤820px: hide dual-column show + count/hint; show stacked slides  
- ≥821px: hide mobile slides  

## Content Style

- Labels tiny, uppercase, widely tracked  
- Project titles: short institutional names, ALL CAPS, huge  
- Tags: 2–4 discipline chips (Web design, Design system, Higher ed, Branding, Fintech…)  
- Microcopy: `KEEP SCROLLING`, `03 — SELECTED`, `ALL WORK` + numeric count in accent  
- Voice: confident, minimal, no fluff  

## Agent Build Instructions

Target stack for Attana (or any clone): **Next.js App Router + TypeScript + Tailwind + Motion/GSAP**.

When polishing or cloning **Featured Work**:

1. Read this file and `./.firecrawl/catalin-shots/featured-work.png` before coding.  
2. Prefer **one sticky 100svh stage** with dual half-width columns over a card grid (desktop).  
3. Use a single geometric sans (Switzer or Inter/Aeonik stand-in); do not mix display serifs in this section.  
4. Keep hierarchy: tiny muted labels → small tags → enormous uppercase name.  
5. Accent sparingly: label square, tag separators, active index digit, All Work count.  
6. Overlay photography at ~0.42 black; keep type in `--grey` / white on hover.  
7. Ship mobile as stacked full-bleed slides, not a squeezed dual column.  
8. For Attana Coffee: replace projects with coffee lots; map orange → `#8A5A3A`; keep structure (tags = origin/roast chips, name = lot name).  

### Featured Work checklist

- [ ] Section head: orange-dot label left + plain count label right  
- [ ] Sticky 100svh dual-column scrub with 3 projects  
- [ ] Full-bleed image + ~42% veil + centered tags + giant name  
- [ ] `01 / 03` bottom-left (accent on current)  
- [ ] `KEEP SCROLLING` top-right  
- [ ] Mobile stacked slides ≤820px  
- [ ] Centered All Work pill with accent count  

## Rerun Inputs

```yaml
workflow: firecrawl-website-design-clone
source_url: https://catalinvintila.design/
focus: Featured Work section
target_stack: Next.js + TypeScript + Tailwind + Motion/GSAP
output: POLISH.md
```

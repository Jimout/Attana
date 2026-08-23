"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const SECTION_IDS = [
  "top",
  "story",
  "lots",
  "coffee",
  "origin",
  "why",
  "contact",
] as const

const STORAGE_KEY = "attana:last-section"
const HEADER_OFFSET = -72

type LenisLike = {
  scrollTo: (
    target: number | HTMLElement,
    opts?: { offset?: number; immediate?: boolean },
  ) => void
}

function readTargetId(): string {
  const hash = window.location.hash.replace(/^#/, "")
  if (hash && SECTION_IDS.includes(hash as (typeof SECTION_IDS)[number])) {
    return hash
  }
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved && SECTION_IDS.includes(saved as (typeof SECTION_IDS)[number])) {
      return saved
    }
  } catch {
    /* private mode */
  }
  return "top"
}

function scrollToSection(id: string, lenis?: LenisLike | null) {
  if (id === "top") {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    return
  }

  const el = document.getElementById(id)
  if (!el) {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    return
  }

  if (lenis) {
    lenis.scrollTo(el, { offset: HEADER_OFFSET, immediate: true })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "auto" })
}

function rememberSection(id: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* private mode */
  }
  if (id === "top") {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search)
    }
    return
  }
  const next = `#${id}`
  if (window.location.hash !== next) {
    history.replaceState(null, "", next)
  }
}

function settleScroll(lenis?: LenisLike | null) {
  const id = readTargetId()
  ScrollTrigger.refresh()
  scrollToSection(id, lenis)
  // Second pass after pin spacers / images recalculate
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
    scrollToSection(id, lenis)
  })
}

function watchActiveSection() {
  const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
    (el): el is HTMLElement => Boolean(el),
  )
  if (!elements.length) return () => {}

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      const best = visible[0]?.target as HTMLElement | undefined
      if (!best?.id) return
      rememberSection(best.id)
    },
    {
      root: null,
      // Bias toward the section occupying the upper mid viewport
      rootMargin: "-20% 0px -45% 0px",
      threshold: [0.08, 0.2, 0.35, 0.5],
    },
  )

  elements.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })

    // Kill browser's wrong restored Y before pins inflate the page
    window.scrollTo(0, 0)

    let userMoved = false
    let cancelled = false
    let stopWatch = () => {}

    const markUserMoved = () => {
      userMoved = true
    }
    window.addEventListener("wheel", markUserMoved, { passive: true })
    window.addEventListener("touchstart", markUserMoved, { passive: true })
    window.addEventListener("keydown", markUserMoved)

    const safeSettle = (lenis?: LenisLike | null) => {
      if (cancelled || userMoved) return
      settleScroll(lenis)
    }

    const onNavClick = (e: MouseEvent, lenis?: LenisLike | null) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (!href || href === "#") return
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      rememberSection(id)
      if (lenis) {
        lenis.scrollTo(el, { offset: HEADER_OFFSET })
      } else {
        const top =
          el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET
        window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "smooth" })
      }
    }

    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches

    if (reduced || coarse) {
      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener("resize", onResize)
      const onClick = (e: MouseEvent) => onNavClick(e, null)
      document.addEventListener("click", onClick)

      const boot = window.setTimeout(() => {
        safeSettle(null)
        if (!cancelled) stopWatch = watchActiveSection()
      }, 50)

      const retry = window.setTimeout(() => safeSettle(null), 350)

      return () => {
        cancelled = true
        window.clearTimeout(boot)
        window.clearTimeout(retry)
        window.removeEventListener("resize", onResize)
        window.removeEventListener("wheel", markUserMoved)
        window.removeEventListener("touchstart", markUserMoved)
        window.removeEventListener("keydown", markUserMoved)
        document.removeEventListener("click", onClick)
        stopWatch()
      }
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      orientation: "vertical",
      gestureOrientation: "vertical",
      syncTouch: false,
    })

    lenis.on("scroll", ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", onResize)

    const onClick = (e: MouseEvent) => onNavClick(e, lenis)
    document.addEventListener("click", onClick)

    const boot = window.setTimeout(() => {
      safeSettle(lenis)
      if (!cancelled) stopWatch = watchActiveSection()
    }, 50)

    const retry = window.setTimeout(() => safeSettle(lenis), 350)

    return () => {
      cancelled = true
      window.clearTimeout(boot)
      window.clearTimeout(retry)
      document.removeEventListener("click", onClick)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("wheel", markUserMoved)
      window.removeEventListener("touchstart", markUserMoved)
      window.removeEventListener("keydown", markUserMoved)
      gsap.ticker.remove(tick)
      lenis.destroy()
      stopWatch()
    }
  }, [])

  return children
}

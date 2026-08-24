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

  // Prefer ScrollTrigger start when the section itself is the pin trigger (e.g. #lots)
  const trigger = ScrollTrigger.getAll().find((st) => st.trigger === el)
  if (trigger && typeof trigger.start === "number") {
    const y = Math.max(0, trigger.start + HEADER_OFFSET)
    if (lenis) lenis.scrollTo(y, { immediate: true })
    else window.scrollTo({ top: y, left: 0, behavior: "auto" })
    return
  }

  // Nested pins (Origin pin is inside #origin) — land on the section heading
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
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      )
    }
    return
  }
  const next = `#${id}`
  if (window.location.hash !== next) {
    history.replaceState(null, "", next)
  }
}

function settleScroll(id: string, lenis?: LenisLike | null) {
  ScrollTrigger.refresh()
  scrollToSection(id, lenis)
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
    scrollToSection(id, lenis)
  })
}

function watchActiveSection(canRemember: () => boolean) {
  const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
    (el): el is HTMLElement => Boolean(el),
  )
  if (!elements.length) return () => {}

  const observer = new IntersectionObserver(
    (entries) => {
      if (!canRemember()) return
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      const best = visible[0]?.target as HTMLElement | undefined
      if (!best?.id) return
      rememberSection(best.id)
    },
    {
      root: null,
      rootMargin: "-22% 0px -48% 0px",
      threshold: [0.1, 0.25, 0.4, 0.55],
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

    // Prevent browser restoring a stale Y before pins exist
    window.scrollTo(0, 0)

    const targetId = readTargetId()
    rememberSection(targetId)

    let cancelled = false
    let settling = true
    let userMoved = false
    let watching = false
    let stopWatch = () => {}
    const timers: number[] = []

    const canRemember = () => !cancelled && !settling && watching

    const markUserMoved = () => {
      // Ignore trackpad noise while we are still restoring position
      if (settling) return
      userMoved = true
    }
    window.addEventListener("wheel", markUserMoved, { passive: true })
    window.addEventListener("touchstart", markUserMoved, { passive: true })
    window.addEventListener("keydown", markUserMoved)

    const safeSettle = (lenis?: LenisLike | null) => {
      if (cancelled || userMoved) return
      settleScroll(targetId, lenis)
    }

    const finishSettling = (lenis?: LenisLike | null) => {
      if (cancelled) return
      safeSettle(lenis)
      settling = false
      if (!watching) {
        watching = true
        stopWatch = watchActiveSection(canRemember)
      }
    }

    const onNavClick = (e: MouseEvent, lenis?: LenisLike | null) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.(
        "a[href^='#']",
      ) as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (!href || href === "#") return
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      settling = false
      rememberSection(id)
      if (lenis) {
        lenis.scrollTo(el, { offset: HEADER_OFFSET })
      } else {
        const top =
          el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET
        window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "smooth" })
      }
    }

    const scheduleSettles = (lenis?: LenisLike | null) => {
      // Multiple passes: pins (Origin / mosaic) register after first paint
      ;[80, 250, 500, 900].forEach((ms, i, arr) => {
        timers.push(
          window.setTimeout(() => {
            if (i === arr.length - 1) finishSettling(lenis)
            else safeSettle(lenis)
          }, ms),
        )
      })
    }

    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches

    if (reduced || coarse) {
      // Avoid ScrollTrigger.refresh on mobile chrome resize — it re-catches Origin pin
      const onOrientation = () => ScrollTrigger.refresh()
      window.addEventListener("orientationchange", onOrientation)
      const onClick = (e: MouseEvent) => onNavClick(e, null)
      document.addEventListener("click", onClick)
      scheduleSettles(null)

      return () => {
        cancelled = true
        timers.forEach((id) => window.clearTimeout(id))
        window.removeEventListener("orientationchange", onOrientation)
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

    scheduleSettles(lenis)

    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
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

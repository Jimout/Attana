"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "./origin-section.module.css"

/**
 * Origin / Craft — Catalin Featured Work scrub.
 * Desktop: opposite-column split.
 * Small / touch phones: one full-bleed stack 01→02→03 (same holds, longer runway).
 * No GSAP pin.
 */
const STAGES = [
  {
    id: "highlands",
    name: "Highlands",
    title: ["ETHIOPIAN", "HIGHLANDS"],
    tags: ["Altitude", "Heirloom", "Terroir"],
    img: "/images/origin/origin1.jpg",
    alt: "Ethiopian coffee highlands at altitude",
    objectPosition: "center center",
  },
  {
    id: "farmers",
    name: "Farmers",
    title: ["SMALLHOLDER", "FARMERS"],
    tags: ["Hand-picked", "Cooperatives", "Craft"],
    img: "/images/origin/origin2.jpg",
    alt: "Smallholder farmers picking coffee cherries",
    objectPosition: "78% center",
  },
  {
    id: "journey",
    name: "Cherry to cup",
    title: ["CHERRY", "→ CUP"],
    tags: ["Wash", "Dry", "Roast"],
    img: "/images/origin/origin3.jpg",
    alt: "Coffee journey from cherry to cup",
    objectPosition: "center center",
  },
] as const

const N: number = STAGES.length
/** Desktop runway: 1 sticky + (N-1) travel */
const SCROLL_VH_DESKTOP = N
/** Phone: extra travel so 01/02/03 each get a real stop */
const SCROLL_VH_PHONE = N + 1.5
/**
 * Must match CSS. Covers tiny phones + touch devices up to ~900px
 * (portrait + landscape) without flipping iPad Pro desktop split.
 */
const PHONE_MQ =
  "(max-width: 640px), ((pointer: coarse) and (max-width: 900px))"

function padIndex(i: number) {
  return String(i + 1).padStart(2, "0")
}

export function OriginSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const showRef = useRef<HTMLDivElement>(null)
  const trackLRef = useRef<HTMLDivElement>(null)
  const trackRRef = useRef<HTMLDivElement>(null)
  const trackMRef = useRef<HTMLDivElement>(null)
  const [cur, setCur] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isCoarse = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches
    const phoneMq = window.matchMedia(PHONE_MQ)
    const scroller = scrollRef.current
    const show = showRef.current
    const trackL = trackLRef.current
    const trackR = trackRRef.current
    const trackM = trackMRef.current

    if (!scroller || !show || !trackL || !trackR || !trackM) return

    const isPhone = () => phoneMq.matches

    const syncPhoneUi = () => {
      const phone = isPhone()
      scroller.dataset.originPhone = phone ? "true" : "false"
      scroller.style.setProperty(
        "--origin-scroll-vh",
        String(phone ? SCROLL_VH_PHONE : SCROLL_VH_DESKTOP),
      )
    }

    /**
     * Catalin timing (same up & down): hold → wipe → hold → wipe → hold.
     * Phone: longer holds so 01 doesn’t zip; desktop unchanged.
     */
    const stageFromScroll = (p: number) => {
      if (N <= 1) return 0
      const phone = isPhone()
      const holdW = phone ? 1.7 : isCoarse ? 1.2 : 1.4
      const moveW = 1
      const total = N * holdW + (N - 1) * moveW
      let u = gsap.utils.clamp(0, 1, p) * total
      for (let i = 0; i < N; i++) {
        if (u <= holdW) return i
        u -= holdW
        if (i < N - 1) {
          if (u <= moveW) return i + u / moveW
          u -= moveW
        }
      }
      return N - 1
    }

    /**
     * Lock slide height against iOS URL-bar jitter so scrub stays on time.
     * Only relock on real size jumps (orientation / large resize).
     */
    let lockedH = 0
    const cellHeight = () => {
      const h = Math.max(1, Math.round(show.clientHeight))
      if (!lockedH || Math.abs(h - lockedH) >= 56) lockedH = h
      return lockedH
    }

    const sizeTrack = (track: HTMLElement, cellH: number) => {
      const h = Math.max(1, Math.round(cellH))
      if (track.style.height !== `${N * h}px`) {
        track.style.height = `${N * h}px`
        for (let i = 0; i < track.children.length; i++) {
          const cell = track.children[i] as HTMLElement
          cell.style.height = `${h}px`
          cell.style.flexShrink = "0"
        }
      } else {
        for (let i = 0; i < track.children.length; i++) {
          const cell = track.children[i] as HTMLElement
          if (cell.style.height !== `${h}px`) cell.style.height = `${h}px`
        }
      }
      return h
    }

    const applyProgress = (p: number) => {
      const stage = stageFromScroll(p)
      const cellH = cellHeight()
      if (isPhone()) {
        sizeTrack(trackM, cellH)
        gsap.set(trackM, { y: -cellH * stage, force3D: true })
      } else {
        sizeTrack(trackL, cellH)
        sizeTrack(trackR, cellH)
        gsap.set(trackL, { y: -cellH * stage, force3D: true })
        gsap.set(trackR, { y: -cellH * (N - 1 - stage), force3D: true })
      }
      const next = Math.min(N - 1, Math.round(stage))
      setCur((c) => (c === next ? c : next))
    }

    syncPhoneUi()
    applyProgress(0)

    if (reduced) return

    const st = ScrollTrigger.create({
      trigger: scroller,
      start: "top top",
      end: "bottom bottom",
      // Touch: immediate scrub so stages stay on time with the finger
      scrub: isCoarse ? true : 0.35,
      invalidateOnRefresh: !isCoarse,
      onUpdate(self) {
        applyProgress(self.progress)
      },
      onLeave: () => applyProgress(1),
      onLeaveBack: () => applyProgress(0),
    })

    const softRefresh = () => {
      syncPhoneUi()
      ScrollTrigger.refresh()
      applyProgress(st.progress)
    }

    const hardRelayout = () => {
      lockedH = 0
      softRefresh()
    }

    const onResize = () => {
      if (isCoarse) return
      softRefresh()
    }
    const onOrientation = () => {
      window.setTimeout(hardRelayout, 120)
    }
    const onPhoneChange = () => {
      hardRelayout()
    }

    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onOrientation)
    phoneMq.addEventListener("change", onPhoneChange)

    const raf = requestAnimationFrame(() => softRefresh())
    const boot = window.setTimeout(() => softRefresh(), 300)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(boot)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onOrientation)
      phoneMq.removeEventListener("change", onPhoneChange)
      st.kill()
      applyProgress(0)
    }
  }, [])

  const reversed = [...STAGES].reverse()

  return (
    <section
      id="origin"
      className={styles.work}
      aria-label="Origin and Craft"
    >
      <div
        ref={scrollRef}
        className={styles.stickyScroll}
        style={
          {
            ["--origin-scroll-vh" as string]: String(SCROLL_VH_DESKTOP),
          } as React.CSSProperties
        }
      >
        <div
          ref={showRef}
          className={`${styles.wshow} ${styles.wshowSticky}`}
          id="wshow"
        >
          <div className={styles.head}>
            <span className={`${styles.lbl} ${styles.lblPlain}`}>
              <span className="attana-label-index">(03)</span>
              <span style={{ marginLeft: 12 }}>Origin / Craft</span>
            </span>
            <span className={`${styles.lbl} ${styles.lblPlain} ${styles.num}`}>
              03 — stages
            </span>
          </div>

          <span className={`${styles.count} ${styles.num}`}>
            <b>{padIndex(cur)}</b> / 03
          </span>
          <span className={styles.hint}>Keep scrolling</span>

          {/* Desktop / tablet: Catalin split — unchanged */}
          <div className={styles.split}>
            <div className={`${styles.wcol} ${styles.wcolL}`}>
              <div
                ref={trackLRef}
                className={styles.wtrack}
                style={{ height: `${N * 100}%` }}
              >
                {STAGES.map((p) => (
                  <div
                    key={`l-${p.id}`}
                    className={styles.wcell}
                    style={{ height: `${100 / N}%` }}
                  >
                    <StagePanel stage={p} />
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.wcol} ${styles.wcolR}`}>
              <div
                ref={trackRRef}
                className={styles.wtrack}
                style={{
                  height: `${N * 100}%`,
                  transform: `translate3d(0, -${((N - 1) / N) * 100}%, 0)`,
                }}
              >
                {reversed.map((p) => (
                  <div
                    key={`r-${p.id}`}
                    className={styles.wcell}
                    style={{ height: `${100 / N}%` }}
                  >
                    <StagePanel stage={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phone only: full-bleed stack, same scrub */}
          <div className={styles.mobileStack}>
            <div ref={trackMRef} className={`${styles.wtrack} ${styles.mtrack}`}>
              {STAGES.map((p) => (
                <div key={`m-${p.id}`} className={`${styles.wcell} ${styles.mcell}`}>
                  <MobilePanel stage={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StagePanel({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <div
      className={styles.wfull}
      data-pid={stage.id}
      role="img"
      aria-label={stage.alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.wfullImg}
        src={stage.img}
        alt=""
        draggable={false}
        decoding="async"
        loading="eager"
        fetchPriority="low"
        style={{ objectPosition: stage.objectPosition }}
      />
      <span className={styles.wfullUi} aria-hidden="true">
        <span className={styles.wfullTags}>
          {stage.tags.map((t, i) => (
            <span key={t}>
              {i > 0 ? <i>·</i> : null}
              {t}
            </span>
          ))}
        </span>
        <span className={styles.wfullName}>
          {stage.title.map((line, i) => (
            <span key={line}>
              {i > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </span>
      </span>
    </div>
  )
}

/** Full-viewport panel for phone stack (not a 200% seam crop). */
function MobilePanel({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <div
      className={styles.mfull}
      data-pid={stage.id}
      role="img"
      aria-label={stage.alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.wfullImg}
        src={stage.img}
        alt=""
        draggable={false}
        decoding="async"
        loading="eager"
        fetchPriority="low"
        style={{ objectPosition: stage.objectPosition }}
      />
      <span className={styles.mfullUi} aria-hidden="true">
        <span className={styles.wfullTags}>
          {stage.tags.map((t, i) => (
            <span key={t}>
              {i > 0 ? <i>·</i> : null}
              {t}
            </span>
          ))}
        </span>
        <span className={styles.mfullName}>
          {stage.title.map((line, i) => (
            <span key={line}>
              {i > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </span>
      </span>
    </div>
  )
}

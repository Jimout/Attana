"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "./origin-section.module.css"

/**
 * Origin / Craft — Catalin Featured Work scrub.
 * Desktop: opposite-column split. Phone (≤480px): full-bleed stack 01→02→03.
 * Same sticky runway + hold/wipe timing — no GSAP pin.
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
/** Parent = 1 sticky viewport + (N-1) scrub travel. */
const SCROLL_VH = N
const NARROW_MQ = "(max-width: 480px)"

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
    const narrowMq = window.matchMedia(NARROW_MQ)
    const scroller = scrollRef.current
    const show = showRef.current
    const trackL = trackLRef.current
    const trackR = trackRRef.current
    const trackM = trackMRef.current

    if (!scroller || !show || !trackL || !trackR || !trackM) return

    /**
     * Catalin timing (same up & down):
     * hold → wipe → hold → wipe → hold.
     */
    const stageFromScroll = (p: number) => {
      if (N <= 1) return 0
      const holdW = isCoarse ? 1.2 : 1.4
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

    /** Pixel-size a track so each cell === cellH (matches scrub translate). */
    let lastCellH = 0
    const sizeTrack = (track: HTMLElement, cellH: number) => {
      const h = Math.max(1, Math.round(cellH))
      if (h !== lastCellH || track.style.height !== `${N * h}px`) {
        track.style.height = `${N * h}px`
        for (let i = 0; i < track.children.length; i++) {
          const cell = track.children[i] as HTMLElement
          cell.style.height = `${h}px`
          cell.style.flexShrink = "0"
        }
      }
      return h
    }

    const applyProgress = (p: number) => {
      const stage = stageFromScroll(p)
      const rawH = show.clientHeight
      if (narrowMq.matches) {
        const cellH = sizeTrack(trackM, rawH)
        lastCellH = cellH
        gsap.set(trackM, { y: -cellH * stage, force3D: true })
      } else {
        const cellH = sizeTrack(trackL, rawH)
        sizeTrack(trackR, cellH)
        lastCellH = cellH
        gsap.set(trackL, { y: -cellH * stage, force3D: true })
        gsap.set(trackR, { y: -cellH * (N - 1 - stage), force3D: true })
      }
      const next = Math.min(N - 1, Math.round(stage))
      setCur((c) => (c === next ? c : next))
    }

    applyProgress(0)

    if (reduced) return

    const st = ScrollTrigger.create({
      trigger: scroller,
      start: "top top",
      end: "bottom bottom",
      scrub: isCoarse ? 0.2 : 0.35,
      invalidateOnRefresh: !isCoarse,
      onUpdate(self) {
        applyProgress(self.progress)
      },
      onLeave: () => applyProgress(1),
      onLeaveBack: () => applyProgress(0),
    })

    const onResize = () => {
      if (isCoarse) return
      ScrollTrigger.refresh()
      applyProgress(st.progress)
    }
    const onOrientation = () => {
      ScrollTrigger.refresh()
      applyProgress(st.progress)
    }
    const onNarrowChange = () => {
      ScrollTrigger.refresh()
      applyProgress(st.progress)
    }

    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onOrientation)
    narrowMq.addEventListener("change", onNarrowChange)

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      applyProgress(st.progress)
    })
    const boot = window.setTimeout(() => {
      ScrollTrigger.refresh()
      applyProgress(st.progress)
    }, 300)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(boot)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onOrientation)
      narrowMq.removeEventListener("change", onNarrowChange)
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
            ["--origin-scroll-vh" as string]: String(SCROLL_VH),
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

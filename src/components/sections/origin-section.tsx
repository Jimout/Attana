"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "./origin-section.module.css"

/**
 * Origin / Craft — Catalin Featured Work scrub.
 * Uses CSS sticky + ScrollTrigger progress (no GSAP pin) so phone and
 * desktop share the same opposite-column scrub without pin-spacer / 03-repeat bugs.
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
/**
 * Parent = 1 sticky viewport + (N-1) scrub travel.
 * Keep this exact — taller runway makes 03 linger after the wipe.
 */
const SCROLL_VH = N
/** Share of scrub kept on stage 01 at the top of the range (same up & down). */
const INTRO_HOLD = 0.14

function padIndex(i: number) {
  return String(i + 1).padStart(2, "0")
}

export function OriginSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const showRef = useRef<HTMLDivElement>(null)
  const trackLRef = useRef<HTMLDivElement>(null)
  const trackRRef = useRef<HTMLDivElement>(null)
  const [cur, setCur] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isCoarse = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches
    const scroller = scrollRef.current
    const show = showRef.current
    const trackL = trackLRef.current
    const trackR = trackRRef.current

    if (!scroller || !show || !trackL || !trackR) return

    /**
     * Symmetric along the scroll axis (same positions up and down):
     * - First INTRO_HOLD of progress stays on stage 01 (top of range)
     * - Rest maps linearly 01 → 03 so stage 03 completes exactly at progress 1
     *   (no early park on 03 / no exit linger)
     */
    const stageFromScroll = (p: number) => {
      if (N <= 1) return 0
      const raw = gsap.utils.clamp(0, 1, p)
      const t =
        raw <= INTRO_HOLD ? 0 : (raw - INTRO_HOLD) / (1 - INTRO_HOLD)
      return t * (N - 1)
    }

    const applyProgress = (p: number) => {
      const stage = stageFromScroll(p)
      const cellH = show.clientHeight
      gsap.set(trackL, { y: -cellH * stage, force3D: true })
      gsap.set(trackR, { y: -cellH * (N - 1 - stage), force3D: true })
      const next = Math.min(N - 1, Math.round(stage))
      setCur((c) => (c === next ? c : next))
    }

    applyProgress(0)

    if (reduced) return

    // Tall parent is the trigger — never the sticky node (that broke scrub)
    const st = ScrollTrigger.create({
      trigger: scroller,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2,
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

    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onOrientation)

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

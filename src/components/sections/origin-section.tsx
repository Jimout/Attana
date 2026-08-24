"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "./origin-section.module.css"

/** Origin / Craft — dual-column scrub stages */
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
    // Subject sits on the right — bias crop so the hand stays in frame
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

const N = STAGES.length

function padIndex(i: number) {
  return String(i + 1).padStart(2, "0")
}

export function OriginSection() {
  const showRef = useRef<HTMLDivElement>(null)
  const trackLRef = useRef<HTMLDivElement>(null)
  const trackRRef = useRef<HTMLDivElement>(null)
  const [cur, setCur] = useState(0)
  const [hovId, setHovId] = useState<string | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const show = showRef.current
    const trackL = trackLRef.current
    const trackR = trackRRef.current

    if (!show || !trackL || !trackR || reduced) return

    const step = 100 / N
    const travel = step * (N - 1) // e.g. 66.666… for 3 stages

    /**
     * Map raw scroll 0–1 → stage position 0..(N-1) with a dwell on each stage
     * so the second image actually pauses instead of only flashing mid-scrub.
     */
    const stageFromScroll = (p: number) => {
      const holdW = 1.2
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

    const applyProgress = (p: number) => {
      const stage = stageFromScroll(p) // 0 .. N-1 (fractional during wipes)
      const t = (N === 1 ? 0 : stage / (N - 1)) as number
      // One progress drives both tracks so the split image never desyncs
      gsap.set(trackL, { yPercent: -travel * t })
      gsap.set(trackR, { yPercent: -travel * (1 - t) })
      setCur(Math.min(N - 1, Math.round(stage)))
    }

    applyProgress(0)

    const isTouch =
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      "ontouchstart" in window

    // Extra scroll length so each hold + wipe has room (3 holds + 2 moves)
    const scrollBeats = N + (N - 1)

    const st = ScrollTrigger.create({
      trigger: show,
      start: "top top",
      end: `+=${scrollBeats * 55}%`,
      pin: true,
      scrub: isTouch ? 0.3 : 0.45,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      pinType: isTouch ? "transform" : "fixed",
      onUpdate(self) {
        applyProgress(self.progress)
      },
    })

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", onResize)
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
      window.removeEventListener("resize", onResize)
      st.kill()
      gsap.set([trackL, trackR], { clearProps: "transform" })
    }
  }, [])

  const reversed = [...STAGES].reverse()

  return (
    <section
      id="origin"
      className={styles.work}
      aria-label="Origin and Craft"
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

      <div
        ref={showRef}
        className={styles.wshow}
        id="wshow"
        onMouseOver={(e) => {
          const t = (e.target as HTMLElement).closest("[data-pid]")
          if (!t) return
          setHovId(t.getAttribute("data-pid"))
        }}
        onMouseLeave={() => setHovId(null)}
      >
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
            {STAGES.map((p, i) => (
              <div
                key={`l-${p.id}`}
                className={styles.wcell}
                style={{ height: `${100 / N}%` }}
              >
                <StagePanel stage={p} index={i} hovered={hovId === p.id} />
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.wcol} ${styles.wcolR}`}>
          <div
            ref={trackRRef}
            className={styles.wtrack}
            style={{ height: `${N * 100}%` }}
          >
            {reversed.map((p) => {
              const i = STAGES.findIndex((x) => x.id === p.id)
              return (
                <div
                  key={`r-${p.id}`}
                  className={styles.wcell}
                  style={{ height: `${100 / N}%` }}
                >
                  <StagePanel stage={p} index={i} hovered={hovId === p.id} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function StagePanel({
  stage,
  index,
  hovered,
}: {
  stage: (typeof STAGES)[number]
  index: number
  hovered: boolean
}) {
  return (
    <div
      className={`${styles.wfull} ${hovered ? styles.wfullHov : ""}`}
      data-pid={stage.id}
      role="img"
      aria-label={stage.alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.wfullImg}
        src={stage.img}
        alt={stage.alt}
        draggable={false}
        decoding="async"
        loading={index === 0 ? "eager" : "lazy"}
        style={{ objectPosition: stage.objectPosition }}
      />
      <span className={styles.wfullUi}>
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

"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "./origin-section.module.css"

/**
 * Origin / Craft — Catalin Featured Work scrub on all devices:
 * opposite columns, same image/title cut at the center seam.
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

function padIndex(i: number) {
  return String(i + 1).padStart(2, "0")
}

export function OriginSection() {
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
    const show = showRef.current
    const trackL = trackLRef.current
    const trackR = trackRRef.current

    if (!show || !trackL || !trackR) return

    const stageFromScroll = (p: number) => {
      const holdW = 1.4
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
      const stage = stageFromScroll(p)
      const cellH = show.clientHeight
      gsap.set(trackL, { y: -cellH * stage, force3D: true })
      gsap.set(trackR, { y: -cellH * (N - 1 - stage), force3D: true })
      const next = Math.min(N - 1, Math.round(stage))
      setCur((c) => (c === next ? c : next))
    }

    applyProgress(0)

    if (reduced) return

    // Same scrub math everywhere; only refresh/pin invalidation differs on touch
    const endDistance = () =>
      `+=${Math.round(show.offsetHeight * (N + (N - 1)) * 0.7)}`

    const st = ScrollTrigger.create({
      trigger: show,
      start: "top top",
      end: endDistance,
      pin: true,
      scrub: 0.45,
      anticipatePin: 1,
      invalidateOnRefresh: !isCoarse,
      pinType: "fixed",
      onUpdate(self) {
        applyProgress(self.progress)
      },
      onLeave: () => applyProgress(1),
      onLeaveBack: () => applyProgress(0),
    })

    const onResize = () => {
      if (isCoarse) return
      ScrollTrigger.refresh()
      if (st.isActive) applyProgress(st.progress)
    }
    const onOrientation = () => {
      ScrollTrigger.refresh()
      if (st.isActive) applyProgress(st.progress)
      else if (st.progress >= 1) applyProgress(1)
      else applyProgress(0)
    }

    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onOrientation)

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (st.isActive) applyProgress(st.progress)
    })
    const boot = window.setTimeout(() => {
      ScrollTrigger.refresh()
      if (st.isActive) applyProgress(st.progress)
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
      <div ref={showRef} className={styles.wshow} id="wshow">
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

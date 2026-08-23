"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "./featured-work-section.module.css"

/** Origin / Craft — Catalin Featured Work shell, Attana content */
const STAGES = [
  {
    id: "highlands",
    name: "Highlands",
    title: ["ETHIOPIAN", "HIGHLANDS"],
    tags: ["Altitude", "Heirloom", "Terroir"],
    img: "https://images.unsplash.com/photo-1559556064-4161b6be179b?auto=format&fit=crop&w=1920&q=80",
    alt: "Ethiopian coffee highlands at altitude",
  },
  {
    id: "farmers",
    name: "Farmers",
    title: ["SMALLHOLDER", "FARMERS"],
    tags: ["Hand-picked", "Cooperatives", "Craft"],
    img: "https://images.unsplash.com/photo-1722962883780-8806c3ab546b?auto=format&fit=crop&w=1920&q=80",
    alt: "Smallholder farmers picking coffee cherries",
  },
  {
    id: "journey",
    name: "Cherry to cup",
    title: ["CHERRY", "→ CUP"],
    tags: ["Wash", "Dry", "Roast"],
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1920&q=80",
    alt: "Coffee journey from cherry to cup",
  },
] as const

const N = STAGES.length

function padIndex(i: number) {
  return String(i + 1).padStart(2, "0")
}

export function FeaturedWorkSection() {
  const showRef = useRef<HTMLDivElement>(null)
  const trackLRef = useRef<HTMLDivElement>(null)
  const trackRRef = useRef<HTMLDivElement>(null)
  const [cur, setCur] = useState(0)
  const [hovId, setHovId] = useState<string | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const desk = window.innerWidth > 820
    const show = showRef.current
    const trackL = trackLRef.current
    const trackR = trackRRef.current

    if (!desk || !show || !trackL || !trackR || reduced) return

    const step = 100 / N
    gsap.set(trackR, { yPercent: -step * (N - 1) })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: show,
        start: "top top",
        end: `+=${N * 100}%`,
        pin: true,
        scrub: 0.6,
        onUpdate(self) {
          const i = Math.min(N - 1, Math.floor(self.progress * (N - 1) + 0.5))
          setCur(i)
        },
      },
    })

    for (let i = 0; i < N - 1; i++) {
      tl.to({}, { duration: 0.55 })
        .to(trackL, {
          yPercent: -step * (i + 1),
          duration: 1,
          ease: "power3.inOut",
        })
        .to(
          trackR,
          {
            yPercent: -step * (N - 1 - (i + 1)),
            duration: 1,
            ease: "power3.inOut",
          },
          "<",
        )
    }
    tl.to({}, { duration: 0.55 })

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      tl.scrollTrigger?.kill()
      tl.kill()
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

      <div className={styles.mslides} id="mslides">
        {STAGES.map((p, i) => (
          <div
            key={p.id}
            className={styles.mslide}
            aria-label={p.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.mslideImg}
              src={p.img}
              alt={p.alt}
              loading="lazy"
            />
            <span className={styles.mslideUi}>
              <span className={styles.mslideTop}>
                <span className={`${styles.lbl} ${styles.lblPlain} ${styles.num}`}>
                  {padIndex(i)} / 0{N}
                </span>
                <span className={styles.mslideTags}>
                  {p.tags.slice(0, 2).join(" · ")}
                </span>
              </span>
              <span className={styles.mslideFoot}>
                <span className={styles.mslideName}>{p.name}</span>
              </span>
            </span>
          </div>
        ))}
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
        loading={index ? "lazy" : "eager"}
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

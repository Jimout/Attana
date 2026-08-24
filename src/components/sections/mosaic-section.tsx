"use client"

import { useRef, useState } from "react"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"

type MediaCell =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string }

/** Attana coffee mosaic — same 2 / 3 / 2 column layout as the current design */
const COLUMNS: MediaCell[][] = [
  [
    { type: "image", src: "/images/mosaic/coffee1.jpg" },
    { type: "image", src: "/images/mosaic/coffee4.jpg" },
  ],
  [
    { type: "image", src: "/images/mosaic/coffee3.jpg" },
    { type: "image", src: "/images/mosaic/coffee2.jpg" },
    { type: "image", src: "/images/mosaic/coffee5.jpg" },
  ],
  [
    { type: "image", src: "/images/mosaic/coffee6.jpg" },
    { type: "image", src: "/images/mosaic/coffee7.jpg" },
  ],
]

const HEADLINE: { text: string; color: string; breakAfter?: boolean }[] = [
  { text: "3 ORIGINS. ", color: "var(--attana-text)", breakAfter: true },
  { text: "ONE CRAFT. ", color: "var(--attana-text)", breakAfter: true },
  { text: "PURE", color: "var(--attana-accent)" },
  { text: " CHARACTER.", color: "var(--attana-text)" },
]

function Cell({ cell }: { cell: MediaCell }) {
  return (
    <div
      className="relative min-h-0 w-full flex-1 overflow-hidden"
      style={{ borderRadius: 10 }}
    >
      {cell.type === "video" ? (
        <video
          src={cell.src}
          poster={cell.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        // Native img — full-resolution source for sharp zoom (no optimizer resize)
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cell.src}
          alt=""
          draggable={false}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            imageRendering: "auto",
            // Keep a crisp GPU layer while the mosaic scales
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />
      )}
    </div>
  )
}

const HEADLINE_STYLE = {
  fontFamily: "var(--font-mona), 'Helvetica Neue', Arial, sans-serif",
  fontSize: "clamp(2rem, 4.2vw, 60px)",
  fontVariationSettings: '"wdth" 75, "wght" 700',
  fontFeatureSettings: '"ss07" 1',
  letterSpacing: "-0.02em",
  lineHeight: "0.9",
  textAlign: "left" as const,
}

function Char({
  char,
  color,
  progress,
  start,
}: {
  char: string
  color: string
  progress: MotionValue<number>
  start: number
}) {
  // One-way: once past the reveal window, stay at full opacity (never fade out)
  const opacity = useTransform(progress, (p) => {
    if (p >= start + 0.045) return 1
    if (p <= start) return 0
    return (p - start) / 0.045
  })
  const y = useTransform(progress, (p) => {
    if (p >= start + 0.045) return 0
    if (p <= start) return 14
    return 14 * (1 - (p - start) / 0.045)
  })

  return (
    <motion.span
      className="inline-block"
      style={{
        opacity,
        y,
        color,
        whiteSpace: char === " " ? "pre" : undefined,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  )
}

function StaticHeadline() {
  return (
    <h2 className="m-0 uppercase" style={HEADLINE_STYLE}>
      {HEADLINE.map((part, partIndex) => (
        <span key={partIndex}>
          <span style={{ color: part.color }}>{part.text}</span>
          {part.breakAfter ? <br /> : null}
        </span>
      ))}
    </h2>
  )
}

function Headline({ progress }: { progress: MotionValue<number> }) {
  const [locked, setLocked] = useState(false)

  useMotionValueEvent(progress, "change", (v) => {
    if (v >= 0.4) setLocked(true)
  })

  if (locked) return <StaticHeadline />

  let cursor = 0.04

  return (
    <h2 className="m-0 uppercase" style={HEADLINE_STYLE}>
      {HEADLINE.map((part, partIndex) => {
        const nodes = part.text.split("").map((char, charIndex) => {
          const start = cursor
          cursor += 0.01
          return (
            <Char
              key={`${partIndex}-${charIndex}`}
              char={char}
              color={part.color}
              progress={progress}
              start={start}
            />
          )
        })
        cursor += 0.025
        return (
          <span key={partIndex}>
            {nodes}
            {part.breakAfter ? <br /> : null}
          </span>
        )
      })}
    </h2>
  )
}


export function MosaicSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Lay out mosaic at ZOOM× size, then scale DOWN (never up) so zoom stays sharp
  const ZOOM = 3.1
  const mediaScale = useTransform(scrollYProgress, [0, 0.85], [1, 1 / ZOOM])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.85], [0, 0.65])

  return (
    <section
      ref={containerRef}
      id="lots"
      className="relative bg-[var(--attana-bg)] overflow-x-clip"
      style={{ height: "300vh", touchAction: "pan-y" }}
      aria-label="3 origins, one craft, pure character"
      data-scroll-progress
    >
      <div
        className="sticky top-0 z-[1] flex h-svh w-full flex-col items-center justify-center"
        style={{ padding: 3 }}
      >
        <div
          className="relative flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden bg-[var(--attana-bg)]"
          style={{ borderRadius: 12 }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2"
            style={{
              width: `${ZOOM * 100}%`,
              height: `${ZOOM * 100}%`,
              translate: "-50% -50%",
            }}
          >
            <motion.div
              className="flex h-full w-full flex-row items-center justify-center gap-[3px] will-change-transform"
              style={{ scale: mediaScale, transformOrigin: "50% 50%" }}
            >
              {COLUMNS.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-[3px]"
                >
                  {column.map((cell, cellIndex) => (
                    <Cell key={`${columnIndex}-${cellIndex}`} cell={cell} />
                  ))}
                </div>
              ))}

              {/* Dark overlay for text readability */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-[1] bg-[var(--attana-bg)]"
                style={{ opacity: overlayOpacity }}
              />
            </motion.div>
          </div>

          {/* Headline reveal over mosaic */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] grid w-full max-w-[1920px] -translate-x-1/2 -translate-y-1/2 grid-cols-1 gap-5 px-[30px] md:grid-cols-4">
            <div className="hidden md:block" aria-hidden />
            <div className="md:col-span-3">
              <div className="w-full max-w-[600px]">
                <Headline progress={scrollYProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

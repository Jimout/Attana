"use client"

import { motion } from "motion/react"

const WHY_IMAGE =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2400&q=80"

const REASONS = [
  {
    index: "01",
    title: "Ethiopian origin",
    body: "Highland terroir, heirloom lots, and a place you can taste.",
  },
  {
    index: "02",
    title: "Careful roasting",
    body: "Small batches dialed to keep origin clear — not buried.",
  },
  {
    index: "03",
    title: "Thoughtful sourcing",
    body: "Fewer partners, longer relationships, character intact.",
  },
] as const

export function WhyAttanaSection() {
  return (
    <section
      id="why"
      className="relative overflow-hidden"
      style={{ background: "var(--attana-bg)" }}
      aria-label="Why Attana"
    >
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WHY_IMAGE}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, var(--attana-bg) 0%, rgba(13,13,13,0.35) 28%, rgba(13,13,13,0.5) 100%),
              linear-gradient(0deg, rgba(13,13,13,0.2), rgba(13,13,13,0.2))
            `,
          }}
        />
      </div>

      <div className="attana-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="attana-label"
        >
          <span className="attana-label-index">(04)</span>
          <span>Why Attana</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="attana-heading max-w-[16ch]"
          style={{ color: "var(--attana-cream)" }}
        >
          Three reasons. One standard.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="attana-lede max-w-[32rem]"
          style={{
            color: "color-mix(in srgb, var(--attana-cream) 78%, transparent)",
          }}
        >
          Origin first. Roast with restraint. Source with care.
        </motion.p>

        <div className="mt-14 grid gap-10 sm:mt-16 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
          {REASONS.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.08 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p
                className="text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.04em]"
                style={{
                  fontFamily: "var(--font-mona), 'Helvetica Neue', Arial, sans-serif",
                  color: "var(--attana-accent)",
                }}
              >
                {reason.index}
              </p>
              <h3
                className="mt-5 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-[1.15] tracking-[-0.02em]"
                style={{ color: "var(--attana-cream)" }}
              >
                {reason.title}
              </h3>
              <p
                className="mt-3 max-w-[28ch] text-[15px] leading-[1.55] sm:text-[16px]"
                style={{
                  color: "color-mix(in srgb, var(--attana-cream) 72%, transparent)",
                }}
              >
                {reason.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

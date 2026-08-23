"use client"

import Image from "next/image"
import { motion } from "motion/react"

const HERO_IMAGE = "/images/he.jpg"

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-svh min-h-[640px] w-full overflow-x-clip overflow-y-hidden"
      style={{ background: "var(--attana-bg)", touchAction: "pan-y" }}
      aria-label="Attana Coffee hero"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Ethiopian coffee highlands"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          draggable={false}
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(13,13,13,0.35) 0%, rgba(13,13,13,0.12) 40%, rgba(13,13,13,0.55) 75%, var(--attana-bg) 100%),
            linear-gradient(90deg, rgba(13,13,13,0.35) 0%, transparent 55%)
          `,
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 z-20 pb-10 sm:pb-14 lg:pb-16"
        style={{ paddingInline: "var(--attana-pad-x)" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-5 flex items-baseline gap-3 text-[12px] uppercase tracking-[0.08em] sm:text-[13px]"
          style={{
            fontFamily: "var(--font-plex), ui-monospace, monospace",
            color: "var(--attana-muted)",
          }}
        >
          <span style={{ color: "var(--attana-accent)" }}>(00)</span>
          <span>Attana Coffee</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[14ch] text-[clamp(2.5rem,7vw,5.5rem)] font-semibold uppercase leading-[0.98] tracking-[-0.03em]"
          style={{
            fontFamily: "var(--font-mona), 'Helvetica Neue', Arial, sans-serif",
            color: "var(--attana-cream)",
          }}
        >
          From Ethiopia, with character.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.55 }}
          className="mt-5 max-w-[34rem] text-[15px] leading-[1.55] sm:text-[16px]"
          style={{
            fontFamily: "var(--font-mona), 'Helvetica Neue', Arial, sans-serif",
            color: "color-mix(in srgb, var(--attana-cream) 85%, transparent)",
          }}
        >
          Coffee shaped by altitude, craft and the place it comes from.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#coffee"
            className="inline-flex rounded-full px-[18px] py-[11px] text-[13px] font-medium leading-none tracking-[-0.01em] transition hover:brightness-110 sm:text-[14px]"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              backgroundColor: "var(--attana-cream)",
              color: "var(--attana-espresso)",
            }}
          >
            Explore Coffee
          </a>
          <a
            href="#story"
            className="inline-flex items-center border-b pb-1 text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--attana-cream)] transition hover:border-[var(--attana-accent)] hover:text-[var(--attana-accent)]"
            style={{
              fontFamily: "var(--font-mona), 'Helvetica Neue', Arial, sans-serif",
              borderColor: "color-mix(in srgb, var(--attana-cream) 35%, transparent)",
            }}
          >
            Read the story
          </a>
        </motion.div>
      </div>
    </section>
  )
}

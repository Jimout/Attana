"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

import styles from "./site-footer.module.css"

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Story", href: "#story" },
  { label: "Coffee", href: "#coffee" },
  { label: "Origin", href: "#origin" },
  { label: "Contact Us", href: "#contact" },
] as const

const TICKER = [
  "Highland lots selected",
  "Small-batch roast",
  "Ethiopian origin",
  "Traceable sourcing",
  "Character in every cup",
  "From cherry to cup",
] as const

const STAGE_IMAGE =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=80"

function TickerGlyph() {
  return (
    <span
      className="mx-5 inline-flex size-[18px] shrink-0 items-center justify-center rounded-full border"
      style={{ borderColor: "color-mix(in srgb, var(--attana-cream) 35%, transparent)" }}
      aria-hidden
    >
      <span className="relative block size-[8px]">
        <span
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
          style={{ background: "color-mix(in srgb, var(--attana-cream) 70%, transparent)" }}
        />
        <span
          className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
          style={{ background: "color-mix(in srgb, var(--attana-cream) 70%, transparent)" }}
        />
      </span>
    </span>
  )
}

function SocialIcon({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <a
      href="#contact"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full border transition hover:bg-white/5"
      style={{
        borderColor: "color-mix(in srgb, var(--attana-cream) 25%, transparent)",
        color: "var(--attana-text)",
      }}
    >
      {children}
    </a>
  )
}

export function SiteFooter() {
  const loop = [...TICKER, ...TICKER]

  return (
    <footer
      id="contact"
      className="attana-section overflow-hidden"
      aria-label="Footer"
    >
      <div className="attana-container flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="max-w-[420px]"
        >
          <a
            href="#top"
            className="text-[clamp(2.5rem,5vw,3.75rem)] leading-none tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-dm-serif), Georgia, serif",
              color: "var(--attana-text)",
            }}
          >
            Attana
          </a>
          <p className="attana-lede mt-5 max-w-[34ch]">
            Coffee shaped by altitude, craft and the place it comes from. From
            Ethiopia, with character.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <SocialIcon label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6.5 9.5V18M4.5 9.5H8.5M6.5 6.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM10.5 18V12.8c0-1.4.9-2.3 2.1-2.3 1.1 0 1.9.7 1.9 2.2V18M10.5 18h2M14.5 18h2v-5.8c0-2.2-1.2-3.4-3.1-3.4-1.1 0-1.9.5-2.4 1.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="16.5" cy="7.5" r="0.9" fill="currentColor" />
              </svg>
            </SocialIcon>
            <SocialIcon label="X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.2 3H21l-7.3 8.3L22 21h-6.2l-4.9-6.4L5.6 21H3l7.8-8.9L2 3h6.3l4.4 5.8L18.2 3Zm-1.1 16.2h1.7L7 4.7H5.2l11.9 14.5Z" />
              </svg>
            </SocialIcon>
          </div>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="w-full max-w-[280px] shrink-0 lg:pt-2"
          aria-label="Footer"
        >
          <ul className="m-0 list-none p-0">
            {NAV.map((item) => (
              <li
                key={item.label}
                className="border-b"
                style={{ borderColor: "var(--attana-line)" }}
              >
                <a
                  href={item.href}
                  className="block py-3.5 text-[15px] font-medium transition hover:opacity-70 sm:text-[16px]"
                  style={{ color: "var(--attana-text)" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>

      <div
        className="relative overflow-hidden border-y py-3.5"
        style={{
          borderColor: "var(--attana-line)",
          background: "var(--attana-bg)",
        }}
      >
        <div
          className={`${styles.tickerTrack} flex w-max items-center whitespace-nowrap text-[13px] font-medium tracking-[0.02em] sm:text-[14px]`}
          style={{ color: "var(--attana-body)" }}
        >
          {loop.map((item, i) => (
            <span key={`${item}-${i}`} className="inline-flex items-center">
              <TickerGlyph />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative min-h-[min(28vh,280px)] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STAGE_IMAGE}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-105 object-cover grayscale contrast-[1.05] brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-[var(--attana-bg)]/50" />

        <div className="relative z-10 flex min-h-[min(28vh,280px)] flex-col">
          <div
            className="flex flex-1 items-center justify-center py-10 text-center sm:py-12"
            style={{ paddingInline: "var(--attana-pad-x)" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="attana-heading max-w-[16ch] normal-case"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Brew the story.
            </motion.h2>
          </div>

          <div
            className="pb-6 sm:pb-7"
            style={{ paddingInline: "var(--attana-pad-x)" }}
          >
            <p
              className="m-0 text-[13px] font-medium sm:text-[14px] md:text-[16px]"
              style={{ color: "var(--attana-muted)" }}
            >
              © 2026 Attana. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

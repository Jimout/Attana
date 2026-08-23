"use client"

import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

const HEADLINE =
  "WE SOURCE ETHIOPIAN COFFEE WITH CARE. FEWER LOTS, MORE CHARACTER, AND A ROAST SMALL ENOUGH THAT ORIGIN STAYS IN EVERY CUP."

const QUOTE =
  "I started Attana because great Ethiopian coffee deserves a presence as considered as the land it comes from."

const BODY =
  "Coffee is not decoration. It is craft, altitude and daily ritual. Every lot we roast answers one question: does this taste like the place it grew?"

const STORY_IMAGE =
  "https://images.unsplash.com/photo-1559556064-4161b6be179b?auto=format&fit=crop&w=1200&q=80"

export function AboutSection() {
  return (
    <section id="story" className="attana-section" aria-label="The Attana Story">
      <div className="attana-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="attana-label"
        >
          <span className="attana-label-index">(01)</span>
          <span>Story</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="attana-heading max-w-[1100px] text-left"
          style={{
            fontSize: "clamp(1.65rem, 4.2vw, 3.55rem)",
            textAlign: "justify",
            textAlignLast: "left",
          }}
        >
          {HEADLINE}
        </motion.h2>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-end lg:gap-16 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="relative m-0 overflow-hidden"
            style={{ background: "var(--attana-bg-elevated)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={STORY_IMAGE}
              alt="Ethiopian coffee highlands"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 pb-4 pt-16">
              <div>
                <p className="text-[15px] font-medium leading-none tracking-[-0.02em]">
                  Highland lots
                </p>
                <p
                  className="mt-1.5 text-[11px] uppercase tracking-[0.1em]"
                  style={{
                    color: "var(--attana-muted)",
                    fontFamily: "var(--font-plex), ui-monospace, monospace",
                  }}
                >
                  Ethiopia
                </p>
              </div>
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="flex flex-col justify-end pb-1"
          >
            <p
              className="text-[12px] uppercase tracking-[0.1em]"
              style={{
                color: "var(--attana-accent)",
                fontFamily: "var(--font-plex), ui-monospace, monospace",
              }}
            >
              (Our craft)
            </p>
            <blockquote
              className="mt-5 max-w-[34rem] text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-[1.25] tracking-[-0.025em]"
              style={{ color: "var(--attana-text)" }}
            >
              “ {QUOTE} ”
            </blockquote>
            <p className="attana-lede mt-8 max-w-[32rem]">{BODY}</p>
            <a href="#coffee" className="attana-link group mt-10">
              Explore Coffee
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

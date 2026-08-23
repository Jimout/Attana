"use client"

import { motion } from "motion/react"

const HEADLINE =
  "WE SOURCE ETHIOPIAN COFFEE WITH CARE. FEWER LOTS, MORE CHARACTER, AND A ROAST SMALL ENOUGH THAT ORIGIN STAYS IN EVERY CUP."

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
          }}
        >
          {HEADLINE}
        </motion.h2>
      </div>
    </section>
  )
}

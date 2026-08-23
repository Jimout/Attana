"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

const COFFEES = [
  {
    index: "C.(01)",
    name: "Yirgacheffe",
    meta: "Ethiopia · Light roast",
    note: "Floral, citrus and a clean honeyed finish.",
    image: "/images/f1.jpg",
    alt: "Yirgacheffe roasted coffee beans",
  },
  {
    index: "C.(02)",
    name: "Sidamo",
    meta: "Ethiopia · Medium roast",
    note: "Berry sweetness, cocoa and soft tea-like body.",
    image: "/images/f2.jpg",
    alt: "Cup of Sidamo coffee",
  },
  {
    index: "C.(03)",
    name: "Harrar",
    meta: "Ethiopia · Medium-dark roast",
    note: "Winey fruit, spice and a bold lingering body.",
    image: "/images/f3.jpg",
    alt: "Freshly poured Harrar coffee",
  },
] as const

export function FeaturedCoffeeSection() {
  return (
    <section id="coffee" className="attana-section" aria-label="Featured Coffee">
      <div className="attana-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="attana-label"
        >
          <span className="attana-label-index">(02)</span>
          <span>Coffee</span>
        </motion.div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="attana-heading max-w-[14ch]"
          >
            Featured lots.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="attana-lede mt-0 max-w-[28rem] lg:text-right"
          >
            Three Ethiopian origins. Clear roast profiles. Short tasting notes so
            you can choose with confidence.
          </motion.p>
        </div>

        <ul
          className="mt-14 list-none border-t p-0 sm:mt-16 md:mt-20"
          style={{ borderColor: "var(--attana-line)" }}
        >
          {COFFEES.map((coffee, index) => (
            <motion.li
              key={coffee.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: 0.06 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-b py-8 sm:py-10"
              style={{ borderColor: "var(--attana-line)" }}
            >
              <article className="grid items-center gap-6 md:grid-cols-[minmax(0,200px)_minmax(0,1fr)_auto] md:gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_auto] lg:gap-14">
                <div
                  className="relative aspect-[16/10] overflow-hidden md:aspect-[4/3]"
                  style={{ background: "var(--attana-bg-elevated)" }}
                >
                  <Image
                    src={coffee.image}
                    alt={coffee.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 240px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className="text-[12px] uppercase tracking-[0.1em]"
                    style={{
                      color: "var(--attana-accent)",
                      fontFamily: "var(--font-plex), ui-monospace, monospace",
                    }}
                  >
                    {coffee.index}
                  </p>
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3
                      className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-none tracking-[-0.02em]"
                      style={{ color: "var(--attana-text)" }}
                    >
                      {coffee.name}
                    </h3>
                    <p
                      className="text-[12px] uppercase tracking-[0.08em]"
                      style={{
                        color: "var(--attana-muted)",
                        fontFamily: "var(--font-plex), ui-monospace, monospace",
                      }}
                    >
                      {coffee.meta}
                    </p>
                  </div>
                  <p
                    className="mt-4 max-w-[36rem] text-[15px] leading-[1.55] sm:text-[16px]"
                    style={{ color: "var(--attana-body)" }}
                  >
                    {coffee.note}
                  </p>
                </div>

                <button
                  type="button"
                  className="attana-link group/btn w-fit md:justify-self-end"
                >
                  View lot
                  <ArrowUpRight className="size-4 transition group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

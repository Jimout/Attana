"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

const NAV = [
  { label: "Story", href: "#story", index: "01" },
  { label: "Coffee", href: "#coffee", index: "02" },
  { label: "Origin", href: "#origin", index: "03" },
  { label: "Why", href: "#why", index: "04" },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300"
        style={{
          paddingInline: "var(--attana-pad-x)",
          background: scrolled || open
            ? "color-mix(in srgb, var(--attana-bg) 92%, transparent)"
            : "transparent",
          backdropFilter: scrolled || open ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled || open ? "blur(12px)" : "none",
          borderBottom:
            scrolled || open
              ? "1px solid var(--attana-line)"
              : "1px solid transparent",
        }}
      >
        <div className="flex h-[64px] w-full items-center justify-between gap-4 sm:h-[72px]">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="relative z-[60] inline-flex shrink-0 items-center transition hover:opacity-80"
            aria-label="Attana home"
          >
            <img
              src="/images/logos/NavLogo.png"
              alt="Attana"
              width={1881}
              height={836}
              className="h-10 w-auto sm:h-11"
              decoding="async"
            />
          </a>

          <nav
            className="hidden items-center gap-7 text-[12px] font-medium uppercase tracking-[0.12em] md:flex"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              color: "color-mix(in srgb, var(--attana-cream) 80%, transparent)",
            }}
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-[var(--attana-cream)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="relative z-[60] flex items-center gap-3">
            <a
              href="#coffee"
              onClick={() => setOpen(false)}
              className="hidden rounded-full px-[14px] py-[9px] text-[13px] font-medium leading-none tracking-[-0.01em] transition hover:brightness-110 md:inline-flex sm:text-[14px]"
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                backgroundColor: "var(--attana-accent)",
                color: "var(--attana-cream)",
              }}
            >
              Explore Coffee
            </a>

            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full border md:hidden"
              style={{
                borderColor: "color-mix(in srgb, var(--attana-cream) 28%, transparent)",
                color: "var(--attana-cream)",
                background: open
                  ? "color-mix(in srgb, var(--attana-cream) 8%, transparent)"
                  : "transparent",
              }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-4" aria-hidden>
                <span
                  className="absolute left-0 top-0 block h-px w-full origin-center bg-current transition duration-300"
                  style={{
                    transform: open
                      ? "translateY(6.5px) rotate(45deg)"
                      : "translateY(0) rotate(0)",
                  }}
                />
                <span
                  className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current transition duration-200"
                  style={{ opacity: open ? 0 : 1 }}
                />
                <span
                  className="absolute bottom-0 left-0 block h-px w-full origin-center bg-current transition duration-300"
                  style={{
                    transform: open
                      ? "translateY(-6.5px) rotate(-45deg)"
                      : "translateY(0) rotate(0)",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "var(--attana-bg)" }}
          >
            <div
              className="flex h-full flex-col pb-10 pt-[88px]"
              style={{ paddingInline: "var(--attana-pad-x)" }}
            >
              <p
                className="mb-8 flex items-baseline gap-3 text-[12px] uppercase tracking-[0.08em]"
                style={{
                  fontFamily: "var(--font-plex), ui-monospace, monospace",
                  color: "var(--attana-muted)",
                }}
              >
                <span style={{ color: "var(--attana-accent)" }}>(00)</span>
                <span>Menu</span>
              </p>

              <nav aria-label="Mobile primary" className="flex flex-1 flex-col">
                <ul
                  className="m-0 list-none border-t p-0"
                  style={{ borderColor: "var(--attana-line)" }}
                >
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.35 }}
                      className="border-b"
                      style={{ borderColor: "var(--attana-line)" }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between gap-4 py-5"
                      >
                        <span
                          className="text-[clamp(1.75rem,7vw,2.25rem)] font-semibold uppercase leading-none tracking-[-0.03em]"
                          style={{
                            fontFamily:
                              "var(--font-mona), 'Helvetica Neue', Arial, sans-serif",
                            color: "var(--attana-cream)",
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="text-[12px] uppercase tracking-[0.1em]"
                          style={{
                            fontFamily: "var(--font-plex), ui-monospace, monospace",
                            color: "var(--attana-accent)",
                          }}
                        >
                          {item.index}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <a
                href="#coffee"
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full px-[18px] py-[14px] text-[14px] font-medium leading-none tracking-[-0.01em] transition hover:brightness-110"
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  backgroundColor: "var(--attana-accent)",
                  color: "var(--attana-cream)",
                }}
              >
                Explore Coffee
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

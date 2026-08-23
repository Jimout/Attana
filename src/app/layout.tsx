import type { Metadata } from "next"
import { DM_Serif_Display, Inter } from "next/font/google"

import { SmoothScroll } from "@/components/smooth-scroll"
import { cn } from "@/lib/utils"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Attana Coffee | From Ethiopia, with character",
  description:
    "Coffee shaped by altitude, craft and the place it comes from. Discover Attana, a contemporary expression of Ethiopian coffee.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, dmSerif.variable)}
    >
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Caveat, DM_Serif_Display, Inter } from "next/font/google"

import { cn } from "@/lib/utils"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
})

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-caveat",
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
      className={cn(
        "font-sans",
        inter.variable,
        dmSerif.variable,
        caveat.variable
      )}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}

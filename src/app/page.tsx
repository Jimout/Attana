import { Hero } from "@/components/hero/hero"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturedCoffeeSection } from "@/components/sections/featured-coffee-section"
import { MosaicSection } from "@/components/sections/mosaic-section"
import { OriginSection } from "@/components/sections/origin-section"
import { SiteFooter } from "@/components/sections/site-footer"
import { WhyAttanaSection } from "@/components/sections/why-attana-section"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <AboutSection />
      <MosaicSection />
      <FeaturedCoffeeSection />
      <OriginSection />
      <WhyAttanaSection />
      <SiteFooter />
    </main>
  )
}

import { Hero } from "@/components/hero/hero"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturedCoffeeSection } from "@/components/sections/featured-coffee-section"
import { FeaturedWorkSection } from "@/components/sections/featured-work-section"
import { SiteFooter } from "@/components/sections/site-footer"
import { StudioStandardSection } from "@/components/sections/studio-standard-section"
import { WhyAttanaSection } from "@/components/sections/why-attana-section"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <AboutSection />
      <StudioStandardSection />
      <FeaturedCoffeeSection />
      <FeaturedWorkSection />
      <WhyAttanaSection />
      <SiteFooter />
    </main>
  )
}

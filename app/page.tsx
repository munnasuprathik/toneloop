import { Header } from "@/components/header"
import HeroSection from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeatureSection } from "@/components/feature-section"
import { UserJourneySection } from "@/components/user-journey-section"
import { AIPersonaSection } from "@/components/ai-persona-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FeatureSection />
        <UserJourneySection />
        <AIPersonaSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}


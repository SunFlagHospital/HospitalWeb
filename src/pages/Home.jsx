import SEO from '@/seo/SEO'
import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import SpecialitiesSection from '@/components/home/SpecialitiesSection'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import { DoctorsPreview, TestimonialsSection } from '@/components/home/DoctorsAndTestimonials'
import { AppointmentCTA, FAQSection } from '@/components/home/CTAAndFAQ'
import MapSection from '@/components/home/MapSection'

export default function Home() {
  return (
    <>
      <SEO
        title="Sunflag Global Hospital Rohtak | World-Class Healthcare"
        description="Sunflag Global Hospital Rohtak — Advanced medical care with compassion. Expert doctors, 50+ specialities, 24/7 emergency. NABH Accredited."
        canonical="/"
      />
      <HeroSection />
      <StatsSection />
      <SpecialitiesSection />
      <WhyChooseUs />
      <DoctorsPreview />
      <TestimonialsSection />
      <AppointmentCTA />
      <FAQSection />
      <MapSection />
    </>
  )
}

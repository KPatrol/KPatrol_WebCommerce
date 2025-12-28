import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { SpecsSection } from '@/components/sections/SpecsSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SpecsSection />
      <UseCasesSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </main>
  );
}

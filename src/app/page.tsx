import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { SpecsSection } from '@/components/sections/SpecsSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SpecsSection />
      <UseCasesSection />
      <CTASection />
      <Footer />
    </main>
  );
}

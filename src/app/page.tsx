'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { LiveMapSection } from '@/components/sections/LiveMapSection';
import { FeaturesBentoSection } from '@/components/sections/FeaturesBentoSection';
import { ContactCTASection } from '@/components/sections/ContactCTASection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { useStore } from '@/store/useStore';

export default function Home() {
  const viewMode = useStore((s) => s.viewMode);
  const isFull = viewMode === 'full';

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <HeroSection />
      <LiveMapSection />
      <FeaturesBentoSection />
      {isFull && (
        <>
          <PricingSection />
          <TestimonialsSection />
          <PartnersSection />
          <FAQSection />
          <CTASection />
        </>
      )}
      <ContactCTASection />
      <Footer />
    </main>
  );
}

"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import ProductPreviewSection from "@/components/landing/ProductPreviewSection";
import FoundationSection from "@/components/landing/FoundationSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import PricingSection from "@/components/landing/PricingSection";
import PartnersStrip from "@/components/landing/PartnersStrip";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";

export default function LandingPage() {
  useScrollReveal();

  return (
    <>
      <HeroSection />
      <TrustBar />
      <HowItWorksSection />
      <ProblemSection />
      <SolutionSection />
      <ProductPreviewSection />
      <FoundationSection />
      <UseCasesSection />
      <PricingSection />
      <PartnersStrip />
      <FAQSection />
      <CTASection />
    </>
  );
}

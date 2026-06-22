"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FoundationSection from "@/components/landing/FoundationSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";

export default function LandingPage() {
  useScrollReveal();

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FoundationSection />
      <PricingSection />
      <CTASection />
    </>
  );
}

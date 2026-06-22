"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-lg pt-2xl relative"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-lg items-center">
        {/* Sovereign tagline */}
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] opacity-0 animate-fade-in-up stagger-1">
          Sovereign Artificial Intelligence
        </p>

        {/* Main headline */}
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight opacity-0 animate-fade-in-up stagger-2">
          Unite Your Intelligence.
          <br />
          <span className="italic text-surface-tint">Keep Your Data.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-body-base text-body-base md:text-lg text-on-surface-variant max-w-2xl font-light leading-relaxed opacity-0 animate-fade-in-up stagger-3 mt-4">
          The production-grade Rust daemon for enterprise federated learning.
          Train models across organizational boundaries without transferring raw
          data.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-md mt-xl opacity-0 animate-fade-in-up stagger-4">
          <Link href="/sign-up" className="btn-primary">
            Begin Journey
          </Link>
          <a href="#story" className="btn-secondary">
            Read Manifesto
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up stagger-4 flex flex-col items-center gap-4">
        <span className="font-mono-ui text-mono-ui uppercase tracking-widest text-outline opacity-50">
          Scroll to explore
        </span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

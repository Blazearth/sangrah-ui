"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-lg py-md transition-all duration-300 glass-panel border-b ${
        scrolled
          ? "border-outline-variant/20"
          : "border-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link
          href="/"
          className="font-display-lg text-headline-md tracking-tighter text-primary hover:opacity-80 transition-opacity"
        >
          Sangrah
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-xl font-body-base text-body-sm text-on-surface-variant tracking-wide uppercase">
          <a
            href="/#story"
            className="hover:text-primary transition-colors duration-300"
          >
            The Story
          </a>
          <a
            href="/#foundation"
            className="hover:text-primary transition-colors duration-300"
          >
            Foundation
          </a>
          <a
            href="/#pricing"
            className="hover:text-primary transition-colors duration-300"
          >
            Pricing
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-sm">
          <Link
            href="/sign-in"
            className="font-body-base text-body-sm text-on-surface-variant hover:text-primary transition-colors bg-transparent px-md py-sm rounded tracking-wide"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="font-body-base text-body-sm bg-primary text-on-primary hover:bg-surface-tint transition-colors px-md py-sm rounded font-medium tracking-wide"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-outline-variant/20 pt-4 flex flex-col gap-4">
          <a
            href="/#story"
            className="font-body-base text-body-sm text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wide"
            onClick={() => setMobileOpen(false)}
          >
            The Story
          </a>
          <a
            href="/#foundation"
            className="font-body-base text-body-sm text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wide"
            onClick={() => setMobileOpen(false)}
          >
            Foundation
          </a>
          <a
            href="/#pricing"
            className="font-body-base text-body-sm text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wide"
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </a>
          <div className="flex gap-sm mt-2">
            <Link
              href="/sign-in"
              className="font-body-base text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="font-body-base text-body-sm bg-primary text-on-primary hover:bg-surface-tint transition-colors px-md py-sm rounded font-medium tracking-wide"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

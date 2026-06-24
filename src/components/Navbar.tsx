"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#hero", label: "Product", id: "hero", page: false },
  { href: "/security", label: "Security", id: null, page: true },
  { href: "/docs", label: "Documentation", id: null, page: true },
  { href: "/#contact", label: "Contact", id: "contact", page: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHome) return;

      const sectionIds = navLinks
        .filter((l) => l.id)
        .map((l) => l.id as string);

      let current: string | null = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const linkClass = (id: string | null, href: string) => {
    const isPageActive = href === pathname;
    const isSectionActive = isHome && id && activeSection === id;
    const isActive = isPageActive || isSectionActive;

    return `transition-colors duration-200 ${
      isActive
        ? "text-primary font-semibold border-b-2 border-primary pb-0.5"
        : "text-on-surface-variant hover:text-primary hover:opacity-80"
    }`;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-lg py-md transition-all duration-200 border-b ${
        scrolled
          ? "bg-surface/80 backdrop-blur-xl border-outline-variant/30"
          : "bg-surface/60 backdrop-blur-xl border-outline-variant/20"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="font-display-lg text-headline-md tracking-tighter text-primary hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
        >
          Sangrah
        </Link>

        <div className="hidden md:flex gap-md font-body-base text-body-base">
          {navLinks.map(({ href, label, id }) =>
            href.startsWith("/#") ? (
              <a key={href} href={href} className={linkClass(id, href)}>
                {label}
              </a>
            ) : (
              <Link key={href} href={href} className={linkClass(id, href)}>
                {label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex gap-sm">
          <Link
            href="/sign-in"
            className="font-body-base text-body-sm text-on-surface-variant hover:text-primary transition-colors bg-transparent border border-outline-variant px-md py-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="font-body-base text-body-sm bg-primary text-on-primary hover:opacity-90 transition-opacity px-md py-sm rounded font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden text-primary p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-outline-variant/20 pt-4 flex flex-col gap-4">
          {navLinks.map(({ href, label, id }) =>
            href.startsWith("/#") ? (
              <a
                key={href}
                href={href}
                className={linkClass(id, href)}
                onClick={closeMobile}
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className={linkClass(id, href)}
                onClick={closeMobile}
              >
                {label}
              </Link>
            )
          )}
          <div className="flex gap-sm mt-2">
            <Link
              href="/sign-in"
              className="font-body-base text-body-sm text-on-surface-variant hover:text-primary transition-colors border border-outline-variant px-md py-sm rounded"
              onClick={closeMobile}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="font-body-base text-body-sm bg-primary text-on-primary hover:opacity-90 transition-opacity px-md py-sm rounded font-medium"
              onClick={closeMobile}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

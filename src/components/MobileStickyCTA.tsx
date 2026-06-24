"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-obsidian/90 backdrop-blur-lg border-t border-outline-variant/20">
      <Link
        href="/sign-up"
        className="btn-primary w-full block text-center focus-visible:ring-2 focus-visible:ring-secondary"
      >
        Get Started
      </Link>
    </div>
  );
}

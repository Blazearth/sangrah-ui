"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Hook to trigger .reveal → .active transition
 * when elements enter the viewport via IntersectionObserver.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLElement | null>(null);

  const observe = useCallback(() => {
    if (typeof window === "undefined") return;

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = observe();
    return cleanup;
  }, [observe]);

  return containerRef;
}

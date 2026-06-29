"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

function useScrollCounter(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let start: number | null = null;
        const step = (ts: number) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* Problem: raw DATA drains inward → one-way red siphon into a warning silo */
function DataSiphonViz() {
  const sources = [
    { label: "Hospital A", x: 18, y: 20 },
    { label: "Bank X", x: 82, y: 20 },
    { label: "Corp Z", x: 18, y: 80 },
    { label: "Lab M", x: 82, y: 80 },
  ];
  const cx = 50;
  const cy = 50;

  return (
    <div className="w-full aspect-[4/3] bg-surface-container border border-error/20 rounded-xl overflow-hidden relative">
      {/* Ominous red vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,180,171,0.08) 0%, transparent 55%)",
        }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
        {/* Inward-only streams — data leaving the org */}
        {sources.map((src, i) => (
          <g key={src.label}>
            <line
              x1={src.x}
              y1={src.y}
              x2={cx}
              y2={cy}
              stroke="rgba(255,180,171,0.22)"
              strokeWidth="0.4"
              strokeDasharray="2 1.5"
              className="animate-dash-flow"
              style={{ animationDuration: "1.8s", animationDelay: `${i * 0.2}s` }}
            />
            {/* Multiple red packets — feels like a drain */}
            {[0, 0.35, 0.7].map((offset, j) => (
              <circle key={j} r="0.9" fill="#ffb4ab" opacity={0.85 - j * 0.15}>
                <animateMotion
                  dur={`${1.8 + i * 0.15}s`}
                  repeatCount="indefinite"
                  begin={`${offset * (1.8 + i * 0.15)}s`}
                  path={`M${src.x},${src.y} L${cx},${cy}`}
                />
              </circle>
            ))}
          </g>
        ))}

        {/* Danger zone ring — pulsing */}
        <circle
          cx={cx}
          cy={cy}
          r="11"
          fill="rgba(255,180,171,0.06)"
          stroke="rgba(255,180,171,0.35)"
          strokeWidth="0.4"
          className="animate-pulse-glow"
        />
      </svg>

      {/* Central warning silo — square vault, not a network hub */}
      <div
        className="absolute z-10 flex flex-col items-center gap-1"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div className="w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] rounded-lg bg-error/10 border-2 border-error/40 flex items-center justify-center animate-pulse-glow shadow-[0_0_24px_rgba(255,180,171,0.15)]">
          <AlertTriangle className="w-6 h-6 text-error/80" strokeWidth={1.5} />
        </div>
        <span className="font-mono-ui text-[7px] md:text-[8px] text-error/70 uppercase tracking-wider whitespace-nowrap">
          Centralized Silo
        </span>
      </div>

      {/* Generic grey source boxes — no icons, data is anonymous once pooled */}
      {sources.map((src) => (
        <div
          key={src.label}
          className="absolute flex flex-col items-center gap-1 z-10"
          style={{ left: `${src.x}%`, top: `${src.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-md bg-surface-container-high border border-outline-variant/40 flex items-center justify-center">
            <div className="w-4 h-4 rounded-sm bg-on-surface-variant/30" />
          </div>
          <span className="font-mono-ui text-[7px] md:text-[8px] text-on-surface-variant/55 uppercase tracking-wider whitespace-nowrap">
            {src.label}
          </span>
        </div>
      ))}

      {/* Red scan sweep — surveillance / exposure feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,180,171,0.06) 50%, transparent 100%)",
          backgroundSize: "100% 15%",
          animation: "scanLine 3.5s linear infinite",
        }}
      />

      <div className="absolute bottom-3 left-4 font-mono-ui text-[8px] text-error/55 uppercase tracking-widest">
        ↓ Data flowing to centralized silo
      </div>
    </div>
  );
}

export default function ProblemSection() {
  const breaches = useScrollCounter(4712);

  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="story">
      <div className="editorial-line mb-16 reveal" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="reveal flex flex-col gap-8">
          <div>
            <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
              01 / The Problem
            </p>
            <h2 className="font-display-lg text-headline-md md:text-4xl text-primary leading-tight">
              The Great Compromise.
            </h2>
          </div>

          <p className="font-body-base text-lg text-on-surface-variant font-light leading-relaxed">
            For a decade, the pursuit of artificial intelligence has demanded a
            dangerous sacrifice: the pooling of sensitive, proprietary data into
            centralized silos.
          </p>
          <p className="font-body-base text-lg text-on-surface-variant font-light leading-relaxed">
            Organizations were forced to choose between leveraging collective
            intelligence and maintaining absolute data sovereignty. The result
            was stalled innovation in highly regulated sectors and unacceptable
            risk profiles for those who moved forward.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <SpotlightCard
              accent="error"
              className="p-4 rounded-lg bg-surface-container/80 border border-outline-variant/15"
            >
              <span
                ref={breaches.ref}
                className="relative z-10 font-display-lg text-2xl md:text-3xl text-error tabular-nums"
              >
                {breaches.count.toLocaleString()}
              </span>
              <p className="relative z-10 font-mono-ui text-[10px] text-on-surface-variant/60 uppercase tracking-wider mt-1">
                Data breaches in 2024
              </p>
            </SpotlightCard>

            <SpotlightCard
              accent="error"
              className="p-4 rounded-lg bg-surface-container/80 border border-outline-variant/15"
            >
              <span className="relative z-10 font-display-lg text-2xl md:text-3xl text-error tabular-nums">
                $4.88T
              </span>
              <p className="relative z-10 font-mono-ui text-[10px] text-on-surface-variant/60 uppercase tracking-wider mt-1">
                Global cost of breaches
              </p>
            </SpotlightCard>
          </div>

          <blockquote className="border-l-2 border-error/30 pl-6 py-2">
            <p className="font-display-lg text-base italic text-on-surface-variant/80 leading-relaxed">
              &ldquo;The centralized approach to AI forces a false choice between
              intelligence and privacy.&rdquo;
            </p>
            <cite className="font-mono-ui text-xs text-outline-variant mt-2 block not-italic">
              — The Federation Manifesto
            </cite>
          </blockquote>
        </div>

        <div className="reveal">
          <DataSiphonViz />
          <p className="font-mono-ui text-[10px] text-on-surface-variant/50 text-center mt-4 uppercase tracking-widest leading-relaxed">
            Hospitals, banks &amp; enterprises forced to pool raw data
            <br />
            into vulnerable centralized silos — creating massive attack surfaces
          </p>
        </div>
      </div>
    </section>
  );
}

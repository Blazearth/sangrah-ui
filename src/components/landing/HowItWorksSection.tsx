"use client";

import { useState } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const steps = [
  {
    step: "01",
    title: "Deploy in Your VPC",
    description:
      "Install the Sangrah daemon inside your infrastructure. Your data never leaves your boundary.",
    metric: "Deploy time ~2 hrs",
    command: "sangrah init --node your-org",
  },
  {
    step: "02",
    title: "Train Locally",
    description:
      "Models train on your nodes using your data. Only cryptographically secured gradients are produced.",
    metric: "Raw data transferred: 0",
    command: "sangrah train --epoch 24",
  },
  {
    step: "03",
    title: "Aggregate Securely",
    description:
      "The coordinator aggregates masked gradients across the federation — no raw data is ever shared.",
    metric: "SecAgg · pairwise masking",
    command: "sangrah aggregate --verify",
  },
];

function DeployVisual({ active }: { active: boolean }) {
  return (
    <div className="relative h-36 rounded-lg bg-obsidian/80 border border-outline-variant/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent" />
      <div className="absolute inset-3 border border-dashed border-outline-variant/40 rounded-md flex flex-col justify-between p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono-ui text-[9px] text-outline uppercase tracking-wider">
            Your VPC
          </span>
          <span className="font-mono-ui text-[9px] text-secondary">🔒 isolated</span>
        </div>
        <div
          className={`mx-auto w-16 h-10 rounded border transition-all duration-500 ${
            active
              ? "border-secondary/60 bg-secondary/10 shadow-[0_0_20px_rgba(177,197,255,0.2)]"
              : "border-outline-variant/30 bg-surface-container"
          }`}
        >
          <div className="h-full flex items-center justify-center">
            <div
              className={`w-2 h-2 rounded-full ${active ? "bg-secondary animate-pulse-glow" : "bg-outline-variant"}`}
            />
          </div>
        </div>
        <span className="font-mono-ui text-[8px] text-outline-variant truncate">
          {active ? "✓ node identity generated" : "awaiting init..."}
        </span>
      </div>
    </div>
  );
}

function TrainVisual({ active }: { active: boolean }) {
  return (
    <div className="relative h-36 rounded-lg bg-obsidian/80 border border-outline-variant/30 overflow-hidden">
      <div className="absolute inset-3 border border-secondary/20 rounded-md flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Data dots stay inside boundary */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-700 ${
                active ? "bg-secondary/80" : "bg-outline-variant/40"
              }`}
              style={{
                top: `${20 + (i % 3) * 25}%`,
                left: `${25 + Math.floor(i / 3) * 35}%`,
                animation: active ? `pulseGlow 2s ease-in-out ${i * 0.2}s infinite` : "none",
              }}
            />
          ))}
          <div
            className={`font-mono-ui text-[10px] transition-colors ${active ? "text-secondary" : "text-outline-variant"}`}
          >
            local training
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-3 font-mono-ui text-[8px] text-error/70">
        data never exits →
      </div>
    </div>
  );
}

function AggregateVisual({ active }: { active: boolean }) {
  const nodes = [
    { x: 20, y: 30 },
    { x: 50, y: 70 },
    { x: 80, y: 35 },
  ];
  return (
    <div className="relative h-36 rounded-lg bg-obsidian/80 border border-outline-variant/30 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {nodes.map((a, i) =>
          nodes.slice(i + 1).map((b, j) => (
            <line
              key={`${i}-${j}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(177,197,255,0.15)"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          ))
        )}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r={active ? 4 : 3}
              fill={active ? "#b1c5ff" : "#444748"}
              className={active ? "animate-pulse-glow" : ""}
            />
            {active && (
              <circle r="1.5" fill="#b1c5ff" opacity="0.9">
                <animateMotion
                  dur={`${2 + i * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M${n.x},${n.y} L50,50`}
                />
              </circle>
            )}
          </g>
        ))}
        <circle
          cx={50}
          cy={50}
          r={active ? 5 : 3}
          fill="none"
          stroke={active ? "rgba(177,197,255,0.5)" : "rgba(68,71,72,0.5)"}
          strokeWidth="0.5"
        />
      </svg>
      <div className="absolute bottom-2 left-3 font-mono-ui text-[8px] text-secondary/70">
        masked gradients only
      </div>
    </div>
  );
}

const visuals = [DeployVisual, TrainVisual, AggregateVisual];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="how-it-works">
      <div className="reveal text-center max-w-3xl mx-auto mb-16">
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
          Architecture
        </p>
        <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
          How It Works
        </h2>
        <p className="font-body-base text-lg text-on-surface-variant font-light mt-6">
          Three steps to collaborative AI without compromising data sovereignty.
        </p>
      </div>

      {/* Pipeline connector */}
      <div className="reveal hidden md:flex items-center justify-center gap-0 mb-10 max-w-2xl mx-auto">
        {steps.map((s, i) => (
          <div key={s.step} className="flex items-center flex-1">
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono-ui text-[10px] transition-all duration-300 ${
                active === i
                  ? "border-secondary bg-secondary/20 text-secondary scale-110"
                  : "border-outline-variant/40 text-outline-variant hover:border-secondary/40"
              }`}
            >
              {s.step}
            </button>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 transition-colors duration-500 ${
                  active > i ? "bg-secondary/50" : "bg-outline-variant/30"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => {
          const Visual = visuals[i];
          return (
            <SpotlightCard
              key={step.step}
              active={active === i}
              onClick={() => setActive(i)}
              className="reveal p-6 md:p-7"
            >
              <Visual active={active === i} />

              <div className="mt-5 flex items-center justify-between">
                <span className="font-mono-ui text-mono-ui text-outline-variant">
                  {step.step}
                </span>
                <span className="font-mono-ui text-[9px] text-secondary uppercase tracking-wider px-2 py-0.5 rounded border border-secondary/20 bg-secondary/5">
                  {step.metric}
                </span>
              </div>

              <h3 className="font-display-lg text-xl text-primary mt-3 mb-2">
                {step.title}
              </h3>
              <p className="font-body-base text-on-surface-variant font-light text-sm leading-relaxed mb-4">
                {step.description}
              </p>

              <code className="block font-mono-ui text-[10px] text-outline-variant bg-obsidian/60 border border-outline-variant/20 rounded px-3 py-2 truncate">
                $ {step.command}
              </code>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}

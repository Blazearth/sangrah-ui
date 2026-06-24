"use client";

import { useState } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { HeartPulse, Landmark, FlaskConical } from "lucide-react";

const useCases = [
  {
    id: "healthcare",
    icon: HeartPulse,
    industry: "Healthcare",
    title: "Cross-Hospital Research",
    description:
      "Train diagnostic models across hospital networks without centralizing patient records.",
    detail:
      "HIPAA-aligned by architecture — PHI stays inside each hospital firewall. Federated rounds aggregate model weights, never patient data.",
    stats: [
      { label: "PHI exported", value: "0" },
      { label: "Hospitals", value: "3+" },
      { label: "Compliance", value: "HIPAA" },
    ],
    accent: "secondary" as const,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "finance",
    icon: Landmark,
    industry: "Finance",
    title: "Fraud Detection",
    description:
      "Collaborate on fraud models while transaction data stays within each bank's perimeter.",
    detail:
      "Banks train on local ledger data. Only masked gradient updates reach the coordinator — adversaries never see individual transactions.",
    stats: [
      { label: "Data pooled", value: "Never" },
      { label: "Latency", value: "<50ms" },
    ],
    accent: "secondary" as const,
    span: "md:col-span-2 md:col-start-3 md:row-start-1",
  },
  {
    id: "research",
    icon: FlaskConical,
    industry: "Research",
    title: "Academic Consortia",
    description:
      "Multi-institution ML research without sharing proprietary datasets.",
    detail:
      "Universities join a federation, each keeping datasets on-premise. Open collaboration on model architecture, closed data boundaries.",
    stats: [
      { label: "Nodes", value: "5+" },
      { label: "Open science", value: "✓" },
    ],
    accent: "secondary" as const,
    span: "md:col-span-2 md:col-start-3 md:row-start-2",
  },
];

function UseCaseVisual({
  id,
  active,
}: {
  id: string;
  active: boolean;
}) {
  if (id === "healthcare") {
    return (
      <div className="relative h-full min-h-[140px] rounded-lg bg-obsidian/60 border border-outline-variant/20 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 200 120">
          {/* Hospital nodes */}
          {[
            { x: 40, y: 40, label: "H-A" },
            { x: 100, y: 70, label: "H-B" },
            { x: 160, y: 40, label: "H-C" },
          ].map((h) => (
            <g key={h.label}>
              <rect
                x={h.x - 18}
                y={h.y - 14}
                width={36}
                height={28}
                rx={3}
                fill={active ? "rgba(177,197,255,0.08)" : "rgba(68,71,72,0.2)"}
                stroke={active ? "rgba(177,197,255,0.3)" : "rgba(68,71,72,0.4)"}
                strokeWidth="0.5"
              />
              <text
                x={h.x}
                y={h.y + 3}
                textAnchor="middle"
                fill={active ? "#b1c5ff" : "#8e9192"}
                fontSize="8"
                fontFamily="monospace"
              >
                {h.label}
              </text>
            </g>
          ))}
          {/* Model travels, not data */}
          {active && (
            <circle r="3" fill="#b1c5ff">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M40,40 L100,70 L160,40 L100,70 L40,40"
              />
            </circle>
          )}
          <text x={100} y={110} textAnchor="middle" fill="#ffb4ab" fontSize="7" fontFamily="monospace">
            ✕ no patient data moves
          </text>
        </svg>
      </div>
    );
  }

  if (id === "finance") {
    return (
      <div className="relative h-full min-h-[100px] rounded-lg bg-obsidian/60 border border-outline-variant/20 overflow-hidden flex items-center justify-around px-4">
        {["Bank A", "Bank B", "Bank C"].map((bank, i) => (
          <div key={bank} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-12 rounded border flex items-center justify-center transition-all duration-500 ${
                active
                  ? "border-secondary/40 bg-secondary/10"
                  : "border-outline-variant/30"
              }`}
            >
              <Landmark
                className={`w-4 h-4 ${active ? "text-secondary" : "text-outline-variant"}`}
                strokeWidth={1.5}
              />
            </div>
            <span className="font-mono-ui text-[8px] text-outline-variant">{bank}</span>
            {active && (
              <span className="font-mono-ui text-[7px] text-secondary animate-pulse-glow">
                fraud ↓ {12 - i * 3}%
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[100px] rounded-lg bg-obsidian/60 border border-outline-variant/20 overflow-hidden p-4">
      <div className="flex justify-between items-end h-full gap-3">
        {["MIT", "Stanford", "Oxford"].map((uni, i) => (
          <div key={uni} className="flex-1 flex flex-col items-center gap-2">
            <div
              className={`w-full rounded-t border-x border-t transition-all duration-500 ${
                active ? "border-secondary/30 bg-secondary/10" : "border-outline-variant/20 bg-surface-container"
              }`}
              style={{ height: `${40 + i * 15}px` }}
            />
            <span className="font-mono-ui text-[7px] text-outline-variant">{uni}</span>
          </div>
        ))}
      </div>
      {active && (
        <div className="absolute top-2 right-2 font-mono-ui text-[8px] text-secondary">
          federated epoch ↑
        </div>
      )}
    </div>
  );
}

export default function UseCasesSection() {
  const [active, setActive] = useState("healthcare");

  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="use-cases">
      <div className="reveal text-center max-w-3xl mx-auto mb-16">
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
          Industries
        </p>
        <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
          Built for Sensitive Domains
        </h2>
        <p className="font-body-base text-lg text-on-surface-variant font-light mt-6">
          Where data sovereignty isn&apos;t optional — it&apos;s the law. Click a
          card to explore each scenario.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-fr">
        {useCases.map((uc) => {
          const Icon = uc.icon;
          const isActive = active === uc.id;
          return (
            <SpotlightCard
              key={uc.id}
              active={isActive}
              onClick={() => setActive(uc.id)}
              className={`reveal p-6 flex flex-col ${uc.span}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                      isActive
                        ? "border-secondary/40 bg-secondary/15"
                        : "border-outline-variant/30 bg-surface-container"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-secondary" : "text-outline-variant"}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="font-mono-ui text-[9px] text-outline uppercase tracking-wider">
                      {uc.industry}
                    </p>
                    <h3 className="font-display-lg text-lg text-primary leading-tight">
                      {uc.title}
                    </h3>
                  </div>
                </div>
              </div>

              <UseCaseVisual id={uc.id} active={isActive} />

              <p className="font-body-base text-on-surface-variant font-light text-sm leading-relaxed mt-4">
                {isActive ? uc.detail : uc.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {uc.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`px-2.5 py-1 rounded border font-mono-ui text-[9px] uppercase tracking-wider transition-colors ${
                      isActive
                        ? "border-secondary/25 bg-secondary/5 text-secondary"
                        : "border-outline-variant/20 text-outline-variant"
                    }`}
                  >
                    {stat.label}: {stat.value}
                  </div>
                ))}
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}

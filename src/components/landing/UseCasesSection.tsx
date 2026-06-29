"use client";

import { HeartPulse, Landmark, FlaskConical, TrendingUp } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const useCases = [
  {
    icon: HeartPulse,
    industry: "Healthcare",
    title: "Cross-Hospital Research",
    description:
      "Train diagnostic models across hospital networks without centralizing patient records. HIPAA-aligned by architecture.",
    stat: "12 hospitals",
    metric: "Connected in federation",
    badges: ["HIPAA", "PHI Safe"],
  },
  {
    icon: Landmark,
    industry: "Finance",
    title: "Fraud Detection at Scale",
    description:
      "Collaborate on fraud models across institutions while keeping transaction data within each bank's perimeter.",
    stat: "99.7%",
    metric: "Detection accuracy",
    badges: ["SOX", "PCI-DSS"],
  },
  {
    icon: FlaskConical,
    industry: "Research",
    title: "Academic Consortia",
    description:
      "Enable multi-institution ML research — up to 5 federation nodes for open collaboration.",
    stat: "5 nodes",
    metric: "Free forever",
    badges: ["Open Access", "Reproducible"],
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="use-cases">
      <div className="reveal text-center max-w-3xl mx-auto mb-20">
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
          Industries
        </p>
        <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
          Built for Sensitive Domains
        </h2>
        <p className="font-body-base text-lg text-on-surface-variant font-light mt-6">
          Where data sovereignty isn&apos;t optional — it&apos;s the law.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {useCases.map(({ icon: Icon, industry, title, description, stat, metric, badges }) => (
          <SpotlightCard
            key={industry}
            accent="secondary"
            className="reveal p-8 rounded-xl bg-surface-container/40 backdrop-blur-md border border-outline-variant/20"
          >
            <div className="relative z-10 flex flex-col gap-5 h-full">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                </div>
                <p className="font-mono-ui text-mono-ui text-outline uppercase tracking-wider">
                  {industry}
                </p>
              </div>

              <h3 className="font-display-lg text-xl text-primary">{title}</h3>
              <p className="font-body-base text-on-surface-variant font-light leading-relaxed flex-grow">
                {description}
              </p>

              <div className="flex items-center gap-2 pt-3 border-t border-outline-variant/10">
                <TrendingUp className="w-3.5 h-3.5 text-secondary/70" strokeWidth={1.5} />
                <span className="font-display-lg text-lg text-secondary">{stat}</span>
                <span className="font-mono-ui text-[9px] text-on-surface-variant/50 uppercase tracking-wider">
                  {metric}
                </span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="font-mono-ui text-[9px] uppercase tracking-wider px-2 py-1 rounded bg-surface-container-high border border-outline-variant/20 text-on-surface-variant/50"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

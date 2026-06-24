import Link from "next/link";
import { Activity, Users, ShieldCheck, ArrowRight } from "lucide-react";

export default function ProductPreviewSection() {
  return (
    <section
      className="py-32 px-lg bg-surface-container-lowest/30 border-y border-outline-variant/10"
      id="platform"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal flex flex-col gap-6">
            <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em]">
              Platform
            </p>
            <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
              Command Your Federation
            </h2>
            <p className="font-body-base text-lg text-on-surface-variant font-light leading-relaxed">
              Monitor training rounds, audit every gradient exchange, and manage
              participants — all from a unified dashboard built for enterprise
              operators.
            </p>
            <ul className="flex flex-col gap-3 font-mono-ui text-sm text-outline-variant mt-2">
              <li className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-secondary" />
                Real-time epoch &amp; round monitoring
              </li>
              <li className="flex items-center gap-3">
                <Users className="w-4 h-4 text-secondary" />
                Participant health &amp; enrollment
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                Privacy budget &amp; audit trail
              </li>
            </ul>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 font-mono-ui text-xs text-secondary uppercase tracking-wider hover:text-primary transition-colors mt-4 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
            >
              Explore Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Dashboard mock */}
          <div className="reveal relative">
            <div className="absolute -inset-4 bg-secondary/5 rounded-2xl blur-2xl pointer-events-none" />
            <div className="relative glass-panel rounded-xl overflow-hidden border border-outline-variant/20 shadow-2xl">
              {/* Mock topbar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-outline-variant/20 bg-surface-container/80">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/40" />
                </div>
                <span className="font-mono-ui text-[10px] text-outline-variant uppercase tracking-widest">
                  Federation Dashboard
                </span>
              </div>

              <div className="p-5 grid grid-cols-2 gap-3">
                {/* Epoch card */}
                <div className="col-span-2 p-4 rounded-lg bg-surface-container border border-outline-variant/20">
                  <p className="font-mono-ui text-[10px] text-outline uppercase tracking-wider mb-2">
                    Active Epoch
                  </p>
                  <div className="flex items-end justify-between">
                    <span className="font-display-lg text-3xl text-primary">
                      24
                    </span>
                    <span className="font-mono-ui text-xs text-secondary">
                      Round 3/5 · 5 nodes
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full w-[60%] bg-secondary/60 rounded-full animate-pulse-glow" />
                  </div>
                </div>

                {/* Mini stat cards */}
                {[
                  { label: "Participants", value: "5/5", status: "Healthy" },
                  { label: "Privacy ε", value: "3.2", status: "Within budget" },
                  { label: "Models", value: "12", status: "Signed" },
                  { label: "Drift", value: "None", status: "Stable" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-lg bg-surface-container border border-outline-variant/15"
                  >
                    <p className="font-mono-ui text-[9px] text-outline uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="font-display-lg text-lg text-primary mt-1">
                      {stat.value}
                    </p>
                    <p className="font-mono-ui text-[9px] text-secondary/70 mt-0.5">
                      {stat.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

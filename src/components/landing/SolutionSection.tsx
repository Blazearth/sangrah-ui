"use client";

import {
  Building2,
  FlaskConical,
  Hospital,
  Landmark,
  Lock,
  Settings2,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const nodes = [
  { id: "hospital", label: "Hospital A", sub: "Patient Records", x: 22, y: 26, Icon: Hospital },
  { id: "bank", label: "Bank X", sub: "Transaction Data", x: 78, y: 26, Icon: Landmark },
  { id: "lab", label: "Research Lab", sub: "Genomic Data", x: 18, y: 78, Icon: FlaskConical },
  { id: "corp", label: "Enterprise Z", sub: "Proprietary Data", x: 82, y: 78, Icon: Building2 },
];

const cx = 50;
const cy = 50;

/* Solution: MODELS travel outward ↗, encrypted GRADIENTS return ↙ — data never moves */
function FederationViz() {
  return (
    <div className="w-full aspect-[4/3] bg-surface-container border border-secondary/20 rounded-xl overflow-hidden relative">
      {/* Calm blue federation glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 52%, rgba(177,197,255,0.1) 0%, transparent 60%)",
        }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
        {/* Secure aggregation ring */}
        <circle
          cx={cx}
          cy={cy}
          r="14"
          fill="none"
          stroke="rgba(177,197,255,0.12)"
          strokeWidth="0.3"
          strokeDasharray="1.5 1"
        />
        <circle
          cx={cx}
          cy={cy}
          r="14"
          fill="none"
          stroke="rgba(177,197,255,0.25)"
          strokeWidth="0.15"
          className="animate-ripple"
        />

        {nodes.map((node, i) => (
          <g key={node.id}>
            {/* Connection */}
            <line
              x1={node.x}
              y1={node.y}
              x2={cx}
              y2={cy}
              stroke="rgba(177,197,255,0.18)"
              strokeWidth="0.35"
              strokeDasharray="1.2 1"
            />

            {/* Outbound: model travels center → node (larger, brighter) */}
            <circle r="1" fill="#ffffff" opacity="0.9">
              <animateMotion
                dur={`${2.8 + i * 0.2}s`}
                repeatCount="indefinite"
                path={`M${cx},${cy} L${node.x},${node.y}`}
              />
            </circle>

            {/* Inbound: masked gradient returns node → center (smaller, blue) */}
            <circle r="0.65" fill="#b1c5ff" opacity="0.75">
              <animateMotion
                dur={`${2.2 + i * 0.25}s`}
                repeatCount="indefinite"
                begin={`${1 + i * 0.3}s`}
                path={`M${node.x},${node.y} L${cx},${cy}`}
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Sangrah coordinator — healthy hub, not a silo */}
      <div
        className="absolute z-10 flex flex-col items-center gap-0.5"
        style={{ left: "50%", top: "52%", transform: "translate(-50%, -50%)" }}
      >
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-secondary/15 border-2 border-secondary/50 flex items-center justify-center shadow-[0_0_28px_rgba(177,197,255,0.2)]">
          <div className="absolute inset-0 rounded-full border border-secondary/25 animate-ripple" />
          <Settings2 className="w-5 h-5 text-secondary relative z-10" strokeWidth={1.5} />
        </div>
        <span className="font-mono-ui text-[7px] md:text-[8px] text-secondary uppercase tracking-wider whitespace-nowrap">
          Sangrah
        </span>
        <span className="font-mono-ui text-[6px] md:text-[7px] text-outline-variant/50 uppercase tracking-wider whitespace-nowrap">
          Secure Aggregation
        </span>
      </div>

      {/* Perimeter nodes — data locked locally */}
      {nodes.map((node) => {
        const Icon = node.Icon;
        return (
          <div
            key={node.id}
            className="absolute flex flex-col items-center gap-0.5 z-10"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Local data boundary — dashed ring shows data stays here */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-full border border-dashed border-secondary/20 pointer-events-none" />
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-surface-container-high border border-secondary/30 flex items-center justify-center">
                <Icon className="w-4 h-4 text-secondary" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-surface-container border border-secondary/30 flex items-center justify-center">
                <Lock className="w-2 h-2 text-secondary/70" strokeWidth={2} />
              </div>
            </div>
            <span className="font-mono-ui text-[7px] md:text-[8px] text-on-surface-variant/60 uppercase tracking-wider whitespace-nowrap mt-1">
              {node.label}
            </span>
            <span className="font-mono-ui text-[6px] md:text-[7px] text-secondary/45 uppercase tracking-wider whitespace-nowrap px-1 py-0.5 rounded border border-secondary/15 bg-surface-container-high/80">
              {node.sub}
            </span>
          </div>
        );
      })}

      <div className="absolute top-3 right-4 font-mono-ui text-[8px] text-secondary/50 uppercase tracking-widest">
        02 / The Sovereign Network
      </div>

      <div className="absolute bottom-3 left-4 flex gap-4 font-mono-ui text-[7px] text-outline-variant/50 uppercase tracking-wider">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white/80" /> Model out
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Gradient in
        </span>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Zero Data Ingestion",
    desc: "Your raw data never leaves your infrastructure. Models come to you.",
  },
  {
    title: "Cryptographic Gradient Aggregation",
    desc: "Only masked, encrypted model updates are transmitted across the network.",
  },
  {
    title: "Sovereign Node Identities",
    desc: "Ed25519-signed identities ensure every participant is verified and authorized.",
  },
];

export default function SolutionSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto border-t border-outline-variant/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="reveal order-2 lg:order-1">
          <FederationViz />
          <p className="font-mono-ui text-[10px] text-on-surface-variant/50 text-center mt-4 uppercase tracking-widest leading-relaxed">
            Models travel to data — data never travels to models
            <br />
            Only encrypted gradients leave your perimeter
          </p>
        </div>

        <div className="reveal order-1 lg:order-2 flex flex-col gap-8">
          <div>
            <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
              02 / The Solution
            </p>
            <h2 className="font-display-lg text-headline-md md:text-4xl text-primary leading-tight">
              Decentralized Power.
            </h2>
          </div>

          <p className="font-body-base text-lg text-on-surface-variant font-light leading-relaxed">
            Sangrah flips the paradigm. Instead of bringing your data to the
            model, we bring the model to your data.
          </p>
          <p className="font-body-base text-lg text-on-surface-variant font-light leading-relaxed">
            Through our secure enclave node architecture, models train locally
            within your infrastructure. Only cryptographically secured
            gradients—never raw data—are shared across the network.
          </p>

          <div className="flex flex-col gap-3">
            {features.map((item) => (
              <SpotlightCard
                key={item.title}
                accent="secondary"
                className="p-4 rounded-lg bg-surface-container-low/50 border border-outline-variant/15"
              >
                <div className="relative z-10 flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-secondary flex-shrink-0 animate-pulse-glow" />
                  <div>
                    <h4 className="font-mono-ui text-sm text-primary">{item.title}</h4>
                    <p className="font-body-base text-sm text-on-surface-variant/70 font-light mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

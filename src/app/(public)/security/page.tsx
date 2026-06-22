"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const securityFeatures = [
  {
    label: "Mutual TLS",
    title: "End-to-End mTLS Authentication",
    description:
      "Every connection between participant nodes and the coordinator is authenticated via mutual TLS with X.509 certificates. No anonymous traffic enters the federation.",
    code: `# Certificate verification
sangrah cert verify --node enterprise-a
  Issuer:  Sangrah Federation CA
  Subject: CN=enterprise-a.sangrah.net
  Valid:   2025-01-01 to 2026-01-01
  Status:  ✓ Valid`,
  },
  {
    label: "Model Signing",
    title: "Ed25519 Model Integrity",
    description:
      "Every model artifact is signed with Ed25519 before distribution. Participants verify signatures before accepting model updates, preventing supply-chain attacks on the learning pipeline.",
    code: `# Model signature verification
sangrah model verify --version 1.2.4
  Algorithm: Ed25519
  Signer:   coordinator@sangrah.net
  Hash:     sha256:a4f2c8...
  Status:   ✓ Signature valid`,
  },
  {
    label: "Differential Privacy",
    title: "Formal Privacy Guarantees",
    description:
      "Configurable (ε, δ)-differential privacy ensures that individual data points cannot be reverse-engineered from shared gradients. Privacy budgets are tracked per-epoch with automatic training halts when thresholds are reached.",
    code: `# Privacy budget status
sangrah privacy status
  Epsilon (ε):  3.2 / 10.0
  Delta (δ):    1e-5
  Mechanism:    Gaussian
  Epochs used:  24 / 50
  Status:       ✓ Within budget`,
  },
  {
    label: "Secure Aggregation",
    title: "Pairwise Masking Protocol",
    description:
      "Gradient updates are protected using a pairwise masking scheme. The coordinator aggregates masked gradients without ever seeing individual contributions — even a compromised coordinator learns nothing about any single participant.",
    code: `# Aggregation verification
sangrah aggregate verify --epoch 24
  Protocol:     SecAgg (pairwise)
  Participants: 5/5 masks verified
  Dropped:      0 (threshold: 2)
  Status:       ✓ Secure aggregation complete`,
  },
  {
    label: "Byzantine Resilience",
    title: "Multi-Krum Defense",
    description:
      "The Multi-Krum algorithm detects and excludes Byzantine (adversarial or faulty) gradient updates. Malicious participants cannot poison the global model — the aggregation is provably robust to a configurable fraction of corrupted nodes.",
    code: `# Byzantine detection log
sangrah audit byzantine --epoch 24
  Algorithm:    Multi-Krum (f=1)
  Scores:
    enterprise-a: 0.12 ✓
    enterprise-b: 0.15 ✓
    enterprise-c: 0.14 ✓
    enterprise-d: 3.82 ✗ EXCLUDED
  Status:       1 node excluded`,
  },
  {
    label: "Zero Trust",
    title: "Zero-Trust Architecture",
    description:
      "No implicit trust between any components. Every API call is authenticated, every model artifact is verified, every gradient is validated. The system assumes breach at every layer and verifies accordingly.",
    code: `# Security posture
sangrah security audit
  mTLS:          ✓ Enforced
  Model signing: ✓ Ed25519
  Privacy:       ✓ ε=3.2 (budget ok)
  SecAgg:        ✓ Pairwise masking
  Byzantine:     ✓ Multi-Krum active
  Cert rotation: ✓ 30-day cycle
  Overall:       HARDENED`,
  },
];

export default function SecurityPage() {
  useScrollReveal();

  return (
    <section className="pt-32 pb-20 px-lg">
      <div className="max-w-[1440px] mx-auto">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4 opacity-0 animate-fade-in-up stagger-1">
            Security Architecture
          </p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight opacity-0 animate-fade-in-up stagger-2">
            Trust Nothing.
            <br />
            <span className="italic text-surface-tint">Verify Everything.</span>
          </h1>
          <p className="font-body-base text-lg text-on-surface-variant font-light mt-6 opacity-0 animate-fade-in-up stagger-3">
            Sangrah implements defense-in-depth across every layer of the
            federated learning pipeline. Here&apos;s how we protect your data
            sovereignty.
          </p>
        </div>

        {/* Security Features */}
        <div className="flex flex-col gap-20">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.label}
              className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto"
            >
              {/* Text */}
              <div
                className={`flex flex-col gap-4 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <p className="font-mono-ui text-code-label text-secondary uppercase tracking-[0.15em]">
                  {String(index + 1).padStart(2, "0")} / {feature.label}
                </p>
                <h2 className="font-display-lg text-headline-md text-primary">
                  {feature.title}
                </h2>
                <p className="font-body-base text-lg text-on-surface-variant font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Terminal Block */}
              <div
                className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <div className="terminal-block rounded-xl p-6 md:p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-secondary-container/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                  <div className="flex gap-2 mb-6 items-center border-b border-outline-variant/20 pb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-surface-variant" />
                    <div className="w-2.5 h-2.5 rounded-full bg-surface-variant" />
                    <div className="w-2.5 h-2.5 rounded-full bg-surface-variant" />
                    <span className="ml-auto font-mono-ui text-[10px] text-outline-variant uppercase">
                      {feature.label}
                    </span>
                  </div>
                  <pre className="font-mono-ui text-xs md:text-sm leading-relaxed text-on-surface-variant whitespace-pre-wrap">
                    {feature.code}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

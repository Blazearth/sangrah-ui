"use client";

import { Accordion } from "@/components/ui/Accordion";

const faqItems = [
  {
    id: "data",
    question: "Does Sangrah ever see our raw data?",
    answer:
      "No. Sangrah never ingests raw data. Models train locally within your infrastructure, and only cryptographically secured gradients are shared across the federation. The coordinator aggregates masked updates without accessing individual contributions.",
  },
  {
    id: "infra",
    question: "What infrastructure do we need to deploy?",
    answer:
      "A Sangrah node runs as a lightweight Rust daemon inside your VPC or on-premise environment. You need outbound connectivity to the federation coordinator over mTLS. Typical deployment takes under 2 hours for a single node.",
  },
  {
    id: "diff",
    question: "How is this different from centralized ML?",
    answer:
      "Centralized ML requires pooling data in a shared location — creating compliance risk and single points of failure. Sangrah brings the model to your data, enabling collaborative training while each organization retains full sovereignty over their records.",
  },
  {
    id: "privacy",
    question: "What privacy guarantees do you provide?",
    answer:
      "Sangrah supports configurable (ε, δ)-differential privacy, secure aggregation via pairwise masking, and privacy budget tracking per epoch. Training automatically halts when privacy thresholds are reached.",
  },
  {
    id: "enterprise",
    question: "How does Enterprise onboarding work?",
    answer:
      "Enterprise deployments include a dedicated solutions engineer, custom SLA, on-premise orchestrator options, and quantum-resistant cryptography. Submit a request and our team will contact you within 24 hours to scope your federation.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="faq">
      <div className="reveal text-center max-w-3xl mx-auto mb-16">
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
          FAQ
        </p>
        <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
          Common Questions
        </h2>
      </div>

      <div className="reveal max-w-3xl mx-auto">
        <Accordion items={faqItems} defaultOpen="data" />
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowLeft, BookOpen, Terminal, Shield } from "lucide-react";

const docSections = [
  {
    icon: Terminal,
    title: "Quick Start",
    description: "Install the Sangrah CLI and initialize your first federation node in under 10 minutes.",
    href: "#quick-start",
  },
  {
    icon: Shield,
    title: "Security Model",
    description: "Understand mTLS, model signing, differential privacy, and secure aggregation.",
    href: "/security",
  },
  {
    icon: BookOpen,
    title: "API Reference",
    description: "REST endpoints for epochs, participants, models, and audit logs.",
    href: "#api",
  },
];

export default function DocsPage() {
  useScrollReveal();

  return (
    <div className="pt-32 pb-24 px-lg max-w-[1440px] mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono-ui text-xs text-outline-variant uppercase tracking-wider hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="reveal max-w-3xl mb-20">
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
          Documentation
        </p>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
          Technical Documentation
        </h1>
        <p className="font-body-base text-lg text-on-surface-variant font-light mt-6">
          Everything you need to deploy, configure, and operate a Sangrah
          federation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {docSections.map(({ icon: Icon, title, description, href }) => (
          <Link
            key={title}
            href={href}
            className="reveal group p-8 border border-outline-variant/20 rounded-xl bg-surface-container-low/50 hover:border-secondary/30 hover:-translate-y-1 transition-all duration-300"
          >
            <Icon className="w-6 h-6 text-secondary mb-4" strokeWidth={1.5} />
            <h2 className="font-display-lg text-xl text-primary mb-2">{title}</h2>
            <p className="font-body-base text-on-surface-variant font-light text-sm leading-relaxed">
              {description}
            </p>
          </Link>
        ))}
      </div>

      <div className="reveal terminal-block rounded-xl p-8 max-w-3xl" id="quick-start">
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-wider mb-4">
          Quick Start
        </p>
        <pre className="font-mono-ui text-sm text-on-surface-variant leading-loose">
          <code>{`# Install the CLI
cargo install sangrah-cli

# Initialize a node
sangrah init --node my-org

# Join a federation
sangrah join --coordinator coordinator.example.com`}</code>
        </pre>
      </div>
    </div>
  );
}

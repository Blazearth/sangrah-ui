"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowLeft, BookOpen, Terminal, Shield, GitBranch, Settings, Play } from "lucide-react";

const docSections = [
  {
    icon: Terminal,
    title: "Quick Start",
    description: "Clone the daemon, drop in your certificates, and join your first training round in under 10 minutes.",
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

const steps = [
  {
    step: "01",
    icon: GitBranch,
    title: "Clone the daemon",
    description: "Clone the federated learning client daemon from GitHub and build the Rust binary.",
    code: `git clone https://github.com/Blazearth/fed-learn-model.git
cd fed-learn-model/federated_learning_model
cargo build --release`,
  },
  {
    step: "02",
    icon: Shield,
    title: "Add your certificates",
    description: "The platform operator provides you with two files. Place them in a certs/ directory.",
    code: `mkdir -p /etc/fl-daemon/certs
# Copy the two files the operator sends you:
cp org-<your-id>.pem /etc/fl-daemon/certs/
cp org-<your-id>.key /etc/fl-daemon/certs/`,
  },
  {
    step: "03",
    icon: Settings,
    title: "Configure your node",
    description: "Create a config.toml pointing to your data and certificates.",
    code: `# /etc/fl-daemon/config.toml
organization_id = "org-<your-id>"

[coordinator]
base_url = "https://coordinator.fed-learn.online"
poll_interval_secs = 10

[certificates]
cert_path = "/etc/fl-daemon/certs/org-<your-id>.pem"
cert_dir  = "/etc/fl-daemon/certs/"

[[models]]
model_id    = "fraud-detection-v2"
data_source = "/data/your_data.parquet"`,
  },
  {
    step: "04",
    icon: Play,
    title: "Start training",
    description: "Run the daemon. It automatically polls the coordinator, trains locally, and submits encrypted updates.",
    code: `RUST_LOG=info ./target/release/fl-client-daemon \\
  /etc/fl-daemon/config.toml

# The daemon will:
# → Poll coordinator every 10s for active epochs
# → Download the global model from S3
# → Train locally on your data (data never leaves)
# → Submit encrypted model update
# → Wait for the next round`,
  },
];

const apiEndpoints = [
  { method: "GET", path: "/api/health", desc: "Coordinator health and timestamp" },
  { method: "GET", path: "/api/epochs/active?model_id=<id>", desc: "Active epoch metadata, ε/δ, participants" },
  { method: "GET", path: "/api/audit?model_id=<id>&limit=50", desc: "Immutable hash-chain audit entries" },
  { method: "POST", path: "/api/updates/upload-url", desc: "Get a pre-signed S3 URL to upload a model update" },
  { method: "POST", path: "/api/updates/complete", desc: "Notify coordinator that your update is ready" },
  { method: "POST", path: "/api/models/download-url", desc: "Get a pre-signed S3 URL to download the global model" },
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
          federation node. Your data never leaves your machine.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
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

      {/* Quick Start */}
      <div id="quick-start" className="mb-24">
        <div className="reveal mb-12">
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-3">
            Quick Start
          </p>
          <h2 className="font-display-lg text-3xl text-primary">
            Join a federation in 4 steps
          </h2>
          <p className="font-body-base text-on-surface-variant font-light mt-3 max-w-2xl">
            The platform operator registers your organisation and sends you two certificate files.
            That&apos;s all you need — no cloud account, no Kubernetes, no Docker.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map(({ step, icon: Icon, title, description, code }) => (
            <div key={step} className="reveal grid grid-cols-1 lg:grid-cols-2 gap-6 p-8 border border-outline-variant/15 rounded-xl bg-surface-container-low/30">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono-ui text-[11px] text-outline uppercase tracking-widest">{step}</span>
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-display-lg text-xl text-primary mb-2">{title}</h3>
                <p className="font-body-base text-on-surface-variant font-light text-sm leading-relaxed">{description}</p>
              </div>
              <div className="terminal-block rounded-lg p-5 overflow-x-auto">
                <pre className="font-mono-ui text-xs text-on-surface-variant leading-relaxed">
                  <code>{code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What happens automatically */}
      <div className="reveal mb-24 p-8 border border-secondary/20 rounded-xl bg-secondary/5 max-w-3xl">
        <p className="font-mono-ui text-code-label text-secondary uppercase tracking-wider mb-3">
          After step 4 — automatic
        </p>
        <p className="font-body-base text-on-surface-variant font-light text-sm leading-relaxed">
          Once the daemon is running, everything is fully automatic. The coordinator manages the training schedule.
          When enough organisations have submitted (the threshold), the coordinator launches an aggregation job on AWS Fargate,
          merges all encrypted updates using FedAvg, publishes the new global model to S3,
          and starts the next epoch. Your daemon picks it up automatically on the next poll.
          The Sangrah dashboard reflects all of this in real time.
        </p>
      </div>

      {/* API Reference */}
      <div id="api" className="reveal">
        <div className="mb-8">
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-3">
            API Reference
          </p>
          <h2 className="font-display-lg text-3xl text-primary">
            Coordinator REST API
          </h2>
          <p className="font-body-base text-on-surface-variant font-light mt-3 max-w-2xl">
            All endpoints require a valid mTLS client certificate.
            Base URL: <span className="font-mono-ui text-secondary text-sm">https://coordinator.fed-learn.online</span>
          </p>
        </div>

        <div className="border border-outline-variant/15 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[80px_1fr_1fr] bg-surface-container-high/50 px-6 py-3">
            <span className="font-mono-ui text-[10px] text-outline uppercase tracking-widest">Method</span>
            <span className="font-mono-ui text-[10px] text-outline uppercase tracking-widest">Endpoint</span>
            <span className="font-mono-ui text-[10px] text-outline uppercase tracking-widest">Description</span>
          </div>
          {apiEndpoints.map((ep, i) => (
            <div
              key={i}
              className="grid grid-cols-[80px_1fr_1fr] px-6 py-4 border-t border-outline-variant/10 hover:bg-surface-container/30 transition-colors"
            >
              <span className={`font-mono-ui text-xs font-semibold ${ep.method === "GET" ? "text-secondary" : "text-primary"}`}>
                {ep.method}
              </span>
              <span className="font-mono-ui text-xs text-on-surface-variant break-all pr-4">{ep.path}</span>
              <span className="font-body-base text-xs text-on-surface-variant font-light">{ep.desc}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 px-4 py-3 bg-surface-container border border-outline-variant/10 rounded-lg max-w-3xl">
          <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider mt-0.5 flex-shrink-0">Note</span>
          <p className="font-mono-ui text-xs text-outline-variant">
            The dashboard BFF proxies all of these internally — your browser never touches the coordinator directly.
            All API calls from the Sangrah UI are made server-side using the operator&apos;s mTLS certificate.
          </p>
        </div>
      </div>
    </div>
  );
}

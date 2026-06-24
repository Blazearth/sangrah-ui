import Link from "next/link";
import { Shield, Lock, Cpu, GitBranch } from "lucide-react";

const metrics = [
  { icon: Shield, label: "mTLS Everywhere" },
  { icon: Lock, label: "Ed25519 Signing" },
  { icon: Cpu, label: "Zero Data Ingestion" },
  { icon: GitBranch, label: "Secure Aggregation" },
];

export default function TrustBar() {
  return (
    <section className="py-12 px-lg border-y border-outline-variant/10 bg-surface-container-lowest/40 backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto">
        <p className="reveal text-center font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-8">
          Built for regulated industries
        </p>

        <div className="reveal flex flex-wrap justify-center gap-x-10 gap-y-6 mb-10">
          {metrics.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 text-on-surface-variant"
            >
              <Icon className="w-4 h-4 text-secondary" strokeWidth={1.5} />
              <span className="font-mono-ui text-xs uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="reveal flex flex-wrap justify-center items-center gap-6 text-sm">
          <Link
            href="/security"
            className="font-mono-ui text-xs text-secondary uppercase tracking-wider hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
          >
            View Security Architecture →
          </Link>
        </div>
      </div>
    </section>
  );
}

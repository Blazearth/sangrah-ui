import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="pricing">
      <div className="reveal text-center max-w-3xl mx-auto mb-20">
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
          Access
        </p>
        <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
          Scaled for Impact.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="reveal p-10 border border-outline-variant/30 rounded-xl bg-surface-container-low/80 backdrop-blur-md hover:border-outline-variant hover:-translate-y-1 transition-all duration-300">
          <h3 className="font-display-lg text-2xl text-primary mb-2">
            Research
          </h3>
          <p className="font-body-base text-on-surface-variant font-light mb-8 h-12">
            For academic institutions and open-source consortiums.
          </p>
          <div className="font-mono-ui text-4xl text-primary mb-8">Free</div>
          <ul className="flex flex-col gap-4 font-body-base text-sm text-on-surface-variant mb-10">
            {[
              "Up to 5 Federation Nodes",
              "Community Support",
              "Standard Encryption",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/sign-up?plan=research"
            className="block w-full text-center bg-transparent border border-outline-variant text-primary py-3 rounded hover:border-primary hover:-translate-y-0.5 transition-all uppercase tracking-wider text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            Start Free
          </Link>
        </div>

        <div className="reveal p-10 border border-secondary/30 rounded-xl bg-surface-container/80 backdrop-blur-md relative overflow-hidden hover:border-secondary/60 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_40px_rgba(177,197,255,0.05)]">
          <div className="absolute top-0 right-0 bg-secondary text-on-secondary text-[10px] font-mono-ui uppercase tracking-widest px-4 py-1">
            Recommended
          </div>

          <h3 className="font-display-lg text-2xl text-primary mb-2">
            Enterprise
          </h3>
          <p className="font-body-base text-on-surface-variant font-light mb-4 h-12">
            Production-grade infrastructure for sensitive commercial
            deployments.
          </p>
          <p className="font-mono-ui text-[10px] text-secondary/70 uppercase tracking-wider mb-6">
            Typical deployment: 2 weeks
          </p>
          <div className="font-mono-ui text-4xl text-primary mb-8">Custom</div>
          <ul className="flex flex-col gap-4 font-body-base text-sm text-on-surface-variant mb-10">
            {[
              "Unlimited Nodes",
              "Dedicated SLA & Support",
              "Quantum-Resistant Cryptography Options",
              "On-Premise Orchestrator Deployment",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/sign-up?plan=enterprise"
            className="block w-full text-center bg-primary text-on-primary py-3 rounded hover:bg-surface-tint hover:-translate-y-0.5 transition-all uppercase tracking-wider text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

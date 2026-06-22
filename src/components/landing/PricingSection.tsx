import Link from "next/link";

export default function PricingSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="pricing">
      {/* Section Header */}
      <div className="reveal text-center max-w-3xl mx-auto mb-20">
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
          Access
        </p>
        <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
          Scaled for Impact.
        </h2>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Research Tier */}
        <div className="reveal p-10 border border-outline-variant/30 rounded-xl bg-surface-container-low/80 backdrop-blur-md hover:border-outline-variant transition-colors duration-300">
          <h3 className="font-display-lg text-2xl text-primary mb-2">
            Research
          </h3>
          <p className="font-body-base text-on-surface-variant font-light mb-8 h-12">
            For academic institutions and open-source consortiums.
          </p>
          <div className="font-mono-ui text-4xl text-primary mb-8">Free</div>
          <ul className="flex flex-col gap-4 font-body-base text-sm text-on-surface-variant mb-10">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">
                check
              </span>
              Up to 5 Federation Nodes
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">
                check
              </span>
              Community Support
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">
                check
              </span>
              Standard Encryption
            </li>
          </ul>
          <Link
            href="/sign-up"
            className="block w-full text-center bg-transparent border border-outline-variant text-primary py-3 rounded hover:border-primary transition-colors uppercase tracking-wider text-xs font-medium"
          >
            Start Research
          </Link>
        </div>

        {/* Enterprise Tier */}
        <div className="reveal p-10 border border-secondary/30 rounded-xl bg-surface-container/80 backdrop-blur-md relative overflow-hidden hover:border-secondary/60 transition-colors duration-300">
          {/* Recommended badge */}
          <div className="absolute top-0 right-0 bg-secondary text-on-secondary text-[10px] font-mono-ui uppercase tracking-widest px-4 py-1">
            Recommended
          </div>

          <h3 className="font-display-lg text-2xl text-primary mb-2">
            Enterprise
          </h3>
          <p className="font-body-base text-on-surface-variant font-light mb-8 h-12">
            Production-grade infrastructure for sensitive commercial
            deployments.
          </p>
          <div className="font-mono-ui text-4xl text-primary mb-8">Custom</div>
          <ul className="flex flex-col gap-4 font-body-base text-sm text-on-surface-variant mb-10">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">
                check
              </span>
              Unlimited Nodes
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">
                check
              </span>
              Dedicated SLA &amp; Support
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">
                check
              </span>
              Quantum-Resistant Cryptography Options
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">
                check
              </span>
              On-Premise Orchestrator Deployment
            </li>
          </ul>
          <Link
            href="/sign-up"
            className="block w-full text-center bg-primary text-on-primary py-3 rounded hover:bg-surface-tint transition-colors uppercase tracking-wider text-xs font-medium"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}

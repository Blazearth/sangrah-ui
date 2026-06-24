import { Server, Brain, Network } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Server,
    title: "Deploy in Your VPC",
    description:
      "Install the Sangrah daemon inside your infrastructure. Your data never leaves your boundary.",
  },
  {
    step: "02",
    icon: Brain,
    title: "Train Locally",
    description:
      "Models train on your nodes using your data. Only cryptographically secured gradients are produced.",
  },
  {
    step: "03",
    icon: Network,
    title: "Aggregate Securely",
    description:
      "The coordinator aggregates masked gradients across the federation — no raw data is ever shared.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="how-it-works">
      <div className="reveal text-center max-w-3xl mx-auto mb-20">
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
          Architecture
        </p>
        <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
          How It Works
        </h2>
        <p className="font-body-base text-lg text-on-surface-variant font-light mt-6">
          Three steps to collaborative AI without compromising data sovereignty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map(({ step, icon: Icon, title, description }, i) => (
          <div
            key={step}
            className={`reveal stagger-reveal-${i + 1} group p-8 border border-outline-variant/20 rounded-xl bg-surface-container-low/50 backdrop-blur-md hover:border-secondary/30 hover:-translate-y-1 transition-all duration-500`}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono-ui text-mono-ui text-outline-variant">
                {step}
              </span>
              <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Icon className="w-5 h-5 text-secondary" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="font-display-lg text-xl text-primary mb-3">
              {title}
            </h3>
            <p className="font-body-base text-on-surface-variant font-light leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

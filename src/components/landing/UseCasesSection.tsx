import { HeartPulse, Landmark, FlaskConical } from "lucide-react";

const useCases = [
  {
    icon: HeartPulse,
    industry: "Healthcare",
    title: "Cross-Hospital Research",
    description:
      "Train diagnostic models across hospital networks without centralizing patient records. HIPAA-aligned by architecture.",
  },
  {
    icon: Landmark,
    industry: "Finance",
    title: "Fraud Detection at Scale",
    description:
      "Collaborate on fraud models across institutions while keeping transaction data within each bank's perimeter.",
  },
  {
    icon: FlaskConical,
    industry: "Research",
    title: "Academic Consortia",
    description:
      "Enable multi-institution ML research with the free tier — up to 5 federation nodes for open collaboration.",
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="use-cases">
      <div className="reveal text-center max-w-3xl mx-auto mb-20">
        <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
          Industries
        </p>
        <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
          Built for Sensitive Domains
        </h2>
        <p className="font-body-base text-lg text-on-surface-variant font-light mt-6">
          Where data sovereignty isn&apos;t optional — it&apos;s the law.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {useCases.map(({ icon: Icon, industry, title, description }) => (
          <div
            key={industry}
            className="reveal group p-8 border border-outline-variant/20 rounded-xl bg-surface-container/40 backdrop-blur-md hover:border-secondary/25 hover:-translate-y-1 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/15 transition-colors">
              <Icon className="w-6 h-6 text-secondary" strokeWidth={1.5} />
            </div>
            <p className="font-mono-ui text-mono-ui text-outline uppercase tracking-wider mb-2">
              {industry}
            </p>
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

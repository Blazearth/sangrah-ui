import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-lg max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono-ui text-xs text-outline-variant uppercase tracking-wider hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
        Legal
      </p>
      <h1 className="font-display-lg text-headline-md md:text-4xl text-primary mb-8">
        Terms of Service
      </h1>

      <div className="flex flex-col gap-6 font-body-base text-on-surface-variant font-light leading-relaxed">
        <p>
          By using Sangrah, you agree to operate federation nodes in compliance
          with applicable data protection regulations in your jurisdiction.
        </p>
        <p>
          Research tier users may deploy up to 5 federation nodes for
          non-commercial use. Enterprise deployments are governed by a separate
          service agreement.
        </p>
        <p>
          Sangrah provides the platform infrastructure. Each participant
          organization remains solely responsible for the data processed within
          their nodes.
        </p>
        <p className="text-outline text-sm">
          Last updated: June 2026
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
        Privacy Policy
      </h1>

      <div className="flex flex-col gap-6 font-body-base text-on-surface-variant font-light leading-relaxed">
        <p>
          Sangrah is architected so that raw data never leaves your
          infrastructure. We do not ingest, store, or process your training data.
        </p>
        <p>
          When you submit a request through our website, we collect only the
          information you provide (such as your work email) to respond to your
          inquiry.
        </p>
        <p>
          Federation telemetry (epoch status, participant health, audit logs) is
          scoped to your organization and protected by mTLS authentication.
        </p>
        <p className="text-outline text-sm">
          Last updated: June 2026
        </p>
      </div>
    </div>
  );
}

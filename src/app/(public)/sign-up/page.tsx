"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    orgName: "",
    email: "",
    role: "federation_admin",
    useCase: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Connect to access request API
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-lg py-32">
        <div className="glass-panel rounded-xl p-10 md:p-12 w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-2xl">
              check
            </span>
          </div>
          <h1 className="font-display-lg text-headline-md text-primary mb-4">
            Request Submitted
          </h1>
          <p className="font-body-base text-on-surface-variant font-light mb-8">
            Your access request has been submitted. We&apos;ll review your
            organization and contact you within 24 hours with onboarding
            instructions and certificate provisioning details.
          </p>
          <Link href="/" className="btn-secondary inline-block">
            Return Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-lg py-32">
      <div className="glass-panel rounded-xl p-10 md:p-12 w-full max-w-md">
        {/* Header */}
        <h1 className="font-display-lg text-headline-md text-primary mb-2">
          Request Access
        </h1>
        <p className="font-body-base text-body-sm text-on-surface-variant mb-8">
          Enterprise federation requires organizational verification.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono-ui text-code-label text-outline uppercase tracking-widest">
              Organization Name
            </label>
            <input
              type="text"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              className="sangrah-input"
              placeholder="Acme Research Labs"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono-ui text-code-label text-outline uppercase tracking-widest">
              Work Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="sangrah-input"
              placeholder="you@organization.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono-ui text-code-label text-outline uppercase tracking-widest">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="sangrah-input appearance-none cursor-pointer"
            >
              <option value="federation_admin">Federation Admin</option>
              <option value="data_scientist">Data Scientist</option>
              <option value="ml_engineer">ML Engineer</option>
              <option value="security_officer">Security Officer</option>
              <option value="observer">Observer (Read-Only)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono-ui text-code-label text-outline uppercase tracking-widest">
              Use Case{" "}
              <span className="text-outline-variant normal-case tracking-normal">
                (optional)
              </span>
            </label>
            <textarea
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              className="sangrah-input min-h-[100px] resize-none"
              placeholder="Describe your federated learning use case..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="opacity-25"
                  />
                  <path
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    fill="currentColor"
                    className="opacity-75"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Request Access"
            )}
          </button>
        </form>

        {/* Footer link */}
        <div className="mt-8 text-center">
          <p className="font-body-base text-body-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-secondary hover:text-secondary-fixed transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

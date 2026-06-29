"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
    } catch {
      setError("Authentication failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-lg py-32">
      <div className="glass-panel rounded-xl p-10 md:p-12 w-full max-w-md">
        {/* Header */}
        <h1 className="font-display-lg text-headline-md text-primary mb-2">
          Sign In
        </h1>
        <p className="font-body-base text-body-sm text-on-surface-variant mb-8">
          Access your federation dashboard.
        </p>

        {/* Error display */}
        {error && (
          <div className="mb-6 p-3 rounded border border-error/30 bg-error-container/10">
            <p className="font-mono-ui text-mono-ui text-error">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono-ui text-code-label text-outline uppercase tracking-widest">
              Email / ID
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="sangrah-input"
              placeholder="you@organization.com or test"
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono-ui text-code-label text-outline uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="sangrah-input"
              placeholder="••••••••••••"
              required
              autoComplete="current-password"
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
                Authenticating...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 rounded-lg border border-secondary/20 bg-secondary-container/10 px-4 py-3">
          <p className="font-mono-ui text-xs text-outline uppercase tracking-widest mb-2">
            Demo Credentials
          </p>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => { setEmail("test"); setPassword("1234"); }}
              className="text-left font-mono-ui text-mono-ui text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="text-outline">ID →</span> test &nbsp;&nbsp;
              <span className="text-outline">Password →</span> 1234
            </button>
          </div>
          <p className="font-body-base text-xs text-outline mt-2">
            Click above to auto-fill and explore the dashboard.
          </p>
        </div>

        {/* Observer note */}
        <div className="mt-4 rounded-lg border border-outline-variant/20 bg-surface-container/40 px-4 py-3">
          <p className="font-mono-ui text-xs text-outline uppercase tracking-widest mb-1">
            Note
          </p>
          <p className="font-body-base text-xs text-on-surface-variant leading-relaxed">
            This UI is a <span className="text-secondary">read-only observer</span> — it fetches live epoch state, audit trails, and model metadata directly from AWS. The actual federated learning work (model training, secure aggregation, mTLS coordination) runs through the{" "}
            <a
              href="https://github.com/Blazearth/fed-learn-model"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline underline-offset-2 hover:text-primary transition-colors font-medium"
            >
              fl-client-daemon
            </a>{" "}
            Rust repo and the AWS coordinator at{" "}
            <span className="text-secondary font-mono">coordinator.fed-learn.online</span>.
          </p>
        </div>

        {/* Footer link */}
        <div className="mt-6 text-center">
          <p className="font-body-base text-body-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-secondary hover:text-secondary-fixed transition-colors"
            >
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

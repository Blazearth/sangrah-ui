"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto text-center border-t border-outline-variant/10" id="cta">
      <div className="reveal max-w-2xl mx-auto">
        <h2 className="font-display-lg text-headline-md md:text-5xl text-primary mb-8 italic">
          Ready to reclaim your data?
        </h2>
        <p className="font-body-base text-lg text-on-surface-variant font-light mb-12">
          Join the vanguard of organizations building collaborative AI without
          compromising privacy.
        </p>

        {submitted ? (
          <div className="glass-panel rounded-xl p-8 inline-block animate-fade-in-up">
            <CheckCircle className="w-8 h-8 text-secondary mx-auto mb-3" />
            <p className="font-mono-ui text-code-label text-secondary uppercase tracking-widest mb-2">
              Request Received
            </p>
            <p className="font-body-base text-on-surface-variant">
              We&apos;ll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <div className="flex flex-col items-start sm:items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="sangrah-input w-full sm:w-auto min-w-[300px] bg-surface-container/60 backdrop-blur-md border-outline-variant/50 focus:border-secondary"
                placeholder="Work Email Address"
                required
                disabled={loading}
              />
              {error && (
                <p className="text-error text-sm mt-2 font-body-base">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary whitespace-nowrap flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Request Access"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

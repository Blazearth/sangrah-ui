"use client";

import { useState } from "react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto text-center border-t border-outline-variant/10">
      <div className="reveal max-w-2xl mx-auto">
        <h2 className="font-display-lg text-headline-md md:text-5xl text-primary mb-8 italic">
          Ready to reclaim your data?
        </h2>
        <p className="font-body-base text-lg text-on-surface-variant font-light mb-12">
          Join the vanguard of organizations building collaborative AI without
          compromising privacy.
        </p>

        {submitted ? (
          <div className="glass-panel rounded-xl p-8 inline-block">
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="sangrah-input w-full sm:w-auto min-w-[300px] bg-surface-container/60 backdrop-blur-md border-outline-variant/50 focus:border-secondary"
              placeholder="Work Email Address"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Request Access
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

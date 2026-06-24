"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Loader2, CheckCircle } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    label: "+91 87997 20386",
    href: "tel:+918799720386",
  },
  {
    icon: Mail,
    label: "arthsrivastava1@gmail.com",
    href: "mailto:arthsrivastava1@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp · +91 94518 07965",
    href: "https://wa.me/919451807965",
  },
];

export default function PricingSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    agreedToPrivacy: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="contact">
      <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-5xl mx-auto">
        {/* Left — contact info */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
              Contact
            </p>
            <h2 className="font-display-lg text-headline-md md:text-4xl text-primary mb-6">
              Get in touch
            </h2>
            <p className="font-body-base text-on-surface-variant font-light leading-relaxed max-w-md">
              Want to try Sangrah or book a demo? Send us a message and
              we&apos;ll get back to you within 24 hours to help you explore
              federated learning for your organization.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {contactDetails.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors group"
                >
                  <span className="w-10 h-10 rounded-lg border border-outline-variant/30 bg-surface-container-low flex items-center justify-center group-hover:border-secondary/40 transition-colors">
                    <Icon className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                  </span>
                  <span className="font-body-base text-sm md:text-base">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div className="border border-outline-variant/30 rounded-xl bg-surface-container-low/60 backdrop-blur-md p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <CheckCircle className="w-10 h-10 text-secondary mb-4" />
              <p className="font-mono-ui text-code-label text-secondary uppercase tracking-widest mb-2">
                Message Sent
              </p>
              <p className="font-body-base text-on-surface-variant font-light">
                Thanks for reaching out. We&apos;ll respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="font-mono-ui text-xs text-outline uppercase tracking-wider"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  disabled={loading}
                  className="sangrah-input w-full bg-obsidian/80 border-outline-variant/40"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="font-mono-ui text-xs text-outline uppercase tracking-wider"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@organization.com"
                  required
                  disabled={loading}
                  autoComplete="email"
                  className="sangrah-input w-full bg-obsidian/80 border-outline-variant/40"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="font-mono-ui text-xs text-outline uppercase tracking-wider"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your use case or demo request..."
                  required
                  disabled={loading}
                  rows={5}
                  className="sangrah-input w-full bg-obsidian/80 border-outline-variant/40 min-h-[120px] resize-none"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.agreedToPrivacy}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      agreedToPrivacy: e.target.checked,
                    }))
                  }
                  disabled={loading}
                  className="mt-1 w-4 h-4 rounded border-outline-variant bg-obsidian accent-secondary cursor-pointer"
                />
                <span className="font-body-base text-sm text-on-surface-variant font-light leading-relaxed">
                  By selecting this you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="text-secondary underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {error && (
                <p className="text-error text-sm font-body-base">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

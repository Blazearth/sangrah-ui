"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Code, Copy, Check } from "lucide-react";

const TERMINAL_CODE = `$ cargo install sangrah-cli
    Updating crates.io index
  Downloaded sangrah-cli v1.2.4
   Compiling sangrah-core v1.2.4
   Compiling sangrah-crypto v0.9.1
   Compiling sangrah-cli v1.2.4
    Finished release [optimized] target(s)
  Installing ~/.cargo/bin/sangrah

$ sangrah init --node enterprise-a
Initializing secure enclave...
Success: Node identity generated.
Status: Awaiting federation parameters...`;

export default function FoundationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("cargo install sangrah-cli");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section
      className="py-32 px-lg bg-surface-container-lowest/30 border-y border-outline-variant/10"
      id="foundation"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="reveal text-center max-w-3xl mx-auto mb-24">
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-4">
            Implementation
          </p>
          <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
            A Foundation of Rust.
          </h2>
          <p className="font-body-base text-lg text-on-surface-variant font-light mt-6">
            Built for extreme performance and memory safety. The Sangrah daemon
            runs transparently within your VPC, requiring minimal overhead while
            providing maximum cryptographic security.
          </p>
        </div>

        <div className="reveal terminal-block rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden group max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-secondary-container/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <div className="flex gap-2 mb-8 items-center border-b border-outline-variant/20 pb-4">
            <div className="w-3 h-3 rounded-full bg-surface-variant" />
            <div className="w-3 h-3 rounded-full bg-surface-variant" />
            <div className="w-3 h-3 rounded-full bg-surface-variant" />
            <span className="ml-auto font-mono-ui text-mono-ui text-outline-variant">
              bash / deployment
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-4 flex items-center gap-1.5 font-mono-ui text-[10px] text-outline-variant hover:text-primary transition-colors uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded px-2 py-1"
              aria-label="Copy install command"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-secondary" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>

          <pre className="font-mono-ui text-sm md:text-base leading-loose overflow-x-auto">
            <code className="text-on-surface-variant whitespace-pre">{TERMINAL_CODE}</code>
          </pre>
        </div>

        <div className="reveal flex flex-wrap justify-center gap-md mt-12">
          <Link
            href="/docs"
            className="bg-surface border border-outline-variant text-primary font-body-base text-body-sm px-6 py-3 rounded hover:border-primary hover:-translate-y-0.5 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <BookOpen className="w-4 h-4" />
            Technical Documentation
          </Link>
          <a
            href="https://github.com/sangrah-systems"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface border border-outline-variant text-primary font-body-base text-body-sm px-6 py-3 rounded hover:border-primary hover:-translate-y-0.5 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <Code className="w-4 h-4" />
            View Source
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Download, BookOpen } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-2px)] flex items-center px-lg pt-28 pb-16 md:pt-32"
    >
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        {/* Left — copy (stitch layout, original statement) */}
        <div className="col-span-1 md:col-span-8 flex flex-col gap-md opacity-0 animate-fade-in-up stagger-1">
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-[0.2em]">
            Sovereign Artificial Intelligence
          </p>

          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight font-bold">
            Unite Your Intelligence.
            <br />
            <span className="italic font-normal text-surface-tint">
              Keep Your Data.
            </span>
          </h1>

          <p className="font-body-base text-body-base md:text-lg text-on-surface-variant max-w-2xl font-light leading-relaxed">
            Collaborate on AI models across hospitals, banks, and enterprises —
            without moving a single record. The production-grade Rust daemon for
            enterprise federated learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-md mt-sm">
            <Link
              href="/sign-up"
              className="bg-primary text-on-primary font-body-base text-body-base px-lg py-md rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <Download className="w-4 h-4" strokeWidth={2} />
              Install CLI
            </Link>
            <Link
              href="/docs"
              className="bg-transparent border border-outline-variant text-primary font-body-base text-body-base px-lg py-md rounded hover:border-primary transition-colors flex items-center justify-center gap-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <BookOpen className="w-4 h-4" strokeWidth={1.5} />
              Read Docs
            </Link>
          </div>
        </div>

        {/* Right — terminal (stitch style) */}
        <div className="col-span-1 md:col-span-4 opacity-0 animate-fade-in-up stagger-3">
          <div className="terminal-block-stitch rounded-lg p-md shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-secondary-container/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex gap-2 mb-md items-center">
              <div className="w-3 h-3 rounded-full bg-surface-variant" />
              <div className="w-3 h-3 rounded-full bg-surface-variant" />
              <div className="w-3 h-3 rounded-full bg-surface-variant" />
              <span className="ml-auto font-mono-ui text-mono-ui text-outline-variant">
                bash
              </span>
            </div>

            <pre className="font-mono-ui text-mono-ui leading-relaxed overflow-x-auto">
              <code className="text-on-surface-variant">
                <span className="text-outline">$</span>{" "}
                <span className="text-secondary">cargo</span> install sangrah-cli
                {"\n"}
                <span className="text-outline">{"    Updating"}</span> crates.io
                index
                {"\n"}
                <span className="text-outline">{"  Downloaded"}</span>{" "}
                sangrah-cli v1.2.4
                {"\n"}
                <span className="text-outline">{"   Compiling"}</span>{" "}
                sangrah-core v1.2.4
                {"\n"}
                <span className="text-outline">{"   Compiling"}</span>{" "}
                sangrah-crypto v0.9.1
                {"\n"}
                <span className="text-outline">{"   Compiling"}</span>{" "}
                sangrah-cli v1.2.4
                {"\n"}
                <span className="text-primary">{"    Finished"}</span> release
                [optimized] target(s)
                {"\n"}
                <span className="text-outline">{"  Installing"}</span>{" "}
                ~/.cargo/bin/sangrah
                {"\n\n"}
                <span className="text-outline">$</span> sangrah init --node
                enterprise-a
                {"\n"}
                <span className="text-secondary">Initializing</span> secure
                enclave...
                {"\n"}
                <span className="text-primary">Success:</span> Node identity
                generated.
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

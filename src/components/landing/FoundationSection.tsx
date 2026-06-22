export default function FoundationSection() {
  return (
    <section
      className="py-32 px-lg bg-surface-container-lowest/30 border-y border-outline-variant/10"
      id="foundation"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
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

        {/* Terminal Block */}
        <div className="reveal terminal-block rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden group max-w-4xl mx-auto">
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-secondary-container/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          {/* Traffic light dots + tab label */}
          <div className="flex gap-2 mb-8 items-center border-b border-outline-variant/20 pb-4">
            <div className="w-3 h-3 rounded-full bg-surface-variant" />
            <div className="w-3 h-3 rounded-full bg-surface-variant" />
            <div className="w-3 h-3 rounded-full bg-surface-variant" />
            <span className="ml-auto font-mono-ui text-mono-ui text-outline-variant">
              bash / deployment
            </span>
          </div>

          {/* Code content */}
          <pre className="font-mono-ui text-sm md:text-base leading-loose overflow-x-auto">
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
              {"\n"}
              <span className="text-outline">Status:</span> Awaiting federation
              parameters...
            </code>
          </pre>
        </div>

        {/* Action buttons */}
        <div className="reveal flex flex-wrap justify-center gap-md mt-12">
          <button className="bg-surface border border-outline-variant text-primary font-body-base text-body-sm px-6 py-3 rounded hover:border-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              menu_book
            </span>
            Technical Documentation
          </button>
          <button className="bg-surface border border-outline-variant text-primary font-body-base text-body-sm px-6 py-3 rounded hover:border-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">code</span>
            View Source
          </button>
        </div>
      </div>
    </section>
  );
}

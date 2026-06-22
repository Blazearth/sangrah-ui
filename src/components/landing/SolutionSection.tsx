export default function SolutionSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        {/* Text Content */}
        <div className="reveal flex flex-col gap-6">
          <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
            Decentralized Power.
          </h2>
          <p className="font-body-base text-lg text-on-surface-variant font-light leading-relaxed">
            Sangrah flips the paradigm. Instead of bringing your data to the
            model, we bring the model to your data.
          </p>
          <p className="font-body-base text-lg text-on-surface-variant font-light leading-relaxed">
            Through our secure enclave node architecture, models train locally
            within your infrastructure. Only cryptographically secured
            gradients—never raw data—are shared across the network to aggregate
            intelligence.
          </p>

          {/* Feature bullets */}
          <ul className="flex flex-col gap-4 mt-6 font-mono-ui text-sm text-outline-variant">
            <li className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
              Zero Data Ingestion
            </li>
            <li className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
              Cryptographic Gradient Aggregation
            </li>
            <li className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
              Sovereign Node Identities
            </li>
          </ul>
        </div>

        {/* Abstract Visualization — Sovereign network */}
        <div className="reveal">
          <div className="aspect-square bg-surface-container border border-outline-variant/20 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Node 1 */}
                <div className="absolute top-[25%] left-[25%] w-12 h-12 bg-secondary/20 border border-secondary/50 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                </div>

                {/* Node 2 */}
                <div className="absolute top-[75%] left-[33%] w-16 h-16 bg-secondary/20 border border-secondary/50 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                </div>

                {/* Node 3 */}
                <div className="absolute top-[50%] right-[25%] w-14 h-14 bg-secondary/20 border border-secondary/50 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                </div>

                {/* Connection lines (SVG) */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="31%"
                    y1="31%"
                    x2="41%"
                    y2="81%"
                    stroke="rgba(177, 197, 255, 0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="31%"
                    y1="31%"
                    x2="69%"
                    y2="56%"
                    stroke="rgba(177, 197, 255, 0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="41%"
                    y1="81%"
                    x2="69%"
                    y2="56%"
                    stroke="rgba(177, 197, 255, 0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Additional ambient nodes */}
                <div className="absolute top-[15%] right-[40%] w-6 h-6 bg-secondary/10 border border-secondary/20 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-secondary/60 rounded-full" />
                </div>
                <div className="absolute bottom-[20%] right-[15%] w-8 h-8 bg-secondary/10 border border-secondary/20 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-secondary/60 rounded-full" />
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-6 left-6 font-mono-ui text-mono-ui text-secondary/60">
              02 / The Sovereign Network
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

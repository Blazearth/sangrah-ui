export default function SolutionSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
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

          <ul className="flex flex-col gap-4 mt-6 font-mono-ui text-sm text-outline-variant">
            {[
              "Zero Data Ingestion",
              "Cryptographic Gradient Aggregation",
              "Sovereign Node Identities",
            ].map((item) => (
              <li key={item} className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0 animate-pulse-glow" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal">
          <div className="aspect-square bg-surface-container border border-outline-variant/20 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tl from-secondary/5 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Animated gradient packets along connections */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {[
                    { x1: 125, y1: 125, x2: 165, y2: 325 },
                    { x1: 125, y1: 125, x2: 275, y2: 225 },
                    { x1: 165, y1: 325, x2: 275, y2: 225 },
                  ].map((line, i) => (
                    <g key={i}>
                      <line
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="rgba(177, 197, 255, 0.12)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <circle
                        r="3"
                        fill="#b1c5ff"
                        opacity="0.8"
                        className="animate-gradient-packet"
                        style={{ animationDelay: `${i * 1.2}s` }}
                      >
                        <animateMotion
                          dur={`${3 + i}s`}
                          repeatCount="indefinite"
                          path={`M${line.x1},${line.y1} L${line.x2},${line.y2}`}
                        />
                      </circle>
                    </g>
                  ))}
                </svg>

                {/* Nodes */}
                {[
                  { top: "25%", left: "25%", size: "w-12 h-12" },
                  { top: "75%", left: "33%", size: "w-16 h-16" },
                  { top: "50%", right: "25%", size: "w-14 h-14" },
                ].map((node, i) => (
                  <div
                    key={i}
                    className={`absolute ${node.size} bg-secondary/15 border border-secondary/40 rounded-full flex items-center justify-center`}
                    style={{
                      top: node.top,
                      left: node.left,
                      right: node.right,
                    }}
                  >
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-glow" />
                  </div>
                ))}

                <div className="absolute top-[15%] right-[40%] w-6 h-6 bg-secondary/10 border border-secondary/20 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-secondary/60 rounded-full" />
                </div>
                <div className="absolute bottom-[20%] right-[15%] w-8 h-8 bg-secondary/10 border border-secondary/20 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-secondary/60 rounded-full" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 font-mono-ui text-mono-ui text-secondary/60">
              02 / The Sovereign Network
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

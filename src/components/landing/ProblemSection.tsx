export default function ProblemSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="story">
      <div className="editorial-line mb-16 reveal" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="reveal order-2 md:order-1">
          <div className="aspect-square bg-surface-container border border-outline-variant/20 rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-error/5 via-surface-container-high to-surface opacity-60" />

            {/* Data streams flowing inward */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,180,171,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,180,171,0)" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="80" fill="url(#centralGlow)" className="animate-pulse-glow" />
              {/* Inward flow lines */}
              {[
                { x1: 60, y1: 80, x2: 170, y2: 170 },
                { x1: 340, y1: 100, x2: 230, y2: 180 },
                { x1: 80, y1: 320, x2: 175, y2: 225 },
                { x1: 320, y1: 300, x2: 225, y2: 220 },
              ].map((line, i) => (
                <line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="rgba(255,180,171,0.25)"
                  strokeWidth="1"
                  strokeDasharray="6 4"
                  className="animate-dash-flow"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border border-error/20 rounded-full relative animate-spin-slow">
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-error/80 rounded-full -translate-x-1/2 -translate-y-1/2 blur-sm animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-error/60 rounded-full translate-x-1/2 translate-y-1/2 blur-[2px]" />
              </div>
              <div className="absolute w-10 h-10 border-2 border-error/40 rounded-full flex items-center justify-center bg-error/10">
                <div className="w-3 h-3 bg-error/70 rounded-full animate-pulse" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 font-mono-ui text-mono-ui text-error/60">
              01 / The Vulnerability of Centralization
            </div>
          </div>
        </div>

        <div className="reveal order-1 md:order-2 flex flex-col gap-6">
          <h2 className="font-display-lg text-headline-md md:text-4xl text-primary">
            The Great Compromise.
          </h2>
          <p className="font-body-base text-lg text-on-surface-variant font-light leading-relaxed">
            For a decade, the pursuit of artificial intelligence has demanded a
            dangerous sacrifice: the pooling of sensitive, proprietary data into
            centralized silos.
          </p>
          <p className="font-body-base text-lg text-on-surface-variant font-light leading-relaxed">
            Organizations were forced to choose between leveraging collective
            intelligence and maintaining absolute data sovereignty. The result
            was stalled innovation in highly regulated sectors and unacceptable
            risk profiles for those who moved forward.
          </p>
        </div>
      </div>
    </section>
  );
}

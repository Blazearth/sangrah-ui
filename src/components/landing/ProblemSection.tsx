export default function ProblemSection() {
  return (
    <section className="py-32 px-lg max-w-[1440px] mx-auto" id="story">
      {/* Editorial divider */}
      <div className="editorial-line mb-16 reveal" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        {/* Abstract Visualization — Centralized vulnerability */}
        <div className="reveal order-2 md:order-1">
          <div className="aspect-square bg-surface-container border border-outline-variant/20 rounded-xl overflow-hidden relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-surface opacity-50" />

            {/* Spinning orbital — represents centralized fragility */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-64 h-64 border border-outline rounded-full relative animate-spin-slow">
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-error rounded-full -translate-x-1/2 -translate-y-1/2 blur-sm" />
                <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-error rounded-full translate-x-1/2 translate-y-1/2 blur-[2px]" />
              </div>
            </div>

            {/* Data particles floating toward center — centralization metaphor */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-error/30 rounded-full absolute top-[20%] left-[30%] animate-pulse" />
              <div className="w-2 h-2 bg-error/20 rounded-full absolute top-[60%] right-[25%] animate-pulse delay-700" />
              <div className="w-2 h-2 bg-error/25 rounded-full absolute bottom-[30%] left-[60%] animate-pulse delay-1000" />
              {/* Central collection point */}
              <div className="w-8 h-8 border border-error/30 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-error/60 rounded-full" />
              </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-6 left-6 font-mono-ui text-mono-ui text-error/60">
              01 / The Vulnerability of Centralization
            </div>
          </div>
        </div>

        {/* Text Content */}
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

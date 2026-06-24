const partners = [
  { name: "Helix Research", slug: "helix" },
  { name: "Nova Health", slug: "nova" },
  { name: "VaultBank", slug: "vaultbank" },
  { name: "Meridian Labs", slug: "meridian" },
  { name: "Axiom Finance", slug: "axiom" },
  { name: "Cortex Institute", slug: "cortex" },
];

function PartnerLogo({ name }: { name: string }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center px-10 md:px-14 opacity-40 hover:opacity-80 transition-opacity duration-300"
      aria-label={name}
    >
      <svg
        viewBox="0 0 160 40"
        className="h-8 w-auto text-on-surface-variant"
        role="img"
        aria-hidden="true"
      >
        {/* Monogram mark */}
        <rect
          x="0"
          y="8"
          width="24"
          height="24"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <text
          x="12"
          y="24"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontFamily="Georgia, serif"
          opacity="0.8"
        >
          {name.charAt(0)}
        </text>
        {/* Wordmark */}
        <text
          x="32"
          y="25"
          fill="currentColor"
          fontSize="13"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.08em"
          fontWeight="500"
        >
          {name.toUpperCase()}
        </text>
      </svg>
      <span className="sr-only">{name}</span>
    </div>
  );
}

export default function PartnersStrip() {
  const track = [...partners, ...partners];

  return (
    <section
      className="py-16 px-lg border-y border-outline-variant/10 bg-surface-container-lowest/30 overflow-hidden"
      aria-label="Trusted partners"
    >
      <div className="max-w-[1440px] mx-auto">
        <p className="reveal text-center font-mono-ui text-code-label text-outline uppercase tracking-[0.2em] mb-10">
          Trusted by leading organizations
        </p>

        <div className="reveal relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-surface-container-lowest/90 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-surface-container-lowest/90 to-transparent z-10" />

          <div className="partners-marquee flex w-max">
            {track.map((partner, i) => (
              <PartnerLogo
                key={`${partner.slug}-${i}`}
                name={partner.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

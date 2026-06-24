export default function GridBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full -z-10 bg-obsidian"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(38, 38, 38, 0.6) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(38, 38, 38, 0.6) 1px, transparent 1px)
        `,
        backgroundSize: "4rem 4rem",
        backgroundPosition: "center top",
      }}
    />
  );
}

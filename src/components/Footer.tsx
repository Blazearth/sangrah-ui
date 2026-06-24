import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full px-lg py-16 flex flex-col md:flex-row justify-between items-center gap-lg max-w-[1440px] mx-auto bg-surface-container-lowest/50 backdrop-blur-sm border-t border-outline-variant/10">
      <Link
        href="/"
        className="font-display-lg text-xl font-normal text-primary tracking-tighter hover:opacity-80 transition-opacity"
      >
        Sangrah
      </Link>

      <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 font-mono-ui text-xs text-outline-variant uppercase tracking-wider">
        <a
          href="/api/health"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          System Status
        </a>
        <Link href="/security" className="hover:text-primary transition-colors">
          Security
        </Link>
        <Link href="/privacy" className="hover:text-primary transition-colors">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-primary transition-colors">
          Terms
        </Link>
        <a
          href="https://github.com/sangrah-systems"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/sangrah_systems"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          Twitter
        </a>
      </div>

      <div className="font-mono-ui text-[10px] text-outline-variant uppercase tracking-widest mt-8 md:mt-0">
        © {year} Sangrah Systems
      </div>
    </footer>
  );
}

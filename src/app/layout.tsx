import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sangrah.dev"),
  title: {
    default: "Sangrah — Enterprise Federated Learning",
    template: "%s | Sangrah",
  },
  description:
    "Collaborate on AI models across hospitals, banks, and enterprises — without moving a single record. Production-grade Rust daemon for enterprise federated learning.",
  keywords: [
    "federated learning",
    "enterprise AI",
    "data sovereignty",
    "privacy-preserving ML",
    "Rust",
    "machine learning",
  ],
  authors: [{ name: "Sangrah Systems" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sangrah",
    title: "Sangrah — Enterprise Federated Learning",
    description:
      "Unite your intelligence. Keep your data. Production-grade federated learning for regulated industries.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangrah — Enterprise Federated Learning",
    description:
      "Unite your intelligence. Keep your data. Production-grade federated learning for regulated industries.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body-base text-body-base antialiased min-h-screen flex flex-col relative">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";
import ScrollProgress from "@/components/ScrollProgress";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GridBackground />
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow w-full flex flex-col">{children}</main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}

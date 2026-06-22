import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidMetalShader from "@/components/LiquidMetalShader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LiquidMetalShader />
      <Navbar />
      <main className="flex-grow w-full flex flex-col">{children}</main>
      <Footer />
    </>
  );
}

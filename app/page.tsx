import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { KolomKomiShowcase } from "@/components/landing/KolomKomiShowcase";
import { FiturPendukung } from "@/components/landing/FiturPendukung";
import { ComingLater } from "@/components/landing/ComingLater";
import { EditorialGuard } from "@/components/landing/EditorialGuard";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <KolomKomiShowcase />
        <FiturPendukung />
        <ComingLater />
        <EditorialGuard />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

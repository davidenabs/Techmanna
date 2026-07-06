import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { TrustTicker } from "./components/trust-ticker";
import { ServicesGrid } from "./components/services-grid";
import { OperateStatement } from "./components/operate-statement";
import { WorkShowcase } from "./components/work-showcase";
import { PartnershipStatement } from "./components/partnership-statement";
import { ContactForm } from "./components/contact-form";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-pattern-crosses">
      <Nav />
      <Hero />
      <TrustTicker />
      <ServicesGrid />
      <OperateStatement />
      <WorkShowcase />
      {/* <PartnershipStatement /> */}
      <ContactForm />
      <Footer />
    </main>
  );
}

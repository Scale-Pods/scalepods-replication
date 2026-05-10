import Hero from "@/components/sections/Hero";
import {
  Services,
  DataAnalysis,
  Benefits,
  Features,
  Comparison,
  Process,
  CaseStudies,
  Integrations,
  Reviews,
  FAQ,
  FinalCTA,
} from "@/components/sections/Sections";

export default function Home() {
  return (
    <main style={{ position: "relative" }}>
      <Hero />
      <DataAnalysis />
      <Benefits />
      <Services />
      <Reviews />
      <Features />
      <Process />
      <CaseStudies />
      <Integrations />
      <FAQ />
      <Comparison />
      <FinalCTA />
    </main>
  );
}

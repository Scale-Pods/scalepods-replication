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
    <main>
      <Hero />
      <DataAnalysis />
      <Benefits />
      <Services />
      <Features />
      <Process />
      <CaseStudies />
      <Integrations />
      <Reviews />
      <FAQ />
      <Comparison />
      <FinalCTA />
    </main>
  );
}

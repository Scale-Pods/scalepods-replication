import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";

// Below the fold sections are dynamically imported to improve initial load speed
const DataAnalysis = dynamic(() => import("@/components/sections/Sections").then(mod => mod.DataAnalysis), { ssr: true });
const Benefits = dynamic(() => import("@/components/sections/Sections").then(mod => mod.Benefits), { ssr: true });
const Services = dynamic(() => import("@/components/sections/Sections").then(mod => mod.Services), { ssr: true });
const Reviews = dynamic(() => import("@/components/sections/Sections").then(mod => mod.Reviews), { ssr: true });
const Features = dynamic(() => import("@/components/sections/Sections").then(mod => mod.Features), { ssr: true });
const Process = dynamic(() => import("@/components/sections/Sections").then(mod => mod.Process), { ssr: true });
const CaseStudies = dynamic(() => import("@/components/sections/Sections").then(mod => mod.CaseStudies), { ssr: true });
const Integrations = dynamic(() => import("@/components/sections/Sections").then(mod => mod.Integrations), { ssr: true });
const FAQ = dynamic(() => import("@/components/sections/Sections").then(mod => mod.FAQ), { ssr: true });
const Comparison = dynamic(() => import("@/components/sections/Sections").then(mod => mod.Comparison), { ssr: true });
const FinalCTA = dynamic(() => import("@/components/sections/Sections").then(mod => mod.FinalCTA), { ssr: true });

export default function Home() {
  return (
    <main style={{ position: "relative" }}>
      <Hero />
      <DataAnalysis />
      <Services />
      <Benefits />
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

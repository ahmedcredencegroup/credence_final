import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ContactSection } from "@/components/sections/ContactSection";
import heroImg from "@/assets/hero-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Credence Group · Interior Design & Turnkey | Hyderabad" },
      {
        name: "description",
        content:
          "Credence Group is a Hyderabad-based practice in interior design, turnkey delivery and infrastructure development. Building trust, creating value, designed and delivered in-house.",
      },
      { property: "og:title", content: "Credence Group · Interior Design & Turnkey | Hyderabad" },
      {
        property: "og:description",
        content:
          "Luxury interior design, premium turnkey projects and infrastructure development across Hyderabad. Concept to handover, under one roof.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-emerald-deep">
      <Header />
      <main>
        <HeroSection />
        <IntroSection />
        <ProjectsSection />
        <ServicesSection />
        <AboutSection />
        <PhilosophySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

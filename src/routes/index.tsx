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
      { title: "Credence Groups — Interior Design Studio" },
      {
        name: "description",
        content:
          "Credence Groups is an interior design practice composing residential, hospitality and commercial spaces with restraint and credence. Studios in Delhi and Mumbai.",
      },
      { property: "og:title", content: "Credence Groups — Interior Design Studio" },
      {
        property: "og:description",
        content:
          "Editorial interior design across residences, hotels, restaurants and boutiques. Drawn, sourced and supervised in-house.",
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

import img1 from "@/assets/project-1.jpg";
import img2 from "@/assets/project-5.jpg";
import img3 from "@/assets/project-6.jpg";

export type Vertical = {
  slug: string;
  n: string;
  title: string;
  /** Short blurb used in the homepage services list. */
  body: string;
  deliverables: string[];
  image: string;
  /** Longer introduction shown at the top of the vertical's own page. */
  intro: string;
  /** When true, the vertical page renders the project index instead of a placeholder. */
  hasProjects: boolean;
};

export const verticals: Vertical[] = [
  {
    slug: "interior-design",
    n: "01",
    title: "Interior Design",
    body: "Bespoke residential and commercial interiors tailored to your vision, designed and delivered in-house, from first concept to final handover.",
    deliverables: ["Concept & design", "Material specification", "Bespoke joinery", "On-site execution"],
    image: img1,
    intro:
      "Luxury residential and commercial interiors, designed and delivered entirely in-house. From the first concept sketch to the final styled handover, every detail is drawn, sourced and supervised by our own team.",
    hasProjects: true,
  },
  {
    slug: "concept-design-sales",
    n: "02",
    title: "Concept design and sales",
    body: "Client-centric and focused on delivering to the statement of uncompromising quality. We uphold the highest standards in material selection, craftsmanship, and attention to detail, ensuring every space is built to last.",
    deliverables: ["Uncompromising quality", "Flawless execution", "Single point of contact", "End-to-end delivery"],
    image: img2,
    intro:
      "Client-centric and focused on delivering to the statement of uncompromising quality. We uphold the highest standards in material selection, craftsmanship, and attention to detail, ensuring every space is built to last. Our in-house team of specialists collaborates seamlessly to deliver efficiency and precision from concept to completion. A dedicated project lead oversees every stage of the project, ensuring clear communication, smooth coordination, and timely delivery of key milestones.",
    hasProjects: false,
  },
  {
    slug: "infrastructure-development",
    n: "03",
    title: "Infrastructure Development",
    body: "Premium turnkey projects and infrastructure, with end-to-end delivery by a single accountable team, engineered for quality and built to last.",
    deliverables: ["Turnkey delivery", "Civil & MEP", "Project management", "Modular manufacturing"],
    image: img3,
    intro:
      "Premium turnkey projects and infrastructure development, delivered end-to-end by a single accountable team, engineered for quality and built to last.",
    hasProjects: false,
  },
];

export const getVertical = (slug: string): Vertical | undefined =>
  verticals.find((v) => v.slug === slug);

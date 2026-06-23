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
    title: "Concept Design & Sales",
    body: "Concept-led design for furniture showrooms and retail environments, backed by precision-engineered modular solutions that are simple to specify and acquire.",
    deliverables: ["Furniture showrooms", "Retail environments", "Modular solutions", "Design consultation"],
    image: img2,
    intro:
      "Concept-led design for furniture showrooms and retail environments, paired with precision-engineered modular solutions that are simple to specify, sell and install.",
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

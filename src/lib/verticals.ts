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
  /** Optional one-line narrative shown under each deliverable in the process timeline (aligned by index). */
  stageNotes?: string[];
  image: string;
  /** Longer introduction shown at the top of the vertical's own page. */
  intro: string;
  /** When true, the vertical page renders the project index instead of a placeholder. */
  hasProjects: boolean;
  /** Optional feature video shown in place of the featured image on the vertical page. */
  video?: string;
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
    title: "Concept, Design & Sales",
    body: "Right from land acquisition to master planning with design, development, construction, and sales, we deliver integrated real estate solutions that transform vision into successful developments and maximize long-term value.",
    deliverables: ["Acquisition", "Masterplanning", "Development", "Design", "Construction", "Positioning", "Sales"],
    stageNotes: [
      "It begins with the land — securing sites with genuine long-term potential.",
      "The vision takes shape: zoning, density and flow, mapped before a line is drawn.",
      "Groundwork comes alive — roads, utilities and the systems that make a place liveable.",
      "Character emerges as architecture and interiors are composed with real intent.",
      "The vision rises, built in-house to the standard we would expect of our own home.",
      "A development given an identity, a voice and its place in the market.",
      "Handover — keys, closings and the beginning of someone's next chapter.",
    ],
    image: img2,
    video: "/concept-design.mp4",
    intro:
      "From land acquisition through master planning, design, construction, positioning and sales — one accountable team carries the entire development journey. We deliver integrated real estate solutions that turn vision into successful developments and lasting long-term value.",
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

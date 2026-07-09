import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

export type ProjectCat = "Interior Design" | "Renovation" | "Turnkey";

export type Project = {
  slug: string;
  src: string;
  name: string;
  cat: ProjectCat;
  location: string;
  area: string;
  scope: string;
  w: number;
  h: number;
  /** Which company vertical this project belongs to. */
  vertical: string;
};

export const projects: Project[] = [
  { slug: "murjan-house", src: p1, name: "Murjan House", cat: "Interior Design", location: "Tolichowki, Shaikpet, Hyderabad", area: "~7,000 sq ft", scope: "Luxury Residential Interior Design", w: 1600, h: 1100, vertical: "interior-design" },
  { slug: "bait-ul-rehma", src: p2, name: "Bait-ul-Rehma", cat: "Interior Design", location: "Banjara Hills, Hyderabad", area: "~11,000 sq ft", scope: "Vintage Luxury Residential Interior Design", w: 1600, h: 1100, vertical: "interior-design" },
  { slug: "omi-house", src: p3, name: "OMI House", cat: "Renovation", location: "MLA Colony, Banjara Hills, Hyderabad", area: "~5,000 sq ft", scope: "Renovation & bespoke joinery", w: 1280, h: 1280, vertical: "interior-design" },
  { slug: "maphar-imperium", src: p4, name: "Maphar Imperium", cat: "Turnkey", location: "Kismatpur, Hyderabad", area: "~4,500 sq ft", scope: "Turnkey residence, concept to handover", w: 1280, h: 1600, vertical: "interior-design" },
];

export const projectsByVertical = (slug: string): Project[] =>
  projects.filter((p) => p.vertical === slug);

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

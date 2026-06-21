import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

type Cat = "All" | "Residential" | "Hospitality" | "Commercial" | "Retail";

const projects: { src: string; name: string; cat: Exclude<Cat, "All">; location: string; year: string; w: number; h: number }[] = [
  { src: p1, name: "Maison Verde", cat: "Residential", location: "New Delhi", year: "2024", w: 1280, h: 1600 },
  { src: p2, name: "The Auric", cat: "Hospitality", location: "Mumbai", year: "2024", w: 1600, h: 1100 },
  { src: p3, name: "Saló Privé", cat: "Hospitality", location: "Bengaluru", year: "2023", w: 1280, h: 1280 },
  { src: p4, name: "Atelier Library", cat: "Residential", location: "Chandigarh", year: "2023", w: 1280, h: 1600 },
  { src: p5, name: "La Maison Or", cat: "Retail", location: "New Delhi", year: "2022", w: 1280, h: 1280 },
  { src: p6, name: "Counsel Chambers", cat: "Commercial", location: "Mumbai", year: "2022", w: 1600, h: 1100 },
];

const filters: Cat[] = ["All", "Residential", "Hospitality", "Commercial", "Retail"];

export function ProjectsSection() {
  const [filter, setFilter] = useState<Cat>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <section id="projects" className="relative bg-emerald-mid py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Selected Work</p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] text-ivory">
              Projects of <span className="italic gold-gradient-text">consequence</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-ivory/65">
            A curated index of recent commissions — from intimate residences to landmark hospitality interiors.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-y border-gold/15 py-4">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className="group relative text-[0.74rem] uppercase tracking-[0.22em] text-ivory/65 transition-colors hover:text-gold"
              >
                {f}
                <span
                  className={`pointer-events-none absolute -bottom-[18px] left-0 h-px bg-gold transition-all ${
                    active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-60"
                  }`}
                />
                {active && <span className="ml-2 text-gold/50">{list.length}</span>}
              </button>
            );
          })}
        </div>

        {/* Editorial two-column grid with subtle vertical offset */}
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
          {list.map((p, i) => {
            const offset = i % 2 === 1 ? "md:mt-14" : "";
            return <ProjectCard key={p.name} project={p} className={offset} index={i} />;
          })}
        </div>

        <div className="mt-20 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 border border-gold/60 px-7 py-3.5 text-[0.74rem] uppercase tracking-[0.24em] text-gold transition-all hover:bg-gold hover:text-emerald-deep"
          >
            Commission a Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  className,
  index,
}: {
  project: { src: string; name: string; cat: string; location: string; year: string; w: number; h: number };
  className: string;
  index: number;
}) {
  return (
    <motion.a
      href="#"
      onClick={(e) => e.preventDefault()}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group block ${className}`}
    >
      <div className="relative overflow-hidden bg-emerald-deep">
        <img
          src={project.src}
          alt={`${project.name} — ${project.cat} interior in ${project.location}`}
          width={project.w}
          height={project.h}
          loading="lazy"
          className={`aspect-[3/2] h-auto w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="absolute inset-x-5 bottom-5 flex translate-y-2 items-center justify-between text-gold opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[0.7rem] uppercase tracking-[0.24em]">View Project</span>
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl text-ivory md:text-3xl">{project.name}</h3>
          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-ivory/55">
            {project.cat} · {project.location}
          </p>
        </div>
        <span className="font-display text-xl text-gold/80">{project.year}</span>
      </div>
    </motion.a>
  );
}

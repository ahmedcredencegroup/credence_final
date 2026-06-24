import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

type Cat = "All" | "Interior Design" | "Renovation" | "Turnkey";

const filters: Cat[] = ["All", "Interior Design", "Renovation", "Turnkey"];

export function ProjectsSection() {
  const [filter, setFilter] = useState<Cat>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <section id="projects" className="relative bg-emerald-mid py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Our Signature Projects</p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] text-ivory">
              Projects of <span className="italic gold-gradient-text">consequence</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-ivory/65">
            A selection of our signature residences across Hyderabad Ensuring exceptional craftsmanship, thoughtful design and uncompromising quality.
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
            Start your Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

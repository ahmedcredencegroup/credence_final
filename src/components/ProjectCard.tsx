import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  className = "",
  index = 0,
}: {
  project: Project;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link to="/projects/$project" params={{ project: project.slug }} className="group block">
        <div className="relative overflow-hidden bg-emerald-deep">
          <img
            src={project.src}
            alt={`${project.name}, ${project.cat} interior in ${project.location}`}
            width={project.w}
            height={project.h}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] h-auto w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
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
          <span className="shrink-0 font-display text-lg text-gold/80">{project.area}</span>
        </div>
      </Link>
    </motion.div>
  );
}

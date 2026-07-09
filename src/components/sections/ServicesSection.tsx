import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { verticals } from "@/lib/verticals";

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = verticals[active];

  useEffect(() => {
    verticals.forEach((v) => {
      const img = new Image();
      img.src = v.image;
    });
  }, []);

  return (
    <section id="services" className="relative bg-emerald-deep py-20 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Services</p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] text-ivory">
              Three verticals, <span className="italic gold-gradient-text">one standard</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-ivory/65">
            Everything under one roof. A single accountable team carries each project from first sketch to final handover.
          </p>
        </div>

        <div className="mt-16">
          {/* Desktop (lg+): image-preview panel + hover-to-expand list. Hover is a
              pointer interaction, so below lg we render self-contained cards instead. */}
          <div className="hidden lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* Image panel — stretches to match the list column's height */}
            <div className="relative h-full">
              <div className="sticky top-28 h-full overflow-hidden bg-emerald-mid">
                <div className="relative h-full w-full">
                  <AnimatePresence>
                    <motion.img
                      key={current.image}
                      src={current.image}
                      alt={current.title}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-emerald-deep/10 to-transparent" />
                  <Link
                    to="/services/$vertical"
                    params={{ vertical: current.slug }}
                    className="absolute inset-x-6 bottom-6 flex items-end justify-between text-ivory"
                  >
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-gold/80">{current.n}</p>
                      <h3 className="mt-1 font-display text-3xl">{current.title}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gold" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Interactive list — hover to preview, click to open the vertical page */}
            <ul className="divide-y divide-gold/15 border-y border-gold/15">
              {verticals.map((v, i) => {
                const isActive = i === active;
                return (
                  <li key={v.slug}>
                    <Link
                      to="/services/$vertical"
                      params={{ vertical: v.slug }}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-label={`${v.title} — view projects and details`}
                      className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-5 text-left transition-colors"
                    >
                      {/* gold sweep bg */}
                      <span
                        className={`pointer-events-none absolute inset-y-0 left-0 bg-gold/[0.06] transition-all duration-700 ease-out ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                      <span
                        className={`relative font-display text-3xl transition-colors ${
                          isActive ? "text-gold" : "text-ivory/50 group-hover:text-gold/80"
                        }`}
                      >
                        {v.n}
                      </span>
                      <span className="relative">
                        <span
                          className={`block font-display text-3xl leading-tight transition-all ${
                            isActive ? "translate-x-2 text-ivory" : "text-ivory/75 group-hover:translate-x-1 group-hover:text-ivory"
                          }`}
                        >
                          {v.title}
                        </span>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.span
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                              className="block overflow-hidden"
                            >
                              <span className="mt-3 block max-w-md text-sm leading-7 text-ivory/65">
                                {v.body}
                              </span>
                              <span className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] uppercase tracking-[0.18em] text-ivory/55">
                                {v.deliverables.map((d) => (
                                  <span key={d} className="inline-flex items-center gap-2">
                                    <span className="h-px w-3 bg-gold/60" />
                                    {d}
                                  </span>
                                ))}
                              </span>
                              <span className="mt-5 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-gold">
                                {v.hasProjects ? "View projects" : "Explore vertical"}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <motion.span
                        animate={{ rotate: isActive ? 45 : 0, color: isActive ? "var(--color-gold)" : "rgba(245,239,229,0.4)" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative inline-flex h-8 w-8 items-center justify-center"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile / tablet (<lg): self-contained tappable cards. Everything is
              visible at once — image, description, deliverables, CTA — so there's
              no reliance on hover, which touch devices don't have. */}
          <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
            {verticals.map((v, i) => (
              <motion.div
                key={v.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={i === 2 ? "sm:col-span-2" : ""}
              >
                <Link
                  to="/services/$vertical"
                  params={{ vertical: v.slug }}
                  aria-label={`${v.title} — view projects and details`}
                  className="group flex h-full flex-col overflow-hidden border border-gold/15 transition-colors hover:border-gold/40"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-emerald-mid">
                    <img
                      src={v.image}
                      alt={v.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/25 to-transparent" />
                    <div className="absolute inset-x-5 bottom-4 flex items-end justify-between">
                      <div>
                        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-gold/80">{v.n}</p>
                        <h3 className="mt-1 font-display text-2xl leading-tight text-ivory">{v.title}</h3>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-gold" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm leading-7 text-ivory/65">{v.body}</p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] uppercase tracking-[0.18em] text-ivory/55">
                      {v.deliverables.map((d) => (
                        <span key={d} className="inline-flex items-center gap-2">
                          <span className="h-px w-3 bg-gold/60" />
                          {d}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-gold">
                      {v.hasProjects ? "View projects" : "Explore vertical"}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

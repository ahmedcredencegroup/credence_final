import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import img1 from "@/assets/project-1.jpg";
import img2 from "@/assets/project-2.jpg";
import img3 from "@/assets/project-8.jpg";
import img4 from "@/assets/project-6.jpg";
import img5 from "@/assets/project-3.jpg";
import img6 from "@/assets/project-5.jpg";

const services = [
  {
    n: "01",
    title: "Residential Design",
    body: "Pied-à-terres to family residences — composed around how a home is lived in, not how it is photographed.",
    deliverables: ["Concept & moodboarding", "Architectural drawings", "Material specification", "On-site supervision"],
    image: img1,
  },
  {
    n: "02",
    title: "Hospitality",
    body: "Hotels, restaurants and members' clubs designed as immersive interiors — narrative-led, made to age beautifully.",
    deliverables: ["Brand-led concept", "Public area & guest rooms", "FF&E procurement", "Bar & dining schemes"],
    image: img2,
  },
  {
    n: "03",
    title: "Commercial Interiors",
    body: "Workplaces, chambers and corporate suites engineered for focus and authority — restraint and material gravitas.",
    deliverables: ["Workspace planning", "Acoustic & lighting", "Joinery & millwork", "Brand integration"],
    image: img3,
  },
  {
    n: "04",
    title: "Furniture Curation",
    body: "An in-house index of vintage, bespoke and limited-edition pieces — sourced and commissioned to complete the room.",
    deliverables: ["Vintage sourcing", "Bespoke commissions", "Upholstery & finishes", "Logistics & install"],
    image: img4,
  },
  {
    n: "05",
    title: "Styling & Art Direction",
    body: "The final five percent — art, objects, textiles and table. Editorial styling for handover and press.",
    deliverables: ["Art consultation", "Object curation", "Soft styling", "Editorial direction"],
    image: img5,
  },
  {
    n: "06",
    title: "Turnkey Project Management",
    body: "A single point of accountability from first brief to keys-in-hand. Procurement, vendors and site under one roof.",
    deliverables: ["Planning & budget", "Vendor management", "Procurement & logistics", "Handover & aftercare"],
    image: img6,
  },
];

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = services[active];

  useEffect(() => {
    services.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  return (
    <section id="services" className="relative bg-emerald-deep py-28 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Services</p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] text-ivory">
              Six disciplines, <span className="italic gold-gradient-text">one studio</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-ivory/65">
            Every service is delivered in-house. No outsourcing. No surprises.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          {/* Image panel */}
          <div className="relative order-2 md:order-1">
            <div className="sticky top-28 overflow-hidden bg-emerald-mid">
              <div className="relative aspect-[4/5] w-full">
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
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-ivory">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-gold/80">{current.n}</p>
                    <h3 className="mt-1 font-display text-2xl md:text-3xl">{current.title}</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive list */}
          <ul className="order-1 divide-y divide-gold/15 border-y border-gold/15 md:order-2">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.n}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-expanded={isActive}
                    className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-5 text-left transition-colors"
                  >
                    {/* gold sweep bg */}
                    <span
                      className={`pointer-events-none absolute inset-y-0 left-0 bg-gold/[0.06] transition-all duration-700 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                    <span
                      className={`relative font-display text-2xl transition-colors md:text-3xl ${
                        isActive ? "text-gold" : "text-ivory/40 group-hover:text-gold/80"
                      }`}
                    >
                      {s.n}
                    </span>
                    <span className="relative">
                      <span
                        className={`block font-display text-2xl leading-tight transition-all md:text-3xl ${
                          isActive ? "translate-x-2 text-ivory" : "text-ivory/75 group-hover:translate-x-1 group-hover:text-ivory"
                        }`}
                      >
                        {s.title}
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
                              {s.body}
                            </span>
                            <span className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] uppercase tracking-[0.18em] text-ivory/55">
                              {s.deliverables.map((d) => (
                                <span key={d} className="inline-flex items-center gap-2">
                                  <span className="h-px w-3 bg-gold/60" />
                                  {d}
                                </span>
                              ))}
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
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

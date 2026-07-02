import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { VideoFeature } from "@/components/VideoFeature";
import { getVertical, verticals } from "@/lib/verticals";
import { projectsByVertical } from "@/lib/projects";
import { useScrollTop } from "@/hooks/use-scroll-top";

export const Route = createFileRoute("/services/$vertical")({
  head: ({ params }) => {
    const v = getVertical(params.vertical);
    const title = v
      ? `${v.title} · Credence Group`
      : "Credence Group · Interior Design & Turnkey | Hyderabad";
    return {
      meta: [
        { title },
        { name: "description", content: v?.intro ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: v?.intro ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    if (!getVertical(params.vertical)) throw notFound();
  },
  component: VerticalPage,
});

function VerticalPage() {
  const { vertical } = Route.useParams();
  const v = getVertical(vertical)!;
  const projects = projectsByVertical(vertical);

  // Each vertical is its own page; always start at the top.
  useScrollTop(vertical);

  return (
    <div className="min-h-screen bg-emerald-deep">
      {/* Slim header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-emerald-deep/95">
        <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-6 lg:px-12">
          <Link to="/" aria-label="Credence Group — home">
            <Wordmark className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory/80 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Home
            </Link>
            <a
              href="/#contact"
              className="hidden border border-gold/60 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.24em] text-gold transition-all hover:bg-gold hover:text-emerald-deep sm:inline-block"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Intro */}
        <section className="mx-auto max-w-[1280px] px-6 pb-16 pt-36 lg:px-12 lg:pt-44">
          <Link
            to="/"
            hash="services"
            className="group inline-flex items-center gap-2.5 border border-gold/30 px-5 py-3 text-[0.72rem] uppercase tracking-[0.22em] text-gold/90 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All verticals
          </Link>

          {v.video ? (
            <>
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-10 text-center"
              >
                <p className="eyebrow mb-5">Vertical {v.n}</p>
                <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-ivory">
                  {v.title}
                </h1>
              </motion.div>

              {/* Video, then text */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mx-auto mt-10 max-w-5xl"
              >
                <VideoFeature src={v.video} label={`${v.title} — Credence Group`} />
              </motion.div>

              <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-8 text-ivory/75">{v.intro}</p>

              {/* What we deliver — delivery stages */}
              <div className="mt-16 border-t border-gold/15 pt-12">
                <p className="eyebrow mb-10 text-center">What we deliver</p>
                <ol className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-7 lg:gap-x-4">
                  {v.deliverables.map((d, i) => (
                    <li key={d} className="flex flex-col items-center text-center">
                      <span className="font-display text-3xl leading-none gold-gradient-text">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-3 block h-px w-8 bg-gold/40" />
                      <span className="mt-3 block text-sm uppercase tracking-[0.14em] text-ivory/85">
                        {d}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          ) : (
            <div className="mt-10 grid gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="eyebrow mb-5">Vertical {v.n}</p>
                <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-ivory">
                  {v.title}
                </h1>
                <p className="mt-7 max-w-xl text-base leading-8 text-ivory/75">{v.intro}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="border-l border-gold/20 pl-8"
              >
                <p className="eyebrow mb-6">What we deliver</p>
                <ul className="space-y-3.5">
                  {v.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm leading-7 text-ivory/75">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/80" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )}
        </section>

        {/* Featured image (non-video verticals) */}
        {!v.video && (
          <section className="mx-auto max-w-[1480px] px-6 lg:px-12">
            <div className="relative aspect-[16/7] w-full overflow-hidden bg-emerald-mid">
              <img
                src={v.image}
                alt={`${v.title} — Credence Group`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/60 via-transparent to-transparent" />
            </div>
          </section>
        )}

        {/* Body */}
        {v.hasProjects ? (
          <section className="mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow mb-5">Selected Work</p>
                <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ivory">
                  {v.title} projects.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-ivory/65">
                A selection of our signature residences across Hyderabad. More projects are added with each commission.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
              {projects.map((p, i) => (
                <ProjectCard key={p.name} project={p} className={i % 2 === 1 ? "md:mt-14" : ""} index={i} />
              ))}
            </div>
          </section>
        ) : v.video ? (
          <div className="py-16 lg:py-24" />
        ) : (
          <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-12 lg:py-32">
            <div className="border border-gold/20 bg-emerald-mid/40 px-8 py-16 text-center md:px-16 md:py-24">
              <p className="eyebrow mb-5">Coming Soon</p>
              <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] text-ivory">
                Detailed case studies and imagery for{" "}
                <span className="italic gold-gradient-text">{v.title.toLowerCase()}</span> are being prepared.
              </h2>
              <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-ivory/65">
                We're putting this portfolio together. In the meantime, reach out and we'll walk you through our work in this vertical, personally.
              </p>
              <a
                href="/#contact"
                className="group mt-10 inline-flex items-center gap-3 border border-gold bg-gold px-8 py-3.5 text-[0.74rem] uppercase tracking-[0.24em] text-emerald-deep transition-all hover:bg-gold-light"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </section>
        )}

        {/* Other verticals */}
        <section className="mx-auto max-w-[1280px] px-6 pb-28 lg:px-12">
          <div className="border-t border-gold/15 pt-12">
            <p className="eyebrow mb-8">Other verticals</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {verticals
                .filter((o) => o.slug !== v.slug)
                .map((o) => (
                  <Link
                    key={o.slug}
                    to="/services/$vertical"
                    params={{ vertical: o.slug }}
                    className="group flex items-center justify-between border border-gold/20 px-6 py-6 transition-colors hover:border-gold/50"
                  >
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-gold/70">{o.n}</p>
                      <h3 className="mt-1 font-display text-xl text-ivory md:text-2xl">{o.title}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

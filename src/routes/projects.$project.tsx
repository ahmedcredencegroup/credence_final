import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Footer } from "@/components/layout/Footer";
import { ProjectGallery } from "@/components/ProjectGallery";
import { BackButton } from "@/components/BackButton";
import { getProject } from "@/lib/projects";
import { getGallery } from "@/lib/galleries";
import { useScrollTop } from "@/hooks/use-scroll-top";

export const Route = createFileRoute("/projects/$project")({
  head: ({ params }) => {
    const p = getProject(params.project);
    const title = p ? `${p.name} · Credence Group` : "Credence Group";
    const desc = p ? `${p.scope}. ${p.location}, ${p.area}.` : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `https://credencegroup.co/projects/${params.project}` },
      ],
      links: [{ rel: "canonical", href: `https://credencegroup.co/projects/${params.project}` }],
    };
  },
  loader: ({ params }) => {
    if (!getProject(params.project)) throw notFound();
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useParams();
  const p = getProject(project)!;
  const images = getGallery(project);

  useScrollTop(project);

  return (
    <div className="min-h-screen bg-emerald-deep">
      {/* Slim header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-emerald-deep/98 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-6 lg:px-12">
          <Link to="/" aria-label="Credence Group home">
            <Wordmark className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <BackButton fallbackTo="/" />
            <a
              href="/#contact"
              className="hidden border border-gold/60 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.24em] text-gold transition-all hover:bg-gold hover:text-emerald-deep sm:inline-block"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Header */}
        <section className="mx-auto max-w-[1280px] px-6 pb-12 pt-36 lg:px-12 lg:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow mb-5">{p.cat}</p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-ivory">
              {p.name}
            </h1>

            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-gold/15 pt-8 sm:grid-cols-3">
              <Detail label="Location" value={p.location} />
              <Detail label="Area" value={p.area} />
              <Detail label="Scope" value={p.scope} />
            </dl>
          </motion.div>
        </section>

        {/* Gallery or placeholder */}
        {images.length > 0 ? (
          <section className="mx-auto max-w-[1480px] px-6 pb-24 lg:px-12 lg:pb-32">
            <ProjectGallery images={images} />
          </section>
        ) : (
          <section className="mx-auto max-w-[1280px] px-6 pb-24 lg:px-12 lg:pb-32">
            <div className="border border-gold/20 bg-emerald-mid/40 px-8 py-16 text-center md:px-16 md:py-24">
              <p className="eyebrow mb-5">Coming Soon</p>
              <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15] text-ivory">
                Photography for this project is being prepared.
              </h2>
              <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-ivory/65">
                We're finalising the imagery for this residence. Get in touch and we'll be glad to walk you through it.
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

        {/* CTA */}
        <section className="mx-auto max-w-[1280px] px-6 pb-28 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-6 border-t border-gold/15 pt-12 md:flex-row md:items-center">
            <p className="max-w-md font-display text-2xl text-ivory md:text-3xl">
              Have a space in mind? Let's build it together.
            </p>
            <a
              href="/#contact"
              className="group inline-flex items-center gap-3 border border-gold/60 px-7 py-3.5 text-[0.74rem] uppercase tracking-[0.24em] text-gold transition-all hover:bg-gold hover:text-emerald-deep"
            >
              Start your project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.65rem] uppercase tracking-[0.24em] text-gold/70">{label}</dt>
      <dd className="mt-1.5 text-sm leading-6 text-ivory/85">{value}</dd>
    </div>
  );
}

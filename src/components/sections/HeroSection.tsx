import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";
import { Emblem } from "@/components/brand/Emblem";

const headline = ["Interiors", "composed", "with", "credence."];

export function HeroSection() {
  return (
    <section id="home" className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={heroImg}
          alt="Cinematic emerald-toned luxury living room at dusk"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-emerald-deep/35" />
      </motion.div>

      <Emblem className="absolute right-6 top-28 hidden h-32 w-32 opacity-[0.18] md:right-12 md:block lg:h-44 lg:w-44" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-end px-6 pb-20 lg:px-12 lg:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="eyebrow mb-6"
        >
          Credence Groups — Est. Studio of Interiors
        </motion.p>

        <h1 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] text-ivory">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`mr-[0.25em] inline-block ${i === 3 ? "italic gold-gradient-text" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg"
        >
          A design practice for the quietly considered — residential, hospitality and commercial interiors composed across India, since 2012.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 border border-gold bg-gold px-7 py-3.5 text-[0.74rem] uppercase tracking-[0.24em] text-emerald-deep transition-all hover:bg-gold-light"
          >
            View Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 border border-ivory/30 px-7 py-3.5 text-[0.74rem] uppercase tracking-[0.24em] text-ivory transition-all hover:border-gold hover:text-gold"
          >
            Book a Consultation
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.32em] text-ivory/55 hover:text-gold"
      >
        Scroll
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </motion.a>
    </section>
  );
}

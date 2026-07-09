import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";
import heroImgMobile from "@/assets/hero-interior-mobile.jpg";
import { Emblem } from "@/components/brand/Emblem";
import { GoldDust } from "@/components/GoldDust";
import { ScrollCue } from "@/components/ScrollCue";

const headline: { word: string; gold?: boolean }[] = [
  { word: "Designing" },
  { word: "with" },
  { word: "purpose.", gold: true },
  { word: "Building" },
  { word: "with" },
  { word: "precision.", gold: true },
];

export function HeroSection() {
  return (
    <section id="home" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: [0.22, 1, 0.36, 1] }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={heroImgMobile} />
          <img
            src={heroImg}
            alt="Cinematic emerald-toned luxury living room at dusk"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-emerald-deep/35" />
      </motion.div>

      {/* Ambient gold dust — sits above the image/overlays but below the z-10 text */}
      <GoldDust />

      <Emblem className="absolute right-6 top-24 h-16 w-16 opacity-[0.16] md:right-12 md:top-28 md:h-32 md:w-32 md:opacity-[0.18] lg:h-44 lg:w-44" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-end px-6 pb-24 pt-24 lg:px-12 lg:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="eyebrow mb-6"
        >
          Credence Group · Interior Design &amp; Turnkey
        </motion.p>

        <h1 className="font-display text-[clamp(2.25rem,8vw,6.5rem)] leading-[1.0] text-ivory">
          {headline.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`mr-[0.25em] inline-block ${item.gold ? "italic gold-gradient-text" : ""}`}
            >
              {item.word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg"
        >
          Hyderabad-based interior design and execution firm specializing in luxury residential, commercial, and hospitality spaces crafted with precision, purpose, and timeless elegance.
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

      <ScrollCue href="#intro" />
    </section>
  );
}

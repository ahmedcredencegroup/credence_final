import { motion } from "motion/react";
import { Emblem } from "@/components/brand/Emblem";

export function PhilosophySection() {
  return (
    <section id="philosophy" className="relative overflow-hidden bg-emerald-deep py-20 md:py-36">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Emblem className="h-[80vmin] w-[80vmin] opacity-[0.04]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-7xl leading-none text-gold/40"
        >
          “
        </motion.span>
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 font-display text-[clamp(1.75rem,4vw,3.5rem)] italic leading-[1.2] text-ivory"
        >
          We believe great design should feel effortless, where every detail serves a purpose{" "}
          <span className="gold-gradient-text">and every space feels naturally complete</span>
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="eyebrow mt-10"
        >
          Building trust, creating value
        </motion.p>
      </div>
    </section>
  );
}

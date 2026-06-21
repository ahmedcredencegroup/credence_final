import { motion } from "motion/react";

export function IntroSection() {
  return (
    <section id="intro" className="relative bg-emerald-deep py-28 md:py-40">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-[1fr_2fr] lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="eyebrow"
        >
          The Studio<br />Est. 2012
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <p className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] text-ivory">
            We design interiors that do not announce themselves — they
            <span className="italic gold-gradient-text"> hold a room together </span>
            so completely that the work becomes invisible, and the life inside it visible.
          </p>
          <div className="mt-12 hairline w-32" />
          <p className="mt-8 max-w-xl text-sm leading-7 text-ivory/65">
            Credence Groups is a multidisciplinary interior design practice working across residences, restaurants, hotels and boutiques. Every commission is treated as a single, complete composition — drawn, sourced and staged in-house.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

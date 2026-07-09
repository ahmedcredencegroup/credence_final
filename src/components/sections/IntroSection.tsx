import { motion } from "motion/react";

export function IntroSection() {
  return (
    <section id="intro" className="relative bg-emerald-deep py-20 md:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-[1fr_2fr] lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="eyebrow"
        >
          Our Story<br />Hyderabad, India
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <p className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] text-ivory">
            Our vision is to redefine the standards of design and construction, creating spaces that
            <span className="italic gold-gradient-text"> seamlessly blend functionality, innovation and timeless elegance.</span>
          </p>
          <div className="mt-12 hairline w-32" />
          <p className="mt-8 max-w-xl text-sm leading-7 text-ivory/65">
            With extensive expertise across interior design, construction and turnkey execution, Credence Group delivers innovative, high-quality spaces through a commitment to craftsmanship, precision and client satisfaction. We build lasting relationships — and spaces our clients are proud to call their own.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

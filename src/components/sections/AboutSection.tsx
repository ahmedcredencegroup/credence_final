import { motion } from "motion/react";
import aboutImg from "@/assets/about-studio.jpg";

const stats = [
  { n: "03", label: "Verticals" },
  { n: "04", label: "Signature projects" },
  { n: "27,500+", label: "Sq. ft delivered" },
  { n: "100%", label: "In-house execution" },
];

const principals = [
  { name: "Ahmed Bashoeb", role: "Managing Director", email: "ahmed@credencegroup.co", phone: "+91 90000 63200" },
  { name: "Aarish Baig", role: "Managing Director", email: "aarish.baig@credencegroup.co", phone: "+91 79899 05052" },
  { name: "Syed Abdul Kareem", role: "Managing Director", email: "kareem@credencegroup.co", phone: "+91 00000 00000" },
];

const values = [
  { title: "Client-Centric", body: "Spaces that reflect your vision and lifestyle focused on delivering to the statement." },
  { title: "Uncompromising Quality", body: "We uphold the highest standards in material selection, craftsmanship, and attention to detail, ensuring every space is built to last." },
  { title: "Flawless Execution", body: "Our in-house team of specialists collaborates seamlessly to deliver efficiency and precision from concept to completion." },
  { title: "Single Point of Contact", body: "A dedicated project lead oversees every stage of the project, ensuring clear communication, smooth coordination, and timely delivery of key milestones." },
];

export function AboutSection() {
  return (
    <section id="about" className="relative bg-emerald-mid">
      {/* Full-bleed studio image */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={aboutImg}
          alt="Credence Group interior design studio with material samples on a drafting table"
          width={1920}
          height={1100}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/30 via-emerald-deep/20 to-emerald-mid" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1480px] px-6 pb-12 lg:px-12 lg:pb-20">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="eyebrow mb-5"
            >
              The Studio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-ivory"
            >
              The team behind <span className="italic gold-gradient-text">Credence</span>.
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Story + stats */}
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12 lg:py-32">
        <div className="grid gap-16 md:grid-cols-[3fr_2fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="space-y-6 text-base leading-8 text-ivory/75"
          >
            <p>
              Credence Group is an interior design, turnkey and infrastructure practice based in Hyderabad. We set out to redefine the standards of design and construction, creating spaces that seamlessly blend functionality, innovation and timeless elegance.
            </p>
            <p>
              We believe a home should be more than a place. It should inspire, bring comfort and quietly enrich your life every day. Good design is not how an interior looks, but how it supports the way you live.
            </p>
            <p>
              From a single dedicated project lead to a team that carries each home from first sketch to final handover, design and delivery are never handed off. <span className="italic text-gold">Building trust, creating value</span> on every project.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="md:border-l md:border-gold/20 md:pl-8"
          >
            <p className="eyebrow mb-6">In numbers</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-4xl gold-gradient-text md:text-5xl">{s.n}</dt>
                  <dd className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-ivory/55">{s.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Principals */}
        <div className="mt-28">
          <p className="eyebrow mb-5">Leadership</p>
          <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-ivory">Three managing directors. One standard.</h3>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {principals.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="border-t border-gold/20 pt-6"
              >
                <span className="block h-2 w-2 rotate-45 bg-gold/80" />
                <h4 className="mt-6 font-display text-2xl text-ivory">{p.name}</h4>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-gold/80">{p.role}</p>
                <div className="mt-5 space-y-1.5 text-sm leading-7 text-ivory/65">
                  <a href={`mailto:${p.email}`} className="block break-all transition-colors hover:text-gold">{p.email}</a>
                  <a href={`tel:${p.phone.replace(/\s+/g, "")}`} className="block transition-colors hover:text-gold">{p.phone}</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mt-28 border-t border-gold/15 pt-14">
          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold/80" />
                <div>
                  <h4 className="font-display text-xl text-gold">{v.title}</h4>
                  <p className="mt-1 text-sm text-ivory/60">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

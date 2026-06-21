import { motion } from "motion/react";
import aboutImg from "@/assets/about-studio.jpg";
import { Emblem } from "@/components/brand/Emblem";

const stats = [
  { n: "12", label: "Years in practice" },
  { n: "84", label: "Projects delivered" },
  { n: "9", label: "Cities worldwide" },
  { n: "17", label: "Awards & features" },
];

const principals = [
  { name: "Ahmed Bashoeb", role: "Founder, Managing Director", bio: "Trained at RISD; previously with Studio KO. Leads concept and material direction across all commissions." },
  { name: "Aarish", role: "Founder ", bio: "Fifteen years with international hotel groups. Heads the hospitality and F&B portfolio out of Mumbai." },
  { name: "John Doe", role: "Partner, Procurement", bio: "Curates the studio's furniture and art index. Vintage scout across Milan, Paris and Jaipur." },
];

const values = [
  { title: "Restraint", body: "Editing is design." },
  { title: "Material", body: "Honest to the hand." },
  { title: "Permanence", body: "Made to age, not date." },
  { title: "Credence", body: "Earn it, every project." },
];

export function AboutSection() {
  return (
    <section id="about" className="relative bg-emerald-mid">
      {/* Full-bleed studio image */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={aboutImg}
          alt="Credence Groups design studio with material samples on a drafting table"
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
              The studio behind <span className="italic gold-gradient-text">Credence</span>.
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Story + stats */}
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-16 md:grid-cols-[3fr_2fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="space-y-6 text-base leading-8 text-ivory/75"
          >
            <p>
              Credence Groups was founded in 2012 in a single room above a fabric merchant in Delhi's Khan Market. Twelve years on, we operate out of two studios — Delhi and Mumbai — and a small workshop in Jaipur where bespoke pieces are commissioned.
            </p>
            <p>
              We are not a large practice and do not intend to be. We take on a small number of commissions each year so that every project can be drawn, sourced and supervised by the principal who pitched it. That is, in the end, the only thing we sell.
            </p>
            <p>
              Our work has been published in <span className="italic text-gold">AD India</span>, <span className="italic text-gold">Wallpaper*</span> and <span className="italic text-gold">Elle Decor</span>, and recognised by the IIID Design Excellence Awards across four cycles.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="border-l border-gold/20 pl-8"
          >
            <p className="eyebrow mb-6">In numbers</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-5xl gold-gradient-text">{s.n}</dt>
                  <dd className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-ivory/55">{s.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Principals */}
        <div className="mt-28">
          <p className="eyebrow mb-5">The Principals</p>
          <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-ivory">Three partners. One signature.</h3>

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
                <p className="font-display text-7xl text-gold/30">0{i + 1}</p>
                <h4 className="mt-2 font-display text-2xl text-ivory">{p.name}</h4>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-gold/80">{p.role}</p>
                <p className="mt-5 text-sm leading-7 text-ivory/65">{p.bio}</p>
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
                className="flex items-start gap-4"
              >
                <Emblem className="h-7 w-7 shrink-0 opacity-80" />
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

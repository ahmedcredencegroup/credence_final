import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import aboutImg from "@/assets/about-studio.jpg";

/**
 * Counts a stat up from zero to its value the first time it scrolls into view.
 * Parses the numeric part while preserving the original formatting — comma
 * grouping ("27,500+"), a "%"/"+" suffix, or zero-padding ("03") — so the final
 * frame reads exactly like the source string.
 *
 * The reveal is triggered by a scroll/resize + getBoundingClientRect check (the
 * same approach use-active-section uses reliably here) — motion's
 * IntersectionObserver-based viewport detection was not firing for these spans.
 * An invisible sizing copy of the final value reserves the width so the counting
 * digits never reflow the layout as they grow.
 */
function CountUp({ value, className }: { value: string; className?: string }) {
  const digits = value.replace(/[^0-9]/g, "");
  const target = parseInt(digits, 10) || 0;
  const suffix = value.match(/[^0-9,]+$/)?.[0] ?? "";
  const hasComma = value.includes(",");
  const padTo = /^0\d/.test(value) ? digits.length : 0;

  const format = (n: number) => {
    let s = hasComma ? n.toLocaleString("en-IN") : String(n);
    if (padTo) s = s.padStart(padTo, "0");
    return s + suffix;
  };

  const [display, setDisplay] = useState(() => format(0));
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const duration = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setDisplay(format(Math.round(eased * target)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 60 && r.bottom > 0) {
        run();
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className="inline-grid">
      {/* Invisible sizer — reserves the final width so counting never reflows. */}
      <span aria-hidden="true" className={`invisible col-start-1 row-start-1 ${className ?? ""}`}>
        {format(target)}
      </span>
      <span className={`col-start-1 row-start-1 ${className ?? ""}`}>{display}</span>
    </span>
  );
}

const stats = [
  { n: "03", label: "Verticals" },
  { n: "04", label: "Signature projects" },
  { n: "27,500+", label: "Sq. ft delivered" },
  { n: "100%", label: "In-house execution" },
];

const principals = [
  { name: "Ahmed Bashoeb", role: "Managing Director", email: "ahmed@credencegroup.co", phone: "+91 90000 63200" },
  { name: "Aarish Baig", role: "Managing Director", email: "aarish.baig@credencegroup.co", phone: "+91 79899 05052" },
  { name: "Syed Abdul Kareem", role: "Managing Director", email: "kareem@credencegroup.co", phone: "" },
];

const values = [
  { title: "Client-Centric", body: "Spaces that reflect your vision and lifestyle, shaped around the way you live." },
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
        {/* Seam dissolve — the previous section (Services) ends on a flat
            emerald-deep field, and this image used to cut in hard right against
            it. Fading from that same solid color at the very top lets the photo
            emerge rather than starting with a hard edge. */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-deep to-transparent md:h-40" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1480px] px-6 pb-20 lg:px-12 lg:pb-20">
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
                  <dt className="font-display text-4xl tabular-nums leading-none md:text-5xl">
                    <CountUp value={s.n} className="gold-gradient-text" />
                  </dt>
                  <dd className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-ivory/55">{s.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Principals */}
        <div className="mt-28">
          <p className="eyebrow mb-5">Leadership</p>
          <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-ivory">Three managing directors. Every project, personally led.</h3>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {principals.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="border border-gold/15 bg-emerald-deep/25 p-5 transition-colors hover:border-gold/40"
                style={{ boxShadow: "var(--shadow-elegant)" }}
              >
                <h4 className="font-display text-lg text-ivory">{p.name}</h4>
                <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.18em] text-gold/80">{p.role}</p>
                <div className="mt-3 space-y-1 border-t border-gold/15 pt-3 text-[0.82rem] leading-6 text-ivory/65">
                  <a href={`mailto:${p.email}`} className="block break-all transition-colors hover:text-gold">{p.email}</a>
                  {p.phone && (
                    <a href={`tel:${p.phone.replace(/\s+/g, "")}`} className="block transition-colors hover:text-gold">{p.phone}</a>
                  )}
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
                className="flex items-start gap-4"
              >
                <span aria-hidden="true" className="mt-1.5 h-9 w-px shrink-0 bg-gradient-to-b from-gold to-transparent" />
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

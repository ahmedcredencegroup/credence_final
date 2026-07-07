import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

export type ProcessStep = { title: string; note?: string };

/**
 * A narrative process timeline: a gold thread that fills as the section scrolls
 * into view and lights each step in sequence, turning a list of stages into a story.
 * Vertical (left rail) on mobile, horizontal on desktop.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 62%"],
  });

  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Light each step as the thread passes it.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let idx = -1;
    for (let i = 0; i < steps.length; i++) {
      if (v >= (i + 0.5) / steps.length) idx = i;
    }
    setReached(idx);
  });

  return (
    <ol
      ref={ref}
      className="relative mx-auto flex max-w-md flex-col lg:max-w-none lg:flex-row lg:items-start"
    >
      {/* Track + animated progress thread (vertical on mobile, horizontal on desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-7 left-7 top-7 w-px bg-gold/15 lg:inset-x-0 lg:bottom-auto lg:left-0 lg:right-0 lg:top-7 lg:h-px lg:w-auto"
      >
        <motion.div
          style={{ scaleY: fill }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-gold via-gold to-gold/50 lg:hidden"
        />
        <motion.div
          style={{ scaleX: fill }}
          className="absolute inset-0 hidden origin-left bg-gradient-to-r from-gold via-gold to-gold/50 lg:block"
        />
      </div>

      {steps.map((step, i) => {
        const isLit = i <= reached;
        return (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex items-start gap-5 pb-10 last:pb-0 lg:flex-1 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:px-3 lg:text-center"
          >
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-display text-xl transition-colors duration-500 ${
                isLit
                  ? "border-gold bg-gold text-emerald-deep"
                  : "border-gold/35 bg-emerald-deep"
              }`}
            >
              <span className={isLit ? "" : "gold-gradient-text"}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>

            <div className="pt-3 lg:mt-6 lg:max-w-[10.5rem] lg:pt-0">
              <h3 className="font-display text-lg leading-tight text-ivory lg:text-xl">
                {step.title}
              </h3>
              {step.note && (
                <p className="mt-2 text-sm leading-6 text-ivory/60 lg:text-[0.8rem] lg:leading-[1.45rem]">
                  {step.note}
                </p>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

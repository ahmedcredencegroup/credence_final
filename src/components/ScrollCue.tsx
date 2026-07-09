import { motion } from "motion/react";

/**
 * A small, classic "scroll to explore" indicator: a mouse outline with its
 * scroll wheel sliding down and fading, looping. Replaces a text label +
 * bouncing arrow, which read as two competing cues doing the same job.
 */
export function ScrollCue({ href, className = "" }: { href: string; className?: string }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
      aria-label="Scroll to explore"
      className={`group absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-ivory/55 transition-colors hover:text-gold ${className}`}
    >
      <svg width="22" height="34" viewBox="0 0 22 34" fill="none" aria-hidden="true">
        <rect
          x="1"
          y="1"
          width="20"
          height="32"
          rx="10"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle
          cx="11"
          cy="10"
          r="1.8"
          fill="currentColor"
          style={{ animation: "scroll-wheel 2s ease-in-out infinite" }}
        />
      </svg>
    </motion.a>
  );
}

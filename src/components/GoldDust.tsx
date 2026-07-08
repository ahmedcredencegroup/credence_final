import type { CSSProperties } from "react";

// Deterministic PRNG so the particle field is identical on the server and the
// client — otherwise the random inline styles would cause a hydration mismatch.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20240718);

const PARTICLES = Array.from({ length: 22 }, () => ({
  left: rand() * 100,
  top: 6 + rand() * 88,
  size: 1.2 + rand() * 2,
  duration: 9 + rand() * 7,
  delay: -(rand() * 16), // negative so the field starts desynced, not all at once
  peak: 0.25 + rand() * 0.35,
  drift: (rand() - 0.5) * 40,
  rise: -(70 + rand() * 80),
}));

/**
 * Slow-floating gold dust motes, like fine particles catching warm light.
 * Purely ambient (aria-hidden, pointer-events-none). Each mote drifts upward and
 * fades in then out via a transform/opacity keyframe (GPU-composited). The
 * global prefers-reduced-motion rule collapses the animation, so it disables
 * itself for users who ask for less motion.
 */
export function GoldDust() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold-light"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: 0,
              animation: `dust-rise ${p.duration}s linear ${p.delay}s infinite`,
              boxShadow: `0 0 ${p.size * 2.5}px rgba(232, 212, 172, 0.6)`,
              "--dust-peak": p.peak,
              "--dust-drift": `${p.drift}px`,
              "--dust-rise": `${p.rise}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Flight = {
  id: number;
  d: string; // SVG path data, shared by the trail and the plane's offset-path
  dur: number; // seconds
  x1: number;
  y1: number;
  x2: number;
  y2: number; // trail gradient endpoints (fade at the tail, brighter at the nose)
};

// Build one flight in real pixel space: enter off one side, exit off the other,
// with a gentle arc. Uses Math.random (client-only — the component renders
// nothing until mounted, so there's no server/client hydration mismatch).
function buildFlight(w: number, h: number, id: number, durMin: number, durMax: number): Flight {
  const r = (a: number, b: number) => a + Math.random() * (b - a);
  const pad = 48; // start/end beyond the edges so it flies in and out cleanly
  const ltr = Math.random() < 0.5;

  const sx = ltr ? -pad : w + pad;
  const ex = ltr ? w + pad : -pad;
  const sy = r(h * 0.05, h * 0.4);
  const ey = r(h * 0.55, h * 0.95);

  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  const len = Math.hypot(dx, dy) || 1;
  const arc = r(-1, 1) * Math.min(w, h) * 0.16;
  const cx = mx + (-dy / len) * arc; // control point offset perpendicular to travel
  const cy = my + (dx / len) * arc;

  return {
    id,
    d: `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
    dur: r(durMin, durMax),
    x1: sx,
    y1: sy,
    x2: ex,
    y2: ey,
  };
}

/**
 * An occasional golden paper plane that drifts across its container leaving a
 * faint trail, then vanishes and reappears from a new random point. Purely
 * ambient — aria-hidden, pointer-events-none, and it disables itself for users
 * who prefer reduced motion. Flights are generated in measured pixel space so
 * the plane and its trail stay in one coordinate system (no aspect distortion).
 *
 * `active` gates the flight loop (e.g. only while the mobile drawer is open).
 */
export function PaperPlane({
  active = true,
  opacity = 0.5,
  size = 30,
  trailClassName = "text-gold",
  trailLength = 24,
  durationRange = [5, 7.5],
  gapRange = [2500, 6000],
  className = "",
}: {
  active?: boolean;
  opacity?: number;
  size?: number;
  /** Tailwind text-color class for the trail (its gradient uses currentColor). */
  trailClassName?: string;
  /** Trail length as a percentage of the flight path (0–100). A short comet
   *  segment that follows the plane and clears behind it, rather than a solid
   *  line spanning the whole path. */
  trailLength?: number;
  /** Flight duration range in seconds. */
  durationRange?: [number, number];
  /** Quiet gap between flights in ms. */
  gapRange?: [number, number];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [flight, setFlight] = useState<Flight | null>(null);

  // Destructure the tuple props to primitives so the flight effect can depend on
  // stable values rather than the arrays' per-render identities.
  const [durMin, durMax] = durationRange;
  const [gapMin, gapMax] = gapRange;

  // Measure the overlay (and keep it current on resize) so flights map to real
  // pixels.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setDims({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!active || !dims) {
      setFlight(null);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const launch = () => {
      if (cancelled) return;
      const f = buildFlight(dims.w, dims.h, ++id, durMin, durMax);
      setFlight(f);
      // Next flight after this one lands, plus a quiet gap, so it's occasional.
      const gap = gapMin + Math.random() * (gapMax - gapMin);
      timer = setTimeout(launch, f.dur * 1000 + gap);
    };

    // Small opening delay so it doesn't fire the instant the surface appears.
    timer = setTimeout(launch, 600 + Math.random() * 1200);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      setFlight(null);
    };
  }, [active, dims, durMin, durMax, gapMin, gapMax]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dims && flight && (
        <div
          key={flight.id}
          className="absolute inset-0"
          style={
            {
              "--plane-opacity": opacity,
              animation: `plane-fade ${flight.dur}s linear forwards`,
            } as CSSProperties
          }
        >
          {/* Trail — drawn in behind the plane via stroke-dashoffset. */}
          <svg
            className={`absolute inset-0 h-full w-full ${trailClassName}`}
            viewBox={`0 0 ${dims.w} ${dims.h}`}
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient
                id={`plane-trail-${flight.id}`}
                gradientUnits="userSpaceOnUse"
                x1={flight.x1}
                y1={flight.y1}
                x2={flight.x2}
                y2={flight.y2}
              >
                <stop offset="0" stopColor="currentColor" stopOpacity="0" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <path
              d={flight.d}
              stroke={`url(#plane-trail-${flight.id})`}
              strokeWidth="1.1"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={`${trailLength} 200`}
              vectorEffect="non-scaling-stroke"
              style={
                {
                  "--trail-start": trailLength,
                  "--trail-end": trailLength - 100,
                  animation: `plane-draw ${flight.dur}s linear forwards`,
                } as CSSProperties
              }
            />
          </svg>

          {/* Plane — rides the same path; offset-rotate keeps its nose forward. */}
          <div
            className="absolute left-0 top-0 text-gold"
            style={
              {
                offsetPath: `path('${flight.d}')`,
                offsetRotate: "auto",
                animation: `plane-fly ${flight.dur}s linear forwards`,
              } as CSSProperties
            }
          >
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <path d="M23 12 L2 4 L7.5 12 L2 20 Z" fill="currentColor" />
              <path d="M7.5 12 L23 12" stroke="var(--emerald-deep)" strokeWidth="0.8" opacity="0.35" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

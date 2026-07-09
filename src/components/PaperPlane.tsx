import { useEffect, useRef, useState, type CSSProperties } from "react";

type Flight = {
  id: number;
  d: string; // SVG path data, used as the plane's and trail dots' offset-path
  dur: number; // seconds
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
  };
}

// Number of small dots making up the trail. Each one rides the same
// offset-path as the plane but starts a little later and finishes at the
// same moment the plane does — so they bunch up close behind the nose and
// fade out toward the tail, instead of reading as one solid drawn line.
const TRAIL_DOTS = 6;

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
  /** Tailwind text-color class for the trail dots (uses currentColor). */
  trailClassName?: string;
  /** How far the trail's dots lag behind the plane, as a percentage of the
   *  flight duration (0–100). Larger values spread the dots out further. */
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
          {/* Trail — small dots riding the same path as the plane, each
              starting a beat later and shrinking to zero opacity by the last
              one, so it visibly fades out behind the nose instead of reading
              as a single flat line. Every dot's own animation is shortened by
              its lag so it still arrives exactly when the plane does. */}
          {Array.from({ length: TRAIL_DOTS }, (_, i) => {
            const frac = (i + 1) / (TRAIL_DOTS + 1); // how far back this dot sits, 0–1
            const lag = flight.dur * (trailLength / 100) * frac;
            const fade = Math.pow(1 - frac, 1.6);
            const dotSize = Math.max(1, size * 0.14 * fade + 1);
            return (
              <div
                key={i}
                className={trailClassName}
                style={
                  {
                    position: "absolute",
                    left: -dotSize / 2,
                    top: -dotSize / 2,
                    width: dotSize,
                    height: dotSize,
                    borderRadius: "9999px",
                    backgroundColor: "currentColor",
                    opacity: fade * 0.85,
                    offsetPath: `path('${flight.d}')`,
                    offsetRotate: "0deg",
                    animation: `plane-fly ${Math.max(0.05, flight.dur - lag)}s linear ${lag}s forwards`,
                  } as CSSProperties
                }
              />
            );
          })}

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

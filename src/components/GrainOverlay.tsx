// A fine film-grain texture laid over the whole site. On flat, dark surfaces a
// touch of grain reads as "print / editorial" rather than "flat web page" — it
// adds tactile depth without any visible pattern. Kept at very low opacity with
// a soft-light blend so it never becomes actual noise, and pointer-events-none
// so it can never intercept interaction.
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.045] mix-blend-soft-light"
      style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "160px 160px" }}
    />
  );
}

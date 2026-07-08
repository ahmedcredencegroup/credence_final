import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

type Status = "playing" | "paused";

/**
 * Auto-playing, looping feature video with a single play/pause control.
 * Starts on mount (muted, as browsers require) and loops continuously
 * so it never stalls on a dead frame.
 */
export function VideoFeature({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>("paused");

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Attempt autoplay once the element is ready.
    v.play().catch(() => setStatus("paused"));
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (status === "playing") {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  };

  const Icon = status === "playing" ? Pause : Play;
  const actionLabel = status === "playing" ? "Pause" : "Play";

  return (
    <div className="group/video relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/15 bg-emerald-mid shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
        className="h-full w-full object-cover"
        onPlay={() => setStatus("playing")}
        onPause={() => setStatus("paused")}
      />
      {/* Soft gradient at the bottom edge only, purely so the play/pause
          control stays legible over lighter footage. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-deep/55 to-transparent" />

      <button
        type="button"
        onClick={toggle}
        aria-label={`${actionLabel} video`}
        className="absolute bottom-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-emerald-deep/40 text-gold backdrop-blur-md transition-colors hover:border-gold/45 hover:text-gold-light"
      >
        <Icon className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

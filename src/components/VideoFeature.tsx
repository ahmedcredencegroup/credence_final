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
    <div className="relative aspect-video w-full overflow-hidden border border-gold/20 bg-emerald-mid">
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
      {/* Subtle theme gradient so the control stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-deep/50 via-transparent to-transparent" />

      <button
        type="button"
        onClick={toggle}
        aria-label={`${actionLabel} video`}
        className="group absolute bottom-2 right-2 inline-flex h-11 w-11 items-center justify-center bg-transparent text-gold transition-colors hover:text-gold-light [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.55))]"
      >
        <Icon className="h-5 w-5" />
      </button>
    </div>
  );
}

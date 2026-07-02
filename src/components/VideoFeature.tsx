import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

type Status = "playing" | "paused" | "ended";

/**
 * Auto-playing feature video with a single play/pause control.
 * Starts on mount (muted, as browsers require), stops when it finishes,
 * and replays from the start when the control is pressed again.
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
      if (status === "ended") v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  const Icon = status === "ended" ? RotateCcw : status === "playing" ? Pause : Play;
  const actionLabel = status === "ended" ? "Replay" : status === "playing" ? "Pause" : "Play";

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-gold/20 bg-emerald-mid">
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        preload="auto"
        aria-label={label}
        className="h-full w-full object-cover"
        onPlay={() => setStatus("playing")}
        onPause={() => setStatus(ref.current?.ended ? "ended" : "paused")}
        onEnded={() => setStatus("ended")}
      />
      {/* Subtle theme gradient so the control stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-deep/50 via-transparent to-transparent" />

      <button
        type="button"
        onClick={toggle}
        aria-label={`${actionLabel} video`}
        className="group absolute bottom-4 right-4 inline-flex items-center bg-transparent text-gold transition-colors hover:text-gold-light [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.55))]"
      >
        <Icon className="h-4 w-4" />
      </button>
    </div>
  );
}

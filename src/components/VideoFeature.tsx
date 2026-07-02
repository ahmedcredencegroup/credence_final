import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

type Status = "playing" | "paused";

/**
 * Auto-playing feature video with a single play/pause control.
 * Starts on mount (muted, as browsers require), loops indefinitely,
 * and can be paused/played with the control.
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
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-emerald-deep shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_40px_rgba(214,183,132,0.03)]">
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        loop
        preload="auto"
        aria-label={label}
        className="h-full w-full object-cover"
        onPlay={() => setStatus("playing")}
        onPause={() => setStatus("paused")}
      />
      {/* Overlay with border and inset shadow to blend the video edges with the background */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-gold/15 shadow-[inset_0_0_40px_10px_rgba(11,44,37,0.95)]" />

      <button
        type="button"
        onClick={toggle}
        aria-label={`${actionLabel} video`}
        className="group absolute bottom-5 right-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-deep/60 text-gold border border-gold/20 backdrop-blur-sm transition-all duration-300 hover:bg-gold hover:text-emerald-deep hover:border-gold shadow-lg cursor-pointer"
      >
        <Icon className="h-4 w-4" />
      </button>
    </div>
  );
}


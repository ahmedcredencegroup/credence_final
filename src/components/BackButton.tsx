import { Link, useCanGoBack, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/**
 * A clean, icon-only back control. Uses real history.back() so it returns to
 * wherever the user actually came from — correct scroll position, no
 * re-triggered entrance animations — instead of navigating to a hardcoded
 * destination. Falls back to `fallbackTo` when there's no history to go back
 * to (e.g. the page was opened directly from a shared link).
 */
export function BackButton({
  fallbackTo = "/",
  className = "",
}: {
  fallbackTo?: string;
  className?: string;
}) {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const sharedClassName = `group flex h-9 w-9 items-center justify-center text-ivory/80 transition-colors hover:text-gold ${className}`;

  if (!canGoBack) {
    return (
      <Link to={fallbackTo} aria-label="Back" className={sharedClassName}>
        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.history.back()}
      aria-label="Back"
      className={sharedClassName}
    >
      <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
    </button>
  );
}

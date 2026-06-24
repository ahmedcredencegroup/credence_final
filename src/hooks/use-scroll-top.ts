import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect runs before the browser paints (so the page never flashes the
// previous scroll position), but it must fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Jump to the top of the page instantly whenever `dep` changes (e.g. on route
 * navigation). Uses `behavior: "instant"` so it ignores the global
 * `scroll-behavior: smooth` and does not animate from the old scroll position.
 */
export function useScrollTop(dep?: unknown) {
  useIsomorphicLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [dep]);
}

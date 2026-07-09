import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // The global `scroll-behavior: smooth` CSS rule (for nav-link clicks)
    // would otherwise also apply to the browser back/forward scroll
    // restoration, making it visibly animate all the way down the page
    // instead of landing instantly where the user actually was.
    scrollRestorationBehavior: "instant",
    defaultPreloadStaleTime: 0,
  });

  return router;
};

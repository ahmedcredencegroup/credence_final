import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { GrainOverlay } from "../components/GrainOverlay";

function ClientToaster() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Toaster
      theme="dark"
      position="bottom-right"
      toastOptions={{ style: { background: "#143F35", color: "#F5EFE5", border: "1px solid rgba(214,183,132,0.3)" } }}
    />
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0B2C25" },
      { title: "Credence Group · Interior Design & Turnkey | Hyderabad" },
      { name: "description", content: "Hyderabad-based interior design, turnkey delivery and infrastructure development. Building trust, creating value. Concept to handover, under one roof." },
      { name: "author", content: "Credence Group" },
      { property: "og:title", content: "Credence Group · Interior Design & Turnkey | Hyderabad" },
      { property: "og:description", content: "Hyderabad-based interior design, turnkey delivery and infrastructure development. Building trust, creating value. Concept to handover, under one roof." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://credencegroup.co/" },
      { property: "og:site_name", content: "Credence Group" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Credence Group · Interior Design & Turnkey | Hyderabad" },
      { name: "twitter:description", content: "Hyderabad-based interior design, turnkey delivery and infrastructure development. Building trust, creating value. Concept to handover, under one roof." },
      { property: "og:image", content: "https://credencegroup.co/og-image.jpg" },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      { property: "og:image:alt", content: "Credence Group — cinematic emerald-toned luxury interior" },
      { name: "twitter:image", content: "https://credencegroup.co/og-image.jpg" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://credencegroup.co/#organization",
          name: "Credence Group",
          image: "https://credencegroup.co/og-image.jpg",
          url: "https://credencegroup.co/",
          telephone: "+91-90000-63200",
          email: "ahmed@credencegroup.co",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Meenakshi Tech Park, Tower B, 8th Floor",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500032",
            addressCountry: "IN",
          },
          areaServed: "Hyderabad",
          description:
            "Hyderabad-based interior design, turnkey delivery and infrastructure development practice. Concept to handover, under one roof.",
          priceRange: "₹₹₹",
        },
      },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter+Tight:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      {/* Skip link — off-screen until focused, so keyboard/screen-reader users
          can jump past the nav straight to page content (WCAG 2.4.1). */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 border border-gold bg-emerald-deep px-5 py-3 text-[0.74rem] uppercase tracking-[0.24em] text-gold opacity-0 transition-all focus:translate-y-0 focus:opacity-100"
      >
        Skip to content
      </a>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <GrainOverlay />
      <ClientToaster />
    </QueryClientProvider>
  );
}

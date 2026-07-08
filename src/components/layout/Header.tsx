import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";
import { Wordmark } from "@/components/brand/Wordmark";
import { Emblem } from "@/components/brand/Emblem";

const NAV = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection([
    "home",
    "projects",
    "services",
    "about",
    "philosophy",
    "contact",
  ]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page in place while the mobile drawer is open — without this the
  // background keeps scrolling underneath the fixed overlay (most visible as
  // iOS rubber-band bounce), which is what made opening the menu after
  // scrolling feel broken. Freezing body at its current offset (rather than
  // just overflow:hidden) prevents that bounce and restores the exact scroll
  // position on close.
  //
  // Locking/unlocking is imperative (via this ref) rather than purely
  // effect-driven so a nav-link click can unlock synchronously — inside the
  // same click handler, before the browser's default same-page anchor jump
  // runs — instead of restoring the pre-open scroll position after the fact
  // and stomping the navigation the click was meant to trigger.
  const scrollLockRef = useRef<{
    scrollY: number;
    position: string;
    top: string;
    width: string;
  } | null>(null);

  const unlockScroll = (restorePosition: boolean) => {
    const saved = scrollLockRef.current;
    if (!saved) return;
    const body = document.body;
    body.style.position = saved.position;
    body.style.top = saved.top;
    body.style.width = saved.width;
    scrollLockRef.current = null;
    if (restorePosition) window.scrollTo(0, saved.scrollY);
  };

  const closeForNavigation = () => {
    unlockScroll(false);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    scrollLockRef.current = {
      scrollY,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll(true);
    };
  }, [open]);

  // Defensive: if the viewport grows past the mobile breakpoint while the
  // drawer is open (rotation, resize), drop the open state so the scroll
  // lock above always gets torn down rather than sticking indefinitely.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          open
            ? // While the mobile drawer is open, match its solid emerald exactly so
              // the header reads as one surface with the drawer instead of letting
              // frozen page content peek through above it.
              "border-b border-transparent bg-emerald-deep"
            : scrolled
              ? "border-b border-gold/15 bg-emerald-deep/98 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-6 lg:px-12">
          <a
            href="#home"
            onClick={open ? closeForNavigation : undefined}
            className="-my-2.5 flex items-center gap-3 py-2.5"
            aria-label="Credence Group — home"
          >
            <Emblem className="h-9 w-9 md:hidden" />
            <Wordmark className="hidden h-7 w-auto md:block" />
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group relative text-[0.78rem] uppercase tracking-[0.22em] text-ivory/80 transition-colors hover:text-gold"
                >
                  {item.label}
                  <span
                    className={`pointer-events-none absolute -bottom-1.5 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-500 ${
                      isActive
                        ? "w-6 opacity-100"
                        : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-60"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            className="hidden border border-gold/60 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.24em] text-gold transition-all hover:border-gold hover:bg-gold hover:text-emerald-deep md:inline-block"
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 -m-2.5 p-2.5 text-ivory md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer — deliberately a SIBLING of <header>, not a child. The
          header gets a backdrop-blur when scrolled, and any backdrop-filter (like
          transform/filter) makes an element the containing block for its
          position:fixed descendants. As a header child this drawer's fixed
          coverage collapsed to the header's 80px box; as a sibling it's always
          positioned against the viewport. Full inset-0 so it can never leave a
          seam regardless of header state. */}
      <div
        className={`fixed inset-0 z-40 bg-emerald-deep transition-all duration-500 md:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 px-8">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeForNavigation}
              className="font-display text-4xl text-ivory hover:text-gold"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeForNavigation}
            className="mt-4 border border-gold px-8 py-3 text-[0.72rem] uppercase tracking-[0.28em] text-gold"
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}

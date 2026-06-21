import { useEffect, useState } from "react";
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
  const active = useActiveSection(["home", "projects", "services", "about", "philosophy", "contact"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-emerald-deep/92 backdrop-blur-md border-b border-gold/15"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-6 lg:px-12">
        <a href="#home" className="flex items-center gap-3" aria-label="Credence Groups — home">
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
                    isActive ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-60"
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
          className="text-ivory md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-20 bottom-0 z-40 bg-emerald-deep transition-all duration-500 md:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 px-8">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-ivory hover:text-gold"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 border border-gold px-8 py-3 text-[0.72rem] uppercase tracking-[0.28em] text-gold"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}

import { Wordmark } from "@/components/brand/Wordmark";
import { Instagram, Linkedin, Mail, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal pt-20 pb-8 text-ivory/70">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Wordmark className="h-7 w-auto opacity-90" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/55">
              A Hyderabad-based practice in interior design, turnkey delivery and infrastructure. Building trust, creating value.
            </p>
          </div>

          <FooterCol title="Navigate" items={[
            { label: "Home", href: "/#home" },
            { label: "Projects", href: "/#projects" },
            { label: "Services", href: "/#services" },
            { label: "About", href: "/#about" },
            { label: "Contact", href: "/#contact" },
          ]} />

          <div>
            <p className="eyebrow mb-4">Studio</p>
            <p className="text-sm leading-7 text-ivory/55">
              Meenakshi Tech Park, Tower B<br />
              8th Floor, Hyderabad 500032<br />
              India
            </p>
            <p className="mt-4 text-sm text-ivory/55">+91 90000 63200</p>
          </div>

          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <div className="flex gap-3">
              <SocialLink href="https://credencegroup.co" label="Website"><Globe className="h-4 w-4" /></SocialLink>
              <SocialLink href="#" label="Instagram"><Instagram className="h-4 w-4" /></SocialLink>
              <SocialLink href="#" label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialLink>
              <SocialLink href="mailto:ahmed@credencegroup.co" label="Email"><Mail className="h-4 w-4" /></SocialLink>
            </div>
            <p className="mt-6 text-sm text-ivory/55">ahmed@credencegroup.co<br />aarish.baig@credencegroup.co<br />komal_russell@credencegroup.co</p>
          </div>
        </div>

        <div className="mt-20 hairline" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-ivory/35 md:flex-row">
          <span>© {new Date().getFullYear()} Credence Group. All rights reserved.</span>
          <span>Crafted with credence.</span>
        </div>
      </div>

      {/* Faded wordmark */}
      <div className="pointer-events-none mt-12 select-none overflow-hidden">
        <p className="text-center font-display text-[18vw] leading-none text-gold/[0.04]">CREDENCE</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href} className="text-sm text-ivory/55 transition-colors hover:text-gold">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center border border-gold/30 text-gold/70 transition-all hover:border-gold hover:bg-gold hover:text-emerald-deep"
    >
      {children}
    </a>
  );
}


# Credence Groups — Interior Design Website

A single elongated scrolling page for Credence Groups. Dark, cinematic, editorial — emerald-dominant surfaces with restrained gold detailing, dramatic full-bleed photography, and serif-led typography. Nav links smooth-scroll between sections on one route.

## Brand & visual system

**Logos** (uploaded SVGs, used as Lovable Assets via `lovable-assets create`)
- `Group.svg` → full wordmark — header + footer
- `emblem.svg` → mark only — favicon, mobile header, watermark behind hero / section breaks

**Color tokens** (locked from your kit, mapped in `src/styles.css` via `@theme inline`)
- `--emerald-deep` `#0B2C25` — page background
- `--emerald-mid` `#143F35` — cards, section bands
- `--emerald-light` `#2E5C4E` — borders, hover surfaces
- `--gold` `#D6B784` — primary accent, buttons, links
- `--gold-light` `#E8D4AC` — highlights, captions
- `--gold-dark` `#B3914F` — pressed states, dividers
- `--ivory` `#F5EFE5` — body text on dark
- `--charcoal` `#1A1A1A` — deep contrast blocks
- `--gradient-primary` `linear-gradient(135deg,#0B2C25 0%,#143F35 45%,#B3914F 85%,#D6B784 100%)` — hero overlay, CTA buttons, dividers

**Typography**
- Display: **Cormorant Garamond** (italic for accents) — large editorial headlines
- Body / UI: **Inter Tight** — clean, modern, legible on dark
- Eyebrow labels: Inter Tight uppercase, 0.2em tracking, gold
- Loaded via `<link>` in `src/routes/__root.tsx` head; families registered under `@theme` as `--font-display` and `--font-sans` (Tailwind v4 — no JS config)

**Motion** (Framer Motion via `bun add motion`)
- Hero: slow Ken-Burns zoom on background image + staggered word fade-up on headline
- Section reveals: blur-fade-in on scroll, single direction, restrained
- Image hover: subtle scale 1.03 + gold border-glow
- Easing only `cubic-bezier(0.22, 1, 0.36, 1)` — no bouncy motion

## Single-page architecture

One route (`src/routes/index.tsx`) renders all sections stacked vertically. Each section has a stable `id` so the nav can deep-link and smooth-scroll.

```text
<Header />            sticky, transparent → solid on scroll
<section id="home">         Hero
<section id="projects">     Featured projects
<section id="services">     Services
<section id="about">        Studio / about
<section id="philosophy">   Pull-quote band
<section id="contact">      Contact
<Footer />
```

- Nav links are `<a href="#projects">` etc. with `scroll-behavior: smooth` on `html` and `scroll-margin-top` on each section to clear the sticky header.
- Active section in the nav is highlighted via an `IntersectionObserver` hook (`useActiveSection`) — gold underline follows the section in view.
- Single `head()` on the index route with title, description, og:title, og:description, og:image (hero), twitter card.

## Sections (top → bottom)

### 1. Hero (`#home`)
Full-viewport dark interior photo, emerald-to-transparent gradient overlay, emblem watermark top-right. Headline: *"Interiors composed with credence."* Sub-line: one-sentence studio promise. Gold outlined CTA "View Projects" (scrolls to `#projects`) + ghost "Book a Consultation" (scrolls to `#contact`). Scroll cue at bottom.

### 2. Intro strip
Eyebrow "EST. STUDIO" + short manifesto paragraph, gold hairline divider.

### 3. Featured projects (`#projects`)
Filter pills (All · Residential · Hospitality · Commercial · Retail) — gold underline active state. Asymmetric editorial grid (1 large + 2 stacked, then masonry-ish staggered rows). 6–8 project tiles: image, name, typology, year. Hover scales image, fades in gold caption. Links point to `#` (no detail pages this pass).

### 4. Services (`#services`)
Eyebrow + headline + intro, then 6 services as full-width alternating zigzag rows: image left/right, gold numeral (01–06), title, paragraph, bullet list of deliverables.
- Residential Design · Hospitality · Commercial Interiors · Furniture Curation · Styling & Art Direction · Turnkey Project Management

### 5. About (`#about`)
Studio portrait full-bleed with overlaid title "The studio behind Credence". Two-column: story paragraphs + stats column (Years · Projects · Cities · Awards) with gold numerals. Three founder/principal cards (portrait, name, role, short bio). Values strip — 4 values with emblem icon.

### 6. Philosophy band (`#philosophy`)
Full-bleed emerald with large italic pull-quote, emblem watermark behind. Acts as visual breath before contact.

### 7. Contact (`#contact`)
Split layout: left ivory-on-emerald copy block with email, phone, studio address, Instagram link; right form on slightly lighter emerald card with gold-focused inputs.
- Fields: Name, Email, Phone, Project type (select), Budget range (select), Message
- Gold "Send inquiry" button
- On submit: client-side `sonner` toast "Thank you — we'll be in touch within 48 hours." (no backend)

## Shared chrome

- **Header** (sticky): transparent over hero, becomes solid `--emerald-deep` with hairline gold bottom border once scrolled past hero. Wordmark left, nav center (Home · Projects · Services · About) with active-section underline, gold outlined "Contact" right. Mobile: emblem + hamburger → full-screen emerald drawer with the same anchors.
- **Footer**: 4 columns (Studio / Navigate / Contact / Social) on `--charcoal`, large faded wordmark across the bottom, gold hairline above © line.

## Imagery

Generated with `imagegen` and stored under `src/assets/` as Lovable Assets:
- 1 hero interior (cinematic, warm-emerald lit living room)
- ~8 project images (residential, hospitality, commercial)
- 6 service vignettes
- 1 studio interior for About hero
- 3 founder portraits (editorial, moody)

Direction: warm key light, deep shadows, brass / wood / velvet / marble materials. No people in interiors; only in portraits.

## Technical details

- **Stack**: TanStack Start (existing), Tailwind v4 with tokens in `src/styles.css`, shadcn components customized to brand
- **Logos**: upload `Group.svg` and `emblem.svg` via `lovable-assets create` → `src/assets/*.asset.json`, import URL in `Header`, `Footer`, hero watermark
- **Fonts**: Cormorant Garamond + Inter Tight via Google Fonts `<link>` in `__root.tsx` head (never `@import` a URL in CSS)
- **Routing**: single page on `src/routes/index.tsx`; all sections live in `src/components/sections/*`; nav uses hash anchors with smooth scroll
- **Active section**: `src/hooks/use-active-section.ts` (IntersectionObserver) feeds the header
- **No hardcoded color utilities** (`text-white`, `bg-black`, hex literals) — only semantic tokens (`bg-emerald-deep`, `text-gold`, `border-gold/40`)
- **Motion**: `motion` (Framer Motion) via `bun add motion`
- **Contact form**: pure client state + `sonner` toast; no Lovable Cloud, no DB

## Out of scope (this pass)

- Per-project detail pages (project tiles link to `#`; can be added as `/projects/$slug` later)
- Functional contact submission (no Lovable Cloud yet — confirmed)
- Journal / blog
- Animation beyond the Framer Motion register described (no Three.js, no canvas)

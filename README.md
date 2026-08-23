# Lumière — A Calmer Way to Travel

A premium, fictional travel-platform landing page built as a frontend
engineering portfolio piece. Not a booking product — a demonstration of
production-quality UI engineering: architecture, motion design, accessibility,
and performance, all in one cohesive build.

**Live demo:** _add your deployed URL here_
**Screenshots:** _add hero / gallery / mobile screenshots here_

---

## Overview

Lumière is styled after the calm, confident landing pages of Stripe, Linear,
and Airbnb — large type, generous whitespace, and a luxury travel palette
(warm off-white, deep navy, emerald teal, muted gold) instead of visual
noise. Destination art is illustrated (gradient + line-art) by default, but
every card, gallery tile, and hero image renders through a shared
`DestinationArt` component that switches to a real photo automatically once
one is added — see [Photography](#photography) below.

## Features

- **Animated hero** with a real-geography world map (traced from actual
  Natural Earth land data, not a stylized dot grid), animated flight routes
  between Lisbon, Marrakech, Reykjavík, Kyoto, Bali, Cape Town, and
  Santorini at their true projected coordinates, scroll-based parallax, and a
  staggered stack of floating glass cards
- **Popular Destinations** — a magazine-style layout (one featured card + a
  stacked pair + a supporting grid) instead of a uniform card grid, linking
  into real destination detail pages
- **Destination detail pages** — full-width art, an illustrated mini-gallery,
  a highlights section, a 5-day sample itinerary timeline, a mock weather
  widget, a real embedded interactive map (Google Maps, no API key needed),
  and related destinations
- **Explore Countries** — live search + region filtering across all 194
  countries, with lazy (`IntersectionObserver`-driven) incremental rendering,
  a memoized list item, and a live result counter
- **Why Choose Us** — an asymmetric split layout (sticky intro panel + a
  numbered, editorial-style feature list)
- **Statistics** — a dark editorial contrast band with one large glowing hero
  stat and three supporting stats, each with its own animated count-up
- **Testimonials** — enriched with destination, flag, and trip duration, in an
  alternating-rhythm grid
- **Gallery** — masonry-style grid with hover-zoom and a full keyboard-
  navigable lightbox, shared between the homepage preview and the standalone
  `/gallery` page
- **CTA** — the richest background treatment on the page: layered gradients,
  a spotlight glow, drifting blobs, grain texture, and floating proof badges
- **Trusted-by marquee** — pure-CSS infinite scroll, pauses on hover and
  respects reduced-motion
- **Auth pages** — Google, GitHub, and Email options on both sign-in and
  sign-up (client-only demo, no backend)
- Sticky glass navbar, animated mobile drawer (focus-safe, closes on
  <kbd>Esc</kbd>, locks body scroll)
- `cursor: pointer` and a lift/scale/glow hover treatment on every
  interactive element site-wide
- Scroll progress bar, back-to-top button, light/dark theme toggle
- Custom 404 page, route-level loading skeletons, dynamically generated
  favicon
- Full SEO setup: metadata, OpenGraph, Twitter Card, `robots.ts`, `sitemap.ts`
  (covering every destination detail page)

### Pages

Every interactive element on the homepage routes somewhere real — nothing is
a decorative dead button.

| Route                            | What it is                                                   |
| -------------------------------- | ------------------------------------------------------------ |
| `/`                              | The landing page                                             |
| `/destinations`                  | Browsable grid of every destination                          |
| `/destinations/[slug]`           | Statically generated detail page per destination             |
| `/gallery`                       | Full gallery with the lightbox                               |
| `/plan`                          | Interactive trip-planning form (client-only, no backend)     |
| `/auth/sign-in`, `/auth/sign-up` | Google / GitHub / Email auth forms (client-only, no backend) |

"Watch the film" in the hero opens an in-page modal with an animated
destination showreel rather than linking out to a fake video file.

## Photography

Every destination renders through a shared `DestinationArt` component
(`components/destination-art.tsx`). By default it shows illustrated
gradient + line-art; if a destination's `photo` field is set
(`data/destinations.ts`), it renders that image via `next/image` instead —
no other code changes needed.

No photo URLs are hardcoded in this build. `next.config.ts` allow-lists
`upload.wikimedia.org` and `commons.wikimedia.org` for exactly this purpose,
but every URL added there should be verified to actually resolve before
shipping — a broken hotlink is worse than the illustrated fallback.

## Tech Stack

| Layer         | Choice                                                                        |
| ------------- | ----------------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack, Server Components)                         |
| UI library    | React 19                                                                      |
| Language      | TypeScript (strict mode)                                                      |
| Styling       | Tailwind CSS 4 (CSS-first theme, no config file)                              |
| Palette       | Luxury travel: navy `#0B1220`, teal `#0F766E`, gold `#D4A574`, sand `#F5E6C8` |
| Animation     | Framer Motion                                                                 |
| Icons         | lucide-react                                                                  |
| Fonts         | Inter + Manrope, self-hosted via `@fontsource`                                |
| Theming       | next-themes                                                                   |
| Lint / format | ESLint (`eslint-config-next`) + Prettier                                      |

**Why self-hosted fonts instead of `next/font/google`:** shipping the font
files via `@fontsource` removes a build-time network dependency on Google's
font CDN entirely — the site builds and renders identically offline, in CI,
and behind restrictive corporate proxies, with no runtime request to a
third-party origin.

## Folder Structure

```
app/                 Routes, layout, metadata, robots/sitemap, icon, 404
  layout.tsx          Root layout: fonts, theme provider, nav/footer chrome
  page.tsx            Assembles all sections; code-splits the heaviest one
  not-found.tsx        Custom 404
  loading.tsx          Route-level skeleton
  icon.tsx             Dynamically generated favicon
  robots.ts / sitemap.ts
  destinations/         Destination index + /[slug] detail pages (SSG)
  gallery/              Standalone gallery page
  plan/                 Trip-planning page
  auth/sign-in, sign-up/  Auth pages

components/
  ui/                 Small, reusable primitives (Button, Badge, Skeleton,
                       LandmarkIcon, FlightArc, WorldMap, AmbientBackground,
                       FilmModal, social glyphs)
  layout/             Navbar, mobile menu, footer, theme toggle/provider,
                       scroll progress, back-to-top
  gallery-grid.tsx    Shared grid + lightbox (used by the homepage preview
                       and the full /gallery page)
  page-header.tsx     Shared sub-page header banner
  plan-form.tsx       Client-only trip-planning form
  auth-form.tsx       Client-only sign-in/sign-up form
  section-heading.tsx Shared eyebrow/title/description heading

sections/             One file per landing-page section (Hero, Trusted By,
                       Popular Destinations, Explore Countries, Why Choose
                       Us, Stats, Testimonials, Gallery, CTA)

data/                 Static content, kept out of components (countries,
                       destinations, testimonials, features, gallery)

hooks/                use-count-up, use-scroll-progress, use-debounced-value

lib/                  cn() class-merge helper, shared Framer Motion variants

types/                Shared TypeScript interfaces
```

## Installation

```bash
git clone <this-repo>
cd travellux
npm install
```

## Scripts

```bash
npm run dev      # start the dev server (Turbopack)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (zero warnings enforced)
npx prettier --write .   # format the codebase
```

## Performance

- No external images: all art is inline SVG/CSS, so there's nothing for
  `next/image` to fetch or optimize — the biggest performance win here is
  simply not shipping a photo library
- The Explore Countries section (its ~200-entry dataset and search logic) is
  code-split with `next/dynamic` and streamed in with a skeleton, keeping that
  weight out of the initial JS bundle
- Country tiles are wrapped in `React.memo` so filtering/searching doesn't
  re-render the entire visible grid
- Search input is debounced (180ms) before filtering runs
- The country grid renders incrementally via `IntersectionObserver` instead of
  mounting all ~200 rows at once
- Fonts are self-hosted (no third-party font request) and loaded with
  `font-display: swap`
- Animations respect `prefers-reduced-motion` globally
- `next.config.ts` disables the `X-Powered-By` header and enables compression

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`) throughout
- Skip-to-content link
- Visible focus rings on every interactive element (`:focus-visible`)
- Mobile menu is a labeled dialog (`role="dialog"`, `aria-modal`), closes on
  <kbd>Esc</kbd>, and locks background scroll while open
- Toggle groups (region filters) use `aria-pressed`; the results count is an
  `aria-live` region so filtering is announced to screen readers
- Icon-only buttons carry `aria-label`; purely decorative SVGs are
  `aria-hidden`
- Color palette maintains AA contrast for body text against both light and
  dark backgrounds

## SEO

- Rich `metadata` export (title template, description, keywords) in
  `app/layout.tsx`
- OpenGraph and Twitter Card metadata
- `app/robots.ts` and `app/sitemap.ts` (Next's typed metadata routes,
  `sitemap.ts` includes every destination detail page automatically)
- Dynamically generated favicon (`app/icon.tsx`) via `next/og` — no static
  `favicon.ico` reference in metadata, since Next's file convention
  auto-registers `icon.tsx`

## Deployment (Vercel)

1. Push this repository to GitHub/GitLab/Bitbucket
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected) — no extra configuration
   needed
4. Deploy

## Future Improvements

- Hook up a real booking/CMS backend and replace the static `data/` files
- Add Playwright/Vitest coverage for the search-and-filter logic
- Internationalization for the country list and copy
- Replace the illustrative destination art with real photography behind
  `next/image`, once a licensed image source is chosen

---

Built as a portfolio project to demonstrate production-grade frontend
engineering: architecture, motion, accessibility, and performance working
together — not just a pretty landing page.

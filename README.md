# Stark Anchors

Digital headquarters for **Stark Anchors** — business systems engineering.

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 · Framer Motion.
Seven routes, all statically generated except the diagnostic intake endpoint.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint
```

---

## 1 · What this is

A brand and a site built together from zero: no prior logo, design system,
component library or content. The design decisions are recorded in the
source — most components open with a comment explaining *why* they are
shaped the way they are, because on this project the reasoning is the part
that is hard to reconstruct later.

Two rules govern everything and are worth stating before the file tree:

**Nothing is claimed that has not been verified.** There are no client
counts, no revenue figures, no testimonials, no logos, no case studies and
no "trusted by" strip. The one quantitative graphic on the site — the
revenue leakage profile — is labelled as an illustrative failure shape on
its own surface, and the article figures each carry an explicit
"Illustrative." note. If verified numbers arrive later, they go in
`data/`, not into a component.

**Nothing pretends to work that does not.** The diagnostic form is wired
to a real integration point. With no destination configured it says so and
hands the visitor a working fallback, rather than showing a confirmation
screen for a submission that was never delivered. See §6.

---

## 2 · Architecture

```
app/                      routes only — thin, composed from features/
  layout.tsx              shell, fonts, org + website JSON-LD, boot stamp
  page.tsx                home
  about|services|pricing|diagnostic/
  engineering-logs/       index + [slug]
  api/diagnostic/route.ts intake integration point
  not-found.tsx  sitemap.ts  robots.ts  icon.svg  opengraph-image.tsx

components/               cross-cutting, route-agnostic
  branding/               Mark, Logotype
  layout/                 Section, Footer, EngageBlock, SystemBoot
  navigation/             SiteHeader, MobileNav, NavLink
  motion/                 Reveal, HeadlineReveal, SystemTransition
  backgrounds/            PageField, SystemField, ColumnGrid
  ui/                     Action, SectionLabel, icons

features/<route>/         everything that belongs to exactly one route
  sections/               full-width compositions
  components/             the diagrams and instruments

lib/
  field/engine.ts         the background system (pure, no React)
  animations/presets.ts   every curve and variant in the project
  diagnostic/validate.ts  validation shared by client and API route
  seo/metadata.ts         metadata + JSON-LD builders
  utils/  fonts.ts

data/                     ALL copy and content. No strings in components.
hooks/                    useCanvasStage, useMediaQuery, useReducedMotion
styles/                   tokens · typography · utilities · boot
types/                    the content contracts
```

Content lives in `data/` and nowhere else. Adding a service, a log entry,
a pricing tier or a form field is a data edit — the interface, the
validation and the payload follow from it.

---

## 3 · Design system

Tokens are in `styles/tokens.css` and bridged into Tailwind by the
`@theme` block in `app/globals.css`. Do not introduce a raw colour,
duration or radius anywhere else.

### Colour, and its discipline

| Token | Value | Use |
|---|---|---|
| `--obsidian` | `#0D0D11` | ~90% of every surface |
| `--slate` | `#1C1D24` | structural panels, the two tonal bands |
| `--titanium` | `#E2E8F0` | primary text — 15.7:1 |
| `--titanium-dim` | `#9AA3B5` | body copy — 7.7:1 |
| `--titanium-faint` | `#828A9A` | meta labels — 5.6:1 |
| `--titanium-ghost` | `#656D7D` | **display type only** — 3.7:1 |
| `--laser` | `#00E5FF` | telemetry, active state, focus — 12.6:1 |

`--titanium-ghost` clears the WCAG large-text threshold (3:1) but not the
normal-text one. It is for headlines, numerals and marks. Small text uses
`faint` or brighter. `.t-display-s` has a 20px minimum specifically so
ghost ink stays legal on it — do not lower it.

Laser blue is budgeted, not decorative. It appears on the home page in
single figures: the hero rule, active diagram nodes, packets in transit,
the terminal of the pipeline, focus rings.

### Structure

Radius is `0` everywhere except a 2px affordance on selectable inputs.
There are no box-shadows in the project. Depth comes from hairlines
(`--line*`), tone and negative space. Buttons do not glow; there are three
of them (`solid`, `ghost`, `inline`) and no fourth.

### Type

Cabinet Grotesk (display) · Inter (body) · JetBrains Mono (meta). All three
self-hosted from `public/fonts` as latin-subset variable faces — one file
each, ~128KB total, no third-party connection and no build-time network
dependency. Classes live in `styles/typography.css`; components use
`.t-display-xl`, `.t-body`, `.t-meta` and so on rather than ad-hoc sizes.

There is deliberately **no** `SectionHeader` component. A universal
section header is what produces eyebrow → headline → paragraph → three
cards on every screen. Each section composes its own heading from the type
scale and the `SectionLabel` atom, which is why the pages have a visual
rhythm instead of a component rhythm.

---

## 4 · The background system

`lib/field/engine.ts` is a single canvas engine, parameterised per route.
It is not a particle system: nodes sit on a jittered structural lattice,
edges are filtered to near-45° runs so the graph reads as a plan drawing,
and discrete packets traverse edges and activate the node they arrive at —
so activity propagates through the topology rather than drifting.

Hub nodes are drawn as the logo's convergence diamond, so the same
geometry recurs at three scales: the mark, the diagrams, the environment.

| Route | Variant | Character |
|---|---|---|
| Home | `network` | the full live map, pointer-reactive |
| About | `structure` | the plan, almost no traffic |
| Services | `topology` | consistent left-to-right flow |
| Pricing, Logs | `quiet` | nearly still — reading surfaces |
| Diagnostic | `telemetry` | sparse but highly active |

**Cost control.** The scene is deterministic from a seed. Node budgets
drop by viewport (mobile gets ~30% of the desktop count, no pointer
interaction). `useCanvasStage` suspends the RAF loop when the canvas
scrolls out of view or the tab is hidden, caps DPR at 2, and clamps the
frame delta so a restored tab never integrates one huge step. The whole
component is `dynamic(..., { ssr: false })`, so it is off the critical
path and in its own chunk.

**Layering.** `PageField` sits at `-z-10` and `<main>` deliberately has no
z-index. A fixed element at `z-index: 0` paints in the positioned layer —
i.e. *above* unpositioned in-flow content — which silently dimmed article
prose through the horizon gradient. `<html>` owns the background colour so
it propagates to the canvas; `<body>` is transparent, or it would paint
over the negative layer.

---

## 5 · Motion

Every animation resolves to a preset in `lib/animations/presets.ts`. One
signature curve (`cubic-bezier(0.16, 1, 0.3, 1)`), no springs on entrances,
no bounce, no elastic. Arrivals move 14px, never more. Viewport reveals are
always `once: true`.

The word-level headline reveal is used on exactly **two** headlines site-
wide — the home hero and the closing statement — so it stays a moment
rather than a mannerism.

Page transitions are a single hairline crossing the top of the viewport
(620ms). There is no curtain and no interstitial, because a transition
that delays content is one the visitor pays for on every click.

**Reduced motion** is handled in two places, not one: CSS neutralises
transitions globally, and components branch in JS so canvases render a
single static frame instead of idling a loop and SMIL packets are not
rendered at all. Verified: every page renders complete and correctly
composed with `prefers-reduced-motion: reduce`.

---

## 6 · The diagnostic intake

`app/api/diagnostic/route.ts` validates with the same module the form uses
(`lib/diagnostic/validate.ts`) — the client is never trusted — then:

- **`DIAGNOSTIC_WEBHOOK_URL` set** → forwards the submission (8s timeout,
  optional bearer token) and returns `{ ok: true, delivered: true }`.
- **not set** → `501` with an explicit message. The UI shows a delivery
  failure and a `mailto:` fallback pre-filled with the visitor's answers.

Also: an off-screen honeypot (answered `200` so bots do not retry, but
nothing is forwarded), a 32KB body cap, and a whitelist that discards any
field not declared in `data/diagnostic.ts`.

Copy `.env.example` to `.env.local` to connect a destination.

---

## 7 · Verification

Run against `npm run build && npm start`.

**Accessibility — axe-core, WCAG 2.1 A + AA, 8 routes × desktop and
mobile: 0 violations.** Keyboard paths verified by script: form step
validation and focus movement, back-navigation state, the architecture
stepper's roving tabindex (Arrow/Home/End), and the mobile navigation's
modal semantics, focus trap, scroll lock and Escape handling.

**Performance** (production build, gzip, desktop):

| | |
|---|---|
| Total transfer | ~360KB (JS 211KB, fonts 128KB, CSS 9.5KB) |
| FCP | 240–280ms |
| LCP | 0.3–1.9s (home is highest — the once-per-session boot) |
| CLS | 0.0002 |

CSS is 9.5KB gzipped for the whole design system. Static assets are served
`immutable` for a year. No horizontal overflow at 390px or 1512px.

Known headroom: JS is ~40KB above the ideal mobile budget, effectively all
of it Framer Motion. Moving to `LazyMotion` + `domAnimation` and `m.*`
components would recover an estimated 25–35KB gzipped; it was not done here
because it touches ~20 components and all Core Web Vitals are already in
the good band.

**Boot sequence.** 720ms, home route only, once per session
(`sessionStorage`), removed entirely under reduced motion. An inline script
in `<head>` stamps `[data-booted]` before first paint so there is never a
flash of overlay on an internal navigation. To disable it, drop
`<SystemBoot />` from `app/page.tsx`.

---

## 8 · Brand assets

`public/brand/` — symbol in titanium, obsidian, monochrome and
signal-active variants, plus the horizontal lockup for light and dark
surfaces. `app/icon.svg` is the favicon; `app/opengraph-image.tsx`
generates the 1200×630 social card at build time.

The mark reads top-down: two **stays** (distributed inputs) converge on a
**node**, load transfers down a **spine**, and terminates on a
**foundation**. It is an anchor by structure rather than by illustration —
no ship, no rope, no circuitry — and it collapses to four unambiguous
strokes at 16px. Coordinates in `components/branding/Mark.tsx` are on a
32-unit grid; changing one without re-checking the favicon will break it.

The lockup SVGs reference the display font by name. For print or any
context without the webfont, outline the wordmark in a vector editor.

---

## 9 · Conventions

- `PascalCase.tsx` components, `camelCase.ts` utilities, Next.js route
  conventions for `app/`.
- One responsibility per component. No `any`. No dead code — if a keyframe
  or token stops being referenced, delete it.
- Copy belongs in `data/`, tokens in `styles/tokens.css`, curves in
  `lib/animations/presets.ts`.
- Typographic apostrophes (`’`) in display copy, not `'`.

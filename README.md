# Pathway Productions — Three-Page Prototype

Stage A deliverable per `Pathway_Claude_Three_Page_Build_Brief_V1.docx`.
Static HTML/CSS + minimal vanilla JS. No build tool, no framework, no
external fonts. Three pages only: **Home**, **Ad Films**, **PPC & Paid
Advertising**. Nothing else in this handover should be read as "built" —
see §8 Out of scope.

---

## 1. Run it locally

No install, no dependencies.

```bash
cd pathway-prototype
python3 -m http.server 8000
# then open http://localhost:8000/
```

Any static file server works (the routes rely on folder-based paths, not a
router), e.g. `npx serve .` also works.

Routes:

| Page | Local URL |
|---|---|
| Home | `/` |
| Ad Films | `/ad-films/` |
| PPC & Paid Advertising | `/digital-marketing/ppc/` |

## 2. Repository tree

```
pathway-prototype/
├── index.html                       # Home
├── ad-films/
│   └── index.html
├── digital-marketing/
│   └── ppc/
│       └── index.html
├── assets/
│   ├── css/style.css                # one shared stylesheet, token-based
│   └── js/main.js                   # nav toggle + pending-route/video notices
├── robots.txt                       # Disallow: / (prototype must not be indexed)
└── README.md
```

No image files are shipped. Every image-shaped space is a CSS-only,
dimension-stable placeholder (see §4) so there is nothing fake to mistake
for real Pathway photography.

## 3. What was implemented, page by page

**Home** — combined two-line H1 (both approved headline lines in one H1,
via `<span class="line">`, per brief §8), lead paragraph, immediate
Creative/Digital routes, six text-first pathway tiles each pointing at
their real intended destination, Selected Work (3 creative + 2 digital
slots, kept as two distinct categories — never merged), About transition,
Trust section (reserved, not fabricated), and two closing CTAs.

**Ad Films** — eyebrow + expressive H1, intro copy, "Watch Our Ad Films"
CTA that scrolls to `#ad-films-work` (no fake player, no autoplay), three
format descriptions, the three named projects (We Box, Spice Hill, Fit &
Flex) with their exact supplied descriptions and poster slots, a
click-to-reveal "play" control that is honest about there being no video
yet (see §4), the five-step process line, and the Creative-routed closing
CTA.

**PPC & Paid Advertising** — eyebrow + expressive H1, intro, Google Ads
and Meta Advertising blocks in full, Amazon Advertising as the single
required line linking to the future dedicated page (no duplicate section),
the "data to decisions" paragraphs verbatim, and both Digital-routed CTAs.

**Shared system** — one header/nav/footer pattern repeated across the
three pages (no templating layer exists yet, so this is literal
duplication by design — see §7 WordPress mapping for how this becomes
shared partials), one design-token stylesheet, and one JS file.

### Mobile handling

- Single-column stacking below ~860px (hero, tiles, posters, service
  blocks all collapse to one column).
- Accessible nav toggle: `aria-expanded` set correctly, `hidden` attribute
  removed/restored, no animation dependency, full keyboard support.
- Tested with Playwright at 360×800 (mobile), 834×1100 (tablet), and
  1440×900 (desktop) on all three pages — **no horizontal scroll at any
  width** (`document.documentElement.scrollWidth` measured equal to
  `clientWidth` in every case; see `screens/` for captures if this repo
  includes them).

## 4. Approved copy and asset-slot disclosure

Every heading and paragraph in Part B of the brief was used **verbatim** —
no rewording, no re-ordering of sections, no changed CTA labels. The only
things added beyond Part B are: the eyebrow labels (explicitly specified
as non-H1 labels), the five process-step chip labels on Ad Films
(verbatim from the brief's own line, just presented as discrete steps),
and the SVG arrow glyph inside pathway tiles (decorative, `aria-hidden`).

**No deviation from approved copy.**

Asset slots — all clearly marked, dimension-stable, non-photographic:

| Slot | Page | Status |
|---|---|---|
| Hero visual | Home | Placeholder. Needs one owner-approved original photograph, desktop + mobile crops. |
| 3× creative project visuals | Home — Selected Work | Placeholder. Needs real poster-frame stills. |
| 2× digital case study slots | Home — Selected Work | Placeholder. Needs verified, owner-approved metrics/evidence. |
| Client logos (×4 shown) | Home — Trust | Placeholder. Needs approved logos + usage rights. |
| We Box / Spice Hill / Fit & Flex poster frames | Ad Films | Placeholder. Needs real poster stills. |
| We Box / Spice Hill / Fit & Flex video | Ad Films | **Not implemented.** Clicking "play" shows an honest in-page notice ("Video not available in this prototype — awaiting an owner-approved, rights-cleared video URL") rather than loading a stock clip, an iframe to nowhere, or a fake player. This is intentional per brief §1: "Never show a false successful form submission or pretend a... endpoint exists" — the same principle applied to video. |

No stock imagery, no AI-generated imagery, no decorative icon cards, no
gradients, no fabricated metrics, no invented testimonials or logos, no
autoplay anything. Nothing in this prototype claims to be a real client
result.

## 5. Route map and pending-link handling

Per brief §6, nothing silently 404s and nothing fakes a page. Two
different, deliberate treatments are used:

**A — Links to the current live site** (`/blogs/`, `/careers/`, `/contact/`
and its `?interest=` variants): the brief calls these "established
routes" that already exist in production, so every reference to them in
this prototype is a real, working `https://pathwayproductions.in/...`
link. This is the "deliberate link to the current live page" fallback
the brief names explicitly. The `?interest=creative` / `?interest=digital`
/ `&service=ad-films` query parameters are appended exactly as specified
in the brief's route table, even though the current live contact page may
not yet read them — that wiring is a production task, not a prototype one.

**B — Not-yet-built planned routes** (Creative Productions hub, Digital
Marketing hub, `/work/`, `/about/`, `/explainer-video-company/`,
`/production-services-india/`, `/digital-marketing/qualified-leads/`,
`/digital-marketing/#ways-to-engage`, `/digital-marketing/amazon-ads/`):
every link carries `data-pending` and its real, final intended `href`.
Clicking it is intercepted by `main.js`, which prevents navigation and
shows a dismissible, `aria-live="polite"` banner naming the real planned
route and pointing back at this README. With JavaScript disabled, the
link is still visible, still carries its real intended `href`, and is
marked with a small "↗" suffix (CSS `content`) plus a `<noscript>` note
explaining the convention — so even without JS the link is honest about
being external to this prototype rather than silently broken.

Full table, exactly as given in the brief:

| From / label | Destination | Treatment |
|---|---|---|
| Home / Creative Productions CTA | `/creative-productions/` | B — pending |
| Home / Digital Marketing CTA | `/digital-marketing/` | B — pending |
| Home / Tell Your Brand Story | `/ad-films/` | **Built — real link** |
| Home / Simplify the Complex | `/explainer-video-company/` | B — pending |
| Home / Bring Your Production to India | `/production-services-india/` | B — pending |
| Home / Find the Right Customers | `/digital-marketing/qualified-leads/` | B — pending |
| Home / Make Your Brand More Visible | `/digital-marketing/` | B — pending |
| Home / Strengthen Your Marketing Capabilities | `/digital-marketing/#ways-to-engage` | B — pending |
| Home / Explore Our Work | `/work/` | B — pending |
| Home / Discover Pathway | `/about/` | B — pending |
| Home / Creative contact CTA | `https://pathwayproductions.in/contact/?interest=creative` | A — live link |
| Home + PPC / Digital contact CTA | `https://pathwayproductions.in/contact/?interest=digital` | A — live link |
| Ad Films / Discuss an Ad Film | `https://pathwayproductions.in/contact/?interest=creative&service=ad-films` | A — live link |
| PPC / Amazon reference | `/digital-marketing/amazon-ads/` | B — pending |
| Ad Films / project browse | `#ad-films-work` (local anchor) | **Built — real, same page** |
| Ad Films / Explore More | `/work/` | B — pending |
| Header / Blog, Careers, Contact | `https://pathwayproductions.in/blogs/`, `/careers/`, `/contact/` | A — live link |

## 6. SEO foundations

| Page | Proposed `<title>` | Proposed meta description |
|---|---|---|
| Home | Pathway Productions \| Creative Film Production & Digital Marketing Agency | Pathway Productions combines creative film production with performance-driven digital marketing — helping brands tell stories that reach the right audience. |
| Ad Films | Ad Films \| Pathway Productions | Brand films, launch teasers and short-form digital ads built around a clear creative idea — selected work from Pathway Productions. |
| PPC & Paid Advertising | PPC & Paid Advertising \| Pathway Productions Digital Marketing | Google Ads and Meta Advertising campaigns planned and managed with attention to audience, message and measurable business outcomes. |

All three are **pending final SEO sign-off** — titles/descriptions here are
proposals, not approved copy (Part B covers body copy only, not metadata).

Other foundations in place:

- **Exactly one `<h1>` per page.** Service/page name is a non-heading
  eyebrow (`<span class="eyebrow">`), matching brief §8 exactly. Home's H1
  carries both approved headline lines as two `<span class="line">`
  elements inside the single H1, as explicitly instructed.
- Progressive heading nesting (H1 → H2 section headers → H3 for cards/
  projects/services) on every page, no skipped levels.
- Semantic landmarks: `<header>`, `<nav aria-label="Primary">`, `<main>`,
  `<footer>`, labelled `<section>`s via `aria-labelledby`.
- Skip-to-content link, visible on keyboard focus.
- Meaningful, non-empty link text throughout (no bare "click here").
- All copy is server-rendered static HTML — nothing is JS-injected, so it
  is fully crawlable and readable with JS off.
- `<meta name="robots" content="noindex, nofollow">` on every page, plus a
  root `robots.txt` disallowing everything. **This prototype must not be
  indexed.**
- **No canonical tag set.** Canonical and redirect strategy for the real
  site depends on the legacy-URL audit, which is explicitly out of scope
  here per brief §8/§10 — deciding it in this prototype would be
  presumptive.
- **No schema markup** (no Organization, no Review, no JobPosting) —
  correct per brief §8, which forbids inventing structured data on these
  three pages.

## 7. WordPress migration plan (mapping only — not implemented)

This stays a short mapping per brief §2/§9 Stage C; no theme code exists
yet.

| Prototype piece | Lean WordPress equivalent |
|---|---|
| Repeated header/nav/footer markup | `header.php` / `footer.php` partials, one copy, included on every template |
| `assets/css/style.css` tokens block | Theme `:root` custom properties in the theme's main stylesheet, or `theme.json` CSS custom properties if block-theme |
| `index.html` | `front-page.php`, sections as reusable ACF/block patterns: hero, pathway-tiles, selected-work, trust, cta-band |
| `ad-films/index.html` | A `page-ad-films.php` template or a block-pattern-based page, reusing poster-card and cta-band patterns |
| `digital-marketing/ppc/index.html` | Same approach — reuses service-block and cta-band patterns, sets up the same pattern system the other 26 pages will draw from |
| `data-pending` links | Replaced with real published permalinks as each page goes live; remove the attribute and the JS interception page by page |
| `main.js` nav toggle | Either kept as-is (it's already framework-free) or reimplemented as the theme's native nav-toggle behaviour, whichever the chosen theme expects |

Stage C (actual WordPress theme skeleton) is explicitly **not** part of
this handover.

## 8. Explicitly out of scope / not implemented here

- The other 26 site pages — not built, not invented.
- No Insights/Ideas & Perspectives page; `/blogs/` stays the existing blog.
- No live WordPress deployment, no legacy URL changes, no DNS/hosting work.
- No paid-media campaign configuration.
- No CRM production records.
- **No analytics or tag-manager code of any kind is present in this
  repository** — no GA4, no Google Ads, no Meta Pixel, real or dummy. See
  §9 for the specification instead.
- No real or placeholder star ratings, testimonials-as-schema, or review
  markup.

## 9. Tracking specification (specification only — nothing implemented)

| User action | Event / qualification | Conversion status | Implemented? |
|---|---|---|---|
| Click a Creative or Digital CTA | `cta_click` with `page_path`, `cta_id`, `division`, `destination` (consent-aware) | Micro-interaction; **not** a lead | **NOT IMPLEMENTED** |
| View/activate a real video | `video_start` / `media_play` after real activation, with `project_id` | Engagement, not lead | **NOT IMPLEMENTED** (no real video exists yet — see §4) |
| Open contact route / start a form | `form_start` on genuine input engagement, with `interest_category` | Not a completed lead | **NOT IMPLEMENTED** (contact form isn't part of this prototype) |
| Successful validated form + backend confirmation | `generate_lead`, once per unique valid submission, deduplicated, with a stable lead ID | **Primary lead conversion** | **NOT IMPLEMENTED** |
| CRM qualification / sales outcome | Defined only after confirmed CRM integration and permissions | Down-funnel signal, not assumed at launch | **NOT IMPLEMENTED** |

Server/CRM-side attribution capture (landing path, UTM params, interest
category, submission time, stable lead ID) is specified above but not
built. Per brief §8: phone/email/name must never be sent as plain GA4
event parameters — noted here for the production build, not relevant to
this static prototype since no form submits anywhere.

No real or dummy pixel/tag IDs appear anywhere in this codebase — grep for
`G-`, `AW-`, or `fbq(` and you will find nothing, by design.

## 10. Performance — measured, not promised

Measured directly from the files in this repository (gzip = `gzip -c file
| wc -c`):

| File | Raw | Gzip |
|---|---|---|
| `assets/css/style.css` (shared, all 3 pages) | 12.8 KB | 3.4 KB |
| `assets/js/main.js` (shared, all 3 pages) | 3.4 KB | 1.4 KB |
| **Shared CSS+JS gzip total** | — | **~4.8 KB** (budget: ≤80 KB) |
| `index.html` | 9.3 KB | 2.8 KB |
| `ad-films/index.html` | 7.9 KB | 2.7 KB |
| `digital-marketing/ppc/index.html` | 5.2 KB | 2.0 KB |

**Images: zero bytes.** Every visual slot is a CSS `repeating-linear-
gradient` placeholder, not a photo — so there is currently nothing to
measure against the 150 KB mobile-hero / 250 KB desktop-hero budgets.
Those budgets become real the moment actual photography is supplied, and
should be re-measured at that point, in AVIF/WebP as specified.

**Fonts: zero requests.** The brief's stated preference ("prefer system
fonts") was followed exactly — the stylesheet uses a system/Georgia
display stack and a system-UI body stack. No font file is downloaded on
any page.

**Requests per page (cold load):** 1 HTML + 1 shared CSS + 1 shared JS =
**3 requests**, plus whatever the browser does for `favicon.ico` by
default (none is provided in this prototype). No third-party requests of
any kind.

**Horizontal scroll:** confirmed absent at 360px/834px/1440px on all three
pages via automated check (`document.documentElement.scrollWidth ===
clientWidth` at every width tested).

**What is NOT measured here: Lighthouse / Core Web Vitals field data.**
This repository was evaluated with a headless Chromium (Playwright) for
layout and interaction correctness, not a full Lighthouse audit. Per
brief §10, a static prototype cannot demonstrate real Google field Core
Web Vitals, and this document does not claim it does.

**To get an actual Lighthouse score**, from the repo root:

```bash
python3 -m http.server 8000
# in Chrome: DevTools → Lighthouse tab → Mobile → Performance → Analyze
# or, with Node installed:
npx lighthouse http://localhost:8000/ --view
npx lighthouse http://localhost:8000/ad-films/ --view
npx lighthouse http://localhost:8000/digital-marketing/ppc/ --view
```

Given the near-zero payload (no images, no fonts, 4.8 KB shared CSS+JS),
a high mobile performance score is expected once run — but this is a
prediction stated as a prediction, not a measured result, consistent with
brief §10's instruction to identify failures rather than claim scores
that weren't actually run in a real browser against a real network.

## 11. Known risks / open questions that are NOT blockers

- Final URL slugs (e.g. `/explainer-video-company/` vs. a cleaner path)
  are explicitly pending a full SEO/legacy-URL audit — not decided here.
- Palette (`--accent: #A13D2B`) and typography (system Georgia + system
  sans) are a first pass under Direction A ("Light Editorial"); brief §3
  says final colour/font choices remain provisional pending owner review
  of this static prototype. Nothing here should be read as the locked
  brand system.
- The Amazon Advertising one-liner on the PPC page links to
  `/digital-marketing/amazon-ads/`, a page that does not exist yet
  anywhere (brief confirms this is "to be built later").

None of the above blocks reviewing this prototype — they are flagged for
the Stage B independent audit per brief §9.

---

## 12. Branch: `redesign/editorial-visual-sync` — visual synthesis with PR #1

This branch is **not merged into `main`**. It implements the owner's request
to combine the visual presentation of the ChatGPT-designed homepage
reference (GitHub PR #1, `design-references/chatgpt-homepage/`, Direction
A — "Light Editorial") with this prototype's lightweight, performance-first
architecture. It supersedes nothing on `main` until explicitly approved.

### What changed (visual only — content, routes, SEO, tracking spec unchanged)

- **Typography**: dropped the Georgia display stack in favour of one
  system-sans stack for both display and body type (matches the
  reference's Direction A), with tighter letter-spacing and a larger hero
  clamp scale. Zero added network requests either way.
- **Colour**: shifted from the warm clay/rust palette to the reference's
  quieter, cooler editorial palette — warm-white paper, deep-teal accent,
  a distinct orange focus ring. Still a single selective accent colour.
- **Section-head pattern**: introduced the reference's defining device —
  eyebrow/heading on the left, supporting line on the right, justified
  apart — in place of the original's stacked heading + lead paragraph.
  Applied wherever a section already had both a heading and a lead
  (Selected Work, About transition, Trust, both closing CTAs, Ad Films'
  "Idea" section). Sections with a heading only were left as plain
  headings — no new copy was introduced anywhere to fill the pattern.
- **Pathway tiles (Home)**: restyled as a bordered editorial grid with a
  numbered category label + bold title, dropping the small arrow-icon
  affordance. The category labels are the same words the original build
  already used (Ad Films, Explainer Videos, etc.) — none invented.
- **Work / case cards**: restyled onto a richer "moody gradient" media
  placeholder (still an honest, clearly-labelled placeholder — no stock
  or invented imagery, same disclosure text as before) echoing the
  reference's hero-image treatment, instead of the diagonal-hash chip
  style (which is now reserved for the trust-logo slots only).
- **Trust strip**: restyled from a flex row of fixed-size chips to an
  even 5-column bordered grid, matching the reference's "logo-line".
- **Closing CTA bands**: restyled from a stacked single column to a
  two-column grid (headline + copy left, buttons right on desktop;
  stacks on mobile) — same approved CTA copy and the same real
  `pathwayproductions.in/contact/?interest=…` destinations (the
  reference's own mock used `mailto:` placeholders; those were **not**
  adopted, since the master brief's approved destinations take
  precedence over the design reference per its own README instructions).
- **Header**: lighter-weight nav type and an outlined (not filled)
  Contact button in the nav, for a less heavy top bar. Nav structure,
  routes, ARIA wiring and the mobile toggle are untouched.

### What did NOT change

- All approved copy, verbatim, on all three pages.
- Route map, `data-pending` interception behaviour, and the
  `data-video-activate` honest video-placeholder pattern.
- SEO meta (`title`/`description`/`robots`) on all three pages.
- Tracking spec — still fully undocumented/not-implemented, as before.
- `assets/js/main.js` — zero JS changes; only CSS and section markup
  changed.

### A real bug found and fixed during this pass

The Ad Films poster cards originally centred both the "poster frame
pending" caption text and the play-button icon in the same spot; once the
media placeholder switched to the richer gradient skin, a two-line
caption (e.g. "Spice Hill — poster frame pending") visually collided with
the play icon. Fixed by moving the play affordance to a small top-right
badge and the caption to a bottom-left corner — confirmed clean via
Playwright screenshots on both desktop and mobile widths.

### Verification performed on this branch

- Playwright, desktop (1440px) and mobile (375px), all three pages: zero
  horizontal overflow (`scrollWidth === clientWidth` on every page/width
  combination tested).
- Mobile nav toggle: `aria-expanded` flips correctly, `hidden` attribute
  toggles correctly.
- Pending-route interception and video-placeholder interception: both
  still fire the correct banner copy after the markup changes.
- **Real Lighthouse runs** (not just documented steps), via
  `npx lighthouse`, simulated throttling, against the local static
  server — not a live hosted URL, so treat these as a lower bound rather
  than field data:

  | Page | Form factor | Performance | FCP | LCP | TBT | CLS |
  |---|---|---|---|---|---|---|
  | Home | Mobile | 100 | 1.0s | 1.0s | 0ms | 0 |
  | Home | Desktop | 98 | 0.9s | 0.9s | 0ms | 0 |
  | Ad Films | Mobile | 100 | 1.0s | 1.0s | 0ms | 0 |
  | PPC | Mobile | 100 | 1.0s | 1.0s | 0ms | 0 |

  Total page weight: Home 29 KiB, Ad Films 28 KiB, PPC 25 KiB (HTML+CSS+JS,
  uncompressed-on-disk figures as measured by Lighthouse's network
  panel). Only the performance category was audited (`--preset=perf`);
  accessibility/SEO/best-practices categories were not re-run on this
  branch — the accessibility behaviours verified above (focus rings,
  ARIA, skip link, reduced-motion) carry over unchanged from `main`, but
  were not re-scored by Lighthouse itself here.

### Raw/gzip asset sizes on this branch

| File | Raw | Gzip |
|---|---|---|
| `assets/css/style.css` | 16.3 KB | 4.4 KB |
| `assets/js/main.js` | 3.4 KB (unchanged) | 1.4 KB |
| `index.html` | 9.1 KB | 2.8 KB |
| `ad-films/index.html` | 8.1 KB | 2.7 KB |
| `digital-marketing/ppc/index.html` | 5.2 KB | 2.0 KB |

CSS grew from the original (~12.8 KB raw) to support the richer
placeholder skin and section-head pattern; still well inside a
lightweight budget and still a single render-blocking request with no
external font/script dependency.

### Still pending before this can be considered for merge

- Owner review of the two directions and sign-off on this synthesis
  specifically (not a toggle — this build picked one cohesive direction,
  Direction A, rather than keeping the reference's A/B comparison
  toggle, since a production page ships one design, not a switcher).
- Real hero/poster imagery, once supplied, will change actual LCP/byte
  weight from the "0 real images yet" baseline measured above.
- No merge, no deploy, no WordPress changes have been made or proposed
  on this branch.

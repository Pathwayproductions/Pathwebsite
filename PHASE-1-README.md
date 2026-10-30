# Phase 1 — ChatGPT-developed Pathway website

Three pages built from the **approved 01 White + Editorial Serif visual design**, using one shared stylesheet and minimal vanilla JavaScript. **Not merged, not deployed**.

- Home: `/`
- Ad Films: `/ad-films/`
- PPC & Paid Advertising: `/digital-marketing/ppc/`

## Preview
Run `python3 -m http.server 8000` from the repository root. Pages use root-relative URLs.

## Original design fidelity
The selected visual reference lives in `design-system/approved-white-editorial-serif.html`. The shared CSS directly incorporates its layout and typography. Additional service-page patterns preserve the same whitespace, typography, greys and restrained blue. Only approved copy was used in the three service pages, with clearly marked asset placeholders. The approved copy is authoritative; the design mockup is not a source for actual client claims.

## Pending
Image/video assets, remaining pages, final SEO URL migration approvals, real form tracking/CRM, Lighthouse tests after imagery, WCAG testing, WordPress template conversion. No real client results were invented.

Links to pages not built in this three-page prototype show an honest notice; live contact links open the current domain. Placeholder video controls do not load a third-party player.

**IMPORTANT:** Prototype `noindex,nofollow` and `robots.txt: Disallow /` must be removed/reconfigured for real production deployment.

## Next review
Visual approval at 1440px, 834px, and 390px, keyboard/mobile navigation and links; then expand to the remaining pages in batches. Claude to audit code without redesigning approved visual structure.

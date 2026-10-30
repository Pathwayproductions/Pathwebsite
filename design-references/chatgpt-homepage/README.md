# ChatGPT homepage design reference — for Claude review

This folder contains the **original ChatGPT-authored interactive homepage layout comparison**, supplied by the Pathway Productions owner as the **preferred visual reference**.

## Open it
Open `index.html` in a local browser (or serve this folder using a local static server). The file is standalone; there are **no external scripts, fonts, or media dependencies**.

- **A — Light Editorial**: split-layout hero image and typography.
- **B — Film-Frame Minimalism**: large headline, full-width image, alternate visual rhythm.
- **Use your own Pathway image** control previews a local image without uploading it to a server.

## Important distinction
This is a **visual design reference, not production-ready code** and not a replacement for the three-page prototype on `main`. Existing internal anchors, upload-preview control, static placeholder images, and prototype notices are intentional. Do **not** use the prototype's navigation URLs or placeholder behaviour as production requirements. The original artifact had the earlier proposed title "Strategies That Deliver Results"; this repository copy changes only that title to the previously accepted "Selected Marketing Case Studies".

## Instructions to Claude

1. Review the supplied design reference alongside your existing `main` implementation for Home, Ad Films, and PPC.
2. Use the **user-preferred visual hierarchy, whitespace, typography, image composition, and editorial rhythm** of this reference. **Keep the existing lightweight static architecture** in your three-page build.
3. Preserve the approved website wording and section hierarchy; flag potential deviations before changing them.
4. Implement one authentic owner-approved, responsive and compressed hero image; use real selected film poster frames when available. No stock or invented imagery.
5. Keep essential SEO, accessibility and proper CTA destination handling. Navigation must work on mobile and desktop.
6. Avoid autoplay video, unnecessary icon/animation libraries, third-party web fonts, framework bundles, and heavy page builders.
7. Test at 360px, 834px and 1440px; run actual Lighthouse mobile + desktop measurements after the real images are inserted; document raw/gzip assets and LCP/INP/CLS limitations.
8. Do **not** modify live WordPress, production DNS, real conversion tags, or all other pages as part of the prototype.
9. Provide visual screenshots, change log, real measurement results, and a separate pull request for review. **Do not automatically merge**.

### Source of truth
Use the previously supplied **Pathway Master Website Brief V3**, **Three-Page Build Brief**, and **SEO Keyword Implementation Map** as the authoritative strategy, approved content, URL/SEO and conversion requirements. The design reference is visual guidance and must not override them.

This reference is for review. Its presence does not indicate approval of any production design or performance result.

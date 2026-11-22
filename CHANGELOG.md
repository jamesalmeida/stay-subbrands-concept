# Changelog

User-facing changes to the Culver Gardens sub-brand concept mockup. This is a
static demo: all listings, hosts, reviews, and the Culver Gardens brand are
fictional, and no data leaves the browser.

## 2026-11-21

### Added

- Homepage catalog with 14 category filters (Homes, Beachfront, Amazing pools,
  Design, Gardens, and others) over a 32-listing Los Angeles sample set.
- Mobile "Where to?" search sheet that opens a full-screen search, and
  `/search?where=` results with optional dates and guest counts.
- Culver City results include the Culver Gardens collection banner with
  "View the collection", plus a "Part of Culver Gardens" badge on member homes.
- `/brand/culver-gardens`: the sub-brand page — host story, shared standards,
  combined reviews, the member homes, and the "why sub-brands?" explainer.
- `/listing/[id]`: listing detail with photo gallery, amenities, and a
  preview-only Reserve button (no request sent, no payment taken).
- Wishlists saved in this browser only (`localStorage`), reachable from the
  bottom navigation.
- Non-functional `/login` preview and a custom not-found page.
- Search engines kept out via `noindex` metadata and a disallow-all `robots.txt`.

### Notes

- No environment variables or backend; `next build` is enough for Vercel.

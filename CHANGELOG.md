# Changelog

User-facing changes to the Jackson Commons sub-brand concept mockup. This is a
static demo: the 16 Jackson Commons listings preview Fawaz's real Airbnb homes
around Jackson Market & Deli, while the rest of the catalog, its hosts and its
reviews are fictional. No data leaves the browser.

## 2026-11-22

### Added

- Jackson Commons now lists Fawaz's 16 real Culver City homes, with their titles,
  photos, prices, ratings, review counts, amenities and Airbnb links.
- Member listing pages say they are a concept preview of a real Culver City
  listing and link to it on Airbnb.
- The brand page shows Fawaz's host details: avatar, bio, languages, seven years
  hosting, and a link to his Airbnb host profile.
- A shared-space section for the Jackson Market grounds, with photos of the
  courtyard patio, koi pond, fire-pit tables, deli counter and vine-covered
  pergola walkway, and a map link.
- The homepage catalog grows to 40 listings, with the 16 member homes among the
  Culver City results.

### Changed

- Culver Gardens is renamed **Jackson Commons**, grouping the portfolio around
  Jackson Market & Deli on Jackson Ave. Banners, badges, listing pages and the
  brand page use the new name. `/brand/culver-gardens` permanently redirects to
  `/brand/jackson-commons`.

## 2026-11-21

### Added

- Homepage catalog with 14 category filters (Homes, Beachfront, Amazing pools,
  Design, Gardens, and others) over a 30-listing Los Angeles sample set.
- Mobile "Where to?" search sheet that opens a full-screen search, and
  `/search?where=` results with optional dates and guest counts.
- Culver City results include the Jackson Commons collection banner with
  "View the collection", plus a "Part of Jackson Commons" badge on member homes.
- `/brand/jackson-commons`: the sub-brand page — host story, shared standards,
  combined reviews, the member homes, and the "why sub-brands?" explainer.
- `/listing/[id]`: listing detail with photo gallery, amenities, and a
  preview-only Reserve button (no request sent, no payment taken).
- Wishlists saved in this browser only (`localStorage`), reachable from the
  bottom navigation.
- Non-functional `/login` preview and a custom not-found page.
- Search engines kept out via `noindex` metadata and a disallow-all `robots.txt`.

### Notes

- No environment variables or backend; `next build` is enough for Vercel.

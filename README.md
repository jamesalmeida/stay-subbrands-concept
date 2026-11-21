# Culver Gardens — host sub-brands concept

A mobile-first concept mockup for a pitch: hosts can bundle several homes into a branded sub-brand inside a vacation-rental marketplace.

**Concept mockup, not affiliated with Airbnb.** Listings, hosts, reviews, and Culver Gardens are fictional. Photos are stock images from Unsplash (Unsplash License), stored in `public/photos`. The wordmark is plain styled text. Icons are from [Lucide](https://lucide.dev). Nothing here is scraped from Airbnb.

Search engines are asked to stay out (`noindex` plus `robots.txt` disallow all).

## The idea

A host with several similar homes — Elena Marlowe, in this demo — publishes them under one name, **Culver Gardens**. Guests see:

- a collection banner at the top of Culver City results
- a “Part of Culver Gardens” badge on each member home
- a brand page with the story, the shared standard, combined reviews, and the homes

Each home keeps its own price, photos, and listing page. The brand is a layer on top.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production check:

```bash
npm run build
npm start
```

No environment variables. `next build` is enough for Vercel.

## Try the pitch

1. On a phone-width window, open the homepage. The compact **Where to?** pill opens a full-screen search.
2. Search **Culver City** (any casing; partial text such as “culver” works).
3. Read the Culver Gardens banner, then open **View the collection** (`/brand/culver-gardens`).
4. Hearts save on this device only (Wishlists tab). Reserve and Log in are previews and do not send data.

Other sample destinations: Santa Monica, Venice, Silver Lake, Los Feliz, Pasadena, Malibu, Echo Park, Los Angeles. Unknown searches show those cities.

## Routes

| Path | What it is |
| --- | --- |
| `/` | Homepage grid. Category row filters the sample catalog. |
| `/search?where=Culver%20City` | Results, with the sub-brand banner when the match is Culver City. |
| `/brand/culver-gardens` | The sub-brand page and the “why sub-brands?” explainer. |
| `/listing/[id]` | Simple listing detail. |
| `/wishlists` | Homes saved in this browser. |
| `/login` | Non-functional login preview. |

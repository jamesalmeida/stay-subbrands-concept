import { listingsByBrand, type Listing } from "@/data/listings";

export const CULVER_GARDENS_ID = "culver-gardens";

export type BrandReview = {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  home: string;
};

export const culverGardens = {
  id: CULVER_GARDENS_ID,
  name: "Culver Gardens",
  slug: "culver-gardens",
  tagline: "Courtyard homes in Culver City, kept to one standard.",
  pitch:
    "A sub-brand lets one host gather several homes under a name, a standard, and a shared reputation — without leaving the marketplace.",
  host: "Elena Marlowe",
  hostSince: 2018,
  superhostSince: 2019,
  location: "Culver City, California",
  hero: "/photos/p13.jpg",
  heroAlt: "Front of a fictional Culver Gardens cottage with a small garden",
  story: [
    "Elena Marlowe has hosted in Culver City since 2018. The homes are different shapes — a Carlson Park cottage, a Hayden Tract loft, a Blair Hills suite — but the stay is meant to feel like the same house.",
    "Same linen weight. Same eight things in the kitchen. Same check-in note. Same quiet hours. Guests who liked Fig & Fern can book Willow Walk next time without starting from a blank search.",
    "Culver Gardens is fictional. It is here so the idea is obvious: the brand is a layer on top of ordinary listings, not a separate website.",
  ],
  standards: [
    {
      title: "Hotel-weight linens",
      detail: "Two sets, the same white, at every home. Towels refresh on stays of five nights or more.",
    },
    {
      title: "The kitchen kit",
      detail: "Oil, salt, coffee, filters, tea, soap, a sponge, and a short spice rack. Nothing gourmet. Nothing missing.",
    },
    {
      title: "A real desk",
      detail: "Task lamp, outlet, and a chair you can sit in for a workday. Wifi is meant to clear 300 Mbps.",
    },
    {
      title: "Same check-in",
      detail: "Self check-in before 3pm. The lock instructions read the same way at every door.",
    },
    {
      title: "Courtyard, patio, or garden",
      detail: "Every home has outdoor space, even when it is a shared court rather than a private yard.",
    },
    {
      title: "Quiet hours",
      detail: "10pm to 8am, written on the brand page so guests see the rule before they book.",
    },
    {
      title: "Neighborhood card",
      detail: "The same printed Culver City card: coffee, a market, and where not to bother parking.",
    },
    {
      title: "One host",
      detail: "Elena answers for the collection. A problem at one home is a brand problem, not a mystery listing.",
    },
  ],
};

export function culverGardensHomes(): Listing[] {
  return listingsByBrand(CULVER_GARDENS_ID).sort((a, b) => b.rating - a.rating);
}

export function culverGardensStats(homes: Listing[] = culverGardensHomes()) {
  const reviews = homes.reduce((sum, home) => sum + home.reviewCount, 0);
  const rating =
    reviews === 0
      ? 0
      : homes.reduce((sum, home) => sum + home.rating * home.reviewCount, 0) / reviews;
  return {
    homes: homes.length,
    reviews,
    rating,
  };
}

export const brandReviews: BrandReview[] = [
  {
    id: "r1",
    author: "Priya S.",
    date: "October 2026",
    rating: 5,
    text: "We stayed at Fig & Fern this fall and The Orchard House last spring. The coffee, the linens, and the check-in note were the same. That is rarer than it should be.",
    home: "Fig & Fern Cottage",
  },
  {
    id: "r2",
    author: "Marcus L.",
    date: "September 2026",
    rating: 5,
    text: "I booked The Citrus Loft because the card said Culver Gardens. I already trusted the cottage. The loft is a different building and the same stay.",
    home: "The Citrus Loft",
  },
  {
    id: "r3",
    author: "Helen K.",
    date: "August 2026",
    rating: 5,
    text: "Lantern Court is tiny. The standard is not. Desk, quiet hours, and a garden court instead of a yard. I knew that before I paid.",
    home: "Lantern Court Studio",
  },
  {
    id: "r4",
    author: "Andre W.",
    date: "July 2026",
    rating: 4,
    text: "Willow Walk fit our family. The combined rating made me less nervous about a townhouse we had never seen. Individual reviews were still right there.",
    home: "Willow Walk Townhouse",
  },
  {
    id: "r5",
    author: "Sofia A.",
    date: "June 2026",
    rating: 5,
    text: "Garden Suite at Haynes feels like a different house and the same host. The neighborhood card sent us to a better market than the one on the corner.",
    home: "Garden Suite at Haynes",
  },
  {
    id: "r6",
    author: "Ben C.",
    date: "May 2026",
    rating: 5,
    text: "I would not have tried a second Culver City address from a stranger. I tried a second address from Culver Gardens. That is the whole product.",
    home: "The Orchard House",
  },
];
